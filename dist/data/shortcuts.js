const TARGET_URL = window.location.href.replace(/\/?[^\/]*([?#].*|)$/, "/data/target.html?");

function url(description) {
    return `${TARGET_URL}${encodeURIComponent(description.trim()).replace(/%25s/g, "%s")}`;
}

//----------------------------------------------------------------------------------------------------------------------
// Link generators
//----------------------------------------------------------------------------------------------------------------------

function dynamicQuerySingle(searchTerm) {
    if (searchTerm.match(/^\d+$/)) {
        return url(`Dynamic query - Single - Numbers only - %s`);
    } else if (searchTerm.match(/^[a-z]+$/i)) {
        return url("Dynamic query - Single - Letters only - %s");
    } else {
        return url("Dynamic query - Single - Mixed content - %s");
    }
}

function dynamicQueryTabs(_searchTerm) {
    return [1, 1 + 1].map(index => url(`Dynamic query - Tabs[${index}] - %s`));
}

function dynamicQueryMenu(_searchTerm) {
    return [1, 1 + 1].map(index => ({
        description: `Query ${index}`,
        url: url(`Dynamic query - Menu[${index}] - %s`),
    }));
}

function dynamicBookmarkSingle() {
    return url(`Dynamic bookmark - Single - rand=${Math.round(100 * Math.random())}`); // NOSONAR
}

function dynamicBookmarkTabs() {
    return [1, 1 + 1].map(index => url(`Dynamic bookmark - Tabs[${index}]`));
}

function dynamicBookmarkMenu() {
    return [1, 1 + 1].map(index => ({
        description: `Bookmark ${index}`,
        url: url(`Dynamic bookmark - Menu[${index}]`),
    }));
}

function dynamicBookmarkBroken() {
    return [];
}

function mkDocsIssues(searchTerm) {
    return "https://github.com/mkdocs/mkdocs/issues/" + (searchTerm.match(/^\d+$/) ? "%s" : "q=%s");
}

//----------------------------------------------------------------------------------------------------------------------
// Shortcuts
//----------------------------------------------------------------------------------------------------------------------

const shortcuts = `

    //------------------------------------------------------------------------------------------------------------------
    // Dynamic shortcuts
    //------------------------------------------------------------------------------------------------------------------

    [d] Dynamic [q] Query [s] Single                                ${shortycut.toQueryUrl(dynamicQuerySingle)}
    [d] Dynamic [q] Query [t] Tabs                                  ${shortycut.toQueryUrl(dynamicQueryTabs)}
    [d] Dynamic [q] Query [m] Menu                                  ${shortycut.toQueryUrl(dynamicQueryMenu)}

    [d] Dynamic [q] Query [1] 1 [] Dynamic                         ?${shortycut.toQueryUrl(dynamicQueryTabs)}
    [d] Dynamic [q] Query [1] 1 [] Static                          ?http:// Static %s
    [d] Dynamic [q] Query [2] 2 [] Dynamic                         ^${shortycut.toQueryUrl(dynamicQueryTabs)}
    [d] Dynamic [q] Query [2] 2 [] Static                          ^http:// Static %s
    [d] Dynamic [q] Query [3] 3 [] Dynamic                         ?${shortycut.toQueryUrl(dynamicQueryMenu)}
    [d] Dynamic [q] Query [3] 3 [] Static                          ?http:// Static %s
    [d] Dynamic [q] Query [4] 4 [] Dynamic                         ^${shortycut.toQueryUrl(dynamicQueryMenu)}
    [d] Dynamic [q] Query [4] 4 [] Static                          ^http:// Static %s

    [d] Dynamic [b] Bookmark [s] Single                             ${shortycut.toBookmarkUrl(dynamicBookmarkSingle)}
    [d] Dynamic [b] Bookmark [t] Tabs                               ${shortycut.toBookmarkUrl(dynamicBookmarkTabs)}
    [d] Dynamic [b] Bookmark [m] Menu                               ${shortycut.toBookmarkUrl(dynamicBookmarkMenu)}

    [d] Dynamic [b] Bookmark [b] Broken                             ${shortycut.toBookmarkUrl(dynamicBookmarkBroken)}

    [mkdi] MkDocs issues                                            ${shortycut.toUrl(mkDocsIssues)}
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

    //------------------------------------------------------------------------------------------------------------------
    // Other
    //------------------------------------------------------------------------------------------------------------------

    [ta] The Age https://www.theage.com.au
    [moz] Mozilla Developer Network https://developer.mozilla.org/
`;

//----------------------------------------------------------------------------------------------------------------------
//
//----------------------------------------------------------------------------------------------------------------------

shortycut.addShortcuts(shortcuts.replace(/http:\/\/\s+/gi, TARGET_URL));

//----------------------------------------------------------------------------------------------------------------------
// Load additional files
//----------------------------------------------------------------------------------------------------------------------

shortycut.loadJavaScript("../data/shortcuts-01.js").andThen("../data/shortcuts-02.js");
shortycut.loadJavaScript("../data/shortcuts-01.js").andThen("../data/shortcuts-03.js");
shortycut.loadJavaScript("../data/shortcuts-03.js").andThen("../data/shortcuts-02.js");
