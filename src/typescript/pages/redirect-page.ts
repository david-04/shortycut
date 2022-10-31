namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // The page displayed when redirecting to the target page
    //------------------------------------------------------------------------------------------------------------------

    export class RedirectPage implements Page {

        private readonly dom = {
            redirect: document.querySelector("#redirect") as HTMLElement,
            title: document.querySelector("#redirect .title") as HTMLElement,
            url: document.querySelector("#redirect .url") as HTMLElement,
        };

        //--------------------------------------------------------------------------------------------------------------
        // Populate the page
        //--------------------------------------------------------------------------------------------------------------

        public populate(link: Link) {
            this.dom.title.innerHTML = link.segments.descriptionHtml;
            this.dom.url.innerHTML = sanitize(link.url);
            return this;
        }

        public hasMenu() {
            return false;
        }

        //--------------------------------------------------------------------------------------------------------------
        // Show and hide the page
        //--------------------------------------------------------------------------------------------------------------

        public show() {
            document.body.append(create("div:html", "&nbsp;"));
        }

        public hide() {
            this.dom.redirect.style.display = "none";
        }
    }
}
