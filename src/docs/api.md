# ![](img/arrow.svg) API

ShortyCut provides functions that can be used to interact with it through JavaScript code.

# ![](img/arrow.svg) addShortcuts()

This function is used to add shortcut definitions.
They can be passed as a multi-line string with one shortcut per line:

```javascript
shortycut.addShortcuts(`
    [sunnies] Sunglasses   https://www.ebay.com.au/sch/i.html?_nkw=sunglasses
    [ebay]    Search eBay  https://www.ebay.com.au/sch/i.html?_nkw=%s
`);
```

A few older browsers (like Internet Explorer) don't support the multi-line syntax.
When using such a browser, the shortcuts need to be passed as an array of strings instead:


```javascript
shortycut.addShortcuts([
    '[sunnies] Sunglasses   https://www.ebay.com.au/sch/i.html?_nkw=sunglasses',
    '[ebay]    Search eBay  https://www.ebay.com.au/sch/i.html?_nkw=%s'
]);
```

See "[File format](file-format.md)" and "[Shortcut syntax](shortcut-syntax.md)" for further details.

# ![](img/arrow.svg) configure()

This function is used to override (some or all of) ShortyCut's built-in default settings:

```javascript
shortycut.configure({
    homepage: {
        suggestions: {
            showFavicons: true
        }
    }
});
```

The supported options are described in "[Configuration](configuration.md)".
It is not necessary to pass all of them and the function can be called multiple times.
When modifying the same settings, subsequent calls override previous ones.

# ![](img/arrow.svg) loadJavaScript()

This function is used to load additional JavaScript files.
It can be called repeatedly and accepts multiple files as well.
They are all loaded in parallel, i.e. the order is unpredictable.
This can be changed by using `andThen()` to model dependencies:

```
shortycut.loadJavaScript('shared-shortcuts.js', 'tools.js')
                .andThen('additional-tools.js')
                .andThen('shortcuts-01.js', 'shortcuts-02.js');
```

Files are loaded from (or relative to) ShortyCut's `data` folder,
unless a complete URL (including a protocol like `https://` or `file://`) is passed.
See "[Loading separate files](loading-separate-files.md)" for further details.
