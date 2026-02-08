import { applyAndValidateConfig } from "../data/config";
import { queryParameters } from "../data/query-parameters";
import { startupCache } from "../data/startup-cache";
import { state } from "../data/state";
import { HTML_BODY } from "../generated/html-body";
import { displayError, Exception, handleExceptions } from "../utilities/error";
import { isDemo } from "../utilities/misc";
import { FaviconManager } from "./favicon-manager";
import { javaScriptLoader } from "./javascript-loader";
import { redirector } from "./redirector";
import { Router } from "./router";
import { parseShortcuts } from "./threads";

//----------------------------------------------------------------------------------------------------------------------
// Register event listeners
//----------------------------------------------------------------------------------------------------------------------

export function initialize() {
    globalThis.addEventListener("error", exception => startupCache.exceptions.push(exception));

    if (document?.title !== undefined) {
        document.title = "...";
    }

    globalThis.addEventListener("DOMContentLoaded", () => {
        document.title = "...";
        ["icon", "shortcut icon"].forEach(rel => addLink(rel, "image/x-icon", "resources/favicon.ico", ""));
        addLink("search", "application/opensearchdescription+xml", "data/search.xml", "ShortyCut");
    });

    window.addEventListener("load", () =>
        handleExceptions(displayError, () => javaScriptLoader.onComplete(startApplication))
    );
}

//----------------------------------------------------------------------------------------------------------------------
// Add a <link> to the <head>
//----------------------------------------------------------------------------------------------------------------------

function addLink(rel: string, type: string, href: string, title: string) {
    const link = document.createElement("link");
    link.rel = rel;
    link.type = type;
    link.href = href;
    link.title = title;
    document.head.appendChild(link);
}

//----------------------------------------------------------------------------------------------------------------------
// Apply the configuration and parse the shortcuts
//----------------------------------------------------------------------------------------------------------------------

function startApplication() {
    if (
        queryParameters.theme === "dark" ||
        (queryParameters.theme === undefined && globalThis.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        document.body.classList.add("dark-theme");
    }

    document.body.innerHTML = isDemo() ? HTML_BODY.replaceAll("resources/docs", "..") : HTML_BODY;
    const self = globalThis.location.href.replace(/[?#].*/, "");
    document.body.innerHTML = document.body.innerHTML.replaceAll("self://", self);

    state.router = new Router();
    applyAndValidateConfig();

    if (!startupCache.config.length && !queryParameters.setup) {
        globalThis.location.href = `${globalThis.location.href.replace(/[#?].*/, "")}?${queryParameters.SETUP_KEY}=welcome`;
        return;
    }

    parseShortcuts(result => handleExceptions(displayError, () => onParseShortcutsComplete(result)));
}

function onParseShortcutsComplete(result: unknown) {
    if (result instanceof Exception) {
        throw result;
    }
    if (queryParameters.facets.newTabs) {
        addBlankTargetToAllLinksOnPage();
    }
    state.faviconManager = new FaviconManager();
    redirector.processQuery();
}

function addBlankTargetToAllLinksOnPage() {
    const links = document.getElementsByTagName("a");
    for (let index = 0; index < links.length; index++) {
        const link = links.item(index);
        if (link) {
            link.target = "_blank";
        }
    }
}
