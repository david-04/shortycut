# ![](img/arrow.svg) Release notes

## Version 1.1 / 2020-09-26

- Added the ability to [load additional JavaScript files](loading-separate-files.md),
  so that large shortcut collections can be spread across multiple files
- Added support for [dynamic links](dynamic-links.md),
  which allow keywords to redirect to different pages based on the search term
- Improved the way how [hotkeys](hotkeys.md) are selected,
  favoring letters that are uppercase or appear at the beginning of words
- Improved the homepage's ability to lock itself to a [pinned browser tab](homepage.md)
  by opening links to the manual in new tabs
- Improved the accessibility of the menu through the keyboard
  when using a browser extensions like Vimium
- Fixed an issue that could cause [POST links](post-links.md) to fail or send wrong data
  if the search term contained special characters like `&` or `%`
- Fixed an issue with the homepage's [no-focus mode](homepage.md)
  where control keys like `Alt` and `Ctrl` would still put the focus on the input field

## Version 1.0 / 2020-08-16

- Initial release
