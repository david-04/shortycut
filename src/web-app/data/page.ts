import { BrowserIntegration } from "../pages/browser-integration";
import { ErrorPage } from "../pages/error-page";
import { FaviconTools } from "../pages/favicon-tools";
import { Homepage } from "../pages/homepage";
import { LinkTools } from "../pages/link-tools";
import { RedirectPage } from "../pages/redirect-page";
import { SetupInstructions } from "../pages/setup-instructions";
import { Shortlist } from "../pages/shortlist";

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
        Object.values(this.pages).forEach(value => {
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
