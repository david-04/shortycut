import { Redirector } from "../application/redirector";
import { Router } from "../application/router";
import { BrowserIntegration } from "../pages/browser-integration";
import { ErrorPage } from "../pages/error-page";
import { FaviconTools } from "../pages/favicon-tools";
import { Homepage } from "../pages/homepage";
import { LinkTools } from "../pages/link-tools";
import { RedirectPage } from "../pages/redirect-page";
import { SetupInstructions } from "../pages/setup-instructions";
import { Shortlist } from "../pages/shortlist";
import { InitializationError } from "../utilities/error";
import { Hashtable } from "../utilities/hashtable";
import { HotkeySelector } from "../utilities/hotkey-selector";
import { forEachProperty } from "../utilities/misc";
import { DEFAULT_CONFIG } from "./config";
import { QueryParameters } from "./query-parameters";
import { DynamicShortcut, Shortcut } from "./shortcut";
import { state } from "./state";

export type Shortcuts = Hashtable<Shortcut>;

//----------------------------------------------------------------------------------------------------------------------
// Pages
//----------------------------------------------------------------------------------------------------------------------

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
        shortlist: null as Shortlist | null,
    };

    public hideAllExcept(page: Page | null) {
        forEachProperty(this.pages, (_key, value) => {
            if (value && value !== page && "object" === typeof value && "function" === typeof value.hide) {
                value.hide();
            }
        });
    }

    public get error() {
        const error = this.pages.error ?? new ErrorPage();
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

//----------------------------------------------------------------------------------------------------------------------
// Data collected during the start-up phase
//----------------------------------------------------------------------------------------------------------------------

export const dynamicLinkProtocol = "function";

class StartupCache {
    public readonly exceptions = new Array<ErrorEvent>();
    public readonly config = new Array<object>();
    public readonly shortcuts = new Array<string>();
    public readonly initializationErrors = new Array<InitializationError>();

    private _dynamicLinks?: Hashtable<DynamicShortcut>;
    public get dynamicLinks() {
        const dynamicLinks = this._dynamicLinks ?? new Hashtable<DynamicShortcut>();
        this._dynamicLinks = dynamicLinks;
        return dynamicLinks;
    }
}

export const startupCache = new StartupCache();

//----------------------------------------------------------------------------------------------------------------------
// Initialization of global variables once all modules have been loaded
//----------------------------------------------------------------------------------------------------------------------

export function initializeVariables() {
    state.config = DEFAULT_CONFIG;
    state.shortcuts = new Hashtable<Shortcut>();
    state.queryParameters = new QueryParameters();
    state.redirector = new Redirector();
    state.router = new Router();
    state.hotkeySelector = new HotkeySelector();
}
