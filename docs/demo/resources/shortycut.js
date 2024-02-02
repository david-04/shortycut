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
            var shortcut = shortcuts_1[_a];
            if ("string" === typeof shortcut) {
                shortycut.startupCache.shortcuts.push(shortcut);
            }
            else {
                shortcut.forEach(function (item) { return shortycut.startupCache.shortcuts.push(item); });
            }
        }
    }
    shortycut.addShortcuts = addShortcuts;
    function toUrl(fn) {
        return registerDynamicLink("toUrl", fn);
    }
    shortycut.toUrl = toUrl;
    function toQueryUrl(fn) {
        return registerDynamicLink("toQueryUrl", fn);
    }
    shortycut.toQueryUrl = toQueryUrl;
    function toBookmarkUrl(fn) {
        return registerDynamicLink("toBookmarkUrl", fn);
    }
    shortycut.toBookmarkUrl = toBookmarkUrl;
    function registerDynamicLink(entryPoint, fn) {
        if ("function" !== typeof fn) {
            shortycut.startupCache.initializationErrors.push(new shortycut.InitializationError(shortycut.create("div", "The parameter passed to shortycut.".concat(entryPoint, "() is not a function:")), shortycut.create("div", shortycut.create("tt", "".concat(fn)))));
            fn = function () { return []; };
        }
        var key = "".concat(shortycut.dynamicLinkProtocol, "://").concat(entryPoint, ".").concat(shortycut.startupCache.dynamicLinks.size + 1);
        shortycut.startupCache.dynamicLinks.put(key, {
            generator: fn,
            isQuery: "toBookmarkUrl" !== entryPoint,
            faviconUrls: getUrlsForFavicon(fn)
        });
        return key;
    }
    function getUrlsForFavicon(dynamicLinkFunction) {
        var valid = new Array();
        var invalid = new Array();
        for (var _i = 0, _a = [undefined, null, "", "1"]; _i < _a.length; _i++) {
            var searchTerm = _a[_i];
            try {
                var result = analyzeUrls(dynamicLinkFunction(searchTerm));
                result.valid.forEach(function (url) { return valid.push(url); });
                result.invalid.forEach(function (url) { return invalid.push(url); });
            }
            catch (_ignored) { }
        }
        if (invalid.length) {
            var invalidLinksLike = 1 === invalid.length ? "an invalid URL" : "invalid URLs like";
            shortycut.startupCache.initializationErrors.push(new shortycut.InitializationError(shortycut.create("div", "The dynamic link function returned ".concat(invalidLinksLike)), shortycut.create("div", shortycut.create("tt", invalid[0]))));
        }
        return valid;
    }
    function analyzeUrls(result) {
        var valid = new Array();
        var invalid = new Array();
        ("string" === typeof result ? [result] : result)
            .map(function (link) { return "string" === typeof link ? link : link.url; })
            .forEach(function (url) { return (url && shortycut.isUrl(url) ? valid : invalid).push(url); });
        return { valid: valid, invalid: invalid };
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
    var FaviconCacheEntry = (function () {
        function FaviconCacheEntry(fileName, lastAccessed) {
            this.fileName = fileName;
            this.lastAccessed = lastAccessed;
        }
        return FaviconCacheEntry;
    }());
    shortycut.FaviconCacheEntry = FaviconCacheEntry;
    var FaviconCache = (function () {
        function FaviconCache() {
            var _this = this;
            this.today = 0;
            this.cache = new shortycut.Hashtable();
            this.deleteStorage = this.deleteStorage.bind(this);
            this.recalculateToday = this.recalculateToday.bind(this);
            this.saveCache = this.saveCache.bind(this);
            try {
                var storage = shortycut.config.favicons.rememberUrls ? localStorage : sessionStorage;
                if (this.canWriteToStorage()) {
                    this.storage = storage;
                }
            }
            catch (_ignored) { }
            this.recalculateToday();
            shortycut.runAndIgnoreErrors(function () { return _this.loadCache(); });
        }
        FaviconCache.prototype.get = function (domain, origin) {
            var _a;
            var cacheEntry = (_a = this.cache.get(domain)) === null || _a === void 0 ? void 0 : _a.get(origin);
            if (cacheEntry) {
                if (cacheEntry.lastAccessed !== this.today) {
                    cacheEntry.lastAccessed = this.today;
                    this.scheduleSaveCache();
                }
            }
            return cacheEntry === null || cacheEntry === void 0 ? void 0 : cacheEntry.fileName;
        };
        FaviconCache.prototype.set = function (domain, origin, fileName) {
            this.cache.computeIfAbsent(domain, function () { return new shortycut.Hashtable(); })
                .put(origin, new FaviconCacheEntry(fileName, this.today));
            this.scheduleSaveCache();
        };
        FaviconCache.prototype.recalculateToday = function () {
            var epochMs = new Date().getTime();
            var msPerDay = FaviconCache.MS_PER_DAY;
            this.today = Math.ceil(epochMs / msPerDay);
            setTimeout(this.recalculateToday, this.today * msPerDay - epochMs + FaviconCache.MS_PER_FIVE_MINUTES);
        };
        FaviconCache.prototype.deleteExpiredEntries = function (cache) {
            var _this = this;
            cache.forEach(function (domain, origins) {
                origins.forEach(function (origin, entry) {
                    if (FaviconCache.CACHE_EXPIRY_DAYS < _this.today - entry.lastAccessed) {
                        origins.delete(origin);
                    }
                });
                if (!origins.size) {
                    cache.delete(domain);
                }
            });
        };
        FaviconCache.prototype.scheduleSaveCache = function () {
            var _a;
            this.saveJobTimeout = (_a = this.saveJobTimeout) !== null && _a !== void 0 ? _a : setTimeout(this.saveCache, FaviconCache.MS_PER_FIVE_SECONDS);
        };
        FaviconCache.prototype.cancelScheduledSaveJob = function () {
            if ("number" === typeof this.saveJobTimeout) {
                clearTimeout(this.saveJobTimeout);
                delete this.saveJobTimeout;
            }
        };
        FaviconCache.prototype.saveCache = function () {
            this.cancelScheduledSaveJob();
            try {
                this.deleteExpiredEntries(this.cache);
                this.writeStorage(this.serializeCache());
            }
            catch (exception) {
                shortycut.runAndIgnoreErrors(this.deleteStorage);
                throw exception;
            }
        };
        FaviconCache.prototype.serializeCache = function () {
            return this.cache.map(function (domain, origins) {
                var columns = [domain];
                origins.forEach(function (origin, entry) {
                    columns.push(origin);
                    columns.push(entry.fileName);
                    columns.push("".concat(entry.lastAccessed));
                });
                return columns.join(FaviconCache.COLUMN_SEPARATOR);
            }).join(FaviconCache.LINE_SEPARATOR);
        };
        FaviconCache.prototype.loadCache = function () {
            this.cache = this.deserializeCache(this.readStorage());
        };
        FaviconCache.prototype.deserializeCache = function (data) {
            var cache = new shortycut.Hashtable();
            var table = data.split(FaviconCache.LINE_SEPARATOR)
                .map(function (line) { return line.split(FaviconCache.COLUMN_SEPARATOR); });
            for (var _i = 0, table_1 = table; _i < table_1.length; _i++) {
                var row = table_1[_i];
                if (1 === row.length % FaviconCache.COLUMNS_PER_ENTRY) {
                    var origins = cache.computeIfAbsent(row[0], function () { return new shortycut.Hashtable(); });
                    for (var offset = 1; offset + FaviconCache.COLUMNS_PER_ENTRY <= row.length; offset += FaviconCache.COLUMNS_PER_ENTRY) {
                        origins.put(row[offset], new FaviconCacheEntry(row[offset + FaviconCache.FILENAME_OFFSET], parseInt(row[offset + FaviconCache.TIMESTAMP_OFFSET])));
                    }
                }
                else {
                    return new shortycut.Hashtable();
                }
            }
            return cache;
        };
        FaviconCache.prototype.deleteStorage = function () {
            if (this.storage) {
                for (var index = 0;; index++) {
                    var key = this.getStorageKey(index);
                    if (!this.storage.getItem(key)) {
                        break;
                    }
                    this.storage.removeItem(key);
                }
            }
        };
        FaviconCache.prototype.writeStorage = function (data) {
            if (!this.storage) {
                return;
            }
            this.deleteStorage();
            var index = 0;
            var size = data.length;
            while (data) {
                try {
                    while (data) {
                        this.storage.setItem(this.getStorageKey(index), data.substring(0, size));
                        data = data.substring(size);
                        size = Math.min(size, data.length);
                        index++;
                    }
                }
                catch (exception) {
                    if (size < FaviconCache.MIN_STORAGE_ITEM_SIZE) {
                        throw exception;
                    }
                }
                size = Math.min(Math.ceil(size / FaviconCache.TWO), data.length);
            }
        };
        FaviconCache.prototype.readStorage = function () {
            var result = "";
            if (this.storage) {
                for (var index = 0, segment = this.storage.getItem(this.getStorageKey(index)); segment; segment = this.storage.getItem(this.getStorageKey(index - 1))) {
                    result += segment;
                    index++;
                }
            }
            return result;
        };
        FaviconCache.prototype.canWriteToStorage = function () {
            var _this = this;
            var key = this.getStorageKey(-1);
            var value = "0.8802878642890799";
            var canWrite = false;
            shortycut.runAndIgnoreErrors(function () {
                if (_this.storage) {
                    _this.storage.setItem(key, value);
                    canWrite = value === _this.storage.getItem(key);
                }
            });
            shortycut.runAndIgnoreErrors(function () { return _this.storage ? _this.storage.removeItem(key) : void (0); });
            return canWrite;
        };
        FaviconCache.prototype.getStorageKey = function (index) {
            return "shortycut.favicon-cache" + (index ? ".".concat(index) : "");
        };
        FaviconCache.LINE_SEPARATOR = "\n";
        FaviconCache.COLUMN_SEPARATOR = "\t";
        FaviconCache.MIN_STORAGE_ITEM_SIZE = 100;
        FaviconCache.CACHE_EXPIRY_DAYS = 14;
        FaviconCache.MS_PER_SECOND = 1000;
        FaviconCache.SECONDS_PER_MINUTE = 60;
        FaviconCache.MINUTES_PER_HOUR = 60;
        FaviconCache.HOURS_PER_DAY = 24;
        FaviconCache.MS_PER_MINUTE = FaviconCache.SECONDS_PER_MINUTE * FaviconCache.MS_PER_SECOND;
        FaviconCache.MS_PER_HOUR = FaviconCache.MINUTES_PER_HOUR * FaviconCache.MS_PER_MINUTE;
        FaviconCache.MS_PER_DAY = FaviconCache.HOURS_PER_DAY * FaviconCache.MS_PER_HOUR;
        FaviconCache.FIVE = 5;
        FaviconCache.MS_PER_FIVE_SECONDS = FaviconCache.FIVE * FaviconCache.MS_PER_SECOND;
        FaviconCache.MS_PER_FIVE_MINUTES = FaviconCache.FIVE * FaviconCache.MS_PER_MINUTE;
        FaviconCache.TWO = 2;
        FaviconCache.FILENAME_OFFSET = 1;
        FaviconCache.TIMESTAMP_OFFSET = 2;
        FaviconCache.COLUMNS_PER_ENTRY = 3;
        return FaviconCache;
    }());
    shortycut.FaviconCache = FaviconCache;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var MAX_PARALLEL_FAVICON_JOBS = 10;
    var FaviconOriginType = (function () {
        function FaviconOriginType(isFetchService, isWebsite, isOffline) {
            this.isFetchService = isFetchService;
            this.isWebsite = isWebsite;
            this.isOffline = isOffline;
        }
        FaviconOriginType.values = new Array();
        FaviconOriginType.CACHE_OFFLINE = new FaviconOriginType(false, false, true);
        FaviconOriginType.CACHE_ONLINE = new FaviconOriginType(false, false, false);
        FaviconOriginType.WEBSITE = new FaviconOriginType(false, true, false);
        FaviconOriginType.FETCH_SERVICE = new FaviconOriginType(true, false, false);
        return FaviconOriginType;
    }());
    var FaviconLoadScope = (function () {
        function FaviconLoadScope() {
            var originTypes = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                originTypes[_i] = arguments[_i];
            }
            this.originTypes = originTypes;
        }
        FaviconLoadScope.OFFLINE = new FaviconLoadScope(FaviconOriginType.CACHE_OFFLINE);
        FaviconLoadScope.ONLINE = new FaviconLoadScope(FaviconOriginType.CACHE_OFFLINE, FaviconOriginType.WEBSITE);
        FaviconLoadScope.FETCH_SERVICE = new FaviconLoadScope(FaviconOriginType.FETCH_SERVICE);
        FaviconLoadScope.PRIORITY = new FaviconLoadScope(FaviconOriginType.CACHE_OFFLINE, FaviconOriginType.FETCH_SERVICE, FaviconOriginType.WEBSITE);
        return FaviconLoadScope;
    }());
    var FaviconLoadJob = (function () {
        function FaviconLoadJob(url) {
            this.url = url;
            this.status = "new";
            this.observers = new Array();
        }
        FaviconLoadJob.prototype.addObserver = function (file) {
            if ("loaded" === this.status) {
                file.onResolved();
            }
            else if ("failed" === this.status) {
                file.onRejected();
            }
            else {
                this.observers.push(file);
            }
        };
        Object.defineProperty(FaviconLoadJob.prototype, "isNew", {
            get: function () {
                return "new" === this.status;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FaviconLoadJob.prototype, "isLoading", {
            get: function () {
                return "loading" === this.status;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FaviconLoadJob.prototype, "isFinished", {
            get: function () {
                return this.isLoaded || this.hasFailed;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FaviconLoadJob.prototype, "isLoaded", {
            get: function () {
                return "loaded" === this.status;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FaviconLoadJob.prototype, "hasFailed", {
            get: function () {
                return "failed" === this.status;
            },
            enumerable: false,
            configurable: true
        });
        FaviconLoadJob.prototype.startLoad = function () {
            var _this = this;
            if ("new" !== this.status) {
                return false;
            }
            this.status = "loading";
            shortycut.create("img", function (element) {
                element.addEventListener("load", function () { return _this.onLoadEnd(true); });
                element.addEventListener("error", function () { return _this.onLoadEnd(false); });
                element.src = _this.url;
            });
            return true;
        };
        FaviconLoadJob.prototype.onLoadEnd = function (success) {
            var _a;
            this.status = success ? "loaded" : "failed";
            this.observers.forEach(function (observer) { return success ? observer.onResolved() : observer.onRejected(); });
            (_a = this.observers[0]) === null || _a === void 0 ? void 0 : _a.origin.domain.registry.startNextLoad();
        };
        return FaviconLoadJob;
    }());
    var FaviconFile = (function () {
        function FaviconFile(origin, name, url) {
            this.origin = origin;
            this.name = name;
            this.url = url;
            this.job = origin.domain.registry.jobs.computeIfAbsent(url, function () { return new FaviconLoadJob(url); });
            this.job.addObserver(this);
        }
        FaviconFile.prototype.onResolved = function () {
            this.origin.onResolved(this);
        };
        FaviconFile.prototype.onRejected = function () {
            this.origin.onRejected(this);
        };
        return FaviconFile;
    }());
    var FaviconOrigin = (function () {
        function FaviconOrigin(domain, name, type, url) {
            var _this = this;
            this.domain = domain;
            this.name = name;
            this.type = type;
            this.url = url;
            this.files = new Array();
            if (type.isFetchService) {
                var urlWithoutPort = this.url.replace(/%s/g, this.domain.name.replace(/:\d+$/, ""));
                this.files = [new FaviconFile(this, urlWithoutPort, urlWithoutPort)];
            }
            else {
                var basename_1 = type.isWebsite ? "favicon" : this.domain.name.replace(/:/g, "!");
                this.files = FaviconOrigin.EXTENSIONS
                    .map(function (extension) { return "".concat(basename_1, ".").concat(extension); })
                    .map(function (filename) { return new FaviconFile(_this, filename, _this.url.replace(/%s/g, filename)); });
            }
        }
        Object.defineProperty(FaviconOrigin.prototype, "isLoading", {
            get: function () {
                return !!this.files.filter(function (location) { return location.job.isLoading; }).length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FaviconOrigin.prototype, "isResolved", {
            get: function () {
                return !!this.resolvedFile;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FaviconOrigin.prototype, "isRejected", {
            get: function () {
                return !this.isResolved && !this.files.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FaviconOrigin.prototype, "resolvedUrl", {
            get: function () {
                var _a;
                return (_a = this.resolvedFile) === null || _a === void 0 ? void 0 : _a.url;
            },
            enumerable: false,
            configurable: true
        });
        FaviconOrigin.prototype.startNextLoad = function (includeNonCached, includeAllExtensions) {
            var _a, _b;
            if (this.isResolved || this.isRejected) {
                return false;
            }
            if (this.domain.registry.readCache) {
                var filename_1 = this.domain.registry.cache.get(this.domain.name, this.name);
                if (filename_1 && ((_a = this.files.filter(function (file) { return file.name === filename_1; })[0]) === null || _a === void 0 ? void 0 : _a.job.startLoad())) {
                    return true;
                }
            }
            if (includeNonCached) {
                for (var _i = 0, _c = this.files.filter(function (currentFile) { return currentFile.name.match(/ico$/i); }); _i < _c.length; _i++) {
                    var file = _c[_i];
                    if (file.job.startLoad()) {
                        return true;
                    }
                }
            }
            return includeAllExtensions && ((_b = this.files.filter(function (file) { return file.job.isNew; })[0]) === null || _b === void 0 ? void 0 : _b.job.startLoad());
        };
        FaviconOrigin.prototype.onResolved = function (file) {
            if (!this.resolvedFile) {
                this.resolvedFile = file;
                if (!this.type.isFetchService) {
                    this.domain.registry.cache.set(this.domain.name, this.name, this.resolvedFile.name);
                }
                this.domain.onOriginResolved(this);
            }
        };
        FaviconOrigin.prototype.onRejected = function (file) {
            this.files = this.files.filter(function (currentFile) { return currentFile.name !== file.name; });
            if (!this.files.length) {
                this.domain.registry.cache.set(this.domain.name, this.name, "");
                this.domain.onOriginRejected(this);
            }
        };
        FaviconOrigin.EXTENSIONS = ["ico", "png", "jpg", "gif", "svg", "jpeg"];
        return FaviconOrigin;
    }());
    var FaviconDomain = (function () {
        function FaviconDomain(registry, name, protocols, isPrimary) {
            this.registry = registry;
            this.name = name;
            this.protocols = protocols;
            this.isPrimary = isPrimary;
            this.origins = new shortycut.Hashtable();
            this.subDomains = new shortycut.Hashtable();
            this.observers = new Array();
            this.createOrigins();
            this.createParentDomain();
            this.displayName = this.name.replace(/^www\./i, "");
        }
        FaviconDomain.prototype.createOrigins = function () {
            var _this = this;
            for (var _i = 0, _a = this.protocols; _i < _a.length; _i++) {
                var protocol = _a[_i];
                var url = "".concat(protocol, "://").concat(this.name, "/%s");
                this.origins.put(protocol, new FaviconOrigin(this, protocol, FaviconOriginType.WEBSITE, url));
            }
            shortycut.config.favicons.localFolders.forEach(function (origin) {
                if (!origin.match(/^[a-z]+:\/\//i)) {
                    origin = "".concat(window.location.href.replace(/\/[^/]+$/, ""), "/").concat(origin);
                }
                origin = origin.replace(/\/$/, "");
                var type = origin.match(/^file:/) ? FaviconOriginType.CACHE_OFFLINE : FaviconOriginType.CACHE_ONLINE;
                _this.origins.put(origin, new FaviconOrigin(_this, origin, type, "".concat(origin, "/%s")));
            });
            if (shortycut.config.favicons.fetchService) {
                var url = shortycut.config.favicons.fetchService;
                this.origins.put(url, new FaviconOrigin(this, url, FaviconOriginType.FETCH_SERVICE, url));
            }
            if (this.registry.readCache) {
                this.origins.keys
                    .filter(function (origin) { return "" === _this.registry.cache.get(_this.name, origin); })
                    .forEach(function (origin) { return _this.origins.delete(origin); });
            }
        };
        FaviconDomain.prototype.createParentDomain = function () {
            var parentDomain = this.name.replace(/^[^.]+\./, "");
            if (parentDomain !== this.name) {
                this.parentDomain = this.registry.addDomain(parentDomain, this.protocols, false);
                this.parentDomain.subDomains.put(this.name, this);
            }
        };
        FaviconDomain.prototype.startNextLoad = function (scope) {
            var _this = this;
            var _a;
            if (this.isLoading) {
                return false;
            }
            var types = scope.originTypes.filter(function (type) { return _this.isPrimary || !type.isWebsite; });
            var _loop_1 = function (type) {
                for (var _b = 0, _c = this_1.origins.values.filter(function (currentOrigin) { return currentOrigin.type === type; }); _b < _c.length; _b++) {
                    var origin_1 = _c[_b];
                    if (this_1.startNextLoadPrioritized(origin_1)) {
                        return { value: true };
                    }
                }
            };
            var this_1 = this;
            for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
                var type = types_1[_i];
                var state_1 = _loop_1(type);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            return !!((_a = this.parentDomain) === null || _a === void 0 ? void 0 : _a.startNextLoad(scope));
        };
        FaviconDomain.prototype.startNextLoadPrioritized = function (origin) {
            for (var _i = 0, _a = [[false, false], [true, false], [true, true]]; _i < _a.length; _i++) {
                var parameters = _a[_i];
                if (origin.startNextLoad(parameters[0], parameters[1])) {
                    return true;
                }
            }
            return false;
        };
        FaviconDomain.prototype.onOriginResolved = function (origin) {
            var _this = this;
            var _a;
            if (!this.resolvedOrigin) {
                this.resolvedOrigin = origin;
                this.notifyObservers((_a = origin.resolvedFile) === null || _a === void 0 ? void 0 : _a.url);
                this.subDomains.values.forEach(function (domain) { return domain.onParentDomainResolved(_this); });
            }
            this.registry.updateFaviconToolsPage();
        };
        FaviconDomain.prototype.onOriginRejected = function (origin) {
            this.origins.delete(origin.name);
            this.registry.updateFaviconToolsPage();
        };
        FaviconDomain.prototype.onParentDomainResolved = function (domain) {
            var _a, _b;
            this.notifyObservers((_b = (_a = domain.resolvedOrigin) === null || _a === void 0 ? void 0 : _a.resolvedFile) === null || _b === void 0 ? void 0 : _b.url);
            this.registry.updateFaviconToolsPage();
        };
        FaviconDomain.prototype.notifyObservers = function (url) {
            if (url) {
                this.observers.forEach(function (img) { return img.src = url; });
                this.observers = [];
            }
        };
        Object.defineProperty(FaviconDomain.prototype, "isLoading", {
            get: function () {
                var _a;
                return !!this.origins.values.filter(function (origin) { return origin.isLoading; }).length || !!((_a = this.parentDomain) === null || _a === void 0 ? void 0 : _a.isLoading);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FaviconDomain.prototype, "isResolved", {
            get: function () {
                var _a;
                return !!(this.resolvedOrigin || ((_a = this.parentDomain) === null || _a === void 0 ? void 0 : _a.isResolved));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FaviconDomain.prototype, "isRejected", {
            get: function () {
                return !this.origins.size && !this.resolvedOrigin && (!this.parentDomain || this.parentDomain.isResolved);
            },
            enumerable: false,
            configurable: true
        });
        FaviconDomain.prototype.getFavicon = function () {
            var _this = this;
            var _a, _b;
            var img = shortycut.create("img");
            var domain = this;
            while (!domain.resolvedOrigin && domain.parentDomain) {
                domain = domain.parentDomain;
            }
            var url = (_b = (_a = domain.resolvedOrigin) === null || _a === void 0 ? void 0 : _a.resolvedFile) === null || _b === void 0 ? void 0 : _b.url;
            if (url) {
                img.src = url;
            }
            else {
                this.observers.push(img);
            }
            return shortycut.create("div.favicon", img, function (element) {
                element.dataset["domain"] = _this.name;
            });
        };
        return FaviconDomain;
    }());
    var FaviconRegistry = (function () {
        function FaviconRegistry(cache, readCache, preload, protocolsPerDomain) {
            var _this = this;
            this.cache = cache;
            this.readCache = readCache;
            this.preload = preload;
            this.jobs = new shortycut.Hashtable();
            this.domains = new shortycut.Hashtable();
            protocolsPerDomain.entries.forEach(function (entry) { return _this.addDomain(entry.key, entry.value, true); });
            this.startNextLoad();
        }
        FaviconRegistry.prototype.addDomain = function (domain, protocols, isPrimary) {
            var _this = this;
            var faviconDomain = this.domains.computeIfAbsent(domain, function () { return new FaviconDomain(_this, domain, protocols, isPrimary); });
            faviconDomain.isPrimary = faviconDomain.isPrimary || isPrimary;
            return faviconDomain;
        };
        FaviconRegistry.prototype.setCurrentlyDisplayedDomains = function (domains) {
            var _this = this;
            this.currentlyDisplayedDomains = domains.map(function (domain) { return _this.domains.get(domain); }).filter(function (domain) { return !!domain; });
            this.startNextLoad();
        };
        FaviconRegistry.prototype.removeCurrentlyDisplayedDomains = function () {
            delete this.currentlyDisplayedDomains;
            this.startNextLoad();
        };
        FaviconRegistry.prototype.startNextLoad = function () {
            var _a, _b;
            (_a = this.currentlyDisplayedDomains) === null || _a === void 0 ? void 0 : _a.filter(function (domain) { return !domain.isResolved; }).forEach(function (domain) { return domain.startNextLoad(FaviconLoadScope.PRIORITY); });
            if (((_b = this.currentlyDisplayedDomains) === null || _b === void 0 ? void 0 : _b.filter(function (domain) { return domain.isLoading; }).length) || !this.preload) {
                return;
            }
            var remainingJobs = Math.max(0, MAX_PARALLEL_FAVICON_JOBS - this.currentJobCount);
            for (var _i = 0, _c = [FaviconLoadScope.OFFLINE, FaviconLoadScope.ONLINE, FaviconLoadScope.FETCH_SERVICE]; _i < _c.length; _i++) {
                var scope = _c[_i];
                var domains = this.domains.values.filter(function (domain) { return domain.isPrimary && !domain.isResolved; });
                for (var _d = 0, domains_1 = domains; _d < domains_1.length; _d++) {
                    var domain = domains_1[_d];
                    if (!remainingJobs) {
                        return;
                    }
                    if (domain.startNextLoad(scope)) {
                        remainingJobs--;
                    }
                }
                if (this.currentJobCount) {
                    return;
                }
            }
        };
        Object.defineProperty(FaviconRegistry.prototype, "currentJobCount", {
            get: function () {
                return this.jobs.values.filter(function (job) { return job.isLoading; }).length;
            },
            enumerable: false,
            configurable: true
        });
        FaviconRegistry.prototype.getFavicon = function (domain) {
            return this.domains.get(domain).getFavicon();
        };
        FaviconRegistry.prototype.updateFaviconToolsPage = function () {
            shortycut.pages.faviconTools.refreshPageContent();
        };
        return FaviconRegistry;
    }());
    var FaviconManager = (function () {
        function FaviconManager() {
            var _this = this;
            this.domains = new shortycut.Hashtable();
            this.cache = new shortycut.FaviconCache();
            shortycut.shortcuts.values.forEach(function (shortcut) {
                shortcut.all.map(function (item) { return item.link; }).map(function (link) { return link.faviconUrls; }).forEach(function (urls) {
                    urls.forEach(function (url) {
                        var _a = FaviconManager.extractProtocolAndDomain(url), protocol = _a.protocol, domain = _a.domain;
                        if ("file" !== protocol) {
                            var protocols = _this.domains.computeIfAbsent(domain, function () { return new Array(); });
                            if (!protocols.filter(function (currentProtocol) { return currentProtocol === protocol; }).length) {
                                "https" === protocol ? protocols.unshift(protocol) : protocols.push(protocol);
                            }
                        }
                    });
                });
            });
            this.registry = new FaviconRegistry(this.cache, true, false, this.domains);
        }
        FaviconManager.extractProtocolAndDomain = function (url) {
            return {
                protocol: shortycut.assertNotNull(url.match(/^([a-z]+:\/\/)?/i))[0]
                    .replace(/:.*/, "")
                    .toLocaleLowerCase() || "http",
                domain: url.toLocaleLowerCase().replace(/^([a-z]+:\/\/+)?/i, "").replace(/\/.*/, "").toLowerCase()
            };
        };
        FaviconManager.prototype.startPreload = function () {
            this.registry.preload = true;
            this.registry.readCache = true;
            this.registry.startNextLoad();
        };
        FaviconManager.prototype.startFullRescan = function () {
            this.registry.preload = false;
            this.registry = new FaviconRegistry(this.cache, false, true, this.domains);
            this.registry.updateFaviconToolsPage();
        };
        FaviconManager.prototype.setCurrentlyDisplayedLinks = function (urls) {
            var domains = urls.map(function (url) { return FaviconManager.extractProtocolAndDomain(url).domain; });
            this.registry.setCurrentlyDisplayedDomains(domains);
        };
        FaviconManager.prototype.removeCurrentlyDisplayedLinks = function () {
            this.registry.removeCurrentlyDisplayedDomains();
        };
        FaviconManager.prototype.getFavicon = function (url) {
            var createDiv = function (url) { return shortycut.create("div.favicon", shortycut.createImage(url)); };
            if (url === null || url === void 0 ? void 0 : url.trim()) {
                var _a = FaviconManager.extractProtocolAndDomain(url), protocol = _a.protocol, domain = _a.domain;
                return "file" === protocol ? createDiv("resources/local.svg") : this.registry.getFavicon(domain);
            }
            else {
                return createDiv("resources/unknown.svg");
            }
        };
        FaviconManager.prototype.getPendingDomains = function () {
            var _this = this;
            return this.registry.domains.values
                .filter(function (domain) { return domain.isPrimary && !domain.isResolved && !domain.isRejected; })
                .map(function (domain) { return domain.displayName; })
                .sort(function (domain1, domain2) { return _this.compare(domain1, domain2); });
        };
        FaviconManager.prototype.getMissingDomains = function () {
            var _this = this;
            var domains = this.registry.domains.values
                .filter(function (domain) { return domain.isPrimary && domain.isRejected; })
                .map(function (domain) { return domain.displayName; });
            this.registry.domains.values.filter(function (domain) { return domain.isPrimary && domain.isResolved; }).forEach(function (domain) {
                var _a, _b, _c;
                while (!domain.resolvedOrigin && domain.parentDomain) {
                    domain = domain.parentDomain;
                }
                if (!((_b = (_a = domain.resolvedOrigin) === null || _a === void 0 ? void 0 : _a.resolvedFile) === null || _b === void 0 ? void 0 : _b.job.url) || ((_c = domain.resolvedOrigin) === null || _c === void 0 ? void 0 : _c.type.isFetchService)) {
                    domains.push(domain.displayName);
                }
            });
            return domains.sort(function (domain1, domain2) { return _this.compare(domain1, domain2); });
        };
        FaviconManager.prototype.getOnlineDomains = function () {
            var _this = this;
            var files = new shortycut.Hashtable();
            var domains = this.registry.domains.values.filter(function (domain) { return domain.isPrimary && domain.isResolved; });
            domains.forEach(function (domain) {
                var _a, _b, _c, _d;
                while (!domain.resolvedOrigin && domain.parentDomain) {
                    domain = domain.parentDomain;
                }
                if (((_b = (_a = domain.resolvedOrigin) === null || _a === void 0 ? void 0 : _a.resolvedFile) === null || _b === void 0 ? void 0 : _b.job.url) && domain.resolvedOrigin.type.isWebsite) {
                    var name_1 = domain.displayName.replace(/:/g, "!");
                    var extension = (_d = (_c = domain.resolvedOrigin) === null || _c === void 0 ? void 0 : _c.resolvedFile.name.replace(/^.*\./, "")) !== null && _d !== void 0 ? _d : "ico";
                    files.put("".concat(name_1, ".").concat(extension), domain.resolvedOrigin.resolvedFile.job.url);
                }
            });
            return files.entries
                .map(function (entry) { return { filename: entry.key, url: entry.value }; })
                .sort(function (a, b) { return _this.compare(a.filename, b.filename); });
        };
        FaviconManager.prototype.getOfflineDomains = function () {
            var _this = this;
            var files = new shortycut.Hashtable();
            var prefix = window.location.href.replace(/\/[^/]+$/, "") + "/";
            this.registry.domains.values.filter(function (domain) { return domain.isPrimary && domain.isResolved; }).forEach(function (domain) {
                var _a, _b, _c, _d;
                while (!domain.resolvedOrigin && domain.parentDomain) {
                    domain = domain.parentDomain;
                }
                if (((_b = (_a = domain.resolvedOrigin) === null || _a === void 0 ? void 0 : _a.resolvedFile) === null || _b === void 0 ? void 0 : _b.job.url) && domain.resolvedOrigin.type.isOffline) {
                    var url = (_d = (_c = domain.resolvedOrigin) === null || _c === void 0 ? void 0 : _c.resolvedFile) === null || _d === void 0 ? void 0 : _d.job.url;
                    files.put(url.substring(0 === url.indexOf(prefix) ? prefix.length : 0), url);
                }
            });
            return files.entries
                .map(function (entry) { return { path: entry.key, url: entry.value }; })
                .sort(function (item1, item2) { return _this.compare(item1.path, item2.path); });
        };
        FaviconManager.prototype.compare = function (s1, s2) {
            if (s1 < s2) {
                return -1;
            }
            else {
                return s1 === s2 ? 0 : 1;
            }
        };
        return FaviconManager;
    }());
    shortycut.FaviconManager = FaviconManager;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    function initialize() {
        window.addEventListener("error", function (exception) { return shortycut.startupCache.exceptions.push(exception); });
        if (document && document.title !== undefined) {
            document.title = "...";
        }
        window.addEventListener("DOMContentLoaded", function () {
            document.title = "...";
            ["icon", "shortcut icon"].forEach(function (rel) { return addLink(rel, "image/x-icon", "resources/favicon.ico", ""); });
            addLink("search", "application/opensearchdescription+xml", "data/search.xml", "ShortyCut");
        });
        shortycut.javaScriptLoader = new shortycut.JavaScriptLoader();
        window.addEventListener("load", function () { return shortycut.handleExceptions(shortycut.displayError, function () { return shortycut.javaScriptLoader.onComplete(startApplication); }); });
    }
    shortycut.initialize = initialize;
    function addLink(rel, type, href, title) {
        var link = document.createElement("link");
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
        var self = window.location.href.replace(/[?#].*/, "");
        document.body.innerHTML = document.body.innerHTML.replace(/self:\/\//g, self);
        shortycut.initializeVariables();
        shortycut.applyAndValidateConfig();
        if (!shortycut.startupCache.config.length && !shortycut.queryParameters.setup) {
            window.location.href = "".concat(window.location.href.replace(/[#?].*/, ""), "?").concat(shortycut.QueryParameters.SETUP, "=welcome");
            return;
        }
        shortycut.parseShortcuts(function (result) { return shortycut.handleExceptions(shortycut.displayError, function () { return onParseShortcutsComplete(result); }); });
    }
    function onParseShortcutsComplete(result) {
        if (result instanceof shortycut.Exception) {
            throw result;
        }
        else {
            if (shortycut.queryParameters.facets.newTabs) {
                addBlankTargetToAllLinksOnPage();
            }
            shortycut.faviconManager = new shortycut.FaviconManager();
            shortycut.redirector.processQuery();
        }
    }
    function addBlankTargetToAllLinksOnPage() {
        var links = document.getElementsByTagName("a");
        for (var index = 0; index < links.length; index++) {
            var link = links.item(index);
            if (link) {
                link.target = "_blank";
            }
        }
    }
})(shortycut || (shortycut = {}));
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
            var shortcut = shortycut.shortcuts.get(shortycut.queryParameters.keyword) || undefined;
            var setup = shortycut.queryParameters.setup, redirect = shortycut.queryParameters.redirect;
            var isHomepageKeyword = shortycut.config.homepage.keywords.some(function (keyword) { return keyword === shortycut.queryParameters.keyword; });
            if (setup) {
                document.title = "ShortyCut";
                this.showSetupPage(setup);
            }
            else if (redirect) {
                this.processAuxiliaryRedirect(redirect);
            }
            else if (shortcut) {
                this.processShortcut(shortcut);
            }
            else if (shortycut.isUrl(shortycut.queryParameters.fullQuery)) {
                this.openUrl(shortycut.queryParameters.fullQuery, RedirectMode.ERASE_HISTORY);
            }
            else if (!shortycut.queryParameters.keyword
                || !shortycut.defaultSearchEngine
                || !shortycut.config.defaultSearchEngine.useInAddressBar
                || isHomepageKeyword) {
                this.openHomepage(isHomepageKeyword);
            }
            else {
                var links = shortycut.defaultSearchEngine.getFinalizedLinks(shortycut.queryParameters.fullQuery);
                this.redirect(__assign(__assign({}, links), { onMultiLink: shortycut.OnMultiLink.OPEN_IN_NEW_TAB }), RedirectMode.ERASE_HISTORY);
            }
        };
        Redirector.prototype.processAuxiliaryRedirect = function (redirect) {
            var url = redirect.url, postFields = redirect.postFields;
            var permalink = shortycut.Link.constructFinalizedPermalink(url, postFields);
            var finalizedLinks = {
                onMultiLink: shortycut.OnMultiLink.OPEN_IN_NEW_TAB,
                links: [{ htmlDescription: "", urls: [{ url: url, postFields: postFields, permalink: permalink }] }]
            };
            this.redirect(finalizedLinks, RedirectMode.ERASE_HISTORY);
        };
        Redirector.prototype.openHomepage = function (isHomepageKeyword) {
            this.alwaysOpenNewTabs = shortycut.queryParameters.facets.newTabs;
            this.showRedirectPage = false;
            document.title = "ShortyCut";
            var query = isHomepageKeyword
                ? shortycut.queryParameters.fullQuery.replace(/^\s*[^\s]+/, "").trim()
                : shortycut.queryParameters.fullQuery;
            shortycut.router.goto(shortycut.pages.home.populate(query));
            if (shortycut.queryParameters.facets.noFocus) {
                shortycut.pages.home.removeFocus();
            }
        };
        Redirector.prototype.processShortcut = function (shortcut) {
            if (shortcut.queries && (shortycut.queryParameters.searchTerm || !shortcut.bookmarks)) {
                this.redirect(shortcut.getFinalizedQueries(shortycut.queryParameters.searchTerm), RedirectMode.ERASE_HISTORY);
            }
            else if (shortcut.bookmarks) {
                this.redirect(shortcut.getFinalizedBookmarks(), RedirectMode.ERASE_HISTORY);
            }
            else {
                throw new shortycut.Exception("Internal error", "Found no links to use for redirection");
            }
        };
        Redirector.prototype.redirect = function (finalizedLinks, mode) {
            var _a, _b;
            var urls = this.flattenUrls(finalizedLinks);
            var htmlDescription = (_b = (_a = finalizedLinks.links[0]) === null || _a === void 0 ? void 0 : _a.htmlDescription) !== null && _b !== void 0 ? _b : "";
            if (1 === urls.length) {
                this.openLink(htmlDescription, urls[0], mode);
            }
            else if (1 < finalizedLinks.links.length && finalizedLinks.onMultiLink === shortycut.OnMultiLink.SHOW_MENU) {
                this.showRedirectPage = false;
                setTimeout(function () { return shortycut.router.goto(shortycut.pages.shortlist.populate(finalizedLinks)); }, 0);
            }
            else {
                if (this.alwaysOpenNewTabs) {
                    urls.forEach(function (link) { return window.open(link.permalink); });
                    shortycut.router.goBackToAndResetHomepage();
                }
                else {
                    urls.slice(1).forEach(function (link) { return window.open(link.permalink); });
                    this.openLink(htmlDescription, urls[0], mode);
                }
            }
        };
        Redirector.prototype.flattenUrls = function (finalizedLinks) {
            var finalizedUrls = new Array();
            finalizedLinks.links.forEach(function (link) { return link.urls.forEach(function (url) { return finalizedUrls.push(url); }); });
            return finalizedUrls;
        };
        Redirector.prototype.openLink = function (htmlDescription, url, mode) {
            if (this.showRedirectPage) {
                shortycut.router.goto(shortycut.pages.redirect.populate(htmlDescription, url.url));
            }
            if (url.postFields) {
                if (RedirectMode.NEW_TAB === mode || this.alwaysOpenNewTabs) {
                    this.openUrl(url.permalink, mode);
                }
                else {
                    this.submitForm(url);
                }
            }
            else {
                this.openUrl(url.url, mode);
            }
        };
        Redirector.prototype.openUrl = function (url, mode) {
            if (RedirectMode.PRESERVE_HISTORY === mode && !this.alwaysOpenNewTabs) {
                window.location.href = url;
            }
            else if (RedirectMode.ERASE_HISTORY === mode && !this.alwaysOpenNewTabs) {
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
            var form = document.createElement("form");
            form.action = link.url;
            form.method = "post";
            form.style.display = "none";
            for (var _i = 0, _a = (link.postFields || []); _i < _a.length; _i++) {
                var field = _a[_i];
                var input = document.createElement("input");
                input.type = "text";
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
            window.addEventListener("hashchange", this.onHashChange);
            document.addEventListener("keydown", this.onKeyDown);
        }
        Router.prototype.goto = function (page) {
            this.history.length = this.getCurrentHistoryIndex() + 1;
            this.history.push(page);
            if (1 === this.history.length) {
                this.showIndex(0);
            }
            else {
                window.location.hash = "".concat(this.history.length - 1);
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
            var index = parseInt(window.location.hash.replace("#", ""));
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
            if (("Escape" === event.key || "Esc" === event.key)) {
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
            this.status = "waiting";
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
                var _a, _b;
                var result = (_a = window.shortycutJavaScriptLoaderFiles) !== null && _a !== void 0 ? _a : new shortycut.Hashtable();
                (_b = window.shortycutJavaScriptLoaderFiles) !== null && _b !== void 0 ? _b : (window.shortycutJavaScriptLoaderFiles = result);
                return result;
            },
            enumerable: false,
            configurable: true
        });
        JavaScriptLoader.prototype.add = function (url, dependencies) {
            var file = this.files.computeIfAbsent(url, function (requestedUrl) { return new JavaScriptFile(requestedUrl, []); });
            dependencies === null || dependencies === void 0 ? void 0 : dependencies.forEach(function (dependency) { return file.dependencies.push(dependency); });
            this.checkDependenciesAndLoadFiles();
            return file;
        };
        JavaScriptLoader.prototype.checkDependenciesAndLoadFiles = function () {
            var _this = this;
            var files = this.files.values;
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                if (file.status === "waiting" && !file.dependencies.filter(function (dep) { return dep.status !== "completed"; }).length) {
                    this.startLoad(file);
                }
            }
            var waitingFiles = files.filter(function (file) { return file.status === "waiting"; });
            var hasWaitingFiles = !!waitingFiles.length;
            var hasLoadingFiles = !!files.filter(function (file) { return file.status === "loading"; }).length;
            if (!hasWaitingFiles && !hasLoadingFiles && this.onCompleteHandler) {
                this.onCompleteHandler();
            }
            if (hasWaitingFiles && !hasLoadingFiles) {
                shortycut.startupCache.initializationErrors.push(new shortycut.ScriptLoadingError("\n                    There's a cyclic dependency (&quot;deadlock&quot;) between the following JavaScript files:\n                    ".concat((waitingFiles).map(function (file) { return shortycut.sanitize(file.url); }).join(" and "), "\n                ").trim()));
                waitingFiles.forEach(function (file) { return _this.startLoad(file); });
            }
        };
        JavaScriptLoader.prototype.startLoad = function (file) {
            var _this = this;
            file.status = "loading";
            var script = document.createElement("script");
            script.addEventListener("load", function () { return _this.onLoad(file); });
            script.addEventListener("error", function () { return _this.onError(file); });
            script.type = "text/javascript";
            script.src = file.url.match(/^[a-z]+:\/\/.*/i) ? file.url : "data/".concat(file.url);
            document.getElementsByTagName("head")[0].appendChild(script);
        };
        JavaScriptLoader.prototype.onLoad = function (file) {
            file.status = "completed";
            this.checkDependenciesAndLoadFiles();
        };
        JavaScriptLoader.prototype.onError = function (file) {
            file.status = "completed";
            shortycut.startupCache.initializationErrors.push(new shortycut.ScriptLoadingError("Failed to load ".concat(shortycut.sanitize(file.url))));
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
    var SHORTCUTS_PER_BATCH = 2000;
    function parseShortcuts(callback) {
        shortycut.handleExceptions(callback, function () {
            var lines = new Array();
            shortycut.startupCache.shortcuts.forEach(function (shortcut) { return lines.push.apply(lines, shortcut.split(/\r?\n/)); });
            var parser = new shortycut.ShortcutParser();
            parseBatch(parser, lines, 0, SHORTCUTS_PER_BATCH, shortycut.shortcuts, callback);
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
    var JSON_TAB_SIZE = 4;
    shortycut.DEFAULT_CONFIG = {
        shortcutFormat: {
            comment: "//",
            keyword: {
                caseSensitive: false,
                openingDelimiter: "[",
                separator: "|",
                closingDelimiter: "]",
            },
            enableGrouping: false,
            hotkeyMarker: "",
            url: {
                searchTermPlaceholder: "%s",
                postIndicator: "?POST?",
                multiLinkIndicator: {
                    replacePrevious: "=",
                    openInNewTab: "^",
                    showMenu: "?",
                    searchBucket: "#",
                    default: "showMenu"
                }
            }
        },
        homepage: {
            keywords: ["?", "help", "home", "homepage", "sc", "shortycut"],
            suggestions: {
                showKeywords: true,
                showHotkeys: true,
                showFavicons: true,
            }
        },
        defaultSearchEngine: {
            keyword: "defaultsearchengine",
            useInAddressBar: true,
            useOnHomepage: true
        },
        favicons: {
            preloadOnStart: true,
            rememberUrls: true,
            fetchService: "https://www.google.com/s2/favicons?sz=32&domain=%s",
            localFolders: ["data/favicons"]
        }
    };
    function applyAndValidateConfig() {
        for (var _i = 0, _a = shortycut.startupCache.config; _i < _a.length; _i++) {
            var currentConfig = _a[_i];
            migrateConfig(currentConfig);
            mergeConfig(shortycut.config, currentConfig, currentConfig);
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
    function migrateConfig(config) {
        var _a, _b, _c;
        var faviconFolders = (_b = (_a = config === null || config === void 0 ? void 0 : config.homepage) === null || _a === void 0 ? void 0 : _a.suggestions) === null || _b === void 0 ? void 0 : _b.faviconFolders;
        if (faviconFolders) {
            delete config.homepage.suggestions.faviconFolders;
            config.favicons = (_c = config.favicons) !== null && _c !== void 0 ? _c : {};
            config.favicons.localFolders = toArray(config.favicons.localFolders);
            toArray(faviconFolders).forEach(function (folder) { return config.favicons.localFolders.push(folder); });
        }
    }
    function mergeConfig(target, patch, patchRoot) {
        shortycut.forEachProperty(patch, function (key, patchValue) {
            var targetValue = shortycut.getProperty(target, key);
            validateBeforeConfigMerge(key, target, targetValue, patchValue);
            if (patchValue && "object" === typeof patchValue && !(patchValue instanceof Array)) {
                mergeConfig(targetValue, patchValue, patchRoot);
            }
            else {
                if ("string" === typeof patchValue) {
                    patchValue = patchValue.trim() || undefined;
                }
                if (null === patchValue) {
                    patchValue = undefined;
                }
                target[key] = "string" === typeof patchValue
                    ? patchValue.trim()
                    : patchValue;
            }
        });
    }
    function validateBeforeConfigMerge(key, target, targetValue, patchValue) {
        return [
            [
                !Object.prototype.hasOwnProperty.call(target, key),
                "is not supported"
            ],
            [
                isObject(targetValue) && !isObject(patchValue),
                "must be a nested object"
            ],
            [
                targetValue instanceof Array && (!patchValue || !(patchValue instanceof Array)),
                "must be an array"
            ],
            [
                "boolean" === typeof targetValue && "boolean" != typeof patchValue,
                "must be boolean (true or false)"
            ],
            [
                isStringy(targetValue) && !isStringy(patchValue),
                "must be a string"
            ],
        ];
    }
    function validateConfig() {
        var onMultiLink = shortycut.config.shortcutFormat.url.multiLinkIndicator;
        var rules = [
            [
                shortycut.config.shortcutFormat.keyword.openingDelimiter && !shortycut.config.shortcutFormat.keyword.closingDelimiter,
                "When using an openingDelimiter, the closingDelimiter must be set as well",
                ["openingDelimiter", "closingDelimiter"]
            ],
            [
                !shortycut.config.shortcutFormat.keyword.openingDelimiter && shortycut.config.shortcutFormat.keyword.closingDelimiter,
                "The closingDelimiter can only be used if the openingDelimiter is set as well",
                ["openingDelimiter", "closingDelimiter"]
            ],
            [
                !shortycut.config.shortcutFormat.url.searchTermPlaceholder,
                "The searchTermPlaceholder must not be empty or null",
                ["searchTermPlaceholder"]
            ],
            [
                !onMultiLink.default
                    || !onMultiLink.default.match(/^(replacePreviousDefinition|openInNewTab|showMenu)$/),
                'default must be "replacePreviousDefinition", "openInNewTab" or "showMenu"',
                ["default"]
            ],
            [
                multiLinkSymbolsOverlap(onMultiLink),
                "The symbols symbols indicating how to handle multiple links per keyword must not overlap",
                ["openInNewTab", "replacePreviousDefinition", "showMenu", "searchBucket"]
            ],
            [
                shortycut.config.homepage.keywords.some(function (shortcut) { return !shortcut.trim(); }),
                "help must not contain empty strings (but the array can be empty)",
                ["homepageKeywords"]
            ],
        ];
        rules.forEach(function (value) {
            var isValid = value[0], errorMessage = value[1], fields = value[2];
            throwConfigExceptionIf(!!isValid, errorMessage, fields);
        });
    }
    function multiLinkSymbolsOverlap(onMultiLink) {
        var symbols = [
            onMultiLink.openInNewTab,
            onMultiLink.replacePrevious,
            onMultiLink.showMenu,
            onMultiLink.searchBucket
        ];
        var overlaps = symbols.filter(function (symbol1, index1) {
            return !!symbols.filter(function (symbol2, index2) { return index1 !== index2 && shortycut.startsWith(symbol1, symbol2); }).length;
        });
        return !!overlaps.length;
    }
    function isObject(value) {
        var isObject = null !== value && undefined !== value && "object" === typeof value;
        return isObject
            && !(value instanceof Array)
            && !(value instanceof Function)
            && !(value instanceof RegExp);
    }
    function isStringy(value) {
        return null === value || undefined === value || "string" === typeof value;
    }
    function toArray(value) {
        if (Array.isArray(value)) {
            return value;
        }
        else if (!value) {
            return [];
        }
        else {
            return [value];
        }
    }
    function throwConfigExceptionIf(condition, description, properties, overrideConfig) {
        if (condition) {
            throwConfigException(description, properties, overrideConfig);
        }
    }
    function throwConfigException(description, properties, overrideConfig) {
        throw new shortycut.Exception("Configuration error", shortycut.create("p", "There's a problem with the configuration:"), shortycut.create("p.errorMessage", description), shortycut.create("p", overrideConfig
            ? "The error occurred while applying the following configuration:"
            : "The configuration (which might include non-overridden default settings) looks like this:"), shortycut.create("pre", renderJson(overrideConfig || shortycut.config, properties)));
    }
    function renderJson(config, properties) {
        replaceRegexpFunctionsAndUndefinedValues(config);
        var result = shortycut.sanitize(JSON.stringify(config, undefined, JSON_TAB_SIZE));
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var property = properties_1[_i];
            result = shortycut.replaceAll(result, "&quot;".concat(property, "&quot;"), "&quot;<span class=\"jsonError\">".concat(property, "</span>&quot;"), true);
        }
        return result;
    }
    function replaceRegexpFunctionsAndUndefinedValues(object) {
        for (var key in object) {
            if (object[key]) {
                if (object[key] instanceof RegExp) {
                    object[key] = "/".concat(object[key].source, "/");
                }
                else if ("function" === typeof object[key]) {
                    object[key] = "".concat(object[key]);
                }
                else if ("object" === typeof object[key]) {
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
    var MAX_LEVEL = 999;
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
                return (_b = (_a = this.children.get(letter)) === null || _a === void 0 ? void 0 : _a.getSuggestions(keyword, maxResults, postKeywordInput)) !== null && _b !== void 0 ? _b : [];
            }
        };
        Object.defineProperty(DictionaryItem.prototype, "children", {
            get: function () {
                var _a;
                var children = (_a = this._children) !== null && _a !== void 0 ? _a : this.initializeChildren();
                this._children = children;
                return children;
            },
            enumerable: false,
            configurable: true
        });
        DictionaryItem.prototype.initializeChildren = function () {
            var _this = this;
            var dictionary = new shortycut.Hashtable();
            this.shortcuts.forEach(function (shortcut) {
                if (_this.level < shortcut.keyword.length) {
                    var letter = shortcut.keyword ? shortcut.keyword.charAt(_this.level) : "";
                    dictionary.computeIfAbsent(letter, function () { return new DictionaryItem(_this.level + 1, []); })
                        .shortcuts.push(shortcut);
                }
            });
            return dictionary;
        };
        DictionaryItem.prototype.childSuggestions = function (maxResults, postKeywordInput) {
            if (!this._suggestions) {
                var shortcuts_2 = this.getChildShortcuts(postKeywordInput ? this.level : MAX_LEVEL);
                this._suggestions = this.calculateChildSuggestions(maxResults, shortcuts_2);
            }
            return this._suggestions;
        };
        DictionaryItem.prototype.calculateChildSuggestions = function (maxResults, shortcuts) {
            var _this = this;
            var matches = new shortycut.Hashtable();
            var count = 0;
            for (var _i = 0, shortcuts_3 = shortcuts; _i < shortcuts_3.length; _i++) {
                var shortcut = shortcuts_3[_i];
                var _loop_2 = function (match) {
                    var nonPartialMatch = matches.values.filter(function (item) { return item.match.keyword === match.keyword; })[0];
                    if (nonPartialMatch) {
                        nonPartialMatch.match.hidesMoreChildren = true;
                        return "continue";
                    }
                    matches.computeIfAbsent(match.fingerprint, function () {
                        count++;
                        return { match: match, shortcuts: [] };
                    }).shortcuts.push(shortcut);
                    if (maxResults <= count) {
                        return "break";
                    }
                };
                for (var _a = 0, _b = shortcut.getSegmentMatches(this.level); _a < _b.length; _a++) {
                    var match = _b[_a];
                    var state_2 = _loop_2(match);
                    if (state_2 === "break")
                        break;
                }
                if (maxResults <= count) {
                    break;
                }
            }
            return matches.values.map(function (match) { return _this.createChildSuggestion(match.match, match.shortcuts); });
        };
        DictionaryItem.prototype.getChildShortcuts = function (maxLength) {
            var _this = this;
            var shortcuts = this.shortcuts.filter(function (shortcut) {
                return _this.level === shortcut.keyword.length && shortcut.keyword.length <= maxLength;
            });
            this.shortcuts
                .filter(function (shortcut) { return _this.level < shortcut.keyword.length && shortcut.keyword.length <= maxLength; })
                .forEach(function (shortcut) { return shortcuts.push(shortcut); });
            return shortcuts;
        };
        DictionaryItem.prototype.createChildSuggestion = function (match, shortcuts) {
            var keyword = "".concat(match.keyword).concat(match.isPartial ? "..." : "");
            var keywordHtml = shortycut.create("div", shortycut.create("span.matched", keyword.substring(0, this.level)), shortycut.create("span.unmatched", keyword.substring(this.level))).innerHTML;
            var descriptionHtmlSuffix = !match.isPartial && shortcuts[0].searchable
                ? " <span class=\"more-indicator-text\">".concat(shortycut.Segments.SEPARATOR_HTML, " ...</span>")
                : "";
            var segmentOrSuggestion = match.isPartial ? "segment" : "suggestion";
            return {
                type: this.level === match.keyword.length ? "match" : segmentOrSuggestion,
                keyword: match.keyword,
                keywordHtml: keywordHtml,
                descriptionHtml: match.descriptionHtml + descriptionHtmlSuffix,
                shortcutType: this.getShortcutType(shortcuts),
                shortcut: shortcuts[0],
                hidesMoreChildren: match.hidesMoreChildren
            };
        };
        DictionaryItem.prototype.getShortcutType = function (shortcuts) {
            if (shortcuts.some(function (shortcut) { return "both" === shortcut.type; })) {
                return "both";
            }
            else if (shortcuts.some(function (shortcut) { return "bookmark" === shortcut.type; })) {
                if (shortcuts.some(function (shortcut) { return "query" === shortcut.type; })) {
                    return "both";
                }
                else {
                    return "bookmark";
                }
            }
            else if (shortcuts.some(function (shortcut) { return "query" === shortcut.type; })) {
                return "query";
            }
            else {
                return "none";
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
        Filter.prototype.fullTextSearch = function (searchTerms, keyword) {
            var result = new Array();
            for (var _i = 0, _a = this.allLinks; _i < _a.length; _i++) {
                var item = _a[_i];
                if (this.maxResults <= result.length) {
                    return result;
                }
                if (!keyword || (item.keyword === keyword && item.isSearchable)) {
                    this.createSuggestion(searchTerms, item, result);
                }
            }
            if (this.maxResults < result.length) {
                result.length = this.maxResults;
            }
            return result;
        };
        Filter.prototype.createSuggestion = function (searchTerms, searchableLink, result) {
            var keywordMask = searchableLink.keyword.split("").map(function () { return false; });
            var descriptionMask = searchableLink.description.split("").map(function () { return false; });
            for (var _i = 0, searchTerms_1 = searchTerms; _i < searchTerms_1.length; _i++) {
                var searchTerm = searchTerms_1[_i];
                var matched = this.markMatch(searchTerm, searchableLink.keywordLowerCase, keywordMask);
                matched = this.markMatch(searchTerm, searchableLink.descriptionLowerCase, descriptionMask) || matched;
                if (!matched) {
                    return;
                }
            }
            result.push({
                type: "search-result",
                keyword: searchableLink.keyword,
                keywordHtml: this.highlightMatch(searchableLink.keyword, keywordMask),
                descriptionHtml: this.highlightMatch(searchableLink.description, descriptionMask),
                shortcutType: searchableLink.link.isQuery ? "query" : "bookmark",
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
            var end = 0;
            for (var start = 0; start < mask.length; start = end) {
                end = start + 1;
                for (; end < mask.length && mask[end - 1] === mask[end]; end++) {
                }
                var section = shortycut.sanitize(text.substring(start, end));
                if (mask[start]) {
                    section = "<span class=\"matched-substring\">".concat(section, "</span>");
                }
                result.push(section);
            }
            return shortycut.replaceAll(result.join(""), shortycut.Segments.SEPARATOR_PLACEHOLDER, shortycut.Segments.SEPARATOR_HTML, false);
        };
        Object.defineProperty(Filter.prototype, "dictionary", {
            get: function () {
                var _a;
                var dictionary = (_a = Filter._dictionary) !== null && _a !== void 0 ? _a : Filter.initializeDictionary();
                Filter._dictionary = dictionary;
                return dictionary;
            },
            enumerable: false,
            configurable: true
        });
        Filter.initializeDictionary = function () {
            return new DictionaryItem(0, shortycut.shortcuts.values.sort(shortycut.comparing(function (s) { var _a, _b; return ((_b = (_a = s.bookmarks) === null || _a === void 0 ? void 0 : _a.current) !== null && _b !== void 0 ? _b : shortycut.assertNotNull(s.queries).current)[0].segments.description; })));
        };
        Object.defineProperty(Filter.prototype, "allLinks", {
            get: function () {
                var _a;
                var allLinks = (_a = Filter._allLinks) !== null && _a !== void 0 ? _a : Filter.initializeLinks();
                Filter._allLinks = allLinks;
                return allLinks;
            },
            enumerable: false,
            configurable: true
        });
        Filter.initializeLinks = function () {
            var _this = this;
            var result = new Array();
            shortycut.shortcuts.values.forEach(function (shortcut) {
                return result.push.apply(result, shortcut.all.filter(function (item) { return _this.includeOverriddenShortcuts || !item.link.overridden; }));
            });
            result.sort(shortycut.comparing((function (item) { return item.link.segments.description; })));
            return result.map(function (item) { return ({
                link: item.link,
                links: item.links,
                keyword: item.link.keyword,
                keywordLowerCase: item.link.keyword.toLocaleLowerCase(),
                description: item.link.segments.descriptionPlaceholder,
                descriptionLowerCase: item.link.segments.descriptionPlaceholder.toLowerCase(),
                shortcut: shortycut.shortcuts.get(item.link.keyword),
                isSearchable: item.link.isSearchable
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
            this.line = "";
            this.description = "";
            this.urlOrDynamicShortcut = "";
            this.isStandardProtocol = false;
            this.onMultiLink = shortycut.OnMultiLink.OPEN_IN_NEW_TAB;
            this.combination = new Array();
        }
        return ParserContext;
    }());
    var ShortcutParser = (function () {
        function ShortcutParser() {
            this.KNOWN_PROTOCOLS = ["file", "ftp", "http", "https", shortycut.dynamicLinkProtocol].map(function (p) { return "".concat(p, "://"); });
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
                        this.handleParserError(exception);
                    }
                }
            }
            if ("defaultsearchengine" === shortycut.config.defaultSearchEngine.keyword) {
                shortcuts.delete(shortycut.config.defaultSearchEngine.keyword);
            }
            if (!shortycut.defaultSearchEngine) {
                shortycut.defaultSearchEngine = new shortycut.Shortcut("config.defaultSearchEngine.keyword", [], shortycut.OnMultiLink.SHOW_MENU, [
                    "https://duckduckgo.com/?q=",
                    shortycut.config.shortcutFormat.url.searchTermPlaceholder,
                    "&kah=us-en%2Chk-tzh&kav=1&kam=google-maps&kak=-1&kax=-1&kaq=-1&kap=-1&kao=-1&kau=-1"
                ].join(""));
            }
        };
        ShortcutParser.prototype.handleParserError = function (exception) {
            if (exception instanceof shortycut.ParserError) {
                shortycut.startupCache.initializationErrors.push(exception);
            }
            else {
                throw exception;
            }
        };
        ShortcutParser.prototype.parseLineAndStoreShortcut = function (context, shortcuts) {
            this.splitDescriptionAndUrl(context);
            this.parseOnMultiLink(context);
            var keywords = this.formKeywords(context, this.parseKeywordsAndDescription(context));
            var hasKeywords = false;
            keywords.entries.filter(function (entry) { return entry.key; }).forEach(function (entry) {
                var keyword = entry.key;
                var sections = entry.value;
                if (shortcuts.get(keyword)) {
                    shortcuts.get(keyword).addLink(keyword, sections, context.onMultiLink, context.urlOrDynamicShortcut);
                }
                else {
                    shortcuts.put(keyword, new shortycut.Shortcut(keyword, sections, context.onMultiLink, context.urlOrDynamicShortcut));
                }
                if (keyword === shortycut.config.defaultSearchEngine.keyword) {
                    shortycut.defaultSearchEngine = shortcuts.get(keyword);
                }
                hasKeywords = true;
            });
            if (!hasKeywords) {
                throw new shortycut.ParserError("Failed to retrieve the keyword", context.line);
            }
            return shortcuts;
        };
        ShortcutParser.prototype.splitDescriptionAndUrl = function (context) {
            var _a = this.getUrl(context.line), url = _a.url, isStandardProtocol = _a.isStandardProtocol;
            context.isStandardProtocol = isStandardProtocol;
            context.urlOrDynamicShortcut = url;
            context.description = context.line.substring(0, context.line.length - url.length);
            if (0 === context.urlOrDynamicShortcut.indexOf(shortycut.dynamicLinkProtocol)) {
                context.urlOrDynamicShortcut = shortycut.startupCache.dynamicLinks.get(context.urlOrDynamicShortcut);
                if (!context.urlOrDynamicShortcut) {
                    throw new shortycut.ParserError("The dynamic link created via shortycut.toUrl() must be at the end of the line", context.line);
                }
            }
        };
        ShortcutParser.prototype.getUrl = function (line) {
            var lineLowerCase = line.toLowerCase();
            return this.getStandardProtocolUrl(line, lineLowerCase)
                || this.getNonStandardProtocolUrl(line, lineLowerCase);
        };
        ShortcutParser.prototype.getStandardProtocolUrl = function (line, lineLowerCase) {
            var index = this.KNOWN_PROTOCOLS
                .map(function (protocol) { return lineLowerCase.indexOf(protocol); })
                .filter(function (matchIndex) { return 0 <= matchIndex; })
                .reduce(function (a, b) { return a < b ? a : b; }, line.length);
            if (index < line.length) {
                return { isStandardProtocol: true, url: line.substring(index) };
            }
            else {
                return undefined;
            }
        };
        ShortcutParser.prototype.getNonStandardProtocolUrl = function (line, lineLowerCase) {
            var offset = 0;
            while (offset < line.length) {
                var index = line.indexOf(ShortcutParser.PROTOCOL_SEPARATOR, offset);
                if (0 < index) {
                    if ("a" <= lineLowerCase.charAt(index - 1) && lineLowerCase.charAt(index - 1) <= "z") {
                        var start = this.getProtocolStartOffset(index, lineLowerCase);
                        return { isStandardProtocol: false, url: line.substring(start) };
                    }
                    else {
                        offset = index + ShortcutParser.PROTOCOL_SEPARATOR.length;
                    }
                }
                else {
                    offset = line.length;
                }
            }
            throw new shortycut.ParserError("Unable to retrieve the link (make sure it starts with a protocol like https://)", line);
        };
        ShortcutParser.prototype.getProtocolStartOffset = function (index, lineLowerCase) {
            var start = index - 1;
            while (0 < start
                && "a" <= lineLowerCase.charAt(start - 1)
                && lineLowerCase.charAt(start - 1) <= "z") {
                start--;
            }
            return start;
        };
        ShortcutParser.prototype.parseOnMultiLink = function (context) {
            var _a;
            var multiLinkIndicator = shortycut.config.shortcutFormat.url.multiLinkIndicator;
            for (var pass = 0; pass <= 1; pass++) {
                for (var _i = 0, _b = shortycut.OnMultiLink.values; _i < _b.length; _i++) {
                    var onMultiLink = _b[_i];
                    var symbol = (_a = shortycut.getProperty(multiLinkIndicator, onMultiLink.key)) !== null && _a !== void 0 ? _a : "~!@#$%^&*()_+";
                    if (!pass && context.isStandardProtocol
                        && "string" === typeof context.urlOrDynamicShortcut
                        && shortycut.startsWith(context.urlOrDynamicShortcut, symbol)) {
                        context.onMultiLink = onMultiLink;
                        context.urlOrDynamicShortcut = context.urlOrDynamicShortcut.substring(symbol.length).trim();
                        return;
                    }
                    else if (pass && shortycut.endsWith(context.description, symbol)) {
                        context.description = context.description.substring(0, context.description.length - symbol.length).trim();
                        context.onMultiLink = onMultiLink;
                        return;
                    }
                }
            }
            context.onMultiLink = shortycut.OnMultiLink.getDefault();
        };
        ShortcutParser.prototype.parseKeywordsAndDescription = function (context) {
            context.description = context.description.replace(/\s+/, " ");
            if (shortycut.startsWith(context.description, shortycut.config.shortcutFormat.keyword.openingDelimiter)) {
                return this.parseSegments(context, context.description);
            }
            else {
                var index = context.description.search(/(\s|$)/);
                return [{
                        keywords: this.splitKeywords(context, context.description.substring(0, index)),
                        description: context.description.substring(index).trim()
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
            var openingDelimiter = shortycut.assertNotNull(shortycut.config.shortcutFormat.keyword.openingDelimiter);
            var closingDelimiter = shortycut.assertNotNull(shortycut.config.shortcutFormat.keyword.closingDelimiter);
            var startIndex = description.indexOf(openingDelimiter);
            if (0 <= startIndex) {
                var nextSegment = description.substring(startIndex + openingDelimiter.length);
                var endIndex = nextSegment.indexOf(closingDelimiter);
                if (endIndex < 0) {
                    throw new shortycut.ParserError("Missing ".concat(closingDelimiter, " after ").concat(openingDelimiter), context.line);
                }
                return {
                    description: description.substring(0, startIndex),
                    nextSegment: {
                        keywords: this.splitKeywords(context, nextSegment.substring(0, endIndex)),
                        description: nextSegment.substring(endIndex + closingDelimiter.length).trim()
                    }
                };
            }
            return { description: description };
        };
        ShortcutParser.prototype.splitKeywords = function (context, keywords) {
            var result = new Array();
            for (var _i = 0, _a = keywords.split(shortycut.config.shortcutFormat.keyword.separator || /\s+/); _i < _a.length; _i++) {
                var originalKeyword = _a[_i];
                var keyword = originalKeyword.trim();
                if (keyword) {
                    if (keyword.match(/\s/)) {
                        throw new shortycut.ParserError("The keyword \"".concat(keyword, "\" contains whitespace"), context.line);
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
            var result = new shortycut.Hashtable();
            var keyword = new Array();
            var hasMoreCombinations = true;
            for (var index = 0; index < segments.length; index++) {
                context.combination[index] = 0;
            }
            while (hasMoreCombinations) {
                var array = new Array();
                for (var index = 0; index < segments.length; index++) {
                    keyword[index] = (_a = segments[index].keywords[context.combination[index]]) !== null && _a !== void 0 ? _a : "";
                    array.push(this.createSegment(keyword[index], segments[index].description));
                }
                result.put(keyword.join(""), array);
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
            return result;
        };
        ShortcutParser.prototype.createSegment = function (keyword, description) {
            var marker = shortycut.config.shortcutFormat.hotkeyMarker;
            if (marker) {
                var sections = shortycut.replaceAll(description, "".concat(marker).concat(marker), "\n", true)
                    .split(marker)
                    .map(function (item) { return shortycut.replaceAll(item, "\n", "".concat(marker).concat(marker), true); });
                var repeat = false;
                for (var index = 1; index < sections.length; index = index + (repeat ? 0 : 1)) {
                    var keywordChar = shortycut.adjustCase(keyword.charAt(index - 1));
                    var sectionChar = shortycut.adjustCase(sections[index].charAt(0));
                    if (keywordChar !== sectionChar) {
                        sections[index - 1] += sections[index];
                        sections.splice(index, 1);
                        repeat = true;
                    }
                    else {
                        repeat = false;
                    }
                }
                return new shortycut.Segment(keyword, keyword.length + 1 === sections.length ? sections : [sections.join("")]);
            }
            return new shortycut.Segment(keyword, [description]);
        };
        ShortcutParser.PROTOCOL_SEPARATOR = "://";
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
            this.fullQuery = this.queryParameters.getOrDefault(QueryParameters.QUERY, "").replace(/\+/g, " ");
            this.keyword = shortycut.adjustCase(this.fullQuery).replace(/\s.*/, "");
            this.searchTerm = this.fullQuery.replace(/^[^\s]+\s*/, "");
            var redirect = this.queryParameters.get(QueryParameters.REDIRECT);
            this.redirect = redirect ? JSON.parse(redirect) : undefined;
            this.setup = this.queryParameters.get(QueryParameters.SETUP);
            this.queryParameters
                .getOrDefault(QueryParameters.FACETS, "")
                .split(",")
                .map(function (facet) { return facet.trim().toLowerCase(); })
                .filter(function (facet) { return facet; })
                .forEach(function (facet) { return _this.applyFacet(facet); });
        }
        QueryParameters.prototype.applyFacet = function (facet) {
            if ("new-tabs" === facet) {
                this.facets.newTabs = true;
            }
            else if ("no-focus" === facet) {
                this.facets.noFocus = true;
            }
            else {
                shortycut.startupCache.initializationErrors.push(new shortycut.InitializationError(shortycut.create("div", "Facet ", shortycut.create("tt", facet), " (in this page's address) is not supported")));
            }
        };
        QueryParameters.prototype.getQueryParameters = function () {
            var result = new shortycut.Hashtable();
            if (!window.location.search) {
                return result;
            }
            for (var _i = 0, _a = window.location.search.trim().replace(/^\?/, "").trim().split("&"); _i < _a.length; _i++) {
                var parameter = _a[_i];
                var index = parameter.indexOf("=");
                if (0 < index) {
                    var key = this.urlDecode(parameter.substring(0, index));
                    if (key) {
                        result.put(key, this.urlDecode(parameter.substring(index + 1)));
                    }
                }
                else {
                    result.put(this.urlDecode(parameter), "");
                }
            }
            return result;
        };
        QueryParameters.prototype.urlDecode = function (value) {
            try {
                return decodeURIComponent(value).trim();
            }
            catch (error) {
                throw new shortycut.Exception("URL syntax error", shortycut.create("p", "A query parameter passed in the URL is not url-encoded:"), shortycut.create("p", value));
            }
        };
        QueryParameters.QUERY = "q";
        QueryParameters.REDIRECT = "r";
        QueryParameters.SETUP = "setup";
        QueryParameters.FACETS = "facets";
        return QueryParameters;
    }());
    shortycut.QueryParameters = QueryParameters;
})(shortycut || (shortycut = {}));
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
        OnMultiLink.REPLACE_PREVIOUS = new OnMultiLink("replacePrevious");
        OnMultiLink.OPEN_IN_NEW_TAB = new OnMultiLink("openInNewTab");
        OnMultiLink.SHOW_MENU = new OnMultiLink("showMenu");
        OnMultiLink.SEARCH_BUCKET = new OnMultiLink("searchBucket");
        return OnMultiLink;
    }());
    shortycut.OnMultiLink = OnMultiLink;
    var Link = (function () {
        function Link(keyword, index, segments, onMultiLink, isSearchable, urlOrDynamicShortcut) {
            this.keyword = keyword;
            this.index = index;
            this.segments = segments;
            this.onMultiLink = onMultiLink;
            this.isSearchable = isSearchable;
            this.urlOrDynamicShortcut = urlOrDynamicShortcut;
            this._overridden = false;
            this.isQuery = "string" === typeof this.urlOrDynamicShortcut
                ? 0 <= shortycut.adjustCase(this.urlOrDynamicShortcut).indexOf(shortycut.config.shortcutFormat.url.searchTermPlaceholder)
                : this.urlOrDynamicShortcut.isQuery;
        }
        Link.prototype.toFinalizedLinks = function (searchTerm) {
            if ("string" === typeof this.urlOrDynamicShortcut) {
                return this.constructFinalizedLinks([this.urlOrDynamicShortcut], searchTerm);
            }
            else {
                var urlOrUrls = this.urlOrDynamicShortcut.generator(searchTerm);
                if ("string" === typeof urlOrUrls) {
                    return this.constructFinalizedLinks([urlOrUrls], searchTerm);
                }
                else {
                    return this.constructFinalizedLinks(urlOrUrls, searchTerm);
                }
            }
        };
        Link.prototype.constructFinalizedLinks = function (urls, searchTerm) {
            var _this = this;
            if (0 === urls.filter(function (link) { var _a; return "string" !== typeof link && ((_a = link.description) === null || _a === void 0 ? void 0 : _a.trim()); }).length) {
                return [
                    this.constructFinalizedLink("", urls.map(function (link) { return "string" === typeof link ? link : link.url; }), searchTerm)
                ];
            }
            else {
                return urls.map(function (link) { return "string" === typeof link ? { description: "", url: link } : link; })
                    .map(function (link) { return _this.constructFinalizedLink(link.description, [link.url], searchTerm); });
            }
        };
        Link.prototype.constructFinalizedLink = function (description, urls, searchTerm) {
            var _this = this;
            var segment = new Segments(__spreadArray(__spreadArray([], this.segments.segments, true), [new Segment("", [description])], false));
            return {
                htmlDescription: (description ? segment : this.segments).descriptionHtml,
                urls: urls.map(function (url) { return _this.constructFinalizedUrl(url, searchTerm); })
            };
        };
        Link.prototype.constructFinalizedUrl = function (link, searchTerm) {
            var parsedLink = Link.splitUrlAndPostFields(link);
            var url = Link.insertSearchTerm(parsedLink.url, searchTerm);
            var postFields = Link.constructFinalizedPostFields(parsedLink.postFields, searchTerm);
            var permalink = postFields ? Link.constructFinalizedPermalink(url, postFields) : url;
            return { url: url, postFields: postFields, permalink: permalink };
        };
        Link.constructFinalizedPermalink = function (finalizedUrl, finalizedPostFields) {
            var baseUrl = window.location.href.replace(/[#?].*/g, "");
            var json = { url: finalizedUrl, postFields: finalizedPostFields };
            var redirect = encodeURIComponent(JSON.stringify(json));
            return "".concat(baseUrl, "?").concat(shortycut.QueryParameters.REDIRECT, "=").concat(redirect);
        };
        Object.defineProperty(Link.prototype, "faviconUrls", {
            get: function () {
                return "string" === typeof this.urlOrDynamicShortcut
                    ? [this.urlOrDynamicShortcut]
                    : this.urlOrDynamicShortcut.faviconUrls;
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
                    this._filterSummary = "".concat(this.keyword, " ").concat(this.segments.description)
                        .toLocaleLowerCase()
                        .replace(/\s/g, "");
                }
                return this._filterSummary;
            },
            enumerable: false,
            configurable: true
        });
        Link.insertSearchTerm = function (text, searchTerm) {
            return shortycut.replaceAll(text, shortycut.config.shortcutFormat.url.searchTermPlaceholder, encodeURIComponent(searchTerm), shortycut.config.shortcutFormat.keyword.caseSensitive);
        };
        Link.splitUrlAndPostFields = function (url) {
            var separator = shortycut.config.shortcutFormat.url.postIndicator;
            var index = separator ? shortycut.adjustCase(url).indexOf(separator) : -1;
            if (separator && 0 <= index) {
                return { url: url.substring(0, index), postFields: url.substring(index + separator.length) };
            }
            else {
                return { url: url };
            }
        };
        Link.constructFinalizedPostFields = function (postFields, searchTerm) {
            var _this = this;
            return postFields === null || postFields === void 0 ? void 0 : postFields.split("&").filter(function (field) { return field; }).map(function (field) { return _this.constructFinalizedPostField(field, searchTerm); });
        };
        Link.constructFinalizedPostField = function (parameter, searchTerm) {
            var index = parameter.indexOf("=");
            if (index < 1) {
                throw new shortycut.Exception("Shortcut definition error", "Post parameter ".concat(shortycut.sanitize(parameter), " is not in key=value format"));
            }
            try {
                var key = decodeURIComponent(this.insertSearchTerm(parameter.substring(0, index), searchTerm));
                var value = decodeURIComponent(this.insertSearchTerm(parameter.substring(index + 1), searchTerm));
                return { key: key, value: value };
            }
            catch (exception) {
                throw new shortycut.Exception("Shortcut definition error", "Post parameter ".concat(shortycut.sanitize(parameter), " is not URL encoded"));
            }
        };
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
                this.current.forEach(function (currentLink) { return currentLink.markAsOverridden(); });
                (_a = this.overridden).push.apply(_a, this.current);
                this.current.length = 0;
            }
            this.current.push(link);
        };
        Object.defineProperty(Links.prototype, "onMultiLink", {
            get: function () {
                var _a;
                return (_a = this.current[this.current.length - 1].onMultiLink) !== null && _a !== void 0 ? _a : OnMultiLink.getDefault();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Links.prototype, "isQuery", {
            get: function () {
                return this.current[0].isQuery;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Links.prototype, "isSearchable", {
            get: function () {
                return this.current[0].isSearchable;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Links.prototype, "filterSummary", {
            get: function () {
                var _a;
                var filterSummary = (_a = this._filterSummary) !== null && _a !== void 0 ? _a : this.current.map(function (link) { return link.filterSummary; }).join(" ");
                this._filterSummary = filterSummary;
                return filterSummary;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Links.prototype, "descriptionHtml", {
            get: function () {
                var _a;
                var descriptionHtml = (_a = this._descriptionHtml) !== null && _a !== void 0 ? _a : this.calculateDescriptionHtml();
                this._descriptionHtml = descriptionHtml;
                return descriptionHtml;
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
                    length_1++;
                } while (length_1);
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
        Links.prototype.toFinalizedLinks = function (searchTerm) {
            var links = new Array();
            var onMultiLink = this.onMultiLink;
            for (var _i = 0, _a = this.current; _i < _a.length; _i++) {
                var link = _a[_i];
                var newLinks = link.toFinalizedLinks(searchTerm);
                newLinks.forEach(function (link) { return links.push(link); });
                if (1 < newLinks.length && 1 === this.current.length) {
                    onMultiLink = OnMultiLink.SHOW_MENU;
                }
            }
            if (1 < links.length && onMultiLink !== OnMultiLink.SHOW_MENU) {
                onMultiLink = OnMultiLink.OPEN_IN_NEW_TAB;
            }
            return { onMultiLink: onMultiLink, links: links };
        };
        return Links;
    }());
    shortycut.Links = Links;
    var Segment = (function () {
        function Segment(keyword, sections) {
            this.keyword = keyword;
            this.sections = sections;
        }
        Object.defineProperty(Segment.prototype, "description", {
            get: function () {
                return this.sections.join("");
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
                var descriptionHtml = (_a = this._descriptionHtml) !== null && _a !== void 0 ? _a : this.segments.map(function (segment) { return shortycut.sanitize(segment.description); }).join(Segments.SEPARATOR_HTML);
                this._descriptionHtml = descriptionHtml;
                return descriptionHtml;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Segments.prototype, "description", {
            get: function () {
                var _a;
                var description = (_a = this._description) !== null && _a !== void 0 ? _a : this.segments.map(function (segment) { return segment.description; }).join(Segments.SEPARATOR_TEXT);
                this._description = description;
                return description;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Segments.prototype, "descriptionPlaceholder", {
            get: function () {
                var _a;
                var descriptionPlaceholder = (_a = this._descriptionPlaceholder) !== null && _a !== void 0 ? _a : this.segments.map(function (segment) { return segment.description; }).join(Segments.SEPARATOR_PLACEHOLDER);
                this._descriptionPlaceholder = descriptionPlaceholder;
                return descriptionPlaceholder;
            },
            enumerable: false,
            configurable: true
        });
        Segments.SEPARATOR_TEXT = " » ";
        Segments.SEPARATOR_HTML = " &raquo; ";
        Segments.SEPARATOR_PLACEHOLDER = "\n";
        return Segments;
    }());
    shortycut.Segments = Segments;
    var MatchingSegment = (function () {
        function MatchingSegment(segments, length) {
            this.fingerprint = "";
            this.keyword = "";
            this.descriptionHtml = "";
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
                        this.descriptionHtml += "".concat(this.descriptionHtml ? Segments.SEPARATOR_HTML : "").concat(description);
                    }
                    this.fingerprint += MatchingSegment.getFingerprint(segment, index + 1 !== segments.length);
                    lengthOffset += segment.keyword.length;
                }
                else {
                    this.isPartial = true;
                    break;
                }
            }
        }
        MatchingSegment.getFingerprint = function (segment, appendDescription) {
            var openingDelimiter = shortycut.config.shortcutFormat.keyword.openingDelimiter || "[";
            var closingDelimiter = shortycut.config.shortcutFormat.keyword.closingDelimiter || "]";
            var suffix = appendDescription ? segment.description.trim().toLocaleLowerCase() : "";
            return openingDelimiter + segment.keyword + closingDelimiter + suffix;
        };
        MatchingSegment.prototype.countSegmentsToDisplay = function (segments) {
            var segmentsToDisplay = segments.length;
            for (; 0 < segmentsToDisplay && !segments[segmentsToDisplay - 1].keyword; segmentsToDisplay--) {
            }
            return Math.max(0, segmentsToDisplay);
        };
        MatchingSegment.prototype.getDescription = function (sections, hotkeysMatched, lengthOffset, length) {
            if (!shortycut.config.homepage.suggestions.showHotkeys) {
                return shortycut.sanitize(sections.join(""));
            }
            else if (1 === sections.length) {
                return this.autoDetectHotkeys(sections[0], this.keyword.substring(lengthOffset), length - lengthOffset);
            }
            else {
                var result = shortycut.sanitize(sections[0]);
                for (var index = 1; index < sections.length; index++) {
                    if (hotkeysMatched < index) {
                        result += shortycut.create("span.hotkey", shortycut.sanitize(sections[index].charAt(0))).outerHTML;
                        result += shortycut.sanitize(sections[index].substring(1));
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
                .map(function (item) { return item.isHotkey ? shortycut.create("span.hotkey", item.text).outerHTML : shortycut.sanitize(item.text); })
                .join("");
        };
        return MatchingSegment;
    }());
    shortycut.MatchingSegment = MatchingSegment;
    var Shortcut = (function () {
        function Shortcut(keyword, segments, onMultiLink, urlOrDynamicShortcut) {
            this.keyword = keyword;
            this.all = new Array();
            this.addLink(keyword, segments, onMultiLink, urlOrDynamicShortcut);
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
        Object.defineProperty(Shortcut.prototype, "searchable", {
            get: function () {
                return this._searchable;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Shortcut.prototype, "type", {
            get: function () {
                if (this.bookmarks) {
                    return this.queries ? "both" : "bookmark";
                }
                else if (this.queries) {
                    return "query";
                }
                else {
                    return "none";
                }
            },
            enumerable: false,
            configurable: true
        });
        Shortcut.prototype.addLink = function (keyword, segments, onMultiLink, urlOrDynamicShortcut) {
            var link = new Link(keyword, this.all.length, new Segments(segments), OnMultiLink.SEARCH_BUCKET === onMultiLink ? OnMultiLink.getDefault() : onMultiLink, OnMultiLink.SEARCH_BUCKET === onMultiLink, urlOrDynamicShortcut);
            if (link.isSearchable) {
                this._searchable = this.createOrAdd(link, this._searchable);
            }
            else if (link.isQuery) {
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
        Shortcut.prototype.getFinalizedBookmarks = function () {
            return this.createFinalizedLinks(this.bookmarks);
        };
        Shortcut.prototype.getFinalizedQueries = function (searchTerm) {
            return this.createFinalizedLinks(this.queries, searchTerm);
        };
        Shortcut.prototype.getFinalizedLinks = function (searchTerm) {
            return this.createFinalizedLinks(this.bookmarks && (!(searchTerm === null || searchTerm === void 0 ? void 0 : searchTerm.trim()) || !this.queries) ? this.bookmarks : this.queries, searchTerm);
        };
        Shortcut.prototype.createFinalizedLinks = function (links, searchTerm) {
            var _a, _b;
            return (_b = links === null || links === void 0 ? void 0 : links.toFinalizedLinks((_a = searchTerm === null || searchTerm === void 0 ? void 0 : searchTerm.trim()) !== null && _a !== void 0 ? _a : "")) !== null && _b !== void 0 ? _b : { onMultiLink: OnMultiLink.OPEN_IN_NEW_TAB, links: [] };
        };
        Shortcut.prototype.getSegmentMatches = function (length) {
            var _a, _b;
            var result = new shortycut.Hashtable();
            var _loop_3 = function (link) {
                var match = link.segments.getMatch(length);
                result.computeIfAbsent(match.fingerprint, function () { return match; });
            };
            for (var _i = 0, _c = __spreadArray(__spreadArray([], (((_a = this._bookmarks) === null || _a === void 0 ? void 0 : _a.current) || []), true), ((_b = this.queries) === null || _b === void 0 ? void 0 : _b.current) || [], true); _i < _c.length; _i++) {
                var link = _c[_i];
                _loop_3(link);
            }
            return result.values;
        };
        return Shortcut;
    }());
    shortycut.Shortcut = Shortcut;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    shortycut.config = null;
    shortycut.shortcuts = null;
    shortycut.defaultSearchEngine = null;
    shortycut.defaultSearchEngine !== null && shortycut.defaultSearchEngine !== void 0 ? shortycut.defaultSearchEngine : (shortycut.defaultSearchEngine = null);
    shortycut.queryParameters = null;
    shortycut.redirector = null;
    shortycut.router = null;
    shortycut.faviconManager = null;
    shortycut.javaScriptLoader = null;
    shortycut.hotkeySelector = null;
    shortycut.faviconManager !== null && shortycut.faviconManager !== void 0 ? shortycut.faviconManager : (shortycut.faviconManager = null);
    shortycut.javaScriptLoader !== null && shortycut.javaScriptLoader !== void 0 ? shortycut.javaScriptLoader : (shortycut.javaScriptLoader = null);
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
            shortycut.forEachProperty(this.pages, function (_key, value) {
                if (value && value !== page && "object" === typeof value && "function" === typeof value.hide) {
                    value.hide();
                }
            });
        };
        Object.defineProperty(Pages.prototype, "error", {
            get: function () {
                var _a;
                var error = (_a = this.pages.error) !== null && _a !== void 0 ? _a : new shortycut.ErrorPage();
                this.pages.error = error;
                return error;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "browserIntegration", {
            get: function () {
                var _a;
                var browserIntegration = (_a = this.pages.browserIntegration) !== null && _a !== void 0 ? _a : new shortycut.BrowserIntegration();
                this.pages.browserIntegration = browserIntegration;
                return browserIntegration;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "home", {
            get: function () {
                var _a;
                var home = (_a = this.pages.home) !== null && _a !== void 0 ? _a : new shortycut.Homepage();
                this.pages.home = home;
                return home;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "linkTools", {
            get: function () {
                var _a;
                var linkTools = (_a = this.pages.linkTools) !== null && _a !== void 0 ? _a : new shortycut.LinkTools();
                this.pages.linkTools = linkTools;
                return linkTools;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "faviconTools", {
            get: function () {
                var _a;
                var faviconTools = (_a = this.pages.faviconTools) !== null && _a !== void 0 ? _a : new shortycut.FaviconTools();
                this.pages.faviconTools = faviconTools;
                return faviconTools;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "redirect", {
            get: function () {
                var _a;
                var redirect = (_a = this.pages.redirect) !== null && _a !== void 0 ? _a : new shortycut.RedirectPage();
                this.pages.redirect = redirect;
                return redirect;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "setup", {
            get: function () {
                var _a;
                var setup = (_a = this.pages.setup) !== null && _a !== void 0 ? _a : new shortycut.SetupInstructions();
                this.pages.setup = setup;
                return setup;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Pages.prototype, "shortlist", {
            get: function () {
                var _a;
                var shortlist = (_a = this.pages.shortlist) !== null && _a !== void 0 ? _a : new shortycut.Shortlist();
                this.pages.shortlist = shortlist;
                return shortlist;
            },
            enumerable: false,
            configurable: true
        });
        return Pages;
    }());
    shortycut.pages = new Pages();
    shortycut.dynamicLinkProtocol = "function";
    var StartupCache = (function () {
        function StartupCache() {
            this.exceptions = new Array();
            this.config = new Array();
            this.shortcuts = new Array();
            this.initializationErrors = new Array();
        }
        Object.defineProperty(StartupCache.prototype, "dynamicLinks", {
            get: function () {
                var _a;
                var dynamicLinks = (_a = this._dynamicLinks) !== null && _a !== void 0 ? _a : new shortycut.Hashtable();
                this._dynamicLinks = dynamicLinks;
                return dynamicLinks;
            },
            enumerable: false,
            configurable: true
        });
        return StartupCache;
    }());
    shortycut.startupCache = new StartupCache();
    function initializeVariables() {
        shortycut.config = shortycut.DEFAULT_CONFIG;
        shortycut.shortcuts = new shortycut.Hashtable();
        shortycut.queryParameters = new shortycut.QueryParameters();
        shortycut.redirector = new shortycut.Redirector();
        shortycut.router = new shortycut.Router();
        shortycut.hotkeySelector = new shortycut.HotkeySelector();
    }
    shortycut.initializeVariables = initializeVariables;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var BrowserIntegration = (function () {
        function BrowserIntegration() {
            this.dom = {
                browserIntegration: document.querySelector("#browser-integration"),
                homepage: document.querySelector("#browser-integration .homepage"),
                facets: {
                    newTabs: document.querySelector("#browser-integration .new-tabs"),
                    noFocus: document.querySelector("#browser-integration .no-focus")
                },
                form: document.querySelector("#browser-integration .form"),
                keyword: document.querySelector("#browser-integration .keyword"),
                webServerRequired: document.querySelector("#browser-integration .web-server-required"),
                searchEngine: document.querySelector("#browser-integration .search-engine"),
                openSearch: document.querySelector("#browser-integration .open-search"),
                popUp: document.querySelector("#browser-integration .pop-up")
            };
            this.updateHomepageLink = this.updateHomepageLink.bind(this);
            this.dom.facets.newTabs.checked = shortycut.queryParameters.facets.newTabs;
            this.dom.facets.noFocus.checked = shortycut.queryParameters.facets.noFocus;
            this.updateHomepageLink();
            var baseUrl = window.location.href.replace(/[#?].*/, "");
            this.dom.form.action = baseUrl;
            this.dom.keyword.innerHTML = "".concat(shortycut.sanitize(baseUrl), "?q=%s");
            this.dom.keyword.href = "".concat(baseUrl, "?q=%s");
            if (window.location.href.match(/^http.*/)) {
                this.dom.searchEngine.style.display = "block";
            }
            else {
                this.dom.webServerRequired.style.display = "block";
            }
            var baseFolder = shortycut.getWindowLocationPath();
            this.dom.openSearch.href = "".concat(baseFolder, "data/search.xml");
            this.dom.openSearch.innerHTML = shortycut.sanitize("".concat(baseFolder, "data/search.xml"));
            this.dom.popUp.addEventListener("click", function () {
                for (var index = 0; index <= 1; index++) {
                    var popUp = window.open("");
                    if (popUp === null || popUp === void 0 ? void 0 : popUp.document) {
                        popUp.document.write([
                            "This window was opened by ShortyCut.",
                            "Pop-ups are not being blocked.",
                            "You can close this windows."
                        ].join("<br>"));
                        popUp.document.title = "ShortyCut Pop-Up Test";
                    }
                }
            });
        }
        BrowserIntegration.prototype.hasMenu = function () {
            return true;
        };
        BrowserIntegration.prototype.show = function () {
            this.dom.browserIntegration.style.display = "flex";
            this.addEventHandlers();
        };
        BrowserIntegration.prototype.hide = function () {
            this.dom.browserIntegration.style.display = "none";
            this.removeEventHandlers();
        };
        BrowserIntegration.prototype.addEventHandlers = function () {
            var _this = this;
            shortycut.forEachProperty(this.dom.facets, function (_key, checkbox) {
                return checkbox.addEventListener("click", _this.updateHomepageLink);
            });
        };
        BrowserIntegration.prototype.removeEventHandlers = function () {
            var _this = this;
            shortycut.forEachProperty(this.dom.facets, function (_key, checkbox) {
                return checkbox.removeEventListener("click", _this.updateHomepageLink);
            });
        };
        BrowserIntegration.prototype.updateHomepageLink = function () {
            var _this = this;
            var facets = Object.keys(this.dom.facets)
                .filter(function (facet) { var _a; return (_a = shortycut.getProperty(_this.dom.facets, facet)) === null || _a === void 0 ? void 0 : _a.checked; })
                .map(function (facet) { return "noFocus" === facet ? "no-focus" : facet; })
                .map(function (facet) { return "newTabs" === facet ? "new-tabs" : facet; });
            var url = window.location.href.replace(/[#?].*/, "");
            if (facets.length) {
                url += "?facets=".concat(facets.join(","));
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
                error: document.querySelector("#error"),
                title: document.querySelector("#error .title"),
                message: document.querySelector("#error .message")
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
            else if ("string" === typeof titleOrException) {
                this.dom.title.innerHTML = titleOrException;
            }
            message.forEach(function (item) {
                (Array.isArray(item) ? item : [item]).forEach(function (element) {
                    if ("object" === typeof element) {
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
            this.dom.error.style.display = "flex";
        };
        ErrorPage.prototype.hide = function () {
            this.dom.error.style.display = "none";
        };
        return ErrorPage;
    }());
    shortycut.ErrorPage = ErrorPage;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var FaviconTools = (function () {
        function FaviconTools() {
            this.dom = {
                faviconTools: document.querySelector("#favicon-tools"),
                configWarning: document.querySelector("#favicon-tools .config-warning"),
                curlLink: document.querySelector("#favicon-tools .online a.curl"),
                curlTextarea: document.querySelector("#favicon-tools .online textarea.curl"),
                pending: document.querySelector("#favicon-tools .pending"),
                pendingListing: document.querySelector("#favicon-tools .pending .listing"),
                online: document.querySelector("#favicon-tools .online"),
                onlineListing: document.querySelector("#favicon-tools .online .listing"),
                missing: document.querySelector("#favicon-tools .missing"),
                missingListing: document.querySelector("#favicon-tools .missing .listing"),
                offline: document.querySelector("#favicon-tools .offline"),
                offlineListing: document.querySelector("#favicon-tools .offline .listing"),
            };
            this.showCurlCommands = this.showCurlCommands.bind(this);
            this.selectAllCurlCommands = this.selectAllCurlCommands.bind(this);
            this.dom.configWarning.style.display = shortycut.config.homepage.suggestions.showFavicons ? "none" : "block";
        }
        FaviconTools.prototype.hasMenu = function () {
            return true;
        };
        FaviconTools.prototype.show = function () {
            this.addEventHandlers();
            this.dom.faviconTools.style.display = "flex";
            shortycut.faviconManager.startFullRescan();
            this.refreshPageContent();
        };
        FaviconTools.prototype.hide = function () {
            this.removeEventHandlers();
            this.dom.faviconTools.style.display = "none";
        };
        FaviconTools.prototype.addEventHandlers = function () {
            this.dom.curlLink.addEventListener("click", this.showCurlCommands);
            this.dom.curlTextarea.addEventListener("focus", this.selectAllCurlCommands);
        };
        FaviconTools.prototype.removeEventHandlers = function () {
            this.dom.curlLink.removeEventListener("click", this.showCurlCommands);
            this.dom.curlTextarea.addEventListener("focus", this.selectAllCurlCommands);
        };
        FaviconTools.prototype.showCurlCommands = function (event) {
            this.dom.curlLink.style.display = "none";
            this.dom.curlTextarea.style.display = "block";
            event.preventDefault();
            return false;
        };
        FaviconTools.prototype.selectAllCurlCommands = function () {
            this.dom.curlTextarea.select();
        };
        FaviconTools.prototype.refreshPageContent = function () {
            if ("none" !== this.dom.faviconTools.style.display) {
                this.refreshPageContentPending();
                this.refreshPageContentMissing();
                this.refreshPageContentOnline();
                this.refreshPageContentOffline();
            }
        };
        FaviconTools.prototype.refreshPageContentPending = function () {
            var domains = shortycut.faviconManager.getPendingDomains();
            if (domains.length) {
                this.dom.pendingListing.innerHTML =
                    shortycut.create("div", domains.map(function (domain) { return shortycut.create("div.row", shortycut.sanitize(domain)); })).innerHTML;
            }
            this.dom.pending.style.display = domains.length ? "block" : "none";
        };
        FaviconTools.prototype.refreshPageContentMissing = function () {
            var domains = shortycut.faviconManager.getMissingDomains();
            if (domains.length) {
                this.dom.missingListing.innerHTML =
                    shortycut.create("div", domains.map(function (domain) { return shortycut.create("div.row", shortycut.sanitize(domain)); })).innerHTML;
            }
            this.dom.missing.style.display = domains.length ? "block" : "none";
        };
        FaviconTools.prototype.refreshPageContentOnline = function () {
            var icons = shortycut.faviconManager.getOnlineDomains();
            if (icons.length) {
                this.dom.curlTextarea.value =
                    icons.map(function (item) { return "curl -s -L -o \"".concat(item.filename, "\" \"").concat(item.url, "\""); }).join("\n") + "\n";
                this.dom.onlineListing.innerHTML = icons.map(function (item) {
                    return shortycut.create("div.row", [
                        shortycut.create("div.icon", shortycut.create("a", shortycut.createImage(item.url), function (element) {
                            element.download = item.filename;
                            element.href = item.url;
                        })),
                        shortycut.create("div.domain", shortycut.sanitize(item.filename))
                    ]);
                }).map(function (element) { return element.outerHTML; }).join("");
            }
            this.dom.online.style.display = icons.length ? "block" : "none";
        };
        FaviconTools.prototype.refreshPageContentOffline = function () {
            var icons = shortycut.faviconManager.getOfflineDomains();
            if (icons.length) {
                this.dom.offlineListing.innerHTML = icons.map(function (item) {
                    return shortycut.create("div.row", [
                        shortycut.create("div.icon", shortycut.createImage(item.url)),
                        shortycut.create("div.domain", shortycut.sanitize(item.path))
                    ]);
                }).map(function (element) { return element.outerHTML; }).join("");
            }
            this.dom.offline.style.display = icons.length ? "block" : "none";
        };
        return FaviconTools;
    }());
    shortycut.FaviconTools = FaviconTools;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var Homepage = (function () {
        function Homepage() {
            this.dom = {
                filter: document.querySelector("#home .input"),
                home: document.querySelector("#home"),
                suggestions: document.querySelector("#home .suggestions"),
                headerRow: document.querySelector("#home > .row"),
                rows: new Array(),
                notification: {
                    self: document.querySelector("#home .notification"),
                    welcome: {
                        self: document.querySelector("#home .notification .welcome"),
                        newTabs: document.querySelector("#home .notification .welcome .new-tabs"),
                    },
                    applicationErrors: document.querySelector("#home .notification .application-errors"),
                    noShortcutsNoError: document.querySelector("#home .notification .no-shortcuts-no-error"),
                    errorWithBacktickSupport: document.querySelector("#home .notification .error-with-backtick-support"),
                    errorWithoutBacktickSupport: document.querySelector("#home .notification .error-without-backtick-support"),
                }
            };
            this.filter = new shortycut.Filter(Homepage.MAX_SUGGESTIONS);
            this.suggestions = new Array();
            this.selectedIndex = -1;
            this.originalInput = "";
            this.lastCancelClearFilterEvent = -1;
            this.onKeyBody = this.onKeyBody.bind(this);
            this.onFilterChanged = this.onFilterChanged.bind(this);
            this.onFocusEvent = this.onFocusEvent.bind(this);
            this.clearFilter = this.clearFilter.bind(this);
            this.scheduleClearFilter = this.scheduleClearFilter.bind(this);
            this.cancelClearFilter = this.cancelClearFilter.bind(this);
            this.populateNotification();
        }
        Homepage.prototype.hasMenu = function () {
            return true;
        };
        Homepage.prototype.populate = function (query) {
            this.dom.filter.value = query !== null && query !== void 0 ? query : "";
            this.previousInput = undefined;
            this.originalInput = "";
            this.dom.suggestions.innerHTML = "";
            this.selectSuggestion(-1);
            this.onFilterChanged();
            if (shortycut.queryParameters.facets.noFocus) {
                this.dom.headerRow.classList.add("no-focus");
            }
            return this;
        };
        Homepage.prototype.populateNotification = function () {
            var _this = this;
            if (shortycut.startupCache.initializationErrors.length) {
                this.dom.notification.applicationErrors.innerHTML = shortycut.create("div.header", 1 === shortycut.startupCache.initializationErrors.length
                    ? "An error occurred during initialization"
                    : "Errors occurred during initialization").outerHTML;
                shortycut.startupCache.initializationErrors
                    .map(function (error) { return error.toHtml(); })
                    .forEach(function (element) { return _this.dom.notification.applicationErrors.appendChild(element); });
                this.dom.notification.applicationErrors.style.display = "block";
            }
            else if (0 === shortycut.shortcuts.size) {
                if (shortycut.startupCache.exceptions.length) {
                    if (shortycut.supportsBacktickSyntax()) {
                        this.dom.notification.errorWithBacktickSupport.style.display = "block";
                    }
                    else {
                        this.dom.notification.errorWithoutBacktickSupport.style.display = "block";
                    }
                }
                else {
                    this.dom.notification.noShortcutsNoError.style.display = "block";
                }
            }
            else if (shortycut.isDemoMode()) {
                this.dom.notification.welcome.newTabs.style.display = shortycut.queryParameters.facets.newTabs ? "none" : "block";
                this.dom.notification.welcome.self.style.display = "block";
            }
        };
        Homepage.prototype.show = function () {
            this.addEventHandlers();
            this.dom.home.style.display = "flex";
            this.dom.filter.focus();
            this.updateFaviconManagerParameters(true);
        };
        Homepage.prototype.hide = function () {
            this.removeEventHandlers();
            this.dom.home.style.display = "none";
            this.updateFaviconManagerParameters(false);
        };
        Homepage.prototype.addEventHandlers = function () {
            var _this = this;
            ["change", "keydown", "input"].forEach(function (event) {
                return _this.dom.filter.addEventListener(event, _this.onFilterChanged);
            });
            ["focus", "blur"].forEach(function (event) {
                return [window, document, document.body, _this.dom.filter].forEach(function (element) {
                    return element.addEventListener(event, _this.onFocusEvent);
                });
            });
            if (shortycut.queryParameters.facets.noFocus) {
                ["mousedown", "keydown", "blur"].forEach(function (event) {
                    return window.addEventListener(event, _this.cancelClearFilter);
                });
                this.dom.filter.addEventListener("blur", this.scheduleClearFilter);
            }
            document.addEventListener("keydown", this.onKeyBody);
        };
        Homepage.prototype.removeEventHandlers = function () {
            var _this = this;
            ["change", "keydown", "input"].forEach(function (event) {
                return _this.dom.filter.removeEventListener(event, _this.onFilterChanged);
            });
            ["focus", "blur"].forEach(function (event) {
                return [window, document, document.body, _this.dom.filter].forEach(function (element) {
                    return element.removeEventListener(event, _this.onFocusEvent);
                });
            });
            if (shortycut.queryParameters.facets.noFocus) {
                ["mousedown", "keydown", "blur"].forEach(function (event) {
                    return window.removeEventListener(event, _this.cancelClearFilter);
                });
                this.dom.filter.removeEventListener("blur", this.scheduleClearFilter);
            }
            document.removeEventListener("keydown", this.onKeyBody);
        };
        Homepage.prototype.onKeyBody = function (event) {
            var isRightArrow = this.treatAsRightArrow(event);
            if (!shortycut.queryParameters.facets.noFocus) {
                this.dom.filter.focus();
            }
            if (this.isEscape(event)) {
                return this.onEscape(event);
            }
            else if (this.isArrowDown(event)) {
                this.selectSuggestion(this.selectedIndex + 1);
                event.preventDefault();
                return false;
            }
            else if (this.isArrowUp(event)) {
                this.selectSuggestion(this.selectedIndex - 1);
                event.preventDefault();
                return false;
            }
            else if ("Enter" === event.key || isRightArrow) {
                return this.onEnter(event, isRightArrow);
            }
            else if ("q" === event.key && event.ctrlKey) {
                this.dom.filter.focus();
            }
            return true;
        };
        Homepage.prototype.treatAsRightArrow = function (event) {
            return (this.isArrowRight(event))
                && 0 <= this.selectedIndex
                && (this.suggestions[this.selectedIndex].hidesMoreChildren
                    || "segment" === this.suggestions[this.selectedIndex].type);
        };
        Homepage.prototype.isArrowUp = function (event) {
            return "ArrowUp" === event.key || "Up" === event.key;
        };
        Homepage.prototype.isArrowDown = function (event) {
            return "ArrowDown" === event.key || "Down" === event.key;
        };
        Homepage.prototype.isEscape = function (event) {
            return "Escape" === event.key || "Esc" === event.key;
        };
        Homepage.prototype.isArrowRight = function (event) {
            return "ArrowRight" === event.key || "Right" === event.key;
        };
        Homepage.prototype.onEscape = function (event) {
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
        };
        Homepage.prototype.onEnter = function (event, isRightArrow) {
            var mode = event.ctrlKey ? shortycut.RedirectMode.NEW_TAB : shortycut.RedirectMode.PRESERVE_HISTORY;
            if (-1 === this.selectedIndex) {
                this.redirect(mode);
            }
            else {
                this.applySuggestion(this.selectedIndex, mode, isRightArrow);
            }
            event.preventDefault();
            return false;
        };
        Homepage.prototype.onFilterChanged = function () {
            if (this.dom.filter.value !== this.previousInput) {
                this.applyFilter();
                this.selectedIndex = -1;
            }
            return true;
        };
        Homepage.prototype.onFocusEvent = function () {
            var _this = this;
            if (!shortycut.queryParameters.facets.noFocus) {
                setTimeout(function () { return _this.dom.filter.focus(); }, 0);
            }
        };
        Homepage.prototype.cancelClearFilter = function () {
            if (this.clearFilterJob) {
                clearTimeout(this.clearFilterJob);
                this.clearFilterJob = undefined;
            }
            this.lastCancelClearFilterEvent = new Date().getTime();
        };
        Homepage.prototype.scheduleClearFilter = function () {
            if (Homepage.DEBOUNCE_MS <= new Date().getTime() - this.lastCancelClearFilterEvent) {
                this.clearFilterJob = setTimeout(this.clearFilter, Homepage.DEBOUNCE_POLLING_MS);
            }
        };
        Homepage.prototype.clearFilter = function () {
            if (!shortycut.queryParameters.facets.noFocus || this.dom.filter.value) {
                this.dom.filter.focus();
            }
            this.dom.filter.value = "";
            this.applyFilter();
        };
        Homepage.prototype.applyFilter = function (autoSelectFirstRow) {
            var _a;
            if (autoSelectFirstRow === void 0) { autoSelectFirstRow = false; }
            this.suggestions.length = 0;
            var input = this.dom.filter.value;
            var splitInput = input.split(/\s+/).map(function (word) { return word.trim(); }).filter(function (word) { return word; });
            var keyword = shortycut.adjustCase((_a = splitInput[0]) !== null && _a !== void 0 ? _a : "");
            var postKeywordInput = input.replace(/^\s*/, "").substring(keyword.length);
            if (keyword) {
                var shortcut = shortycut.shortcuts.get(keyword);
                this.collectSuggestions(keyword, splitInput, postKeywordInput, shortcut);
            }
            this.renderSuggestions(input, autoSelectFirstRow);
        };
        Homepage.prototype.collectSuggestions = function (keyword, splitInput, postKeywordInput, shortcut) {
            var _a, _b;
            if (shortcut && shortcut.queries && postKeywordInput) {
                this.suggestions.push(this.createSuggestion(shortcut, "match", "query"));
            }
            else if (!postKeywordInput) {
                (_a = this.suggestions).push.apply(_a, this.filter.keywordSearch(keyword, postKeywordInput));
            }
            else if (shortcut) {
                this.collectSuggestionsForShortcut(shortcut, splitInput, postKeywordInput);
            }
            if (!this.suggestions.length) {
                (_b = this.suggestions).push.apply(_b, this.filter.fullTextSearch(splitInput));
            }
        };
        Homepage.prototype.collectSuggestionsForShortcut = function (shortcut, splitInput, postKeywordInput) {
            var _a;
            if (shortcut.searchable) {
                (_a = this.suggestions).push.apply(_a, this.createSearchBucketSuggestions(shortcut, splitInput.slice(1)));
            }
            if (!this.suggestions.length) {
                if (shortcut.queries && 1 < splitInput.length && shortcut.queries) {
                    this.suggestions.push(this.createSuggestion(shortcut, "match", "query"));
                }
                else if (shortcut.bookmarks && !postKeywordInput) {
                    this.suggestions.push(this.createSuggestion(shortcut, "match", "bookmark"));
                }
            }
        };
        Homepage.prototype.renderSuggestions = function (input, autoSelectFirstRow) {
            this.suggestions.length = Math.min(Homepage.MAX_SUGGESTIONS, this.suggestions.length);
            this.displaySuggestions();
            this.previousInput = input;
            if (autoSelectFirstRow && 0 < this.suggestions.length) {
                this.selectedIndex = 0;
                this.dom.rows[0].classList.add("selected");
            }
            else {
                this.selectedIndex = -1;
                this.dom.headerRow.classList.add("selected");
            }
            this.dom.notification.self.style.display =
                0 < this.suggestions.length || this.dom.filter.value.trim().length
                    ? "none"
                    : "block";
            this.updateInputFieldHighlight();
        };
        Homepage.prototype.createSearchBucketSuggestions = function (shortcut, searchTerms) {
            var suggestions = this.filter.fullTextSearch(searchTerms, shortcut.keyword);
            if (suggestions.length) {
                if (shortcut.queries) {
                    return __spreadArray(__spreadArray([], suggestions, true), [this.createSuggestion(shortcut, "suggestion", "query")], false);
                }
                else {
                    return suggestions;
                }
            }
            else if (shortcut.queries) {
                return [this.createSuggestion(shortcut, "match", "query")];
            }
            else if (shortcut.bookmarks) {
                return [this.createSuggestion(shortcut, "match", "bookmark")];
            }
            return suggestions;
        };
        Homepage.prototype.createSuggestion = function (shortcut, type, shortcutType) {
            var links = "bookmark" === shortcutType
                ? shortycut.assertNotNull(shortcut.bookmarks)
                : shortycut.assertNotNull(shortcut.queries);
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
        Homepage.prototype.displaySuggestions = function () {
            var _this = this;
            this.updateFaviconManagerParameters(true);
            this.dom.rows = this.suggestions.map(function (suggestion, index) {
                return shortycut.create("div.row.".concat(suggestion.type, ".").concat(suggestion.shortcutType), [
                    shortycut.create("div.cursor", shortycut.create("img.icon", function (element) {
                        return element.src = "resources/arrow.svg";
                    })),
                    shortycut.create("div.row-content", [
                        shortycut.config.homepage.suggestions.showKeywords
                            ? shortycut.create("div.keyword:html", suggestion.keywordHtml)
                            : "",
                        shortycut.config.homepage.suggestions.showFavicons
                            ? shortycut.faviconManager.getFavicon(suggestion.shortcut.all[0].link.faviconUrls[0])
                            : "",
                        shortycut.create("div.description:html", _this.getDescription(suggestion))
                    ], function (rowContent) { return rowContent.addEventListener("click", function (event) {
                        _this.selectSuggestion(index);
                        _this.applySuggestion(_this.selectedIndex, event.ctrlKey ? shortycut.RedirectMode.NEW_TAB : shortycut.RedirectMode.PRESERVE_HISTORY, false);
                    }); })
                ]);
            });
            this.dom.suggestions.innerHTML = "";
            this.dom.rows.forEach(function (row) { return _this.dom.suggestions.appendChild(row); });
            if (Homepage.MAX_SUGGESTIONS <= this.suggestions.length) {
                this.dom.suggestions.classList.add("truncated");
            }
            else {
                this.dom.suggestions.classList.remove("truncated");
            }
        };
        Homepage.prototype.getDescription = function (suggestion) {
            if (suggestion.hidesMoreChildren || suggestion.type === "segment") {
                return shortycut.create("div:html", [
                    suggestion.descriptionHtml,
                    " ",
                    shortycut.create("span.more-indicator-text:html", "".concat(shortycut.Segments.SEPARATOR_HTML, " ...")),
                    shortycut.create("span.more-indicator-key:html", shortycut.create("span.key:html", "&rarr;"), " more")
                ]);
            }
            else {
                return suggestion.descriptionHtml;
            }
        };
        Homepage.prototype.updateInputFieldHighlight = function () {
            var hasInput = !!this.dom.filter.value.trim();
            var canUseSearchEngine = shortycut.defaultSearchEngine && shortycut.config.defaultSearchEngine.useOnHomepage;
            var focusOnSuggestion = this.selectedIndex !== -1;
            var hasFullTextSearchSuggestions = !!this.suggestions.length;
            var hasMatches = !!this.suggestions.filter(function (suggestion) { return suggestion.type !== "search-result"; }).length;
            if (!hasInput || canUseSearchEngine || focusOnSuggestion || hasMatches) {
                this.dom.filter.classList.remove("error");
                this.dom.filter.classList.remove("warning");
            }
            else if (hasFullTextSearchSuggestions) {
                this.dom.filter.classList.remove("error");
                this.dom.filter.classList.add("warning");
            }
            else {
                this.dom.filter.classList.add("error");
                this.dom.filter.classList.remove("warning");
            }
        };
        Homepage.prototype.selectSuggestion = function (index) {
            var _a, _b;
            index = Math.min(Math.max(-1, index), this.suggestions.length - 1);
            if (index !== this.selectedIndex) {
                if (-1 === this.selectedIndex) {
                    this.originalInput = this.dom.filter.value;
                }
                ((_a = this.dom.rows[this.selectedIndex]) !== null && _a !== void 0 ? _a : this.dom.headerRow).classList.remove("selected");
                this.selectedIndex = index;
                ((_b = this.dom.rows[this.selectedIndex]) !== null && _b !== void 0 ? _b : this.dom.headerRow).classList.add("selected");
                if (-1 === this.selectedIndex) {
                    this.previousInput = this.dom.filter.value = this.originalInput;
                }
                else {
                    var suggestion = this.suggestions[this.selectedIndex];
                    var keyword = this.suggestions[this.selectedIndex].keyword;
                    if (suggestion.type !== "segment" && suggestion.shortcutType !== "bookmark") {
                        this.previousInput = "".concat(keyword, " ");
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
        Homepage.prototype.applySuggestion = function (selectedIndex, mode, viaRightArrow, searchTerm) {
            var suggestion = this.suggestions[selectedIndex];
            var shortcut = suggestion.shortcut;
            if (suggestion.type === "segment" || (viaRightArrow && suggestion.hidesMoreChildren)) {
                this.applyFilter(viaRightArrow && suggestion.hidesMoreChildren);
            }
            else if (suggestion.type === "search-result") {
                this.applySearchResult(suggestion, viaRightArrow, mode);
            }
            else if (shortcut.bookmarks) {
                this.redirectToLinks(shortcut.getFinalizedBookmarks(), viaRightArrow, mode);
            }
            else if (shortcut.queries) {
                searchTerm = (searchTerm === null || searchTerm === void 0 ? void 0 : searchTerm.trim()) || this.promptForSearchTerm();
                if (searchTerm) {
                    this.redirectToLinks(shortcut.getFinalizedQueries(searchTerm), viaRightArrow, mode);
                }
            }
        };
        Homepage.prototype.redirectToLinks = function (links, viaRightArrow, mode) {
            shortycut.redirector.redirect(viaRightArrow ? __assign(__assign({}, links), { onMultiLink: shortycut.OnMultiLink.OPEN_IN_NEW_TAB }) : links, mode);
        };
        Homepage.prototype.applySearchResult = function (suggestion, viaRightArrow, mode) {
            var _a, _b, _c;
            if ((_a = suggestion.link) === null || _a === void 0 ? void 0 : _a.isQuery) {
                var searchTerm = this.promptForSearchTerm();
                if (searchTerm) {
                    this.redirectToLinks({
                        links: suggestion.link.toFinalizedLinks(searchTerm),
                        onMultiLink: (_b = suggestion.link.onMultiLink) !== null && _b !== void 0 ? _b : shortycut.OnMultiLink.getDefault()
                    }, viaRightArrow, mode);
                }
            }
            else if (suggestion.link) {
                this.redirectToLinks({
                    links: suggestion.link.toFinalizedLinks(""),
                    onMultiLink: (_c = suggestion.link.onMultiLink) !== null && _c !== void 0 ? _c : shortycut.OnMultiLink.getDefault()
                }, viaRightArrow, mode);
            }
        };
        Homepage.prototype.promptForSearchTerm = function () {
            var _a;
            return (_a = prompt("Search term")) === null || _a === void 0 ? void 0 : _a.trim();
        };
        Homepage.prototype.redirect = function (mode) {
            var input = this.dom.filter.value.trim();
            var keyword = shortycut.adjustCase(input.replace(/\s.*/, ""));
            var shortcut = shortycut.shortcuts.get(keyword);
            var postKeywordInput = input.replace(/^\s*/, "").substring(keyword.length);
            var searchTerm = postKeywordInput.trim();
            var links = (shortcut === null || shortcut === void 0 ? void 0 : shortcut.queries) && searchTerm ? shortcut === null || shortcut === void 0 ? void 0 : shortcut.queries : shortcut === null || shortcut === void 0 ? void 0 : shortcut.bookmarks;
            this.getSearchTermAndRedirect(mode, input, shortcut, postKeywordInput, searchTerm, links);
        };
        Homepage.prototype.getSearchTermAndRedirect = function (mode, input, shortcut, postKeywordInput, searchTerm, links) {
            if (postKeywordInput && (shortcut.searchable || !shortcut.queries) && this.suggestions.length) {
                this.applySuggestion(0, mode, false, postKeywordInput);
            }
            else {
                if (!(shortcut === null || shortcut === void 0 ? void 0 : shortcut.bookmarks) && (shortcut === null || shortcut === void 0 ? void 0 : shortcut.queries)) {
                    searchTerm || (searchTerm = this.promptForSearchTerm());
                    if (!searchTerm) {
                        return;
                    }
                }
                this.performRedirect(input, searchTerm !== null && searchTerm !== void 0 ? searchTerm : "", mode, links);
            }
        };
        Homepage.prototype.performRedirect = function (input, searchTerm, mode, links) {
            if (links) {
                shortycut.redirector.redirect(links.toFinalizedLinks(searchTerm.trim()), mode);
            }
            else if (shortycut.isUrl(input)) {
                shortycut.redirector.openUrl(input, mode);
            }
            else if ((shortycut.defaultSearchEngine === null || shortycut.defaultSearchEngine === void 0 ? void 0 : shortycut.defaultSearchEngine.queries) && shortycut.config.defaultSearchEngine.useOnHomepage) {
                shortycut.redirector.redirect(shortycut.defaultSearchEngine.getFinalizedLinks(input), mode);
            }
            else if (this.suggestions.length) {
                this.selectedIndex = 0;
                this.applySuggestion(this.selectedIndex, mode, false, searchTerm);
            }
        };
        Homepage.prototype.removeFocus = function () {
            var _this = this;
            setTimeout(function () { return _this.dom.filter.blur(); }, 0);
        };
        Homepage.prototype.updateFaviconManagerParameters = function (homepageIsVisible) {
            if (homepageIsVisible) {
                shortycut.faviconManager.setCurrentlyDisplayedLinks(this.suggestions.map(function (suggestion) { return suggestion.shortcut.all[0].link.faviconUrls[0]; })
                    .filter(function (url) { return url; }));
                if (shortycut.config.favicons.preloadOnStart) {
                    shortycut.faviconManager.startPreload();
                }
            }
            else {
                shortycut.faviconManager.removeCurrentlyDisplayedLinks();
            }
        };
        Homepage.MAX_SUGGESTIONS = 12;
        Homepage.DEBOUNCE_MS = 100;
        Homepage.DEBOUNCE_POLLING_MS = 10;
        return Homepage;
    }());
    shortycut.Homepage = Homepage;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var LinkTools = (function () {
        function LinkTools() {
            this.dom = {
                linkTools: document.querySelector("#link-tools"),
                harParser: {
                    input: document.querySelector("#link-tools .har-parser .input"),
                    output: document.querySelector("#link-tools .har-parser .output")
                },
                urlEncoding: {
                    decoded: document.querySelector("#link-tools input.decoded"),
                    encoded: document.querySelector("#link-tools input.encoded"),
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
            this.dom.urlEncoding.decoded.value = "";
            this.dom.urlEncoding.encoded.classList.remove("invalid");
            this.dom.urlEncoding.encoded.value = "";
            this.dom.harParser.input.classList.remove("invalid");
            this.dom.harParser.input.value = "";
            this.dom.harParser.output.innerHTML = "";
            return this;
        };
        LinkTools.prototype.show = function () {
            this.addEventHandlers();
            this.dom.linkTools.style.display = "flex";
        };
        LinkTools.prototype.hide = function () {
            this.removeEventHandlers();
            this.dom.linkTools.style.display = "none";
        };
        LinkTools.prototype.addEventHandlers = function () {
            var _this = this;
            ["change", "keydown", "input"].forEach(function (event) {
                _this.dom.urlEncoding.encoded.addEventListener(event, _this.onEncodedChanged);
                _this.dom.urlEncoding.decoded.addEventListener(event, _this.onDecodedChanged);
                _this.dom.harParser.input.addEventListener(event, _this.onHarInputChanged);
            });
        };
        LinkTools.prototype.removeEventHandlers = function () {
            var _this = this;
            ["change", "keydown", "input"].forEach(function (event) {
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
                this.dom.urlEncoding.encoded.classList.remove("invalid");
            }
            catch (exception) {
                this.dom.urlEncoding.decoded.value = "";
                this.dom.urlEncoding.encoded.classList.add("invalid");
            }
        };
        LinkTools.prototype.onHarInputChanged = function () {
            var _this = this;
            var input = this.dom.harParser.input.value.trim() || '{"log":{"entries":[]}}';
            try {
                this.dom.harParser.output.innerHTML = "";
                var links = this.extractPostLinks(input);
                if (links.length) {
                    this.dom.harParser.output.appendChild(shortycut.create("p", "This HAR file contain the following POST link".concat(1 < links.length ? "s" : "", ":")));
                    links.forEach(function (url) { return _this.dom.harParser.output.appendChild(url); });
                }
                else if (this.dom.harParser.input.value.trim()) {
                    this.dom.harParser.output.appendChild(shortycut.create("p", "This HAR file does not contain any POST links."));
                }
                this.dom.harParser.input.classList.remove("invalid");
            }
            catch (exception) {
                this.dom.harParser.input.classList.add("invalid");
            }
        };
        LinkTools.prototype.extractPostLinks = function (input) {
            var _a, _b, _c;
            var har = JSON.parse(input);
            var result = new Array();
            for (var _i = 0, _d = har.log.entries; _i < _d.length; _i++) {
                var entry = _d[_i];
                if ("POST" === ((_a = entry === null || entry === void 0 ? void 0 : entry.request) === null || _a === void 0 ? void 0 : _a.method)) {
                    var url = entry.request.url;
                    var postParameters = (_c = (_b = entry === null || entry === void 0 ? void 0 : entry.request) === null || _b === void 0 ? void 0 : _b.postData) === null || _c === void 0 ? void 0 : _c.params;
                    for (var index = 0; postParameters && index < postParameters.length; index++) {
                        url += 0 === index ? shortycut.config.shortcutFormat.url.postIndicator : "&";
                        var name_2 = encodeURIComponent(postParameters[index].name);
                        var value = encodeURIComponent(postParameters[index].value);
                        url += "".concat(name_2, "=").concat(value);
                    }
                    result.push(shortycut.create("p.url", shortycut.sanitize(url)));
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
                menu: document.querySelector("#menu"),
                burgerIcon: document.querySelector("#menu .burger-icon"),
                closeIcon: document.querySelector("#menu .close-icon"),
                items: document.querySelector("#menu .items")
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
            this.dom.items.innerHTML = "";
            var menuItems = [
                ["ShortyCut ".concat(shortycut.getVersionNumber()), this.onShortyCut],
                ["Documentation", this.onDocumentation],
                ["Link tools", this.onLinkTools],
                ["Browser integration", this.onBrowserIntegration],
                ["Favicons", this.onFavicons]
            ];
            menuItems.forEach(function (array) {
                return _this.dom.items.appendChild(shortycut.create("a", array[0], function (element) { return element.addEventListener("click", array[1]); }));
            });
        };
        Menu.prototype.addEventListeners = function () {
            this.dom.closeIcon.addEventListener("click", this.onClickCloseIcon);
            this.dom.burgerIcon.addEventListener("click", this.onClickBurgerIcon);
            document.body.addEventListener("click", this.onClickBody);
            document.body.addEventListener("keydown", this.onKeyDown);
        };
        Menu.prototype.removeEventListeners = function () {
            this.dom.closeIcon.removeEventListener("click", this.onClickCloseIcon);
            this.dom.burgerIcon.removeEventListener("click", this.onClickBurgerIcon);
            document.body.removeEventListener("click", this.onClickBody);
            document.body.removeEventListener("keydown", this.onKeyDown);
        };
        Menu.prototype.showBurgerIcon = function () {
            if (this.dom.menu.style.display === "none") {
                this.addEventListeners();
            }
            this.dom.burgerIcon.style.display = "block";
            this.dom.closeIcon.style.display = "none";
            this.dom.items.style.display = "none";
            this.dom.menu.style.display = "block";
        };
        Menu.prototype.showCloseIcon = function (onClose) {
            this.onClose = onClose;
            if (this.dom.menu.style.display === "none") {
                this.addEventListeners();
            }
            this.dom.burgerIcon.style.display = "none";
            this.dom.closeIcon.style.display = "block";
            this.dom.items.style.display = "none";
            this.dom.menu.style.display = "block";
        };
        Menu.prototype.hide = function () {
            this.removeEventListeners();
            this.dom.menu.style.display = "none";
        };
        Menu.prototype.closeMenu = function () {
            this.dom.items.style.display = "none";
        };
        Menu.prototype.onClickBurgerIcon = function (event) {
            this.dom.items.style.display = "none" === this.dom.items.style.display ? "block" : "none";
            return this.cancelEvent(event);
        };
        Menu.prototype.onClickCloseIcon = function (event) {
            if (this.onClose) {
                this.onClose();
            }
            return this.cancelEvent(event);
        };
        Menu.prototype.onClickBody = function () {
            this.closeMenu();
            return true;
        };
        Menu.prototype.onShortyCut = function (event) {
            this.closeMenu();
            var url = "https://github.com/david-04/shortycut";
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
            var url = shortycut.getWindowLocationPath() + "../index.html";
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
            if (("Escape" === event.key || "Esc" === event.key)) {
                if (this.dom.items.style.display !== "none") {
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
                redirect: document.querySelector("#redirect"),
                title: document.querySelector("#redirect .title"),
                url: document.querySelector("#redirect .url"),
            };
        }
        RedirectPage.prototype.populate = function (htmlDescription, url) {
            this.dom.title.innerHTML = htmlDescription;
            this.dom.url.innerHTML = shortycut.sanitize(url);
            return this;
        };
        RedirectPage.prototype.hasMenu = function () {
            return false;
        };
        RedirectPage.prototype.show = function () {
            document.body.append(shortycut.create("div:html", "&nbsp;"));
        };
        RedirectPage.prototype.hide = function () {
            this.dom.redirect.style.display = "none";
        };
        return RedirectPage;
    }());
    shortycut.RedirectPage = RedirectPage;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var SetupInstructions = (function () {
        function SetupInstructions() {
            this.setupComplete = false;
            this.dom = {
                setup: document.querySelector("#setup"),
                error: document.querySelector("#setup .error"),
                rootPath: document.querySelector("#setup .root-path"),
                header: document.querySelector("#setup h1"),
                pre: document.querySelector("#setup pre"),
                syntaxWarning: document.querySelector("#setup .syntax-warning")
            };
        }
        SetupInstructions.prototype.hasMenu = function () {
            return false;
        };
        SetupInstructions.prototype.populate = function (mode) {
            if (SetupInstructions.VALIDATE === mode) {
                if (!shortycut.startupCache.config.length || !shortycut.startupCache.shortcuts.length) {
                    this.dom.error.style.display = "block";
                    this.dom.header.style.display = "none";
                }
                else {
                    this.setupComplete = true;
                    shortycut.redirector.openUrl(window.location.href.replace(/\?.*/, ""), shortycut.RedirectMode.PRESERVE_HISTORY);
                }
            }
            var indexPath = "shortycut";
            if (0 === window.location.href.search(/^(file:\/{2}|[a-z]:|\/)/i)) {
                indexPath = shortycut.getWindowLocationPath()
                    .replace(/^file:\/+/, "")
                    .replace(/[?#].*/, "")
                    .replace(/\/$/, "");
                if (":" === indexPath.charAt(1)) {
                    indexPath = indexPath.replace(/\//g, "\\");
                }
            }
            this.dom.rootPath.innerHTML = shortycut.sanitize(indexPath);
            this.dom.pre.innerHTML = this.dom.pre.innerHTML.replace(/\n[ \t]+/g, "\n");
            this.dom.syntaxWarning.style.display = shortycut.supportsBacktickSyntax() ? "none" : "block";
            return this;
        };
        SetupInstructions.prototype.show = function () {
            if (!this.setupComplete) {
                this.dom.setup.style.display = "flex";
            }
        };
        SetupInstructions.prototype.hide = function () {
            this.dom.setup.style.display = "none";
        };
        SetupInstructions.VALIDATE = "validate";
        return SetupInstructions;
    }());
    shortycut.SetupInstructions = SetupInstructions;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var Shortlist = (function () {
        function Shortlist() {
            this.dom = {
                shortlist: shortycut.assertNotNull(document.getElementById("shortlist")),
                listItems: new Array()
            };
            this.links = new Array;
            this.focusIndex = 0;
            this.onKey = this.onKey.bind(this);
            this.openAll = this.openAll.bind(this);
        }
        Shortlist.prototype.hasMenu = function () {
            return true;
        };
        Shortlist.prototype.populate = function (links) {
            var _this = this;
            this.links = __spreadArray([null], links.links, true);
            this.dom.listItems = __spreadArray([
                this.createHeader()
            ], this.links.slice(1).map(function (link, index) {
                var _a, _b, _c;
                return _this.createLink(index + 1, link.urls[0].permalink, link.htmlDescription, function (event) { return _this.openSelected(event, index + 1); }, shortycut.sanitize((_b = (_a = link.urls[0]) === null || _a === void 0 ? void 0 : _a.url.replace(/^[a-z]+:\/\/+/i, "").replace(/[#?].*/, "")) !== null && _b !== void 0 ? _b : ""), (_c = link.urls[0]) === null || _c === void 0 ? void 0 : _c.url);
            }), true);
            this.dom.shortlist.innerHTML = "";
            this.dom.listItems.forEach(function (href) { return _this.dom.shortlist.appendChild(href); });
            this.focusIndex = 0;
            return this;
        };
        Shortlist.prototype.createHeader = function () {
            return this.createLink(0, "javascript:void(0)", "Open all", this.openAll);
        };
        Shortlist.prototype.createLink = function (index, permalink, title, onClick, subtitle, url) {
            var a = document.createElement("a");
            a.href = permalink;
            a.id = "shortlist".concat(index);
            var favicon = url && shortycut.config.homepage.suggestions.showFavicons ? shortycut.faviconManager.getFavicon(url) : "";
            a.innerHTML = shortycut.create("div.row", [
                shortycut.create("div.icon", shortycut.createImage("resources/arrow.svg")),
                shortycut.create("div.text", [
                    shortycut.create("div.title", title),
                    url && subtitle ? shortycut.create("div.url", favicon, subtitle) : ""
                ])
            ]).outerHTML;
            a.addEventListener("click", onClick);
            return a;
        };
        Shortlist.prototype.show = function () {
            this.addEventHandlers();
            this.dom.shortlist.style.display = "flex";
            this.dom.listItems[this.focusIndex].focus();
        };
        Shortlist.prototype.hide = function () {
            this.removeEventHandlers();
            this.dom.shortlist.style.display = "none";
        };
        Shortlist.prototype.addEventHandlers = function () {
            var _this = this;
            ["keyup", "keydown"].forEach(function (event) { return document.addEventListener(event, _this.onKey); });
        };
        Shortlist.prototype.removeEventHandlers = function () {
            var _this = this;
            ["keyup", "keydown"].forEach(function (event) { return document.removeEventListener(event, _this.onKey); });
        };
        Shortlist.prototype.onKey = function (event) {
            var _a;
            if ("keyup" === event.type) {
                return false;
            }
            var id = ((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.id) || "";
            var current = id.match(/^shortlist\d+$/) ? parseInt(id.replace(/shortlist/, "")) : -1;
            if ("Enter" === event.key) {
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
        Shortlist.prototype.openSelected = function (event, current) {
            shortycut.redirector.redirect({ links: [this.links[current]], onMultiLink: shortycut.OnMultiLink.OPEN_IN_NEW_TAB }, shortycut.queryParameters.facets.newTabs ? shortycut.RedirectMode.NEW_TAB : shortycut.RedirectMode.PRESERVE_HISTORY);
            event.preventDefault();
            return false;
        };
        Shortlist.prototype.openAll = function (event) {
            shortycut.redirector.redirect({ links: this.links.slice(1), onMultiLink: shortycut.OnMultiLink.OPEN_IN_NEW_TAB }, shortycut.RedirectMode.PRESERVE_HISTORY);
            event.preventDefault();
            return false;
        };
        Shortlist.prototype.getTargetIndex = function (key, current) {
            if (this.isArrowDown(key) || "Enter" === key || "Tab" === key) {
                return Math.min(Math.max(current + 1, 0), this.links.length - 1);
            }
            else if (this.isArrowUp(key)) {
                return current < 0
                    ? this.links.length - 1
                    : Math.max(Math.min(current - 1, this.links.length - 1), 0);
            }
            else if ("Home" === key || "PageUp" === key) {
                return 0;
            }
            else if ("End" === key || "PageDown" === key) {
                return this.links.length - 1;
            }
            return current;
        };
        Shortlist.prototype.isArrowDown = function (key) {
            return "ArrowDown" === key || "Down" === key;
        };
        Shortlist.prototype.isArrowUp = function (key) {
            return "ArrowUp" === key || "Up" === key;
        };
        return Shortlist;
    }());
    shortycut.Shortlist = Shortlist;
})(shortycut || (shortycut = {}));
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
            var message = "".concat(exception);
            shortycut.pages.error.populate("Internal error", [
                shortycut.create("p", "An internal error occurred:"),
                shortycut.create("p", message)
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
        InitializationError.prototype.toHtml = function () {
            return shortycut.create("div.description", this.htmlElements);
        };
        return InitializationError;
    }());
    shortycut.InitializationError = InitializationError;
    var ScriptLoadingError = (function (_super) {
        __extends(ScriptLoadingError, _super);
        function ScriptLoadingError(html) {
            return _super.call(this, shortycut.create("div:html", html)) || this;
        }
        return ScriptLoadingError;
    }(InitializationError));
    shortycut.ScriptLoadingError = ScriptLoadingError;
    var ParserError = (function (_super) {
        __extends(ParserError, _super);
        function ParserError(description, line) {
            var _this = _super.call(this, shortycut.create("div", description, ":"), shortycut.create("div", shortycut.create("tt", line))) || this;
            _this.description = description;
            _this.line = line;
            return _this;
        }
        return ParserError;
    }(InitializationError));
    shortycut.ParserError = ParserError;
    function runAndIgnoreErrors(callback) {
        try {
            callback();
        }
        catch (exception) {
        }
    }
    shortycut.runAndIgnoreErrors = runAndIgnoreErrors;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    var Hashtable = (function () {
        function Hashtable() {
            this.data = {};
        }
        Hashtable.prototype.get = function (key) {
            return this.data[key];
        };
        Hashtable.prototype.getOrDefault = function (key, defaultValue) {
            var _a;
            return (_a = this.data[key]) !== null && _a !== void 0 ? _a : defaultValue;
        };
        Hashtable.prototype.put = function (key, value) {
            this.data[key] = value;
        };
        Hashtable.prototype.computeIfAbsent = function (key, supplier) {
            var _a;
            var value = (_a = this.data[key]) !== null && _a !== void 0 ? _a : supplier(key);
            this.data[key] = value;
            return value;
        };
        Hashtable.prototype.delete = function (key) {
            delete this.data[key];
        };
        Object.defineProperty(Hashtable.prototype, "keys", {
            get: function () {
                return Object.keys(this.data);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Hashtable.prototype, "values", {
            get: function () {
                var _this = this;
                return Object.keys(this.data).map(function (key) { return _this.data[key]; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Hashtable.prototype, "entries", {
            get: function () {
                var _this = this;
                return Object.keys(this.data).map(function (key) { return ({ key: key, value: _this.data[key] }); });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Hashtable.prototype, "size", {
            get: function () {
                return this.keys.length;
            },
            enumerable: false,
            configurable: true
        });
        Hashtable.prototype.map = function (callback) {
            var _this = this;
            return this.entries.map(function (entry) { return callback(entry.key, entry.value, _this); });
        };
        Hashtable.prototype.mapKeys = function (callback) {
            var _this = this;
            return this.keys.map(function (key) { return callback(key, _this); });
        };
        Hashtable.prototype.mapValues = function (callback) {
            return this.values.map(function (value) { return callback(value); });
        };
        Hashtable.prototype.forEach = function (callback) {
            var _this = this;
            this.entries.forEach(function (entry) { return callback(entry.key, entry.value, _this); });
        };
        return Hashtable;
    }());
    shortycut.Hashtable = Hashtable;
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
                    return "".concat(description, " ").concat(keyword.substring(keywordIndex));
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
            return 0 <= code && code <= HotkeySelector.MAX_ASCII_CODE && char.match(/[^a-z]/i);
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
                currentCombination[index]++;
                if (currentCombination[index] < candidates[index].length) {
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
            result.push({ text: description.substring(0, hotkeyPositions[0]), isHotkey: false });
            for (var index = 0; index < hotkeyPositions.length; index++) {
                result.push({
                    text: description.substring(hotkeyPositions[index], hotkeyPositions[index] + 1),
                    isHotkey: true
                });
                var nextIndex = index + 1 < hotkeyPositions.length ? hotkeyPositions[index + 1] : description.length;
                result.push({ text: description.substring(hotkeyPositions[index] + 1, nextIndex), isHotkey: false });
            }
            return result.filter(function (item) { return item.text; });
        };
        HotkeySelector.MAX_ASCII_CODE = 127;
        return HotkeySelector;
    }());
    shortycut.HotkeySelector = HotkeySelector;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    function sanitize(content) {
        if ("string" !== typeof content) {
            return content;
        }
        else {
            return content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
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
        return applyCreateProperties.apply(void 0, __spreadArray([!element.classList.contains("html"), element], args, false));
    }
    shortycut.create = create;
    function createImage(url) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var image = create.apply(void 0, __spreadArray(["img"], args, false));
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
        Object.defineProperty(ElementProperties, "cache", {
            get: function () {
                var _a;
                var cache = (_a = ElementProperties._cache) !== null && _a !== void 0 ? _a : new shortycut.Hashtable();
                ElementProperties._cache = cache;
                return cache;
            },
            enumerable: false,
            configurable: true
        });
        ElementProperties.of = function (type) {
            return ElementProperties.cache.computeIfAbsent(type, ElementProperties.parse);
        };
        ElementProperties.parse = function (type) {
            var array = type.split(/(?=[.#:])/).map(function (token) { return token.trim(); }).filter(function (token) { return token; });
            return new ElementProperties(array[0], array.filter(function (item) { return "." === item.charAt(0); }).map(function (item) { return item.substring(1); }).join(" "), array.some(function (item) { return item === ":html"; }), array.filter(function (item) { return "#" === item.charAt(0); }).map(function (item) { return item.substring(1); })[0]);
        };
        return ElementProperties;
    }());
    function applyCreateProperties(mustSanitize, element) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var arg = args_1[_a];
            if ("function" === typeof arg) {
                var result = arg(element);
                if (Array.isArray(result)) {
                    element = applyCreateProperties.apply(void 0, __spreadArray([mustSanitize, element], result, false));
                }
                else if (null !== result && undefined !== result) {
                    element = applyCreateProperties(mustSanitize, element, result);
                }
            }
            else if ("string" === typeof arg) {
                element.innerHTML += mustSanitize ? arg : sanitize(arg);
            }
            else if (Array.isArray(arg)) {
                element = applyCreateProperties.apply(void 0, __spreadArray([mustSanitize, element], arg, false));
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
        if (a < b) {
            return -1;
        }
        else {
            return a === b ? 0 : 1;
        }
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
        return "1.4.1".replace(/^##.*/, "");
    }
    shortycut.getVersionNumber = getVersionNumber;
    function supportsBacktickSyntax() {
        try {
            eval('window["shortycutBrowserTest"] = `success`');
        }
        catch (exception) {
        }
        var valueMatches = "success" === window.shortycutBrowserTest;
        delete window.shortycutBrowserTest;
        return valueMatches;
    }
    shortycut.supportsBacktickSyntax = supportsBacktickSyntax;
    function isDemoMode() {
        var demoKeywords = ["tm", "tz", "tp", "tt", "tr", "e", "news"];
        var matchedKeywords = demoKeywords.filter(function (keyword) { return shortycut.shortcuts.get(keyword); });
        return shortycut.shortcuts.size === demoKeywords.length && matchedKeywords.length === demoKeywords.length;
    }
    shortycut.isDemoMode = isDemoMode;
    function assertNotNull(value) {
        if (undefined === value) {
            throw new Error("Value is undefined");
        }
        else if (null === value) {
            throw new Error("Value is null");
        }
        else {
            return value;
        }
    }
    shortycut.assertNotNull = assertNotNull;
    function getWindowLocationPath() {
        var url = window.location.href.replace(/[#?].*/, "");
        var index = url.lastIndexOf("/");
        var lastPathSegment = url.substring(index + 1);
        if (lastPathSegment) {
            if (0 <= lastPathSegment.indexOf(".")) {
                return url.substring(0, index + 1);
            }
            else {
                return "".concat(url, "/");
            }
        }
        else {
            return url;
        }
    }
    shortycut.getWindowLocationPath = getWindowLocationPath;
    function forEachProperty(object, callback) {
        Object.keys(object).forEach(function (key) { return callback(key, getProperty(object, key)); });
    }
    shortycut.forEachProperty = forEachProperty;
    function getProperty(object, key) {
        return object && "object" === typeof object ? object[key] : undefined;
    }
    shortycut.getProperty = getProperty;
})(shortycut || (shortycut = {}));
var shortycut;
(function (shortycut) {
    function adjustCase(text) {
        return (text && !shortycut.config.shortcutFormat.keyword.caseSensitive) ? text.toLowerCase() : text;
    }
    shortycut.adjustCase = adjustCase;
    function replaceAll(source, search, replacement, caseSensitive) {
        var result = "";
        if (!caseSensitive) {
            search = search.toLocaleLowerCase();
        }
        var index = (caseSensitive ? source : source.toLocaleLowerCase()).indexOf(search);
        while (0 <= index) {
            result += source.substring(0, index) + replacement;
            source = source.substring(index + search.length);
            index = (caseSensitive ? source : source.toLocaleLowerCase()).indexOf(search);
        }
        return result + source;
    }
    shortycut.replaceAll = replaceAll;
    function startsWith(line, pattern) {
        return !!pattern
            && !!line
            && pattern.length <= line.length
            && line.substring(0, pattern.length) === pattern;
    }
    shortycut.startsWith = startsWith;
    function endsWith(line, pattern) {
        return !!pattern
            && !!line
            && pattern.length <= line.length
            && line.substring(line.length - pattern.length, line.length) === pattern;
    }
    shortycut.endsWith = endsWith;
    function isUrl(text) {
        for (var _i = 0, _a = ["http://", "https://", "ftp://", "file://"]; _i < _a.length; _i++) {
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
