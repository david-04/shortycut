declare namespace shortycut {
    export interface Config {
        shortcutFormat?: ShortcutConfig;
        homepage?: HomepageConfig;
        defaultSearchEngine?: DefaultSearchEngineConfig;
        favicons?: FaviconConfig;
    }
    interface ShortcutConfig {
        comment?: string;
        keyword?: KeywordConfig;
        enableGrouping?: boolean;
        hotkeyMarker?: string;
        url?: UrlConfig;
    }
    interface KeywordConfig {
        caseSensitive?: boolean;
        openingDelimiter?: string;
        separator?: string;
        closingDelimiter?: string;
    }
    interface UrlConfig {
        searchTermPlaceholder?: string;
        postIndicator?: string;
        multiLinkIndicator?: OnMultiLink;
    }
    interface OnMultiLink {
        replacePrevious?: string;
        openInNewTab?: string;
        showMenu?: string;
        default?: 'replacePreviousDefinition' | 'openInNewTab' | 'showMenu';
    }
    interface HomepageConfig {
        keywords?: Array<string>;
        suggestions?: SuggestionsConfig;
    }
    interface SuggestionsConfig {
        showKeywords?: boolean;
        showHotkeys?: boolean;
        showFavicons?: boolean;
    }
    interface DefaultSearchEngineConfig {
        keyword?: string;
        useInAddressBar?: boolean;
        useOnHomepage?: boolean;
    }
    interface FaviconConfig {
        preloadOnStart?: boolean;
        rememberUrls?: boolean;
        fetchService?: string;
        localFolders?: Array<string>;
    }
    export function configure(newConfig: Config): void;
    export function addShortcuts(...shortcuts: (string | string[])[]): void;
    export function toUrl(dynamicLinkFunction: (searchTerm: string) => string): string;
    interface JavaScriptDependencyBuilder {
        andThen(...files: string[]): JavaScriptDependencyBuilder;
    }
    export function loadJavaScript(...files: string[]): JavaScriptDependencyBuilder;
}
