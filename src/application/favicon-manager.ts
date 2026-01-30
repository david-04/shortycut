import { state } from "../data/state";
import { pages } from "../data/variables";
import { Hashtable } from "../utilities/hashtable";
import { create, createImage } from "../utilities/html";
import { assertNotNull } from "../utilities/misc";
import { FaviconCache } from "./favicon-cache";

const MAX_PARALLEL_FAVICON_JOBS = 10;

//----------------------------------------------------------------------------------------------------------------------
// Enums to describe the load priorities
//----------------------------------------------------------------------------------------------------------------------

class FaviconOriginType {
    static readonly values = new Array<FaviconOriginType>();

    static readonly CACHE_OFFLINE = new FaviconOriginType(false, false, true);
    static readonly CACHE_ONLINE = new FaviconOriginType(false, false, false);
    static readonly WEBSITE = new FaviconOriginType(false, true, false);
    static readonly FETCH_SERVICE = new FaviconOriginType(true, false, false);

    private constructor(
        public readonly isFetchService: boolean,
        public readonly isWebsite: boolean,
        public readonly isOffline: boolean
    ) {}
}

class FaviconLoadScope {
    public static readonly OFFLINE = new FaviconLoadScope(FaviconOriginType.CACHE_OFFLINE);
    public static readonly ONLINE = new FaviconLoadScope(FaviconOriginType.CACHE_OFFLINE, FaviconOriginType.WEBSITE);
    public static readonly FETCH_SERVICE = new FaviconLoadScope(FaviconOriginType.FETCH_SERVICE);
    public static readonly PRIORITY = new FaviconLoadScope(
        FaviconOriginType.CACHE_OFFLINE,
        FaviconOriginType.FETCH_SERVICE,
        FaviconOriginType.WEBSITE
    );

    public readonly originTypes: Array<FaviconOriginType>;

    private constructor(...originTypes: FaviconOriginType[]) {
        this.originTypes = originTypes;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// A job loading a single favicon
//----------------------------------------------------------------------------------------------------------------------

class FaviconLoadJob {
    private status: "new" | "loading" | "loaded" | "failed" = "new";
    private readonly observers = new Array<FaviconFile>();

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(public readonly url: string) {}

    //------------------------------------------------------------------------------------------------------------------
    // Add an observer
    //------------------------------------------------------------------------------------------------------------------

    public addObserver(file: FaviconFile) {
        if ("loaded" === this.status) {
            file.onResolved();
        } else if ("failed" === this.status) {
            file.onRejected();
        } else {
            this.observers.push(file);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Getters
    //------------------------------------------------------------------------------------------------------------------

    public get isNew() {
        return "new" === this.status;
    }

    public get isLoading() {
        return "loading" === this.status;
    }

    public get isFinished() {
        return this.isLoaded || this.hasFailed;
    }

    public get isLoaded() {
        return "loaded" === this.status;
    }

    public get hasFailed() {
        return "failed" === this.status;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Start loading the image (if it hasn't started yet)
    //------------------------------------------------------------------------------------------------------------------

    public startLoad() {
        if ("new" !== this.status) {
            return false;
        }
        this.status = "loading";
        create("img", element => {
            element.addEventListener("load", () => this.onLoadEnd(true));
            element.addEventListener("error", () => this.onLoadEnd(false));
            (element as HTMLImageElement).src = this.url;
        });

        return true;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Update the status and notify all observers
    //------------------------------------------------------------------------------------------------------------------

    private onLoadEnd(success: boolean) {
        this.status = success ? "loaded" : "failed";
        this.observers.forEach(observer => (success ? observer.onResolved() : observer.onRejected()));
        this.observers[0]?.origin.domain.registry.startNextLoad();
    }
}

//----------------------------------------------------------------------------------------------------------------------
// A single favicon URL
//----------------------------------------------------------------------------------------------------------------------

class FaviconFile {
    public readonly job: FaviconLoadJob;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    constructor(
        public readonly origin: FaviconOrigin,
        public readonly name: string,
        public readonly url: string
    ) {
        this.job = origin.domain.registry.jobs.computeIfAbsent(url, () => new FaviconLoadJob(url));
        this.job.addObserver(this);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event handlers
    //------------------------------------------------------------------------------------------------------------------

    public onResolved() {
        this.origin.onResolved(this);
    }

    public onRejected() {
        this.origin.onRejected(this);
    }
}

//----------------------------------------------------------------------------------------------------------------------
// An origin within a domain
//----------------------------------------------------------------------------------------------------------------------

class FaviconOrigin {
    private static readonly EXTENSIONS = ["ico", "png", "jpg", "gif", "svg", "jpeg"];

    private files = new Array<FaviconFile>();
    public resolvedFile?: FaviconFile;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        public readonly domain: FaviconDomain,
        public readonly name: string,
        public readonly type: FaviconOriginType,
        private readonly url: string
    ) {
        if (type.isFetchService) {
            const urlWithoutPort = this.url.replaceAll("%s", this.domain.name.replace(/:\d+$/, ""));
            this.files = [new FaviconFile(this, urlWithoutPort, urlWithoutPort)];
        } else {
            const basename = type.isWebsite ? "favicon" : this.domain.name.replaceAll(":", "!");
            this.files = FaviconOrigin.EXTENSIONS.map(extension => `${basename}.${extension}`).map(
                filename => new FaviconFile(this, filename, this.url.replaceAll("%s", filename))
            );
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Getters
    //------------------------------------------------------------------------------------------------------------------

    public get isLoading() {
        return !!this.files.filter(location => location.job.isLoading).length;
    }

    public get isResolved() {
        return !!this.resolvedFile;
    }

    public get isRejected() {
        return !this.isResolved && !this.files.length;
    }

    public get resolvedUrl() {
        return this.resolvedFile?.url;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Start loading the next file
    //------------------------------------------------------------------------------------------------------------------

    public startNextLoad(includeNonCached: boolean, includeAllExtensions: boolean) {
        if (this.isResolved || this.isRejected) {
            return false;
        }

        if (this.domain.registry.readCache) {
            const filename = this.domain.registry.cache.get(this.domain.name, this.name);
            if (filename && this.files.find(file => file.name === filename)?.job.startLoad()) {
                return true;
            }
        }

        if (includeNonCached) {
            for (const file of this.files.filter(currentFile => /ico$/i.test(currentFile.name))) {
                if (file.job.startLoad()) {
                    return true;
                }
            }
        }

        return includeAllExtensions && this.files.find(file => file.job.isNew)?.job.startLoad();
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event handlers
    //------------------------------------------------------------------------------------------------------------------

    public onResolved(file: FaviconFile) {
        if (!this.resolvedFile) {
            this.resolvedFile = file;
            if (!this.type.isFetchService) {
                this.domain.registry.cache.set(this.domain.name, this.name, this.resolvedFile.name);
            }
            this.domain.onOriginResolved(this);
        }
    }

    public onRejected(file: FaviconFile) {
        this.files = this.files.filter(currentFile => currentFile.name !== file.name);
        if (!this.files.length) {
            this.domain.registry.cache.set(this.domain.name, this.name, "");
            this.domain.onOriginRejected(this);
        }
    }
}

//----------------------------------------------------------------------------------------------------------------------
// A single domain inside the registry containing multiple origins
//----------------------------------------------------------------------------------------------------------------------

class FaviconDomain {
    public readonly origins = new Hashtable<FaviconOrigin>();
    private readonly subDomains = new Hashtable<FaviconDomain>();
    public parentDomain?: FaviconDomain;
    public displayName: string;

    public resolvedOrigin?: FaviconOrigin;

    private observers = new Array<HTMLImageElement>();

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        public readonly registry: FaviconRegistry,
        public readonly name: string,
        public readonly protocols: Array<string>,
        public isPrimary: boolean
    ) {
        this.createOrigins();
        this.createParentDomain();
        this.displayName = this.name.replace(/^www\./i, "");
    }

    private createOrigins() {
        for (const protocol of this.protocols) {
            const url = `${protocol}://${this.name}/%s`;
            this.origins.put(protocol, new FaviconOrigin(this, protocol, FaviconOriginType.WEBSITE, url));
        }

        state.config.favicons.localFolders.forEach(origin => {
            if (!/^[a-z]+:\/\//i.test(origin)) {
                origin = `${globalThis.location.href.replace(/\/[^/]+$/, "")}/${origin}`;
            }
            origin = origin.replace(/\/$/, "");
            const type = origin.startsWith("file://")
                ? FaviconOriginType.CACHE_OFFLINE
                : FaviconOriginType.CACHE_ONLINE;
            this.origins.put(origin, new FaviconOrigin(this, origin, type, `${origin}/%s`));
        });

        if (state.config.favicons.fetchService) {
            const url = state.config.favicons.fetchService;
            this.origins.put(url, new FaviconOrigin(this, url, FaviconOriginType.FETCH_SERVICE, url));
        }

        if (this.registry.readCache) {
            this.origins.keys
                .filter(origin => "" === this.registry.cache.get(this.name, origin))
                .forEach(origin => this.origins.delete(origin));
        }
    }

    private createParentDomain() {
        const parentDomain = this.name.replace(/^[^.]+\./, "");
        if (parentDomain !== this.name) {
            this.parentDomain = this.registry.addDomain(parentDomain, this.protocols, false);
            this.parentDomain.subDomains.put(this.name, this);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Start the next load
    //------------------------------------------------------------------------------------------------------------------

    public startNextLoad(scope: FaviconLoadScope): boolean {
        if (this.isLoading) {
            return false;
        }
        const types = scope.originTypes.filter(type => this.isPrimary || !type.isWebsite);
        for (const type of types) {
            for (const origin of this.origins.values.filter(currentOrigin => currentOrigin.type === type)) {
                if (this.startNextLoadPrioritized(origin)) {
                    return true;
                }
            }
        }
        return !!this.parentDomain?.startNextLoad(scope);
    }

    private startNextLoadPrioritized(origin: FaviconOrigin) {
        for (const parameters of [
            [false, false],
            [true, false],
            [true, true],
        ] as const) {
            if (origin.startNextLoad(parameters[0], parameters[1])) {
                return true;
            }
        }
        return false;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event handlers
    //------------------------------------------------------------------------------------------------------------------

    public onOriginResolved(origin: FaviconOrigin) {
        if (!this.resolvedOrigin) {
            this.resolvedOrigin = origin;
            this.notifyObservers(origin.resolvedFile?.url);
            this.subDomains.values.forEach(domain => domain.onParentDomainResolved(this));
        }
        this.registry.updateFaviconToolsPage();
    }

    public onOriginRejected(origin: FaviconOrigin) {
        this.origins.delete(origin.name);
        this.registry.updateFaviconToolsPage();
    }

    private onParentDomainResolved(domain: FaviconDomain) {
        this.notifyObservers(domain.resolvedOrigin?.resolvedFile?.url);
        this.registry.updateFaviconToolsPage();
    }

    private notifyObservers(url?: string) {
        if (url) {
            this.observers.forEach(img => (img.src = url));
            this.observers = [];
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Getters
    //------------------------------------------------------------------------------------------------------------------

    public get isLoading(): boolean {
        return !!this.origins.values.filter(origin => origin.isLoading).length || !!this.parentDomain?.isLoading;
    }

    public get isResolved(): boolean {
        return !!(this.resolvedOrigin || this.parentDomain?.isResolved);
    }

    public get isRejected(): boolean {
        return !this.origins.size && !this.resolvedOrigin && (!this.parentDomain || this.parentDomain.isResolved);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Create a favicon DIV element
    //------------------------------------------------------------------------------------------------------------------

    public getFavicon(): HTMLDivElement {
        const img = create("img") as HTMLImageElement;
        let domain: FaviconDomain = this as FaviconDomain;
        while (!domain.resolvedOrigin && domain.parentDomain) {
            domain = domain.parentDomain;
        }
        const url = domain.resolvedOrigin?.resolvedFile?.url;
        if (url) {
            img.src = url;
        } else {
            this.observers.push(img);
        }
        return create("div.favicon", img, element => {
            element.dataset["domain"] = this.name;
        }) as HTMLDivElement;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// A favicon registry that manages and load-balances the load and preload process
//----------------------------------------------------------------------------------------------------------------------

class FaviconRegistry {
    public readonly jobs = new Hashtable<FaviconLoadJob>();
    public readonly domains = new Hashtable<FaviconDomain>();
    private currentlyDisplayedDomains?: Array<FaviconDomain>;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        public readonly cache: FaviconCache,
        public readCache: boolean,
        public preload: boolean,
        protocolsPerDomain: Hashtable<Array<string>>
    ) {
        protocolsPerDomain.entries.forEach(entry => this.addDomain(entry.key, entry.value, true));
        this.startNextLoad();
    }

    //------------------------------------------------------------------------------------------------------------------
    // Add a domain to the registry
    //------------------------------------------------------------------------------------------------------------------

    public addDomain(domain: string, protocols: Array<string>, isPrimary: boolean) {
        const faviconDomain = this.domains.computeIfAbsent(
            domain,
            () => new FaviconDomain(this, domain, protocols, isPrimary)
        );
        faviconDomain.isPrimary = faviconDomain.isPrimary || isPrimary;
        return faviconDomain;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Set the currently displayed domains (to be loaded first)
    //------------------------------------------------------------------------------------------------------------------

    public setCurrentlyDisplayedDomains(domains: Array<string>) {
        this.currentlyDisplayedDomains = domains.map(domain => this.domains.get(domain)).filter(domain => !!domain);
        this.startNextLoad();
    }

    public removeCurrentlyDisplayedDomains() {
        delete this.currentlyDisplayedDomains;
        this.startNextLoad();
    }

    //------------------------------------------------------------------------------------------------------------------
    // Start the next loads
    //------------------------------------------------------------------------------------------------------------------

    public startNextLoad() {
        this.currentlyDisplayedDomains
            ?.filter(domain => !domain.isResolved)
            .forEach(domain => domain.startNextLoad(FaviconLoadScope.PRIORITY));

        if (this.currentlyDisplayedDomains?.filter(domain => domain.isLoading).length || !this.preload) {
            return;
        }

        let remainingJobs = Math.max(0, MAX_PARALLEL_FAVICON_JOBS - this.currentJobCount);
        for (const scope of [FaviconLoadScope.OFFLINE, FaviconLoadScope.ONLINE, FaviconLoadScope.FETCH_SERVICE]) {
            const domains = this.domains.values.filter(domain => domain.isPrimary && !domain.isResolved);
            for (const domain of domains) {
                if (!remainingJobs) {
                    return;
                }
                if (domain.startNextLoad(scope)) {
                    remainingJobs--;
                }
            }
            if (this.currentJobCount) {
                return;
            }
        }
    }

    private get currentJobCount() {
        return this.jobs.values.filter(job => job.isLoading).length;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Retrieve the favicon for this domain
    //------------------------------------------------------------------------------------------------------------------

    public getFavicon(domain: string) {
        return this.domains.get(domain)?.getFavicon();
    }

    //------------------------------------------------------------------------------------------------------------------
    // Update the favicons tools page
    //------------------------------------------------------------------------------------------------------------------

    public updateFaviconToolsPage() {
        pages.faviconTools.refreshPageContent();
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Entry point for to retrieve favicons and trigger loads
//----------------------------------------------------------------------------------------------------------------------

export class FaviconManager {
    private readonly domains = new Hashtable<Array<string>>();
    private readonly cache = new FaviconCache();
    private registry: FaviconRegistry;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor() {
        state.shortcuts.values.forEach(shortcut => {
            shortcut.all
                .map(item => item.link)
                .map(link => link.faviconUrls)
                .forEach(urls => {
                    urls.forEach(url => {
                        const { protocol, domain } = FaviconManager.extractProtocolAndDomain(url);
                        if ("file" !== protocol) {
                            const protocols = this.domains.computeIfAbsent(domain, () => new Array<string>());
                            if (!protocols.filter(currentProtocol => currentProtocol === protocol).length) {
                                if ("https" === protocol) {
                                    protocols.unshift(protocol);
                                } else {
                                    protocols.push(protocol);
                                }
                            }
                        }
                    });
                });
        });
        this.registry = new FaviconRegistry(this.cache, true, false, this.domains);
    }

    public static extractProtocolAndDomain(url: string) {
        return {
            protocol:
                assertNotNull(new RegExp(/^([a-z]+:\/\/)?/i).exec(url))[0]
                    .replace(/:.*/, "")
                    .toLocaleLowerCase() || "http",
            domain: url
                .toLocaleLowerCase()
                .replace(/^([a-z]+:\/\/+)?/i, "")
                .replace(/\/.*/, "")
                .toLowerCase(),
        };
    }

    //------------------------------------------------------------------------------------------------------------------
    // Set the mode of operation
    //------------------------------------------------------------------------------------------------------------------

    public startPreload() {
        this.registry.preload = true;
        this.registry.readCache = true;
        this.registry.startNextLoad();
    }

    public startFullRescan() {
        this.registry.preload = false;
        this.registry = new FaviconRegistry(this.cache, false, true, this.domains);
        this.registry.updateFaviconToolsPage();
    }

    public setCurrentlyDisplayedLinks(urls: Array<string>) {
        const domains = urls.map(url => FaviconManager.extractProtocolAndDomain(url).domain);
        this.registry.setCurrentlyDisplayedDomains(domains);
    }

    public removeCurrentlyDisplayedLinks() {
        this.registry.removeCurrentlyDisplayedDomains();
    }

    //------------------------------------------------------------------------------------------------------------------
    // Obtain a single favicon
    //------------------------------------------------------------------------------------------------------------------

    public getFavicon(url: string | undefined): HTMLDivElement {
        const createDiv = (url: string) => create("div.favicon", createImage(url)) as HTMLDivElement;
        if (url?.trim()) {
            const { protocol, domain } = FaviconManager.extractProtocolAndDomain(url);
            return "file" === protocol
                ? createDiv("resources/local.svg")
                : (this.registry.getFavicon(domain) ?? createDiv("resources/unknown.svg"));
        } else {
            return createDiv("resources/unknown.svg");
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Get listings for the favicon tools page
    //------------------------------------------------------------------------------------------------------------------

    public getPendingDomains() {
        return this.registry.domains.values
            .filter(domain => domain.isPrimary && !domain.isResolved && !domain.isRejected)
            .map(domain => domain.displayName)
            .sort((domain1, domain2) => this.compare(domain1, domain2));
    }

    public getMissingDomains() {
        const domains = this.registry.domains.values
            .filter(domain => domain.isPrimary && domain.isRejected)
            .map(domain => domain.displayName);

        this.registry.domains.values
            .filter(domain => domain.isPrimary && domain.isResolved)
            .forEach(domain => {
                while (!domain.resolvedOrigin && domain.parentDomain) {
                    domain = domain.parentDomain;
                }
                if (!domain.resolvedOrigin?.resolvedFile?.job.url || domain.resolvedOrigin?.type.isFetchService) {
                    domains.push(domain.displayName);
                }
            });

        return domains.sort((domain1, domain2) => this.compare(domain1, domain2));
    }

    public getOnlineDomains() {
        const files = new Hashtable<string>();
        const domains = this.registry.domains.values.filter(domain => domain.isPrimary && domain.isResolved);

        domains.forEach(domain => {
            while (!domain.resolvedOrigin && domain.parentDomain) {
                domain = domain.parentDomain;
            }
            if (domain.resolvedOrigin?.resolvedFile?.job.url && domain.resolvedOrigin.type.isWebsite) {
                const name = domain.displayName.replaceAll(":", "!");
                const extension = domain.resolvedOrigin?.resolvedFile.name.replace(/^.*\./, "") ?? "ico";
                files.put(`${name}.${extension}`, domain.resolvedOrigin.resolvedFile.job.url);
            }
        });

        return files.entries
            .map(entry => {
                return { filename: entry.key, url: entry.value };
            })
            .sort((a, b) => this.compare(a.filename, b.filename));
    }

    public getOfflineDomains() {
        const files = new Hashtable<string>();
        const prefix = globalThis.location.href.replace(/\/[^/]+$/, "") + "/";

        this.registry.domains.values
            .filter(domain => domain.isPrimary && domain.isResolved)
            .forEach(domain => {
                while (!domain.resolvedOrigin && domain.parentDomain) {
                    domain = domain.parentDomain;
                }
                if (domain.resolvedOrigin?.resolvedFile?.job.url && domain.resolvedOrigin.type.isOffline) {
                    const url = domain.resolvedOrigin?.resolvedFile?.job.url;
                    files.put(url.substring(0 === url.indexOf(prefix) ? prefix.length : 0), url);
                }
            });

        return files.entries
            .map(entry => {
                return { path: entry.key, url: entry.value };
            })
            .sort((item1, item2) => this.compare(item1.path, item2.path));
    }

    private compare(s1: string, s2: string) {
        if (s1 < s2) {
            return -1;
        } else {
            return s1 === s2 ? 0 : 1;
        }
    }
}
