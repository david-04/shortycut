shortycut.configure({
    shortcutFormat: {
        comment: '//',
        keyword: {
            caseSensitive: false,
            openingDelimiter: '[',
            separator: '|',
            closingDelimiter: ']'
        },
        enableGrouping: true,
        hotkeyMarker: '_',
        url: {
            searchTermPlaceholder: '%s',
            postIndicator: '?POST?',
            multiLinkIndicator: {
                replacePrevious: '=',
                openInNewTab: '^',
                showMenu: '?',
                searchBucket: '#',
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
        useOnHomepage: false
    },
    favicons: {
        preloadOnStart: true,
        rememberUrls: true,
        fetchService: 'https://www.google.com/s2/favicons?sz=32&domain=%s',
        localFolders: ['data/favicons']
    }
});
