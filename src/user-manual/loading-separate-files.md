# ![](img/arrow.svg) Loading separate files

Shortcuts can become hard to maintain if too many of them accumulate in `shortcuts.js`. It's better to organize large collections in separate files.

## ![](img/arrow.svg) Loading additional files

A common scenario is to have personal and work-related shortcuts. Instead of putting all of them into `shortcuts.js`, separate files can be created:


```javascript
// File: shortcuts-personal.js

shortycut.addShortcuts(`
    [cv]  Cat videos    https://www.youtube.com/results?search_query=cats
    [tv]  TV Guide      https://www.yourtv.com.au/guide/
`);
```

```javascript
// File: shortcuts-work.js

shortycut.addShortcuts(`
    [cm]  Canteen menu  https://www.my-company.com/canteen/menu
    [ts]  Timesheets    https://www.my-company.com/timesheet
`);
```

When stored in ShortyCut's `data` folder, these files can be loaded from `shortcuts.js`:

```javascript
// File: shortcuts.js

shortycut.loadJavaScript(
    'shortcuts-personal.js',
    'shortcuts-work.js'
);
```

Shortcuts isolated in individual files can easily be hidden and restored by adding or removing the respective files from the `loadJavaScript` command.

## ![](img/arrow.svg) Relative and absolute paths

By default, `loadJavaScript` loads the files from ShortyCut's `data` folder. Sometimes it's beneficial to create subfolders and use relative paths:

```javascript
shortycut.loadJavaScript(
    'personal/entertainment.js',
    'personal/shopping.js',
    'work/hr-and-policies.js',
    'work/project-matilda.js'
);
```

Files can also be loaded from the internet or a (shared network) drive by using their full address (including the protocol like `https://` or `file://`):

```javascript
shortycut.loadJavaScript(
    'https://www.my-domain.com/shortycut/my-personal-shortcuts.js',
    'file:///S:/Shared/Finance-Team/ShortyCut/finance-systems.js'
);
```

Loading files via the network can slow down ShortyCut. It needs to wait until all files have been fully loaded before redirecting or showing the homepage.

## ![](img/arrow.svg) Loading files in a specific order

ShortyCut starts to load all files in parallel, even when using separate `loadJavaScript` commands:

```javascript
shortycut.loadJavaScript('shortcuts-01.js');
shortycut.loadJavaScript('shortcuts-02.js', 'shortcuts-03.js');
```

In this example, all three files are loaded simultaneously. However, some might load quicker and overtake others along the way. This could lead to `shortcuts-03.js` effectively being executed before `shortcuts-01.js`.

Loading files in parallel is quicker than doing it sequentially. But their actual order is unpredictable and can be different each time. In many cases, that's not a problem, but it can become one when a file overrides keywords or uses JavaScript variables and functions that are defined in another file. In those cases, `andThen` can be used to describe dependencies between the files:

```javascript
shortycut.loadJavaScript('shortcuts-01.js', 'shortcuts-02.js')
                .andThen('shortcuts-03.js', 'shortcuts-04.js')
                .andThen('shortcuts-05.js');
```

This example starts by loading `shortcuts-01.js` and `shortcuts-02.js` in parallel. When both files have been fully loaded, `shortcuts-03.js` and `shortcuts-04.js` are loaded in parallel. When those files have both been loaded as well, ShortyCut starts to load`shortcuts-05.js`.

For performance reasons, it's best to load as many files in parallel as possible. To describe complex dependencies, the same file can be passed to `loadJavaScript` multiple times:

```javascript
shortycut.loadJavaScript('shortcuts-01.js', 'shortcuts-02.js');
shortycut.loadJavaScript('shortcuts-01.js').thenLoad( 'shortcuts-03.js');
```

In this example, `shortcuts-01.js` and `shortcuts-02.js` are loaded in parallel. `shortcuts-03.js` is loaded after `shortcuts-01.js` (but independent of `shortcuts-02.js`). Passing the same file to `loadJavaScript` again does not cause a reload. That is, the second line does not load `shortcuts-01.js` because it has already been loaded in the first line.
