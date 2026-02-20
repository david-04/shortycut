declare namespace shortycut {
    //------------------------------------------------------------------------------------------------------------------
    // Configure ShortyCut
    //------------------------------------------------------------------------------------------------------------------

    /** ShortyCut configuration settings */
    export interface Config {
        /** Settings to customize how shortcuts are defined (syntax, placeholders, default characteristics) */
        shortcutFormat?: Config.ShortcutFormat;
        /** Settings to customize the behavior of ShortyCut's homepage */
        homepage?: Config.Homepage;
        /** Settings to customize when to perform a web search (if no keyword matches) */
        defaultSearchEngine?: Config.DefaultSearchEngine;
        /** Settings to customize the discovery and caching of favicons */
        favicons?: Config.Favicons;
    }

    namespace Config {
        /** Settings to customize how shortcuts are defined (syntax, placeholders, default characteristics) */
        interface ShortcutFormat {
            /** The symbol that introduces end-of-line comments (default: "//") */
            comment?: string;
            /** Settings to customize how keywords are defined */
            keyword?: ShortcutFormat.Keyword;
            /** Enable or disable support for grouped keywords (default: false) */
            enableGrouping?: boolean;
            /** The symbol that marks hotkeys in the description (default: "" - i.e. the feature is disabled) */
            hotkeyMarker?: string;
            /** Settings to customize how URLs (and placeholders and decorators) are defined */
            url?: ShortcutFormat.Url;
        }

        export namespace ShortcutFormat {
            /** Settings to customize how keywords are defined */
            export interface Keyword {
                /** Treat keywords as case-sensitive (default: false) */
                caseSensitive?: boolean;
                /** The opening delimiter for a keyword (default: "[") */
                openingDelimiter?: string;
                /** The symbol used to separate multiple keywords (default: "|") */
                separator?: string;
                /** The closing delimiter for a keyword (default: "]") */
                closingDelimiter?: string;
            }

            /** Settings to customize how URLs (and placeholders and decorators) are defined */
            export interface Url {
                /** The sequence to replace with the actual search term (default: "%s") */
                searchTermPlaceholder?: string;
                /** The sequence that introduces appended POST parameters (default: "?POST?") */
                postIndicator?: string;
                /** Settings to customize the treatment of multiple shortcuts with the same keyword */
                multiLinkIndicator?: Url.MultiLinkIndicator;
            }

            export namespace Url {
                /** Settings to customize the treatment of multiple shortcuts with the same keyword */
                interface MultiLinkIndicator {
                    /** Symbol to indicate that the shortcut replaces all previous ones (default: "=") */
                    replacePrevious?: string;
                    /** Symbol to indicate that all shortcuts should open at once in new tabs (default: "^") */
                    openInNewTab?: string;
                    /** Symbol to indicate that all shortcuts should display as an interactive list (default: "?") */
                    showMenu?: string;
                    /** Symbol to indicate that a shortcut is accessible via full-text search only (default: "#") */
                    searchBucket?: string;
                    /** Default multi-link behavior for shortcuts that don't have an explicit multi-link symbol */
                    default?: "replacePreviousDefinition" | "openInNewTab" | "showMenu" | "searchBucket";
                }
            }
        }

        /** Settings to customize the behavior of ShortyCut's homepage */
        export interface Homepage {
            /** Keywords that should just open the ShortyCut homepage (default:  ["?", "help", "home", "homepage", "sc", "shortycut"] */
            keywords?: Array<string>;
            /** Settings to customize how ShortyCut's homepage displays suggestions */
            suggestions?: Homepage.Suggestions;
        }

        export namespace Homepage {
            /** Settings to customize how ShortyCut's homepage displays suggestions */
            interface Suggestions {
                /** Display the keyword (default: true) */
                showKeywords?: boolean;
                /** Highlight hotkeys in the description (default: true) */
                showHotkeys?: boolean;
                /** Display favicons (default: true) */
                showFavicons?: boolean;
            }
        }

        /** Settings to customize when to perform a web search (if no keyword matches) */
        export interface DefaultSearchEngine {
            /** The keyword that's used to define the default search engine (default: "defaultsearchengine") */
            keyword?: string;
            /** Use the default search engine in the address bar if no keyword matches (default: true) */
            useInAddressBar?: boolean;
            /** Use the default search engine on ShortyCut's homepage if no keyword matches (default: true) */
            useOnHomepage?: boolean;
        }

        /** Settings to customize the discovery and caching of favicons */
        export interface Favicons {
            /** Preload all favicons on start-up (default: true) */
            preloadOnStart?: boolean;
            /** Store discovered favicon URLs in the browser's local storage (default: true) */
            rememberUrls?: boolean;
            /** The fallback URL with a %s placeholder for retrieving favicons per domain - or an empty string to disable the feature (default: "https://www.google.com/s2/favicons?sz=32&domain=%s") */
            fetchService?: string;
            /** Local folders to scan for pre-downloaded favicons (default: ['data/favicons']) */
            localFolders?: Array<string>;
        }
    }

    /**
     * Change configuration settings. The default values apply for all properties that are omitted.
     * @param config The configuration parameters
     */
    export function configure(config: Config): void;

    //------------------------------------------------------------------------------------------------------------------
    // Register dynamic shortcuts
    //------------------------------------------------------------------------------------------------------------------

    /**
     * Register a function that converts a search term into one or more URLs.
     * @param urlGenerator A function that converts a search term into one or more URLs
     * @return A virtual URL that can be used like any other regular http(s) URL when defining shortcuts
     */
    export function toUrl(
        urlGenerator: (searchTerm: string) =>
            | string
            | ReadonlyArray<string>
            | ReadonlyArray<{
                  /* The description to display when showing multiple links in an interactive list */
                  description: string;
                  /** The URL may contain the placeholder for the keyword ("%s" if not configured otherwise) */
                  url: string;
              }>
    ): string;

    /**
     * Register a function that converts a search term into one or more URLs.
     * @param urlGenerator A function that converts a search term into one or more URLs
     * @return A virtual URL that can be used like any other regular http(s) URL when defining shortcuts
     */
    export function toQueryUrl(
        urlGenerator: (searchTerm: string) =>
            | string
            | ReadonlyArray<string>
            | ReadonlyArray<{
                  /* The description to display when showing multiple links in an interactive list */
                  description: string;
                  /** The URL may contain the placeholder for the keyword ("%s" if not configured otherwise) */
                  url: string;
              }>
    ): string;

    /**
     * Register a function that returns one or more dynamically generated URLs.
     * @param urlGenerator A function that generates one or more dynamic URLs
     * @return A virtual URL that can be used like any other regular http(s) URL when defining shortcuts
     */
    export function toBookmarkUrl(
        urlGenerator: () =>
            | string
            | ReadonlyArray<string>
            | ReadonlyArray<{
                  /* The description to display when showing multiple links in an interactive list */
                  description: string;
                  /** The URL may contain the placeholder for the keyword ("%s" if not configured otherwise) */
                  url: string;
              }>
    ): string;

    //------------------------------------------------------------------------------------------------------------------
    // Add shortcuts
    //------------------------------------------------------------------------------------------------------------------

    /**
     * Add one or more shortcuts.
     * @param shortcuts Shortcuts defined as single- or multi-line strings (one shortcut per line)
     */
    export function addShortcuts(...shortcuts: readonly (string | readonly string[])[]): void;

    //------------------------------------------------------------------------------------------------------------------
    // Load other JavaScript files
    //------------------------------------------------------------------------------------------------------------------

    /**
     * Load additional JavaScript files. All files are loaded in parallel and might be executed in random order.
     * @param files Relative paths or absolute URLs of JavaScript files to load
     * @return A promise-style result that can be used to load more JavaScript files (after all files have been loaded)
     */
    export function loadJavaScript(...files: readonly string[]): {
        /**
         * Load more JavaScript files after all previous ones have been loaded.
         * @param files Relative paths or absolute URLs of JavaScript files to load
         * @return A promise-style result that can be used to load more JavaScript files
         */
        andThen(...files: readonly string[]): ReturnType<typeof loadJavaScript>;
    };
}
