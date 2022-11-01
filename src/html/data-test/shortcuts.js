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
    return [1, 1 + 1].map(index => `${TARGET_URL}Dynamic [${index}] ${encodeURIComponent(searchTerm)}`);
}

function dynamicLinkMenu(searchTerm) {
    return [1, 1 + 1].map(index => ({
        description: `Dynamic [${index}] "${searchTerm}"`,
        url: `${TARGET_URL}Dynamic [${index}] ${encodeURIComponent(searchTerm)}`
    }));
}

function mkDocsIssues(searchTerm) {
    return "https://github.com/mkdocs/mkdocs/issues/" + (searchTerm.match(/^\d+$/) ? "%s" : "q=%s");
}

const shortcuts = `

    //------------------------------------------------------------------------------------------------------------------
    // Dynamic shortcuts
    //------------------------------------------------------------------------------------------------------------------

    [d] Dynamic [s] Single                                         ${shortycut.toUrl(dynamicLinkSingle)}
    [d] Dynamic [t] Tabs                                           ${shortycut.toUrl(dynamicLinkTabs)}
    [d] Dynamic [m] Menu                                           ${shortycut.toUrl(dynamicLinkMenu)}

    [d] Dynamic [1] 1 [] Dynamic                                    ?${shortycut.toUrl(dynamicLinkTabs)}
    [d] Dynamic [1] 1 [] Static                                     ?http:// Static %s
    [d] Dynamic [2] 2 [] Dynamic                                    ^${shortycut.toUrl(dynamicLinkTabs)}
    [d] Dynamic [2] 2 [] Static                                     ^http:// Static %s
    [d] Dynamic [3] 3 [] Dynamic                                    ?${shortycut.toUrl(dynamicLinkMenu)}
    [d] Dynamic [3] 3 [] Static                                     ?http:// Static %s
    [d] Dynamic [4] 4 [] Dynamic                                    ^${shortycut.toUrl(dynamicLinkMenu)}
    [d] Dynamic [4] 4 [] Static                                     ^http:// Static %s

    [mkdi] MkDocs issues                                           ${shortycut.toUrl(mkDocsIssues)}
    [mkdi] MkDocs issues                                            http:// MkDocs Issues listing

    //------------------------------------------------------------------------------------------------------------------
    // Grouping
    //------------------------------------------------------------------------------------------------------------------

    [gh] GitHub                                                     http:// GitHub
    [gh] GitHub [sc]  ShortyCut                                     http:// GitHub ShortyCut
    [gh] GitHub [sc]  ShortyCut [pr] Pull requests                  http:// GitHub ShortyCut pull requests
    [gh] GitHub [sc]  ShortyCut [pr] Pull requests                  http:// GitHub ShortyCut search pull requests (%s)
    [gh] GitHub [sc]  ShortyCut [pr] Pull requests [m] Merged       http:// GitHub ShortyCut pull requests merged
    [gh] GitHub [mkd] MkDocs                                        http:// GitHub MkDocs
    [gh] GitHub [mkd] MkDocs    [pr] Pull requests                  http:// GitHub MkDocs pull requests (%s)
    [gh] GitHub [mkd] MkDocs    [pr] Pull requests                  http:// GitHub MkDocs search pull requests
    [gh] GitHub [mkd] MkDocs    [pr] Pull requests [m] Merged       http:// GitHub MkDocs pull requests merged

    //------------------------------------------------------------------------------------------------------------------
    // Multi-links
    //------------------------------------------------------------------------------------------------------------------

    [tabs] Tabs query 1                                             http:// Tab query 1 (%s)
    [tabs] Tabs query 2                                            ^http:// Tab query 2 (%s)
    [tabs] Tabs bookmark A                                          http:// Tab bookmark A
    [tabs] Tabs bookmark B                                         ?http:// Tab bookmark B

    [menu] Menu query 1                                             http:// Menu query 1 (%s)
    [menu] Menu query 2                                            ^http:// Menu query 2 (%s)
    [menu] Menu bookmark A                                          http:// Menu bookmark A
    [menu] Menu bookmark B                                         ?http:// Menu bookmark B

    [override] Override 1                                           http:// Override 1
    [override] Override 2                                          =http:// Override 2
    [override] Override 3                                          =http:// Override 3
    [override] Override 4                                          =http:// Override 4

    //------------------------------------------------------------------------------------------------------------------
    // Hybrid keywords
    //------------------------------------------------------------------------------------------------------------------

    [e] eBay                                                       http:// eBay
    [e] eBay                                                       http:// Search eBay (%s)

    //------------------------------------------------------------------------------------------------------------------
    // Alias keywords
    //------------------------------------------------------------------------------------------------------------------

    [w|weather] Weather [a|au] Australia                            http:// Weather Australia

    //------------------------------------------------------------------------------------------------------------------
    // Search engine
    //------------------------------------------------------------------------------------------------------------------

    [defaultsearchengine] Default search engine                     http:// Default search engine %s

    //------------------------------------------------------------------------------------------------------------------
    // Post query
    //------------------------------------------------------------------------------------------------------------------

    [post] post                                                     http:// ?POST?query=%s

    //------------------------------------------------------------------------------------------------------------------
    // Search buckets
    //------------------------------------------------------------------------------------------------------------------

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
`;

shortycut.addShortcuts(shortcuts.replace(/http:\/\/\s+/gi, TARGET_URL));

shortycut.loadJavaScript('../data-test/shortcuts-01.js').andThen('../data-test/shortcuts-02.js');
shortycut.loadJavaScript('../data-test/shortcuts-01.js').andThen('../data-test/shortcuts-03.js');
shortycut.loadJavaScript('../data-test/shortcuts-03.js').andThen('../data-test/shortcuts-02.js');
