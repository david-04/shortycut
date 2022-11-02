# ![](img/arrow.svg) Installation

To install ShortyCut, download the latest version from GitHub:

<https://github.com/david-04/shortycut/releases>

Extract the zip archive to any location, e.g. the desktop or your home folder.

ShortyCut requires a few files to store settings and shortcuts. It comes with template files to be used as a starting point. To activate them, rename the `data-template` folder to `data` (i.e. remove the `-template` from the folder's name):

```text
shortycut
  +-- data-template  <--- rename this folder from: data-template
  +-- resources                                to: data
  +-- index.html  <------ then open this file in your browser
```

After renaming the folder, open `index.html` in your browser (e.g. by double-clicking on it). If you see ShortyCut's homepage, the installation is complete.

## ![](img/arrow.svg) Customization

After installing ShortyCut, you need to add your own links and keywords. This is done by editing `shortcuts.js` in the `data` folder. See "[Shortcut syntax](shortcut-syntax.md)" for details.

In order to use the keywords, you also need to make them available in your browser. The easiest way is to pin ShortyCut's homepage, but other methods are available, too. See "[Browser integration](browser-integration.md)" for details.

ShortyCut can be customized by editing `settings.js` in the `data` folder. This includes enabling and disabling features as well as tweaking the way shortcuts are defined. See "[Configuration](configuration.md)" for details.

Finally, browse through the other pages of the manual. They cover a variety of different aspects that will help you to make the most of ShortyCut.

## ![](img/arrow.svg) Upgrading

When upgrading to a newer version, your shortcuts and settings are preserved. However, in case something does go wrong, it's always advisable to create a backup copy of the `data` folder first. Then download the latest release, unzip the archive and overwrite your current installation with the new files.
