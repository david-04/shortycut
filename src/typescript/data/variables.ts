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
            home: null as Homepage | null,
            linkTools: null as LinkTools | null,
            faviconTools: null as FaviconTools | null,
            redirect: null as RedirectPage | null,
            setup: null as SetupInstructions | null,
            shortlist: null as Shortlist | null
        }

        public hideAllExcept(page: Page | null) {
            Object.keys(this.pages).forEach(key => {
                const value = (this.pages as any)[key] as Page | null;
                if (value && value !== page && 'object' === typeof value && 'function' === typeof value.hide) {
                    value.hide();
                }
            });
        }

        public get error() {
            const error = this.pages.error ?? new ErrorPage()
            this.pages.error = error;
            return error;
        }

        public get browserIntegration() {
            const browserIntegration = this.pages.browserIntegration ?? new BrowserIntegration();
            this.pages.browserIntegration = browserIntegration;
            return browserIntegration;
        }

        public get home() {
            const home = this.pages.home ?? new Homepage();
            this.pages.home = home;
            return home;
        }

        public get linkTools() {
            const linkTools = this.pages.linkTools ?? new LinkTools();
            this.pages.linkTools = linkTools;
            return linkTools;
        }

        public get faviconTools() {
            const faviconTools = this.pages.faviconTools ?? new FaviconTools();
            this.pages.faviconTools = faviconTools;
            return faviconTools;
        }

        public get redirect() {
            const redirect = this.pages.redirect ?? new RedirectPage();
            this.pages.redirect = redirect;
            return redirect;
        }

        public get setup() {
            const setup = this.pages.setup ?? new SetupInstructions();
            this.pages.setup = setup;
            return setup;
        }

        public get shortlist() {
            const shortlist = this.pages.shortlist ?? new Shortlist();
            this.pages.shortlist = shortlist;
            return shortlist;
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
            const dynamicLinks = this._dynamicLinks ?? new Hashtable<DynamicLink>();
            this._dynamicLinks = dynamicLinks;
            return dynamicLinks;
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
        hotkeySelector = new HotkeySelector();
    }
}
