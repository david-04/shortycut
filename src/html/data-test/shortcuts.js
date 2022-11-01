const TARGET_URL = window.location.href.replace(/\/?[^\/]*([?#].*|)$/, '/data-test/target.html?');

function dynamicLinkSingle(searchTerm) {
    if (searchTerm.match(/^\d+$/)) {
        return TARGET_URL + "Dynamic: Numbers only";
    } else if (searchTerm.match(/^[a-z]+$/i)) {
        return TARGET_URL + "Dynamic: Letters only";
    } else {
        return TARGET_URL + "Dynamic: Mixed content";
    }
}

function dynamicLinkTabs(searchTerm) {
    return [1, 1 + 1, 1 + 1 + 1].map(index => `${TARGET_URL}Tab ${index} - ${encodeURIComponent(searchTerm)}`);
}

function dynamicLinkMenu(searchTerm) {
    return [1, 1 + 1, 1 + 1 + 1].map(index => ({
        description: `Tab ${index} for "${searchTerm}"`,
        url: `${TARGET_URL}Tab ${index} - ${encodeURIComponent(searchTerm)}`
    }));
}

function mkDocsIssues(searchTerm) {
    return "https://github.com/mkdocs/mkdocs/issues/" + (searchTerm.match(/^\d+$/) ? "%s" : "q=%s");
}

const shortcuts = `

    [d] Dynamic [s] Single                                         ${shortycut.toUrl(dynamicLinkSingle)}
    [d] Dynamic [t] Tabs                                           ${shortycut.toUrl(dynamicLinkTabs)}
    [d] Dynamic [m] Menu                                           ${shortycut.toUrl(dynamicLinkMenu)}

    [mkdi] MkDocs issues                                           ${shortycut.toUrl(mkDocsIssues)}

    [mkdi] MkDocs issues                                            http:// MkDocs Issues listing
    [s] Search                                                      http:// Search (%s)
    [s] Search [m] Map                                              http:// Search map (%s)

    [m|map] Map                                                     http:// Map
    [m|map] Search map                                              http:// Search map (%s)

    [gh] GitHub                                                     http:// GitHub
    [gh] GitHub [sc]  ShortyCut                                     http:// GitHub ShortyCut
    [gh] GitHub [sc]  ShortyCut [pr] Pull requests                  http:// GitHub ShortyCut pull requests
    [gh] GitHub [sc]  ShortyCut [pr] Pull requests                  http:// GitHub ShortyCut search pull requests (%s)
    [gh] GitHub [sc]  ShortyCut [pr] Pull requests [m] Merged       http:// GitHub ShortyCut pull requests merged
    [gh] GitHub [mkd] MkDocs                                        http:// GitHub MkDocs
    [gh] GitHub [mkd] MkDocs    [pr] Pull requests                  http:// GitHub MkDocs pull requests (%s)
    [gh] GitHub [mkd] MkDocs    [pr] Pull requests                  http:// GitHub MkDocs search pull requests
    [gh] GitHub [mkd] MkDocs    [pr] Pull requests [m] Merged       http:// GitHub MkDocs pull requests merged

    [news] FAZ                                                      http:// FAZ
    [news] The Age                                                 ?http:// The Age
    [news] NZ Herald                                               ?http:// NZ Herald

    [tabs] Tabs query 1                                             http:// Tab 1 (%s)
    [tabs] Tabs query 2                                            ^http:// Tab 2 (%s)
    [tabs] Tabs query 3                                            ^http:// Tab 3 (%s)
    [tabs] Tabs query 4                                            ^http:// Tab 4 (%s)

    [sc01] Shortcut 01                                              http:// Shortcut 01
    [sc02] Shortcut 02                                              http:// Shortcut 02
    [sc03] Shortcut 03                                              http:// Shortcut 03
    [sc04] Shortcut 04                                              http:// Shortcut 04
    [sc05] Shortcut 05                                              http:// Shortcut 05
    [sc06] Shortcut 06                                              http:// Shortcut 06
    [sc07] Shortcut 07                                              http:// Shortcut 07
    [sc08] Shortcut 08                                              http:// Shortcut 08
    [sc09] Shortcut 09                                              http:// Shortcut 09
    [sc10] Shortcut 10                                              http:// Shortcut 10
    [sc11] Shortcut 11                                              http:// Shortcut 11
    [sc12] Shortcut 12                                              http:// Shortcut 12
    [sc13] Shortcut 13                                              http:// Shortcut 13
    [sc14] Shortcut 14                                              http:// Shortcut 14

    [tabs] Tabs bookmark A                                          http:// Tab A
    [tabs] Tabs bookmark A                                         ?http:// Tab B
    [tabs] Tabs bookmark A                                         ?http:// Tab C
    [tabs] Tabs bookmark A                                         ?http:// Tab D

    [override] Override 1                                           http:// Override 1
    [override] Override 2                                          =http:// Override 2
    [override] Override 3                                          =http:// Override 3
    [override] Override 4                                          =http:// Override 4

    [buy] Buy                                                       http:// eBay
    [buy] eBay                                                      http:// Search eBay (%s)

    [w|weather] Weather [a|au] Australia                            http:// Weather Australia

    [tg] Typing games                                               http:// Typing games

    [defaultsearchengine] Default search engine                     http:// Default search engine %s

    [post] post                                                     http:// ?POST?query=%s

    [a] AWS [t] Test                                                http:// AWS Test Home
    [a] AWS [t] Test [] queue-1                                    #http:// AWS Test Queue 1
    [a] AWS [t] Test [] queue-1-deadletter                         #http:// AWS Test Queue 1 Dead Letter
    [a] AWS [t] Test [] queue-2                                    #http:// AWS Test Queue 2
    [a] AWS [t] Test [] queue-2-deadletter                         #http:// AWS Test Queue 2 Dead Letter

    [a] AWS [p] Prod                                                http:// AWS Prod Home
    [a] AWS [p] Prod [] queue-1                                    #http:// AWS Prod Queue 1
    [a] AWS [p] Prod [] queue-1-deadletter                         #http:// AWS Prod Queue 1 Dead Letter
    [a] AWS [p] Prod [] queue-2                                    #http:// AWS Prod Queue 2
    [a] AWS [p] Prod [] queue-2-deadletter                         #http:// AWS Prod Queue 2 Dead Letter

    [confluence] Confluence                                         http:// Confluence home
    [docs] Confluence Page 1                                        http:// Confluence page 1
    [docs] Confluence Page 2                                        http:// Confluence page 2
`;

shortycut.addShortcuts(shortcuts.replace(/http:\/\/\s+/gi, TARGET_URL));

shortycut.loadJavaScript('../data-test/shortcuts-01.js').andThen('../data-test/shortcuts-02.js');
shortycut.loadJavaScript('../data-test/shortcuts-01.js').andThen('../data-test/shortcuts-03.js');
shortycut.loadJavaScript('../data-test/shortcuts-03.js').andThen('../data-test/shortcuts-02.js');
