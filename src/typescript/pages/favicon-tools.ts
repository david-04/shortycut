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

        private readonly domains = {
            pending: {} as { [index: string]: string },
            online: new Array<Favicon>(),
            offline: new Array<Favicon>(),
            missing: new Array<string>(),
            effective: {} as { [index: string]: boolean }
        };

        //--------------------------------------------------------------------------------------------------------------
        // Initialize the page and start loading all favicons
        //--------------------------------------------------------------------------------------------------------------

        public constructor() {

            this.refreshPageContent = this.refreshPageContent.bind(this);
            this.showCurlCommands = this.showCurlCommands.bind(this);
            this.selectAllCurlCommands = this.selectAllCurlCommands.bind(this);

            for (const keyword of Object.keys(shortcuts)) {
                for (const link of shortcuts[keyword].all.map(item => item.link)) {
                    const { protocol, domain } = FaviconManager.extractProtocolAndDomain(link.url);
                    if ('file' !== protocol && 'https' !== this.domains.pending[domain]) {
                        this.domains.pending[domain] = protocol;
                    }
                }
            }

            for (const domain of Object.keys(this.domains.pending)) {
                faviconManager.createFavicon(`${this.domains.pending[domain]}://${domain}`)
            }

            this.dom.configWarning.style.display = config.homepage.suggestions.showFavicons ? 'none' : 'block';
            this.refreshPageContent();
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

        private showCurlCommands() {
            this.dom.curlLink.style.display = 'none';
            this.dom.curlTextarea.style.display = 'block';
        }

        private selectAllCurlCommands() {
            this.dom.curlTextarea.select();
        }

        //--------------------------------------------------------------------------------------------------------------
        // Check if further favicons have been loaded and update the view
        //--------------------------------------------------------------------------------------------------------------

        private refreshPageContent() {

            for (const domain of Object.keys(this.domains.pending)) {
                const favicon = faviconManager.getFavicon(domain);
                if (favicon) {
                    if (!this.domains.effective[favicon.effectiveDomain]) {
                        if (favicon.url) {
                            if (favicon.isStoredLocally) {
                                this.addOfflineFavicon(favicon.url);
                            } else {
                                this.addOnlineFavicon(favicon.effectiveDomain, favicon.url);
                            }
                        } else {
                            this.addMissingFavicon(favicon.domain);
                        }
                        this.domains.effective[favicon.effectiveDomain] = true;
                    }
                    delete this.domains.pending[domain];
                }
            }
            this.updateProgress();
            if (Object.keys(this.domains.pending).length) {
                setTimeout(this.refreshPageContent, 250);
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Display favicons
        //--------------------------------------------------------------------------------------------------------------

        private addOnlineFavicon(domain: string, url: string) {
            const filename = `${this.getBaseFilename(domain)}.${url.replace(/^(.*\.|[^.]*$)/, '') || 'ico'}`;
            this.dom.onlineListing.appendChild(create('div.row', [
                create('div.icon', this.createLink(url, filename)),
                create('div.domain', filename)
            ]));
            this.dom.curlTextarea.value += `curl -s -L -o "${filename}" "${url}"\n`;
            this.dom.online.style.display = 'block';
        }

        private createLink(url: string, filename: string) {
            return create('a', createImage(url), element => {
                (element as HTMLAnchorElement).download = filename;
                (element as HTMLAnchorElement).href = url;
                element.addEventListener('click', () => this.onClickIcon(url, filename));
            });
        }

        private onClickIcon(url: string, filename: string) {
            console.log(filename);
            fetch(url).then(function (response) {
                console.log(response);
            }).catch(function (err) {
                console.log('Fetch problem: ' + err.message);
            });
        }

        private addMissingFavicon(domain: string) {
            this.dom.missingListing.appendChild(create('div.row', this.getBaseFilename(domain)));
            this.dom.missing.style.display = 'block';
        }

        private addOfflineFavicon(url: string) {
            const filename = url.replace(/^\//, '');
            this.dom.offlineListing.appendChild(create('div.row', [
                create('div.icon', createImage(url)),
                create('div.domain', filename)
            ]));
            this.dom.offline.style.display = 'block';
        }

        //--------------------------------------------------------------------------------------------------------------
        // Update the loading status
        //--------------------------------------------------------------------------------------------------------------

        private updateProgress() {
            if (0 === Object.keys(this.domains.pending).length) {
                this.dom.pending.style.display = 'none';
            } else {
                this.dom.pending.style.display = 'block';
                this.dom.pendingListing.innerHTML = Object.keys(this.domains.pending)
                    .map(domain => domain.match(/^www\..*\..*/) ? domain.replace(/^www\./, '') : domain)
                    .map(domain => sanitize(domain))
                    .join('<br>');
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Remove the wwww subdomain
        //--------------------------------------------------------------------------------------------------------------

        private getBaseFilename(domain: string) {
            return (domain.match(/^www\..*\..*/) ? domain.replace(/^www\./, '') : domain).replace(/:/g, '!');
        }
    }
}
