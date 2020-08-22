var shortcuts = [

    '[s] Search                                                             http:// Search (%s)',
    '[s] Search [m] Map                                                     http:// Search map (%s)',

    '[m|map] Map                                                            http:// Map',
    '[m|map] Search map                                                     http:// Search map (%s)',

    '[gh] GitHub                                                            http:// GitHub',
    '[gh] GitHub [sc]  ShortyCut                                            http:// GitHub ShortyCut',
    '[gh] GitHub [sc]  ShortyCut [pr] Pull requests                         http:// GitHub ShortyCut pull requests',
    '[gh] GitHub [sc]  ShortyCut [pr] Pull requests                         http:// GitHub ShortyCut search pull requests (%s)',
    '[gh] GitHub [sc]  ShortyCut [pr] Pull requests [m] Merged              http:// GitHub ShortyCut pull requests merged',
    '[gh] GitHub [mkd] MkDocs                                               http:// GitHub MkDocs',
    '[gh] GitHub [mkd] MkDocs    [pr] Pull requests                         http:// GitHub MkDocs pull requests (%s)',
    '[gh] GitHub [mkd] MkDocs    [pr] Pull requests                         http:// GitHub MkDocs search pull requests',
    '[gh] GitHub [mkd] MkDocs    [pr] Pull requests [m] Merged              http:// GitHub MkDocs pull requests merged',

    '[news] FAZ                                                             http:// FAZ',
    '[news] The Age                                                        ?http:// The Age',
    '[news] NZ Herald                                                      ?http:// NZ Herald',

    '[tabs] Tabs query 1                                                    http:// Tab 1 (%s)',
    '[tabs] Tabs query 2                                                   ^http:// Tab 2 (%s)',
    '[tabs] Tabs query 3                                                   ^http:// Tab 3 (%s)',
    '[tabs] Tabs query 4                                                   ^http:// Tab 4 (%s)',

    '[sc01] Shortcut 01                                                     http:// Shortcut 01',
    '[sc02] Shortcut 02                                                     http:// Shortcut 02',
    '[sc03] Shortcut 03                                                     http:// Shortcut 03',
    '[sc04] Shortcut 04                                                     http:// Shortcut 04',
    '[sc05] Shortcut 05                                                     http:// Shortcut 05',
    '[sc06] Shortcut 06                                                     http:// Shortcut 06',
    '[sc07] Shortcut 07                                                     http:// Shortcut 07',
    '[sc08] Shortcut 08                                                     http:// Shortcut 08',
    '[sc09] Shortcut 09                                                     http:// Shortcut 09',
    '[sc10] Shortcut 10                                                     http:// Shortcut 10',
    '[sc11] Shortcut 11                                                     http:// Shortcut 11',
    '[sc12] Shortcut 12                                                     http:// Shortcut 12',
    '[sc13] Shortcut 13                                                     http:// Shortcut 13',
    '[sc14] Shortcut 14                                                     http:// Shortcut 14',

    '[tabs] Tabs bookmark A                                                 http:// Tab A',
    '[tabs] Tabs bookmark A                                                ?http:// Tab B',
    '[tabs] Tabs bookmark A                                                ?http:// Tab C',
    '[tabs] Tabs bookmark A                                                ?http:// Tab D',

    '[override] Override 1                                                  http:// Override 1',
    '[override] Override 2                                                 =http:// Override 2',
    '[override] Override 3                                                 =http:// Override 3',
    '[override] Override 4                                                 =http:// Override 4',

    '[buy] Buy                                                              http:// eBay',
    '[buy] eBay                                                             http:// Search eBay (%s)',

    '[w|weather] Weather [a|au] Australia                                   http:// Weather Australia',

    '[gsm] Google street map                                                https://www.google.com.au/maps/@-37.8319768,144.945062,3a,75y,219.55h,69.76t/data=!3m7!1e1!3m5!1sEUCpzGHF7P9_ek0mYagaMw!2e0!6s%2F%2Fgeo3.ggpht.com%2Fcbk%3Fpanoid%3DEUCpzGHF7P9_ek0mYagaMw%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D173.61627%26pitch%3D0%26thumbfov%3D100!7i13312!8i6656',
    '[gsm] Google street map                                                https://www.google.com.au/maps/%s/@-37.8319768,144.945062,3a,75y,219.55h,69.76t/data=!3m7!1e1!3m5!1sEUCpzGHF7P9_ek0mYagaMw!2e0!6s%2F%2Fgeo3.ggpht.com%2Fcbk%3Fpanoid%3DEUCpzGHF7P9_ek0mYagaMw%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D173.61627%26pitch%3D0%26thumbfov%3D100!7i13312!8i6656',

    '[defaultsearchengine] Default search engine                            http:// Default search engine %s',

    '[post] post                                                            http:// ?POST?query=%s',
];

var url = window.location.href.replace(/\/?[^\/]*([?#].*|)$/, '/data-test/target.html?');

for (var index = 0; index < shortcuts.length; index++) {
    shortcuts[index] = shortcuts[index].replace(/http:\/\/\s+/gi, url);
}

shortycut.addShortcuts(shortcuts);

shortycut.loadJavaScript('../data-test/shortcuts-01.js').andThen('../data-test/shortcuts-02.js');
shortycut.loadJavaScript('../data-test/shortcuts-01.js').andThen('../data-test/shortcuts-03.js');
shortycut.loadJavaScript('../data-test/shortcuts-03.js').andThen('../data-test/shortcuts-02.js');
