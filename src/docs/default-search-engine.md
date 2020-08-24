# ![](img/arrow.svg) Default search engine

ShortyCut's primary purpose is to open bookmarked pages through the use of keywords.
But it also serves as an entry point for general web searches.
Input that does not match any keyword is forwarded to a search engine.

## ![](img/arrow.svg) Changing the search engine

By default, ShortyCut uses DuckDuckGo for web searches.
It can be switched to any other search engine by adding a shortcut with the keyword `defaultsearchengine`.
The link must contain the `%s` placeholder for the actual search term:

```text
[defaultsearchengine]   Google   https://www.google.com/search?&q=%s
```

Sometimes it's useful to have shortcuts for different search engines and switch between them on a case-by-case basis
by using the corresponding keyword:

```text
[b]  Bing     https://www.bing.com/search?q=%s
[g]  Google   https://www.google.com/search?&q=%s
[y]  Yahoo    https://search.yahoo.com/search?p=%s
```

Any existing shortcut can be nominated as the default search engine without assigning the `defaultsearchengine` keyword,
by setting the configuration property [keyword](configuration.md#defaultsearchenginekeyword) instead:

```javascript
shortycut.configure({
    defaultSearchEngine: {
        keyword: 'g'
    },
});
```

In this example, the shortcut with the keyword `g` (Google) is set up as the default search engine.

## ![](img/arrow.svg) Disabling the search engine

The default search engine can be disabled to enforce the use of keywords at all times.
This can be done individually for the browser's address bar and ShortyCut's homepage
by setting the configuration properties
[useInAddressBar](configuration.md#defaultsearchengineuseinaddressbar) and/or
[useOnHomepage](configuration.md#defaultsearchengineuseonhomepage) to `false`.
