# ![](img/arrow.svg) Shortcut syntax

Each shortcut consists of a keyword, a description, and a link:

```text
[sunnies] Sunglasses at eBay https://www.ebay.com.au/sch/i.html?_nkw=sunglasses
```

The keyword is the one that's entered on ShortyCut's homepage or in the browser's address bar. The description in the middle is optional and can be omitted, but makes it easier to find shortcuts. The link at the end of the line is the page that's opened whenever the keyword is used.

## ![](img/arrow.svg) Keyword

The square brackets (`[` and `]`) around keywords are used for readability only. They are optional and can be omitted:

```text
sunnies  Sunglasses at eBay  https://www.ebay.com.au/sch/i.html?_nkw=sunglasses
[ebay]   Search eBay         https://www.ebay.com.au/sch/i.html?_nkw=%s
```

Each shortcut can have multiple keywords. This allows the link to be opened by entering any one of them. Multiple keywords are concatenated with pipe symbols (`|`) between them. When using square brackets (`[` and `]`), blanks can be inserted for readability. Otherwise, there must be no whitespace between the keywords and the pipe symbols (`|`):

```text
s|sunnies     Sunglasses at eBay  https://www.ebay.com.au/sch/i.html?_nkw=sunglasses
[ e | ebay ]  Search eBay         https://www.ebay.com.au/sch/i.html?_nkw=%s
```

In this example, the sunglasses listing can be opened by entering either `s` or `sunnies`, while a product search can be started via `e` or `ebay`.

## ![](img/arrow.svg) Description

The description is optional and can be omitted. It's recommended to add it nevertheless, particularly when using ShortyCut's homepage. Descriptions are used for the full-text search and displayed as part of the suggestions when entering keywords.

## ![](img/arrow.svg) Link

The last part of the shortcut definition is the link. It should always start with the protocol (`http://` or `https://`). It can also contain the placeholder `%s` to allow entering a search term alongside the keyword:

```text
[sunnies] Sunglasses   https://www.ebay.com.au/sch/i.html?_nkw=sunglasses
[ebay]    Search eBay  https://www.ebay.com.au/sch/i.html?_nkw=%s
```

In this example, `sunnies` is a keyword bookmark, because the link doesn't contain any placeholder. The keyword is used on its own and always opens the same page (the sunglasses listing). On the other hand, the link for `ebay` does have a placeholder. The keyword is entered alongside a search term, which replaces the `%s` in the link. For example, entering `ebay hat` in the browser's address bar will open the hats listing.

Shortcuts can also point to POST pages, where the link does not contain settings, filters, or search terms. See "[POST links](post-links.md)" for details.
