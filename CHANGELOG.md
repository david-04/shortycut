# Change Log

## [1.4.4](https://github.com/david-04/shortycut/releases/tag/v1.4.4) (2026-02-01)

- Fixed an issue that prevented the caching of local favicons in the local storage
- Enabled dynamic link functions to return multi-line strings (in addition to arrays of strings/URLs)
- Performed technical maintenance (migrate to launchpad, switch to ECMAScript modules, fixed linting issues)

## [1.4.3](https://github.com/david-04/shortycut/releases/tag/v1.4.3) (2024-06-14)

- Fixed unhandled initialization exception when a search bucket has no main (non-search) shortcut
- Tweaked shortlist CSS colors to work with the latest [Dark Reader](https://darkreader.org) release

## [1.4.2](https://github.com/david-04/shortycut/releases/tag/v1.4.2) (2024-04-20)

- Tweak CSS colors to work with the latest [Dark Reader](https://darkreader.org) release

## [1.4.1](https://github.com/david-04/shortycut/releases/tag/v1.4.1) (2024-02-03)

- Re-generated documentation with latest MkDocs version (upgrading jQuery from 2 to 3)

## [1.4](https://github.com/david-04/shortycut/releases/tag/v1.4) (2022-11-04)

- Introduced dynamic bookmarks
- Added the ability to dynamically generate a variable number of links
- Updated and documented the TypeScript typings
- Performed technical maintenance (stricter linting and refactoring)

## [1.3.1](https://github.com/david-04/shortycut/releases/tag/v1.3.1) (2022-09-23)

- Tweaked the homepage's suggestion filter (avoiding unnecessary full-text searches)

## [1.3](https://github.com/david-04/shortycut/releases/tag/v1.3) (2022-09-11)

- Added support for search buckets
- Improved the suggestion list for non-query keywords
- Performed technical maintenance (linting, deprecations, updated typings)

## [1.2.2](https://github.com/david-04/shortycut/releases/tag/v1.2.2) (2021-08-07)

- Fixed an issue that caused domains to be listed under missing favicons even if the favicon had already been downloaded
- Added a TypeScript declaration file (`shortycut.d.ts`) for the ShortyCut API to the data (template) folder

## [1.2.1](https://github.com/david-04/shortycut/releases/tag/v1.2.1) (2021-08-01)

- Added a CORS header to the web server to allow resources to be accessed from all origins
- Fixed an issue that prevented domains without favicons from being displayed in the list view when using a fetch service

## [1.2](https://github.com/david-04/shortycut/releases/tag/v1.2) (2020-10-09)

- Improved the favicon loading speed by preloading all images on startup and caching their known locations in the browser's local storage
- Added favicons to the interactive selection list displayed when accessing keywords with multiple links

## [1.1](https://github.com/david-04/shortycut/releases/tag/v1.1) (2020-09-26)

- Added the ability to load additional JavaScript files, so that large shortcut collections can be spread across multiple files
- Added support for dynamic links, which allow keywords to redirect to different pages based on the search term
- Improved the way how hotkeys are selected, favoring letters that are uppercase or appear at the beginning of words
- Improved the homepage's ability to lock itself to a pinned browser tab by opening links to the manual in new tabs
- Improved the accessibility of the menu through the keyboard when using a browser extension like Vimium
- Fixed an issue that could cause POST links to fail or send wrong data if the search term contained special characters like `&` or `%`
- Fixed an issue with the homepage's no-focus mode where control keys like `Alt` and `Ctrl` would still put the focus on the input field

## [1.0](https://github.com/david-04/shortycut/releases/tag/v1.0) (2020-08-16)

- Initial release
