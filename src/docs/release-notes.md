# ![](img/arrow.svg) Release notes

## Version 1.4.0-DEV | 2022-11-02

- Introduced [dynamic bookmarks](dynamic-links.md#dynamic-bookmarks)
- Enabled dynamic link functions to [return multiple links](dynamic-links.md#dynamic-multi-links)
- Updated the TypeScript typings
- Performed technical maintenance (applied stricter linting)

## Version 1.3.1 | 2022-09-23

- Tweaked the homepage's suggestion filter (avoiding unnecessary full-text searches)

## Version 1.3 | 2022-09-11

- Added support for [search buckets](search-buckets.md)
- Improved the suggestion list for non-query keywords
- Performed technical maintenance (linting, deprecations, updated typings)

## Version 1.2.2 | 2021-08-07

- Fixed an issue that caused domains to be listed under [missing favicons](favicons.md#missing-favicons) even if the favicon had already been downloaded
- Added a TypeScript declaration file (`shortycut.d.ts`) for the ShortyCut API to the data (template) folder

## Version 1.2.1 | 2021-08-01

- Added a CORS header to the [web server](web-server.md) to allow resources to be accessed from all origins
- Fixed an issue that prevented [domains without favicons](favicons.md#missing-favicons) from being displayed in the list view when using a [fetch service](configuration.md#homepagefaviconsfetchservice)

## Version 1.2 | 2020-10-09

- Improved the [favicon](favicons.md) loading speed by preloading all images on startup and caching their known locations in the browser's local storage
- Added favicons to the interactive selection list displayed when accessing [keywords with multiple links](multi-link-shortcuts.md)

## Version 1.1 | 2020-09-26

- Added the ability to [load additional JavaScript files](loading-separate-files.md), so that large shortcut collections can be spread across multiple files
- Added support for [dynamic links](dynamic-links.md), which allow keywords to redirect to different pages based on the search term
- Improved the way how [hotkeys](hotkeys.md) are selected, favoring letters that are uppercase or appear at the beginning of words
- Improved the homepage's ability to lock itself to a [pinned browser tab](homepage.md) by opening links to the manual in new tabs
- Improved the accessibility of the menu through the keyboard when using a browser extension like Vimium
- Fixed an issue that could cause [POST links](post-links.md) to fail or send wrong data if the search term contained special characters like `&` or `%`
- Fixed an issue with the homepage's [no-focus mode](homepage.md) where control keys like `Alt` and `Ctrl` would still put the focus on the input field

## Version 1.0 | 2020-08-16

- Initial release
