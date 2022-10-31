namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // A menu of links attached to the current keyword
    //------------------------------------------------------------------------------------------------------------------

    export class SetupInstructions implements Page {

        public static readonly VALIDATE = "validate";
        private setupComplete = false;

        private readonly dom = {
            setup: document.querySelector("#setup") as HTMLElement,
            error: document.querySelector("#setup .error") as HTMLElement,
            rootPath: document.querySelector("#setup .root-path") as HTMLElement,
            header: document.querySelector("#setup h1") as HTMLElement,
            pre: document.querySelector("#setup pre") as HTMLPreElement,
            syntaxWarning: document.querySelector("#setup .syntax-warning") as HTMLElement
        };

        public hasMenu() {
            return false;
        }

        //--------------------------------------------------------------------------------------------------------------
        // Populate the page
        //--------------------------------------------------------------------------------------------------------------

        public populate(mode: string) {

            if (SetupInstructions.VALIDATE === mode) {
                if (!startupCache.config.length || !startupCache.shortcuts.length) {
                    this.dom.error.style.display = "block";
                    this.dom.header.style.display = "none";
                } else {
                    this.setupComplete = true;
                    redirector.openUrl(window.location.href.replace(/\?.*/, ""), RedirectMode.PRESERVE_HISTORY);
                }
            }

            let indexPath = "shortycut";
            if (0 === window.location.href.search(/^(file:\/{2}|[a-z]:|\/)/i)) {
                indexPath = getWindowLocationPath()
                    .replace(/^file:\/+/, "")
                    .replace(/[?#].*/, "")
                    .replace(/\/$/, "");
                if (":" === indexPath.charAt(1)) {
                    indexPath = indexPath.replace(/\//g, "\\");
                }
            }
            this.dom.rootPath.innerHTML = sanitize(indexPath);

            this.dom.pre.innerHTML = this.dom.pre.innerHTML.replace(/\n[ \t]+/g, "\n");

            this.dom.syntaxWarning.style.display = supportsBacktickSyntax() ? "none" : "block";

            return this;
        }

        //--------------------------------------------------------------------------------------------------------------
        // Show and hide the page
        //--------------------------------------------------------------------------------------------------------------

        public show() {
            if (!this.setupComplete) {
                this.dom.setup.style.display = "flex";
            }
        }

        public hide() {
            this.dom.setup.style.display = "none";
        }
    }
}
