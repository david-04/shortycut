namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // A menu of links attached to the current keyword
    //------------------------------------------------------------------------------------------------------------------

    export class FaviconToolsPage implements Page {

        private readonly dom = {
            faviconTools: document.querySelector('#favicon-tools') as HTMLElement,
            configWarning: document.querySelector('#favicon-tools .config-warning') as HTMLElement,
            curlLink: document.querySelector('#favicon-tools .online a.curl') as HTMLElement,
            curlTextarea: document.querySelector('#favicon-tools .online textarea.curl') as HTMLTextAreaElement,
            pending: document.querySelector('#favicon-tools .pending') as HTMLElement,
            pendingListing: document.querySelector('#favicon-tools .pending .listing') as HTMLElement,
            online: document.querySelector('#favicon-tools .online') as HTMLElement,
            onlineListing: document.querySelector('#favicon-tools .online .listing') as HTMLElement,
            missing: document.querySelector('#favicon-tools .missing') as HTMLElement,
            missingListing: document.querySelector('#favicon-tools .missing .listing') as HTMLElement,
            offline: document.querySelector('#favicon-tools .offline') as HTMLElement,
            offlineListing: document.querySelector('#favicon-tools .offline .listing') as HTMLElement,
        };

        //--------------------------------------------------------------------------------------------------------------
        // Initialize the page and start loading all favicons
        //--------------------------------------------------------------------------------------------------------------

        public constructor() {

            this.showCurlCommands = this.showCurlCommands.bind(this);
            this.selectAllCurlCommands = this.selectAllCurlCommands.bind(this);

            this.dom.configWarning.style.display = config.homepage.suggestions.showFavicons ? 'none' : 'block';
        }

        public hasMenu() {
            return true;
        }

        //--------------------------------------------------------------------------------------------------------------
        // Show and hide the page
        //--------------------------------------------------------------------------------------------------------------

        public show() {
            this.addEventHandlers();
            this.dom.faviconTools.style.display = 'flex';
            faviconManager.startFullRescan();
            this.refreshPageContent();
        }

        public hide() {
            this.removeEventHandlers();
            this.dom.faviconTools.style.display = 'none';
        }

        private addEventHandlers() {
            this.dom.curlLink.addEventListener('click', this.showCurlCommands);
            this.dom.curlTextarea.addEventListener('focus', this.selectAllCurlCommands);
        }

        private removeEventHandlers() {
            this.dom.curlLink.removeEventListener('click', this.showCurlCommands);
            this.dom.curlTextarea.addEventListener('focus', this.selectAllCurlCommands);
        }

        //--------------------------------------------------------------------------------------------------------------
        // Event handlers
        //--------------------------------------------------------------------------------------------------------------

        private showCurlCommands(event: MouseEvent) {
            this.dom.curlLink.style.display = 'none';
            this.dom.curlTextarea.style.display = 'block';
            event.preventDefault();
            return false;
        }

        private selectAllCurlCommands() {
            this.dom.curlTextarea.select();
        }

        //--------------------------------------------------------------------------------------------------------------
        // Check if further favicons have been loaded and update the view
        //--------------------------------------------------------------------------------------------------------------

        public refreshPageContent() {

            if ('none' !== this.dom.faviconTools.style.display) {
                this.refreshPageContentPending();
                this.refreshPageContentMissing();
                this.refreshPageContentOnline();
                this.refreshPageContentOffline();
            }
        }

        private refreshPageContentPending() {
            const domains = faviconManager.getPendingDomains();
            if (domains.length) {
                this.dom.pendingListing.innerHTML =
                    create('div', domains.map(domain => create('div.row', sanitize(domain)))).innerHTML;
            }
            this.dom.pending.style.display = domains.length ? 'block' : 'none';
        }

        private refreshPageContentMissing() {
            const domains = faviconManager.getMissingDomains();
            if (domains.length) {
                this.dom.missingListing.innerHTML =
                    create('div', domains.map(domain => create('div.row', sanitize(domain)))).innerHTML;
            }
            this.dom.missing.style.display = domains.length ? 'block' : 'none';
        }

        private refreshPageContentOnline() {
            const icons = faviconManager.getOnlineDomains();
            if (icons.length) {
                this.dom.curlTextarea.value =
                    icons.map(item => `curl -s -L -o "${item.filename}" "${item.url}"`).join('\n') + '\n';
                this.dom.onlineListing.innerHTML = icons.map(item =>
                    create('div.row', [
                        create('div.icon',
                            create('a', createImage(item.url), element => {
                                (element as HTMLAnchorElement).download = item.filename;
                                (element as HTMLAnchorElement).href = item.url;
                            })
                        ),
                        create('div.domain', sanitize(item.filename))
                    ])
                ).map(element => element.outerHTML).join('');
            }
            this.dom.online.style.display = icons.length ? 'block' : 'none';
        }

        private refreshPageContentOffline() {
            const icons = faviconManager.getOfflineDomains();
            if (icons.length) {
                this.dom.offlineListing.innerHTML = icons.map(item =>
                    create('div.row', [
                        create('div.icon', createImage(item.url)),
                        create('div.domain', sanitize(item.path))
                    ])
                ).map(element => element.outerHTML).join('');
            }
            this.dom.offline.style.display = icons.length ? 'block' : 'none';
        }
    }
}
