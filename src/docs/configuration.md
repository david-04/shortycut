# ![](img/arrow.svg) Configuration

ShortyCut can be customized through configuration settings. They are stored in `settings.js`, which is located in the `data` folder:

```javascript
shortycut.configure({
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
        useOnHomepage: true
    },
    favicons: {
        preloadOnStart: true,
        rememberUrls: true,
        fetchService: 'https://www.google.com/s2/favicons?sz=32&domain=%s',
        localFolders: ['data/favicons']
    }
});
```

Settings can be boolean values (`true` or `false`) or text, which must be surrounded by single quotes (`'`). Some settings allow multiple values to be configured. They must be separated by commas (`,`) and surrounded by square brackets (`[` and `]`).

Text containing certain characters can interfere with the JavaScript syntax and cause problems. Try to avoid using the following characters, particularly in the `shortcutFormat` section:

- backslashes (`\`)
- backticks (`` ` ``)
- single quotes (`'`)
- the dollar symbol followed by a curly bracket `(${`)

If `settings.js` does not contain a specific property, a default value is applied. This might happen when upgrading to a newer version of ShortyCut which introduces additional settings. When adding new properties to `settings.js`, make sure to place them at the same location as in the example above.

## ![](img/arrow.svg) shortcutFormat.comment

This property defines the delimiter that introduces comments within shortcut definitions. The default value is the double-slash (`//`). Lines starting with the given sequence are treated as a comment and ignored. See "[File format](file-format.md)" for details.

## ![](img/arrow.svg) shortcutFormat.keyword.caseSensitive

This property enables or disables case-sensitivity for keywords. The default value is `false`, meaning that keywords are not case-sensitive. A `news` shortcut could be opened by entering variations like `News` or `NEWS`. On the other hand, if the property is set to `true`, keywords must be entered exactly as they are defined in `shortcuts.js`.

## ![](img/arrow.svg) shortcutFormat.keyword.openingDelimiter and shortcutFormat.keyword.closingDelimiter

These properties define the characters that can be put in front and after keywords in shortcut definitions. The default values are the square brackets (`[` and `]`). It is optional to use the delimiters when defining shortcuts. See "[Shortcut syntax](shortcut-syntax.md#keyword)" for details.

## ![](img/arrow.svg) shortcutFormat.keyword.separator

This property defines the character that separates multiple keywords for the same shortcut. The default value is the pipe symbol (`|`). See "[Shortcut syntax](shortcut-syntax.md#keyword)" for details.

## ![](img/arrow.svg) shortcutFormat.enableGrouping

This property enables or disables support for organizing shortcuts in groups. The default value is `false`, meaning that grouping is disabled. See "[Grouping](grouping.md)" for details.

## ![](img/arrow.svg) shortcutFormat.hotkeyMarker

This property defines the character which marks hotkeys in a shortcut's description. The default value is an empty string (`''`), meaning that hotkey marking is not being used. See "[Hotkeys](hotkeys.md)" for details.

## ![](img/arrow.svg) shortcutFormat.url.searchTermPlaceholder

This property defines the placeholder which is used in links to indicate where the search term needs to be inserted. The default value is `%s`. See "[Shortcut syntax](shortcut-syntax.md#link)" for details.

## ![](img/arrow.svg) shortcutFormat.url.postIndicator

This property defines the text that is appended to a link to separate `POST` data fields. The default value is `?POST?`. See "[Post links](post-links.md)" for details.

## ![](img/arrow.svg) shortcutFormat.url.multiLinkIndicator.replacePrevious

This property defines the character(s) that can be put in front of a link to force all previous links with the same keyword to be ignored. The default value is the equals sign (`=`). See "[Multi-link shortcuts](multi-link-shortcuts.md#ignore-previous-links)" for details.

## ![](img/arrow.svg) shortcutFormat.url.multiLinkIndicator.openInNewTab

This property defines the character that can be put in front of a link to open all links with the same keyword in separate tabs. The default value is the caret (`^`). See "[Multi-link shortcuts](multi-link-shortcuts.md#open-new-tabs)" for details.

## ![](img/arrow.svg) shortcutFormat.url.multiLinkIndicator.showMenu

This property defines the character that can be put in front of a link to show an interactive list of all links with the same keyword. The default value is the question mark (`?`). See "[Multi-link shortcuts](multi-link-shortcuts.md#show-a-list)" for details.

## ![](img/arrow.svg) shortcutFormat.url.multiLinkIndicator.searchBucket

This property defines the character that can be put in front of a link to mark it as a searchable item within the keyword. The default value is the hash (`#`). See "[Search buckets](search-buckets.md)" for details.

## ![](img/arrow.svg) shortcutFormat.url.multiLinkIndicator.default

This property defines the default behavior for keywords with multiple links. It can be set to `replacePrevious`, `openInNewTab` or `showMenu` (which is the default value). See "[Multi-link shortcuts](multi-link-shortcuts.md)" for details.

## ![](img/arrow.svg) homepage.keywords

This property defines keywords that can be entered in the browser's address bar to open ShortyCut's homepage. The default values are `?`, `help`, `home`, `homepage`, `sc` and`shortycut`. When entering one of these keywords, the homepage is opened (instead of invoking the default [search engine](default-search-engine.md)).

## ![](img/arrow.svg) homepage.suggestions.showKeywords

This property enables or disables the display of keywords as part of suggestions on ShortyCut's homepage. The default value is `true`, meaning that the keywords are displayed in front of the description. When [hotkeys](hotkeys.md) are used, this is often not necessary and can be disabled by setting the property to `false`.

## ![](img/arrow.svg) homepage.suggestions.showHotkeys

This property enables or disables the highlighting of hotkeys in the description of suggestions. The default value is `true`, meaning that hotkeys are displayed. It is only applicable to shortcuts where the description contains all letters of the keyword (in the same order). See "[Hotkeys](hotkeys.md)" for details.

## ![](img/arrow.svg) homepage.suggestions.showFavicons

This property enables or disables the display of favicons on ShortyCut's homepage. The default value is `true`, meaning that websites' favicons are displayed as part of the suggestions. See "[Favicons](favicons.md)" for details.

## ![](img/arrow.svg) defaultSearchEngine.keyword

This property defines the keyword of the shortcut which serves as the default search engine. The default value is `defaultsearchengine`. The shortcut with this keyword is used for all input that does not match any (other) keywords. See "[Default search engine](default-search-engine.md)" for details.

## ![](img/arrow.svg) defaultSearchEngine.useInAddressBar

This property enables or disables the default search engine when ShortyCut is invoked from the browser's address bar. The default value is `true`, meaning that all input that does not match any keyword is forwarded to the default search engine. See "[Default search engine](default-search-engine.md)" for details.

## ![](img/arrow.svg) defaultSearchEngine.useOnHomepage

This property enables or disables the default search engine on ShortyCut's homepage. The default value is `true`, meaning that all input that does not match any keyword is forwarded to the default search engine. See "[Default search engine](default-search-engine.md)" for details.

## ![](img/arrow.svg) homepage.favicons.preloadOnStart

This property enables or disables the preloading of favicons. The default value is `true`, meaning that favicons are loaded in the background before they are actually needed. This creates additional network traffic but allows them to be displayed quickly later on. See "[Favicons](favicons.md)" for details.

## ![](img/arrow.svg) homepage.favicons.rememberUrls

This property enables or disables the caching of favicon locations in the browser's local storage. The default value is `true`, meaning that ShortyCut permanently remembers where it has looked for favicons before. This occupies a small amount of disk space but significantly speeds up subsequent page loads. See "[Favicons](favicons.md)" for details.

## ![](img/arrow.svg) homepage.favicons.fetchService

This property points to a web service that provides favicon images for any domain. It defaults to Google S2 (`https://www.google.com/s2/favicons?sz=32&domain=%s`). The URL must contain the `%s` placeholder for the actual domain name. It's used for websites where no favicon can be found otherwise. The fetch service can be disabled by setting the property to an empty string (`''`). See "[Favicons](favicons.md)" for details.

## ![](img/arrow.svg) homepage.favicons.localFolders

This property defines the folder(s) where downloaded favicons are stored. The default value is `data/favicons`. Favicons need to be downloaded and stored in this folder manually. See "[Favicons](favicons.md)" for details.
