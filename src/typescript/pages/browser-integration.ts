namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // A menu of links attached to the current keyword
    //------------------------------------------------------------------------------------------------------------------

    export class BrowserIntegration implements Page {

        private readonly dom = {
            browserIntegration: document.querySelector("#browser-integration") as HTMLElement,
            homepage: document.querySelector("#browser-integration .homepage") as HTMLAnchorElement,
            facets: {
                newTabs: document.querySelector("#browser-integration .new-tabs") as HTMLInputElement,
                noFocus: document.querySelector("#browser-integration .no-focus") as HTMLInputElement
            },
            form: document.querySelector("#browser-integration .form") as HTMLFormElement,
            keyword: document.querySelector("#browser-integration .keyword") as HTMLAnchorElement,
            webServerRequired: document.querySelector("#browser-integration .web-server-required") as HTMLElement,
            searchEngine: document.querySelector("#browser-integration .search-engine") as HTMLElement,
            openSearch: document.querySelector("#browser-integration .open-search") as HTMLAnchorElement,
            popUp: document.querySelector("#browser-integration .pop-up") as HTMLInputElement
        } as const;

        //--------------------------------------------------------------------------------------------------------------
        // Initialize the link-tools page
        //--------------------------------------------------------------------------------------------------------------

        public constructor() {

            this.updateHomepageLink = this.updateHomepageLink.bind(this);

            this.dom.facets.newTabs.checked = queryParameters.facets.newTabs;
            this.dom.facets.noFocus.checked = queryParameters.facets.noFocus;
            this.updateHomepageLink();

            const baseUrl = globalThis.location.href.replace(/[#?].*/, "");
            this.dom.form.action = baseUrl;
            this.dom.keyword.innerHTML = `${sanitize(baseUrl)}?q=%s`;
            this.dom.keyword.href = `${baseUrl}?q=%s`;

            if (globalThis.location.href.startsWith("http://")) {
                this.dom.searchEngine.style.display = "block";
            } else {
                this.dom.webServerRequired.style.display = "block";
            }

            const baseFolder = getWindowLocationPath();
            this.dom.openSearch.href = `${baseFolder}data/search.xml`;
            this.dom.openSearch.innerHTML = sanitize(`${baseFolder}data/search.xml`);

            this.dom.popUp.addEventListener("click", () => {
                for (let index = 0; index <= 1; index++) {
                    const popUp = globalThis.open("");
                    if (popUp?.document) {
                        popUp.document.body.innerHTML = ([
                            "This window was opened by ShortyCut.",
                            "Pop-ups are not being blocked.",
                            "You can close this windows."
                        ].join("<br>"));
                        popUp.document.title = "ShortyCut Pop-Up Test";
                    }
                }
            });
        }

        public hasMenu() {
            return true;
        }

        //--------------------------------------------------------------------------------------------------------------
        // Show and hide the page
        //--------------------------------------------------------------------------------------------------------------

        public show() {
            this.dom.browserIntegration.style.display = "flex";
            this.addEventHandlers();
        }

        public hide() {
            this.dom.browserIntegration.style.display = "none";
            this.removeEventHandlers();
        }

        //--------------------------------------------------------------------------------------------------------------
        // Event handlers
        //--------------------------------------------------------------------------------------------------------------

        public addEventHandlers() {
            forEachProperty(this.dom.facets, (_key, checkbox) =>
                checkbox.addEventListener("click", this.updateHomepageLink)
            );
        }

        public removeEventHandlers() {
            forEachProperty(this.dom.facets, (_key, checkbox) =>
                checkbox.removeEventListener("click", this.updateHomepageLink)
            );
        }

        private updateHomepageLink() {
            const facets = Object.keys(this.dom.facets)
                .filter(facet => getProperty(this.dom.facets, facet)?.checked)
                .map(facet => "noFocus" === facet ? "no-focus" : facet)
                .map(facet => "newTabs" === facet ? "new-tabs" : facet);

            let url = globalThis.location.href.replace(/[#?].*/, "");
            if (facets.length) {
                url += `?facets=${facets.join(",")}`;
            }
            this.dom.homepage.innerHTML = sanitize(url);
            this.dom.homepage.href = url;
        }
    }
}
