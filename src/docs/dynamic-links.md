# ![](img/arrow.svg) Dynamic links

ShortyCut allows to dynamically open different pages based on the current search term. This is an advanced technique that requires JavaScript code to be written. It helps to reduce the overall number of keywords by reusing pre-existing ones for similar queries.

## ![](img/arrow.svg) Use case

Sometimes there are different ways how information can be accessed and searched. For example, the MkDocs' issues on GitHub can be accessed in various ways...

- List all issues<br>
  <https://github.com/mkdocs/mkdocs/issues>
- Perform a full-text search<br>
  <https://github.com/mkdocs/mkdocs/issues?q=style>
- Open one specific issue<br>
  <https://github.com/mkdocs/mkdocs/issues/2163>

Creating separate keywords allows to quickly navigate to the most suitable page on a case-by-case basis:

```javascript
shortycut.addShortcuts(`
    [mkdli] MkDocs » List issues    https://github.com/mkdocs/mkdocs/issues
    [mkdsi] MkDocs » Search issues  https://github.com/mkdocs/mkdocs/issues?q=%s
    [mkdgi] MkDocs » Goto issue     https://github.com/mkdocs/mkdocs/issues/%s
`);
```

This provides great flexibility but also increases the number of keywords. From a usability point of view, it would be better to have only one keyword for all links:

```javascript
shortycut.addShortcuts(`
    [mkdi]  MkDocs » Issues         https://github.com/mkdocs/mkdocs/issues
    [mkdi]  MkDocs » Search issues  https://github.com/mkdocs/mkdocs/issues?q=%s
    [mkdi]  MkDocs » Goto issue     https://github.com/mkdocs/mkdocs/issues/%s
`);
```

ShortyCut distinguishes between bookmarks and queries. Bookmarks are static links like the issue listing - they always open the same page. Queries, on the other hand, contain the `%s` placeholder and require a search term. Both types can share the same keyword. If entered on its own, ShortyCut would use the bookmark. If the keyword is accompanied by a search term, the query would be used instead.

In the above example, using only `mkdi` would open the issue listing, because that's the only bookmark for the keyword. But if a search term was entered as well, two queries (search issues and goto issue) would match. Depending on the configuration, ShortyCut would either open both links in separate tabs or display a list to manually choose from.

Dynamic links avoid opening unneeded tabs or having to choose from a list. They analyze the search term and automatically select the most suitable target page.

## ![](img/arrow.svg) Dynamic queries

Dynamic queries are simple JavaScript functions. They receive the search term as a parameter and return the applicable link as the result:

```javascript
function mkDocsIssues(searchTerm) {
    if (searchTerm.trim().match(/^[0-9]+$/)) {
        return 'https://github.com/mkdocs/mkdocs/issues/%s';
    } else {
        return 'https://github.com/mkdocs/mkdocs/issues?q=%s';
    }
}
```

The search term is passed in as regular text (i.e. not URL-encoded). Before embedding it into a link, it needs to be passed through `encodeURIComponent()`. However, it's easier to just return a link with the `%s` placeholder and let ShortyCut insert the search term.

The next step is to register the function:

```javascript
var mkDocsIssuesUrl = shortycut.toQueryUrl(mkDocsIssues);
```

This generates a virtual link, which can be used like any other link when defining shortcuts:

```javascript
shortycut.addShortcuts(`
    [mkdi]  MkDocs » Issues  https://github.com/mkdocs/mkdocs/issues
    [mkdi]  MkDocs » Issues  ${ mkDocsIssuesUrl }
`);
```

Interpolation with `${` and `}` only works for backtick/multi-line strings. When using the legacy syntax for older browsers, the variable must be appended instead:

```javascript
shortycut.addShortcuts([
    '[mkdi]  MkDocs » Issues    https://github.com/mkdocs/mkdocs/issues',
    '[mkdi]  MkDocs » Issues' + mkDocsIssuesUrl
]);
```

With these shortcuts in place, there's only one keyword to remember. It opens the right page, depending on the search term.

## ![](img/arrow.svg) Dynamic bookmarks

Dynamic bookmarks are similar to dynamic queries. But rather than incorporating a search term, they generate links based on other factors. For example, picking the right news website might be based on the time of the day:

```js
function news() {
    var hour = new Date().getHours();
    if (hour <= 8) {
        return 'https://news.com.au/';
    } else if (hour <= 16) {
        return 'https://www.news.co.uk/';
    } else {
        return 'https://www.washingtonpost.com/';
    }
}
```

Dynamic bookmark functions are registered and used just like dynamic queries:

```js
var mkDocsIssuesUrl = shortycut.toBookmarkUrl(news);
shortycut.addShortcuts('[n] News' + mkDocsIssuesUrl);
```

Depending on the time of day, the shortcut opens a news website from Australia, the UK, or the US.

## ![](img/arrow.svg) Dynamic multi-links

Dynamic links can return more than one URL at a time. For example, the MkDocs issues and pull requests on GitHub have numeric IDs that can be used as search criteria. The dynamic query can identify if the search term is a number, but it can't decide if the number refers to an issue or a pull request.  But it can create two separate URLs and return them as an array:

```js
function searchMkDocsRepository(searchTerm) {
    if (searchTerm.match(/^[0-9]+$/)) {
        return [
            'https://github.com/mkdocs/mkdocs/issues/%s',
            'https://github.com/mkdocs/mkdocs/pulls/%s'
        ];
    } else {
        return 'https://github.com/mkdocs/mkdocs/search?q=%s';
    }
}
```

Using the shortcut with a number as the search term causes ShortyCut to open both links in new tabs. Closing the wrong page might be easier than having separate keywords and having to enter two search terms (one after the other).

Dynamic link functions can also return multiple links that should be displayed as a list to choose from (see [Multi-link shortcuts](multi-link-shortcuts.md) for an example). This is done by returning an array of objects that contain the URL and a description as separate properties:

```js
function searchMkDocsRepository(searchTerm) {
    if (searchTerm.match(/^[0-9]+$/)) {
        return [
            {
                url: 'https://github.com/mkdocs/mkdocs/issues/%s',
                description: 'Issue with ID ' + searchTerm
            },
            {
                url: 'https://github.com/mkdocs/mkdocs/pulls/%s',
                description: 'Pull request with ID ' + searchTerm
            }
        ];
    } else {
        return 'https://github.com/mkdocs/mkdocs/search?q=%s';
    }
}
```

If the dynamic link function shares the same keyword with other links, all of them need to be configured to show as a list. It's usually best to reserve a dedicated keyword for dynamic link functions that return multiple URLs with descriptions.

## ![](img/arrow.svg) Favicons

ShortyCut shows favicons on its homepage, if the configuration property [showFavicons](configuration.md#homepagesuggestionsshowfavicons) is set to `true`:

![](img/favicons-suggestions.png)

For dynamic links, ShortyCut selects the favicon based on a sample URL, which it retrieves by passing the following search terms to the dynamic link function:

- `undefined`
- `null`
- `''` (empty string)
- `'1'` (as a string)

Exceptions are discarded silently and the first valid URL returned is used to determine the favicon. Although usually not needed, a preferred domain can be nominated by returning a corresponding link when the search term is `null` or `undefined`:

```javascript
function mkDocsIssues(searchTerm) {
    if (null === searchTerm) {
        return 'https://www.mkdocs.org/';
    } else {
        if (searchTerm.trim().match(/^[0-9]+$/)) {
    	    return 'https://github.com/mkdocs/mkdocs/issues/%s';
	    } else {
        	return 'https://github.com/mkdocs/mkdocs/issues?q=%s';
    	}
    }
}
```

This dynamic link redirects all queries to one of two GitHub pages but uses the favicon of MkDoc's homepage (rather than the one from GitHub).

There is no need to map the search term `null` or `undefined` to a dedicated URL unless the favicons of links returned by the function anyway (GitHub in the example above) are unsuitable.

Favicons for dynamic bookmarks are retrieved the same way as for dynamic queries. Although dynamic bookmark functions don't require a search term, the function can still declare and inspect a parameter. ShortyCut only passes it (as `null`, `''` or `'1'`) when scanning for favicons:

```js
function news(parameter) {
	if (null === parameter) {
        return [
            'https://news.com.au/',
            'https://www.news.co.uk/',
            'https://www.washingtonpost.com/'
        ];
    } else {
        var hour = new Date().getHours();
        if (hour <= 8) {
            return 'https://news.com.au/';
        } else if (hour <= 16) {
            return 'https://www.news.co.uk/';
        } else {
            return 'https://www.washingtonpost.com/';
        }
    }
}
```

It is recommended that a dynamic link function returns all domains that it might redirect to. ShortyCut's homepage only uses the first link from the array. The other ones might still be used when displaying a list to choose from - rather than automatically opening all links in new tabs. Returning all possible domains allows ShortyCut to preload and cache the relevant favicons.
