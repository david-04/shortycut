var __SHORTYCUT_BODY_INNER_HTML = '\n\n    \n    \n    \n\n    <div id="home" style="display:none">\n        <div class="row selected filter-row">\n            <div class="cursor">\n                <img src="resources/arrow.svg" class="icon">\n            </div>\n            <div class="row-content">\n                <input type="text" placeholder="" class="input" />\n            </div>\n        </div>\n        <div class="suggestions">\n        </div>\n        <div class="notification">\n            <div class="welcome" style="display:none">\n                <p>\n                    This is ShortyCut\'s homepage. Enter a keyword above, for example:\n                </p>\n                <p class="example">\n                    <span class="key">t</span> ... to explore keywords starting with a &quot;t&quot;\n                </p>\n                <p class="example">\n                    <span class="key">e sunglasses</span> ... to search for sunglasses on eBay\n                </p>\n                <p class="example">\n                    <span class="key">news</span> ... to try out multi-link keywords\n                    <br>\n                    <br>\n                </p>\n                <p class=\'new-tabs\'>\n                    To keep ShortyCut permanently open in this tab,\n                    <a href="self://?facets=new-tabs">click here to open all links in new tabs</a>.\n                </p>\n                <p>\n                    Then add your own links to <span class="key">shortcut.js</span> in the <span class="key">data</span>\n                    folder. See the <a href="../shortcut-syntax.html">manual</a> for details.\n                </p>\n            </div>\n            <div class="application-errors" style="display:none">\n            </div>\n            <div class="no-shortcuts-no-error" style="display:none">\n                <div class="header">Failed to load shortcuts</div>\n                <div class="description spacing">\n                    No shortcuts have been defined in shortcut.js.\n                </div>\n            </div>\n            <div class="error-with-backtick-support" style="display:none">\n                <div class="header">Failed to load shortcuts</div>\n                <div class="description spacing">\n                    JavaScript errors have occurred while trying to load the shortcuts.\n                    <br>Make sure to avoid\n                    <a href="../file-format.html">unsupported symbols</a> in shortcuts.js.\n                </div>\n            </div>\n            <div class="error-without-backtick-support" style="display:none">\n                <div class="header">Failed to load shortcuts</div>\n                <div class="description spacing">\n                    JavaScript errors have occurred while trying to load the shortcuts.\n                    <br>It also appears that your browser does not support the backtick syntax.\n                    <br>Make sure to use the <a href="../file-format.html#legacy-format">legacy format</a>\n                    and avoid any unsupported symbols.\n                </div>\n\n            </div>\n        </div>\n    </div>\n\n    \n    \n    \n\n    <div id="menu" style="display:none">\n        <a class="burger-icon">\n            <div></div>\n            <div></div>\n            <div></div>\n        </a>\n        <a class="close-icon">\n        </a>\n        <div class="items">\n        </div>\n    </div>\n\n    \n    \n    \n\n    <div id="error" style="display:none">\n        <div class="title">\n        </div>\n        <div class="message">\n        </div>\n    </div>\n\n    \n    \n    \n\n    <div id="shortlist" style="display:none">\n    </div>\n\n    \n    \n    \n\n    <div id="redirect" style="display:none">\n        <div class="icon">\n            <img src="resources/arrow.svg">\n        </div>\n        <div class="text">\n            <div class="title"></div>\n            <div class="url"></div>\n        </div>\n    </div>\n\n    \n    \n    \n\n    <div id="setup" style="display:none">\n        <div>\n            <div class="error" style="display:none">\n                That didn\'t work. Please double-check the folder name and try again.\n            </div>\n            <h1>\n                <img src="resources/arrow.svg">\n                <span class="title">Welcome</span>\n            </h1>\n        </div>\n        <div class="instructions">\n            <p>\n                It looks like you\'ve just installed ShortyCut.\n                To complete the setup, rename the <span class="filename">data-template</span> folder to\n                <span class="filename">data</span> (i.e. remove <span class="filename">-template</span>\n                from the folder\'s name):\n            </p>\n            <pre><span class="root-path">shortycut</span>\n                +-- data-template<span class="highlight"><span class="arrow">&#x25C0;</span> Rename this folder from: data-template</span>\n                +-- resources    <span class="arrow">&nbsp;</span>                      <span class="highlight">to: data</span>\n                +-- index.html</pre>\n            <div class="syntax-warning" style="display:none">\n                <p>\n                    The <span class="filename">data</span> folder contains a file named\n                    <span class="filename">shortcuts.js</span> which uses ShortyCut\'s standard format.\n                </p>\n                <p  class="important">\n                    It looks like this format is not supported by your browser.\n                </p>\n                <p>\n                    Please follow the instructions in the <a href="../file-format.html">manual</a>\n                    to use the legacy format instead.\n                </p>\n            </div>\n            <p>\n                <a href="self://?setup=validate" class="button">Done</a>\n            </p>\n        </div>\n    </div>\n\n    \n    \n    \n\n    <div id="link-tools" style="display:none" class="utility-page">\n        <div class="url-encoding">\n            <h1>URL-Encoding</h1>\n            <p>\n                Link parameters (like filters and settings) need to be URL-encoded.\n                <br>Enter text into any of the fields below to encode or decode it.\n            </p>\n            <p>\n                Plain text\n                <br><input class="decoded" />\n            </p>\n            <p>\n                URL-encoded\n                <br><input class="encoded" />\n            </p>\n        </div>\n        <div class="har-parser">\n            <h1>Extract POST links</h1>\n            <p>\n                Web pages using the POST method don\'t contain settings and filters in their address.\n                <br>Using an HTTP Archive (HAR file) is the easiest way to extract their ShortyCut link.\n                <br>Refer to the <a href="./../post-links.html#extracting-post-links">documentation</a>\n                on how to obtain the HAR file.\n                <br>Paste the HAR file into the field below to extract all POST pages.\n            </p>\n            <p>\n                <textarea class="input" placeholder="Paste the HAR file in here"></textarea>\n            </p>\n            <div class="output">\n\n            </div>\n        </div>\n    </div>\n\n    \n    \n    \n\n    <div id="favicon-tools" style="display:none" class="utility-page">\n        <div class="config-warning" style="display:none">\n            Favicons are disabled. To enable them, set the config property\n            <a href="../configuration.html#shortcutformathomepagesuggestionsshowfavicons">showFavicons</a>\n            to true.\n        </div>\n        <h1>Favicons</h1>\n        <div>\n            ShortyCut\'s homepage displays website\'s favicons as part of suggestions.\n            <br>It\'s recommended to download them for quicker access.\n            See the <a href="../favicons.html">manual</a> for details.\n        </div>\n        <div class="pending" style="display:none">\n            <h1>Analysis in progress...</h1>\n            Scanning the below websites for favicons. Please wait...\n            <br>\n            <br>\n            <div class="listing"></div>\n        </div>\n        <div class="online" style="display:none">\n            <h1>Ready for download</h1>\n            The following icons are available for download.\n            See the <a href="../favicons.html#downloadable-favicons">manual</a> for details.\n            <br>If you\'re familiar with the command line, you can batch-download all at once:\n            <br>\n            <br><a href="" class="curl">Click here to show &quot;curl&quot; commands<br></a>\n            <textarea class="curl" wrap="off" readonly style="display:none"></textarea>\n            <br>Otherwise right-click on each icon and save the image file.\n            <br>Then rename it to the filename displayed next to the icon:\n            <br>\n            <br>\n            <div class="listing"></div>\n        </div>\n        <div class="missing" style="display:none">\n            <h1>Missing favicons</h1>\n            The following websites have no standard favicon.\n            <br>Consider downloading suitable icons from elsewhere.\n            <br>See the <a href="../favicons.html#missing-favicons">manual</a> for details.\n            <br>\n            <br>\n            <div class="listing"></div>\n        </div>\n        <div class="offline" style="display:none">\n            <h1>Already downloaded</h1>\n            The following icons have already been downloaded:\n            <br>\n            <br>\n            <div class="listing"></div>\n        </div>\n    </div>\n\n    \n    \n    \n\n    <div id="browser-integration" style="display:none" class="utility-page">\n        <h1>Browser integration</h1>\n        <div>\n            This page contains links and tools for integrating ShortyCut with your browser.\n            See the <a href="../browser-integration.html">manual</a>\n            for a description of all methods.\n        </div>\n        <h1>Homepage</h1>\n        <div>\n            ShortyCut has settings to tweak the behavior of its homepage\n            when used as the browser\'s start page or as a pinned tab.\n            Activate them as required by ticking the checkboxes below:\n            <br>\n            <br>\n            <table border="0" cellpadding="0">\n                <tr>\n                    <td>\n                        <input type="checkbox" class="new-tabs" />\n                    </td>\n                    <td>\n                        &nbsp;\n                    </td>\n                    <td>\n                        <b>Open all links in new tabs</b>\n                    </td>\n                </tr>\n                <tr>\n                    <td colspan="2">\n                    </td>\n                    <td>\n                        Lock ShortyCut\'s homepage to the browser tab and never navigate away.\n                        As the tab sticks around, it can be reused for entering more keywords later.\n                        <br>&nbsp;\n                    </td>\n                </tr>\n                <tr>\n                    <td>\n                        <input type="checkbox" class="no-focus" />\n                    </td>\n                    <td>\n                        &nbsp;\n                    </td>\n                    <td>\n                        <b>Don\'t focus on the input field</b>\n                    </td>\n                </tr>\n                <tr>\n                    <td colspan="2">\n                    </td>\n                    <td>\n                        Tick this checkbox when using an add-on like Vimium,\n                        which allows to operate the browser via keyboard shortcuts.\n                        <br>&nbsp;\n                    </td>\n                </tr>\n            </table>\n            Set your browser\'s start page or the pinned tab to the following address:\n            <br>\n            <br><a class="homepage"></a>\n        </div>\n        <h1>Keyword query</h1>\n        <div>\n            If supported by your browser, you can create a keyword query.\n            See the <a href="../keyword-query.html">manual</a> for details how it works.\n            In Firefox, the keyword query can be created via the context menu:\n            <br>\n            <br>\n            <form class="form"><input name="q" readonly\n                    value="Right-click here and select &quot;Add a keyword for this search...&quot;"></form>\n            <br>In other browsers, manually create the keyword with the following address:\n            <br>\n            <br><a onclick="return false" class="keyword"></a>\n        </div>\n        <h1>Search engine</h1>\n        <div class="web-server-required" style="display:none">\n            To add ShortyCut as a search engine, it must be access through a web server.\n            Follow the instructions in the <a href="../web-server.html">manual</a> to set it up.\n            Once the web server is up and running, access ShortyCut through this link:\n            <br>\n            <br><a href="http://localhost:4171/index.html">http://localhost:4171/index.html</a>\n            <br>\n            <br>For browsers which require an encrypted connection, use this link instead:\n            <br>\n            <br><a href="https://localhost:4172/index.html">https://localhost:4172/index.html</a>\n            <br>\n            <br>This will produce a security warning. Confirm it to open ShortyCut.\n        </div>\n        <div class="search-engine" style="display:none">\n            ShortyCut should be discovered as a search engine automatically.\n            <br>Please check your browser\'s th search box.\n            <br>If ShortyCut doesn\'t show up, try clicking on the following link:\n            <br>\n            <br><a class="open-search"></a>\n        </div>\n        <h1>Pop-up blocker</h1>\n        <div>\n            ShortyCut allows multiple links / bookmarks to have the same keyword.\n            <br>Depending on the configuration, it can open all of them in separate tabs.\n            <br>To use this feature, you need to disable the browser\'s pop-up blocker.\n            <br>Test if the blocker is currently active by clicking on this button:\n            <br>\n            <br><input type="button" class="pop-up" value="Open 2 pop-up windows" />\n            <br>\n            <br>If pop-ups are blocked, it\'s usually indicated in the browser\'s address bar.\n            <br>You should be able to allow pop-ups for ShortyCut there as well.\n\n        </div>\n    </div>\n\n</body>\n\n</html>\n';
"use strict";
var shortycut;
(function (shortycut) {
    function configure(newConfig) {
        shortycut.startupCache.config.push(newConfig);
    }
    shortycut.configure = configure;
    function addShortcuts() {
        var shortcuts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            shortcuts[_i] = arguments[_i];
        }
        for (var _a = 0, shortcuts_1 = shortcuts; _a < shortcuts_1.length; _a++) {
            var item = shortcuts_1[_a];
            if (Array.isArray(item)) {
                item.forEach(function (item) { return shortycut.startupCache.shortcuts.push(item); });
            }
            else {
                shortycut.startupCache.shortcuts.push(item);
            }
        }
    }
    shortycut.addShortcuts = addShortcuts;
    function toUrl(dynamicLinkFunction) {
        if ('function' !== typeof dynamicLinkFunction) {
            shortycut.startupCache.initializationErrors.push(new shortycut.InitializationError(shortycut.create('div', 'The parameter passed to shortycut.toUrl() is not a function:'), shortycut.create('div', shortycut.create('tt', "" + dynamicLinkFunction))));
        }
        var key = shortycut.dynamicLinkProtocol + "://" + Object.keys(shortycut.startupCache.dynamicLinks).length + "-" + Math.random();
        shortycut.startupCache.dynamicLinks[key] = {
            generator: dynamicLinkFunction,
            urlForFavicon: getUrlForFavicon(dynamicLinkFunction)
        };
        return key;
    }
    shortycut.toUrl = toUrl;
    function getUrlForFavicon(dynamicLinkFunction) {
        var _a, _b;
        var invalidUrl = undefined;
        for (var _i = 0, _c = [undefined, null, '', '1']; _i < _c.length; _i++) {
            var searchTerm = _c[_i];
            try {
                var url = (_a = dynamicLinkFunction(searchTerm)) === null || _a === void 0 ? void 0 : _a.trim();
                if (url) {
                    if (shortycut.isUrl(url)) {
                        return url;
                    }
                    else if (!invalidUrl) {
                        invalidUrl = (((_b = dynamicLinkFunction) === null || _b === void 0 ? void 0 : _b.name) || 'function') + "(" + (undefined === searchTerm || null === searchTerm ? "" + searchTerm : "'" + searchTerm + "'") + ") => " + url;
                    }
                }
            }
            catch (ignored) { }
        }
        if (invalidUrl) {
            shortycut.startupCache.initializationErrors.push(new shortycut.InitializationError(shortycut.create('div', 'The dynamic link function returned an invalid URL.'), shortycut.create('div', shortycut.create('tt', invalidUrl))));
        }
        return 'file:///';
    }
    var JavaScriptDependencyBuilder = (function () {
        function JavaScriptDependencyBuilder(dependencies) {
            this.dependencies = dependencies;
        }
        JavaScriptDependencyBuilder.prototype.andThen = function () {
            var _this = this;
            var files = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                files[_i] = arguments[_i];
            }
            return new JavaScriptDependencyBuilder(files.map(function (file) { return shortycut.javaScriptLoader.add(file, _this.dependencies); }));
        };
        return JavaScriptDependencyBuilder;
    }());
    function loadJavaScript() {
        var _a;
        var files = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            files[_i] = arguments[_i];
        }
        return (_a = new JavaScriptDependencyBuilder([])).andThen.apply(_a, files);
    }
    shortycut.loadJavaScript = loadJavaScript;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    function initialize() {
        window.addEventListener('error', function (exception) { shortycut.startupCache.exceptions.push(exception); });
        window.addEventListener('DOMContentLoaded', function () {
            document.title = 'ShortyCut';
            ['icon', 'shortcut icon'].forEach(function (rel) { return addLink(rel, 'image/x-icon', 'resources/favicon.ico', ''); });
            addLink('search', 'application/opensearchdescription+xml', 'data/search.xml', 'ShortyCut');
        });
        shortycut.javaScriptLoader = new shortycut.JavaScriptLoader();
        window.addEventListener('load', function () { return shortycut.handleExceptions(shortycut.displayError, function () { return shortycut.javaScriptLoader.onComplete(startApplication); }); });
    }
    shortycut.initialize = initialize;
    function addLink(rel, type, href, title) {
        var link = document.createElement('link');
        link.rel = rel;
        link.type = type;
        link.href = href;
        link.title = title;
        document.head.appendChild(link);
    }
    function startApplication() {
        if ("undefined" !== typeof __SHORTYCUT_BODY_INNER_HTML) {
            document.body.innerHTML = __SHORTYCUT_BODY_INNER_HTML;
        }
        var self = window.location.href.replace(/[?#].*$/, '');
        document.body.innerHTML = document.body.innerHTML.replace(/self:\/\//g, self);
        shortycut.initializeVariables();
        shortycut.applyAndValidateConfig();
        if (!shortycut.startupCache.config.length && !shortycut.queryParameters.setup) {
            window.location.href = window.location.href.replace(/[#?].*$/, '') + "?" + shortycut.QueryParameters.SETUP + "=welcome";
            return;
        }
        shortycut.parseShortcuts(function (result) { return shortycut.handleExceptions(shortycut.displayError, function () {
            if (result instanceof shortycut.Exception) {
                throw result;
            }
            else {
                if (shortycut.queryParameters.facets.newTabs) {
                    var links = document.getElementsByTagName('a');
                    for (var index = 0; index < links.length; index++) {
                        var link = links.item(index);
                        if (link) {
                            link.target = '_blank';
                        }
                    }
                }
                shortycut.redirector.processQuery();
            }
        }); });
    }
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var RedirectMode;
    (function (RedirectMode) {
        RedirectMode[RedirectMode["NEW_TAB"] = 0] = "NEW_TAB";
        RedirectMode[RedirectMode["PRESERVE_HISTORY"] = 1] = "PRESERVE_HISTORY";
        RedirectMode[RedirectMode["ERASE_HISTORY"] = 2] = "ERASE_HISTORY";
    })(RedirectMode = shortycut.RedirectMode || (shortycut.RedirectMode = {}));
    var Redirector = (function () {
        function Redirector() {
            this.alwaysOpenNewTabs = false;
            this.showRedirectPage = true;
        }
        Redirector.prototype.processQuery = function () {
            var _a, _b;
            var shortcut = shortycut.shortcuts[shortycut.queryParameters.keyword] || undefined;
            var setup = shortycut.queryParameters.setup;
            var isHomepageKeyword = shortycut.config.homepage.keywords.some(function (keyword) { return keyword === shortycut.queryParameters.keyword; });
            if (setup) {
                this.showSetupPage(setup);
            }
            else if (shortcut) {
                shortcut.replacePlaceholders(shortycut.queryParameters.searchTerm);
                if (shortycut.queryParameters.index && shortcut.all[shortycut.queryParameters.index]) {
                    this.redirect([shortcut.all[shortycut.queryParameters.index].link], shortycut.OnMultiLink.OPEN_IN_NEW_TAB, shortycut.queryParameters.searchTerm, RedirectMode.ERASE_HISTORY);
                }
                else if (shortcut.queries && (shortycut.queryParameters.searchTerm || !shortcut.bookmarks)) {
                    this.redirect(shortcut.queries.current, shortcut.queries.onMultiLink, shortycut.queryParameters.searchTerm, RedirectMode.ERASE_HISTORY);
                }
                else if (shortcut.bookmarks) {
                    this.redirect(shortcut.bookmarks.current, shortcut.bookmarks.onMultiLink, shortycut.queryParameters.searchTerm, RedirectMode.ERASE_HISTORY);
                }
                else {
                    throw new shortycut.Exception('Internal error', 'Found no links to use for redirection');
                }
            }
            else if (shortycut.isUrl(shortycut.queryParameters.fullQuery)) {
                this.openUrl(shortycut.queryParameters.fullQuery, RedirectMode.ERASE_HISTORY);
            }
            else if (!shortycut.queryParameters.keyword || !shortycut.defaultSearchEngine || !shortycut.config.defaultSearchEngine.useInAddressBar || isHomepageKeyword) {
                this.alwaysOpenNewTabs = shortycut.queryParameters.facets.newTabs;
                this.showRedirectPage = false;
                shortycut.router.goto(shortycut.pages.home.populate(isHomepageKeyword
                    ? shortycut.queryParameters.fullQuery.replace(/^\s*[^\s]+/, '').trim()
                    : shortycut.queryParameters.fullQuery));
                if (shortycut.queryParameters.facets.noFocus) {
                    shortycut.pages.home.removeFocus();
                }
            }
            else {
                shortycut.defaultSearchEngine.replacePlaceholders(shortycut.queryParameters.fullQuery);
                var links = ((_a = shortycut.defaultSearchEngine.queries) === null || _a === void 0 ? void 0 : _a.current) || ((_b = shortycut.defaultSearchEngine.bookmarks) === null || _b === void 0 ? void 0 : _b.current);
                this.redirect(links, shortycut.OnMultiLink.OPEN_IN_NEW_TAB, shortycut.queryParameters.fullQuery, RedirectMode.ERASE_HISTORY);
            }
        };
        Redirector.prototype.redirect = function (links, onMultiLink, searchTerm, mode) {
            links.forEach(function (link) { return link.replacePlaceholder(searchTerm); });
            if (1 === links.length) {
                this.openLink(links[0], searchTerm, mode);
            }
            else if (onMultiLink === shortycut.OnMultiLink.SHOW_MENU) {
                this.showRedirectPage = false;
                setTimeout(function () { return shortycut.router.goto(shortycut.pages.shortlist.populate(links, searchTerm)); }, 0);
            }
            else if (this.alwaysOpenNewTabs) {
                links.forEach(function (link) { return window.open(link.url); });
                shortycut.router.goBackToAndResetHomepage();
            }
            else {
                links.slice(1).forEach(function (link) { return window.open(link.url); });
                this.openLink(links[0], searchTerm, mode);
            }
        };
        Redirector.prototype.openLink = function (link, searchTerm, mode) {
            if (this.showRedirectPage) {
                shortycut.router.goto(shortycut.pages.redirect.populate(link));
            }
            if (link.postFields) {
                if (RedirectMode.NEW_TAB === mode || this.alwaysOpenNewTabs) {
                    this.openUrl(link.getHref(searchTerm), mode);
                }
                else {
                    this.submitForm(link);
                }
            }
            else {
                this.openUrl(link.url, mode);
            }
        };
        Redirector.prototype.openUrl = function (url, mode) {
            if (RedirectMode.PRESERVE_HISTORY === mode && !this.alwaysOpenNewTabs) {
                window.location.href = url;
            }
            else if (RedirectMode.ERASE_HISTORY == mode && !this.alwaysOpenNewTabs) {
                window.location.replace(url);
            }
            else {
                window.open(url);
                if (this.alwaysOpenNewTabs) {
                    shortycut.router.goBackToAndResetHomepage();
                }
            }
        };
        Redirector.prototype.submitForm = function (link) {
            var form = document.createElement('form');
            form.action = link.url;
            form.method = 'post';
            form.style.display = 'none';
            for (var _i = 0, _a = (link.postFields || []); _i < _a.length; _i++) {
                var field = _a[_i];
                var input = document.createElement('input');
                input.type = 'text';
                input.name = field.key;
                input.value = field.value;
                form.appendChild(input);
            }
            document.body.appendChild(form);
            form.submit();
        };
        Redirector.prototype.showSetupPage = function (mode) {
            if (shortycut.pages.setup) {
                shortycut.pages.setup.hide();
            }
            shortycut.pages.setup.populate(mode).show();
        };
        return Redirector;
    }());
    shortycut.Redirector = Redirector;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var Router = (function () {
        function Router() {
            this.menu = new shortycut.Menu();
            this.history = new Array();
            this.goBackOrHome = this.goBackOrHome.bind(this);
            this.goHome = this.goHome.bind(this);
            this.onHashChange = this.onHashChange.bind(this);
            this.onKeyDown = this.onKeyDown.bind(this);
            window.addEventListener('hashchange', this.onHashChange);
            document.addEventListener('keydown', this.onKeyDown);
        }
        Router.prototype.goto = function (page) {
            this.history.length = this.getCurrentHistoryIndex() + 1;
            this.history.push(page);
            if (1 === this.history.length) {
                this.showIndex(0);
            }
            else {
                window.location.hash = "" + (this.history.length - 1);
                this.onHashChange();
            }
        };
        Router.prototype.goHome = function () {
            this.goto(shortycut.pages.home);
        };
        Router.prototype.goBackOrHome = function () {
            if (1 < this.history.length && 0 < this.getCurrentHistoryIndex()) {
                window.history.go(-1);
            }
            else if (this.history[this.getCurrentHistoryIndex()] !== shortycut.pages.home) {
                this.goto(shortycut.pages.home);
            }
        };
        Router.prototype.goBackToAndResetHomepage = function () {
            shortycut.pages.home.populate();
            this.goBackOrHome();
            if (shortycut.queryParameters.facets.noFocus) {
                setTimeout(function () { return shortycut.pages.home.removeFocus(); }, 1);
            }
        };
        Router.prototype.onHashChange = function () {
            this.showIndex(this.getCurrentHistoryIndex());
        };
        Router.prototype.getCurrentHistoryIndex = function () {
            var index = parseInt(window.location.hash.replace('#', ''));
            return Math.min(Math.max(isNaN(index) ? 0 : index, 0), this.history.length - 1);
        };
        Router.prototype.showIndex = function (index) {
            var page = this.history[index];
            if (page) {
                shortycut.pages.hideAllExcept(page);
                page.show();
                if (page.hasMenu()) {
                    if (page === shortycut.pages.home) {
                        this.menu.showBurgerIcon();
                    }
                    else {
                        this.menu.showCloseIcon(this.goBackOrHome);
                    }
                }
                else {
                    this.menu.hide();
                }
            }
        };
        Router.prototype.onKeyDown = function (event) {
            if (('Escape' === event.key || 'Esc' === event.key)) {
                if (this.history[this.history.length - 1] !== shortycut.pages.home) {
                    this.goBackOrHome();
                    event.preventDefault();
                    return false;
                }
            }
            return true;
        };
        return Router;
    }());
    shortycut.Router = Router;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var JavaScriptFile = (function () {
        function JavaScriptFile(url, dependencies) {
            var _this = this;
            this.url = url;
            this.dependencies = new Array();
            this.status = 'waiting';
            dependencies === null || dependencies === void 0 ? void 0 : dependencies.forEach(function (dependency) { return _this.dependencies.push(dependency); });
        }
        return JavaScriptFile;
    }());
    shortycut.JavaScriptFile = JavaScriptFile;
    var JavaScriptLoader = (function () {
        function JavaScriptLoader() {
        }
        Object.defineProperty(JavaScriptLoader.prototype, "files", {
            get: function () {
                var _a;
                window['shortycut.JavaScriptLoader.files'] = (_a = window['shortycut.JavaScriptLoader.files']) !== null && _a !== void 0 ? _a : {};
                return window['shortycut.JavaScriptLoader.files'];
            },
            enumerable: false,
            configurable: true
        });
        JavaScriptLoader.prototype.add = function (url, dependencies) {
            var _a;
            var file = this.files[url] = (_a = this.files[url]) !== null && _a !== void 0 ? _a : new JavaScriptFile(url, []);
            dependencies === null || dependencies === void 0 ? void 0 : dependencies.forEach(function (dependency) { return file.dependencies.push(dependency); });
            this.checkDependenciesAndLoadFiles();
            return file;
        };
        JavaScriptLoader.prototype.checkDependenciesAndLoadFiles = function () {
            var _this = this;
            var files = Object.keys(this.files).map(function (url) { return _this.files[url]; });
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                if (file.status === 'waiting' && !file.dependencies.filter(function (dep) { return dep.status !== 'completed'; }).length) {
                    this.startLoad(file);
                }
            }
            var waitingFiles = files.filter(function (file) { return file.status === 'waiting'; });
            var hasWaitingFiles = !!waitingFiles.length;
            var hasLoadingFiles = !!files.filter(function (file) { return file.status === 'loading'; }).length;
            if (!hasWaitingFiles && !hasLoadingFiles && this.onCompleteHandler) {
                this.onCompleteHandler();
            }
            if (hasWaitingFiles && !hasLoadingFiles) {
                shortycut.startupCache.initializationErrors.push(new shortycut.ScriptLoadingError(("\n                    There's a cyclic dependency (&quot;deadlock&quot;) between the following JavaScript files:\n                    " + (waitingFiles).map(function (file) { return shortycut.sanitize(file.url); }).join(' and ') + "\n                ").trim()));
                waitingFiles.forEach(function (file) { return _this.startLoad(file); });
            }
        };
        JavaScriptLoader.prototype.startLoad = function (file) {
            var _this = this;
            file.status = 'loading';
            var script = document.createElement('script');
            script.addEventListener('load', function () { return _this.onLoad(file); });
            script.addEventListener('error', function () { return _this.onError(file); });
            script.type = 'text/javascript';
            script.src = file.url.match(/^[a-z]+:\/\/.*/i) ? file.url : "data/" + file.url;
            document.getElementsByTagName('head')[0].appendChild(script);
        };
        JavaScriptLoader.prototype.onLoad = function (file) {
            file.status = 'completed';
            this.checkDependenciesAndLoadFiles();
        };
        JavaScriptLoader.prototype.onError = function (file) {
            file.status = 'completed';
            shortycut.startupCache.initializationErrors.push(new shortycut.ScriptLoadingError("Failed to load " + shortycut.sanitize(file.url)));
            this.checkDependenciesAndLoadFiles();
        };
        JavaScriptLoader.prototype.onComplete = function (onCompleteHandler) {
            this.onCompleteHandler = onCompleteHandler;
            this.checkDependenciesAndLoadFiles();
        };
        return JavaScriptLoader;
    }());
    shortycut.JavaScriptLoader = JavaScriptLoader;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    function parseShortcuts(callback) {
        shortycut.handleExceptions(callback, function () {
            var lines = new Array();
            for (var index = 0; index < shortycut.startupCache.shortcuts.length; index++) {
                lines.push.apply(lines, shortycut.startupCache.shortcuts[index].split(/\r?\n/));
            }
            var parser = new shortycut.ShortcutParser();
            parseBatch(parser, lines, 0, 2000, shortycut.shortcuts, callback);
        });
    }
    shortycut.parseShortcuts = parseShortcuts;
    function parseBatch(parser, lines, index, batchSize, shortcuts, callback) {
        shortycut.handleExceptions(callback, function () {
            if (index < lines.length) {
                parser.parseLines(lines, index, Math.min(index + batchSize, lines.length), shortcuts);
                setTimeout(function () { return parseBatch(parser, lines, index + batchSize, batchSize, shortcuts, callback); }, 0);
            }
            else {
                callback(shortcuts);
            }
        });
    }
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    shortycut.DEFAULT_CONFIG = {
        shortcutFormat: {
            comment: '//',
            keyword: {
                caseSensitive: false,
                openingDelimiter: '[',
                separator: '|',
                closingDelimiter: ']',
            },
            enableGrouping: false,
            hotkeyMarker: '',
            url: {
                searchTermPlaceholder: '%s',
                postIndicator: '?POST?',
                multiLinkIndicator: {
                    replacePrevious: '=',
                    openInNewTab: '^',
                    showMenu: '?',
                    default: 'showMenu'
                }
            }
        },
        homepage: {
            keywords: ['?', 'help', 'home', 'homepage', 'sc', 'shortycut'],
            suggestions: {
                showKeywords: true,
                showHotkeys: true,
                showFavicons: true,
                faviconFolders: ['favicons'],
            }
        },
        defaultSearchEngine: {
            keyword: 'defaultsearchengine',
            useInAddressBar: true,
            useOnHomepage: true
        }
    };
    function applyAndValidateConfig() {
        for (var index = 0; index < shortycut.startupCache.config.length; index++) {
            mergeConfig(shortycut.config, shortycut.startupCache.config[index], shortycut.startupCache.config[index]);
        }
        validateConfig();
        if (!shortycut.config.shortcutFormat.keyword.caseSensitive) {
            shortycut.config.shortcutFormat.url.searchTermPlaceholder = shortycut.adjustCase(shortycut.config.shortcutFormat.url.searchTermPlaceholder);
            shortycut.config.shortcutFormat.url.postIndicator = shortycut.adjustCase(shortycut.config.shortcutFormat.url.postIndicator);
            shortycut.config.defaultSearchEngine.keyword = shortycut.adjustCase(shortycut.config.defaultSearchEngine.keyword);
            shortycut.config.homepage.keywords = shortycut.config.homepage.keywords
                .filter(function (keyword) { return !!keyword; })
                .map(function (keyword) { return shortycut.adjustCase(keyword); });
        }
    }
    shortycut.applyAndValidateConfig = applyAndValidateConfig;
    function mergeConfig(target, patch, patchRoot) {
        var _loop_1 = function (key) {
            var targetValue = target[key];
            var patchValue = patch[key];
            [
                [
                    !target.hasOwnProperty(key),
                    'is not supported'
                ],
                [
                    isObject(targetValue) && !isObject(patchValue),
                    'must be a nested object'
                ],
                [
                    targetValue instanceof Array && (!patchValue || !(patchValue instanceof Array)),
                    'must be an array'
                ],
                [
                    'boolean' === typeof targetValue && 'boolean' != typeof patchValue,
                    'must be boolean (true or false)'
                ],
                [
                    isStringy(targetValue) && !isStringy(patchValue),
                    'must be a string'
                ],
            ].forEach(function (rule) { return throwConfigExceptionIf(!!rule[0], "Property " + key + " " + rule[1], [key], patchRoot); });
            if (patchValue && 'object' === typeof patchValue && !(patchValue instanceof Array)) {
                mergeConfig(targetValue, patchValue, patchRoot);
            }
            else {
                if ('string' === typeof patchValue) {
                    patchValue = patchValue.trim() || undefined;
                }
                if (null === patchValue) {
                    patchValue = undefined;
                }
                target[key] = 'string' === typeof patchValue ? patchValue.trim() : patchValue;
            }
        };
        for (var key in patch) {
            _loop_1(key);
        }
    }
    function validateConfig() {
        var onMultiLink = shortycut.config.shortcutFormat.url.multiLinkIndicator;
        [
            [
                shortycut.config.shortcutFormat.keyword.openingDelimiter && !shortycut.config.shortcutFormat.keyword.closingDelimiter,
                'When using an openingDelimiter, the closingDelimiter must be set as well',
                ['openingDelimiter', 'closingDelimiter']
            ],
            [
                !shortycut.config.shortcutFormat.keyword.openingDelimiter && shortycut.config.shortcutFormat.keyword.closingDelimiter,
                'The closingDelimiter can only be used if the openingDelimiter is set as well',
                ['openingDelimiter', 'closingDelimiter']
            ],
            [
                !shortycut.config.shortcutFormat.url.searchTermPlaceholder,
                'The searchTermPlaceholder must not be empty or null',
                ['searchTermPlaceholder']
            ],
            [
                !onMultiLink.default || !onMultiLink.default.match(/^(replacePreviousDefinition|openInNewTab|showMenu)$/),
                'default must be "replacePreviousDefinition", "openInNewTab" or "showMenu"',
                ['default']
            ],
            [
                shortycut.startsWith(onMultiLink.openInNewTab, onMultiLink.replacePrevious)
                    || shortycut.startsWith(onMultiLink.openInNewTab, onMultiLink.showMenu)
                    || shortycut.startsWith(onMultiLink.replacePrevious, onMultiLink.openInNewTab)
                    || shortycut.startsWith(onMultiLink.replacePrevious, onMultiLink.showMenu)
                    || shortycut.startsWith(onMultiLink.showMenu, onMultiLink.openInNewTab)
                    || shortycut.startsWith(onMultiLink.showMenu, onMultiLink.replacePrevious),
                'The symbols for replacePreviousDefinition, openInNewTab or showMenu must not be (partially) identical',
                ['openInNewTab', 'replacePreviousDefinition', 'showMenu']
            ],
            [
                shortycut.config.homepage.keywords.some(function (shortcut) { return !shortcut.trim(); }),
                'help must not contain empty strings (but the array can be empty)',
                ['homepageKeywords']
            ],
        ].forEach(function (value) { return throwConfigExceptionIf(!!value[0], value[1], value[2]); });
    }
    function isObject(value) {
        return null !== value && undefined !== value
            && 'object' === typeof value
            && !(value instanceof Array)
            && !(value instanceof Function)
            && !(value instanceof RegExp);
    }
    function isStringy(value) {
        return null === value || undefined === value || 'string' === typeof value;
    }
    function throwConfigExceptionIf(condition, description, properties, overrideConfig) {
        if (condition) {
            throwConfigException(description, properties, overrideConfig);
        }
    }
    function throwConfigException(description, properties, overrideConfig) {
        throw new shortycut.Exception('Configuration error', shortycut.create('p', "There's a problem with the configuration:"), shortycut.create('p.errorMessage', description), shortycut.create('p', overrideConfig
            ? 'The error occurred while applying the following configuration:'
            : 'The configuration (which might include non-overridden default settings) looks like this:'), shortycut.create('pre', renderJson(overrideConfig || shortycut.config, properties)));
    }
    function renderJson(config, properties) {
        replaceRegexpFunctionsAndUndefinedValues(config);
        var result = shortycut.sanitize(JSON.stringify(config, undefined, 4));
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var property = properties_1[_i];
            result = shortycut.replaceAll(result, "&quot;" + property + "&quot;", "&quot;<span class='jsonError'>" + property + "</span>&quot;", true);
        }
        return result;
    }
    function replaceRegexpFunctionsAndUndefinedValues(object) {
        for (var key in object) {
            if (object[key]) {
                if (object[key] instanceof RegExp) {
                    object[key] = "/" + object[key].source + "/";
                }
                else if ('function' === typeof object[key]) {
                    object[key] = object[key].toString();
                }
                else if ('object' === typeof object[key]) {
                    replaceRegexpFunctionsAndUndefinedValues(object[key]);
                }
            }
            else if (undefined === object[key]) {
                object[key] = null;
            }
        }
    }
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var DictionaryItem = (function () {
        function DictionaryItem(level, shortcuts) {
            this.level = level;
            this.shortcuts = shortcuts;
        }
        DictionaryItem.prototype.getSuggestions = function (keyword, maxResults, postKeywordInput) {
            var _a, _b;
            if (this.level === keyword.length) {
                return this.childSuggestions(maxResults, postKeywordInput);
            }
            else {
                var letter = keyword.charAt(this.level);
                return (_b = (_a = this.children[letter]) === null || _a === void 0 ? void 0 : _a.getSuggestions(keyword, maxResults, postKeywordInput)) !== null && _b !== void 0 ? _b : [];
            }
        };
        Object.defineProperty(DictionaryItem.prototype, "children", {
            get: function () {
                var _a;
                return this._children = (_a = this._children) !== null && _a !== void 0 ? _a : this.initializeChildren();
            },
            enumerable: false,
            configurable: true
        });
        DictionaryItem.prototype.initializeChildren = function () {
            var _this = this;
            var dictionary = {};
            this.shortcuts.forEach(function (shortcut) {
                if (_this.level < shortcut.keyword.length) {
                    var letter = shortcut.keyword ? shortcut.keyword.charAt(_this.level) : '';
                    if (dictionary[letter]) {
                        dictionary[letter].shortcuts.push(shortcut);
                    }
                    else {
                        dictionary[letter] = new DictionaryItem(_this.level + 1, [shortcut]);
                    }
                }
            });
            return dictionary;
        };
        DictionaryItem.prototype.childSuggestions = function (maxResults, postKeywordInput) {
            var _this = this;
            if (!this._suggestions) {
                var matches_1 = {};
                var count = 0;
                var maxLength_1 = postKeywordInput ? this.level : 999;
                var shortcuts_3 = this.shortcuts.filter(function (shortcut) {
                    return _this.level === shortcut.keyword.length && shortcut.keyword.length <= maxLength_1;
                });
                this.shortcuts
                    .filter(function (shortcut) { return _this.level < shortcut.keyword.length && shortcut.keyword.length <= maxLength_1; })
                    .forEach(function (shortcut) { return shortcuts_3.push(shortcut); });
                for (var _i = 0, shortcuts_2 = shortcuts_3; _i < shortcuts_2.length; _i++) {
                    var shortcut = shortcuts_2[_i];
                    var _loop_2 = function (match) {
                        var nonPartialMatch = Object.keys(matches_1)
                            .map(function (fingerprint) { return matches_1[fingerprint]; })
                            .filter(function (item) { return item.match.keyword === match.keyword; })[0];
                        if (nonPartialMatch) {
                            nonPartialMatch.match.hidesMoreChildren = true;
                            return "continue";
                        }
                        if (matches_1[match.fingerprint]) {
                            matches_1[match.fingerprint].shortcuts.push(shortcut);
                        }
                        else {
                            matches_1[match.fingerprint] = { match: match, shortcuts: [shortcut] };
                            count++;
                        }
                        if (maxResults <= count) {
                            return "break";
                        }
                    };
                    for (var _a = 0, _b = shortcut.getSegmentMatches(this.level); _a < _b.length; _a++) {
                        var match = _b[_a];
                        var state_1 = _loop_2(match);
                        if (state_1 === "break")
                            break;
                    }
                    if (maxResults <= count) {
                        break;
                    }
                }
                this._suggestions = Object.keys(matches_1)
                    .map(function (fingerprint) { return matches_1[fingerprint]; })
                    .map(function (match) { return _this.createChildSuggestion(match.match, match.shortcuts); });
            }
            return this._suggestions;
        };
        DictionaryItem.prototype.createChildSuggestion = function (match, shortcuts) {
            var keyword = "" + match.keyword + (match.isPartial ? '...' : '');
            var keywordHtml = shortycut.create('div', shortycut.create('span.matched', keyword.substr(0, this.level)), shortycut.create('span.unmatched', keyword.substr(this.level))).innerHTML;
            return {
                type: this.level === match.keyword.length ? 'match' : (match.isPartial ? 'segment' : 'suggestion'),
                keyword: match.keyword,
                keywordHtml: keywordHtml,
                descriptionHtml: match.descriptionHtml,
                shortcutType: this.getShortcutType(shortcuts),
                shortcut: shortcuts[0],
                hidesMoreChildren: match.hidesMoreChildren
            };
        };
        DictionaryItem.prototype.getShortcutType = function (shortcuts) {
            if (shortcuts.some(function (shortcut) { return 'both' === shortcut.type; })) {
                return 'both';
            }
            else if (shortcuts.some(function (shortcut) { return 'bookmark' === shortcut.type; })) {
                if (shortcuts.some(function (shortcut) { return 'query' === shortcut.type; })) {
                    return 'both';
                }
                else {
                    return 'bookmark';
                }
            }
            else {
                return 'query';
            }
        };
        return DictionaryItem;
    }());
    var Filter = (function () {
        function Filter(maxResults) {
            this.maxResults = maxResults;
        }
        Filter.prototype.keywordSearch = function (keyword, postKeywordInput) {
            return this.dictionary.getSuggestions(keyword, this.maxResults, postKeywordInput);
        };
        Filter.prototype.fullTextSearch = function (searchTerms) {
            var result = new Array();
            for (var _i = 0, _a = this.allLinks; _i < _a.length; _i++) {
                var item = _a[_i];
                if (this.maxResults <= result.length) {
                    return result;
                }
                this.createSuggestion(searchTerms, item, result);
            }
            if (this.maxResults < result.length) {
                result.length = this.maxResults;
            }
            return result;
        };
        Filter.prototype.createSuggestion = function (searchTerms, searchableLink, result) {
            var keywordMask = searchableLink.keyword.split('').map(function () { return false; });
            var descriptionMask = searchableLink.description.split('').map(function () { return false; });
            for (var _i = 0, searchTerms_1 = searchTerms; _i < searchTerms_1.length; _i++) {
                var searchTerm = searchTerms_1[_i];
                var matched = this.markMatch(searchTerm, searchableLink.keywordLowerCase, keywordMask);
                matched = this.markMatch(searchTerm, searchableLink.descriptionLowerCase, descriptionMask) || matched;
                if (!matched) {
                    return;
                }
            }
            result.push({
                type: 'search-result',
                keyword: searchableLink.keyword,
                keywordHtml: this.highlightMatch(searchableLink.keyword, keywordMask),
                descriptionHtml: this.highlightMatch(searchableLink.description, descriptionMask),
                shortcutType: searchableLink.link.type,
                shortcut: searchableLink.shortcut,
                link: searchableLink.link,
                hidesMoreChildren: false
            });
        };
        Filter.prototype.markMatch = function (searchTerm, text, mask) {
            var matched = false;
            var index = -1;
            while (0 <= (index = text.indexOf(searchTerm, index + 1))) {
                for (var position = index; position < index + searchTerm.length; position++) {
                    mask[position] = true;
                }
                matched = true;
            }
            return matched;
        };
        Filter.prototype.highlightMatch = function (text, mask) {
            var result = new Array();
            for (var start = 0; start < mask.length; start++) {
                var end = start + 1;
                for (; end < mask.length && mask[end - 1] === mask[end]; end++) { }
                var section = shortycut.sanitize(text.substring(start, end));
                if (mask[start]) {
                    section = "<span class='matched-substring'>" + section + "</span>";
                }
                result.push(section);
                start = end - 1;
            }
            return shortycut.replaceAll(result.join(''), shortycut.Segments.SEPARATOR_PLACEHOLDER, shortycut.Segments.SEPARATOR_HTML, false);
        };
        Object.defineProperty(Filter.prototype, "dictionary", {
            get: function () {
                var _a;
                return (Filter._dictionary = (_a = Filter._dictionary) !== null && _a !== void 0 ? _a : Filter.initializeDictionary());
            },
            enumerable: false,
            configurable: true
        });
        Filter.initializeDictionary = function () {
            return new DictionaryItem(0, Object.keys(shortycut.shortcuts).map(function (keyword) { return shortycut.shortcuts[keyword]; }).sort(shortycut.comparing(function (s) { var _a, _b; return ((_b = (_a = s.bookmarks) === null || _a === void 0 ? void 0 : _a.current) !== null && _b !== void 0 ? _b : s.queries.current)[0].segments.description; })));
        };
        Object.defineProperty(Filter.prototype, "allLinks", {
            get: function () {
                var _a;
                return (Filter._allLinks = (_a = Filter._allLinks) !== null && _a !== void 0 ? _a : Filter.initializeLinks());
            },
            enumerable: false,
            configurable: true
        });
        Filter.initializeLinks = function () {
            var _this = this;
            var result = new Array();
            for (var _i = 0, _a = Object.keys(shortycut.shortcuts); _i < _a.length; _i++) {
                var keyword = _a[_i];
                var shortcut = shortycut.shortcuts[keyword];
                result.push.apply(result, shortcut.all.filter(function (item) { return _this.includeOverriddenShortcuts || !item.link.overridden; }));
            }
            return result.sort(shortycut.comparing((function (item) { return item.link.segments.description; }))).map(function (item) { return ({
                link: item.link,
                links: item.links,
                keyword: item.link.keyword,
                keywordLowerCase: item.link.keyword.toLocaleLowerCase(),
                description: item.link.segments.descriptionPlaceholder,
                descriptionLowerCase: item.link.segments.descriptionPlaceholder.toLowerCase(),
                shortcut: shortycut.shortcuts[item.link.keyword]
            }); });
        };
        Filter.includeOverriddenShortcuts = false;
        return Filter;
    }());
    shortycut.Filter = Filter;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var ParserContext = (function () {
        function ParserContext() {
            this.line = '';
            this.description = '';
            this.urlOrDynamicLink = '';
            this.isStandardProtocol = false;
            this.onMultiLink = shortycut.OnMultiLink.OPEN_IN_NEW_TAB;
            this.combination = new Array();
        }
        return ParserContext;
    }());
    var ShortcutParser = (function () {
        function ShortcutParser() {
            this.KNOWN_PROTOCOLS = ['file', 'ftp', 'http', 'https', shortycut.dynamicLinkProtocol];
            this.KNOWN_PROTOCOLS_REGEXP = new RegExp("(" + this.KNOWN_PROTOCOLS.join('|') + ")://.*$", 'i');
        }
        ShortcutParser.prototype.parseLines = function (lines, startIndex, endIndex, shortcuts) {
            var _a;
            var context = new ParserContext();
            for (var index = startIndex; index < endIndex; index++) {
                context.line = (_a = lines[index]) === null || _a === void 0 ? void 0 : _a.trim();
                if (context.line && (!shortycut.startsWith(context.line, shortycut.config.shortcutFormat.comment))) {
                    try {
                        this.parseLineAndStoreShortcut(context, shortcuts);
                    }
                    catch (exception) {
                        if (exception instanceof shortycut.ParserError) {
                            shortycut.startupCache.initializationErrors.push(exception);
                        }
                        else {
                            throw exception;
                        }
                    }
                }
            }
            if ('defaultsearchengine' === shortycut.config.defaultSearchEngine.keyword) {
                delete shortcuts[shortycut.config.defaultSearchEngine.keyword];
            }
            if (!shortycut.defaultSearchEngine) {
                shortycut.defaultSearchEngine = new shortycut.Shortcut('config.defaultSearchEngine.keyword', [], shortycut.OnMultiLink.SHOW_MENU, 'https://duckduckgo.com/?q='
                    + shortycut.config.shortcutFormat.url.searchTermPlaceholder
                    + '&kah=us-en%2Chk-tzh&kav=1&kam=google-maps&kak=-1&kax=-1&kaq=-1&kap=-1&kao=-1&kau=-1', undefined);
            }
        };
        ShortcutParser.prototype.parseLineAndStoreShortcut = function (context, shortcuts) {
            this.splitDescriptionAndUrl(context);
            this.parseOnMultiLink(context);
            this.parsePostFields(context);
            var keywords = this.formKeywords(context, this.parseKeywordsAndDescription(context));
            var hasKeywords = false;
            for (var _i = 0, _a = Object.keys(keywords); _i < _a.length; _i++) {
                var keyword = _a[_i];
                if (keyword) {
                    var sections = keywords[keyword];
                    if (shortcuts[keyword]) {
                        shortcuts[keyword].addLink(keyword, sections, context.onMultiLink, context.urlOrDynamicLink, context.postFields);
                    }
                    else {
                        shortcuts[keyword] = new shortycut.Shortcut(keyword, sections, context.onMultiLink, context.urlOrDynamicLink, context.postFields);
                    }
                    if (keyword === shortycut.config.defaultSearchEngine.keyword) {
                        shortycut.defaultSearchEngine = shortcuts[keyword];
                    }
                    hasKeywords = true;
                }
            }
            if (!hasKeywords) {
                throw new shortycut.ParserError('Failed to retrieve the keyword', context.line);
            }
            return shortcuts;
        };
        ShortcutParser.prototype.splitDescriptionAndUrl = function (context) {
            var url = context.line.match(this.KNOWN_PROTOCOLS_REGEXP);
            context.isStandardProtocol = !!url;
            url = url || context.line.match(/[a-z]+:\/\/.*$/i);
            if (!url) {
                throw new shortycut.ParserError('Unable to retrieve the link (make sure it starts with a protocol like https://)', context.line);
            }
            context.urlOrDynamicLink = url[0].trim();
            context.description = context.line.substr(0, context.line.length - url[0].length);
            if (0 === context.urlOrDynamicLink.indexOf(shortycut.dynamicLinkProtocol)) {
                context.urlOrDynamicLink = shortycut.startupCache.dynamicLinks[context.urlOrDynamicLink];
                if (!context.urlOrDynamicLink) {
                    throw new shortycut.ParserError('The dynamic link created via shortycut.toUrl() must be at the end of the line', context.line);
                }
            }
        };
        ShortcutParser.prototype.parseOnMultiLink = function (context) {
            var multiLinkIndicator = shortycut.config.shortcutFormat.url.multiLinkIndicator;
            for (var pass = 0; pass < 2; pass++) {
                for (var _i = 0, _a = shortycut.OnMultiLink.values; _i < _a.length; _i++) {
                    var onMultiLink = _a[_i];
                    var symbol = multiLinkIndicator[onMultiLink.key];
                    if (!pass && context.isStandardProtocol
                        && 'string' === typeof context.urlOrDynamicLink
                        && shortycut.startsWith(context.urlOrDynamicLink, symbol)) {
                        context.onMultiLink = onMultiLink;
                        context.urlOrDynamicLink = context.urlOrDynamicLink.substr(symbol.length).trim();
                        return;
                    }
                    else if (pass && shortycut.endsWith(context.description, symbol)) {
                        context.description = context.description.substr(0, context.description.length - symbol.length).trim();
                        context.onMultiLink = onMultiLink;
                        return;
                    }
                }
            }
            context.onMultiLink = shortycut.OnMultiLink.getDefault();
        };
        ShortcutParser.prototype.parsePostFields = function (context) {
            context.postFields = undefined;
            if ('string' === typeof context.urlOrDynamicLink) {
                var separator = shortycut.config.shortcutFormat.url.postIndicator;
                var index = separator ? shortycut.adjustCase(context.urlOrDynamicLink).indexOf(separator) : -1;
                if (separator && 0 <= index) {
                    context.postFields = context.urlOrDynamicLink.substr(index + separator.length);
                    context.urlOrDynamicLink = context.urlOrDynamicLink.substr(0, index);
                }
            }
        };
        ShortcutParser.prototype.parseKeywordsAndDescription = function (context) {
            context.description = context.description.replace(/\s+/, ' ');
            if (shortycut.startsWith(context.description, shortycut.config.shortcutFormat.keyword.openingDelimiter)) {
                return this.parseSegments(context, context.description);
            }
            else {
                var index = context.description.search(/(\s|$)/);
                return [{
                        keywords: this.splitKeywords(context, context.description.substr(0, index)),
                        description: context.description.substr(index).trim()
                    }];
            }
        };
        ShortcutParser.prototype.parseSegments = function (context, description) {
            var splitResult = this.splitNextSegment(context, description);
            var segments = [(splitResult === null || splitResult === void 0 ? void 0 : splitResult.nextSegment) || { keywords: [], description: description }];
            while (shortycut.config.shortcutFormat.enableGrouping && splitResult.nextSegment) {
                splitResult = this.splitNextSegment(context, splitResult.nextSegment.description);
                if (splitResult.nextSegment) {
                    segments[segments.length - 1].description = splitResult.description;
                    segments.push(splitResult.nextSegment);
                }
            }
            return segments;
        };
        ShortcutParser.prototype.splitNextSegment = function (context, description) {
            var openingDelimiter = shortycut.config.shortcutFormat.keyword.openingDelimiter;
            var closingDelimiter = shortycut.config.shortcutFormat.keyword.closingDelimiter;
            var startIndex = description.indexOf(openingDelimiter);
            if (0 <= startIndex) {
                var nextSegment = description.substr(startIndex + openingDelimiter.length);
                var endIndex = nextSegment.indexOf(closingDelimiter);
                if (endIndex < 0) {
                    throw new shortycut.ParserError("Missing " + closingDelimiter + " after " + openingDelimiter, context.line);
                }
                return {
                    description: description.substring(0, startIndex),
                    nextSegment: {
                        keywords: this.splitKeywords(context, nextSegment.substr(0, endIndex)),
                        description: nextSegment.substr(endIndex + closingDelimiter.length).trim()
                    }
                };
            }
            return { description: description };
        };
        ShortcutParser.prototype.splitKeywords = function (context, keywords) {
            var result = new Array();
            for (var _i = 0, _a = keywords.split(shortycut.config.shortcutFormat.keyword.separator || /\s+/); _i < _a.length; _i++) {
                var keyword = _a[_i];
                keyword = keyword.trim();
                if (keyword) {
                    if (keyword.match(/\s/)) {
                        throw new shortycut.ParserError("The keyword \"" + keyword + "\" contains whitespace", context.line);
                    }
                    else {
                        result.push(shortycut.adjustCase(keyword));
                    }
                }
            }
            return result;
        };
        ShortcutParser.prototype.formKeywords = function (context, segments) {
            var _a;
            var result = {};
            var hasMoreCombinations = true;
            var keyword = new Array();
            for (var index = 0; index < segments.length; index++) {
                context.combination[index] = 0;
            }
            while (hasMoreCombinations) {
                var array = new Array();
                for (var index = 0; index < segments.length; index++) {
                    keyword[index] = (_a = segments[index].keywords[context.combination[index]]) !== null && _a !== void 0 ? _a : '';
                    array.push(this.createSegment(keyword[index], segments[index].description));
                }
                result[keyword.join('')] = array;
                hasMoreCombinations = false;
                for (var index = segments.length - 1; 0 <= index; index--) {
                    if (context.combination[index] + 1 < segments[index].keywords.length) {
                        context.combination[index]++;
                        hasMoreCombinations = true;
                        break;
                    }
                    else {
                        context.combination[index] = 0;
                    }
                }
            }
            ;
            return result;
        };
        ShortcutParser.prototype.createSegment = function (keyword, description) {
            var marker = shortycut.config.shortcutFormat.hotkeyMarker;
            if (marker) {
                var sections = shortycut.replaceAll(description, "" + marker + marker, '\n', true)
                    .split(marker)
                    .map(function (item) { return shortycut.replaceAll(item, '\n', "" + marker + marker, true); });
                for (var index = 1; index < sections.length; index++) {
                    var keywordChar = shortycut.adjustCase(keyword.charAt(index - 1));
                    var sectionChar = shortycut.adjustCase(sections[index].charAt(0));
                    if (keywordChar !== sectionChar) {
                        sections[index - 1] += sections[index];
                        sections.splice(index, 1);
                        index--;
                    }
                }
                return new shortycut.Segment(keyword, keyword.length + 1 === sections.length ? sections : [sections.join('')]);
            }
            return new shortycut.Segment(keyword, [description]);
        };
        return ShortcutParser;
    }());
    shortycut.ShortcutParser = ShortcutParser;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var QueryParameters = (function () {
        function QueryParameters() {
            var _this = this;
            this.facets = {
                newTabs: false,
                noFocus: false
            };
            this.queryParameters = this.getQueryParameters();
            this.fullQuery = (this.queryParameters[QueryParameters.QUERY] || '').replace(/\+/g, ' ');
            this.keyword = shortycut.adjustCase(this.fullQuery).replace(/\s.*$/, '');
            this.searchTerm = this.fullQuery.replace(/^[^\s]+\s*/, '');
            this.index = (this.queryParameters[QueryParameters.INDEX] || '').match(/^[0-9]+$/)
                ? parseInt(this.queryParameters[QueryParameters.INDEX])
                : undefined;
            this.setup = this.queryParameters[QueryParameters.SETUP];
            (this.queryParameters[QueryParameters.FACETS] || '')
                .split(',')
                .map(function (facet) { return facet.trim().toLowerCase(); })
                .filter(function (facet) { return facet; })
                .forEach(function (facet) { return _this.applyFacet(facet); });
        }
        QueryParameters.prototype.applyFacet = function (facet) {
            if ('new-tabs' === facet) {
                this.facets.newTabs = true;
            }
            else if ('no-focus' === facet) {
                this.facets.noFocus = true;
            }
            else {
                shortycut.startupCache.initializationErrors.push(new shortycut.InitializationError(shortycut.create('div', 'Facet ', shortycut.create('tt', facet), ' (in this page\'s address) is not supported')));
            }
        };
        QueryParameters.prototype.getQueryParameters = function () {
            var result = {};
            if (window.location.search) {
                for (var _i = 0, _a = window.location.search.trim().replace(/^\?/, '').trim().split('&'); _i < _a.length; _i++) {
                    var parameter = _a[_i];
                    var index = parameter.indexOf('=');
                    if (0 < index) {
                        var key = this.urlDecode(parameter.substr(0, index));
                        if (key) {
                            result[key] = this.urlDecode(parameter.substr(index + 1));
                        }
                    }
                    else {
                        result[this.urlDecode(parameter)] = '';
                    }
                }
            }
            return result;
        };
        QueryParameters.prototype.urlDecode = function (value) {
            try {
                return decodeURIComponent(value).trim();
            }
            catch (error) {
                throw new shortycut.Exception('URL syntax error', shortycut.create('p', 'A query parameter passed in the URL is not url-encoded:'), shortycut.create('p', value));
            }
        };
        QueryParameters.QUERY = 'q';
        QueryParameters.INDEX = 'i';
        QueryParameters.SETUP = 'setup';
        QueryParameters.FACETS = 'facets';
        return QueryParameters;
    }());
    shortycut.QueryParameters = QueryParameters;
})(shortycut || (shortycut = {}));
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var shortycut;
(function (shortycut) {
    var OnMultiLink = (function () {
        function OnMultiLink(key) {
            this.key = key;
            OnMultiLink.values.push(this);
            OnMultiLink.byName[this.key] = this;
        }
        OnMultiLink.getDefault = function () {
            return OnMultiLink.byName[shortycut.config.shortcutFormat.url.multiLinkIndicator.default] || OnMultiLink.SHOW_MENU;
        };
        OnMultiLink.values = new Array();
        OnMultiLink.byName = {};
        OnMultiLink.REPLACE_PREVIOUS = new OnMultiLink('replacePrevious');
        OnMultiLink.OPEN_IN_NEW_TAB = new OnMultiLink('openInNewTab');
        OnMultiLink.SHOW_MENU = new OnMultiLink('showMenu');
        return OnMultiLink;
    }());
    shortycut.OnMultiLink = OnMultiLink;
    var Link = (function () {
        function Link(keyword, index, segments, onMultiLink, urlOrDynamicLink, _postFields) {
            var _a;
            this.keyword = keyword;
            this.index = index;
            this.segments = segments;
            this.onMultiLink = onMultiLink;
            this.urlOrDynamicLink = urlOrDynamicLink;
            this._postFields = _postFields;
            this._overridden = false;
            this.searchTerm = '';
            if ('string' !== typeof this.urlOrDynamicLink
                || 0 <= shortycut.adjustCase(this.urlOrDynamicLink).indexOf(shortycut.config.shortcutFormat.url.searchTermPlaceholder)
                || 0 <= shortycut.adjustCase((_a = this._postFields) !== null && _a !== void 0 ? _a : '').indexOf(shortycut.config.shortcutFormat.url.searchTermPlaceholder)) {
                this.type = 'query';
            }
            else {
                this.type = 'bookmark';
            }
        }
        Object.defineProperty(Link.prototype, "url", {
            get: function () {
                return shortycut.replaceAll('string' === typeof this.urlOrDynamicLink
                    ? this.urlOrDynamicLink
                    : this.urlOrDynamicLink.generator(this.searchTerm), shortycut.config.shortcutFormat.url.searchTermPlaceholder, encodeURIComponent(this.searchTerm || ''), shortycut.config.shortcutFormat.keyword.caseSensitive);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Link.prototype, "urlForFavicon", {
            get: function () {
                return 'string' === typeof (this.urlOrDynamicLink)
                    ? this.urlOrDynamicLink
                    : this.urlOrDynamicLink.urlForFavicon;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Link.prototype, "overridden", {
            get: function () {
                return this._overridden;
            },
            enumerable: false,
            configurable: true
        });
        Link.prototype.markAsOverridden = function () {
            this._overridden = true;
        };
        Object.defineProperty(Link.prototype, "filterSummary", {
            get: function () {
                if (!this._filterSummary) {
                    this._filterSummary = (this.keyword + " " + this.segments.description).toLocaleLowerCase().replace(/\s/g, '');
                }
                return this._filterSummary;
            },
            enumerable: false,
            configurable: true
        });
        Link.prototype.replacePlaceholder = function (searchTerm) {
            this.searchTerm = searchTerm;
        };
        Link.prototype.getHref = function (searchTerm) {
            if (this._postFields) {
                var query = (this.keyword + " " + decodeURIComponent(searchTerm)).trim();
                return window.location.href.replace(/[#?].*/g, '')
                    + ("?" + shortycut.QueryParameters.QUERY + "=" + query)
                    + ("&" + shortycut.QueryParameters.INDEX + "=" + this.index);
            }
            else {
                return this.url;
            }
        };
        Object.defineProperty(Link.prototype, "postFields", {
            get: function () {
                if (this._postFields) {
                    return shortycut.replaceAll(this._postFields, shortycut.config.shortcutFormat.url.searchTermPlaceholder, encodeURIComponent(this.searchTerm), shortycut.config.shortcutFormat.keyword.caseSensitive)
                        .split('&')
                        .filter(function (parameter) { return parameter; })
                        .map(function (parameter) {
                        var index = parameter.indexOf('=');
                        if (index < 1) {
                            throw new shortycut.Exception('Shortcut definition error', "Post parameter " + shortycut.sanitize(parameter) + " is not in key=value format");
                        }
                        try {
                            return {
                                key: decodeURIComponent(parameter.substr(0, index)),
                                value: decodeURIComponent(parameter.substr(index + 1))
                            };
                        }
                        catch (exception) {
                            throw new shortycut.Exception('Shortcut definition error', "Post parameter " + shortycut.sanitize(parameter) + " is not URL encoded");
                        }
                    });
                }
                else {
                    return undefined;
                }
            },
            enumerable: false,
            configurable: true
        });
        return Link;
    }());
    shortycut.Link = Link;
    var Links = (function () {
        function Links(link) {
            this.overridden = new Array();
            this.current = new Array();
            this.current.push(link);
        }
        Links.prototype.addLink = function (link) {
            var _a;
            if (this.current.length && link.onMultiLink === OnMultiLink.REPLACE_PREVIOUS) {
                this.current.forEach(function (link) { return link.markAsOverridden(); });
                (_a = this.overridden).push.apply(_a, this.current);
                this.current.length = 0;
            }
            this.current.push(link);
        };
        Object.defineProperty(Links.prototype, "onMultiLink", {
            get: function () {
                return this.current[this.current.length - 1].onMultiLink;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Links.prototype, "type", {
            get: function () {
                return this.current[0].type;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Links.prototype, "filterSummary", {
            get: function () {
                if (!this._filterSummary) {
                    this._filterSummary = this.current.map(function (link) { return link.filterSummary; }).join(' ');
                }
                return this._filterSummary;
            },
            enumerable: false,
            configurable: true
        });
        Links.prototype.replacePlaceholders = function (searchTerm) {
            [this.overridden, this.current].forEach(function (array) { return array.forEach(function (link) { return link.replacePlaceholder(searchTerm); }); });
        };
        Object.defineProperty(Links.prototype, "descriptionHtml", {
            get: function () {
                var _a;
                return this._descriptionHtml = (_a = this._descriptionHtml) !== null && _a !== void 0 ? _a : this.calculateDescriptionHtml();
            },
            enumerable: false,
            configurable: true
        });
        Links.prototype.calculateDescriptionHtml = function () {
            if (1 === this.current.length) {
                return this.current[0].segments.descriptionHtml;
            }
            else {
                var length_1 = 0;
                do {
                    var matches = true;
                    for (var index = 1; index < this.current.length && matches; index++) {
                        var current = this.current[index].segments.segments;
                        var previous = this.current[index - 1].segments.segments;
                        matches = length_1 <= Math.min(current.length, previous.length) &&
                            length_1 < current.length && current[length_1].description === previous[length_1].description;
                    }
                    if (!matches) {
                        break;
                    }
                } while (++length_1);
                if (length_1 < 0) {
                    return this.current[0].segments.descriptionHtml;
                }
                else {
                    return this.current[0].segments.segments
                        .slice(0, length_1).map(function (segment) { return shortycut.sanitize(segment.description); })
                        .join(Segments.SEPARATOR_HTML);
                }
            }
        };
        return Links;
    }());
    shortycut.Links = Links;
    var Segment = (function () {
        function Segment(keyword, sections) {
            this.keyword = keyword;
            this.sections = sections;
        }
        ;
        Object.defineProperty(Segment.prototype, "description", {
            get: function () {
                return this.sections.join('');
            },
            enumerable: false,
            configurable: true
        });
        return Segment;
    }());
    shortycut.Segment = Segment;
    var Segments = (function () {
        function Segments(segments) {
            this.segments = segments;
        }
        Segments.prototype.getMatch = function (length) {
            return new MatchingSegment(this.segments, length);
        };
        Object.defineProperty(Segments.prototype, "descriptionHtml", {
            get: function () {
                var _a;
                return this._descriptionHtml = (_a = this._descriptionHtml) !== null && _a !== void 0 ? _a : this.segments.map(function (segment) { return shortycut.sanitize(segment.description); }).join(Segments.SEPARATOR_HTML);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Segments.prototype, "description", {
            get: function () {
                var _a;
                return this._description = (_a = this._description) !== null && _a !== void 0 ? _a : this.segments.map(function (segment) { return segment.description; }).join(Segments.SEPARATOR_TEXT);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Segments.prototype, "descriptionPlaceholder", {
            get: function () {
                var _a;
                return this._descriptionPlaceholder = (_a = this._descriptionPlaceholder) !== null && _a !== void 0 ? _a : this.segments.map(function (segment) { return segment.description; }).join(Segments.SEPARATOR_PLACEHOLDER);
            },
            enumerable: false,
            configurable: true
        });
        Segments.SEPARATOR_TEXT = ' » ';
        Segments.SEPARATOR_HTML = ' &raquo; ';
        Segments.SEPARATOR_PLACEHOLDER = '\n';
        return Segments;
    }());
    shortycut.Segments = Segments;
    var MatchingSegment = (function () {
        function MatchingSegment(segments, length) {
            this.fingerprint = '';
            this.keyword = '';
            this.descriptionHtml = '';
            this.hidesMoreChildren = false;
            this.isPartial = false;
            var lengthOffset = 0;
            var segmentsToDisplay = this.countSegmentsToDisplay(segments);
            for (var index = 0; index < segments.length; index++) {
                var segment = segments[index];
                if (this.keyword.length <= length || 0 === segment.keyword.length) {
                    this.keyword += segment.keyword;
                    if (segment.description && index < segmentsToDisplay) {
                        var description = this.getDescription(segment.sections, length - lengthOffset, lengthOffset, length);
                        this.descriptionHtml += "" + (this.descriptionHtml ? Segments.SEPARATOR_HTML : '') + description;
                    }
                    this.fingerprint +=
                        (shortycut.config.shortcutFormat.keyword.openingDelimiter || '[') +
                            segment.keyword +
                            (shortycut.config.shortcutFormat.keyword.closingDelimiter || ']');
                    if (index + 1 !== segments.length) {
                        this.fingerprint += segment.description.trim().toLocaleLowerCase();
                    }
                    lengthOffset += segment.keyword.length;
                }
                else {
                    this.isPartial = true;
                    break;
                }
            }
        }
        MatchingSegment.prototype.countSegmentsToDisplay = function (segments) {
            var segmentsToDisplay = segments.length;
            for (; 0 < segmentsToDisplay && !segments[segmentsToDisplay - 1].keyword; segmentsToDisplay--)
                ;
            return Math.max(0, segmentsToDisplay);
        };
        MatchingSegment.prototype.getDescription = function (sections, hotkeysMatched, lengthOffset, length) {
            if (!shortycut.config.homepage.suggestions.showHotkeys) {
                return shortycut.sanitize(sections.join(''));
            }
            else if (1 === sections.length) {
                return this.autoDetectHotkeys(sections[0], this.keyword.substr(lengthOffset), length - lengthOffset);
            }
            else {
                var result = shortycut.sanitize(sections[0]);
                for (var index = 1; index < sections.length; index++) {
                    if (hotkeysMatched < index) {
                        result += shortycut.create('span.hotkey', shortycut.sanitize(sections[index].charAt(0))).outerHTML;
                        result += shortycut.sanitize(sections[index].substr(1));
                    }
                    else {
                        result += shortycut.sanitize(sections[index]);
                    }
                }
                return result;
            }
        };
        MatchingSegment.prototype.autoDetectHotkeys = function (description, keyword, hotkeysMatched) {
            return shortycut.hotkeySelector.selectHotkeys(keyword, description, hotkeysMatched)
                .map(function (item) { return item.isHotkey ? shortycut.create('span.hotkey', item.text).outerHTML : shortycut.sanitize(item.text); })
                .join('');
        };
        return MatchingSegment;
    }());
    shortycut.MatchingSegment = MatchingSegment;
    var Shortcut = (function () {
        function Shortcut(keyword, segments, onMultiLink, urlOrDynamicLink, postParameters) {
            this.keyword = keyword;
            this.all = new Array();
            this.addLink(keyword, segments, onMultiLink, urlOrDynamicLink, postParameters);
        }
        Object.defineProperty(Shortcut.prototype, "bookmarks", {
            get: function () {
                return this._bookmarks;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Shortcut.prototype, "queries", {
            get: function () {
                return this._queries;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Shortcut.prototype, "type", {
            get: function () {
                return this._bookmarks ? (this._queries ? 'both' : 'bookmark') : 'query';
            },
            enumerable: false,
            configurable: true
        });
        Shortcut.prototype.addLink = function (keyword, segments, onMultiLink, urlOrDynamicLink, postParameters) {
            var link = new Link(keyword, this.all.length, new Segments(segments), onMultiLink, urlOrDynamicLink, postParameters);
            if ('query' === link.type) {
                this._queries = this.createOrAdd(link, this._queries);
            }
            else {
                this._bookmarks = this.createOrAdd(link, this._bookmarks);
            }
        };
        Shortcut.prototype.createOrAdd = function (link, links) {
            if (links) {
                links.addLink(link);
            }
            else {
                links = new Links(link);
            }
            this.all[link.index] = { link: link, links: links };
            return links;
        };
        Shortcut.prototype.replacePlaceholders = function (searchTerm) {
            var _a;
            (_a = this._queries) === null || _a === void 0 ? void 0 : _a.replacePlaceholders(searchTerm);
        };
        Shortcut.prototype.getSegmentMatches = function (length) {
            var _a, _b, _c;
            var result = {};
            for (var _i = 0, _d = __spreadArrays((((_a = this._bookmarks) === null || _a === void 0 ? void 0 : _a.current) || []), ((_b = this.queries) === null || _b === void 0 ? void 0 : _b.current) || []); _i < _d.length; _i++) {
                var link = _d[_i];
                var match = link.segments.getMatch(length);
                result[match.fingerprint] = (_c = result[match.fingerprint]) !== null && _c !== void 0 ? _c : match;
            }
            return Object.keys(result).map(function (fingerprint) { return result[fingerprint]; });
        };
        return Shortcut;
    }());
    shortycut.Shortcut = Shortcut;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    shortycut.config = null;
    shortycut.shortcuts = {};
    shortycut.defaultSearchEngine = null;
    shortycut.queryParameters = null;
    shortycut.redirector = null;
    shortycut.router = null;
    shortycut.faviconManager = null;
    shortycut.javaScriptLoader = null;
    shortycut.hotkeySelector = null;
    var Pages = (function () {
        function Pages() {
            this.pages = {
                browserIntegration: null,
                error: null,
                home: null,
                linkTools: null,
                faviconTools: null,
                redirect: null,
                setup: null,
                shortlist: null
            };
        }
        Pages.prototype.hideAllExcept = function (page) {
            var _this = this;
            Object.keys(this.pages).map(function (key) {
                var value = _this.pages[key];
                if (value && value !== page && 'object' === typeof value && 'function' === typeof value.hide) {
                    value.hide();
                }
            });
        };
        Object.defineProperty(Pages.prototype, "error", {
            get: function () {
                var _a;
                return this.pages.error = (_a = this.pages.error) !== null && _a !== void 0 ? _a : new shortycut.ErrorPage();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "browserIntegration", {
            get: function () {
                var _a;
                return this.pages.browserIntegration = (_a = this.pages.browserIntegration) !== null && _a !== void 0 ? _a : new shortycut.BrowserIntegration();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "home", {
            get: function () {
                var _a;
                return this.pages.home = (_a = this.pages.home) !== null && _a !== void 0 ? _a : new shortycut.HomePage();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "linkTools", {
            get: function () {
                var _a;
                return this.pages.linkTools = (_a = this.pages.linkTools) !== null && _a !== void 0 ? _a : new shortycut.LinkTools();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "faviconTools", {
            get: function () {
                var _a;
                return this.pages.faviconTools = (_a = this.pages.faviconTools) !== null && _a !== void 0 ? _a : new shortycut.FaviconToolsPage();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "redirect", {
            get: function () {
                var _a;
                return this.pages.redirect = (_a = this.pages.redirect) !== null && _a !== void 0 ? _a : new shortycut.RedirectPage();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "setup", {
            get: function () {
                var _a;
                return this.pages.setup = (_a = this.pages.setup) !== null && _a !== void 0 ? _a : new shortycut.SetupPage();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "shortlist", {
            get: function () {
                var _a;
                return this.pages.shortlist = (_a = this.pages.shortlist) !== null && _a !== void 0 ? _a : new shortycut.ShortlistPage();
            },
            enumerable: false,
            configurable: true
        });
        return Pages;
    }());
    shortycut.pages = new Pages();
    shortycut.dynamicLinkProtocol = 'function';
    shortycut.startupCache = {
        exceptions: new Array(),
        config: new Array(),
        shortcuts: new Array(),
        initializationErrors: new Array(),
        dynamicLinks: {}
    };
    function initializeVariables() {
        shortycut.config = shortycut.DEFAULT_CONFIG;
        shortycut.queryParameters = new shortycut.QueryParameters();
        shortycut.redirector = new shortycut.Redirector();
        shortycut.router = new shortycut.Router();
        shortycut.faviconManager = new shortycut.FaviconManager();
        shortycut.hotkeySelector = new shortycut.HotkeySelector();
    }
    shortycut.initializeVariables = initializeVariables;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var BrowserIntegration = (function () {
        function BrowserIntegration() {
            this.dom = {
                browserIntegration: document.querySelector('#browser-integration'),
                homepage: document.querySelector('#browser-integration .homepage'),
                facets: {
                    newTabs: document.querySelector('#browser-integration .new-tabs'),
                    noFocus: document.querySelector('#browser-integration .no-focus')
                },
                form: document.querySelector('#browser-integration .form'),
                keyword: document.querySelector('#browser-integration .keyword'),
                webServerRequired: document.querySelector('#browser-integration .web-server-required'),
                searchEngine: document.querySelector('#browser-integration .search-engine'),
                openSearch: document.querySelector('#browser-integration .open-search'),
                popUp: document.querySelector('#browser-integration .pop-up')
            };
            this.updateHomepageLink = this.updateHomepageLink.bind(this);
            this.dom.facets.newTabs.checked = shortycut.queryParameters.facets.newTabs;
            this.dom.facets.noFocus.checked = shortycut.queryParameters.facets.noFocus;
            this.updateHomepageLink();
            var baseUrl = window.location.href.replace(/[#?].*/, '');
            this.dom.form.action = baseUrl;
            this.dom.keyword.innerHTML = shortycut.sanitize(baseUrl) + "?q=%s";
            this.dom.keyword.href = baseUrl + "?q=%s";
            if (window.location.href.match(/^http.*/)) {
                this.dom.searchEngine.style.display = 'block';
            }
            else {
                this.dom.webServerRequired.style.display = 'block';
            }
            var baseFolder = window.location.href.replace(/[?#].*/, '').replace(/\/+([^\/]+\.[^\/]+)?$/, '');
            this.dom.openSearch.href = baseFolder + "/data/search.xml";
            this.dom.openSearch.innerHTML = shortycut.sanitize(baseFolder + "/data/search.xml");
            this.dom.popUp.addEventListener('click', function () {
                for (var index = 0; index < 2; index++) {
                    var popUp = window.open('');
                    if (popUp === null || popUp === void 0 ? void 0 : popUp.document) {
                        popUp.document.write([
                            'This window was opened by ShortyCut.',
                            'Pop-ups are not being blocked.',
                            'You can close this windows.'
                        ].join('<br>'));
                        popUp.document.title = 'ShortyCut Pop-Up Test';
                    }
                }
            });
        }
        BrowserIntegration.prototype.hasMenu = function () {
            return true;
        };
        BrowserIntegration.prototype.show = function () {
            this.dom.browserIntegration.style.display = 'flex';
            this.addEventHandlers();
        };
        BrowserIntegration.prototype.hide = function () {
            this.dom.browserIntegration.style.display = 'none';
            this.removeEventHandlers();
        };
        BrowserIntegration.prototype.addEventHandlers = function () {
            var _this = this;
            Object.keys(this.dom.facets)
                .map(function (key) { return _this.dom.facets[key]; })
                .forEach(function (checkbox) { return checkbox.addEventListener('click', _this.updateHomepageLink); });
        };
        BrowserIntegration.prototype.removeEventHandlers = function () {
            var _this = this;
            Object.keys(this.dom.facets)
                .map(function (key) { return _this.dom.facets[key]; })
                .forEach(function (checkbox) { return checkbox.removeEventListener('click', _this.updateHomepageLink); });
        };
        BrowserIntegration.prototype.updateHomepageLink = function () {
            var _this = this;
            var facets = Object.keys(this.dom.facets)
                .filter(function (facet) { return _this.dom.facets[facet].checked; })
                .map(function (facet) { return 'noFocus' === facet ? 'no-focus' : facet; })
                .map(function (facet) { return 'newTabs' === facet ? 'new-tabs' : facet; });
            var url = window.location.href.replace(/[#?].*/, '');
            if (facets.length) {
                url += "?facets=" + facets.join(',');
            }
            this.dom.homepage.innerHTML = shortycut.sanitize(url);
            this.dom.homepage.href = url;
        };
        return BrowserIntegration;
    }());
    shortycut.BrowserIntegration = BrowserIntegration;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var ErrorPage = (function () {
        function ErrorPage() {
            this.dom = {
                error: document.querySelector('#error'),
                title: document.querySelector('#error .title'),
                message: document.querySelector('#error .message')
            };
        }
        ErrorPage.prototype.populate = function (titleOrException) {
            var _this = this;
            var message = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                message[_i - 1] = arguments[_i];
            }
            if (titleOrException instanceof shortycut.Exception) {
                this.dom.title.innerHTML = titleOrException.title;
                message = titleOrException.content;
            }
            else if ('string' === typeof titleOrException) {
                this.dom.title.innerHTML = titleOrException;
            }
            message.forEach(function (item) {
                (Array.isArray(item) ? item : [item]).forEach(function (element) {
                    if ('object' === typeof element) {
                        _this.dom.message.appendChild(element);
                    }
                    else {
                        _this.dom.message.innerHTML += element;
                    }
                });
            });
            return this;
        };
        ErrorPage.prototype.hasMenu = function () {
            return false;
        };
        ErrorPage.prototype.show = function () {
            this.dom.error.style.display = 'flex';
        };
        ErrorPage.prototype.hide = function () {
            this.dom.error.style.display = 'none';
        };
        return ErrorPage;
    }());
    shortycut.ErrorPage = ErrorPage;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var ObservableImage = (function () {
        function ObservableImage(url) {
            var _this = this;
            this.status = 'loading';
            this.element = shortycut.createImage(url, function (element) {
                element.addEventListener('load', function () { return _this.status = 'completed'; });
                element.addEventListener('error', function () { return _this.status = 'failed'; });
            });
        }
        ObservableImage.prototype.onLoadCompleted = function (action) {
            if ('completed' === this.status) {
                action();
            }
            else if ('loading' === this.status) {
                this.element.addEventListener('load', action);
            }
        };
        ObservableImage.prototype.onLoadFailed = function (action) {
            if ('failed' === this.status) {
                action();
            }
            else if ('loading' === this.status) {
                this.element.addEventListener('error', action);
            }
        };
        return ObservableImage;
    }());
    var FaviconDiscoveryJob = (function () {
        function FaviconDiscoveryJob(protocol, domain) {
            var _a;
            this.protocol = protocol;
            this.FOLDERS = (_a = shortycut.config.homepage.suggestions.faviconFolders) !== null && _a !== void 0 ? _a : [];
            this.domains = new Array();
            this.folder = 0;
            this.extension = 0;
            this.domains.push(domain);
            if (this.isLocal && domain.match(/^www\..*\..*/)) {
                this.domains.push(domain.replace(/^www\./, ''));
            }
        }
        Object.defineProperty(FaviconDiscoveryJob.prototype, "isLocal", {
            get: function () {
                return this.folder < this.FOLDERS.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FaviconDiscoveryJob.prototype, "currentDomain", {
            get: function () {
                return this.domains[this.isLocal ? 0 : this.domains.length - 1];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FaviconDiscoveryJob.prototype, "currentUrl", {
            get: function () {
                var domain = this.domains[this.domains.length - 1];
                var ext = FaviconDiscoveryJob.EXTENSIONS[this.extension];
                if (this.isLocal) {
                    return this.FOLDERS[this.folder] + "/" + domain.replace(/:/g, '!') + "." + ext;
                }
                else {
                    return this.protocol + "://" + domain + "/favicon." + ext;
                }
            },
            enumerable: false,
            configurable: true
        });
        FaviconDiscoveryJob.prototype.switchToNextUrl = function () {
            if (this.isLocal) {
                if (FaviconDiscoveryJob.EXTENSIONS.length <= ++this.extension) {
                    this.extension = 0;
                    if (this.FOLDERS.length <= ++this.folder) {
                        if (this.domains[this.domains.length - 1].match(/^[^.]+\.[^.]/)) {
                            this.folder = 0;
                            this.domains.push(this.domains[this.domains.length - 1].replace(/^[^.]+\./, ''));
                        }
                        else {
                            this.domains.length = 1;
                        }
                    }
                }
                return true;
            }
            else {
                if (this.domains[0].match(/.*\.[0-9]+$/)) {
                    return false;
                }
                this.domains.push(this.domains[this.domains.length - 1].replace(/^[^.]+\./, ''));
                return this.domains[this.domains.length - 2] !== this.domains[this.domains.length - 1];
            }
        };
        FaviconDiscoveryJob.EXTENSIONS = ['ico', 'png', 'jpg', 'svg', 'jpeg'];
        return FaviconDiscoveryJob;
    }());
    var FaviconManager = (function () {
        function FaviconManager() {
            this.images = {};
            this.onLoadComplete = this.onLoadComplete.bind(this);
            this.onLoadFailed = this.onLoadFailed.bind(this);
            this.cache = this.loadCache();
        }
        FaviconManager.prototype.createFavicon = function (url) {
            var _this = this;
            var _a;
            var _b = FaviconManager.extractProtocolAndDomain(url), protocol = _b.protocol, domain = _b.domain;
            var image = (_a = this.cache['file' === protocol ? '' : domain]) === null || _a === void 0 ? void 0 : _a.url;
            if (image) {
                var div = shortycut.create('div.favicon', shortycut.createImage(image, function (element) {
                    if ('file' !== protocol) {
                        element.addEventListener('error', function () { return _this.removeFaviconFromCache(image); });
                    }
                }));
                div.dataset['domain'] = domain;
                return div;
            }
            else {
                this.runJob(new FaviconDiscoveryJob(protocol, domain));
                var div = shortycut.create('div.favicon');
                div.dataset['domain'] = domain;
                return div;
            }
        };
        FaviconManager.extractProtocolAndDomain = function (url) {
            return {
                protocol: url.match(/^([a-z]+:\/\/)?/i)[0].replace(/:.*/, '').toLocaleLowerCase() || 'http',
                domain: url.toLocaleLowerCase().replace(/^([a-z]+:\/\/+)?/i, '').replace(/\/.*/, '').toLowerCase()
            };
        };
        FaviconManager.prototype.getFavicon = function (domain) {
            return this.cache[domain];
        };
        FaviconManager.prototype.runJob = function (job) {
            var _this = this;
            var _a;
            var url = job.currentUrl;
            var image = this.images[url] = (_a = this.images[url]) !== null && _a !== void 0 ? _a : new ObservableImage(url);
            image.onLoadCompleted(function () { return _this.onLoadComplete(job, image.element); });
            image.onLoadFailed(function () { return _this.onLoadFailed(job); });
        };
        FaviconManager.prototype.onLoadComplete = function (job, image) {
            var _a;
            for (var _i = 0, _b = job.domains; _i < _b.length; _i++) {
                var domain = _b[_i];
                this.cache[domain] = {
                    domain: domain,
                    url: job.currentUrl,
                    isStoredLocally: job.isLocal,
                    effectiveDomain: job.domains[job.domains.length - 1]
                };
                var elements = document.querySelectorAll('div.favicon');
                for (var index = 0; index < elements.length; index++) {
                    var div = elements[index];
                    if (((_a = div.attributes.getNamedItem('data-domain')) === null || _a === void 0 ? void 0 : _a.value) === domain && !div.childElementCount) {
                        div.appendChild(image.cloneNode());
                    }
                }
            }
            this.saveCache();
        };
        FaviconManager.prototype.onLoadFailed = function (job) {
            if (job.switchToNextUrl()) {
                this.runJob(job);
            }
            else {
                for (var _i = 0, _a = job.domains; _i < _a.length; _i++) {
                    var domain = _a[_i];
                    this.cache[domain] = { domain: domain, isStoredLocally: false, effectiveDomain: domain };
                }
                this.saveCache();
            }
        };
        FaviconManager.prototype.saveCache = function () {
            window.localStorage.setItem('shortycut.favicon-urls', JSON.stringify(this.cache));
            window.localStorage.setItem('shortycut.favicon-folders', this.getFaviconFolders());
        };
        FaviconManager.prototype.loadCache = function () {
            var _a;
            var cache = {};
            try {
                if (window.localStorage.getItem('shortycut.favicon-folders') === this.getFaviconFolders()) {
                    cache = JSON.parse((_a = window.localStorage.getItem('shortycut.favicon-urls')) !== null && _a !== void 0 ? _a : '{}');
                }
            }
            catch (ignored) { }
            cache[''] = { domain: '', isStoredLocally: true, url: 'resources/local.svg', effectiveDomain: '' };
            return cache;
        };
        FaviconManager.prototype.getFaviconFolders = function () {
            return shortycut.config.homepage.suggestions.faviconFolders.join('\t');
        };
        FaviconManager.prototype.removeFaviconFromCache = function (domain, protocol) {
            if (!protocol) {
                this.removeFaviconFromCache(domain, 'http');
                this.removeFaviconFromCache(domain, 'https');
            }
            else {
                var job = new FaviconDiscoveryJob(protocol, domain);
                do {
                    delete this.cache[job.currentDomain];
                    delete this.images[job.currentUrl];
                } while (job.switchToNextUrl());
                this.removeFaviconFromPage(domain);
                this.saveCache();
            }
        };
        FaviconManager.prototype.removeFaviconFromPage = function (domain) {
            var _a;
            var elements = document.querySelectorAll('div.favicon');
            for (var index = 0; index < elements.length; index++) {
                var div = elements[index];
                if (((_a = div.attributes.getNamedItem('data-domain')) === null || _a === void 0 ? void 0 : _a.value) === domain) {
                    div.innerHTML = '';
                }
            }
        };
        return FaviconManager;
    }());
    shortycut.FaviconManager = FaviconManager;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var FaviconToolsPage = (function () {
        function FaviconToolsPage() {
            this.dom = {
                faviconTools: document.querySelector('#favicon-tools'),
                configWarning: document.querySelector('#favicon-tools .config-warning'),
                curlLink: document.querySelector('#favicon-tools .online a.curl'),
                curlTextarea: document.querySelector('#favicon-tools .online textarea.curl'),
                pending: document.querySelector('#favicon-tools .pending'),
                pendingListing: document.querySelector('#favicon-tools .pending .listing'),
                online: document.querySelector('#favicon-tools .online'),
                onlineListing: document.querySelector('#favicon-tools .online .listing'),
                missing: document.querySelector('#favicon-tools .missing'),
                missingListing: document.querySelector('#favicon-tools .missing .listing'),
                offline: document.querySelector('#favicon-tools .offline'),
                offlineListing: document.querySelector('#favicon-tools .offline .listing'),
            };
            this.domains = {
                pending: {},
                online: new Array(),
                offline: new Array(),
                missing: new Array(),
                effective: {}
            };
            this.refreshPageContent = this.refreshPageContent.bind(this);
            this.showCurlCommands = this.showCurlCommands.bind(this);
            this.selectAllCurlCommands = this.selectAllCurlCommands.bind(this);
            for (var _i = 0, _a = Object.keys(shortycut.shortcuts); _i < _a.length; _i++) {
                var keyword = _a[_i];
                for (var _b = 0, _c = shortycut.shortcuts[keyword].all.map(function (item) { return item.link; }); _b < _c.length; _b++) {
                    var link = _c[_b];
                    var _d = shortycut.FaviconManager.extractProtocolAndDomain(link.urlForFavicon), protocol = _d.protocol, domain = _d.domain;
                    if ('file' !== protocol && 'https' !== this.domains.pending[domain]) {
                        this.domains.pending[domain] = protocol;
                    }
                }
            }
            for (var _e = 0, _f = Object.keys(this.domains.pending); _e < _f.length; _e++) {
                var domain = _f[_e];
                shortycut.faviconManager.createFavicon(this.domains.pending[domain] + "://" + domain);
            }
            this.dom.configWarning.style.display = shortycut.config.homepage.suggestions.showFavicons ? 'none' : 'block';
            this.refreshPageContent();
        }
        FaviconToolsPage.prototype.hasMenu = function () {
            return true;
        };
        FaviconToolsPage.prototype.show = function () {
            this.addEventHandlers();
            this.dom.faviconTools.style.display = 'flex';
        };
        FaviconToolsPage.prototype.hide = function () {
            this.removeEventHandlers();
            this.dom.faviconTools.style.display = 'none';
        };
        FaviconToolsPage.prototype.addEventHandlers = function () {
            this.dom.curlLink.addEventListener('click', this.showCurlCommands);
            this.dom.curlTextarea.addEventListener('focus', this.selectAllCurlCommands);
        };
        FaviconToolsPage.prototype.removeEventHandlers = function () {
            this.dom.curlLink.removeEventListener('click', this.showCurlCommands);
            this.dom.curlTextarea.addEventListener('focus', this.selectAllCurlCommands);
        };
        FaviconToolsPage.prototype.showCurlCommands = function (event) {
            this.dom.curlLink.style.display = 'none';
            this.dom.curlTextarea.style.display = 'block';
            event.preventDefault();
            return false;
        };
        FaviconToolsPage.prototype.selectAllCurlCommands = function () {
            this.dom.curlTextarea.select();
        };
        FaviconToolsPage.prototype.refreshPageContent = function () {
            for (var _i = 0, _a = Object.keys(this.domains.pending); _i < _a.length; _i++) {
                var domain = _a[_i];
                var favicon = shortycut.faviconManager.getFavicon(domain);
                if (favicon) {
                    if (!this.domains.effective[favicon.effectiveDomain]) {
                        if (favicon.url) {
                            if (favicon.isStoredLocally) {
                                this.addOfflineFavicon(favicon.url);
                            }
                            else {
                                this.addOnlineFavicon(favicon.effectiveDomain, favicon.url);
                            }
                        }
                        else {
                            this.addMissingFavicon(favicon.domain);
                        }
                        this.domains.effective[favicon.effectiveDomain] = true;
                    }
                    delete this.domains.pending[domain];
                }
            }
            this.updateProgress();
            if (Object.keys(this.domains.pending).length) {
                setTimeout(this.refreshPageContent, 250);
            }
        };
        FaviconToolsPage.prototype.addOnlineFavicon = function (domain, url) {
            var filename = this.getBaseFilename(domain) + "." + (url.replace(/^(.*\.|[^.]*$)/, '') || 'ico');
            this.dom.onlineListing.appendChild(shortycut.create('div.row', [
                shortycut.create('div.icon', this.createLink(url, filename)),
                shortycut.create('div.domain', filename)
            ]));
            this.dom.curlTextarea.value += "curl -s -L -o \"" + filename + "\" \"" + url + "\"\n";
            this.dom.online.style.display = 'block';
        };
        FaviconToolsPage.prototype.createLink = function (url, filename) {
            var _this = this;
            return shortycut.create('a', shortycut.createImage(url), function (element) {
                element.download = filename;
                element.href = url;
                element.addEventListener('click', function () { return _this.onClickIcon(url, filename); });
            });
        };
        FaviconToolsPage.prototype.onClickIcon = function (url, filename) {
            console.log(filename);
            fetch(url).then(function (response) {
                console.log(response);
            }).catch(function (err) {
                console.log('Fetch problem: ' + err.message);
            });
        };
        FaviconToolsPage.prototype.addMissingFavicon = function (domain) {
            this.dom.missingListing.appendChild(shortycut.create('div.row', this.getBaseFilename(domain)));
            this.dom.missing.style.display = 'block';
        };
        FaviconToolsPage.prototype.addOfflineFavicon = function (url) {
            var filename = url.replace(/^\//, '');
            this.dom.offlineListing.appendChild(shortycut.create('div.row', [
                shortycut.create('div.icon', shortycut.createImage(url)),
                shortycut.create('div.domain', filename)
            ]));
            this.dom.offline.style.display = 'block';
        };
        FaviconToolsPage.prototype.updateProgress = function () {
            if (0 === Object.keys(this.domains.pending).length) {
                this.dom.pending.style.display = 'none';
            }
            else {
                this.dom.pending.style.display = 'block';
                this.dom.pendingListing.innerHTML = Object.keys(this.domains.pending)
                    .map(function (domain) { return domain.match(/^www\..*\..*/) ? domain.replace(/^www\./, '') : domain; })
                    .map(function (domain) { return shortycut.sanitize(domain); })
                    .join('<br>');
            }
        };
        FaviconToolsPage.prototype.getBaseFilename = function (domain) {
            return (domain.match(/^www\..*\..*/) ? domain.replace(/^www\./, '') : domain).replace(/:/g, '!');
        };
        return FaviconToolsPage;
    }());
    shortycut.FaviconToolsPage = FaviconToolsPage;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var HomePage = (function () {
        function HomePage() {
            this.dom = {
                filter: document.querySelector('#home .input'),
                home: document.querySelector('#home'),
                suggestions: document.querySelector('#home .suggestions'),
                headerRow: document.querySelector('#home > .row'),
                rows: new Array(),
                notification: {
                    self: document.querySelector('#home .notification'),
                    welcome: {
                        self: document.querySelector('#home .notification .welcome'),
                        newTabs: document.querySelector('#home .notification .welcome .new-tabs'),
                    },
                    applicationErrors: document.querySelector('#home .notification .application-errors'),
                    noShortcutsNoError: document.querySelector('#home .notification .no-shortcuts-no-error'),
                    errorWithBacktickSupport: document.querySelector('#home .notification .error-with-backtick-support'),
                    errorWithoutBacktickSupport: document.querySelector('#home .notification .error-without-backtick-support'),
                }
            };
            this.filter = new shortycut.Filter(HomePage.MAX_SUGGESTIONS);
            this.suggestions = new Array();
            this.selectedIndex = -1;
            this.originalInput = '';
            this.lastCancelClearFilterEvent = -1;
            this.onKeyBody = this.onKeyBody.bind(this);
            this.onFilterChanged = this.onFilterChanged.bind(this);
            this.onFocusEvent = this.onFocusEvent.bind(this);
            this.clearFilter = this.clearFilter.bind(this);
            this.scheduleClearFilter = this.scheduleClearFilter.bind(this);
            this.cancelClearFilter = this.cancelClearFilter.bind(this);
            this.populateNotification();
        }
        HomePage.prototype.hasMenu = function () {
            return true;
        };
        HomePage.prototype.populate = function (query) {
            this.dom.filter.value = query !== null && query !== void 0 ? query : '';
            this.previousInput = undefined;
            this.originalInput = '';
            this.dom.suggestions.innerHTML = '';
            this.selectSuggestion(-1);
            this.onFilterChanged();
            if (shortycut.queryParameters.facets.noFocus) {
                this.dom.headerRow.classList.add('no-focus');
            }
            return this;
        };
        HomePage.prototype.populateNotification = function () {
            var _this = this;
            if (shortycut.startupCache.initializationErrors.length) {
                this.dom.notification.applicationErrors.innerHTML = shortycut.create('div.header', 1 == shortycut.startupCache.initializationErrors.length
                    ? 'An error occurred during initialization'
                    : 'Errors occurred during initialization').outerHTML;
                shortycut.startupCache.initializationErrors
                    .map(function (error) { return error.toHtml(); })
                    .forEach(function (element) { return _this.dom.notification.applicationErrors.appendChild(element); });
                this.dom.notification.applicationErrors.style.display = 'block';
            }
            else if (0 == Object.keys(shortycut.shortcuts).length) {
                if (shortycut.startupCache.exceptions.length) {
                    if (shortycut.supportsBacktickSyntax()) {
                        this.dom.notification.errorWithBacktickSupport.style.display = 'block';
                    }
                    else {
                        this.dom.notification.errorWithoutBacktickSupport.style.display = 'block';
                    }
                }
                else {
                    this.dom.notification.noShortcutsNoError.style.display = 'block';
                }
            }
            else if (shortycut.isDemoMode()) {
                this.dom.notification.welcome.newTabs.style.display = shortycut.queryParameters.facets.newTabs ? 'none' : 'block';
                this.dom.notification.welcome.self.style.display = 'block';
            }
        };
        HomePage.prototype.show = function () {
            this.addEventHandlers();
            this.dom.home.style.display = 'flex';
            this.dom.filter.focus();
        };
        HomePage.prototype.hide = function () {
            this.removeEventHandlers();
            this.dom.home.style.display = 'none';
        };
        HomePage.prototype.addEventHandlers = function () {
            var _this = this;
            ['change', 'keydown', 'input'].forEach(function (event) {
                return _this.dom.filter.addEventListener(event, _this.onFilterChanged);
            });
            ['focus', 'blur'].forEach(function (event) {
                return [window, document, document.body, _this.dom.filter].forEach(function (element) {
                    return element.addEventListener(event, _this.onFocusEvent);
                });
            });
            if (shortycut.queryParameters.facets.noFocus) {
                ['mousedown', 'keydown', 'blur'].forEach(function (event) {
                    return window.addEventListener(event, _this.cancelClearFilter);
                });
                this.dom.filter.addEventListener('blur', this.scheduleClearFilter);
            }
            document.addEventListener('keydown', this.onKeyBody);
        };
        HomePage.prototype.removeEventHandlers = function () {
            var _this = this;
            ['change', 'keydown', 'input'].forEach(function (event) {
                return _this.dom.filter.removeEventListener(event, _this.onFilterChanged);
            });
            ['focus', 'blur'].forEach(function (event) {
                return [window, document, document.body, _this.dom.filter].forEach(function (element) {
                    return element.removeEventListener(event, _this.onFocusEvent);
                });
            });
            if (shortycut.queryParameters.facets.noFocus) {
                ['mousedown', 'keydown', 'blur'].forEach(function (event) {
                    return window.removeEventListener(event, _this.cancelClearFilter);
                });
                this.dom.filter.removeEventListener('blur', this.scheduleClearFilter);
            }
            document.removeEventListener('keydown', this.onKeyBody);
        };
        HomePage.prototype.onKeyBody = function (event) {
            var isRightArrow = ('ArrowRight' === event.key || 'Right' === event.key)
                && 0 <= this.selectedIndex
                && (this.suggestions[this.selectedIndex].hidesMoreChildren
                    || 'segment' === this.suggestions[this.selectedIndex].type);
            if (!shortycut.queryParameters.facets.noFocus) {
                this.dom.filter.focus();
            }
            if ('Escape' === event.key || 'Esc' === event.key) {
                if (shortycut.queryParameters.facets.noFocus) {
                    if (this.dom.filter.value) {
                        this.clearFilter();
                    }
                    else {
                        this.removeFocus();
                    }
                }
                else {
                    this.clearFilter();
                }
                event.preventDefault();
                return false;
            }
            else if ('ArrowDown' === event.key || 'Down' === event.key) {
                this.selectSuggestion(this.selectedIndex + 1);
                event.preventDefault();
                return false;
            }
            else if ('ArrowUp' === event.key || 'Up' === event.key) {
                this.selectSuggestion(this.selectedIndex - 1);
                event.preventDefault();
                return false;
            }
            else if ('Enter' === event.key || isRightArrow) {
                var mode = event.ctrlKey ? shortycut.RedirectMode.NEW_TAB : shortycut.RedirectMode.PRESERVE_HISTORY;
                if (-1 === this.selectedIndex) {
                    this.redirect(mode);
                }
                else {
                    this.applySuggestion(mode, isRightArrow);
                }
                event.preventDefault();
                return false;
            }
            else if ('q' === event.key && event.ctrlKey) {
                this.dom.filter.focus();
            }
            return true;
        };
        HomePage.prototype.onFilterChanged = function () {
            if (this.dom.filter.value !== this.previousInput) {
                this.applyFilter();
                this.selectedIndex = -1;
            }
            return true;
        };
        HomePage.prototype.onFocusEvent = function () {
            var _this = this;
            if (!shortycut.queryParameters.facets.noFocus) {
                setTimeout(function () { return _this.dom.filter.focus(); }, 0);
            }
        };
        HomePage.prototype.cancelClearFilter = function () {
            if (this.clearFilterJob) {
                clearTimeout(this.clearFilterJob);
                this.clearFilterJob = undefined;
            }
            this.lastCancelClearFilterEvent = new Date().getTime();
        };
        HomePage.prototype.scheduleClearFilter = function () {
            if (100 <= new Date().getTime() - this.lastCancelClearFilterEvent) {
                this.clearFilterJob = setTimeout(this.clearFilter, 10);
            }
        };
        HomePage.prototype.clearFilter = function () {
            if (!shortycut.queryParameters.facets.noFocus || this.dom.filter.value) {
                this.dom.filter.focus();
            }
            this.dom.filter.value = '';
            this.applyFilter();
        };
        HomePage.prototype.applyFilter = function (autoSelectFirstRow) {
            var _a, _b;
            var _c;
            if (autoSelectFirstRow === void 0) { autoSelectFirstRow = false; }
            this.suggestions.length = 0;
            var input = this.dom.filter.value;
            var splitInput = input.split(/\s+/).filter(function (word) { return word; });
            var keyword = shortycut.adjustCase((_c = splitInput[0]) !== null && _c !== void 0 ? _c : '');
            var postKeywordInput = input.replace(/^\s*/, '').substr(keyword.length);
            if (keyword) {
                var shortcut = shortycut.shortcuts[keyword];
                if (!postKeywordInput) {
                    (_a = this.suggestions).push.apply(_a, this.filter.keywordSearch(keyword, postKeywordInput));
                }
                else if (shortcut) {
                    if (shortcut.queries && 1 < splitInput.length && shortcut.queries) {
                        this.suggestions.push(this.createSuggestion(shortcut, 'match', 'query'));
                    }
                    else if (shortcut.bookmarks) {
                        this.suggestions.push(this.createSuggestion(shortcut, 'match', shortcut.type));
                    }
                    else {
                        this.suggestions.push(this.createSuggestion(shortcut, 'match', 'query'));
                    }
                }
                if (!this.suggestions.length) {
                    (_b = this.suggestions).push.apply(_b, this.filter.fullTextSearch(splitInput));
                }
            }
            this.suggestions.length = Math.min(HomePage.MAX_SUGGESTIONS, this.suggestions.length);
            this.displaySuggestions();
            this.previousInput = input;
            if (autoSelectFirstRow && 0 < this.suggestions.length) {
                this.selectedIndex = 0;
                this.dom.rows[0].classList.add('selected');
            }
            else {
                this.selectedIndex = -1;
                this.dom.headerRow.classList.add('selected');
            }
            this.dom.notification.self.style.display = 0 < this.suggestions.length || this.dom.filter.value.trim().length
                ? 'none'
                : 'block';
            this.updateInputFieldHighlight();
        };
        HomePage.prototype.createSuggestion = function (shortcut, type, shortcutType) {
            var links = 'bookmark' === shortcutType ? shortcut.bookmarks : shortcut.queries;
            return {
                type: type,
                keyword: shortcut.keyword,
                keywordHtml: shortycut.sanitize(shortcut.keyword),
                descriptionHtml: links.descriptionHtml,
                shortcutType: shortcutType,
                shortcut: shortcut,
                hidesMoreChildren: false
            };
        };
        HomePage.prototype.displaySuggestions = function () {
            var _this = this;
            this.dom.rows = this.suggestions.map(function (suggestion, index) {
                return shortycut.create("div.row." + suggestion.type + "." + suggestion.shortcutType, [
                    shortycut.create('div.cursor', shortycut.create('img.icon', function (element) { return element.src = 'resources/arrow.svg'; })),
                    shortycut.create('div.row-content', [
                        shortycut.config.homepage.suggestions.showKeywords
                            ? shortycut.create('div.keyword:html', suggestion.keywordHtml)
                            : '',
                        shortycut.config.homepage.suggestions.showFavicons
                            ? shortycut.faviconManager.createFavicon(suggestion.shortcut.all[0].link.urlForFavicon)
                            : '',
                        shortycut.create('div.description:html', _this.getDescription(suggestion))
                    ], function (rowContent) { return rowContent.addEventListener('click', function (event) {
                        _this.selectSuggestion(index);
                        _this.applySuggestion(event.ctrlKey ? shortycut.RedirectMode.NEW_TAB : shortycut.RedirectMode.PRESERVE_HISTORY, false);
                    }); })
                ]);
            });
            this.dom.suggestions.innerHTML = '';
            this.dom.rows.forEach(function (row) { return _this.dom.suggestions.appendChild(row); });
            if (HomePage.MAX_SUGGESTIONS <= this.suggestions.length) {
                this.dom.suggestions.classList.add('truncated');
            }
            else {
                this.dom.suggestions.classList.remove('truncated');
            }
        };
        HomePage.prototype.getDescription = function (suggestion) {
            if (suggestion.hidesMoreChildren || suggestion.type === 'segment') {
                return shortycut.create('div:html', [
                    suggestion.descriptionHtml,
                    ' ',
                    shortycut.create('span.more-indicator-text:html', shortycut.Segments.SEPARATOR_HTML + " ..."),
                    shortycut.create('span.more-indicator-key:html', shortycut.create('span.key:html', '&rarr;'), ' more')
                ]);
            }
            else {
                return suggestion.descriptionHtml;
            }
        };
        HomePage.prototype.updateInputFieldHighlight = function () {
            var hasInput = !!this.dom.filter.value.trim();
            var canUseSearchEngine = shortycut.defaultSearchEngine && shortycut.config.defaultSearchEngine.useOnHomepage;
            var focusOnSuggestion = this.selectedIndex != -1;
            var hasFullTextSearchSuggestions = !!this.suggestions.length;
            var hasMatches = !!this.suggestions.filter(function (suggestion) { return suggestion.type != 'search-result'; }).length;
            if (!hasInput || canUseSearchEngine || focusOnSuggestion || hasMatches) {
                this.dom.filter.classList.remove('error');
                this.dom.filter.classList.remove('warning');
            }
            else if (hasFullTextSearchSuggestions) {
                this.dom.filter.classList.remove('error');
                this.dom.filter.classList.add('warning');
            }
            else {
                this.dom.filter.classList.add('error');
                this.dom.filter.classList.remove('warning');
            }
        };
        HomePage.prototype.selectSuggestion = function (index) {
            var _a, _b;
            index = Math.min(Math.max(-1, index), this.suggestions.length - 1);
            if (index !== this.selectedIndex) {
                if (-1 === this.selectedIndex) {
                    this.originalInput = this.dom.filter.value;
                }
                ((_a = this.dom.rows[this.selectedIndex]) !== null && _a !== void 0 ? _a : this.dom.headerRow).classList.remove('selected');
                this.selectedIndex = index;
                ((_b = this.dom.rows[this.selectedIndex]) !== null && _b !== void 0 ? _b : this.dom.headerRow).classList.add('selected');
                if (-1 === this.selectedIndex) {
                    this.previousInput = this.dom.filter.value = this.originalInput;
                }
                else {
                    var suggestion = this.suggestions[this.selectedIndex];
                    var keyword = this.suggestions[this.selectedIndex].keyword;
                    if (suggestion.type !== 'segment' && suggestion.shortcutType !== 'bookmark') {
                        this.previousInput = keyword + " ";
                    }
                    else {
                        this.previousInput = keyword;
                    }
                    this.dom.filter.value = this.previousInput;
                }
                this.dom.filter.selectionStart = this.dom.filter.selectionEnd = this.dom.filter.value.length;
                this.updateInputFieldHighlight();
            }
        };
        HomePage.prototype.applySuggestion = function (mode, viaRightArrow) {
            var _a, _b, _c, _d;
            var suggestion = this.suggestions[this.selectedIndex];
            var shortcut = suggestion.shortcut;
            if (suggestion.type === 'segment' || (viaRightArrow && suggestion.hidesMoreChildren)) {
                this.applyFilter(viaRightArrow && suggestion.hidesMoreChildren);
            }
            else if (suggestion.type === 'search-result') {
                if (((_a = suggestion.link) === null || _a === void 0 ? void 0 : _a.type) === 'query') {
                    var searchTerm = (_b = prompt('Search term')) === null || _b === void 0 ? void 0 : _b.trim();
                    if (searchTerm) {
                        shortycut.redirector.redirect([suggestion.link], suggestion.link.onMultiLink, searchTerm, mode);
                    }
                }
                else if (((_c = suggestion.link) === null || _c === void 0 ? void 0 : _c.type) === 'bookmark') {
                    shortycut.redirector.redirect([suggestion.link], suggestion.link.onMultiLink, '', mode);
                }
            }
            else if (shortcut.bookmarks) {
                shortycut.redirector.redirect(shortcut.bookmarks.current, shortcut.bookmarks.onMultiLink, '', mode);
            }
            else if (shortcut.queries) {
                var searchTerm = (_d = prompt('Search term')) === null || _d === void 0 ? void 0 : _d.trim();
                if (searchTerm) {
                    shortycut.redirector.redirect(shortcut.queries.current, shortcut.queries.onMultiLink, searchTerm, mode);
                }
            }
        };
        HomePage.prototype.redirect = function (mode) {
            var _a;
            var input = this.dom.filter.value.trim();
            var keyword = shortycut.adjustCase(input.replace(/\s.*/, ''));
            var shortcut = shortycut.shortcuts[keyword];
            var searchTerm = input.replace(/^[^\s]*\s*/, '');
            if (!(shortcut === null || shortcut === void 0 ? void 0 : shortcut.bookmarks) && (shortcut === null || shortcut === void 0 ? void 0 : shortcut.queries) && !searchTerm) {
                searchTerm = searchTerm || ((_a = prompt('Search term')) === null || _a === void 0 ? void 0 : _a.trim());
                if (!searchTerm) {
                    return;
                }
            }
            var links = (shortcut === null || shortcut === void 0 ? void 0 : shortcut.queries) && searchTerm ? shortcut === null || shortcut === void 0 ? void 0 : shortcut.queries : shortcut === null || shortcut === void 0 ? void 0 : shortcut.bookmarks;
            if (links) {
                if (1 < links.current.length && shortycut.RedirectMode.NEW_TAB === mode) {
                    var url = window.location.href.replace(/[?#].*/, '');
                    var query = encodeURIComponent((keyword + " " + searchTerm).trim());
                    shortycut.redirector.openUrl(url + "?" + shortycut.QueryParameters.QUERY + "=" + query, mode);
                }
                else {
                    shortycut.redirector.redirect(links.current, links.onMultiLink, searchTerm, mode);
                }
            }
            else if (shortycut.isUrl(input)) {
                shortycut.redirector.openUrl(input, mode);
            }
            else if ((shortycut.defaultSearchEngine === null || shortycut.defaultSearchEngine === void 0 ? void 0 : shortycut.defaultSearchEngine.queries) && shortycut.config.defaultSearchEngine.useOnHomepage) {
                shortycut.defaultSearchEngine.replacePlaceholders(input);
                shortycut.redirector.redirect(shortycut.defaultSearchEngine.queries.current, shortycut.defaultSearchEngine.queries.onMultiLink, input, mode);
            }
            else if (this.suggestions.length) {
                this.selectedIndex = 0;
                this.applySuggestion(mode, false);
            }
        };
        HomePage.prototype.removeFocus = function () {
            var _this = this;
            setTimeout(function () { return _this.dom.filter.blur(); }, 0);
        };
        HomePage.MAX_SUGGESTIONS = 12;
        return HomePage;
    }());
    shortycut.HomePage = HomePage;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var LinkTools = (function () {
        function LinkTools() {
            this.dom = {
                linkTools: document.querySelector('#link-tools'),
                harParser: {
                    input: document.querySelector('#link-tools .har-parser .input'),
                    output: document.querySelector('#link-tools .har-parser .output')
                },
                urlEncoding: {
                    decoded: document.querySelector('#link-tools input.decoded'),
                    encoded: document.querySelector('#link-tools input.encoded'),
                }
            };
            this.onDecodedChanged = this.onDecodedChanged.bind(this);
            this.onEncodedChanged = this.onEncodedChanged.bind(this);
            this.onHarInputChanged = this.onHarInputChanged.bind(this);
        }
        LinkTools.prototype.hasMenu = function () {
            return true;
        };
        LinkTools.prototype.populate = function () {
            this.dom.urlEncoding.decoded.value = '';
            this.dom.urlEncoding.encoded.classList.remove('invalid');
            this.dom.urlEncoding.encoded.value = '';
            this.dom.harParser.input.classList.remove('invalid');
            this.dom.harParser.input.value = '';
            this.dom.harParser.output.innerHTML = '';
            return this;
        };
        LinkTools.prototype.show = function () {
            this.addEventHandlers();
            this.dom.linkTools.style.display = 'flex';
        };
        LinkTools.prototype.hide = function () {
            this.removeEventHandlers();
            this.dom.linkTools.style.display = 'none';
        };
        LinkTools.prototype.addEventHandlers = function () {
            var _this = this;
            ['change', 'keydown', 'input'].forEach(function (event) {
                _this.dom.urlEncoding.encoded.addEventListener(event, _this.onEncodedChanged);
                _this.dom.urlEncoding.decoded.addEventListener(event, _this.onDecodedChanged);
                _this.dom.harParser.input.addEventListener(event, _this.onHarInputChanged);
            });
        };
        LinkTools.prototype.removeEventHandlers = function () {
            var _this = this;
            ['change', 'keydown', 'input'].forEach(function (event) {
                _this.dom.urlEncoding.encoded.removeEventListener(event, _this.onEncodedChanged);
                _this.dom.urlEncoding.decoded.removeEventListener(event, _this.onDecodedChanged);
                _this.dom.harParser.input.removeEventListener(event, _this.onHarInputChanged);
            });
        };
        LinkTools.prototype.onDecodedChanged = function () {
            this.dom.urlEncoding.encoded.value = encodeURIComponent(this.dom.urlEncoding.decoded.value);
        };
        LinkTools.prototype.onEncodedChanged = function () {
            try {
                this.dom.urlEncoding.decoded.value = decodeURIComponent(this.dom.urlEncoding.encoded.value);
                this.dom.urlEncoding.encoded.classList.remove('invalid');
            }
            catch (exception) {
                this.dom.urlEncoding.decoded.value = '';
                this.dom.urlEncoding.encoded.classList.add('invalid');
            }
        };
        LinkTools.prototype.onHarInputChanged = function () {
            var _this = this;
            var input = this.dom.harParser.input.value.trim() || '{"log":{"entries":[]}}';
            try {
                this.dom.harParser.output.innerHTML = '';
                var links = this.extractPostLinks(JSON.parse(input));
                if (links.length) {
                    this.dom.harParser.output.appendChild(shortycut.create('p', "This HAR file contain the following POST link" + (1 < links.length ? 's' : '') + ":"));
                    links.forEach(function (url) { return _this.dom.harParser.output.appendChild(url); });
                }
                else if (this.dom.harParser.input.value.trim()) {
                    this.dom.harParser.output.appendChild(shortycut.create('p', 'This HAR file does not contain any POST links.'));
                }
                this.dom.harParser.input.classList.remove('invalid');
            }
            catch (exception) {
                this.dom.harParser.input.classList.add('invalid');
            }
        };
        LinkTools.prototype.extractPostLinks = function (har) {
            var _a, _b, _c;
            var result = new Array();
            for (var _i = 0, _d = har.log.entries; _i < _d.length; _i++) {
                var entry = _d[_i];
                if ('POST' === ((_a = entry === null || entry === void 0 ? void 0 : entry.request) === null || _a === void 0 ? void 0 : _a.method)) {
                    var url = entry.request.url;
                    var postParameters = (_c = (_b = entry === null || entry === void 0 ? void 0 : entry.request) === null || _b === void 0 ? void 0 : _b.postData) === null || _c === void 0 ? void 0 : _c.params;
                    for (var index = 0; postParameters && index < postParameters.length; index++) {
                        url += 0 == index ? shortycut.config.shortcutFormat.url.postIndicator : '&';
                        var name_1 = encodeURIComponent(postParameters[index].name);
                        var value = encodeURIComponent(postParameters[index].value);
                        url += name_1 + "=" + value;
                    }
                    result.push(shortycut.create('p.url', shortycut.sanitize(url)));
                }
            }
            return result;
        };
        return LinkTools;
    }());
    shortycut.LinkTools = LinkTools;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var Menu = (function () {
        function Menu() {
            this.dom = {
                menu: document.querySelector('#menu'),
                burgerIcon: document.querySelector('#menu .burger-icon'),
                closeIcon: document.querySelector('#menu .close-icon'),
                items: document.querySelector('#menu .items')
            };
            this.onClickCloseIcon = this.onClickCloseIcon.bind(this);
            this.onClickBurgerIcon = this.onClickBurgerIcon.bind(this);
            this.onClickBody = this.onClickBody.bind(this);
            this.onKeyDown = this.onKeyDown.bind(this);
            this.onShortyCut = this.onShortyCut.bind(this);
            this.onDocumentation = this.onDocumentation.bind(this);
            this.onLinkTools = this.onLinkTools.bind(this);
            this.onBrowserIntegration = this.onBrowserIntegration.bind(this);
            this.onFavicons = this.onFavicons.bind(this);
            this.populateItems();
        }
        Menu.prototype.populateItems = function () {
            var _this = this;
            this.dom.items.innerHTML = '';
            var menuItems = [
                ["ShortyCut " + shortycut.getVersionNumber(), this.onShortyCut],
                ['Documentation', this.onDocumentation],
                ['Link tools', this.onLinkTools],
                ['Browser integration', this.onBrowserIntegration],
                ['Favicons', this.onFavicons]
            ];
            menuItems.forEach(function (array) {
                return _this.dom.items.appendChild(shortycut.create('a', array[0], function (element) { return element.addEventListener('click', array[1]); }));
            });
        };
        Menu.prototype.addEventListeners = function () {
            this.dom.closeIcon.addEventListener('click', this.onClickCloseIcon);
            this.dom.burgerIcon.addEventListener('click', this.onClickBurgerIcon);
            document.body.addEventListener('click', this.onClickBody);
            document.body.addEventListener('keydown', this.onKeyDown);
        };
        Menu.prototype.removeEventListeners = function () {
            this.dom.closeIcon.removeEventListener('click', this.onClickCloseIcon);
            this.dom.burgerIcon.removeEventListener('click', this.onClickBurgerIcon);
            document.body.removeEventListener('click', this.onClickBody);
            document.body.removeEventListener('keydown', this.onKeyDown);
        };
        Menu.prototype.showBurgerIcon = function () {
            if (this.dom.menu.style.display === 'none') {
                this.addEventListeners();
            }
            this.dom.burgerIcon.style.display = 'block';
            this.dom.closeIcon.style.display = 'none';
            this.dom.items.style.display = 'none';
            this.dom.menu.style.display = 'block';
        };
        Menu.prototype.showCloseIcon = function (onClose) {
            this.onClose = onClose;
            if (this.dom.menu.style.display === 'none') {
                this.addEventListeners();
            }
            this.dom.burgerIcon.style.display = 'none';
            this.dom.closeIcon.style.display = 'block';
            this.dom.items.style.display = 'none';
            this.dom.menu.style.display = 'block';
        };
        Menu.prototype.hide = function () {
            this.removeEventListeners();
            this.dom.menu.style.display = 'none';
        };
        Menu.prototype.closeMenu = function () {
            this.dom.items.style.display = 'none';
        };
        Menu.prototype.onClickBurgerIcon = function (event) {
            this.dom.items.style.display = 'none' === this.dom.items.style.display ? 'block' : 'none';
            return this.cancelEvent(event);
        };
        Menu.prototype.onClickCloseIcon = function (event) {
            this.onClose();
            return this.cancelEvent(event);
        };
        Menu.prototype.onClickBody = function () {
            this.closeMenu();
            return true;
        };
        Menu.prototype.onShortyCut = function (event) {
            this.closeMenu();
            var url = 'https://github.com/david-04/shortycut';
            if (shortycut.queryParameters.facets.newTabs) {
                window.open(url);
            }
            else {
                window.location.href = url;
            }
            return this.cancelEvent(event);
        };
        Menu.prototype.onDocumentation = function (event) {
            this.closeMenu();
            var url = window.location.href.replace(/[#?].*/, '').replace(/\/?[^\/]+\.[^\/]+$/, '') + '/../index.html';
            if (shortycut.queryParameters.facets.newTabs) {
                window.open(url);
            }
            else {
                window.location.href = url;
            }
            return this.cancelEvent(event);
        };
        Menu.prototype.onLinkTools = function (event) {
            this.closeMenu();
            shortycut.router.goto(shortycut.pages.linkTools.populate());
            return this.cancelEvent(event);
        };
        Menu.prototype.onBrowserIntegration = function (event) {
            this.closeMenu();
            shortycut.router.goto(shortycut.pages.browserIntegration);
            return this.cancelEvent(event);
        };
        Menu.prototype.onFavicons = function (event) {
            this.closeMenu();
            shortycut.router.goto(shortycut.pages.faviconTools);
            return this.cancelEvent(event);
        };
        Menu.prototype.cancelEvent = function (event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        };
        Menu.prototype.onKeyDown = function (event) {
            if (('Escape' === event.key || 'Esc' === event.key)) {
                if (this.dom.items.style.display !== 'none') {
                    this.closeMenu();
                    event.preventDefault();
                    return false;
                }
            }
            return true;
        };
        return Menu;
    }());
    shortycut.Menu = Menu;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var RedirectPage = (function () {
        function RedirectPage() {
            this.dom = {
                redirect: document.querySelector('#redirect'),
                title: document.querySelector('#redirect .title'),
                url: document.querySelector('#redirect .url'),
            };
        }
        RedirectPage.prototype.populate = function (link) {
            this.dom.title.innerHTML = link.segments.descriptionHtml;
            this.dom.url.innerHTML = shortycut.sanitize(link.url);
            return this;
        };
        RedirectPage.prototype.hasMenu = function () {
            return false;
        };
        RedirectPage.prototype.show = function () {
            document.body.append(shortycut.create('div:html', '&nbsp;'));
        };
        RedirectPage.prototype.hide = function () {
            this.dom.redirect.style.display = 'none';
        };
        return RedirectPage;
    }());
    shortycut.RedirectPage = RedirectPage;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var SetupPage = (function () {
        function SetupPage() {
            this.setupComplete = false;
            this.dom = {
                setup: document.querySelector('#setup'),
                error: document.querySelector('#setup .error'),
                rootPath: document.querySelector('#setup .root-path'),
                header: document.querySelector('#setup h1'),
                pre: document.querySelector('#setup pre'),
                syntaxWarning: document.querySelector('#setup .syntax-warning')
            };
        }
        SetupPage.prototype.hasMenu = function () {
            return false;
        };
        SetupPage.prototype.populate = function (mode) {
            if (SetupPage.VALIDATE === mode) {
                if (!shortycut.startupCache.config.length || !shortycut.startupCache.shortcuts.length) {
                    this.dom.error.style.display = 'block';
                    this.dom.header.style.display = 'none';
                }
                else {
                    this.setupComplete = true;
                    shortycut.redirector.openUrl(window.location.href.replace(/\?.*/, ''), shortycut.RedirectMode.PRESERVE_HISTORY);
                }
            }
            var indexPath = 'shortycut';
            if (0 === window.location.href.search(/^(file:\/{2}|[a-z]:|\/)/i)) {
                indexPath = window.location.href.replace(/^file:\/+/, '').replace(/\/?(index\.html)?([\?#].*)?$/, '');
                if (':' === indexPath.charAt(1)) {
                    indexPath = indexPath.replace(/\//g, '\\');
                }
            }
            this.dom.rootPath.innerHTML = shortycut.sanitize(indexPath);
            this.dom.pre.innerHTML = this.dom.pre.innerHTML.replace(/\n[ \t]+/g, '\n');
            this.dom.syntaxWarning.style.display = shortycut.supportsBacktickSyntax() ? 'none' : 'block';
            return this;
        };
        SetupPage.prototype.show = function () {
            if (!this.setupComplete) {
                this.dom.setup.style.display = 'flex';
            }
        };
        SetupPage.prototype.hide = function () {
            this.dom.setup.style.display = 'none';
        };
        SetupPage.VALIDATE = 'validate';
        return SetupPage;
    }());
    shortycut.SetupPage = SetupPage;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var ShortlistPage = (function () {
        function ShortlistPage() {
            this.dom = {
                shortlist: document.getElementById('shortlist'),
                listItems: new Array()
            };
            this.links = new Array();
            this.searchTerm = '';
            this.focusIndex = 0;
            this.onKey = this.onKey.bind(this);
            this.openAll = this.openAll.bind(this);
        }
        ShortlistPage.prototype.hasMenu = function () {
            return true;
        };
        ShortlistPage.prototype.populate = function (links, searchTerm) {
            var _this = this;
            this.links = __spreadArrays([null], links);
            this.searchTerm = searchTerm;
            this.dom.listItems = __spreadArrays([
                this.createHeader()
            ], this.links.slice(1).map(function (link, index) { return _this.createLink(index + 1, link.getHref(_this.searchTerm), link.segments.descriptionHtml, function (event) { return _this.openSelected(event, index + 1); }, shortycut.sanitize(link.url.replace(/^[a-z]+:\/\/+/i, '').replace(/[#?].*/, ''))); }));
            this.dom.shortlist.innerHTML = '';
            this.dom.listItems.forEach(function (href) { return _this.dom.shortlist.appendChild(href); });
            this.focusIndex = 0;
            return this;
        };
        ShortlistPage.prototype.createHeader = function () {
            return this.createLink(0, 'javascript:void(0)', 'Open all', this.openAll);
        };
        ShortlistPage.prototype.createLink = function (index, href, title, onClick, subtitle) {
            var a = document.createElement('a');
            a.href = href;
            a.id = "shortlist" + index;
            a.innerHTML = shortycut.create('div.row', [
                shortycut.create('div.icon', shortycut.createImage('resources/arrow.svg')),
                shortycut.create('div.text', [
                    shortycut.create('div.title', title),
                    subtitle ? shortycut.create('div.url', subtitle) : ''
                ])
            ]).outerHTML;
            a.addEventListener('click', onClick);
            return a;
        };
        ShortlistPage.prototype.show = function () {
            this.addEventHandlers();
            this.dom.shortlist.style.display = 'flex';
            this.dom.listItems[this.focusIndex].focus();
        };
        ShortlistPage.prototype.hide = function () {
            this.removeEventHandlers();
            this.dom.shortlist.style.display = 'none';
        };
        ShortlistPage.prototype.addEventHandlers = function () {
            var _this = this;
            ['keyup', 'keydown'].forEach(function (event) { return document.addEventListener(event, _this.onKey); });
        };
        ShortlistPage.prototype.removeEventHandlers = function () {
            var _this = this;
            ['keyup', 'keydown'].forEach(function (event) { return document.removeEventListener(event, _this.onKey); });
        };
        ShortlistPage.prototype.onKey = function (event) {
            var _a;
            if ('keyup' === event.type) {
                return false;
            }
            var id = ((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.id) || '';
            var current = id.match(/^shortlist[0-9]+$/) ? parseInt(id.replace(/shortlist/, '')) : -1;
            if ('Enter' === event.key) {
                if (0 === current) {
                    return this.openAll(event);
                }
                else if (current < this.links.length) {
                    return this.openSelected(event, current);
                }
                else {
                    event.preventDefault();
                    return false;
                }
            }
            else {
                this.focusIndex = this.getTargetIndex(event.key, current);
                this.dom.listItems[this.focusIndex].focus();
                return true;
            }
        };
        ShortlistPage.prototype.openSelected = function (event, current) {
            shortycut.redirector.redirect([this.links[current]], shortycut.OnMultiLink.OPEN_IN_NEW_TAB, this.searchTerm, shortycut.queryParameters.facets.newTabs ? shortycut.RedirectMode.NEW_TAB : shortycut.RedirectMode.PRESERVE_HISTORY);
            event.preventDefault();
            return false;
        };
        ShortlistPage.prototype.openAll = function (event) {
            shortycut.redirector.redirect(this.links.slice(1), shortycut.OnMultiLink.OPEN_IN_NEW_TAB, this.searchTerm, shortycut.RedirectMode.PRESERVE_HISTORY);
            event.preventDefault();
            return false;
        };
        ShortlistPage.prototype.getTargetIndex = function (key, current) {
            if ('ArrowDown' === key || 'Down' === key || 'Enter' === key || 'Tab' === key) {
                return Math.min(Math.max(current + 1, 0), this.links.length - 1);
            }
            else if ('ArrowUp' === key || 'Up' === key) {
                if (current < 0) {
                    return this.links.length - 1;
                }
                else {
                    return Math.max(Math.min(current - 1, this.links.length - 1), 0);
                }
            }
            else if ('Home' === key || 'PageUp' === key) {
                return 0;
            }
            else if ('End' === key || 'PageDown' === key) {
                return this.links.length - 1;
            }
            return current;
        };
        return ShortlistPage;
    }());
    shortycut.ShortlistPage = ShortlistPage;
})(shortycut || (shortycut = {}));
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var shortycut;
(function (shortycut) {
    var Exception = (function () {
        function Exception(title) {
            var content = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                content[_i - 1] = arguments[_i];
            }
            this.title = shortycut.sanitize(title.trim());
            this.content = content;
        }
        return Exception;
    }());
    shortycut.Exception = Exception;
    function handleExceptions(onError, action) {
        try {
            action();
        }
        catch (exception) {
            onError(exception);
        }
    }
    shortycut.handleExceptions = handleExceptions;
    function displayError(exception) {
        if (exception instanceof Exception) {
            shortycut.pages.error.populate(exception);
        }
        else {
            console.error(exception);
            shortycut.pages.error.populate('Internal error', [
                shortycut.create('p', 'An internal error occurred:'),
                shortycut.create('p', exception)
            ]);
        }
        shortycut.pages.hideAllExcept(shortycut.pages.error);
        shortycut.pages.error.show();
    }
    shortycut.displayError = displayError;
    var InitializationError = (function () {
        function InitializationError() {
            var htmlElements = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                htmlElements[_i] = arguments[_i];
            }
            this.htmlElements = htmlElements;
        }
        ;
        InitializationError.prototype.toHtml = function () {
            return shortycut.create('div.description', this.htmlElements);
        };
        return InitializationError;
    }());
    shortycut.InitializationError = InitializationError;
    var ScriptLoadingError = (function (_super) {
        __extends(ScriptLoadingError, _super);
        function ScriptLoadingError(html) {
            return _super.call(this, shortycut.create('div:html', html)) || this;
        }
        return ScriptLoadingError;
    }(InitializationError));
    shortycut.ScriptLoadingError = ScriptLoadingError;
    var ParserError = (function (_super) {
        __extends(ParserError, _super);
        function ParserError(description, line) {
            var _this = _super.call(this, shortycut.create('div', description, ':'), shortycut.create('div', shortycut.create('tt', line))) || this;
            _this.description = description;
            _this.line = line;
            return _this;
        }
        return ParserError;
    }(InitializationError));
    shortycut.ParserError = ParserError;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var HotkeySelector = (function () {
        function HotkeySelector() {
        }
        HotkeySelector.prototype.selectHotkeys = function (keyword, description, skipFirst) {
            try {
                description = this.appendMissingHotkeys(keyword, description);
                var hotkeyPositions = this.selectBestCandidates(this.determineAllCandidates(keyword, description));
                hotkeyPositions.splice(0, skipFirst);
                return this.splitDescription(description, hotkeyPositions);
            }
            catch (exception) {
                console.error(exception);
                return [{ text: description, isHotkey: false }];
            }
        };
        HotkeySelector.prototype.appendMissingHotkeys = function (keyword, description) {
            var keywordCaseAdjusted = shortycut.adjustCase(keyword);
            var descriptionCaseAdjusted = shortycut.adjustCase(description);
            var descriptionIndex = 0;
            for (var keywordIndex = 0; keywordIndex < keywordCaseAdjusted.length; keywordIndex++) {
                var hotkey = keywordCaseAdjusted.charAt(keywordIndex);
                descriptionIndex = descriptionCaseAdjusted.indexOf(hotkey, descriptionIndex);
                if (descriptionIndex < 0) {
                    return description + " " + keyword.substr(keywordIndex);
                }
            }
            return description;
        };
        HotkeySelector.prototype.determineAllCandidates = function (keyword, description) {
            var candidates = new Array();
            var keywordCaseAdjusted = shortycut.adjustCase(keyword);
            var descriptionCaseAdjusted = shortycut.adjustCase(description);
            for (var keywordIndex = 0; keywordIndex < keywordCaseAdjusted.length; keywordIndex++) {
                var hotkey = keywordCaseAdjusted.charAt(keywordIndex);
                candidates.push([]);
                var descriptionIndex = -1;
                while (0 <= (descriptionIndex = descriptionCaseAdjusted.indexOf(hotkey, descriptionIndex + 1))) {
                    candidates[candidates.length - 1].push({
                        index: descriptionIndex,
                        isPreferred: 0 === descriptionIndex
                            || this.isUpperCase(description.charAt(descriptionIndex))
                            || !!this.isSeparator(description.charAt(descriptionIndex - 1))
                    });
                }
            }
            return candidates;
        };
        HotkeySelector.prototype.isUpperCase = function (char) {
            return char === char.toUpperCase();
        };
        HotkeySelector.prototype.isSeparator = function (char) {
            var code = char.charCodeAt(0);
            return 0 <= code && code <= 127 && char.match(/[^a-z]/i);
        };
        HotkeySelector.prototype.selectBestCandidates = function (candidates) {
            var currentCombination = candidates.map(function () { return 0; });
            var bestCombination = new Array();
            do {
                if (this.isValidCombination(currentCombination, candidates)) {
                    if (!bestCombination.length || this.isBetterThan(currentCombination, bestCombination, candidates)) {
                        bestCombination = currentCombination.slice();
                    }
                }
            } while (this.switchToNextCombination(currentCombination, candidates));
            return bestCombination.map(function (value, index) { return candidates[index][value].index; });
        };
        HotkeySelector.prototype.switchToNextCombination = function (currentCombination, candidates) {
            for (var index = currentCombination.length - 1; 0 <= index; index--) {
                if (++currentCombination[index] < candidates[index].length) {
                    return true;
                }
                else if (0 === index) {
                    return false;
                }
                else {
                    currentCombination[index] = 0;
                }
            }
            return false;
        };
        HotkeySelector.prototype.isValidCombination = function (currentCombination, candidates) {
            for (var index = 1; index < currentCombination.length; index++) {
                var previousIndex = candidates[index - 1][currentCombination[index - 1]].index;
                var currentIndex = candidates[index][currentCombination[index]].index;
                if (currentIndex <= previousIndex) {
                    return false;
                }
            }
            return true;
        };
        HotkeySelector.prototype.isBetterThan = function (currentCombination, bestCombination, candidates) {
            var currentScore = this.countPreferredHotkeys(currentCombination, candidates);
            var bestScore = this.countPreferredHotkeys(bestCombination, candidates);
            if (bestScore < currentScore) {
                return true;
            }
            else if (currentScore < bestScore) {
                return false;
            }
            else {
                return !candidates[0][bestCombination[0]].isPreferred;
            }
        };
        HotkeySelector.prototype.countPreferredHotkeys = function (combination, candidates) {
            return combination.map(function (value, index) { return candidates[index][value]; })
                .filter(function (candidate) { return candidate.isPreferred; })
                .length;
        };
        HotkeySelector.prototype.splitDescription = function (description, hotkeyPositions) {
            var result = new Array();
            result.push({ text: description.substr(0, hotkeyPositions[0]), isHotkey: false });
            for (var index = 0; index < hotkeyPositions.length; index++) {
                result.push({ text: description.substr(hotkeyPositions[index], 1), isHotkey: true });
                var nextIndex = index + 1 < hotkeyPositions.length ? hotkeyPositions[index + 1] : description.length;
                result.push({ text: description.substring(hotkeyPositions[index] + 1, nextIndex), isHotkey: false });
            }
            return result.filter(function (item) { return item.text; });
        };
        return HotkeySelector;
    }());
    shortycut.HotkeySelector = HotkeySelector;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    function sanitize(content) {
        if ('string' !== typeof content) {
            return content;
        }
        else {
            return content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
        }
    }
    shortycut.sanitize = sanitize;
    function create(type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var properties = ElementProperties.of(type);
        var element = document.createElement(properties.tag);
        element.className = properties.className;
        return applyCreateProperties.apply(void 0, __spreadArrays([!element.classList.contains('html'), element], args));
    }
    shortycut.create = create;
    function createImage(url) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var image = create.apply(void 0, __spreadArrays(['img'], args));
        image.src = url;
        return image;
    }
    shortycut.createImage = createImage;
    var ElementProperties = (function () {
        function ElementProperties(tag, className, isSanitized, id) {
            this.tag = tag;
            this.className = className;
            this.isSanitized = isSanitized;
            this.id = id;
        }
        ElementProperties.of = function (type) {
            var _a;
            return ElementProperties.cache[type] = (_a = ElementProperties.cache[type]) !== null && _a !== void 0 ? _a : ElementProperties.parse(type);
        };
        ElementProperties.parse = function (type) {
            var array = type.split(/(?=[.#:])/).map(function (token) { return token.trim(); }).filter(function (token) { return token; });
            return new ElementProperties(array[0], array.filter(function (item) { return '.' === item.charAt(0); }).map(function (item) { return item.substr(1); }).join(' '), array.some(function (item) { return item === ':html'; }), array.filter(function (item) { return '#' === item.charAt(0); }).map(function (item) { return item.substr(1); })[0]);
        };
        ElementProperties.cache = {};
        return ElementProperties;
    }());
    function applyCreateProperties(mustSanitize, element) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var arg = args_1[_a];
            if ('function' === typeof arg) {
                var result = arg(element);
                if (Array.isArray(result)) {
                    element = applyCreateProperties.apply(void 0, __spreadArrays([mustSanitize, element], result));
                }
                else if (null !== result && undefined !== result) {
                    element = applyCreateProperties(mustSanitize, element, result);
                }
            }
            else if ('string' === typeof arg) {
                element.innerHTML += mustSanitize ? arg : sanitize(arg);
            }
            else if (Array.isArray(arg)) {
                element = applyCreateProperties.apply(void 0, __spreadArrays([mustSanitize, element], arg));
            }
            else if (arg) {
                element.appendChild(arg);
            }
        }
        return element;
    }
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    function comparator(a, b) {
        return a < b ? -1 : (a === b ? 0 : 1);
    }
    shortycut.comparator = comparator;
    function comparing(fieldSelector) {
        if (fieldSelector) {
            return function (a, b) { return comparator(fieldSelector(a), fieldSelector(b)); };
        }
        else {
            return comparator;
        }
    }
    shortycut.comparing = comparing;
    function getVersionNumber() {
        return '1.1'.replace(/^##.*/, '');
    }
    shortycut.getVersionNumber = getVersionNumber;
    function supportsBacktickSyntax() {
        var key = 'shortycutBrowserTest';
        var value = 'success';
        try {
            eval('window["' + key + '"] = `' + value + '`');
        }
        catch (ignored) { }
        var supportsBacktickSyntax = value === window[key];
        delete window[key];
        return supportsBacktickSyntax;
    }
    shortycut.supportsBacktickSyntax = supportsBacktickSyntax;
    function isDemoMode() {
        var keywords = ['tm', 'tz', 'tp', 'tt', 'tr', 'e', 'news'];
        return Object.keys(shortycut.shortcuts).length == keywords.length
            && keywords.filter(function (keyword) { return shortycut.shortcuts[keyword]; }).length === keywords.length;
    }
    shortycut.isDemoMode = isDemoMode;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    function adjustCase(text) {
        return (text && !shortycut.config.shortcutFormat.keyword.caseSensitive) ? text.toLowerCase() : text;
    }
    shortycut.adjustCase = adjustCase;
    function replaceAll(source, search, replacement, caseSensitive) {
        var result = '';
        if (!caseSensitive) {
            search = search.toLocaleLowerCase();
        }
        var index = (caseSensitive ? source : source.toLocaleLowerCase()).indexOf(search);
        while (0 <= index) {
            result += source.substr(0, index) + replacement;
            source = source.substr(index + search.length);
            index = (caseSensitive ? source : source.toLocaleLowerCase()).indexOf(search);
        }
        return result + source;
    }
    shortycut.replaceAll = replaceAll;
    function startsWith(line, pattern) {
        return !!pattern
            && !!line
            && pattern.length <= line.length
            && line.substr(0, pattern.length) === pattern;
    }
    shortycut.startsWith = startsWith;
    function endsWith(line, pattern) {
        return !!pattern
            && !!line
            && pattern.length <= line.length
            && line.substr(line.length - pattern.length, pattern.length) === pattern;
    }
    shortycut.endsWith = endsWith;
    function isUrl(text) {
        for (var _i = 0, _a = ['http://', 'https://', 'ftp://', 'file://']; _i < _a.length; _i++) {
            var protocol = _a[_i];
            if (startsWith(text, protocol)) {
                return true;
            }
        }
        return false;
    }
    shortycut.isUrl = isUrl;
})(shortycut || (shortycut = {}));
shortycut.initialize();
