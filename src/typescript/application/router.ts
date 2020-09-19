namespace shortycut {

    export class Router {

        private readonly menu = new Menu();
        private readonly history = new Array<Page>();

        //--------------------------------------------------------------------------------------------------------------
        // Initialize the router
        //--------------------------------------------------------------------------------------------------------------

        public constructor() {
            this.goBackOrHome = this.goBackOrHome.bind(this);
            this.goHome = this.goHome.bind(this);
            this.onHashChange = this.onHashChange.bind(this);
            this.onKeyDown = this.onKeyDown.bind(this);
            window.addEventListener('hashchange', this.onHashChange);
            document.addEventListener('keydown', this.onKeyDown);
        }

        //--------------------------------------------------------------------------------------------------------------
        // Navigating between pages
        //--------------------------------------------------------------------------------------------------------------

        public goto(page: Page) {
            this.history.length = this.getCurrentHistoryIndex() + 1;
            this.history.push(page);
            if (1 === this.history.length) {
                this.showIndex(0);
            } else {
                window.location.hash = `${this.history.length - 1}`;
                this.onHashChange();
            }
        }

        public goHome() {
            this.goto(pages.home);
        }

        public goBackOrHome() {
            if (1 < this.history.length && 0 < this.getCurrentHistoryIndex()) {
                window.history.go(-1);
            } else if (this.history[this.getCurrentHistoryIndex()] !== pages.home) {
                this.goto(pages.home);
            }
        }

        public goBackToAndResetHomepage() {
            this.history.length = 0;
            this.history.push(pages.home.populate());
            if (window.location.hash) {
                window.location.hash = '';
            }
            this.showIndex(0);
            if (queryParameters.facets.noFocus) {
                pages.home.removeFocus();
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Event handlers
        //--------------------------------------------------------------------------------------------------------------

        private onHashChange() {
            this.showIndex(this.getCurrentHistoryIndex());
        }

        private getCurrentHistoryIndex() {
            let index = parseInt(window.location.hash.replace('#', ''));
            return Math.min(Math.max(isNaN(index) ? 0 : index, 0), this.history.length - 1);
        }

        private showIndex(index: number) {
            const page = this.history[index];
            if (page) {
                pages.hideAllExcept(page);
                page.show();
                if (page.hasMenu()) {
                    if (page === pages.home) {
                        this.menu.showBurgerIcon();
                    } else {
                        this.menu.showCloseIcon(this.goBackOrHome)
                    }
                } else {
                    this.menu.hide();
                }
            }
        }

        private onKeyDown(event: KeyboardEvent) {
            if (('Escape' === event.key || 'Esc' === event.key)) {
                if (this.history[this.history.length - 1] !== pages.home) {
                    this.goBackOrHome();
                    event.preventDefault();
                    return false;
                }
            }
            return true;
        }
    }
}
