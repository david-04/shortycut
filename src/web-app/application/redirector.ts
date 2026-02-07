import { Link } from "../data/link";
import { pages } from "../data/page";
import { queryParameters } from "../data/query-parameters";
import { FinalizedLinks, FinalizedUrl, FinalizedUrlBase, OnMultiLink, Shortcut } from "../data/shortcut";
import { shortcuts } from "../data/shortcuts";
import { state } from "../data/state";
import { Exception } from "../utilities/error";
import { isUrl } from "../utilities/string";

export enum RedirectMode {
    NEW_TAB,
    PRESERVE_HISTORY,
    ERASE_HISTORY,
}

export namespace redirector {
    let alwaysOpenNewTabs = false;
    let showRedirectPage = true;

    //------------------------------------------------------------------------------------------------------------------
    // Analyze the query and redirect as required
    //------------------------------------------------------------------------------------------------------------------

    export function processQuery() {
        const shortcut = shortcuts.get(queryParameters.query.keyword) || undefined;
        const { setup, redirect: redirectQueryParameter } = queryParameters;
        const isHomepageKeyword = state.config.homepage.keywords.includes(queryParameters.query.keyword);

        if (setup) {
            document.title = "ShortyCut";
            showSetupPage(setup);
        } else if (redirectQueryParameter) {
            processAuxiliaryRedirect(redirectQueryParameter);
        } else if (shortcut) {
            processShortcut(shortcut);
        } else if (isUrl(queryParameters.query.full)) {
            openUrl(queryParameters.query.full, RedirectMode.ERASE_HISTORY);
        } else if (
            !queryParameters.query.keyword ||
            !state.defaultSearchEngine ||
            !state.config.defaultSearchEngine.useInAddressBar ||
            isHomepageKeyword
        ) {
            openHomepage(isHomepageKeyword);
        } else {
            const links = state.defaultSearchEngine.getFinalizedLinks(queryParameters.query.full);
            redirect({ ...links, onMultiLink: OnMultiLink.OPEN_IN_NEW_TAB }, RedirectMode.ERASE_HISTORY);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Redirect to the URL provided in the query parameter
    //------------------------------------------------------------------------------------------------------------------

    function processAuxiliaryRedirect({ url, postFields }: FinalizedUrlBase) {
        const permalink = Link.constructFinalizedPermalink(url, postFields);
        const finalizedLinks = {
            onMultiLink: OnMultiLink.OPEN_IN_NEW_TAB,
            links: [{ htmlDescription: "", urls: [{ url, postFields, permalink }] }],
        };
        redirect(finalizedLinks, RedirectMode.ERASE_HISTORY);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Display the homepage
    //------------------------------------------------------------------------------------------------------------------

    function openHomepage(isHomepageKeyword: boolean) {
        alwaysOpenNewTabs = queryParameters.facets.newTabs;
        showRedirectPage = false;
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

    function processShortcut(shortcut: Shortcut) {
        if (shortcut.queries && (queryParameters.query.searchTerm || !shortcut.bookmarks)) {
            redirect(shortcut.getFinalizedQueries(queryParameters.query.searchTerm), RedirectMode.ERASE_HISTORY);
        } else if (shortcut.bookmarks) {
            redirect(shortcut.getFinalizedBookmarks(), RedirectMode.ERASE_HISTORY);
        } else {
            throw new Exception("Internal error", "Found no links to use for redirection");
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Open the selected link(s) or display the shortlist
    //------------------------------------------------------------------------------------------------------------------

    export function redirect(finalizedLinks: FinalizedLinks, mode: RedirectMode) {
        const urls = flattenUrls(finalizedLinks);
        const htmlDescription = finalizedLinks.links[0]?.htmlDescription ?? "";
        const [first, ...rest] = urls;
        if (undefined !== first && !rest.length) {
            openLink(htmlDescription, first, mode);
        } else if (1 < finalizedLinks.links.length && finalizedLinks.onMultiLink === OnMultiLink.SHOW_MENU) {
            showRedirectPage = false;
            setTimeout(() => state.router.goto(pages.shortlist.populate(finalizedLinks)), 0);
        } else if (alwaysOpenNewTabs) {
            urls.forEach(link => globalThis.open(link.permalink));
            state.router.goBackToAndResetHomepage();
        } else if (first) {
            urls.slice(1).forEach(link => globalThis.open(link.permalink));
            openLink(htmlDescription, first, mode);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Flatten nested URLs
    //------------------------------------------------------------------------------------------------------------------

    function flattenUrls(finalizedLinks: FinalizedLinks) {
        const finalizedUrls = new Array<FinalizedUrl>();
        finalizedLinks.links.forEach(link => link.urls.forEach(url => finalizedUrls.push(url)));
        return finalizedUrls;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Open a link in the current tab
    //------------------------------------------------------------------------------------------------------------------

    function openLink(htmlDescription: string, url: FinalizedUrl, mode: RedirectMode) {
        if (showRedirectPage) {
            state.router.goto(pages.redirect.populate(htmlDescription, url.url));
        }

        if (url.postFields) {
            if (RedirectMode.NEW_TAB === mode || alwaysOpenNewTabs) {
                openUrl(url.permalink, mode);
            } else {
                submitForm(url);
            }
        } else {
            openUrl(url.url, mode);
        }
    }

    export function openUrl(url: string, mode: RedirectMode) {
        if (RedirectMode.PRESERVE_HISTORY === mode && !alwaysOpenNewTabs) {
            globalThis.location.href = url;
        } else if (RedirectMode.ERASE_HISTORY === mode && !alwaysOpenNewTabs) {
            globalThis.location.replace(url);
        } else {
            globalThis.open(url);
            if (alwaysOpenNewTabs) {
                state.router.goBackToAndResetHomepage();
            }
        }
    }

    function submitForm(link: FinalizedUrl) {
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

    export function showSetupPage(mode: string) {
        if (pages.setup) {
            pages.setup.hide();
        }
        pages.setup.populate(mode).show();
    }
}
