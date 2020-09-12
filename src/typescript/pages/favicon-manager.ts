namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // Information about a favicon for a single (sub-) domain
    //------------------------------------------------------------------------------------------------------------------

    export interface Favicon {

        readonly domain: string;
        readonly effectiveDomain: string;
        readonly isStoredLocally: boolean;
        readonly url?: string;
    }

    //------------------------------------------------------------------------------------------------------------------
    // An image that is (or has been) loading
    //------------------------------------------------------------------------------------------------------------------

    class ObservableImage {

        public readonly element: HTMLImageElement;
        private status: 'loading' | 'completed' | 'failed' = 'loading';

        //--------------------------------------------------------------------------------------------------------------
        // Initialize (i.e. start loading) and image
        //--------------------------------------------------------------------------------------------------------------
        public constructor(url: string) {
            this.element = createImage(url, element => {
                element.addEventListener('load', () => this.status = 'completed');
                element.addEventListener('error', () => this.status = 'failed');
            }) as HTMLImageElement;
        }

        //--------------------------------------------------------------------------------------------------------------
        // Add an event handler for a failed image load
        //--------------------------------------------------------------------------------------------------------------

        public onLoadCompleted(action: () => void) {
            if ('completed' === this.status) {
                action();
            } else if ('loading' === this.status) {
                this.element.addEventListener('load', action);
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Add an event handler for a completely loaded image
        //--------------------------------------------------------------------------------------------------------------

        public onLoadFailed(action: () => void) {
            if ('failed' === this.status) {
                action();
            } else if ('loading' === this.status) {
                this.element.addEventListener('error', action);
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // A job that represents attempts to load the favicon using different patterns
    //------------------------------------------------------------------------------------------------------------------

    class FaviconDiscoveryJob {

        private static readonly EXTENSIONS = ['ico', 'png', 'jpg', 'svg', 'jpeg'];
        private readonly FOLDERS = config.homepage.suggestions.faviconFolders ?? [];

        public readonly domains = new Array<string>();
        private folder = 0;
        private extension = 0;

        //--------------------------------------------------------------------------------------------------------------
        // Initialize the discovery job
        //--------------------------------------------------------------------------------------------------------------

        public constructor(public protocol: string, domain: string) {
            this.domains.push(domain);
            if (this.isLocal && domain.match(/^www\..*\..*/)) {
                this.domains.push(domain.replace(/^www\./, ''));
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Determine if we currently explore a local folder
        //--------------------------------------------------------------------------------------------------------------

        public get isLocal() {
            return this.folder < this.FOLDERS.length;
        }

        //--------------------------------------------------------------------------------------------------------------
        // Get the subdomain currently used
        //--------------------------------------------------------------------------------------------------------------

        public get currentDomain() {
            return this.domains[this.isLocal ? 0 : this.domains.length - 1];
        }

        //--------------------------------------------------------------------------------------------------------------
        // Get the URL of the favicon currently tested
        //--------------------------------------------------------------------------------------------------------------

        public get currentUrl() {
            const domain = this.domains[this.domains.length - 1];
            const ext = FaviconDiscoveryJob.EXTENSIONS[this.extension];
            if (this.isLocal) {
                return `${this.FOLDERS[this.folder]}/${domain.replace(/:/g, '!')}.${ext}`;
            } else {
                return `${this.protocol}://${domain}/favicon.${ext}`;
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Try switching to the next URL
        //--------------------------------------------------------------------------------------------------------------

        public switchToNextUrl() {

            if (this.isLocal) {

                if (FaviconDiscoveryJob.EXTENSIONS.length <= ++this.extension) {
                    this.extension = 0;
                    if (this.FOLDERS.length <= ++this.folder) {
                        if (this.domains[this.domains.length - 1].match(/^[^.]+\.[^.]/)) {
                            this.folder = 0;
                            this.domains.push(this.domains[this.domains.length - 1].replace(/^[^.]+\./, ''));
                        } else {
                            this.domains.length = 1;
                        }
                    }
                }
                return true;

            } else {

                if (this.domains[0].match(/.*\.[0-9]+$/)) {
                    return false;
                }

                this.domains.push(this.domains[this.domains.length - 1].replace(/^[^.]+\./, ''));
                return this.domains[this.domains.length - 2] !== this.domains[this.domains.length - 1];
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Manage favicons
    //------------------------------------------------------------------------------------------------------------------

    export class FaviconManager {

        private cache: ({ [index: string]: Favicon });
        private images: ({ [index: string]: ObservableImage }) = {};

        //--------------------------------------------------------------------------------------------------------------
        // Initialize the favicon manager
        //--------------------------------------------------------------------------------------------------------------

        public constructor() {

            this.onLoadComplete = this.onLoadComplete.bind(this);
            this.onLoadFailed = this.onLoadFailed.bind(this);
            this.cache = this.loadCache();
        }

        //--------------------------------------------------------------------------------------------------------------
        // Create the HTML element containing the favicon
        //--------------------------------------------------------------------------------------------------------------

        public createFavicon(url: string) {

            const { protocol, domain } = FaviconManager.extractProtocolAndDomain(url);
            const image = this.cache['file' === protocol ? '' : domain]?.url;

            if (image) {
                const div = create('div.favicon', createImage(image, element => {
                    if ('file' !== protocol) {
                        element.addEventListener('error', () => this.removeFaviconFromCache(image));
                    }
                }));
                div.dataset['domain'] = domain;
                return div;
            } else {
                this.runJob(new FaviconDiscoveryJob(protocol, domain));
                const div = create('div.favicon');
                div.dataset['domain'] = domain;
                return div;
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Extract the protocol and the domain from a URL
        //--------------------------------------------------------------------------------------------------------------

        public static extractProtocolAndDomain(url: string) {
            return {
                protocol: url.match(/^([a-z]+:\/\/)?/i)![0].replace(/:.*/, '').toLocaleLowerCase() || 'http',
                domain: url.toLocaleLowerCase().replace(/^([a-z]+:\/\/+)?/i, '').replace(/\/.*/, '').toLowerCase()
            };
        }

        //--------------------------------------------------------------------------------------------------------------
        // Retrieve a favicon from the cache (if it exists)
        //--------------------------------------------------------------------------------------------------------------

        public getFavicon(domain: string) {
            return this.cache[domain];
        }

        //--------------------------------------------------------------------------------------------------------------
        // Load the favicon in the background
        //--------------------------------------------------------------------------------------------------------------

        private runJob(job: FaviconDiscoveryJob) {

            const url = job.currentUrl;
            const image = this.images[url] = this.images[url] ?? new ObservableImage(url);
            image.onLoadCompleted(() => this.onLoadComplete(job, image.element));
            image.onLoadFailed(() => this.onLoadFailed(job));
        }

        private onLoadComplete(job: FaviconDiscoveryJob, image: HTMLImageElement) {

            for (const domain of job.domains) {
                this.cache[domain] = {
                    domain,
                    url: job.currentUrl,
                    isStoredLocally: job.isLocal,
                    effectiveDomain: job.domains[job.domains.length - 1]
                };
                const elements = document.querySelectorAll('div.favicon');
                for (let index = 0; index < elements.length; index++) {
                    let div = elements[index];
                    if (div.attributes.getNamedItem('data-domain')?.value === domain && !div.childElementCount) {
                        div.appendChild(image.cloneNode());
                    }
                }
            }
            this.saveCache();
        }

        private onLoadFailed(job: FaviconDiscoveryJob) {

            if (job.switchToNextUrl()) {
                this.runJob(job);
            } else {
                for (const domain of job.domains) {
                    this.cache[domain] = { domain, isStoredLocally: false, effectiveDomain: domain };
                }
                this.saveCache();
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Save and restore the cache using local storage and selectively remove icons that no longer load
        //--------------------------------------------------------------------------------------------------------------

        private saveCache() {
            window.localStorage.setItem('shortycut.favicon-urls', JSON.stringify(this.cache));
            window.localStorage.setItem('shortycut.favicon-folders', this.getFaviconFolders());
        }

        private loadCache() {

            let cache: ({ [index: string]: Favicon }) = {};
            try {
                if (window.localStorage.getItem('shortycut.favicon-folders') === this.getFaviconFolders()) {
                    cache = JSON.parse(window.localStorage.getItem('shortycut.favicon-urls') ?? '{}');
                }
            } catch (ignored) { }
            cache[''] = { domain: '', isStoredLocally: true, url: 'resources/local.svg', effectiveDomain: '' };
            return cache;
        }

        private getFaviconFolders() {
            return config.homepage.suggestions.faviconFolders.join('\t');
        }

        private removeFaviconFromCache(domain: string, protocol?: string) {

            if (!protocol) {
                this.removeFaviconFromCache(domain, 'http');
                this.removeFaviconFromCache(domain, 'https');
            } else {
                const job = new FaviconDiscoveryJob(protocol, domain);
                do {
                    delete this.cache[job.currentDomain];
                    delete this.images[job.currentUrl];
                } while (job.switchToNextUrl());
                this.removeFaviconFromPage(domain);
                this.saveCache();
            }
        }

        private removeFaviconFromPage(domain: string) {

            const elements = document.querySelectorAll('div.favicon');
            for (let index = 0; index < elements.length; index++) {
                let div = elements[index];
                if (div.attributes.getNamedItem('data-domain')?.value === domain) {
                    div.innerHTML = '';
                }
            }
        }
    }
}
