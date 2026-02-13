import { shortcuts } from "../data/shortcuts";
import { Hashtable } from "../utilities/hashtable";
import { create, createImage } from "../utilities/html";
import { assertNotNull } from "../utilities/misc";
import { FaviconCache } from "./favicon-cache";
import { FaviconRegistry } from "./favicon-registry";

export const MAX_PARALLEL_FAVICON_JOBS = 10;

//----------------------------------------------------------------------------------------------------------------------
// Entry point for to retrieve favicons and trigger loads
//----------------------------------------------------------------------------------------------------------------------

export class FaviconManager {
    private readonly domains = new Hashtable<Array<string>>();
    private readonly cache = new FaviconCache();
    private registry;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    public constructor() {
        shortcuts.values.forEach(shortcut => {
            shortcut.all
                .map(item => item.link)
                .flatMap(link => link.faviconUrls)
                .forEach(url => {
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
            .sort((domain1, domain2) => domain1.localeCompare(domain2));
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

        return domains.sort((domain1, domain2) => domain1.localeCompare(domain2));
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
            .map(entry => ({ filename: entry.key, url: entry.value }))
            .sort((a, b) => a.filename.localeCompare(b.filename));
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
            .sort((item1, item2) => item1.path.localeCompare(item2.path));
    }
}
