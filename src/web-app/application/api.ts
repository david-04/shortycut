import { DynamicBookmarkFunction, DynamicLinkFunction, DynamicQueryFunction, GeneratedLinks } from "../data/shortcut";
import { state } from "../data/state";
import { dynamicLinkProtocol, startupCache } from "../data/variables";
import { InitializationError } from "../utilities/error";
import { create } from "../utilities/html";
import { isUrl } from "../utilities/string";
import { JavaScriptFile } from "./script-loader";

//----------------------------------------------------------------------------------------------------------------------
// Store configuration to be applied later
//----------------------------------------------------------------------------------------------------------------------

export function configure(newConfig: object) {
    startupCache.config.push(newConfig);
}

//----------------------------------------------------------------------------------------------------------------------
// Store shortcut definitions to be parsed later
//----------------------------------------------------------------------------------------------------------------------

export function addShortcuts(...shortcuts: readonly (string | readonly string[])[]) {
    for (const shortcut of shortcuts) {
        if ("string" === typeof shortcut) {
            startupCache.shortcuts.push(shortcut);
        } else {
            shortcut.forEach(item => startupCache.shortcuts.push(item));
        }
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Create a virtual URL for a function that dynamically converts a search term into one or more links
//----------------------------------------------------------------------------------------------------------------------

export function toUrl(fn: DynamicQueryFunction) {
    return registerDynamicLink("toUrl", fn);
}

//----------------------------------------------------------------------------------------------------------------------
// Create a virtual URL for a function that dynamically converts a search term into one or more links
//----------------------------------------------------------------------------------------------------------------------

export function toQueryUrl(fn: DynamicQueryFunction) {
    return registerDynamicLink("toQueryUrl", fn);
}

//----------------------------------------------------------------------------------------------------------------------
// Create a virtual URL for a function that dynamically generates one or more (non-query) links
//----------------------------------------------------------------------------------------------------------------------

export function toBookmarkUrl(fn: DynamicBookmarkFunction) {
    return registerDynamicLink("toBookmarkUrl", fn);
}

//----------------------------------------------------------------------------------------------------------------------
// Add a dynamic link to the registry and return a virtual URL to reference it
//----------------------------------------------------------------------------------------------------------------------

function registerDynamicLink(entryPoint: "toUrl" | "toQueryUrl" | "toBookmarkUrl", fn: DynamicLinkFunction) {
    if ("function" !== typeof fn) {
        startupCache.initializationErrors.push(
            new InitializationError(
                create("div", `The parameter passed to shortycut.${entryPoint}() is not a function:`),
                create("div", create("tt", `${fn}`))
            )
        );
        fn = () => [];
    }

    const key = `${dynamicLinkProtocol}://${entryPoint}.${startupCache.dynamicLinks.size + 1}`;
    startupCache.dynamicLinks.put(key, {
        generator: fn,
        isQuery: "toBookmarkUrl" !== entryPoint,
        faviconUrls: getUrlsForFavicon(fn),
    });
    return key;
}

//----------------------------------------------------------------------------------------------------------------------
// Retrieve all URLs relevant for favicons
//----------------------------------------------------------------------------------------------------------------------

function getUrlsForFavicon(dynamicLinkFunction: DynamicQueryFunction) {
    const valid = new Array<string>();
    const invalid = new Array<string>();

    for (const searchTerm of [undefined, null, "", "1"]) {
        try {
            const result = analyzeUrls(dynamicLinkFunction(searchTerm as unknown as string));
            result.valid.forEach(url => valid.push(url));
            result.invalid.forEach(url => invalid.push(url));
        } catch {}
    }

    const [first] = invalid;
    if (undefined !== first) {
        const invalidLinksLike = 1 === invalid.length ? "an invalid URL" : "invalid URLs like";
        startupCache.initializationErrors.push(
            new InitializationError(
                create("div", `The dynamic link function returned ${invalidLinksLike}`),
                create("div", create("tt", first))
            )
        );
    }

    return valid;
}

//----------------------------------------------------------------------------------------------------------------------
// Extract all URLs from a dynamic link and categorize them into valid and invalid URLs
//----------------------------------------------------------------------------------------------------------------------

function analyzeUrls(result: GeneratedLinks) {
    const valid = new Array<string>();
    const invalid = new Array<string>();
    ("string" === typeof result ? [result] : result)
        .map(link => ("string" === typeof link ? link : link.url))
        .forEach(url => (url && isUrl(url) ? valid : invalid).push(url));
    return { valid, invalid };
}

//----------------------------------------------------------------------------------------------------------------------
// Load JavaScript files
//----------------------------------------------------------------------------------------------------------------------

class JavaScriptDependencyBuilder {
    public constructor(public readonly dependencies: ReadonlyArray<JavaScriptFile>) {}

    public andThen(...files: ReadonlyArray<string>) {
        return new JavaScriptDependencyBuilder(files.map(file => state.javaScriptLoader.add(file, this.dependencies)));
    }
}

export function loadJavaScript(...files: ReadonlyArray<string>) {
    return new JavaScriptDependencyBuilder([]).andThen(...files);
}
