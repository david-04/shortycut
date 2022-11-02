namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // A menu of links attached to the current keyword
    //------------------------------------------------------------------------------------------------------------------

    export class Shortlist implements Page {

        private readonly dom = {
            shortlist: assertNotNull(document.getElementById("shortlist")),
            listItems: new Array<HTMLElement>()
        };

        private links = new Array<FinalizedLink>;
        private focusIndex = 0;

        //--------------------------------------------------------------------------------------------------------------
        // Initialize the shortlist
        //--------------------------------------------------------------------------------------------------------------

        constructor() {
            this.onKey = this.onKey.bind(this);
            this.openAll = this.openAll.bind(this);
        }

        public hasMenu() {
            return true;
        }

        //--------------------------------------------------------------------------------------------------------------
        // Populate the shortlist
        //--------------------------------------------------------------------------------------------------------------

        public populate(links: FinalizedLinks) {
            this.links = [null as unknown as FinalizedLink, ...links.links];
            this.dom.listItems = [
                this.createHeader(),
                ...this.links.slice(1).map((link, index) => this.createLink(
                    index + 1,
                    link.urls[0].permalink,
                    link.htmlDescription,
                    event => this.openSelected(event, index + 1),
                    sanitize(link.urls[0]?.url.replace(/^[a-z]+:\/\/+/i, "").replace(/[#?].*/, "") ?? ""),
                    link.urls[0]?.url
                ))
            ];
            this.dom.shortlist.innerHTML = "";
            this.dom.listItems.forEach(href => this.dom.shortlist.appendChild(href));
            this.focusIndex = 0;
            return this;
        }

        private createHeader() {
            return this.createLink(0, "javascript:void(0)", "Open all", this.openAll);
        }

        private createLink(
            index: number,
            permalink: string,
            title: string,
            onClick: (event: MouseEvent) => void,
            subtitle?: string,
            url?: string
        ) {
            const a = document.createElement("a");
            a.href = permalink;
            a.id = `shortlist${index}`;
            const favicon = url && config.homepage.suggestions.showFavicons ? faviconManager.getFavicon(url) : "";
            a.innerHTML = create("div.row", [
                create("div.icon", createImage("resources/arrow.svg")),
                create("div.text", [
                    create("div.title", title),
                    url && subtitle ? create("div.url", favicon, subtitle) : ""
                ])
            ]).outerHTML;
            a.addEventListener("click", onClick);
            return a;
        }

        //--------------------------------------------------------------------------------------------------------------
        // Show and hide the page
        //--------------------------------------------------------------------------------------------------------------

        public show() {
            this.addEventHandlers();
            this.dom.shortlist.style.display = "flex";
            this.dom.listItems[this.focusIndex].focus();
        }

        public hide() {
            this.removeEventHandlers();
            this.dom.shortlist.style.display = "none";
        }

        //--------------------------------------------------------------------------------------------------------------
        // Add and remove event handlers
        //--------------------------------------------------------------------------------------------------------------

        private addEventHandlers() {
            ["keyup", "keydown"].forEach(event => document.addEventListener(event as "keyup", this.onKey));
        }

        private removeEventHandlers() {
            ["keyup", "keydown"].forEach(event => document.removeEventListener(event as "keyup", this.onKey));
        }

        //--------------------------------------------------------------------------------------------------------------
        // Event handlers
        //--------------------------------------------------------------------------------------------------------------

        private onKey(event: KeyboardEvent) {

            if ("keyup" === event.type) {
                return false;
            }

            const id = document.activeElement?.id || "";
            const current = id.match(/^shortlist\d+$/) ? parseInt(id.replace(/shortlist/, "")) : -1;

            if ("Enter" === event.key) {
                if (0 === current) {
                    return this.openAll(event);
                } else if (current < this.links.length) {
                    return this.openSelected(event, current);
                } else {
                    event.preventDefault();
                    return false;
                }
            } else {
                this.focusIndex = this.getTargetIndex(event.key, current);
                this.dom.listItems[this.focusIndex].focus();
                return true;
            }
        }

        private openSelected(event: KeyboardEvent | MouseEvent, current: number) {
            redirector.redirect(
                { links: [this.links[current]], onMultiLink: OnMultiLink.OPEN_IN_NEW_TAB },
                queryParameters.facets.newTabs ? RedirectMode.NEW_TAB : RedirectMode.PRESERVE_HISTORY
            );
            event.preventDefault();
            return false;
        }

        private openAll(event: KeyboardEvent | MouseEvent) {
            redirector.redirect(
                { links: this.links.slice(1), onMultiLink: OnMultiLink.OPEN_IN_NEW_TAB },
                RedirectMode.PRESERVE_HISTORY
            );
            event.preventDefault();
            return false;
        }

        private getTargetIndex(key: string, current: number) {
            if (this.isArrowDown(key) || "Enter" === key || "Tab" === key) {
                return Math.min(Math.max(current + 1, 0), this.links.length - 1);
            } else if (this.isArrowUp(key)) {
                return current < 0
                    ? this.links.length - 1
                    : Math.max(Math.min(current - 1, this.links.length - 1), 0);
            } else if ("Home" === key || "PageUp" === key) {
                return 0;
            } else if ("End" === key || "PageDown" === key) {
                return this.links.length - 1;
            }
            return current;
        }

        private isArrowDown(key: string) {
            return "ArrowDown" === key || "Down" === key;
        }

        private isArrowUp(key: string) {
            return "ArrowUp" === key || "Up" === key;
        }
    }
}
