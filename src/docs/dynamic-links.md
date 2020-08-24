# ![](img/arrow.svg) Dynamic links

ShortyCut allows to dynamically open different links based on the current search term.
This is an advanced technique that requires JavaScript code to be written.
It helps to reduce the overall number of keywords by reusing preexisting ones for similar queries.

## ![](img/arrow.svg) Use case

Sometimes there are different ways how information can be accessed and searched.
One example are the MkDocs issues reported on GitHub.
They can be accessed by...


- Listing all issues<br>
  <https://github.com/mkdocs/mkdocs/issues>
- Performing a full-text search<br>
  <https://github.com/mkdocs/mkdocs/issues?q=style>
- Opening one specific issue<br>
  <https://github.com/mkdocs/mkdocs/issues/2163>

Creating separate keywords allows to quickly navigate to the most suitable page on a case-by-case basis:

```javascript
shortycut.addShortcuts(`

    [mkdli] MkDocs » List issues    https://github.com/mkdocs/mkdocs/issues
    [mkdsi] MkDocs » Search issues  https://github.com/mkdocs/mkdocs/issues?q=%s
    [mkdgi] MkDocs » Goto issue     https://github.com/mkdocs/mkdocs/issues/%s
`);
```

This provides great flexibility, but also increases the number of keywords.
From a usability point of view, it would be better to have only one keyword for all links:

```javascript
shortycut.addShortcuts(`

    [mkdi]  MkDocs » Issues         https://github.com/mkdocs/mkdocs/issues
    [mkdi]  MkDocs » Search issues  https://github.com/mkdocs/mkdocs/issues?q=%s
    [mkdi]  MkDocs » Goto issue     https://github.com/mkdocs/mkdocs/issues/%s
`);
```

ShortyCut distinguishes between bookmarks and queries.
Bookmarks are static links like the issue listing - they always open the same page.
Queries, on the other hand, contain the `%s` placeholder and require a search term.
Both types can share the same keyword.
If entered on its own, ShortyCut would use the bookmark.
If the keyword is accompanied by a search term, the query would be used instead.

In the above example, using only `mkdi` would open the issue listing, because that's the only bookmark for the keyword.
But if a search term was entered as well, two queries (search issues and goto issue) would match.
Depending on the configuration,
ShortyCut would either open both links in separate tabs or display a list to manually choose from.

Dynamic links avoid opening multiple tabs or having to choose from a list.
They analyse the search term and automatically select the most suitable target page.

## ![](img/arrow.svg) Creating dynamic links

Dynamic links are simple JavaScript functions.
They receive the search term as a parameter and return the applicable link as the result:

```javascript
function mkDocsIssues(searchTerm) {

    if (searchTerm.trim().match(/^[0-9]+$/)) {
        return 'https://github.com/mkdocs/mkdocs/issues/%s';
    } else {
        return 'https://github.com/mkdocs/mkdocs/issues?q=%s';
    }
}
```

The search term is passed in as regular text (i.e. not URL-encoded).
Prior to embedding it into a link, it needs to be be passed through `encodeURIComponent()`.
However, it's easier to just return a link with the `%s` placeholder and let ShortyCut insert the search term.

The next step is to register the function:

```javascript
var mkDocsIssuesUrl = shortycut.toUrl(mkDocsIssues);
```

This generates a virtual link, which can be used like any other link when defining shortcuts:

```javascript
shortycut.addShortcuts(`

    [mkdi]  MkDocs » Issues  https://github.com/mkdocs/mkdocs/issues
    [mkdi]  MkDocs » Issues  ${ mkDocsIssuesUrl }
`);
```

Interpolation with `${` and `}` only works for backtick (multi-line) strings.
When using the legacy syntax for older browsers, the variable must be appended instead:

```javascript
shortycut.addShortcuts([

    '[mkdi]  MkDocs » Issues    https://github.com/mkdocs/mkdocs/issues',
    '[mkdi]  MkDocs » Issues' + mkDocsIssuesUrl
]);
```

With these shortcuts in place, there's only keyword to be remembered.
Depending on the search term (if any), it opens the right page straight away.
