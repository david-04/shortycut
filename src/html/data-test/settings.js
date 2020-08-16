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
            faviconFolders: ['data/favicons'],
        }
    },
    defaultSearchEngine: {
        keyword: 'defaultsearchengine',
        useInAddressBar: true,
        useOnHomepage: false
    }
});
