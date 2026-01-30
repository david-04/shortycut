# ![](img/arrow.svg) API

ShortyCut provides functions that can be used to interact with it through JavaScript code. It also ships with typings for TypeScript.

The typings were previously contained in the `data-template` folder but have now been moved to the `resources` folder. Please delete `shortycut.d.ts` from your `data` folder and instead point your `tsconfig.json` to the `resources` folder. This will ensure that every update also re-applies the latest typings.

## ![](img/arrow.svg) addShortcuts()

Add shortcut definitions, for example as a multi-line string with one shortcut per line:

```javascript
shortycut.addShortcuts(`
    [sunnies] Sunglasses   https://www.ebay.com.au/sch/i.html?_nkw=sunglasses
    [ebay]    Search eBay  https://www.ebay.com.au/sch/i.html?_nkw=%s
`);
```

A few older browsers (like Internet Explorer) don't support the multi-line syntax. When using such a browser, the shortcuts need to be passed as an array of strings instead:


```javascript
shortycut.addShortcuts([
    '[sunnies] Sunglasses   https://www.ebay.com.au/sch/i.html?_nkw=sunglasses',
    '[ebay]    Search eBay  https://www.ebay.com.au/sch/i.html?_nkw=%s'
]);
```

See "[File format](file-format.md)" and "[Shortcut syntax](shortcut-syntax.md)" for further details.

## ![](img/arrow.svg) configure()

Override (some or all of) ShortyCut's built-in default settings:

```javascript
shortycut.configure({
    homepage: {
        suggestions: {
            showFavicons: true
        }
    }
});
```

The supported options are described in "[Configuration](configuration.md)". It is not necessary to pass all of them and the function can be called multiple times. When modifying the same settings, subsequent calls override previous ones.

## ![](img/arrow.svg) loadJavaScript()

Load additional JavaScript files. This function can be called repeatedly and accepts multiple files. All files - including separate calls to `loadJavaScript()` - are loaded in parallel, i.e. the order is unpredictable. This can be changed by using `andThen()` to model dependencies:

```
shortycut.loadJavaScript('shared-shortcuts.js', 'tools.js')
                .andThen('additional-tools.js')
                .andThen('shortcuts-01.js', 'shortcuts-02.js');
```

Files are loaded from (or relative to) ShortyCut's `data` folder unless a complete URL (including a protocol like `https://` or `file://`) is passed. See "[Loading separate files](loading-separate-files.md)" for further details.

## ![](img/arrow.svg) toBookmarkUrl()

Register a function that generates dynamic links (without requiring a search term). The call to `toBookmarkUrl()` returns a virtual link (as a `string`) that can be used like any other URL when defining shortcuts:

```javascript
function mkDocsIssues(searchTerm) {
    if (searchTerm.trim().match(/^[0-9]+$/)) {
        return 'https://github.com/mkdocs/mkdocs/issues/%s';
    } else {
        return 'https://github.com/mkdocs/mkdocs/issues?q=%s';
    }
}
var mkDocsIssuesUrl = shortycut.toUrl(mkDocsIssues);
shortycut.addShortcuts('[mkdi] MkDocs Issues ' + mkDocsIssuesUrl`);
```

When the keyword is used, ShortyCut calls the respective function to obtain the applicable link.

Dynamic bookmark functions can also return multiple links to show as a list or to open in new tabs. See "[Dynamic links](dynamic-links.md#dynamic-bookmarks)" for details.

## ![](img/arrow.svg) toQueryUrl()

Register a function that generates dynamic links based on the current search term. The call to `toQueryUrl()` returns a virtual link (as a `string`) that can be used like any other URL when defining shortcuts:

```javascript
function mkDocsIssues(searchTerm) {
    if (searchTerm.trim().match(/^[0-9]+$/)) {
        return 'https://github.com/mkdocs/mkdocs/issues/%s';
    } else {
        return 'https://github.com/mkdocs/mkdocs/issues?q=%s';
    }
}
var mkDocsIssuesUrl = shortycut.toUrl(mkDocsIssues);
shortycut.addShortcuts('[mkdi] MkDocs Issues ' + mkDocsIssuesUrl`);
```

When the keyword is used, ShortyCut calls the respective function to obtain the applicable link.

Dynamic query functions can also return multiple links to show as a list or to open in new tabs. See "[Dynamic links](dynamic-links.md#dynamic-queries)" for details.
