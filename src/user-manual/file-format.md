# ![](img/arrow.svg) File format

Shortcuts are stored in `shortcuts.js`, a file located inside the `data` folder. It can be modified with any text editor.

## ![](img/arrow.svg) Standard format

Shortcuts are defined as a JavaScript string with one shortcut per line. They need to be placed between the backticks (`` ` ``) on top and at the bottom of the file:

```javascript
shortycut.addShortcuts(`

    // Add your shortcut definitions here...

    [sunnies] Sunglasses   https://www.ebay.com.au/sch/i.html?_nkw=sunglasses
    [ebay]    Search eBay  https://www.ebay.com.au/sch/i.html?_nkw=%s

`);
```

Lines that are empty or start with a double-slash (`//`) are treated as comments and ignored. This allows adding notes or temporarily disabling shortcuts without deleting them.

Backslashes (`\`), backticks (`` ` ``), and dollar signs followed by an opening curly bracket (`${`) have a special meaning in JavaScript. They are best avoided. If that's not possible, put an extra backslash (`\`) in front of them:

* Replace `\` with `\\`
* Replace `` ` `` with ``\` ``
* Replace `${` with `\${`

If the preceding backslash (`\`) is missing, ShortyCut might not be able to load any shortcuts at all.

## ![](img/arrow.svg) Legacy format

A few browsers like Internet Explorer and Opera Mini do not support the backtick (`` ` ``) syntax. A slightly different format is required to use ShortyCut with those browsers, too:

```javascript
shortycut.addShortcuts([

    // Add your shortcut definitions here...

    '[sunnies] Sunglasses   https://www.ebay.com.au/sch/i.html?_nkw=sunglasses',
    '[ebay]    Search eBay  https://www.ebay.com.au/sch/i.html?_nkw=%s'

]);
```

Each shortcut definition must be surrounded by single quotes (`'`) and followed by a comma (`,`) at the end of the line. Within each line, single quotes (`'`) and backslashes (`\`) have a special meaning and are best avoided. If that's not possible, put an extra backslash (`\`) in front of them:

* Replace `\` with `\\`
* Replace `` ' `` with ``\' ``

The legacy format has better compatibility and works in all browsers. But it's also more prone to errors, e.g. by accidentally omitting one of the single quotes (`'`) or commas (`,`). Unless Opera Mini or Internet Explorer is used, it's recommended to use the standard format.
