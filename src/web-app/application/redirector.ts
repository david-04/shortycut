import { Link } from "../data/link";
import { pages } from "../data/page";
import { queryParameters } from "../data/query-parameters";
import { FinalizedLinks, FinalizedUrl, FinalizedUrlBase, OnMultiLink, Shortcut } from "../data/shortcut";
import { state } from "../data/state";
import { Exception } from "../utilities/error";
import { isUrl } from "../utilities/string";

export enum RedirectMode {
    NEW_TAB,
    PRESERVE_HISTORY,
    ERASE_HISTORY,
}

export class Redirector {
    private alwaysOpenNewTabs = false;
    private showRedirectPage = true;

    //------------------------------------------------------------------------------------------------------------------
    // Analyze the query and redirect as required
    //------------------------------------------------------------------------------------------------------------------

    public processQuery() {
        const shortcut = state.shortcuts.get(queryParameters.query.keyword) || undefined;
        const { setup, redirect } = queryParameters;
        const isHomepageKeyword = state.config.homepage.keywords.includes(queryParameters.query.keyword);

        if (setup) {
            document.title = "ShortyCut";
            this.showSetupPage(setup);
        } else if (redirect) {
            this.processAuxiliaryRedirect(redirect);
        } else if (shortcut) {
            this.processShortcut(shortcut);
        } else if (isUrl(queryParameters.query.full)) {
            this.openUrl(queryParameters.query.full, RedirectMode.ERASE_HISTORY);
        } else if (
            !queryParameters.query.keyword ||
            !state.defaultSearchEngine ||
            !state.config.defaultSearchEngine.useInAddressBar ||
            isHomepageKeyword
        ) {
            this.openHomepage(isHomepageKeyword);
        } else {
            const links = state.defaultSearchEngine.getFinalizedLinks(queryParameters.query.full);
            this.redirect({ ...links, onMultiLink: OnMultiLink.OPEN_IN_NEW_TAB }, RedirectMode.ERASE_HISTORY);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Redirect to the URL provided in the query parameter
    //------------------------------------------------------------------------------------------------------------------

    private processAuxiliaryRedirect(redirect: FinalizedUrlBase) {
        const { url, postFields } = redirect;
        const permalink = Link.constructFinalizedPermalink(url, postFields);
        const finalizedLinks = {
            onMultiLink: OnMultiLink.OPEN_IN_NEW_TAB,
            links: [{ htmlDescription: "", urls: [{ url, postFields, permalink }] }],
        };
        this.redirect(finalizedLinks, RedirectMode.ERASE_HISTORY);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Display the homepage
    //------------------------------------------------------------------------------------------------------------------

    private openHomepage(isHomepageKeyword: boolean) {
        this.alwaysOpenNewTabs = queryParameters.facets.newTabs;
        this.showRedirectPage = false;
        document.title = "ShortyCut";
        const query = isHomepageKeyword
            ? queryParameters.query.full.replace(/^\s*[^\s]+/, "").trim()
            : queryParameters.query.full;
        state.router.goto(pages.home.populate(query));
        if (queryParameters.facets.noFocus) {
            pages.home.removeFocus();
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Process a shortcut by opening the links or rendering the shortlist
    //------------------------------------------------------------------------------------------------------------------

    private processShortcut(shortcut: Shortcut) {
        if (shortcut.queries && (queryParameters.query.searchTerm || !shortcut.bookmarks)) {
            this.redirect(shortcut.getFinalizedQueries(queryParameters.query.searchTerm), RedirectMode.ERASE_HISTORY);
        } else if (shortcut.bookmarks) {
            this.redirect(shortcut.getFinalizedBookmarks(), RedirectMode.ERASE_HISTORY);
        } else {
            throw new Exception("Internal error", "Found no links to use for redirection");
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Open the selected link(s) or display the shortlist
    //------------------------------------------------------------------------------------------------------------------

    public redirect(finalizedLinks: FinalizedLinks, mode: RedirectMode) {
        const urls = this.flattenUrls(finalizedLinks);
        const htmlDescription = finalizedLinks.links[0]?.htmlDescription ?? "";
        const [first, ...rest] = urls;
        if (undefined !== first && !rest.length) {
            this.openLink(htmlDescription, first, mode);
        } else if (1 < finalizedLinks.links.length && finalizedLinks.onMultiLink === OnMultiLink.SHOW_MENU) {
            this.showRedirectPage = false;
            setTimeout(() => state.router.goto(pages.shortlist.populate(finalizedLinks)), 0);
        } else if (this.alwaysOpenNewTabs) {
            urls.forEach(link => globalThis.open(link.permalink));
            state.router.goBackToAndResetHomepage();
        } else if (first) {
            urls.slice(1).forEach(link => globalThis.open(link.permalink));
            this.openLink(htmlDescription, first, mode);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Flatten nested URLs
    //------------------------------------------------------------------------------------------------------------------

    private flattenUrls(finalizedLinks: FinalizedLinks) {
        const finalizedUrls = new Array<FinalizedUrl>();
        finalizedLinks.links.forEach(link => link.urls.forEach(url => finalizedUrls.push(url)));
        return finalizedUrls;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Open a link in the current tab
    //------------------------------------------------------------------------------------------------------------------

    private openLink(htmlDescription: string, url: FinalizedUrl, mode: RedirectMode) {
        if (this.showRedirectPage) {
            state.router.goto(pages.redirect.populate(htmlDescription, url.url));
        }

        if (url.postFields) {
            if (RedirectMode.NEW_TAB === mode || this.alwaysOpenNewTabs) {
                this.openUrl(url.permalink, mode);
            } else {
                this.submitForm(url);
            }
        } else {
            this.openUrl(url.url, mode);
        }
    }

    public openUrl(url: string, mode: RedirectMode) {
        if (RedirectMode.PRESERVE_HISTORY === mode && !this.alwaysOpenNewTabs) {
            globalThis.location.href = url;
        } else if (RedirectMode.ERASE_HISTORY === mode && !this.alwaysOpenNewTabs) {
            globalThis.location.replace(url);
        } else {
            globalThis.open(url);
            if (this.alwaysOpenNewTabs) {
                state.router.goBackToAndResetHomepage();
            }
        }
    }

    private submitForm(link: FinalizedUrl) {
        const form = document.createElement("form");
        form.action = link.url;
        form.method = "post";
        form.style.display = "none";

        for (const field of link.postFields || []) {
            const input = document.createElement("input");
            input.type = "text";
            input.name = field.key;
            input.value = field.value;
            form.appendChild(input);
        }
        document.body.appendChild(form);
        form.submit();
    }

    //------------------------------------------------------------------------------------------------------------------
    // Show the setup
    //------------------------------------------------------------------------------------------------------------------

    public showSetupPage(mode: string) {
        if (pages.setup) {
            pages.setup.hide();
        }
        pages.setup.populate(mode).show();
    }
}
