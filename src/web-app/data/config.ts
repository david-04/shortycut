import { Exception } from "../utilities/error";
import { create, sanitize } from "../utilities/html";
import { getProperty } from "../utilities/misc";
import { adjustCase, replaceAll, startsWith } from "../utilities/string";
import { startupCache } from "./startup-cache";
import { state } from "./state";

const JSON_TAB_SIZE = 4;

//----------------------------------------------------------------------------------------------------------------------
// Default configuration
//----------------------------------------------------------------------------------------------------------------------

export const DEFAULT_CONFIG: Config = {
    shortcutFormat: {
        comment: "//",
        keyword: {
            caseSensitive: false,
            openingDelimiter: "[",
            separator: "|",
            closingDelimiter: "]",
        },
        enableGrouping: false,
        hotkeyMarker: "",
        url: {
            searchTermPlaceholder: "%s",
            postIndicator: "?POST?",
            multiLinkIndicator: {
                replacePrevious: "=",
                openInNewTab: "^",
                showMenu: "?",
                searchBucket: "#",
                default: "showMenu",
            },
        },
    },
    homepage: {
        keywords: ["?", "help", "home", "homepage", "sc", "shortycut"],
        suggestions: {
            showKeywords: true,
            showHotkeys: true,
            showFavicons: true,
        },
    },
    defaultSearchEngine: {
        keyword: "defaultsearchengine",
        useInAddressBar: true,
        useOnHomepage: true,
    },
    favicons: {
        preloadOnStart: true,
        rememberUrls: true,
        fetchService: "https://www.google.com/s2/favicons?sz=32&domain=%s",
        localFolders: ["data/favicons"],
    },
};

//----------------------------------------------------------------------------------------------------------------------
// Data structures
//----------------------------------------------------------------------------------------------------------------------

export interface Config {
    shortcutFormat: ShortcutConfig;
    homepage: HomepageConfig;
    defaultSearchEngine: DefaultSearchEngineConfig;
    favicons: FaviconConfig;
}

interface ShortcutConfig {
    comment?: string;
    keyword: KeywordConfig;
    enableGrouping: boolean;
    hotkeyMarker: string;
    url: UrlConfig;
}

interface KeywordConfig {
    caseSensitive: boolean;
    openingDelimiter?: string;
    separator?: string;
    closingDelimiter?: string;
}

interface UrlConfig {
    searchTermPlaceholder: string;
    postIndicator: string;
    multiLinkIndicator: OnMultiLink;
}

interface OnMultiLink {
    replacePrevious?: string;
    openInNewTab?: string;
    showMenu?: string;
    searchBucket?: string;
    default: "replacePreviousDefinition" | "openInNewTab" | "showMenu" | "searchBucket";
}

interface HomepageConfig {
    keywords: Array<string>;
    suggestions: SuggestionsConfig;
}

interface SuggestionsConfig {
    showKeywords: boolean;
    showHotkeys: boolean;
    showFavicons: boolean;
}

interface DefaultSearchEngineConfig {
    keyword: string;
    useInAddressBar: boolean;
    useOnHomepage: boolean;
}

interface FaviconConfig {
    preloadOnStart: boolean;
    rememberUrls: boolean;
    fetchService: string;
    localFolders: Array<string>;
}

//----------------------------------------------------------------------------------------------------------------------
// Apply and validate the config
//----------------------------------------------------------------------------------------------------------------------

export function applyAndValidateConfig() {
    for (const currentConfig of startupCache.config) {
        migrateConfig(currentConfig);
        mergeConfig(state.config, currentConfig, currentConfig);
    }
    validateConfig();
    if (!state.config.shortcutFormat.keyword.caseSensitive) {
        state.config.shortcutFormat.url.searchTermPlaceholder = adjustCase(
            state.config.shortcutFormat.url.searchTermPlaceholder
        );
        state.config.shortcutFormat.url.postIndicator = adjustCase(state.config.shortcutFormat.url.postIndicator);
        state.config.defaultSearchEngine.keyword = adjustCase(state.config.defaultSearchEngine.keyword);
        state.config.homepage.keywords = state.config.homepage.keywords
            .filter(keyword => !!keyword)
            .map(keyword => adjustCase(keyword));
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Migrate configuration from older versions
//----------------------------------------------------------------------------------------------------------------------

function migrateConfig(config: any) {
    const faviconFolders = config?.homepage?.suggestions?.faviconFolders as string | Array<string> | null | undefined;
    if (faviconFolders) {
        delete config.homepage.suggestions.faviconFolders;
        config.favicons = config.favicons ?? {};
        config.favicons.localFolders = toArray(config.favicons.localFolders);
        toArray(faviconFolders).forEach(folder => config.favicons.localFolders.push(folder));
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Apply the configuration by merging each junk into the main/default configuration
//----------------------------------------------------------------------------------------------------------------------

function mergeConfig(target: object, patch: object, patchRoot: object) {
    Object.entries(patch).forEach(([key, patchValue]) => {
        const targetValue = getProperty(target as { [index: string]: unknown }, key);
        validateBeforeConfigMerge(key, target, targetValue, patchValue);
        if (patchValue && "object" === typeof patchValue && !Array.isArray(patchValue)) {
            mergeConfig(targetValue as object, patchValue, patchRoot);
            return;
        }
        if ("string" === typeof patchValue) {
            patchValue = patchValue.trim() || undefined;
        }
        if (null === patchValue) {
            patchValue = undefined;
        }
        (target as { [index: string]: unknown })[key] = "string" === typeof patchValue ? patchValue.trim() : patchValue;
    });
}

function validateBeforeConfigMerge(key: string, target: object, targetValue: unknown, patchValue: unknown) {
    return [
        [!Object.hasOwn(target, key), "is not supported"],
        [isObject(targetValue) && !isObject(patchValue), "must be a nested object"],
        [Array.isArray(targetValue) && (!patchValue || !Array.isArray(patchValue)), "must be an array"],
        ["boolean" === typeof targetValue && "boolean" != typeof patchValue, "must be boolean (true or false)"],
        [isStringy(targetValue) && !isStringy(patchValue), "must be a string"],
    ];
}

//----------------------------------------------------------------------------------------------------------------------
// Validate a configuration object
//----------------------------------------------------------------------------------------------------------------------

function validateConfig(): void {
    const onMultiLink = state.config.shortcutFormat.url.multiLinkIndicator;

    const rules = [
        [
            state.config.shortcutFormat.keyword.openingDelimiter &&
                !state.config.shortcutFormat.keyword.closingDelimiter,
            "When using an openingDelimiter, the closingDelimiter must be set as well",
            ["openingDelimiter", "closingDelimiter"],
        ],
        [
            !state.config.shortcutFormat.keyword.openingDelimiter &&
                state.config.shortcutFormat.keyword.closingDelimiter,
            "The closingDelimiter can only be used if the openingDelimiter is set as well",
            ["openingDelimiter", "closingDelimiter"],
        ],
        [
            !state.config.shortcutFormat.url.searchTermPlaceholder,
            "The searchTermPlaceholder must not be empty or null",
            ["searchTermPlaceholder"],
        ],
        [
            !onMultiLink?.default.match(/^(replacePreviousDefinition|openInNewTab|showMenu)$/),
            'default must be "replacePreviousDefinition", "openInNewTab" or "showMenu"',
            ["default"],
        ],
        [
            multiLinkSymbolsOverlap(onMultiLink),
            "The symbols symbols indicating how to handle multiple links per keyword must not overlap",
            ["openInNewTab", "replacePreviousDefinition", "showMenu", "searchBucket"],
        ],
        [
            state.config.homepage.keywords.some(shortcut => !shortcut.trim()),
            "help must not contain empty strings (but the array can be empty)",
            ["homepageKeywords"],
        ],
    ] as const;
    rules.forEach(value => {
        const [isValid, errorMessage, fields] = value;

        throwConfigExceptionIf(!!isValid, errorMessage, fields);
    });
}

function multiLinkSymbolsOverlap(onMultiLink: OnMultiLink) {
    const symbols = [
        onMultiLink.openInNewTab,
        onMultiLink.replacePrevious,
        onMultiLink.showMenu,
        onMultiLink.searchBucket,
    ];
    const overlaps = symbols.filter(
        (symbol1, index1) =>
            !!symbols.filter((symbol2, index2) => index1 !== index2 && startsWith(symbol1, symbol2)).length
    );
    return !!overlaps.length;
}

//----------------------------------------------------------------------------------------------------------------------
// Utility functions
//----------------------------------------------------------------------------------------------------------------------

function isObject(value: unknown): value is object {
    const isObject = null != value && "object" === typeof value;
    return isObject && !Array.isArray(value) && "function" !== typeof value && !(value instanceof RegExp);
}

function isStringy(value: unknown): value is string {
    return null == value || "string" === typeof value;
}

function toArray(value: unknown) {
    if (Array.isArray(value)) {
        return value;
    } else if (value) {
        return [value];
    } else {
        return [];
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Error handling
//----------------------------------------------------------------------------------------------------------------------

function throwConfigExceptionIf(
    condition: boolean,
    description: string,
    properties: readonly string[],
    overrideConfig?: unknown
) {
    if (condition) {
        throwConfigException(description, properties, overrideConfig);
    }
}

function throwConfigException(description: string, properties: readonly string[], overrideConfig?: unknown): never {
    throw new Exception(
        "Configuration error",
        create("p", "There's a problem with the configuration:"),
        create("p.errorMessage", description),
        create(
            "p",
            overrideConfig
                ? "The error occurred while applying the following configuration:"
                : "The configuration (which might include non-overridden default settings) looks like this:"
        ),
        create("pre", renderJson(overrideConfig || state.config, properties))
    );
}

function renderJson(config: object, properties: readonly string[]) {
    replaceRegexpFunctionsAndUndefinedValues(config as { [index: string]: unknown });
    let result = sanitize(JSON.stringify(config, undefined, JSON_TAB_SIZE));
    for (const property of properties) {
        result = replaceAll(
            result,
            `&quot;${property}&quot;`,
            `&quot;<span class="jsonError">${property}</span>&quot;`,
            true
        );
    }
    return result;
}

function replaceRegexpFunctionsAndUndefinedValues(object: { [index: string]: unknown }) {
    for (const key in object) {
        if (object[key]) {
            if (object[key] instanceof RegExp) {
                object[key] = `/${object[key].source}/`;
            } else if ("function" === typeof object[key]) {
                object[key] = `${object[key]}`;
            } else if ("object" === typeof object[key]) {
                replaceRegexpFunctionsAndUndefinedValues(object[key] as { [index: string]: unknown });
            }
        } else if (undefined === object[key]) {
            object[key] = null;
        }
    }
}
