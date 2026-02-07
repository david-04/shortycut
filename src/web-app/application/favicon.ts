import { state } from "../data/state";
import { Hashtable } from "../utilities/hashtable";
import { create } from "../utilities/html";
import { FaviconLoadJob } from "./favicon-load-job";
import { FaviconRegistry } from "./favicon-registry";

//----------------------------------------------------------------------------------------------------------------------
// Enums to describe the load priorities
//----------------------------------------------------------------------------------------------------------------------

export class FaviconOriginType {
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

export class FaviconLoadScope {
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
// A single favicon URL
//----------------------------------------------------------------------------------------------------------------------

export class FaviconFile {
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

export class FaviconDomain {
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
