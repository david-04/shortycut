namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // Configuration
    //------------------------------------------------------------------------------------------------------------------

    export let config = null as any as Config;

    //------------------------------------------------------------------------------------------------------------------
    // Shortcuts
    //------------------------------------------------------------------------------------------------------------------

    export type Shortcuts = Hashtable<Shortcut>;

    export let shortcuts = null as any as Shortcuts;

    export let defaultSearchEngine: Shortcut | null = null;

    //------------------------------------------------------------------------------------------------------------------
    // Various
    //------------------------------------------------------------------------------------------------------------------

    export let queryParameters = null as any as QueryParameters;
    export let redirector = null as any as Redirector;
    export let router = null as any as Router;
    export let faviconManager = null as any as FaviconManager;
    export let javaScriptLoader = null as any as JavaScriptLoader;
    export let hotkeySelector = null as any as HotkeySelector;

    //------------------------------------------------------------------------------------------------------------------
    // Pages
    //------------------------------------------------------------------------------------------------------------------

    export interface Page {
        show(): void;
        hide(): void;
        hasMenu(): boolean;
    }

    class Pages {

        private readonly pages = {
            browserIntegration: null as BrowserIntegration | null,
            error: null as ErrorPage | null,
            home: null as HomePage | null,
            linkTools: null as LinkTools | null,
            faviconTools: null as FaviconToolsPage | null,
            redirect: null as RedirectPage | null,
            setup: null as SetupPage | null,
            shortlist: null as ShortlistPage | null
        }

        public hideAllExcept(page: Page | null) {
            Object.keys(this.pages).map(key => {
                const value = (this.pages as any)[key] as Page | Function | null;
                if (value && value !== page && 'object' === typeof value && 'function' === typeof value.hide) {
                    value.hide();
                }
            });
        }

        public get error() {
            return this.pages.error = this.pages.error ?? new ErrorPage();
        }

        public get browserIntegration() {
            return this.pages.browserIntegration = this.pages.browserIntegration ?? new BrowserIntegration();
        }

        public get home() {
            return this.pages.home = this.pages.home ?? new HomePage();
        }

        public get linkTools() {
            return this.pages.linkTools = this.pages.linkTools ?? new LinkTools();
        }

        public get faviconTools() {
            return this.pages.faviconTools = this.pages.faviconTools ?? new FaviconToolsPage();
        }

        public get redirect() {
            return this.pages.redirect = this.pages.redirect ?? new RedirectPage();
        }

        public get setup() {
            return this.pages.setup = this.pages.setup ?? new SetupPage();
        }

        public get shortlist() {
            return this.pages.shortlist = this.pages.shortlist ?? new ShortlistPage();
        }
    }

    export const pages = new Pages();

    //------------------------------------------------------------------------------------------------------------------
    // Data collected during the start-up phase
    //------------------------------------------------------------------------------------------------------------------

    export const dynamicLinkProtocol = 'function';

    class StartupCache {

        public readonly exceptions = new Array<ErrorEvent>();
        public readonly config = new Array<object>();
        public readonly shortcuts = new Array<string>();
        public readonly initializationErrors = new Array<InitializationError>();

        private _dynamicLinks?: Hashtable<DynamicLink>;
        public get dynamicLinks() {
            return this._dynamicLinks = this._dynamicLinks ?? new Hashtable<DynamicLink>();
        }
    }

    export const startupCache = new StartupCache();

    //------------------------------------------------------------------------------------------------------------------
    // Initialization of global variables once all modules have been loaded
    //------------------------------------------------------------------------------------------------------------------

    export function initializeVariables() {
        config = DEFAULT_CONFIG;
        shortcuts = new Hashtable<Shortcut>();
        queryParameters = new QueryParameters();
        redirector = new Redirector();
        router = new Router();
        faviconManager = new FaviconManager();
        hotkeySelector = new HotkeySelector();
    }
}
