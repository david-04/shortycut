import { pages } from "../data/page";
import { Hashtable } from "../utilities/hashtable";
import { FaviconDomain, FaviconLoadScope } from "./favicon";
import { FaviconCache } from "./favicon-cache";
import { FaviconLoadJob } from "./favicon-load-job";
import { MAX_PARALLEL_FAVICON_JOBS } from "./favicon-manager";

//----------------------------------------------------------------------------------------------------------------------
// A favicon registry that manages and load-balances the load and preload process
//----------------------------------------------------------------------------------------------------------------------

export class FaviconRegistry {
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
