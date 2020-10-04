namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // Default configuration
    //------------------------------------------------------------------------------------------------------------------

    export const DEFAULT_CONFIG: Config = {
        shortcutFormat: {
            comment: '//',
            keyword: {
                caseSensitive: false,
                openingDelimiter: '[',
                separator: '|',
                closingDelimiter: ']',
            },
            enableGrouping: false,
            hotkeyMarker: '',
            url: {
                searchTermPlaceholder: '%s',
                postIndicator: '?POST?',
                multiLinkIndicator: {
                    replacePrevious: '=',
                    openInNewTab: '^',
                    showMenu: '?',
                    default: 'showMenu'
                }
            }
        },
        homepage: {
            keywords: ['?', 'help', 'home', 'homepage', 'sc', 'shortycut'],
            suggestions: {
                showKeywords: true,
                showHotkeys: true,
                showFavicons: true,
            }
        },
        defaultSearchEngine: {
            keyword: 'defaultsearchengine',
            useInAddressBar: true,
            useOnHomepage: true
        },
        favicons: {
            preloadOnStart: true,
            rememberUrls: true,
            fetchService: 'https://www.google.com/s2/favicons?sz=32&domain=%s',
            localFolders: ['data/favicons']
        }
    };

    //------------------------------------------------------------------------------------------------------------------
    // Data structures
    //------------------------------------------------------------------------------------------------------------------

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
        default: 'replacePreviousDefinition' | 'openInNewTab' | 'showMenu';
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
        localFolders: Array<string>

    }

    //------------------------------------------------------------------------------------------------------------------
    // Apply and validate the config
    //------------------------------------------------------------------------------------------------------------------

    export function applyAndValidateConfig() {
        for (let index = 0; index < startupCache.config.length; index++) {
            migrateConfig(startupCache.config[index]);
            mergeConfig(config, startupCache.config[index], startupCache.config[index]);
        }
        validateConfig();
        if (!config.shortcutFormat.keyword.caseSensitive) {
            config.shortcutFormat.url.searchTermPlaceholder = adjustCase(config.shortcutFormat.url.searchTermPlaceholder);
            config.shortcutFormat.url.postIndicator = adjustCase(config.shortcutFormat.url.postIndicator);
            config.defaultSearchEngine.keyword = adjustCase(config.defaultSearchEngine.keyword);
            config.homepage.keywords = config.homepage.keywords
                .filter(keyword => !!keyword)
                .map(keyword => adjustCase(keyword));
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Migrate configuration from older versions
    //------------------------------------------------------------------------------------------------------------------

    function migrateConfig(config: any) {

        // homepage.suggestions.faviconFolders => favicons.localFolders
        let faviconFolders = config?.homepage?.suggestions?.faviconFolders as string | Array<String> | null | undefined;
        if (faviconFolders) {
            delete config.homepage.suggestions.faviconFolders;
            config.favicons = config.favicons ?? {};
            config.favicons.localFolders = toArray(config.favicons.localFolders);
            toArray(faviconFolders).forEach(folder => config.favicons.localFolders.push(folder));
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Apply the configuration by merging each junk into the main/default configuration
    //------------------------------------------------------------------------------------------------------------------

    function mergeConfig(target: object, patch: object, patchRoot: object) {

        for (let key in patch) {

            let targetValue = (target as any)[key];
            let patchValue = (patch as any)[key];

            [
                [
                    !target.hasOwnProperty(key),
                    'is not supported'
                ],
                [
                    isObject(targetValue) && !isObject(patchValue),
                    'must be a nested object'
                ],
                [
                    targetValue instanceof Array && (!patchValue || !(patchValue instanceof Array)),
                    'must be an array'
                ],
                [
                    'boolean' === typeof targetValue && 'boolean' != typeof patchValue,
                    'must be boolean (true or false)'
                ],
                [
                    isStringy(targetValue) && !isStringy(patchValue),
                    'must be a string'
                ],
            ].forEach(rule => throwConfigExceptionIf(!!rule[0], `Property ${key} ${rule[1]}`, [key], patchRoot));

            if (patchValue && 'object' === typeof patchValue && !(patchValue instanceof Array)) {
                mergeConfig(targetValue, patchValue, patchRoot);
            } else {
                if ('string' === typeof patchValue) {
                    patchValue = patchValue.trim() || undefined;
                }
                if (null === patchValue) {
                    patchValue = undefined;
                }
                (target as any)[key] = 'string' === typeof patchValue ? patchValue.trim() : patchValue
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Validate a configuration object
    //------------------------------------------------------------------------------------------------------------------

    function validateConfig(): void {

        const onMultiLink = config.shortcutFormat.url.multiLinkIndicator;

        [
            [
                config.shortcutFormat.keyword.openingDelimiter && !config.shortcutFormat.keyword.closingDelimiter,
                'When using an openingDelimiter, the closingDelimiter must be set as well',
                ['openingDelimiter', 'closingDelimiter']
            ],
            [
                !config.shortcutFormat.keyword.openingDelimiter && config.shortcutFormat.keyword.closingDelimiter,
                'The closingDelimiter can only be used if the openingDelimiter is set as well',
                ['openingDelimiter', 'closingDelimiter']
            ],
            [
                !config.shortcutFormat.url.searchTermPlaceholder,
                'The searchTermPlaceholder must not be empty or null',
                ['searchTermPlaceholder']
            ],
            [
                !onMultiLink.default || !onMultiLink.default.match(/^(replacePreviousDefinition|openInNewTab|showMenu)$/),
                'default must be "replacePreviousDefinition", "openInNewTab" or "showMenu"',
                ['default']
            ],
            [
                startsWith(onMultiLink.openInNewTab, onMultiLink.replacePrevious)
                || startsWith(onMultiLink.openInNewTab, onMultiLink.showMenu)
                || startsWith(onMultiLink.replacePrevious, onMultiLink.openInNewTab)
                || startsWith(onMultiLink.replacePrevious, onMultiLink.showMenu)
                || startsWith(onMultiLink.showMenu, onMultiLink.openInNewTab)
                || startsWith(onMultiLink.showMenu, onMultiLink.replacePrevious),
                'The symbols for replacePreviousDefinition, openInNewTab or showMenu must not be (partially) identical',
                ['openInNewTab', 'replacePreviousDefinition', 'showMenu']
            ],
            [
                config.homepage.keywords.some(shortcut => !shortcut.trim()),
                'help must not contain empty strings (but the array can be empty)',
                ['homepageKeywords']
            ],
        ].forEach(value => throwConfigExceptionIf(!!value[0] as boolean, value[1] as string, value[2] as string[]));
    }

    //------------------------------------------------------------------------------------------------------------------
    // Utility functions
    //------------------------------------------------------------------------------------------------------------------

    function isObject(value: any): boolean {
        return null !== value && undefined !== value
            && 'object' === typeof value
            && !(value instanceof Array)
            && !(value instanceof Function)
            && !(value instanceof RegExp);
    }

    function isStringy(value: any): boolean {
        return null === value || undefined === value || 'string' === typeof value
    }

    function toArray(value: any) {
        if (Array.isArray(value)) {
            return value;
        } else if (!value) {
            return [];
        } else {
            return [value];
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Error handling
    //------------------------------------------------------------------------------------------------------------------

    function throwConfigExceptionIf(condition: boolean, description: string, properties: string[], overrideConfig?: any) {
        if (condition) {
            throwConfigException(description, properties, overrideConfig);
        }
    }

    function throwConfigException(description: string, properties: string[], overrideConfig?: any): never {
        throw new Exception('Configuration error',
            create('p', `There's a problem with the configuration:`),
            create('p.errorMessage', description),
            create('p', overrideConfig
                ? 'The error occurred while applying the following configuration:'
                : 'The configuration (which might include non-overridden default settings) looks like this:'
            ),
            create('pre', renderJson(overrideConfig || config, properties))
        );
    }

    function renderJson(config: object, properties: string[]) {
        replaceRegexpFunctionsAndUndefinedValues(config);
        let result = sanitize(JSON.stringify(config, undefined, 4));
        for (let property of properties) {
            result = replaceAll(result, `&quot;${property}&quot;`, `&quot;<span class='jsonError'>${property}</span>&quot;`, true);
        }
        return result
    }

    function replaceRegexpFunctionsAndUndefinedValues(object: any) {
        for (let key in object) {
            if (object[key]) {
                if (object[key] instanceof RegExp) {
                    object[key] = `/${(object[key] as RegExp).source}/`;
                } else if ('function' === typeof object[key]) {
                    object[key] = (object[key] as Function).toString();
                } else if ('object' === typeof object[key]) {
                    replaceRegexpFunctionsAndUndefinedValues(object[key])
                }
            } else if (undefined === object[key]) {
                object[key] = null;
            }
        }
    }
}
