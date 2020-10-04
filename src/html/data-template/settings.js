//----------------------------------------------------------------------------------------------------------------------
// Use this file to customize ShortyCut. Refer to the documentation for a description of the settings.
//----------------------------------------------------------------------------------------------------------------------

shortycut.configure({
    shortcutFormat: {
        comment: '//',
        keyword: {
            caseSensitive: false,
            openingDelimiter: '[',
            separator: '|',
            closingDelimiter: ']'
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
            showFavicons: true
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
});
