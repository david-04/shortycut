"use strict";
(() => {
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/web-app/application/api.ts
var api_exports = {};
__export(api_exports, {
  addShortcuts: () => addShortcuts,
  configure: () => configure,
  loadJavaScript: () => loadJavaScript,
  toBookmarkUrl: () => toBookmarkUrl,
  toQueryUrl: () => toQueryUrl,
  toUrl: () => toUrl
});

// src/web-app/utilities/hashtable.ts
var Hashtable = class {
  constructor() {
    __publicField(this, "data", {});
  }
  //------------------------------------------------------------------------------------------------------------------
  // Add and retrieve items
  //------------------------------------------------------------------------------------------------------------------
  get(key) {
    return this.data[key];
  }
  getOrDefault(key, defaultValue) {
    var _a;
    return (_a = this.data[key]) != null ? _a : defaultValue;
  }
  put(key, value) {
    this.data[key] = value;
  }
  computeIfAbsent(key, supplier) {
    var _a;
    const value = (_a = this.data[key]) != null ? _a : supplier(key);
    this.data[key] = value;
    return value;
  }
  delete(key) {
    delete this.data[key];
  }
  //------------------------------------------------------------------------------------------------------------------
  // Retrieve keys, values and entries
  //------------------------------------------------------------------------------------------------------------------
  get keys() {
    return Object.keys(this.data);
  }
  get values() {
    return Object.values(this.data);
  }
  get entries() {
    return Object.entries(this.data).map(([key, value]) => ({ key, value }));
  }
  get size() {
    return this.keys.length;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Apply operations to each key, value or entry
  //------------------------------------------------------------------------------------------------------------------
  map(callback) {
    return this.entries.map((entry) => callback(entry.key, entry.value, this));
  }
  mapKeys(callback) {
    return this.keys.map((key) => callback(key, this));
  }
  mapValues(callback) {
    return this.values.map((value) => callback(value));
  }
  forEach(callback) {
    this.entries.forEach((entry) => callback(entry.key, entry.value, this));
  }
};

// src/web-app/data/shortcuts.ts
var shortcuts = new Hashtable();

// src/web-app/utilities/misc.ts
function comparator(a, b) {
  if (a < b) {
    return -1;
  } else {
    return a === b ? 0 : 1;
  }
}
function comparing(fieldSelector) {
  return fieldSelector ? (a, b) => comparator(fieldSelector(a), fieldSelector(b)) : comparator;
}
function supportsBacktickSyntax() {
  const globalThisTyped = globalThis;
  try {
    eval('globalThis["shortycutBrowserTest"] = `success`');
  } catch (e) {
  }
  const valueMatches = "success" === globalThisTyped.shortycutBrowserTest;
  delete globalThisTyped.shortycutBrowserTest;
  return valueMatches;
}
function isDemoMode() {
  const demoKeywords = ["tm", "tz", "tp", "tt", "tr", "e", "news"];
  const matchedKeywords = demoKeywords.filter((keyword) => shortcuts.get(keyword));
  return shortcuts.size === demoKeywords.length && matchedKeywords.length === demoKeywords.length;
}
function assertNotNull(value) {
  if (void 0 === value) {
    throw new Error("Value is undefined");
  } else if (null === value) {
    throw new Error("Value is null");
  } else {
    return value;
  }
}
function getWindowLocationPath() {
  const url = globalThis.location.href.replace(/[#?].*/, "");
  const index = url.lastIndexOf("/");
  const lastPathSegment = url.substring(index + 1);
  if (lastPathSegment) {
    return lastPathSegment.includes(".") ? url.substring(0, index + 1) : `${url}/`;
  } else {
    return url;
  }
}
function getProperty(object, key) {
  return object && "object" === typeof object ? object[key] : void 0;
}
function isDemo() {
  return globalThis["shortycut/is-demo"] === true;
}

// src/web-app/utilities/html.ts
function sanitize(content) {
  return "string" === typeof content ? content.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;") : content;
}
function create(type, ...args) {
  const properties = ElementProperties.of(type);
  const element = document.createElement(properties.tag);
  element.className = properties.className;
  return applyCreateProperties(!element.classList.contains("html"), element, ...args);
}
function createImage(url, ...args) {
  const image = create("img", ...args);
  image.src = url;
  return image;
}
var _ElementProperties = class _ElementProperties {
  constructor(tag, className, isSanitized, id) {
    this.tag = tag;
    this.className = className;
    this.isSanitized = isSanitized;
    this.id = id;
  }
  static get cache() {
    var _a;
    const cache = (_a = _ElementProperties._cache) != null ? _a : new Hashtable();
    _ElementProperties._cache = cache;
    return cache;
  }
  static of(type) {
    return _ElementProperties.cache.computeIfAbsent(type, _ElementProperties.parse);
  }
  static parse(type) {
    const array = type.split(/(?=[.#:])/).map((token) => token.trim()).filter(Boolean);
    return new _ElementProperties(
      assertNotNull(array[0]),
      array.filter((item) => item.startsWith(".")).map((item) => item.substring(1)).join(" "),
      array.includes(":html"),
      array.filter((item) => item.startsWith("#")).map((item) => item.substring(1))[0]
    );
  }
};
__publicField(_ElementProperties, "_cache");
var ElementProperties = _ElementProperties;
function applyCreateProperties(mustSanitize, element, ...args) {
  for (const arg of args) {
    if ("function" === typeof arg) {
      const result = arg(element);
      if (Array.isArray(result)) {
        element = applyCreateProperties(mustSanitize, element, ...result);
      } else if (null !== result && void 0 !== result) {
        element = applyCreateProperties(mustSanitize, element, result);
      }
    } else if ("string" === typeof arg) {
      element.innerHTML += mustSanitize ? arg : sanitize(arg);
    } else if (Array.isArray(arg)) {
      element = applyCreateProperties(mustSanitize, element, ...arg);
    } else if (arg) {
      element.appendChild(arg);
    }
  }
  return element;
}

// src/web-app/data/startup-cache.ts
var startupCache = {
  exceptions: new Array(),
  config: new Array(),
  shortcuts: new Array(),
  initializationErrors: new Array(),
  dynamicLinks: new Hashtable()
};

// src/web-app/data/config.ts
var JSON_TAB_SIZE = 4;
var DEFAULT_CONFIG = {
  shortcutFormat: {
    comment: "//",
    keyword: {
      caseSensitive: false,
      openingDelimiter: "[",
      separator: "|",
      closingDelimiter: "]"
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
      showFavicons: true
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
  for (const currentConfig of startupCache.config) {
    migrateConfig(currentConfig);
    mergeConfig(state.config, currentConfig, currentConfig);
  }
  validateConfig();
  if (!state.config.shortcutFormat.keyword.caseSensitive) {
    state.config.shortcutFormat.url.searchTermPlaceholder = adjustCase(
      state.config.shortcutFormat.url.searchTermPlaceholder
    );
    state.config.shortcutFormat.url.postIndicator = adjustCase(state.config.shortcutFormat.url.postIndicator);
    state.config.defaultSearchEngine.keyword = adjustCase(state.config.defaultSearchEngine.keyword);
    state.config.homepage.keywords = state.config.homepage.keywords.filter((keyword) => !!keyword).map((keyword) => adjustCase(keyword));
  }
}
function migrateConfig(config) {
  var _a, _b, _c;
  const faviconFolders = (_b = (_a = config == null ? void 0 : config.homepage) == null ? void 0 : _a.suggestions) == null ? void 0 : _b.faviconFolders;
  if (faviconFolders) {
    delete config.homepage.suggestions.faviconFolders;
    config.favicons = (_c = config.favicons) != null ? _c : {};
    config.favicons.localFolders = toArray(config.favicons.localFolders);
    toArray(faviconFolders).forEach((folder) => config.favicons.localFolders.push(folder));
  }
}
function mergeConfig(target, patch, patchRoot) {
  Object.entries(patch).forEach(([key, patchValue]) => {
    const targetValue = getProperty(target, key);
    validateBeforeConfigMerge(key, target, targetValue, patchValue);
    if (patchValue && "object" === typeof patchValue && !Array.isArray(patchValue)) {
      mergeConfig(targetValue, patchValue, patchRoot);
      return;
    }
    if ("string" === typeof patchValue) {
      patchValue = patchValue.trim() || void 0;
    }
    if (null === patchValue) {
      patchValue = void 0;
    }
    target[key] = "string" === typeof patchValue ? patchValue.trim() : patchValue;
  });
}
function validateBeforeConfigMerge(key, target, targetValue, patchValue) {
  return [
    [!Object.hasOwn(target, key), "is not supported"],
    [isObject(targetValue) && !isObject(patchValue), "must be a nested object"],
    [Array.isArray(targetValue) && (!patchValue || !Array.isArray(patchValue)), "must be an array"],
    ["boolean" === typeof targetValue && "boolean" != typeof patchValue, "must be boolean (true or false)"],
    [isStringy(targetValue) && !isStringy(patchValue), "must be a string"]
  ];
}
function validateConfig() {
  const onMultiLink = state.config.shortcutFormat.url.multiLinkIndicator;
  const rules = [
    [
      state.config.shortcutFormat.keyword.openingDelimiter && !state.config.shortcutFormat.keyword.closingDelimiter,
      "When using an openingDelimiter, the closingDelimiter must be set as well",
      ["openingDelimiter", "closingDelimiter"]
    ],
    [
      !state.config.shortcutFormat.keyword.openingDelimiter && state.config.shortcutFormat.keyword.closingDelimiter,
      "The closingDelimiter can only be used if the openingDelimiter is set as well",
      ["openingDelimiter", "closingDelimiter"]
    ],
    [
      !state.config.shortcutFormat.url.searchTermPlaceholder,
      "The searchTermPlaceholder must not be empty or null",
      ["searchTermPlaceholder"]
    ],
    [
      !(onMultiLink == null ? void 0 : onMultiLink.default.match(/^(replacePreviousDefinition|openInNewTab|showMenu)$/)),
      'default must be "replacePreviousDefinition", "openInNewTab" or "showMenu"',
      ["default"]
    ],
    [
      multiLinkSymbolsOverlap(onMultiLink),
      "The symbols symbols indicating how to handle multiple links per keyword must not overlap",
      ["openInNewTab", "replacePreviousDefinition", "showMenu", "searchBucket"]
    ],
    [
      state.config.homepage.keywords.some((shortcut) => !shortcut.trim()),
      "help must not contain empty strings (but the array can be empty)",
      ["homepageKeywords"]
    ]
  ];
  rules.forEach((value) => {
    const [isValid, errorMessage, fields] = value;
    throwConfigExceptionIf(!!isValid, errorMessage, fields);
  });
}
function multiLinkSymbolsOverlap(onMultiLink) {
  const symbols = [
    onMultiLink.openInNewTab,
    onMultiLink.replacePrevious,
    onMultiLink.showMenu,
    onMultiLink.searchBucket
  ];
  const overlaps = symbols.filter(
    (symbol1, index1) => !!symbols.filter((symbol2, index2) => index1 !== index2 && startsWith(symbol1, symbol2)).length
  );
  return !!overlaps.length;
}
function isObject(value) {
  const isObject2 = null != value && "object" === typeof value;
  return isObject2 && !Array.isArray(value) && "function" !== typeof value && !(value instanceof RegExp);
}
function isStringy(value) {
  return null == value || "string" === typeof value;
}
function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  } else if (value) {
    return [value];
  } else {
    return [];
  }
}
function throwConfigExceptionIf(condition, description, properties, overrideConfig) {
  if (condition) {
    throwConfigException(description, properties, overrideConfig);
  }
}
function throwConfigException(description, properties, overrideConfig) {
  throw new Exception(
    "Configuration error",
    create("p", "There's a problem with the configuration:"),
    create("p.errorMessage", description),
    create(
      "p",
      overrideConfig ? "The error occurred while applying the following configuration:" : "The configuration (which might include non-overridden default settings) looks like this:"
    ),
    create("pre", renderJson(overrideConfig || state.config, properties))
  );
}
function renderJson(config, properties) {
  replaceRegexpFunctionsAndUndefinedValues(config);
  let result = sanitize(JSON.stringify(config, void 0, JSON_TAB_SIZE));
  for (const property of properties) {
    result = replaceAll(
      result,
      `&quot;${property}&quot;`,
      `&quot;<span class="jsonError">${property}</span>&quot;`,
      true
    );
  }
  return result;
}
function replaceRegexpFunctionsAndUndefinedValues(object) {
  for (const key in object) {
    if (object[key]) {
      if (object[key] instanceof RegExp) {
        object[key] = `/${object[key].source}/`;
      } else if ("function" === typeof object[key]) {
        object[key] = `${object[key]}`;
      } else if ("object" === typeof object[key]) {
        replaceRegexpFunctionsAndUndefinedValues(object[key]);
      }
    } else if (void 0 === object[key]) {
      object[key] = null;
    }
  }
}

// src/web-app/data/state.ts
var state = {
  config: DEFAULT_CONFIG,
  defaultSearchEngine: nullAs(),
  router: nullAs(),
  faviconManager: nullAs()
};
function nullAs() {
  return null;
}

// src/web-app/utilities/string.ts
function adjustCase(text) {
  return text && !state.config.shortcutFormat.keyword.caseSensitive ? text.toLowerCase() : text;
}
function replaceAll(source, search, replacement, caseSensitive) {
  let result = "";
  if (!caseSensitive) {
    search = search.toLocaleLowerCase();
  }
  let index = (caseSensitive ? source : source.toLocaleLowerCase()).indexOf(search);
  while (0 <= index) {
    result += source.substring(0, index) + replacement;
    source = source.substring(index + search.length);
    index = (caseSensitive ? source : source.toLocaleLowerCase()).indexOf(search);
  }
  return result + source;
}
function startsWith(line, pattern) {
  return !!pattern && !!line && pattern.length <= line.length && line.startsWith(pattern);
}
function endsWith(line, pattern) {
  return !!pattern && !!line && pattern.length <= line.length && line.endsWith(pattern);
}
function isUrl(text) {
  for (const protocol of ["http://", "https://", "ftp://", "file://"]) {
    if (startsWith(text, protocol)) {
      return true;
    }
  }
  return false;
}

// src/web-app/data/query-parameters.ts
var queryParameters;
((queryParameters2) => {
  queryParameters2.QUERY_KEY = "q";
  queryParameters2.REDIRECT_KEY = "r";
  queryParameters2.SETUP_KEY = "setup";
  queryParameters2.FACETS_KEY = "facets";
  queryParameters2.THEME_KEY = "theme";
  queryParameters2.urlSearchParams = new URLSearchParams(globalThis.location.search);
  queryParameters2.facets = getFacets(queryParameters2.urlSearchParams);
  queryParameters2.query = getQuery(queryParameters2.urlSearchParams);
  queryParameters2.redirect = getRedirect(queryParameters2.urlSearchParams);
  queryParameters2.setup = queryParameters2.urlSearchParams.get(queryParameters2.SETUP_KEY);
  queryParameters2.theme = ["light", "dark"].find((theme2) => theme2 === queryParameters2.urlSearchParams.get(queryParameters2.THEME_KEY));
  function getFacets(urlSearchParams2) {
    var _a;
    const facets2 = ((_a = urlSearchParams2.get(queryParameters2.FACETS_KEY)) != null ? _a : "").split(",").map((facet) => facet.trim().toLowerCase()).filter(Boolean);
    return facets2.reduce(
      (accumulated, current) => {
        const key = { "new-tabs": "newTabs", "no-focus": "noFocus" }[current];
        if (key) {
          return __spreadProps(__spreadValues({}, accumulated), { [key]: true });
        }
        startupCache.initializationErrors.push(
          () => new InitializationError(
            create("div", "Facet ", create("tt", current), " (in this page's address) is not supported")
          )
        );
        return accumulated;
      },
      { newTabs: false, noFocus: false }
    );
  }
  function getQuery(urlSearchParams2) {
    var _a;
    const full = ((_a = urlSearchParams2.get(queryParameters2.QUERY_KEY)) != null ? _a : "").trim();
    const keyword = adjustCase(full).replace(/\s.*/, "");
    const searchTerm = full.replace(/^[^\s]+\s*/, "");
    return { full, keyword, searchTerm };
  }
  function getRedirect(urlSearchParams2) {
    const redirect2 = urlSearchParams2.get(queryParameters2.REDIRECT_KEY);
    return redirect2 ? JSON.parse(redirect2) : void 0;
  }
})(queryParameters || (queryParameters = {}));

// src/web-app/pages/browser-integration.ts
var BrowserIntegration = class {
  //------------------------------------------------------------------------------------------------------------------
  // Initialize the link-tools page
  //------------------------------------------------------------------------------------------------------------------
  constructor() {
    __publicField(this, "dom", {
      browserIntegration: document.querySelector("#browser-integration"),
      homepage: document.querySelector("#browser-integration .homepage"),
      facets: {
        newTabs: document.querySelector("#browser-integration .new-tabs"),
        noFocus: document.querySelector("#browser-integration .no-focus")
      },
      themeRadioButtons: Array.from(
        document.querySelectorAll("#browser-integration input[name='theme']")
      ),
      form: document.querySelector("#browser-integration .form"),
      keyword: document.querySelector("#browser-integration .keyword"),
      webServerRequired: document.querySelector("#browser-integration .web-server-required"),
      searchEngine: document.querySelector("#browser-integration .search-engine"),
      openSearch: document.querySelector("#browser-integration .open-search"),
      popUp: document.querySelector("#browser-integration .pop-up")
    });
    this.updateHomepageLink = this.updateHomepageLink.bind(this);
    this.dom.facets.newTabs.checked = queryParameters.facets.newTabs;
    this.dom.facets.noFocus.checked = queryParameters.facets.noFocus;
    this.dom.themeRadioButtons.forEach((radio) => {
      var _a;
      radio.checked = radio.value === ((_a = queryParameters.theme) != null ? _a : "system");
    });
    this.updateHomepageLink();
    const baseUrl = globalThis.location.href.replace(/[#?].*/, "");
    this.dom.form.action = baseUrl;
    this.dom.keyword.innerHTML = `${sanitize(baseUrl)}?q=%s`;
    this.dom.keyword.href = `${baseUrl}?q=%s`;
    if (globalThis.location.href.startsWith("http://")) {
      this.dom.searchEngine.style.display = "block";
    } else {
      this.dom.webServerRequired.style.display = "block";
    }
    const baseFolder = getWindowLocationPath();
    this.dom.openSearch.href = `${baseFolder}data/search.xml`;
    this.dom.openSearch.innerHTML = sanitize(`${baseFolder}data/search.xml`);
    this.dom.popUp.addEventListener("click", () => {
      for (let index = 0; index <= 1; index++) {
        const popUp = globalThis.open("");
        if (popUp == null ? void 0 : popUp.document) {
          popUp.document.body.innerHTML = [
            "This window was opened by ShortyCut.",
            "Pop-ups are not being blocked.",
            "You can close this windows."
          ].join("<br>");
          popUp.document.title = "ShortyCut Pop-Up Test";
        }
      }
    });
  }
  hasMenu() {
    return true;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Show and hide the page
  //------------------------------------------------------------------------------------------------------------------
  show() {
    this.dom.browserIntegration.style.display = "flex";
    this.addEventHandlers();
  }
  hide() {
    this.dom.browserIntegration.style.display = "none";
    this.removeEventHandlers();
  }
  //------------------------------------------------------------------------------------------------------------------
  // Event handlers
  //------------------------------------------------------------------------------------------------------------------
  addEventHandlers() {
    Object.values(this.dom.facets).forEach((checkbox) => checkbox.addEventListener("click", this.updateHomepageLink));
    this.dom.themeRadioButtons.forEach((radio) => radio.addEventListener("change", this.updateHomepageLink));
  }
  removeEventHandlers() {
    Object.values(this.dom.facets).forEach(
      (checkbox) => checkbox.removeEventListener("click", this.updateHomepageLink)
    );
    this.dom.themeRadioButtons.forEach((radio) => radio.removeEventListener("change", this.updateHomepageLink));
  }
  updateHomepageLink() {
    var _a, _b;
    const facets = Object.keys(this.dom.facets).filter((facet) => {
      var _a2;
      return (_a2 = this.dom.facets[facet]) == null ? void 0 : _a2.checked;
    }).map((facet) => "noFocus" === facet ? "no-focus" : facet).map((facet) => "newTabs" === facet ? "new-tabs" : facet);
    const theme = (_b = (_a = this.dom.themeRadioButtons.find((radio) => radio.checked)) == null ? void 0 : _a.value) != null ? _b : "";
    const urlSearchParams = new URLSearchParams(__spreadValues(__spreadValues({}, facets.length ? { facets: facets.join(",") } : {}), ["light", "dark"].includes(theme) ? { [queryParameters.THEME_KEY]: theme } : {})).toString().replaceAll("%2C", ",");
    const url = [globalThis.location.href.replace(/[#?].*/, ""), urlSearchParams].filter(Boolean).join("?");
    this.dom.homepage.innerHTML = sanitize(url);
    this.dom.homepage.href = url;
  }
};

// src/web-app/pages/error-page.ts
var ErrorPage = class {
  constructor() {
    __publicField(this, "dom", {
      error: document.querySelector("#error"),
      title: document.querySelector("#error .title"),
      message: document.querySelector("#error .message")
    });
  }
  populate(titleOrException, ...message) {
    if (titleOrException instanceof Exception) {
      this.dom.title.innerHTML = titleOrException.title;
      message = titleOrException.content;
    } else if ("string" === typeof titleOrException) {
      this.dom.title.innerHTML = titleOrException;
    }
    message.forEach((item) => {
      (Array.isArray(item) ? item : [item]).forEach((element) => {
        if ("object" === typeof element) {
          this.dom.message.appendChild(element);
        } else {
          this.dom.message.innerHTML += element;
        }
      });
    });
    return this;
  }
  hasMenu() {
    return false;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Show and hide the page
  //------------------------------------------------------------------------------------------------------------------
  show() {
    this.dom.error.style.display = "flex";
  }
  hide() {
    this.dom.error.style.display = "none";
  }
};

// src/web-app/pages/favicon-tools.ts
var FaviconTools = class {
  //------------------------------------------------------------------------------------------------------------------
  // Initialize the page and start loading all favicons
  //------------------------------------------------------------------------------------------------------------------
  constructor() {
    __publicField(this, "dom", {
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
      offlineListing: document.querySelector("#favicon-tools .offline .listing")
    });
    this.showCurlCommands = this.showCurlCommands.bind(this);
    this.selectAllCurlCommands = this.selectAllCurlCommands.bind(this);
    this.dom.configWarning.style.display = state.config.homepage.suggestions.showFavicons ? "none" : "block";
  }
  hasMenu() {
    return true;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Show and hide the page
  //------------------------------------------------------------------------------------------------------------------
  show() {
    this.addEventHandlers();
    this.dom.faviconTools.style.display = "flex";
    state.faviconManager.startFullRescan();
    this.refreshPageContent();
  }
  hide() {
    this.removeEventHandlers();
    this.dom.faviconTools.style.display = "none";
  }
  addEventHandlers() {
    this.dom.curlLink.addEventListener("click", this.showCurlCommands);
    this.dom.curlTextarea.addEventListener("focus", this.selectAllCurlCommands);
  }
  removeEventHandlers() {
    this.dom.curlLink.removeEventListener("click", this.showCurlCommands);
    this.dom.curlTextarea.addEventListener("focus", this.selectAllCurlCommands);
  }
  //------------------------------------------------------------------------------------------------------------------
  // Event handlers
  //------------------------------------------------------------------------------------------------------------------
  showCurlCommands(event) {
    this.dom.curlLink.style.display = "none";
    this.dom.curlTextarea.style.display = "block";
    event.preventDefault();
    return false;
  }
  selectAllCurlCommands() {
    this.dom.curlTextarea.select();
  }
  //------------------------------------------------------------------------------------------------------------------
  // Check if further favicons have been loaded and update the view
  //------------------------------------------------------------------------------------------------------------------
  refreshPageContent() {
    if ("none" !== this.dom.faviconTools.style.display) {
      this.refreshPageContentPending();
      this.refreshPageContentMissing();
      this.refreshPageContentOnline();
      this.refreshPageContentOffline();
    }
  }
  refreshPageContentPending() {
    const domains = state.faviconManager.getPendingDomains();
    if (domains.length) {
      this.dom.pendingListing.innerHTML = create(
        "div",
        domains.map((domain) => create("div.row", sanitize(domain)))
      ).innerHTML;
    }
    this.dom.pending.style.display = domains.length ? "block" : "none";
  }
  refreshPageContentMissing() {
    const fetchService = state.config.favicons.fetchService;
    const domains = state.faviconManager.getMissingDomains();
    if (!fetchService && domains.length) {
      this.dom.missingListing.innerHTML = create(
        "div",
        domains.map((domain) => create("div.row", sanitize(domain)))
      ).innerHTML;
    }
    this.dom.missing.style.display = !fetchService && domains.length ? "block" : "none";
  }
  refreshPageContentOnline() {
    const fetchService = state.config.favicons.fetchService;
    const icons = state.faviconManager.getOnlineDomains();
    const missingDomains = state.faviconManager.getMissingDomains();
    const allIcons = [...icons];
    if (fetchService) {
      missingDomains.forEach((domain) => {
        const encodedDomain = encodeURIComponent(domain.replace(/:\d+$/, ""));
        const url = fetchService.replace("%s", encodedDomain);
        allIcons.push({ filename: `${domain.replaceAll(":", "!")}.ico`, url });
      });
    }
    allIcons.sort((a, b) => a.filename.localeCompare(b.filename));
    if (allIcons.length) {
      this.dom.curlTextarea.value = allIcons.map((item) => `curl -s -L -o "${item.filename}" "${item.url}"`).join("\n") + "\n";
      this.dom.onlineListing.innerHTML = allIcons.map(
        (item) => create("div.row", [
          create(
            "div.icon",
            create("a", createImage(item.url), (element) => {
              element.download = item.filename;
              element.href = item.url;
            })
          ),
          create("div.domain", sanitize(item.filename))
        ])
      ).map((element) => element.outerHTML).join("");
    }
    this.dom.online.style.display = allIcons.length ? "block" : "none";
  }
  refreshPageContentOffline() {
    const icons = state.faviconManager.getOfflineDomains();
    if (icons.length) {
      this.dom.offlineListing.innerHTML = icons.map(
        (item) => create("div.row", [
          create("div.icon", createImage(item.url)),
          create("div.domain", sanitize(item.path))
        ])
      ).map((element) => element.outerHTML).join("");
    }
    this.dom.offline.style.display = icons.length ? "block" : "none";
  }
};

// src/web-app/utilities/select-hotkeys.ts
function selectHotkeys(keyword, description, skipFirst) {
  try {
    description = appendMissingHotkeys(keyword, description);
    const hotkeyPositions = selectBestCandidates(determineAllCandidates(keyword, description));
    hotkeyPositions.splice(0, skipFirst);
    return splitDescription(description, hotkeyPositions);
  } catch (exception) {
    console.error(exception);
    return [{ text: description, isHotkey: false }];
  }
}
function appendMissingHotkeys(keyword, description) {
  const keywordCaseAdjusted = adjustCase(keyword);
  const descriptionCaseAdjusted = adjustCase(description);
  let descriptionIndex = 0;
  for (let keywordIndex = 0; keywordIndex < keywordCaseAdjusted.length; keywordIndex++) {
    const hotkey = keywordCaseAdjusted.charAt(keywordIndex);
    descriptionIndex = descriptionCaseAdjusted.indexOf(hotkey, descriptionIndex);
    if (descriptionIndex < 0) {
      return `${description} ${keyword.substring(keywordIndex)}`;
    }
  }
  return description;
}
function determineAllCandidates(keyword, description) {
  var _a;
  const candidates = new Array();
  const keywordCaseAdjusted = adjustCase(keyword);
  const descriptionCaseAdjusted = adjustCase(description);
  for (let keywordIndex = 0; keywordIndex < keywordCaseAdjusted.length; keywordIndex++) {
    const hotkey = keywordCaseAdjusted.charAt(keywordIndex);
    candidates.push([]);
    let descriptionIndex = -1;
    while (0 <= (descriptionIndex = descriptionCaseAdjusted.indexOf(hotkey, descriptionIndex + 1))) {
      (_a = candidates.at(-1)) == null ? void 0 : _a.push({
        index: descriptionIndex,
        isPreferred: 0 === descriptionIndex || isUpperCase(description.charAt(descriptionIndex)) || isSeparator(description.charAt(descriptionIndex - 1))
      });
    }
  }
  return candidates;
}
function isUpperCase(char) {
  return char === char.toUpperCase();
}
function isSeparator(char) {
  const MAX_ASCII_CODE = 127;
  const code = char.codePointAt(0);
  return void 0 !== code && 0 <= code && code <= MAX_ASCII_CODE && /[^a-z]/i.test(char);
}
function selectBestCandidates(candidates) {
  const currentCombination = candidates.map(() => 0);
  let bestCombination = new Array();
  do {
    if (isValidCombination(currentCombination, candidates) && (!bestCombination.length || isBetterThan(currentCombination, bestCombination, candidates))) {
      bestCombination = currentCombination.slice();
    }
  } while (switchToNextCombination(currentCombination, candidates));
  return bestCombination.map((value, index) => {
    var _a, _b;
    return assertNotNull((_b = (_a = candidates[index]) == null ? void 0 : _a[value]) == null ? void 0 : _b.index);
  });
}
function switchToNextCombination(currentCombination, candidates) {
  var _a, _b, _c, _d;
  for (let index = currentCombination.length - 1; 0 <= index; index--) {
    currentCombination[index] = ((_a = currentCombination[index]) != null ? _a : 0) + 1;
    if (((_b = currentCombination[index]) != null ? _b : Number.MAX_VALUE) < ((_d = (_c = candidates[index]) == null ? void 0 : _c.length) != null ? _d : -1)) {
      return true;
    } else if (0 === index) {
      return false;
    } else {
      currentCombination[index] = 0;
    }
  }
  return false;
}
function isValidCombination(currentCombination, candidates) {
  var _a, _b, _c, _d, _e, _f;
  for (let index = 1; index < currentCombination.length; index++) {
    const previousIndex = (_c = (_b = (_a = candidates[index - 1]) == null ? void 0 : _a[assertNotNull(currentCombination[index - 1])]) == null ? void 0 : _b.index) != null ? _c : Number.MAX_VALUE;
    const currentIndex = (_f = (_e = (_d = candidates[index]) == null ? void 0 : _d[assertNotNull(currentCombination[index])]) == null ? void 0 : _e.index) != null ? _f : -1;
    if (currentIndex <= previousIndex) {
      return false;
    }
  }
  return true;
}
function isBetterThan(currentCombination, bestCombination, candidates) {
  var _a, _b, _c;
  const currentScore = countPreferredHotkeys(currentCombination, candidates);
  const bestScore = countPreferredHotkeys(bestCombination, candidates);
  if (bestScore < currentScore) {
    return true;
  } else if (currentScore < bestScore) {
    return false;
  } else {
    return !((_c = (_b = candidates[0]) == null ? void 0 : _b[(_a = bestCombination[0]) != null ? _a : -1]) == null ? void 0 : _c.isPreferred);
  }
}
function countPreferredHotkeys(combination, candidates) {
  return combination.map((value, index) => {
    var _a;
    return (_a = candidates[index]) == null ? void 0 : _a[value];
  }).filter((candidate) => candidate == null ? void 0 : candidate.isPreferred).length;
}
function splitDescription(description, hotkeyPositions) {
  const result = new Array();
  result.push({ text: description.substring(0, hotkeyPositions[0]), isHotkey: false });
  hotkeyPositions.forEach((hotkeyPosition, index) => {
    result.push({
      text: description.substring(hotkeyPosition, hotkeyPosition + 1),
      isHotkey: true
    });
    const nextIndex = index + 1 < hotkeyPositions.length ? hotkeyPositions[index + 1] : description.length;
    result.push({ text: description.substring(hotkeyPosition + 1, nextIndex), isHotkey: false });
  });
  return result.filter((item) => item.text);
}

// src/web-app/data/segments.ts
var Segment = class {
  constructor(keyword, sections) {
    this.keyword = keyword;
    this.sections = sections;
  }
  get description() {
    return this.sections.join("");
  }
};
var _Segments = class _Segments {
  constructor(segments) {
    this.segments = segments;
    __publicField(this, "_description");
    __publicField(this, "_descriptionPlaceholder");
    __publicField(this, "_descriptionHtml");
  }
  getMatch(length) {
    return new MatchingSegment(this.segments, length);
  }
  get descriptionHtml() {
    var _a;
    const descriptionHtml = (_a = this._descriptionHtml) != null ? _a : this.segments.map((segment) => sanitize(segment.description)).join(_Segments.SEPARATOR_HTML);
    this._descriptionHtml = descriptionHtml;
    return descriptionHtml;
  }
  get description() {
    var _a;
    const description = (_a = this._description) != null ? _a : this.segments.map((segment) => segment.description).join(_Segments.SEPARATOR_TEXT);
    this._description = description;
    return description;
  }
  get descriptionPlaceholder() {
    var _a;
    const descriptionPlaceholder = (_a = this._descriptionPlaceholder) != null ? _a : this.segments.map((segment) => segment.description).join(_Segments.SEPARATOR_PLACEHOLDER);
    this._descriptionPlaceholder = descriptionPlaceholder;
    return descriptionPlaceholder;
  }
};
__publicField(_Segments, "SEPARATOR_TEXT", " \xBB ");
__publicField(_Segments, "SEPARATOR_HTML", " &raquo; ");
__publicField(_Segments, "SEPARATOR_PLACEHOLDER", "\n");
var Segments = _Segments;
var MatchingSegment = class _MatchingSegment {
  constructor(segments, length) {
    __publicField(this, "fingerprint", "");
    __publicField(this, "keyword", "");
    __publicField(this, "descriptionHtml", "");
    __publicField(this, "isPartial", false);
    __publicField(this, "hidesMoreChildren", false);
    var _a;
    let lengthOffset = 0;
    const segmentsToDisplay = this.countSegmentsToDisplay(segments);
    for (let index = 0; index < segments.length; index++) {
      const segment = segments[index];
      if (this.keyword.length <= length || 0 === (segment == null ? void 0 : segment.keyword.length)) {
        this.keyword += segment == null ? void 0 : segment.keyword;
        if ((segment == null ? void 0 : segment.description) && index < segmentsToDisplay) {
          const description = this.getDescription(
            segment.sections,
            length - lengthOffset,
            lengthOffset,
            length
          );
          this.descriptionHtml += `${this.descriptionHtml ? Segments.SEPARATOR_HTML : ""}${description}`;
        }
        this.fingerprint += _MatchingSegment.getFingerprint(
          assertNotNull(segment),
          index + 1 !== segments.length
        );
        lengthOffset += (_a = segment == null ? void 0 : segment.keyword.length) != null ? _a : 0;
      } else {
        this.isPartial = true;
        break;
      }
    }
  }
  static getFingerprint(segment, appendDescription) {
    const openingDelimiter = state.config.shortcutFormat.keyword.openingDelimiter || "[";
    const closingDelimiter = state.config.shortcutFormat.keyword.closingDelimiter || "]";
    const suffix = appendDescription ? segment.description.trim().toLocaleLowerCase() : "";
    return openingDelimiter + segment.keyword + closingDelimiter + suffix;
  }
  countSegmentsToDisplay(segments) {
    var _a;
    let segmentsToDisplay = segments.length;
    for (; 0 < segmentsToDisplay && !((_a = segments[segmentsToDisplay - 1]) == null ? void 0 : _a.keyword); segmentsToDisplay--) {
    }
    return Math.max(0, segmentsToDisplay);
  }
  getDescription(sections, hotkeysMatched, lengthOffset, length) {
    if (!state.config.homepage.suggestions.showHotkeys) {
      return sanitize(sections.join(""));
    } else if (1 === sections.length) {
      return this.autoDetectHotkeys(
        assertNotNull(sections[0]),
        this.keyword.substring(lengthOffset),
        length - lengthOffset
      );
    } else {
      let result = sanitize(assertNotNull(sections[0]));
      for (let index = 1; index < sections.length; index++) {
        if (hotkeysMatched < index) {
          result += create("span.hotkey", sanitize(assertNotNull(sections[index]).charAt(0))).outerHTML;
          result += sanitize(assertNotNull(sections[index]).substring(1));
        } else {
          result += sanitize(assertNotNull(sections[index]));
        }
      }
      return result;
    }
  }
  autoDetectHotkeys(description, keyword, hotkeysMatched) {
    return selectHotkeys(keyword, description, hotkeysMatched).map((item) => item.isHotkey ? create("span.hotkey", item.text).outerHTML : sanitize(item.text)).join("");
  }
};

// src/web-app/data/links.ts
var Links = class {
  constructor(link) {
    __publicField(this, "overridden", new Array());
    __publicField(this, "current", new Array());
    __publicField(this, "_filterSummary");
    __publicField(this, "_descriptionHtml");
    this.current.push(link);
  }
  addLink(link) {
    if (this.current.length && link.onMultiLink === OnMultiLink.REPLACE_PREVIOUS) {
      this.current.forEach((currentLink) => currentLink.markAsOverridden());
      this.overridden.push(...this.current);
      this.current.length = 0;
    }
    this.current.push(link);
  }
  get onMultiLink() {
    var _a, _b;
    return (_b = (_a = this.current.at(-1)) == null ? void 0 : _a.onMultiLink) != null ? _b : OnMultiLink.getDefault();
  }
  get isQuery() {
    var _a;
    return (_a = this.current[0]) == null ? void 0 : _a.isQuery;
  }
  get isSearchable() {
    var _a;
    return (_a = this.current[0]) == null ? void 0 : _a.isSearchable;
  }
  get filterSummary() {
    var _a;
    const filterSummary = (_a = this._filterSummary) != null ? _a : this.current.map((link) => link.filterSummary).join(" ");
    this._filterSummary = filterSummary;
    return filterSummary;
  }
  get descriptionHtml() {
    var _a;
    const descriptionHtml = (_a = this._descriptionHtml) != null ? _a : this.calculateDescriptionHtml();
    this._descriptionHtml = descriptionHtml;
    return descriptionHtml;
  }
  calculateDescriptionHtml() {
    var _a, _b;
    if (1 === this.current.length) {
      return assertNotNull(this.current[0]).segments.descriptionHtml;
    }
    let length = 0;
    do {
      let matches = true;
      for (let index = 1; index < this.current.length && matches; index++) {
        const current = assertNotNull(this.current[index]).segments.segments;
        const previous = assertNotNull(this.current[index - 1]).segments.segments;
        matches = length <= Math.min(current.length, previous.length) && length < current.length && ((_a = current[length]) == null ? void 0 : _a.description) === ((_b = previous[length]) == null ? void 0 : _b.description);
      }
      if (!matches) {
        break;
      }
      length++;
    } while (length);
    return length < 0 ? assertNotNull(this.current[0]).segments.descriptionHtml : assertNotNull(this.current[0]).segments.segments.slice(0, length).map((segment) => sanitize(segment.description)).join(Segments.SEPARATOR_HTML);
  }
  toFinalizedLinks(searchTerm) {
    const links = new Array();
    let onMultiLink = this.onMultiLink;
    for (const link of this.current) {
      const newLinks = link.toFinalizedLinks(searchTerm);
      newLinks.forEach((link2) => links.push(link2));
      if (1 < newLinks.length && 1 === this.current.length) {
        onMultiLink = OnMultiLink.SHOW_MENU;
      }
    }
    if (1 < links.length && onMultiLink !== OnMultiLink.SHOW_MENU) {
      onMultiLink = OnMultiLink.OPEN_IN_NEW_TAB;
    }
    return { onMultiLink, links };
  }
};

// src/web-app/data/shortcut.ts
var _OnMultiLink = class _OnMultiLink {
  constructor(key) {
    this.key = key;
    _OnMultiLink.values.push(this);
    _OnMultiLink.byName[this.key] = this;
  }
  static getDefault() {
    return _OnMultiLink.byName[state.config.shortcutFormat.url.multiLinkIndicator.default] || _OnMultiLink.SHOW_MENU;
  }
};
__publicField(_OnMultiLink, "values", new Array());
__publicField(_OnMultiLink, "byName", {});
__publicField(_OnMultiLink, "REPLACE_PREVIOUS", new _OnMultiLink("replacePrevious"));
__publicField(_OnMultiLink, "OPEN_IN_NEW_TAB", new _OnMultiLink("openInNewTab"));
__publicField(_OnMultiLink, "SHOW_MENU", new _OnMultiLink("showMenu"));
__publicField(_OnMultiLink, "SEARCH_BUCKET", new _OnMultiLink("searchBucket"));
var OnMultiLink = _OnMultiLink;
var Shortcut = class {
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(keyword, segments, onMultiLink, urlOrDynamicShortcut) {
    this.keyword = keyword;
    __publicField(this, "_bookmarks");
    __publicField(this, "_queries");
    __publicField(this, "_searchable");
    __publicField(this, "all", new Array());
    this.addLink(keyword, segments, onMultiLink, urlOrDynamicShortcut);
  }
  get bookmarks() {
    return this._bookmarks;
  }
  get queries() {
    return this._queries;
  }
  get searchable() {
    return this._searchable;
  }
  get type() {
    if (this.bookmarks) {
      return this.queries ? "both" : "bookmark";
    } else if (this.queries) {
      return "query";
    } else {
      return "none";
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Append a new link to the collection
  //------------------------------------------------------------------------------------------------------------------
  addLink(keyword, segments, onMultiLink, urlOrDynamicShortcut) {
    const link = new Link(
      keyword,
      this.all.length,
      new Segments(segments),
      OnMultiLink.SEARCH_BUCKET === onMultiLink ? OnMultiLink.getDefault() : onMultiLink,
      OnMultiLink.SEARCH_BUCKET === onMultiLink,
      urlOrDynamicShortcut
    );
    if (link.isSearchable) {
      this._searchable = this.createOrAdd(link, this._searchable);
    } else if (link.isQuery) {
      this._queries = this.createOrAdd(link, this._queries);
    } else {
      this._bookmarks = this.createOrAdd(link, this._bookmarks);
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Append a link to the container (or create a new one if none is provided)
  //------------------------------------------------------------------------------------------------------------------
  createOrAdd(link, links) {
    if (links) {
      links.addLink(link);
    } else {
      links = new Links(link);
    }
    this.all[link.index] = { link, links };
    return links;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Retrieve finalized links for all current bookmarks
  //------------------------------------------------------------------------------------------------------------------
  getFinalizedBookmarks() {
    return this.createFinalizedLinks(this.bookmarks);
  }
  //------------------------------------------------------------------------------------------------------------------
  // Retrieve finalized links (with the search term inserted) for all current queries
  //------------------------------------------------------------------------------------------------------------------
  getFinalizedQueries(searchTerm) {
    return this.createFinalizedLinks(this.queries, searchTerm);
  }
  //------------------------------------------------------------------------------------------------------------------
  // Retrieve the
  //------------------------------------------------------------------------------------------------------------------
  getFinalizedLinks(searchTerm) {
    return this.createFinalizedLinks(
      this.bookmarks && (!(searchTerm == null ? void 0 : searchTerm.trim()) || !this.queries) ? this.bookmarks : this.queries,
      searchTerm
    );
  }
  //------------------------------------------------------------------------------------------------------------------
  // Convert the given links into finalized links
  //------------------------------------------------------------------------------------------------------------------
  createFinalizedLinks(links, searchTerm) {
    var _a, _b;
    return (_b = links == null ? void 0 : links.toFinalizedLinks((_a = searchTerm == null ? void 0 : searchTerm.trim()) != null ? _a : "")) != null ? _b : { onMultiLink: OnMultiLink.OPEN_IN_NEW_TAB, links: [] };
  }
  getSegmentMatches(length) {
    var _a, _b;
    const result = new Hashtable();
    for (const link of [...((_a = this._bookmarks) == null ? void 0 : _a.current) || [], ...((_b = this.queries) == null ? void 0 : _b.current) || []]) {
      const match = link.segments.getMatch(length);
      result.computeIfAbsent(match.fingerprint, () => match);
    }
    return result.values;
  }
};

// src/web-app/application/redirector.ts
var redirector;
((redirector2) => {
  let alwaysOpenNewTabs = false;
  let showRedirectPage = true;
  function processQuery() {
    const shortcut = shortcuts.get(queryParameters.query.keyword) || void 0;
    const { setup, redirect: redirectQueryParameter } = queryParameters;
    const isHomepageKeyword = state.config.homepage.keywords.includes(queryParameters.query.keyword);
    if (setup) {
      document.title = "ShortyCut";
      showSetupPage(setup);
    } else if (redirectQueryParameter) {
      processAuxiliaryRedirect(redirectQueryParameter);
    } else if (shortcut) {
      processShortcut(shortcut);
    } else if (isUrl(queryParameters.query.full)) {
      openUrl(queryParameters.query.full, 2 /* ERASE_HISTORY */);
    } else if (!queryParameters.query.keyword || !state.defaultSearchEngine || !state.config.defaultSearchEngine.useInAddressBar || isHomepageKeyword) {
      openHomepage(isHomepageKeyword);
    } else {
      const links = state.defaultSearchEngine.getFinalizedLinks(queryParameters.query.full);
      redirect(__spreadProps(__spreadValues({}, links), { onMultiLink: OnMultiLink.OPEN_IN_NEW_TAB }), 2 /* ERASE_HISTORY */);
    }
  }
  redirector2.processQuery = processQuery;
  function processAuxiliaryRedirect({ url, postFields }) {
    const permalink = Link.constructFinalizedPermalink(url, postFields);
    const finalizedLinks = {
      onMultiLink: OnMultiLink.OPEN_IN_NEW_TAB,
      links: [{ htmlDescription: "", urls: [{ url, postFields, permalink }] }]
    };
    redirect(finalizedLinks, 2 /* ERASE_HISTORY */);
  }
  function openHomepage(isHomepageKeyword) {
    alwaysOpenNewTabs = queryParameters.facets.newTabs;
    showRedirectPage = false;
    document.title = "ShortyCut";
    const query = isHomepageKeyword ? queryParameters.query.full.replace(/^\s*[^\s]+/, "").trim() : queryParameters.query.full;
    state.router.goto(pages.home.populate(query));
    if (queryParameters.facets.noFocus) {
      pages.home.removeFocus();
    }
  }
  function processShortcut(shortcut) {
    if (shortcut.queries && (queryParameters.query.searchTerm || !shortcut.bookmarks)) {
      redirect(shortcut.getFinalizedQueries(queryParameters.query.searchTerm), 2 /* ERASE_HISTORY */);
    } else if (shortcut.bookmarks) {
      redirect(shortcut.getFinalizedBookmarks(), 2 /* ERASE_HISTORY */);
    } else {
      throw new Exception("Internal error", "Found no links to use for redirection");
    }
  }
  function redirect(finalizedLinks, mode) {
    var _a, _b;
    const urls = flattenUrls(finalizedLinks);
    const htmlDescription = (_b = (_a = finalizedLinks.links[0]) == null ? void 0 : _a.htmlDescription) != null ? _b : "";
    const [first, ...rest] = urls;
    if (void 0 !== first && !rest.length) {
      openLink(htmlDescription, first, mode);
    } else if (1 < finalizedLinks.links.length && finalizedLinks.onMultiLink === OnMultiLink.SHOW_MENU) {
      showRedirectPage = false;
      setTimeout(() => state.router.goto(pages.shortlist.populate(finalizedLinks)), 0);
    } else if (alwaysOpenNewTabs) {
      urls.forEach((link) => globalThis.open(link.permalink));
      state.router.goBackToAndResetHomepage();
    } else if (first) {
      urls.slice(1).forEach((link) => globalThis.open(link.permalink));
      openLink(htmlDescription, first, mode);
    }
  }
  redirector2.redirect = redirect;
  function flattenUrls(finalizedLinks) {
    const finalizedUrls = new Array();
    finalizedLinks.links.forEach((link) => link.urls.forEach((url) => finalizedUrls.push(url)));
    return finalizedUrls;
  }
  function openLink(htmlDescription, url, mode) {
    if (showRedirectPage) {
      state.router.goto(pages.redirect.populate(htmlDescription, url.url));
    }
    if (url.postFields) {
      if (0 /* NEW_TAB */ === mode || alwaysOpenNewTabs) {
        openUrl(url.permalink, mode);
      } else {
        submitForm(url);
      }
    } else {
      openUrl(url.url, mode);
    }
  }
  function openUrl(url, mode) {
    if (1 /* PRESERVE_HISTORY */ === mode && !alwaysOpenNewTabs) {
      globalThis.location.href = url;
    } else if (2 /* ERASE_HISTORY */ === mode && !alwaysOpenNewTabs) {
      globalThis.location.replace(url);
    } else {
      globalThis.open(url);
      if (alwaysOpenNewTabs) {
        state.router.goBackToAndResetHomepage();
      }
    }
  }
  redirector2.openUrl = openUrl;
  function submitForm(link) {
    const form = document.createElement("form");
    form.action = link.url;
    form.method = "post";
    form.style.display = "none";
    for (const field of link.postFields || []) {
      const input = document.createElement("input");
      input.type = "text";
      input.name = field.key;
      input.value = field.value;
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
  }
  function showSetupPage(mode) {
    if (pages.setup) {
      pages.setup.hide();
    }
    pages.setup.populate(mode).show();
  }
  redirector2.showSetupPage = showSetupPage;
})(redirector || (redirector = {}));

// src/web-app/data/filter.ts
var MAX_LEVEL = 999;
var DictionaryItem = class _DictionaryItem {
  //------------------------------------------------------------------------------------------------------------------
  // Initialize the dictionary item
  //------------------------------------------------------------------------------------------------------------------
  constructor(level, shortcuts2) {
    this.level = level;
    this.shortcuts = shortcuts2;
    __publicField(this, "_children");
    __publicField(this, "_suggestions");
  }
  //------------------------------------------------------------------------------------------------------------------
  // Obtain suggestions
  //------------------------------------------------------------------------------------------------------------------
  getSuggestions(keyword, maxResults, postKeywordInput) {
    var _a, _b;
    if (this.level === keyword.length) {
      return this.childSuggestions(maxResults, postKeywordInput);
    } else {
      const letter = keyword.charAt(this.level);
      return (_b = (_a = this.children.get(letter)) == null ? void 0 : _a.getSuggestions(keyword, maxResults, postKeywordInput)) != null ? _b : [];
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Get (and initialize) the dictionary children
  //------------------------------------------------------------------------------------------------------------------
  get children() {
    var _a;
    const children = (_a = this._children) != null ? _a : this.initializeChildren();
    this._children = children;
    return children;
  }
  initializeChildren() {
    const dictionary = new Hashtable();
    this.shortcuts.forEach((shortcut) => {
      if (this.level < shortcut.keyword.length) {
        const letter = shortcut.keyword ? shortcut.keyword.charAt(this.level) : "";
        dictionary.computeIfAbsent(letter, () => new _DictionaryItem(this.level + 1, [])).shortcuts.push(shortcut);
      }
    });
    return dictionary;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Get (and initialize) the suggestions
  //------------------------------------------------------------------------------------------------------------------
  childSuggestions(maxResults, postKeywordInput) {
    if (!this._suggestions) {
      const shortcuts2 = this.getChildShortcuts(postKeywordInput ? this.level : MAX_LEVEL);
      this._suggestions = this.calculateChildSuggestions(maxResults, shortcuts2);
    }
    return this._suggestions;
  }
  calculateChildSuggestions(maxResults, shortcuts2) {
    const matches = new Hashtable();
    let count = 0;
    for (const shortcut of shortcuts2) {
      for (const match of shortcut.getSegmentMatches(this.level)) {
        const nonPartialMatch = matches.values.find((item) => item.match.keyword === match.keyword);
        if (nonPartialMatch) {
          nonPartialMatch.match.hidesMoreChildren = true;
          continue;
        }
        matches.computeIfAbsent(match.fingerprint, () => {
          count++;
          return { match, shortcuts: [] };
        }).shortcuts.push(shortcut);
        if (maxResults <= count) {
          break;
        }
      }
      if (maxResults <= count) {
        break;
      }
    }
    return matches.values.map((match) => this.createChildSuggestion(match.match, match.shortcuts));
  }
  getChildShortcuts(maxLength) {
    const shortcuts2 = this.shortcuts.filter(
      (shortcut) => this.level === shortcut.keyword.length && shortcut.keyword.length <= maxLength
    );
    this.shortcuts.filter((shortcut) => this.level < shortcut.keyword.length && shortcut.keyword.length <= maxLength).forEach((shortcut) => shortcuts2.push(shortcut));
    return shortcuts2;
  }
  createChildSuggestion(match, shortcuts2) {
    var _a;
    const keyword = `${match.keyword}${match.isPartial ? "..." : ""}`;
    const keywordHtml = create(
      "div",
      create("span.matched", keyword.substring(0, this.level)),
      create("span.unmatched", keyword.substring(this.level))
    ).innerHTML;
    const descriptionHtmlSuffix = !match.isPartial && ((_a = shortcuts2[0]) == null ? void 0 : _a.searchable) ? ` <span class="more-indicator-text">${Segments.SEPARATOR_HTML} ...</span>` : "";
    const segmentOrSuggestion = match.isPartial ? "segment" : "suggestion";
    return {
      type: this.level === match.keyword.length ? "match" : segmentOrSuggestion,
      keyword: match.keyword,
      keywordHtml,
      descriptionHtml: match.descriptionHtml + descriptionHtmlSuffix,
      shortcutType: this.getShortcutType(shortcuts2),
      shortcut: assertNotNull(shortcuts2[0]),
      hidesMoreChildren: match.hidesMoreChildren
    };
  }
  getShortcutType(shortcuts2) {
    if (shortcuts2.some((shortcut) => "both" === shortcut.type)) {
      return "both";
    } else if (shortcuts2.some((shortcut) => "bookmark" === shortcut.type)) {
      if (shortcuts2.some((shortcut) => "query" === shortcut.type)) {
        return "both";
      } else {
        return "bookmark";
      }
    } else if (shortcuts2.some((shortcut) => "query" === shortcut.type)) {
      return "query";
    } else {
      return "none";
    }
  }
};
var _Filter = class _Filter {
  constructor(maxResults) {
    this.maxResults = maxResults;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Get suggestions based on the keyword
  //------------------------------------------------------------------------------------------------------------------
  keywordSearch(keyword, postKeywordInput) {
    return this.dictionary.getSuggestions(keyword, this.maxResults, postKeywordInput);
  }
  //------------------------------------------------------------------------------------------------------------------
  // Perform a full-text search
  //------------------------------------------------------------------------------------------------------------------
  fullTextSearch(searchTerms, keyword) {
    const result = new Array();
    for (const item of this.allLinks) {
      if (this.maxResults <= result.length) {
        return result;
      }
      if (!keyword || item.keyword === keyword && item.isSearchable) {
        this.createSuggestion(searchTerms, item, result);
      }
    }
    if (this.maxResults < result.length) {
      result.length = this.maxResults;
    }
    return result;
  }
  createSuggestion(searchTerms, searchableLink, result) {
    const keywordMask = searchableLink.keyword.split("").map(() => false);
    const descriptionMask = searchableLink.description.split("").map(() => false);
    for (const searchTerm of searchTerms) {
      let matched = this.markMatch(searchTerm, searchableLink.keywordLowerCase, keywordMask);
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
  }
  markMatch(searchTerm, text, mask) {
    let matched = false;
    let index = -1;
    while (0 <= (index = text.indexOf(searchTerm, index + 1))) {
      for (let position = index; position < index + searchTerm.length; position++) {
        mask[position] = true;
      }
      matched = true;
    }
    return matched;
  }
  highlightMatch(text, mask) {
    const result = new Array();
    let end = 0;
    for (let start = 0; start < mask.length; start = end) {
      end = start + 1;
      for (; end < mask.length && mask[end - 1] === mask[end]; end++) {
      }
      let section = sanitize(text.substring(start, end));
      if (mask[start]) {
        section = `<span class="matched-substring">${section}</span>`;
      }
      result.push(section);
    }
    return replaceAll(result.join(""), Segments.SEPARATOR_PLACEHOLDER, Segments.SEPARATOR_HTML, false);
  }
  //------------------------------------------------------------------------------------------------------------------
  // Initialize the dictionary
  //------------------------------------------------------------------------------------------------------------------
  get dictionary() {
    var _a;
    const dictionary = (_a = _Filter._dictionary) != null ? _a : _Filter.initializeDictionary();
    _Filter._dictionary = dictionary;
    return dictionary;
  }
  static initializeDictionary() {
    return new DictionaryItem(
      0,
      shortcuts.values.sort(
        comparing(
          (s) => {
            var _a, _b, _c, _d, _e, _f;
            return (_f = (_e = (_b = (_a = s.bookmarks) == null ? void 0 : _a.current[0]) == null ? void 0 : _b.segments.description) != null ? _e : (_d = (_c = s.queries) == null ? void 0 : _c.current[0]) == null ? void 0 : _d.segments.description) != null ? _f : "";
          }
        )
      )
    );
  }
  //------------------------------------------------------------------------------------------------------------------
  // Initialize the links
  //------------------------------------------------------------------------------------------------------------------
  get allLinks() {
    var _a;
    const allLinks = (_a = _Filter._allLinks) != null ? _a : _Filter.initializeLinks();
    _Filter._allLinks = allLinks;
    return allLinks;
  }
  static initializeLinks() {
    const result = new Array();
    shortcuts.values.forEach(
      (shortcut) => result.push(...shortcut.all.filter((item) => this.includeOverriddenShortcuts || !item.link.overridden))
    );
    result.sort(comparing((item) => item.link.segments.description));
    return result.map((item) => ({
      link: item.link,
      links: item.links,
      keyword: item.link.keyword,
      keywordLowerCase: item.link.keyword.toLocaleLowerCase(),
      description: item.link.segments.descriptionPlaceholder,
      descriptionLowerCase: item.link.segments.descriptionPlaceholder.toLowerCase(),
      shortcut: assertNotNull(shortcuts.get(item.link.keyword)),
      isSearchable: item.link.isSearchable
    }));
  }
};
__publicField(_Filter, "_dictionary");
__publicField(_Filter, "_allLinks");
__publicField(_Filter, "includeOverriddenShortcuts", false);
var Filter = _Filter;

// src/web-app/pages/homepage.ts
var _Homepage = class _Homepage {
  //------------------------------------------------------------------------------------------------------------------
  // Initialize the page
  //------------------------------------------------------------------------------------------------------------------
  constructor() {
    __publicField(this, "dom", {
      filter: document.querySelector("#home .input"),
      home: document.querySelector("#home"),
      suggestions: document.querySelector("#home .suggestions"),
      headerRow: document.querySelector("#home > .row"),
      rows: new Array(),
      notification: {
        self: document.querySelector("#home .notification"),
        welcome: {
          self: document.querySelector("#home .notification .welcome"),
          newTabs: document.querySelector("#home .notification .welcome .new-tabs")
        },
        applicationErrors: document.querySelector("#home .notification .application-errors"),
        noShortcutsNoError: document.querySelector("#home .notification .no-shortcuts-no-error"),
        errorWithBacktickSupport: document.querySelector(
          "#home .notification .error-with-backtick-support"
        ),
        errorWithoutBacktickSupport: document.querySelector(
          "#home .notification .error-without-backtick-support"
        )
      }
    });
    __publicField(this, "filter", new Filter(_Homepage.MAX_SUGGESTIONS));
    __publicField(this, "suggestions", new Array());
    __publicField(this, "selectedIndex", -1);
    __publicField(this, "originalInput", "");
    __publicField(this, "previousInput");
    __publicField(this, "lastCancelClearFilterEvent", -1);
    __publicField(this, "clearFilterJob");
    this.onKeyBody = this.onKeyBody.bind(this);
    this.onFilterChanged = this.onFilterChanged.bind(this);
    this.onFocusEvent = this.onFocusEvent.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.scheduleClearFilter = this.scheduleClearFilter.bind(this);
    this.cancelClearFilter = this.cancelClearFilter.bind(this);
    this.populateNotification();
  }
  hasMenu() {
    return true;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Populate the page
  //------------------------------------------------------------------------------------------------------------------
  populate(query) {
    this.dom.filter.value = query != null ? query : "";
    this.previousInput = void 0;
    this.originalInput = "";
    this.dom.suggestions.innerHTML = "";
    this.selectSuggestion(-1);
    this.onFilterChanged();
    if (queryParameters.facets.noFocus) {
      this.dom.headerRow.classList.add("no-focus");
    }
    return this;
  }
  populateNotification() {
    if (startupCache.initializationErrors.length) {
      this.dom.notification.applicationErrors.innerHTML = create(
        "div.header",
        1 === startupCache.initializationErrors.length ? "An error occurred during initialization" : "Errors occurred during initialization"
      ).outerHTML;
      startupCache.initializationErrors.map((error) => "function" === typeof error ? error().toHtml() : error.toHtml()).forEach((element) => this.dom.notification.applicationErrors.appendChild(element));
      this.dom.notification.applicationErrors.style.display = "block";
    } else if (0 === shortcuts.size) {
      if (startupCache.exceptions.length) {
        if (supportsBacktickSyntax()) {
          this.dom.notification.errorWithBacktickSupport.style.display = "block";
        } else {
          this.dom.notification.errorWithoutBacktickSupport.style.display = "block";
        }
      } else {
        this.dom.notification.noShortcutsNoError.style.display = "block";
      }
    } else if (isDemoMode()) {
      this.dom.notification.welcome.newTabs.style.display = queryParameters.facets.newTabs ? "none" : "block";
      this.dom.notification.welcome.self.style.display = "block";
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Show and hide the page
  //------------------------------------------------------------------------------------------------------------------
  show() {
    this.addEventHandlers();
    this.dom.home.style.display = "flex";
    this.dom.filter.focus();
    this.updateFaviconManagerParametersWhenHomepageIsVisible();
  }
  hide() {
    this.removeEventHandlers();
    this.dom.home.style.display = "none";
    this.updateFaviconManagerParametersWhenHomepageIsNotVisible();
  }
  //------------------------------------------------------------------------------------------------------------------
  // Add and remove event handlers
  //------------------------------------------------------------------------------------------------------------------
  addEventHandlers() {
    ["change", "keydown", "input"].forEach((event) => this.dom.filter.addEventListener(event, this.onFilterChanged));
    ["focus", "blur"].forEach(
      (event) => [globalThis, document, document.body, this.dom.filter].forEach(
        (element) => element.addEventListener(event, this.onFocusEvent)
      )
    );
    if (queryParameters.facets.noFocus) {
      ["mousedown", "keydown", "blur"].forEach(
        (event) => globalThis.addEventListener(event, this.cancelClearFilter)
      );
      this.dom.filter.addEventListener("blur", this.scheduleClearFilter);
    }
    document.addEventListener("keydown", this.onKeyBody);
  }
  removeEventHandlers() {
    ["change", "keydown", "input"].forEach(
      (event) => this.dom.filter.removeEventListener(event, this.onFilterChanged)
    );
    ["focus", "blur"].forEach(
      (event) => [globalThis, document, document.body, this.dom.filter].forEach(
        (element) => element.removeEventListener(event, this.onFocusEvent)
      )
    );
    if (queryParameters.facets.noFocus) {
      ["mousedown", "keydown", "blur"].forEach(
        (event) => globalThis.removeEventListener(event, this.cancelClearFilter)
      );
      this.dom.filter.removeEventListener("blur", this.scheduleClearFilter);
    }
    document.removeEventListener("keydown", this.onKeyBody);
  }
  //------------------------------------------------------------------------------------------------------------------
  // Event handlers
  //------------------------------------------------------------------------------------------------------------------
  onKeyBody(event) {
    const isRightArrow = this.treatAsRightArrow(event);
    if (!queryParameters.facets.noFocus) {
      this.dom.filter.focus();
    }
    if (this.isEscape(event)) {
      return this.onEscape(event);
    } else if (this.isArrowDown(event)) {
      this.selectSuggestion(this.selectedIndex + 1);
      event.preventDefault();
      return false;
    } else if (this.isArrowUp(event)) {
      this.selectSuggestion(this.selectedIndex - 1);
      event.preventDefault();
      return false;
    } else if ("Enter" === event.key || isRightArrow) {
      return this.onEnter(event, isRightArrow);
    } else if ("q" === event.key && event.ctrlKey) {
      this.dom.filter.focus();
    }
    return true;
  }
  treatAsRightArrow(event) {
    var _a, _b;
    return this.isArrowRight(event) && 0 <= this.selectedIndex && (((_a = this.suggestions[this.selectedIndex]) == null ? void 0 : _a.hidesMoreChildren) || "segment" === ((_b = this.suggestions[this.selectedIndex]) == null ? void 0 : _b.type));
  }
  isArrowUp(event) {
    return "ArrowUp" === event.key || "Up" === event.key;
  }
  isArrowDown(event) {
    return "ArrowDown" === event.key || "Down" === event.key;
  }
  isEscape(event) {
    return "Escape" === event.key || "Esc" === event.key;
  }
  isArrowRight(event) {
    return "ArrowRight" === event.key || "Right" === event.key;
  }
  onEscape(event) {
    if (queryParameters.facets.noFocus) {
      if (this.dom.filter.value) {
        this.clearFilter();
      } else {
        this.removeFocus();
      }
    } else {
      this.clearFilter();
    }
    event.preventDefault();
    return false;
  }
  onEnter(event, isRightArrow) {
    const mode = event.ctrlKey ? 0 /* NEW_TAB */ : 1 /* PRESERVE_HISTORY */;
    if (-1 === this.selectedIndex) {
      this.redirect(mode);
    } else {
      this.applySuggestion(this.selectedIndex, mode, isRightArrow);
    }
    event.preventDefault();
    return false;
  }
  onFilterChanged() {
    if (this.dom.filter.value !== this.previousInput) {
      this.applyFilter();
      this.selectedIndex = -1;
    }
    return true;
  }
  onFocusEvent() {
    if (!queryParameters.facets.noFocus) {
      setTimeout(() => this.dom.filter.focus(), 0);
    }
  }
  cancelClearFilter() {
    if (this.clearFilterJob) {
      clearTimeout(this.clearFilterJob);
      this.clearFilterJob = void 0;
    }
    this.lastCancelClearFilterEvent = Date.now();
  }
  scheduleClearFilter() {
    if (_Homepage.DEBOUNCE_MS <= Date.now() - this.lastCancelClearFilterEvent) {
      this.clearFilterJob = setTimeout(this.clearFilter, _Homepage.DEBOUNCE_POLLING_MS);
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Clear or apply the current filter
  //------------------------------------------------------------------------------------------------------------------
  clearFilter() {
    if (!queryParameters.facets.noFocus || this.dom.filter.value) {
      this.dom.filter.focus();
    }
    this.dom.filter.value = "";
    this.applyFilter();
  }
  applyFilter(autoSelectFirstRow = false) {
    var _a;
    this.suggestions.length = 0;
    const input = this.dom.filter.value;
    const splitInput = input.split(/\s+/).map((word) => word.trim()).filter(Boolean);
    const keyword = adjustCase((_a = splitInput[0]) != null ? _a : "");
    const postKeywordInput = input.replace(/^\s*/, "").substring(keyword.length);
    if (keyword) {
      const shortcut = shortcuts.get(keyword);
      this.collectSuggestions(keyword, splitInput, postKeywordInput, shortcut);
    }
    this.renderSuggestions(input, autoSelectFirstRow);
  }
  collectSuggestions(keyword, splitInput, postKeywordInput, shortcut) {
    if ((shortcut == null ? void 0 : shortcut.queries) && postKeywordInput) {
      this.suggestions.push(this.createSuggestion(shortcut, "match", "query"));
    } else if (!postKeywordInput) {
      this.suggestions.push(...this.filter.keywordSearch(keyword, postKeywordInput));
    } else if (shortcut) {
      this.collectSuggestionsForShortcut(shortcut, splitInput, postKeywordInput);
    }
    if (!this.suggestions.length) {
      this.suggestions.push(...this.filter.fullTextSearch(splitInput));
    }
  }
  collectSuggestionsForShortcut(shortcut, splitInput, postKeywordInput) {
    if (shortcut.searchable) {
      this.suggestions.push(...this.createSearchBucketSuggestions(shortcut, splitInput.slice(1)));
    }
    if (!this.suggestions.length) {
      if (shortcut.queries && 1 < splitInput.length && shortcut.queries) {
        this.suggestions.push(this.createSuggestion(shortcut, "match", "query"));
      } else if (shortcut.bookmarks && !postKeywordInput) {
        this.suggestions.push(this.createSuggestion(shortcut, "match", "bookmark"));
      }
    }
  }
  renderSuggestions(input, autoSelectFirstRow) {
    var _a;
    this.suggestions.length = Math.min(_Homepage.MAX_SUGGESTIONS, this.suggestions.length);
    this.displaySuggestions();
    this.previousInput = input;
    if (autoSelectFirstRow && 0 < this.suggestions.length) {
      this.selectedIndex = 0;
      (_a = this.dom.rows[0]) == null ? void 0 : _a.classList.add("selected");
    } else {
      this.selectedIndex = -1;
      this.dom.headerRow.classList.add("selected");
    }
    this.dom.notification.self.style.display = 0 < this.suggestions.length || this.dom.filter.value.trim().length ? "none" : "block";
    this.updateInputFieldHighlight();
  }
  createSearchBucketSuggestions(shortcut, searchTerms) {
    const suggestions = this.filter.fullTextSearch(searchTerms, shortcut.keyword);
    if (suggestions.length) {
      if (shortcut.queries) {
        return [...suggestions, this.createSuggestion(shortcut, "suggestion", "query")];
      } else {
        return suggestions;
      }
    } else if (shortcut.queries) {
      return [this.createSuggestion(shortcut, "match", "query")];
    } else if (shortcut.bookmarks) {
      return [this.createSuggestion(shortcut, "match", "bookmark")];
    }
    return suggestions;
  }
  createSuggestion(shortcut, type, shortcutType) {
    const links = "bookmark" === shortcutType ? assertNotNull(shortcut.bookmarks) : assertNotNull(shortcut.queries);
    return {
      type,
      keyword: shortcut.keyword,
      keywordHtml: sanitize(shortcut.keyword),
      descriptionHtml: links.descriptionHtml,
      shortcutType,
      shortcut,
      hidesMoreChildren: false
    };
  }
  displaySuggestions() {
    this.updateFaviconManagerParametersWhenHomepageIsVisible();
    this.dom.rows = this.suggestions.map(
      (suggestion, index) => {
        var _a;
        return create(`div.row.${suggestion.type}.${suggestion.shortcutType}`, [
          create(
            "div.cursor",
            create("img.icon", (element) => element.src = "resources/arrow.svg")
          ),
          create(
            "div.row-content",
            [
              state.config.homepage.suggestions.showKeywords ? create("div.keyword:html", suggestion.keywordHtml) : "",
              state.config.homepage.suggestions.showFavicons ? state.faviconManager.getFavicon((_a = suggestion.shortcut.all[0]) == null ? void 0 : _a.link.faviconUrls[0]) : "",
              create("div.description:html", this.getDescription(suggestion))
            ],
            (rowContent) => rowContent.addEventListener("click", (event) => {
              this.selectSuggestion(index);
              this.applySuggestion(
                this.selectedIndex,
                event.ctrlKey ? 0 /* NEW_TAB */ : 1 /* PRESERVE_HISTORY */,
                false
              );
            })
          )
        ]);
      }
    );
    this.dom.suggestions.innerHTML = "";
    this.dom.rows.forEach((row) => this.dom.suggestions.appendChild(row));
    if (_Homepage.MAX_SUGGESTIONS <= this.suggestions.length) {
      this.dom.suggestions.classList.add("truncated");
    } else {
      this.dom.suggestions.classList.remove("truncated");
    }
  }
  getDescription(suggestion) {
    if (suggestion.hidesMoreChildren || suggestion.type === "segment") {
      return create("div:html", [
        suggestion.descriptionHtml,
        " ",
        create("span.more-indicator-text:html", `${Segments.SEPARATOR_HTML} ...`),
        create("span.more-indicator-key:html", create("span.key:html", "&rarr;"), " more")
      ]);
    } else {
      return suggestion.descriptionHtml;
    }
  }
  updateInputFieldHighlight() {
    const hasInput = !!this.dom.filter.value.trim();
    const canUseSearchEngine = state.defaultSearchEngine && state.config.defaultSearchEngine.useOnHomepage;
    const focusOnSuggestion = this.selectedIndex !== -1;
    const hasFullTextSearchSuggestions = !!this.suggestions.length;
    const hasMatches = !!this.suggestions.filter((suggestion) => suggestion.type !== "search-result").length;
    if (!hasInput || canUseSearchEngine || focusOnSuggestion || hasMatches) {
      this.dom.filter.classList.remove("error", "warning");
    } else if (hasFullTextSearchSuggestions) {
      this.dom.filter.classList.remove("error");
      this.dom.filter.classList.add("warning");
    } else {
      this.dom.filter.classList.add("error");
      this.dom.filter.classList.remove("warning");
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Select a suggestion via cursor up/down
  //------------------------------------------------------------------------------------------------------------------
  selectSuggestion(index) {
    var _a, _b, _c;
    index = Math.min(Math.max(-1, index), this.suggestions.length - 1);
    if (index !== this.selectedIndex) {
      if (-1 === this.selectedIndex) {
        this.originalInput = this.dom.filter.value;
      }
      ((_a = this.dom.rows[this.selectedIndex]) != null ? _a : this.dom.headerRow).classList.remove("selected");
      this.selectedIndex = index;
      ((_b = this.dom.rows[this.selectedIndex]) != null ? _b : this.dom.headerRow).classList.add("selected");
      if (-1 === this.selectedIndex) {
        this.previousInput = this.dom.filter.value = this.originalInput;
      } else {
        const suggestion = this.suggestions[this.selectedIndex];
        if (void 0 === suggestion) {
          return;
        }
        const keyword = (_c = this.suggestions[this.selectedIndex]) == null ? void 0 : _c.keyword;
        this.previousInput = suggestion.type !== "segment" && suggestion.shortcutType !== "bookmark" ? `${keyword} ` : keyword;
        if (this.previousInput !== void 0) {
          this.dom.filter.value = this.previousInput;
        }
      }
      this.dom.filter.selectionStart = this.dom.filter.selectionEnd = this.dom.filter.value.length;
      this.updateInputFieldHighlight();
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Accept a suggestion via return key
  //------------------------------------------------------------------------------------------------------------------
  applySuggestion(selectedIndex, mode, viaRightArrow, searchTerm) {
    const suggestion = this.suggestions[selectedIndex];
    if (!suggestion) {
      return;
    }
    const shortcut = suggestion.shortcut;
    if (suggestion.type === "segment" || viaRightArrow && suggestion.hidesMoreChildren) {
      this.applyFilter(viaRightArrow && suggestion.hidesMoreChildren);
    } else if (suggestion.type === "search-result") {
      this.applySearchResult(suggestion, viaRightArrow, mode);
    } else if (shortcut.bookmarks) {
      this.redirectToLinks(shortcut.getFinalizedBookmarks(), viaRightArrow, mode);
    } else if (shortcut.queries) {
      searchTerm = (searchTerm == null ? void 0 : searchTerm.trim()) || this.promptForSearchTerm();
      if (searchTerm) {
        this.redirectToLinks(shortcut.getFinalizedQueries(searchTerm), viaRightArrow, mode);
      }
    }
  }
  redirectToLinks(links, viaRightArrow, mode) {
    redirector.redirect(viaRightArrow ? __spreadProps(__spreadValues({}, links), { onMultiLink: OnMultiLink.OPEN_IN_NEW_TAB }) : links, mode);
  }
  applySearchResult(suggestion, viaRightArrow, mode) {
    var _a, _b, _c;
    if ((_a = suggestion.link) == null ? void 0 : _a.isQuery) {
      const searchTerm = this.promptForSearchTerm();
      if (searchTerm) {
        this.redirectToLinks(
          {
            links: suggestion.link.toFinalizedLinks(searchTerm),
            onMultiLink: (_b = suggestion.link.onMultiLink) != null ? _b : OnMultiLink.getDefault()
          },
          viaRightArrow,
          mode
        );
      }
    } else if (suggestion.link) {
      this.redirectToLinks(
        {
          links: suggestion.link.toFinalizedLinks(""),
          onMultiLink: (_c = suggestion.link.onMultiLink) != null ? _c : OnMultiLink.getDefault()
        },
        viaRightArrow,
        mode
      );
    }
  }
  promptForSearchTerm() {
    var _a;
    return (_a = prompt("Search term")) == null ? void 0 : _a.trim();
  }
  //------------------------------------------------------------------------------------------------------------------
  // Try to redirect based on the input
  //------------------------------------------------------------------------------------------------------------------
  redirect(mode) {
    const input = this.dom.filter.value.trim();
    const keyword = adjustCase(input.replace(/\s.*/, ""));
    const shortcut = shortcuts.get(keyword);
    if (!shortcut) {
      return;
    }
    const postKeywordInput = input.replace(/^\s*/, "").substring(keyword.length);
    const searchTerm = postKeywordInput.trim();
    const links = (shortcut == null ? void 0 : shortcut.queries) && searchTerm ? shortcut == null ? void 0 : shortcut.queries : shortcut == null ? void 0 : shortcut.bookmarks;
    this.getSearchTermAndRedirect(mode, input, shortcut, postKeywordInput, searchTerm, links);
  }
  getSearchTermAndRedirect(mode, input, shortcut, postKeywordInput, searchTerm, links) {
    if (postKeywordInput && (shortcut.searchable || !shortcut.queries) && this.suggestions.length) {
      this.applySuggestion(0, mode, false, postKeywordInput);
    } else {
      if (!(shortcut == null ? void 0 : shortcut.bookmarks) && (shortcut == null ? void 0 : shortcut.queries)) {
        searchTerm || (searchTerm = this.promptForSearchTerm());
        if (!searchTerm) {
          return;
        }
      }
      this.performRedirect(input, searchTerm != null ? searchTerm : "", mode, links);
    }
  }
  performRedirect(input, searchTerm, mode, links) {
    var _a;
    if (links) {
      redirector.redirect(links.toFinalizedLinks(searchTerm.trim()), mode);
    } else if (isUrl(input)) {
      redirector.openUrl(input, mode);
    } else if (((_a = state.defaultSearchEngine) == null ? void 0 : _a.queries) && state.config.defaultSearchEngine.useOnHomepage) {
      redirector.redirect(state.defaultSearchEngine.getFinalizedLinks(input), mode);
    } else if (this.suggestions.length) {
      this.selectedIndex = 0;
      this.applySuggestion(this.selectedIndex, mode, false, searchTerm);
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Remove the focus from the input field
  //------------------------------------------------------------------------------------------------------------------
  removeFocus() {
    setTimeout(() => this.dom.filter.blur(), 0);
  }
  //------------------------------------------------------------------------------------------------------------------
  // Update the favicon manager's list of currently displayed icons
  //------------------------------------------------------------------------------------------------------------------
  updateFaviconManagerParametersWhenHomepageIsVisible() {
    state.faviconManager.setCurrentlyDisplayedLinks(
      this.suggestions.map((suggestion) => {
        var _a, _b, _c;
        return (_c = (_b = (_a = suggestion == null ? void 0 : suggestion.shortcut) == null ? void 0 : _a.all[0]) == null ? void 0 : _b.link.faviconUrls[0]) != null ? _c : "";
      }).filter(Boolean)
    );
    if (state.config.favicons.preloadOnStart) {
      state.faviconManager.startPreload();
    }
  }
  updateFaviconManagerParametersWhenHomepageIsNotVisible() {
    state.faviconManager.removeCurrentlyDisplayedLinks();
  }
};
__publicField(_Homepage, "MAX_SUGGESTIONS", 12);
__publicField(_Homepage, "DEBOUNCE_MS", 100);
__publicField(_Homepage, "DEBOUNCE_POLLING_MS", 10);
var Homepage = _Homepage;

// src/web-app/pages/link-tools.ts
var LinkTools = class {
  //------------------------------------------------------------------------------------------------------------------
  // Initialize the link-tools page
  //------------------------------------------------------------------------------------------------------------------
  constructor() {
    __publicField(this, "dom", {
      linkTools: document.querySelector("#link-tools"),
      harParser: {
        input: document.querySelector("#link-tools .har-parser .input"),
        output: document.querySelector("#link-tools .har-parser .output")
      },
      urlEncoding: {
        decoded: document.querySelector("#link-tools input.decoded"),
        encoded: document.querySelector("#link-tools input.encoded")
      }
    });
    this.onDecodedChanged = this.onDecodedChanged.bind(this);
    this.onEncodedChanged = this.onEncodedChanged.bind(this);
    this.onHarInputChanged = this.onHarInputChanged.bind(this);
  }
  hasMenu() {
    return true;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Populate (i.e. reset) the page
  //------------------------------------------------------------------------------------------------------------------
  populate() {
    this.dom.urlEncoding.decoded.value = "";
    this.dom.urlEncoding.encoded.classList.remove("invalid");
    this.dom.urlEncoding.encoded.value = "";
    this.dom.harParser.input.classList.remove("invalid");
    this.dom.harParser.input.value = "";
    this.dom.harParser.output.innerHTML = "";
    return this;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Show and hide the page
  //------------------------------------------------------------------------------------------------------------------
  show() {
    this.addEventHandlers();
    this.dom.linkTools.style.display = "flex";
  }
  hide() {
    this.removeEventHandlers();
    this.dom.linkTools.style.display = "none";
  }
  //------------------------------------------------------------------------------------------------------------------
  // Add and remove event handlers
  //------------------------------------------------------------------------------------------------------------------
  addEventHandlers() {
    ["change", "keydown", "input"].forEach((event) => {
      this.dom.urlEncoding.encoded.addEventListener(event, this.onEncodedChanged);
      this.dom.urlEncoding.decoded.addEventListener(event, this.onDecodedChanged);
      this.dom.harParser.input.addEventListener(event, this.onHarInputChanged);
    });
  }
  removeEventHandlers() {
    ["change", "keydown", "input"].forEach((event) => {
      this.dom.urlEncoding.encoded.removeEventListener(event, this.onEncodedChanged);
      this.dom.urlEncoding.decoded.removeEventListener(event, this.onDecodedChanged);
      this.dom.harParser.input.removeEventListener(event, this.onHarInputChanged);
    });
  }
  //------------------------------------------------------------------------------------------------------------------
  // Event handlers
  //------------------------------------------------------------------------------------------------------------------
  onDecodedChanged() {
    this.dom.urlEncoding.encoded.value = encodeURIComponent(this.dom.urlEncoding.decoded.value);
  }
  onEncodedChanged() {
    try {
      this.dom.urlEncoding.decoded.value = decodeURIComponent(this.dom.urlEncoding.encoded.value);
      this.dom.urlEncoding.encoded.classList.remove("invalid");
    } catch (e) {
      this.dom.urlEncoding.decoded.value = "";
      this.dom.urlEncoding.encoded.classList.add("invalid");
    }
  }
  onHarInputChanged() {
    const input = this.dom.harParser.input.value.trim() || '{"log":{"entries":[]}}';
    try {
      this.dom.harParser.output.innerHTML = "";
      const links = this.extractPostLinks(input);
      if (links.length) {
        this.dom.harParser.output.appendChild(
          create("p", `This HAR file contain the following POST link${1 < links.length ? "s" : ""}:`)
        );
        links.forEach((url) => this.dom.harParser.output.appendChild(url));
      } else if (this.dom.harParser.input.value.trim()) {
        this.dom.harParser.output.appendChild(create("p", "This HAR file does not contain any POST links."));
      }
      this.dom.harParser.input.classList.remove("invalid");
    } catch (e) {
      this.dom.harParser.input.classList.add("invalid");
    }
  }
  extractPostLinks(input) {
    var _a, _b, _c;
    const har = JSON.parse(input);
    const result = new Array();
    for (const entry of har.log.entries) {
      if ("POST" === ((_a = entry == null ? void 0 : entry.request) == null ? void 0 : _a.method)) {
        let url = entry.request.url;
        const postParameters = (_c = (_b = entry == null ? void 0 : entry.request) == null ? void 0 : _b.postData) == null ? void 0 : _c.params;
        for (let index = 0; postParameters && index < postParameters.length; index++) {
          url += 0 === index ? state.config.shortcutFormat.url.postIndicator : `&`;
          const name = encodeURIComponent(postParameters[index].name);
          const value = encodeURIComponent(postParameters[index].value);
          url += `${name}=${value}`;
        }
        result.push(create("p.url", sanitize(url)));
      }
    }
    return result;
  }
};

// src/web-app/pages/redirect-page.ts
var RedirectPage = class {
  constructor() {
    __publicField(this, "dom", {
      redirect: document.querySelector("#redirect"),
      title: document.querySelector("#redirect .title"),
      url: document.querySelector("#redirect .url")
    });
  }
  //------------------------------------------------------------------------------------------------------------------
  // Populate the page
  //------------------------------------------------------------------------------------------------------------------
  populate(htmlDescription, url) {
    this.dom.title.innerHTML = htmlDescription;
    this.dom.url.innerHTML = sanitize(url);
    return this;
  }
  hasMenu() {
    return false;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Show and hide the page
  //------------------------------------------------------------------------------------------------------------------
  show() {
    document.body.append(create("div:html", "&nbsp;"));
  }
  hide() {
    this.dom.redirect.style.display = "none";
  }
};

// src/web-app/pages/setup-instructions.ts
var _SetupInstructions = class _SetupInstructions {
  constructor() {
    __publicField(this, "setupComplete", false);
    __publicField(this, "dom", {
      setup: document.querySelector("#setup"),
      error: document.querySelector("#setup .error"),
      rootPath: document.querySelector("#setup .root-path"),
      header: document.querySelector("#setup h1"),
      pre: document.querySelector("#setup pre"),
      syntaxWarning: document.querySelector("#setup .syntax-warning")
    });
  }
  hasMenu() {
    return false;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Populate the page
  //------------------------------------------------------------------------------------------------------------------
  populate(mode) {
    if (_SetupInstructions.VALIDATE === mode) {
      if (!startupCache.config.length || !startupCache.shortcuts.length) {
        this.dom.error.style.display = "block";
        this.dom.header.style.display = "none";
      } else {
        this.setupComplete = true;
        redirector.openUrl(globalThis.location.href.replace(/\?.*/, ""), 1 /* PRESERVE_HISTORY */);
      }
    }
    let indexPath = "shortycut";
    if (0 === globalThis.location.href.search(/^(file:\/{2}|[a-z]:|\/)/i)) {
      indexPath = getWindowLocationPath().replace(/^file:\/+/, "").replace(/[?#].*/, "").replace(/\/$/, "");
      if (":" === indexPath.charAt(1)) {
        indexPath = indexPath.replaceAll("/", "\\");
      }
    }
    this.dom.rootPath.innerHTML = sanitize(indexPath);
    this.dom.pre.innerHTML = this.dom.pre.innerHTML.replaceAll(/\n[ \t]+/g, "\n");
    this.dom.syntaxWarning.style.display = supportsBacktickSyntax() ? "none" : "block";
    return this;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Show and hide the page
  //------------------------------------------------------------------------------------------------------------------
  show() {
    if (!this.setupComplete) {
      this.dom.setup.style.display = "flex";
    }
  }
  hide() {
    this.dom.setup.style.display = "none";
  }
};
__publicField(_SetupInstructions, "VALIDATE", "validate");
var SetupInstructions = _SetupInstructions;

// src/web-app/pages/shortlist.ts
var Shortlist = class {
  //------------------------------------------------------------------------------------------------------------------
  // Initialize the shortlist
  //------------------------------------------------------------------------------------------------------------------
  constructor() {
    __publicField(this, "dom", {
      shortlist: assertNotNull(document.getElementById("shortlist")),
      listItems: new Array()
    });
    __publicField(this, "links", new Array());
    __publicField(this, "focusIndex", 0);
    this.onKey = this.onKey.bind(this);
    this.openAll = this.openAll.bind(this);
  }
  hasMenu() {
    return true;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Populate the shortlist
  //------------------------------------------------------------------------------------------------------------------
  populate(links) {
    this.links = [null, ...links.links];
    this.dom.listItems = [
      this.createHeader(),
      ...this.links.slice(1).map(
        (link, index) => {
          var _a, _b, _c;
          return this.createLink(
            index + 1,
            assertNotNull(link.urls[0]).permalink,
            link.htmlDescription,
            (event) => this.openSelected(event, index + 1),
            sanitize((_b = (_a = link.urls[0]) == null ? void 0 : _a.url.replace(/^[a-z]+:\/\/+/i, "").replace(/[#?].*/, "")) != null ? _b : ""),
            (_c = link.urls[0]) == null ? void 0 : _c.url
          );
        }
      )
    ];
    this.dom.shortlist.innerHTML = "";
    this.dom.listItems.forEach((href) => this.dom.shortlist.appendChild(href));
    this.focusIndex = 0;
    return this;
  }
  createHeader() {
    return this.createLink(0, "javascript:void(0)", "Open all", this.openAll);
  }
  createLink(index, permalink, title, onClick, subtitle, url) {
    const a = document.createElement("a");
    a.href = permalink;
    a.id = `shortlist${index}`;
    const favicon = url && state.config.homepage.suggestions.showFavicons ? state.faviconManager.getFavicon(url) : "";
    a.innerHTML = create("div.row", [
      create("div.icon", createImage("resources/arrow.svg")),
      create("div.text", [
        create("div.title", title),
        url && subtitle ? create("div.url", favicon, subtitle) : ""
      ])
    ]).outerHTML;
    a.addEventListener("click", onClick);
    return a;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Show and hide the page
  //------------------------------------------------------------------------------------------------------------------
  show() {
    var _a;
    this.addEventHandlers();
    this.dom.shortlist.style.display = "flex";
    (_a = this.dom.listItems[this.focusIndex]) == null ? void 0 : _a.focus();
  }
  hide() {
    this.removeEventHandlers();
    this.dom.shortlist.style.display = "none";
  }
  //------------------------------------------------------------------------------------------------------------------
  // Add and remove event handlers
  //------------------------------------------------------------------------------------------------------------------
  addEventHandlers() {
    ["keyup", "keydown"].forEach((event) => document.addEventListener(event, this.onKey));
  }
  removeEventHandlers() {
    ["keyup", "keydown"].forEach((event) => document.removeEventListener(event, this.onKey));
  }
  //------------------------------------------------------------------------------------------------------------------
  // Event handlers
  //------------------------------------------------------------------------------------------------------------------
  onKey(event) {
    var _a, _b;
    if ("keyup" === event.type) {
      return false;
    }
    const id = ((_a = document.activeElement) == null ? void 0 : _a.id) || "";
    const current = /^shortlist\d+$/.test(id) ? Number.parseInt(id.replace(/shortlist/, "")) : -1;
    if ("Enter" === event.key) {
      if (0 === current) {
        return this.openAll(event);
      } else if (current < this.links.length) {
        return this.openSelected(event, current);
      } else {
        event.preventDefault();
        return false;
      }
    } else {
      this.focusIndex = this.getTargetIndex(event.key, current);
      (_b = this.dom.listItems[this.focusIndex]) == null ? void 0 : _b.focus();
      return true;
    }
  }
  openSelected(event, current) {
    redirector.redirect(
      { links: [assertNotNull(this.links[current])], onMultiLink: OnMultiLink.OPEN_IN_NEW_TAB },
      queryParameters.facets.newTabs ? 0 /* NEW_TAB */ : 1 /* PRESERVE_HISTORY */
    );
    event.preventDefault();
    return false;
  }
  openAll(event) {
    redirector.redirect(
      { links: this.links.slice(1), onMultiLink: OnMultiLink.OPEN_IN_NEW_TAB },
      1 /* PRESERVE_HISTORY */
    );
    event.preventDefault();
    return false;
  }
  getTargetIndex(key, current) {
    if (this.isArrowDown(key) || "Enter" === key || "Tab" === key) {
      return Math.min(Math.max(current + 1, 0), this.links.length - 1);
    } else if (this.isArrowUp(key)) {
      return current < 0 ? this.links.length - 1 : Math.max(Math.min(current - 1, this.links.length - 1), 0);
    } else if ("Home" === key || "PageUp" === key) {
      return 0;
    } else if ("End" === key || "PageDown" === key) {
      return this.links.length - 1;
    }
    return current;
  }
  isArrowDown(key) {
    return "ArrowDown" === key || "Down" === key;
  }
  isArrowUp(key) {
    return "ArrowUp" === key || "Up" === key;
  }
};

// src/web-app/data/page.ts
var Pages = class {
  constructor() {
    __publicField(this, "pages", {
      browserIntegration: null,
      error: null,
      home: null,
      linkTools: null,
      faviconTools: null,
      redirect: null,
      setup: null,
      shortlist: null
    });
  }
  hideAllExcept(page) {
    Object.values(this.pages).forEach((value) => {
      if (value && value !== page && "object" === typeof value && "function" === typeof value.hide) {
        value.hide();
      }
    });
  }
  get error() {
    var _a;
    const error = (_a = this.pages.error) != null ? _a : new ErrorPage();
    this.pages.error = error;
    return error;
  }
  get browserIntegration() {
    var _a;
    const browserIntegration = (_a = this.pages.browserIntegration) != null ? _a : new BrowserIntegration();
    this.pages.browserIntegration = browserIntegration;
    return browserIntegration;
  }
  get home() {
    var _a;
    const home = (_a = this.pages.home) != null ? _a : new Homepage();
    this.pages.home = home;
    return home;
  }
  get linkTools() {
    var _a;
    const linkTools = (_a = this.pages.linkTools) != null ? _a : new LinkTools();
    this.pages.linkTools = linkTools;
    return linkTools;
  }
  get faviconTools() {
    var _a;
    const faviconTools = (_a = this.pages.faviconTools) != null ? _a : new FaviconTools();
    this.pages.faviconTools = faviconTools;
    return faviconTools;
  }
  get redirect() {
    var _a;
    const redirect = (_a = this.pages.redirect) != null ? _a : new RedirectPage();
    this.pages.redirect = redirect;
    return redirect;
  }
  get setup() {
    var _a;
    const setup = (_a = this.pages.setup) != null ? _a : new SetupInstructions();
    this.pages.setup = setup;
    return setup;
  }
  get shortlist() {
    var _a;
    const shortlist = (_a = this.pages.shortlist) != null ? _a : new Shortlist();
    this.pages.shortlist = shortlist;
    return shortlist;
  }
};
var pages = new Pages();

// src/web-app/utilities/error.ts
var Exception = class {
  constructor(title, ...content) {
    __publicField(this, "title");
    __publicField(this, "content");
    this.title = sanitize(title.trim());
    this.content = content;
  }
};
function handleExceptions(onError, action) {
  try {
    action();
  } catch (exception) {
    onError(exception);
  }
}
function displayError(exception) {
  if (exception instanceof Exception) {
    pages.error.populate(exception);
  } else {
    console.error(exception);
    const message = `${exception}`;
    pages.error.populate("Internal error", [create("p", "An internal error occurred:"), create("p", message)]);
  }
  pages.hideAllExcept(pages.error);
  pages.error.show();
}
var InitializationError = class {
  constructor(...htmlElements) {
    __publicField(this, "htmlElements");
    this.htmlElements = htmlElements;
  }
  toHtml() {
    return create("div.description", this.htmlElements);
  }
};
var ScriptLoadingError = class extends InitializationError {
  constructor(html) {
    super(create("div:html", html));
  }
};
var ParserError = class extends InitializationError {
  constructor(description, line) {
    super(create("div", description, ":"), create("div", create("tt", line)));
    this.description = description;
    this.line = line;
  }
};
function runAndIgnoreErrors(callback) {
  try {
    callback();
  } catch (e) {
  }
}

// src/web-app/data/link.ts
var Link = class _Link {
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(keyword, index, segments, onMultiLink, isSearchable, urlOrDynamicShortcut) {
    this.keyword = keyword;
    this.index = index;
    this.segments = segments;
    this.onMultiLink = onMultiLink;
    this.isSearchable = isSearchable;
    this.urlOrDynamicShortcut = urlOrDynamicShortcut;
    __publicField(this, "isQuery");
    __publicField(this, "_filterSummary");
    __publicField(this, "_overridden", false);
    this.isQuery = "string" === typeof this.urlOrDynamicShortcut ? adjustCase(this.urlOrDynamicShortcut).includes(state.config.shortcutFormat.url.searchTermPlaceholder) : this.urlOrDynamicShortcut.isQuery;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Convert this link into finalized links/URLs (with the search term replaced)
  //------------------------------------------------------------------------------------------------------------------
  toFinalizedLinks(searchTerm) {
    if ("string" === typeof this.urlOrDynamicShortcut) {
      return this.constructFinalizedLinks([this.urlOrDynamicShortcut], searchTerm);
    }
    const urlOrUrls = this.urlOrDynamicShortcut.generator(searchTerm);
    return this.constructFinalizedLinks(_Link.normalizeDynamicLinks(urlOrUrls), searchTerm);
  }
  //----------------------------------------------------------------------------------------------------------------------
  // Normalize dynamically generated URLs
  //----------------------------------------------------------------------------------------------------------------------
  static normalizeDynamicLinks(generatedLinks) {
    if ("string" === typeof generatedLinks) {
      return this.normalizeDynamicLink(generatedLinks);
    }
    return generatedLinks.flatMap((generatedLink) => {
      return "string" === typeof generatedLink ? this.normalizeDynamicLink(generatedLink) : [__spreadProps(__spreadValues({}, generatedLink), { url: generatedLink.url.trim() })];
    });
  }
  static normalizeDynamicLink(generatedLink) {
    const commentIndicator = state.config.shortcutFormat.comment;
    return generatedLink.split(/\r?\n/).map((link) => link.trim()).filter(Boolean).filter((link) => !commentIndicator || !link.startsWith(commentIndicator));
  }
  //------------------------------------------------------------------------------------------------------------------
  // Convert the given URLs/links into one or more finalized links
  //------------------------------------------------------------------------------------------------------------------
  constructFinalizedLinks(urls, searchTerm) {
    if (0 === urls.filter((link) => {
      var _a;
      return "string" !== typeof link && ((_a = link.description) == null ? void 0 : _a.trim());
    }).length) {
      return [
        this.constructFinalizedLink(
          "",
          urls.map((link) => "string" === typeof link ? link : link.url),
          searchTerm
        )
      ];
    }
    return urls.map((link) => "string" === typeof link ? { description: "", url: link } : link).map((link) => this.constructFinalizedLink(link.description, [link.url], searchTerm));
  }
  //------------------------------------------------------------------------------------------------------------------
  // Convert the given URLs into one finalized link
  //------------------------------------------------------------------------------------------------------------------
  constructFinalizedLink(description, urls, searchTerm) {
    const segment = new Segments([...this.segments.segments, new Segment("", [description])]);
    return {
      htmlDescription: (description ? segment : this.segments).descriptionHtml,
      urls: urls.map((url) => this.constructFinalizedUrl(url, searchTerm))
    };
  }
  //------------------------------------------------------------------------------------------------------------------
  // Convert a single URL into a finalized URL
  //------------------------------------------------------------------------------------------------------------------
  constructFinalizedUrl(link, searchTerm) {
    const parsedLink = _Link.splitUrlAndPostFields(link);
    const url = _Link.insertSearchTerm(parsedLink.url, searchTerm);
    const postFields = _Link.constructFinalizedPostFields(parsedLink.postFields, searchTerm);
    const permalink = postFields ? _Link.constructFinalizedPermalink(url, postFields) : url;
    return { url, postFields, permalink };
  }
  //------------------------------------------------------------------------------------------------------------------
  // Create a permalink (the regular URL for GET requests and a ShortyCut self-link for POST requests)
  //------------------------------------------------------------------------------------------------------------------
  static constructFinalizedPermalink(finalizedUrl, finalizedPostFields) {
    const baseUrl = globalThis.location.href.replaceAll(/[#?].*/g, "");
    const json = { url: finalizedUrl, postFields: finalizedPostFields };
    const redirect = encodeURIComponent(JSON.stringify(json));
    return `${baseUrl}?${queryParameters.REDIRECT_KEY}=${redirect}`;
  }
  get faviconUrls() {
    return "string" === typeof this.urlOrDynamicShortcut ? [this.urlOrDynamicShortcut] : this.urlOrDynamicShortcut.getFaviconUrls();
  }
  get overridden() {
    return this._overridden;
  }
  markAsOverridden() {
    this._overridden = true;
  }
  get filterSummary() {
    if (!this._filterSummary) {
      this._filterSummary = `${this.keyword} ${this.segments.description}`.toLocaleLowerCase().replaceAll(/\s/g, "");
    }
    return this._filterSummary;
  }
  static insertSearchTerm(text, searchTerm) {
    return replaceAll(
      text,
      state.config.shortcutFormat.url.searchTermPlaceholder,
      encodeURIComponent(searchTerm),
      state.config.shortcutFormat.keyword.caseSensitive
    );
  }
  static splitUrlAndPostFields(url) {
    const separator = state.config.shortcutFormat.url.postIndicator;
    const index = separator ? adjustCase(url).indexOf(separator) : -1;
    return separator && 0 <= index ? { url: url.substring(0, index), postFields: url.substring(index + separator.length) } : { url };
  }
  //------------------------------------------------------------------------------------------------------------------
  // Construct a finalized post fields as key/value pairs with the search term already replaced
  //------------------------------------------------------------------------------------------------------------------
  static constructFinalizedPostFields(postFields, searchTerm) {
    return postFields == null ? void 0 : postFields.split("&").filter(Boolean).map((field) => this.constructFinalizedPostField(field, searchTerm));
  }
  //------------------------------------------------------------------------------------------------------------------
  // Construct a single post field as key/value pair with the search term already replaced
  //------------------------------------------------------------------------------------------------------------------
  static constructFinalizedPostField(parameter, searchTerm) {
    const index = parameter.indexOf("=");
    if (index < 1) {
      throw new Exception(
        "Shortcut definition error",
        `Post parameter ${sanitize(parameter)} is not in key=value format`
      );
    }
    try {
      const key = decodeURIComponent(this.insertSearchTerm(parameter.substring(0, index), searchTerm));
      const value = decodeURIComponent(this.insertSearchTerm(parameter.substring(index + 1), searchTerm));
      return { key, value };
    } catch (e) {
      throw new Exception(
        "Shortcut definition error",
        `Post parameter ${sanitize(parameter)} is not URL encoded`
      );
    }
  }
};

// src/web-app/data/parser.ts
var DYNAMIC_LINK_PROTOCOL = "function";
var ParserContext = class {
  constructor() {
    // input data
    __publicField(this, "line", "");
    // extracted components
    __publicField(this, "description", "");
    __publicField(this, "urlOrDynamicShortcut", "");
    __publicField(this, "isStandardProtocol", false);
    __publicField(this, "onMultiLink", OnMultiLink.OPEN_IN_NEW_TAB);
    // re-usable components (garbage collection performance tuning)
    __publicField(this, "combination", new Array());
  }
};
var _ShortcutParser = class _ShortcutParser {
  constructor() {
    __publicField(this, "KNOWN_PROTOCOLS", ["file", "ftp", "http", "https", DYNAMIC_LINK_PROTOCOL].map((p) => `${p}://`));
  }
  //------------------------------------------------------------------------------------------------------------------
  // Parse all shortcut definitions
  //------------------------------------------------------------------------------------------------------------------
  parseLines(lines, startIndex, endIndex, shortcuts2) {
    var _a, _b, _c, _d;
    const context = new ParserContext();
    for (let index = startIndex; index < endIndex; index++) {
      context.line = (_b = (_a = lines[index]) == null ? void 0 : _a.trim()) != null ? _b : "";
      if (context.line && !startsWith(context.line, state.config.shortcutFormat.comment)) {
        try {
          this.parseLineAndStoreShortcut(context, shortcuts2);
        } catch (exception) {
          this.handleParserError(exception);
        }
      }
    }
    if ("defaultsearchengine" === state.config.defaultSearchEngine.keyword) {
      shortcuts2.delete(state.config.defaultSearchEngine.keyword);
    }
    (_d = (_c = state).defaultSearchEngine) != null ? _d : _c.defaultSearchEngine = new Shortcut(
      "config.defaultSearchEngine.keyword",
      [],
      OnMultiLink.SHOW_MENU,
      [
        "https://duckduckgo.com/?q=",
        state.config.shortcutFormat.url.searchTermPlaceholder,
        "&kah=us-en%2Chk-tzh&kav=1&kam=google-maps&kak=-1&kax=-1&kaq=-1&kap=-1&kao=-1&kau=-1"
      ].join("")
    );
  }
  handleParserError(exception) {
    if (exception instanceof ParserError) {
      startupCache.initializationErrors.push(exception);
    } else {
      throw exception;
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Parse a single line
  //------------------------------------------------------------------------------------------------------------------
  parseLineAndStoreShortcut(context, shortcuts2) {
    this.splitDescriptionAndUrl(context);
    this.parseOnMultiLink(context);
    const keywords = this.formKeywords(context, this.parseKeywordsAndDescription(context));
    let hasKeywords = false;
    keywords.entries.filter((entry) => entry.key).forEach((entry) => {
      var _a;
      const keyword = entry.key;
      const sections = entry.value;
      if (shortcuts2.get(keyword)) {
        (_a = shortcuts2.get(keyword)) == null ? void 0 : _a.addLink(keyword, sections, context.onMultiLink, context.urlOrDynamicShortcut);
      } else {
        shortcuts2.put(
          keyword,
          new Shortcut(keyword, sections, context.onMultiLink, context.urlOrDynamicShortcut)
        );
      }
      if (keyword === state.config.defaultSearchEngine.keyword) {
        state.defaultSearchEngine = assertNotNull(shortcuts2.get(keyword));
      }
      hasKeywords = true;
    });
    if (!hasKeywords) {
      throw new ParserError("Failed to retrieve the keyword", context.line);
    }
    return shortcuts2;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Separate the description from the  URL
  //------------------------------------------------------------------------------------------------------------------
  splitDescriptionAndUrl(context) {
    const { url, isStandardProtocol } = this.getUrl(context.line);
    context.isStandardProtocol = isStandardProtocol;
    context.urlOrDynamicShortcut = url;
    context.description = context.line.substring(0, context.line.length - url.length);
    if (0 === context.urlOrDynamicShortcut.indexOf(DYNAMIC_LINK_PROTOCOL)) {
      context.urlOrDynamicShortcut = assertNotNull(startupCache.dynamicLinks.get(context.urlOrDynamicShortcut));
      if (!context.urlOrDynamicShortcut) {
        throw new ParserError(
          "The dynamic link created via shortycut.toUrl() must be at the end of the line",
          context.line
        );
      }
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Get the line's URL
  //------------------------------------------------------------------------------------------------------------------
  getUrl(line) {
    const lineLowerCase = line.toLowerCase();
    return this.getStandardProtocolUrl(line, lineLowerCase) || this.getNonStandardProtocolUrl(line, lineLowerCase);
  }
  //------------------------------------------------------------------------------------------------------------------
  // Get the line's standard protocol URL (if found)
  //------------------------------------------------------------------------------------------------------------------
  getStandardProtocolUrl(line, lineLowerCase) {
    const index = this.KNOWN_PROTOCOLS.map((protocol) => lineLowerCase.indexOf(protocol)).filter((matchIndex) => 0 <= matchIndex).reduce((a, b) => Math.min(a, b), line.length);
    if (index < line.length) {
      return { isStandardProtocol: true, url: line.substring(index) };
    } else {
      return void 0;
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Get the line's non-standard protocol URL (if found)
  //------------------------------------------------------------------------------------------------------------------
  getNonStandardProtocolUrl(line, lineLowerCase) {
    let offset = 0;
    while (offset < line.length) {
      const index = line.indexOf(_ShortcutParser.PROTOCOL_SEPARATOR, offset);
      if (0 < index) {
        if ("a" <= lineLowerCase.charAt(index - 1) && lineLowerCase.charAt(index - 1) <= "z") {
          const start = this.getProtocolStartOffset(index, lineLowerCase);
          return { isStandardProtocol: false, url: line.substring(start) };
        } else {
          offset = index + _ShortcutParser.PROTOCOL_SEPARATOR.length;
        }
      } else {
        offset = line.length;
      }
    }
    throw new ParserError("Unable to retrieve the link (make sure it starts with a protocol like https://)", line);
  }
  getProtocolStartOffset(index, lineLowerCase) {
    let start = index - 1;
    while (0 < start && "a" <= lineLowerCase.charAt(start - 1) && lineLowerCase.charAt(start - 1) <= "z") {
      start--;
    }
    return start;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Extract the behavior for duplicate keywords
  //------------------------------------------------------------------------------------------------------------------
  parseOnMultiLink(context) {
    var _a;
    const multiLinkIndicator = state.config.shortcutFormat.url.multiLinkIndicator;
    for (let pass = 0; pass <= 1; pass++) {
      for (const onMultiLink of OnMultiLink.values) {
        const symbol = (_a = getProperty(multiLinkIndicator, onMultiLink.key)) != null ? _a : "~!@#$%^&*()_+";
        if (!pass && context.isStandardProtocol && "string" === typeof context.urlOrDynamicShortcut && startsWith(context.urlOrDynamicShortcut, symbol)) {
          context.onMultiLink = onMultiLink;
          context.urlOrDynamicShortcut = context.urlOrDynamicShortcut.substring(symbol.length).trim();
          return;
        } else if (pass && endsWith(context.description, symbol)) {
          context.description = context.description.substring(0, context.description.length - symbol.length).trim();
          context.onMultiLink = onMultiLink;
          return;
        }
      }
    }
    context.onMultiLink = OnMultiLink.getDefault();
  }
  //------------------------------------------------------------------------------------------------------------------
  // Split keywords and descriptions and create segments as required
  //------------------------------------------------------------------------------------------------------------------
  parseKeywordsAndDescription(context) {
    context.description = context.description.replace(/\s+/, " ");
    if (startsWith(context.description, state.config.shortcutFormat.keyword.openingDelimiter)) {
      return this.parseSegments(context, context.description);
    } else {
      const index = context.description.search(/(\s|$)/);
      return [
        {
          keywords: this.splitKeywords(context, context.description.substring(0, index)),
          description: context.description.substring(index).trim()
        }
      ];
    }
  }
  parseSegments(context, description) {
    let splitResult = this.splitNextSegment(context, description);
    const segments = [(splitResult == null ? void 0 : splitResult.nextSegment) || { keywords: [], description }];
    while (state.config.shortcutFormat.enableGrouping && splitResult.nextSegment) {
      splitResult = this.splitNextSegment(context, splitResult.nextSegment.description);
      if (splitResult.nextSegment) {
        const last = segments.at(-1);
        if (last) {
          last.description = splitResult.description;
        }
        segments.push(splitResult.nextSegment);
      }
    }
    return segments;
  }
  splitNextSegment(context, description) {
    const openingDelimiter = assertNotNull(state.config.shortcutFormat.keyword.openingDelimiter);
    const closingDelimiter = assertNotNull(state.config.shortcutFormat.keyword.closingDelimiter);
    const startIndex = description.indexOf(openingDelimiter);
    if (0 <= startIndex) {
      const nextSegment = description.substring(startIndex + openingDelimiter.length);
      const endIndex = nextSegment.indexOf(closingDelimiter);
      if (endIndex < 0) {
        throw new ParserError(`Missing ${closingDelimiter} after ${openingDelimiter}`, context.line);
      }
      return {
        description: description.substring(0, startIndex),
        nextSegment: {
          keywords: this.splitKeywords(context, nextSegment.substring(0, endIndex)),
          description: nextSegment.substring(endIndex + closingDelimiter.length).trim()
        }
      };
    }
    return { description };
  }
  splitKeywords(context, keywords) {
    const result = new Array();
    for (const originalKeyword of keywords.split(state.config.shortcutFormat.keyword.separator || /\s+/)) {
      const keyword = originalKeyword.trim();
      if (keyword) {
        if (/\s/.test(keyword)) {
          throw new ParserError(`The keyword "${keyword}" contains whitespace`, context.line);
        } else {
          result.push(adjustCase(keyword));
        }
      }
    }
    return result;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Combine each keyword of each segment with each keyword in each other segment
  //------------------------------------------------------------------------------------------------------------------
  formKeywords(context, segments) {
    var _a, _b, _c;
    const result = new Hashtable();
    const keyword = new Array();
    let hasMoreCombinations = true;
    for (let index = 0; index < segments.length; index++) {
      context.combination[index] = 0;
    }
    while (hasMoreCombinations) {
      const array = new Array();
      for (let index = 0; index < segments.length; index++) {
        keyword[index] = (_b = (_a = segments[index]) == null ? void 0 : _a.keywords[assertNotNull(context.combination[index])]) != null ? _b : "";
        array.push(
          this.createSegment(assertNotNull(keyword[index]), assertNotNull(segments[index]).description)
        );
      }
      result.put(keyword.join(""), array);
      hasMoreCombinations = false;
      for (let index = segments.length - 1; 0 <= index; index--) {
        if (assertNotNull(context.combination[index]) + 1 < assertNotNull(segments[index]).keywords.length) {
          context.combination[index] = ((_c = context.combination[index]) != null ? _c : 0) + 1;
          hasMoreCombinations = true;
          break;
        } else {
          context.combination[index] = 0;
        }
      }
    }
    return result;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Splits hotkeys from non-hotkeys (e.g. _Git_Hub is converted into ["", "G", "it", "H", "ub"]
  //------------------------------------------------------------------------------------------------------------------
  createSegment(keyword, description) {
    const marker = state.config.shortcutFormat.hotkeyMarker;
    if (marker) {
      const sections = replaceAll(description, `${marker}${marker}`, "\n", true).split(marker).map((item) => replaceAll(item, "\n", `${marker}${marker}`, true));
      let repeat = false;
      for (let index = 1; index < sections.length; index = index + (repeat ? 0 : 1)) {
        const keywordChar = adjustCase(keyword.charAt(index - 1));
        const sectionChar = adjustCase(assertNotNull(sections[index]).charAt(0));
        if (keywordChar === sectionChar) {
          repeat = false;
        } else {
          sections[index - 1] = assertNotNull(sections[index - 1]) + sections[index];
          sections.splice(index, 1);
          repeat = true;
        }
      }
      return new Segment(keyword, keyword.length + 1 === sections.length ? sections : [sections.join("")]);
    }
    return new Segment(keyword, [description]);
  }
};
__publicField(_ShortcutParser, "PROTOCOL_SEPARATOR", "://");
var ShortcutParser = _ShortcutParser;

// src/web-app/application/javascript-loader.ts
var JavaScriptFile = class {
  constructor(url, dependencies) {
    this.url = url;
    __publicField(this, "dependencies", new Array());
    __publicField(this, "status", "waiting");
    dependencies == null ? void 0 : dependencies.forEach((dependency) => this.dependencies.push(dependency));
  }
};
var JavaScriptLoader = class {
  constructor() {
    __publicField(this, "onCompleteHandler");
  }
  get files() {
    var _a, _b;
    const globalThisTyped2 = globalThis;
    const result = (_a = globalThisTyped2.shortycutJavaScriptLoaderFiles) != null ? _a : new Hashtable();
    (_b = globalThisTyped2.shortycutJavaScriptLoaderFiles) != null ? _b : globalThisTyped2.shortycutJavaScriptLoaderFiles = result;
    return result;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Add a file and start loading it (if possible)
  //------------------------------------------------------------------------------------------------------------------
  add(url, dependencies) {
    const file = this.files.computeIfAbsent(url, (requestedUrl) => new JavaScriptFile(requestedUrl, []));
    dependencies == null ? void 0 : dependencies.forEach((dependency) => file.dependencies.push(dependency));
    this.checkDependenciesAndLoadFiles();
    return file;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Load files whose prerequisites are met, check for deadlocks and start the application when done
  //------------------------------------------------------------------------------------------------------------------
  checkDependenciesAndLoadFiles() {
    const files = this.files.values;
    for (const file of files) {
      if (file.status === "waiting" && !file.dependencies.filter((dep) => dep.status !== "completed").length) {
        this.startLoad(file);
      }
    }
    const waitingFiles = files.filter((file) => file.status === "waiting");
    const hasWaitingFiles = !!waitingFiles.length;
    const hasLoadingFiles = !!files.filter((file) => file.status === "loading").length;
    if (!hasWaitingFiles && !hasLoadingFiles && this.onCompleteHandler) {
      this.onCompleteHandler();
    }
    if (hasWaitingFiles && !hasLoadingFiles) {
      startupCache.initializationErrors.push(
        new ScriptLoadingError(
          `
                There's a cyclic dependency (&quot;deadlock&quot;) between the following JavaScript files:
                ${waitingFiles.map((file) => sanitize(file.url)).join(" and ")}
            `.trim()
        )
      );
      waitingFiles.forEach((file) => this.startLoad(file));
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Start loading the given file
  //------------------------------------------------------------------------------------------------------------------
  startLoad(file) {
    var _a;
    file.status = "loading";
    const script = document.createElement("script");
    script.addEventListener("load", () => this.onLoad(file));
    script.addEventListener("error", () => this.onError(file));
    script.type = "text/javascript";
    script.src = /^[a-z]+:\/\/.*/i.test(file.url) ? file.url : `data/${file.url}`;
    (_a = document.getElementsByTagName("head")[0]) == null ? void 0 : _a.appendChild(script);
  }
  //------------------------------------------------------------------------------------------------------------------
  // Handle file load events
  //------------------------------------------------------------------------------------------------------------------
  onLoad(file) {
    file.status = "completed";
    this.checkDependenciesAndLoadFiles();
  }
  onError(file) {
    file.status = "completed";
    startupCache.initializationErrors.push(new ScriptLoadingError(`Failed to load ${sanitize(file.url)}`));
    this.checkDependenciesAndLoadFiles();
  }
  //------------------------------------------------------------------------------------------------------------------
  // Register the callback and invoke it immediately there are no pending/loading files
  //------------------------------------------------------------------------------------------------------------------
  onComplete(onCompleteHandler) {
    this.onCompleteHandler = onCompleteHandler;
    this.checkDependenciesAndLoadFiles();
  }
};
var javaScriptLoader = new JavaScriptLoader();

// src/web-app/application/api.ts
function configure(newConfig) {
  startupCache.config.push(newConfig);
}
function addShortcuts(...shortcuts2) {
  for (const shortcut of shortcuts2) {
    if ("string" === typeof shortcut) {
      startupCache.shortcuts.push(shortcut);
    } else {
      shortcut.forEach((item) => startupCache.shortcuts.push(item));
    }
  }
}
function toUrl(fn) {
  return registerDynamicLink("toUrl", fn);
}
function toQueryUrl(fn) {
  return registerDynamicLink("toQueryUrl", fn);
}
function toBookmarkUrl(fn) {
  return registerDynamicLink("toBookmarkUrl", fn);
}
function registerDynamicLink(entryPoint, fn) {
  if ("function" !== typeof fn) {
    startupCache.initializationErrors.push(
      new InitializationError(
        create("div", `The parameter passed to shortycut.${entryPoint}() is not a function:`),
        create("div", create("tt", `${fn}`))
      )
    );
    fn = () => [];
  }
  const key = `${DYNAMIC_LINK_PROTOCOL}://${entryPoint}.${startupCache.dynamicLinks.size + 1}`;
  startupCache.dynamicLinks.put(key, {
    generator: fn,
    isQuery: "toBookmarkUrl" !== entryPoint,
    getFaviconUrls: () => getUrlsForFavicon(fn)
  });
  return key;
}
function getUrlsForFavicon(dynamicLinkFunction) {
  const valid = new Array();
  const invalid = new Array();
  for (const searchTerm of [void 0, null, "", "1"]) {
    try {
      const generatedLinks = dynamicLinkFunction(searchTerm);
      const normalizedLinks = Link.normalizeDynamicLinks(generatedLinks);
      const result = analyzeUrls(normalizedLinks);
      result.valid.forEach((url) => valid.push(url));
      result.invalid.forEach((url) => invalid.push(url));
    } catch (e) {
    }
  }
  const [first] = invalid;
  if (void 0 !== first) {
    const invalidLinksLike = 1 === invalid.length ? "an invalid URL" : "invalid URLs like";
    startupCache.initializationErrors.push(
      new InitializationError(
        create("div", `The dynamic link function returned ${invalidLinksLike}`),
        create("div", create("tt", first))
      )
    );
  }
  return valid;
}
function analyzeUrls(result) {
  const valid = new Array();
  const invalid = new Array();
  ("string" === typeof result ? [result] : result).map((link) => "string" === typeof link ? link : link.url).forEach((url) => (url && isUrl(url) ? valid : invalid).push(url));
  return { valid, invalid };
}
var JavaScriptDependencyBuilder = class _JavaScriptDependencyBuilder {
  constructor(dependencies) {
    this.dependencies = dependencies;
  }
  andThen(...files) {
    return new _JavaScriptDependencyBuilder(files.map((file) => javaScriptLoader.add(file, this.dependencies)));
  }
};
function loadJavaScript(...files) {
  return new JavaScriptDependencyBuilder([]).andThen(...files);
}

// src/web-app/generated/html-body.ts
var HTML_BODY = `

    <!-- =========================================================================================================== -->
    <!-- Home page                                                                                                   -->
    <!-- =========================================================================================================== -->

    <div id="home" style="display:none">
        <div class="row selected filter-row">
            <div class="cursor">
                <img src="resources/arrow.svg" class="icon" alt="ShortyCut icon">
            </div>
            <div class="row-content">
                <input type="text" placeholder="" class="input" name="user-input" />
            </div>
        </div>
        <div class="suggestions">
        </div>
        <div class="notification">
            <div class="welcome" style="display:none">
                <p>
                    This is ShortyCut's homepage. Enter a keyword above, for example:
                </p>
                <p class="example">
                    <span class="key">t</span> ... to explore keywords starting with a &quot;t&quot;
                </p>
                <p class="example">
                    <span class="key">e sunglasses</span> ... to search for sunglasses on eBay
                </p>
                <p class="example">
                    <span class="key">news</span> ... to try out multi-link keywords
                    <br>
                    <br>
                </p>
                <p class='new-tabs'>
                    To keep ShortyCut permanently open in this tab,
                    <a href="self://?facets=new-tabs">click here to open all links in new tabs</a>.
                </p>
                <p>
                    Then add your own links to <span class="key">shortcut.js</span> in the <span class="key">data</span>
                    folder. See the <a href="resources/docs/shortcut-syntax.html">manual</a> for details.
                </p>
            </div>
            <div class="application-errors" style="display:none">
            </div>
            <div class="no-shortcuts-no-error" style="display:none">
                <div class="header">Failed to load shortcuts</div>
                <div class="description spacing">
                    No shortcuts have been defined in shortcut.js.
                </div>
            </div>
            <div class="error-with-backtick-support" style="display:none">
                <div class="header">Failed to load shortcuts</div>
                <div class="description spacing">
                    JavaScript errors have occurred while trying to load the shortcuts.
                    <br>Make sure to avoid
                    <a href="resources/docs/file-format.html">unsupported symbols</a> in shortcuts.js.
                </div>
            </div>
            <div class="error-without-backtick-support" style="display:none">
                <div class="header">Failed to load shortcuts</div>
                <div class="description spacing">
                    JavaScript errors have occurred while trying to load the shortcuts.
                    <br>It also appears that your browser does not support the backtick syntax.
                    <br>Make sure to use the <a href="resources/docs/file-format.html#legacy-format">legacy format</a>
                    and avoid any unsupported symbols.
                </div>

            </div>
        </div>
    </div>

    <!-- =========================================================================================================== -->
    <!-- Menu                                                                                                        -->
    <!-- =========================================================================================================== -->

    <div id="menu" style="display:none">
        <a class="burger-icon">
            <div></div>
            <div></div>
            <div></div>
        </a>
        <a class="close-icon">
        </a>
        <div class="items">
        </div>
    </div>

    <!-- =========================================================================================================== -->
    <!-- Error message                                                                                               -->
    <!-- =========================================================================================================== -->

    <div id="error" style="display:none">
        <div class="title">
        </div>
        <div class="message">
        </div>
    </div>

    <!-- =========================================================================================================== -->
    <!-- List with multiple links associated with the same keyword                                                   -->
    <!-- =========================================================================================================== -->

    <div id="shortlist" style="display:none">
    </div>

    <!-- =========================================================================================================== -->
    <!-- Redirect                                                                                                    -->
    <!-- =========================================================================================================== -->

    <div id="redirect" style="display:none">
        <div class="icon">
            <img src="resources/arrow.svg">
        </div>
        <div class="text">
            <div class="title"></div>
            <div class="url"></div>
        </div>
    </div>

    <!-- =========================================================================================================== -->
    <!-- Setup page                                                                                                  -->
    <!-- =========================================================================================================== -->

    <div id="setup" style="display:none">
        <div>
            <div class="error" style="display:none">
                That didn't work. Please double-check the folder name and try again.
            </div>
            <h1>
                <img src="resources/arrow.svg">
                <span class="title">Welcome</span>
            </h1>
        </div>
        <div class="instructions">
            <p>
                It looks like you've just installed ShortyCut.
                To complete the setup, rename the <span class="filename">data-template</span> folder to
                <span class="filename">data</span> (i.e. remove <span class="filename">-template</span>
                from the folder's name):
            </p>
            <pre><span class="root-path">shortycut</span>
                +-- data-template<span class="highlight"><span class="arrow">&#x25C0;</span> Rename this folder from: data-template</span>
                +-- resources    <span class="arrow">&nbsp;</span>                      <span class="highlight">to: data</span>
                +-- index.html</pre>
            <div class="syntax-warning" style="display:none">
                <p>
                    The <span class="filename">data</span> folder contains a file named
                    <span class="filename">shortcuts.js</span> which uses ShortyCut's standard format.
                </p>
                <p class="important">
                    It looks like this format is not supported by your browser.
                </p>
                <p>
                    Please follow the instructions in the <a href="resources/docs/file-format.html">manual</a>
                    to use the legacy format instead.
                </p>
            </div>
            <p>
                <a href="self://?setup=validate" class="button">Done</a>
            </p>
        </div>
    </div>

    <!-- =========================================================================================================== -->
    <!-- Link tools                                                                                                  -->
    <!-- =========================================================================================================== -->

    <div id="link-tools" style="display:none" class="utility-page">
        <div class="url-encoding">
            <h1>URL-Encoding</h1>
            <p>
                Link parameters (like filters and settings) need to be URL-encoded.
                <br>Enter text into any of the fields below to encode or decode it.
            </p>
            <p>
                Plain text
                <br><input class="decoded" />
            </p>
            <p>
                URL-encoded
                <br><input class="encoded" />
            </p>
        </div>
        <div class="har-parser">
            <h1>Extract POST links</h1>
            <p>
                Web pages using the POST method don't contain settings and filters in their address.
                <br>Using an HTTP Archive (HAR file) is the easiest way to extract their ShortyCut link.
                <br>Refer to the <a href="./resources/docs/post-links.html#extracting-post-links">documentation</a>
                on how to obtain the HAR file.
                <br>Paste the HAR file into the field below to extract all POST pages.
            </p>
            <p>
                <textarea class="input" placeholder="Paste the HAR file in here"></textarea>
            </p>
            <div class="output">

            </div>
        </div>
    </div>

    <!-- =========================================================================================================== -->
    <!-- Favicon tools                                                                                               -->
    <!-- =========================================================================================================== -->

    <div id="favicon-tools" style="display:none" class="utility-page">
        <div class="config-warning" style="display:none">
            Favicons are disabled. To enable them, set the config property
            <a href="resources/docs/configuration.html#shortcutformathomepagesuggestionsshowfavicons">showFavicons</a>
            to true.
        </div>
        <h1>Favicons</h1>
        <div>
            ShortyCut's homepage displays website's favicons as part of suggestions.
            <br>It's recommended to download them for quicker access.
            See the <a href="resources/docs/favicons.html">manual</a> for details.
        </div>
        <div class="pending" style="display:none">
            <h1>Analysis in progress...</h1>
            Scanning the below websites for favicons. Please wait...
            <br>
            <br>
            <div class="listing"></div>
        </div>
        <div class="online" style="display:none">
            <h1>Ready for download</h1>
            The following icons are available for download.
            See the <a href="resources/docs/favicons.html#downloadable-favicons">manual</a> for details.
            <br>If you're familiar with the command line, you can batch-download all at once:
            <br>
            <br><a href="" class="curl">Click here to show &quot;curl&quot; commands<br></a>
            <textarea class="curl" wrap="off" readonly style="display:none"></textarea>
            <br>Otherwise right-click on each icon and save the image file.
            <br>Then rename it to the filename displayed next to the icon:
            <br>
            <br>
            <div class="listing"></div>
        </div>
        <div class="missing" style="display:none">
            <h1>Missing favicons</h1>
            The following websites have no standard favicon.
            <br>Consider downloading suitable icons from elsewhere.
            <br>See the <a href="resources/docs/favicons.html#missing-favicons">manual</a> for details.
            <br>
            <br>
            <div class="listing"></div>
        </div>
        <div class="offline" style="display:none">
            <h1>Already downloaded</h1>
            The following icons have already been downloaded:
            <br>
            <br>
            <div class="listing"></div>
        </div>
    </div>

    <!-- =========================================================================================================== -->
    <!-- Browser integration                                                                                         -->
    <!-- =========================================================================================================== -->

    <div id="browser-integration" style="display:none" class="utility-page">
        <h1>Browser integration</h1>
        <div>
            This page contains links and tools for integrating ShortyCut with your browser.
            See the <a href="resources/docs/browser-integration.html">manual</a>
            for a description of all methods.
        </div>
        <h1>Homepage</h1>
        <div>
            ShortyCut has settings to tweak the behavior of its homepage
            when used as the browser's start page or as a pinned tab.
            Activate them as required by ticking the checkboxes below:
            <br>
            <br>
            <label><input type="checkbox" class="new-tabs" /> Always open all links in new tabs</label>
            <br>
            <br>
            <label><input type="checkbox" class="no-focus" /> Don't focus on the input field (when ShortyCut
                loads)</label>
            <br>
            <br>
            Theme:
            <label><input type="radio" name="theme" value="light"> Light</label>
            <label><input type="radio" name="theme" value="dark"> Dark</label>
            <label><input type="radio" name="theme" value="system" checked> Auto (follow system)</label>
            <br>
            <br>
            Set your browser's start page or the pinned tab to the following address:
            <br>
            <br><a class="homepage"></a>
        </div>
        <h1>Keyword query</h1>
        <div>
            If supported by your browser, you can create a keyword query.
            See the <a href="resources/docs/keyword-query.html">manual</a> for details how it works.
            In Firefox, the keyword query can be created via the context menu:
            <br>
            <br>
            <form class="form"><input name="q" readonly
                    value="Right-click here and select &quot;Add a keyword for this search...&quot;"></form>
            <br>In other browsers, manually create the keyword with the following address:
            <br>
            <br><a onclick="return false" class="keyword"></a>
        </div>
        <h1>Search engine</h1>
        <div class="web-server-required" style="display:none">
            To add ShortyCut as a search engine, it must be access through a web server.
            Follow the instructions in the <a href="resources/docs/web-server.html">manual</a> to set it up.
            Once the web server is up and running, access ShortyCut through this link:
            <br>
            <br><a href="http://localhost:4171/index.html">http://localhost:4171/index.html</a>
            <br>
            <br>For browsers which require an encrypted connection, use this link instead:
            <br>
            <br><a href="https://localhost:4172/index.html">https://localhost:4172/index.html</a>
            <br>
            <br>This will produce a security warning. Confirm it to open ShortyCut.
        </div>
        <div class="search-engine" style="display:none">
            ShortyCut should be discovered as a search engine automatically.
            <br>Please check your browser's th search box.
            <br>If ShortyCut doesn't show up, try clicking on the following link:
            <br>
            <br><a class="open-search"></a>
        </div>
        <h1>Pop-up blocker</h1>
        <div>
            ShortyCut allows multiple links / bookmarks to have the same keyword.
            <br>Depending on the configuration, it can open all of them in separate tabs.
            <br>To use this feature, you need to disable the browser's pop-up blocker.
            <br>Test if the blocker is currently active by clicking on this button:
            <br>
            <br><input type="button" class="pop-up" value="Open 2 pop-up windows" />
            <br>
            <br>If pop-ups are blocked, it's usually indicated in the browser's address bar.
            <br>You should be able to allow pop-ups for ShortyCut there as well.

        </div>
    </div>

`;

// src/web-app/application/favicon-cache.ts
var FaviconCacheEntry = class {
  constructor(fileName, lastAccessed) {
    this.fileName = fileName;
    this.lastAccessed = lastAccessed;
  }
};
var _FaviconCache = class _FaviconCache {
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor() {
    __publicField(this, "storage");
    __publicField(this, "today", 0);
    __publicField(this, "saveJobTimeout");
    //------------------------------------------------------------------------------------------------------------------
    // cache
    // +- github.com
    // |  +- http => {"", 1234}
    // |  +- https => {"favicon.ico", 1234}
    // |  +- file:///c/ShortyCut/data/favicons => {"github.com.ico", 1234}
    // +- google.com
    //    +- http => {"favicon.png", 1234}
    //    +- file:///c/ShortyCut/data/favicons => {"", 1234}
    //------------------------------------------------------------------------------------------------------------------
    __publicField(this, "cache", new Hashtable());
    this.deleteStorage = this.deleteStorage.bind(this);
    this.recalculateToday = this.recalculateToday.bind(this);
    this.saveCache = this.saveCache.bind(this);
    try {
      const storage = state.config.favicons.rememberUrls ? localStorage : sessionStorage;
      if (_FaviconCache.canWriteToStorage(storage)) {
        this.storage = storage;
      }
    } catch (e) {
    }
    this.recalculateToday();
    runAndIgnoreErrors(() => this.loadCache());
  }
  //------------------------------------------------------------------------------------------------------------------
  // Query and update favicon origins
  //------------------------------------------------------------------------------------------------------------------
  get(domain, origin) {
    var _a;
    const cacheEntry = (_a = this.cache.get(domain)) == null ? void 0 : _a.get(origin);
    if (cacheEntry && cacheEntry.lastAccessed !== this.today) {
      cacheEntry.lastAccessed = this.today;
      this.scheduleSaveCache();
    }
    return cacheEntry == null ? void 0 : cacheEntry.fileName;
  }
  set(domain, origin, fileName) {
    this.cache.computeIfAbsent(domain, () => new Hashtable()).put(origin, new FaviconCacheEntry(fileName, this.today));
    this.scheduleSaveCache();
  }
  //------------------------------------------------------------------------------------------------------------------
  // Timestamp calculations
  //------------------------------------------------------------------------------------------------------------------
  recalculateToday() {
    const epochMs = Date.now();
    const msPerDay = _FaviconCache.MS_PER_DAY;
    this.today = Math.ceil(epochMs / msPerDay);
    setTimeout(this.recalculateToday, this.today * msPerDay - epochMs + _FaviconCache.MS_PER_FIVE_MINUTES);
  }
  deleteExpiredEntries(cache) {
    cache.forEach((domain, origins) => {
      origins.forEach((origin, entry) => {
        if (_FaviconCache.CACHE_EXPIRY_DAYS < this.today - entry.lastAccessed) {
          origins.delete(origin);
        }
      });
      if (!origins.size) {
        cache.delete(domain);
      }
    });
  }
  //------------------------------------------------------------------------------------------------------------------
  // Schedule the storage to be updated
  //------------------------------------------------------------------------------------------------------------------
  scheduleSaveCache() {
    var _a;
    this.saveJobTimeout = (_a = this.saveJobTimeout) != null ? _a : setTimeout(this.saveCache, _FaviconCache.MS_PER_FIVE_SECONDS);
  }
  cancelScheduledSaveJob() {
    if ("number" === typeof this.saveJobTimeout) {
      clearTimeout(this.saveJobTimeout);
      delete this.saveJobTimeout;
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Read and update the browser storage as a serialized multiline string ("|" represents a tab)
  //
  // github.com|http||1234|https|favicon.ico|1234|file:///c/ShortyCut/data/favicons|github.com.ico|1234\n
  // google.com|http||1234|https|favicon.png|1234|file:///c/ShortyCut/data/favicons|google.com.png|1234
  //------------------------------------------------------------------------------------------------------------------
  saveCache() {
    this.cancelScheduledSaveJob();
    try {
      this.deleteExpiredEntries(this.cache);
      this.writeStorage(this.serializeCache());
    } catch (exception) {
      runAndIgnoreErrors(this.deleteStorage);
      throw exception;
    }
  }
  serializeCache() {
    return this.cache.map((domain, origins) => {
      const columns = [domain];
      origins.forEach((origin, entry) => {
        columns.push(origin, entry.fileName, `${entry.lastAccessed}`);
      });
      return columns.join(_FaviconCache.COLUMN_SEPARATOR);
    }).join(_FaviconCache.LINE_SEPARATOR);
  }
  loadCache() {
    this.cache = this.deserializeCache(this.readStorage());
  }
  deserializeCache(data) {
    const cache = new Hashtable();
    const table = data.split(_FaviconCache.LINE_SEPARATOR).map((line) => line.split(_FaviconCache.COLUMN_SEPARATOR));
    for (const row of table) {
      const [firstColumn] = row;
      if (!(void 0 !== firstColumn && 1 === row.length % _FaviconCache.COLUMNS_PER_ENTRY)) {
        return new Hashtable();
      }
      const origins = cache.computeIfAbsent(firstColumn, () => new Hashtable());
      for (let offset = 1; offset + _FaviconCache.COLUMNS_PER_ENTRY <= row.length; offset += _FaviconCache.COLUMNS_PER_ENTRY) {
        const column1 = row[offset];
        const column2 = row[offset + _FaviconCache.FILENAME_OFFSET];
        const column3 = row[offset + _FaviconCache.TIMESTAMP_OFFSET];
        if (void 0 !== column1 && void 0 !== column2 && void 0 !== column3) {
          origins.put(column1, new FaviconCacheEntry(column2, Number.parseInt(column3)));
        }
      }
    }
    return cache;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Reading and writing the storage
  //------------------------------------------------------------------------------------------------------------------
  deleteStorage() {
    if (this.storage) {
      for (let index = 0; ; index++) {
        const key = _FaviconCache.getStorageKey(index);
        if (!this.storage.getItem(key)) {
          break;
        }
        this.storage.removeItem(key);
      }
    }
  }
  writeStorage(data) {
    if (!this.storage) {
      return;
    }
    this.deleteStorage();
    let index = 0;
    let size = data.length;
    while (data) {
      try {
        while (data) {
          this.storage.setItem(_FaviconCache.getStorageKey(index), data.substring(0, size));
          data = data.substring(size);
          size = Math.min(size, data.length);
          index++;
        }
      } catch (exception) {
        if (size < _FaviconCache.MIN_STORAGE_ITEM_SIZE) {
          throw exception;
        }
      }
      size = Math.min(Math.ceil(size / _FaviconCache.TWO), data.length);
    }
  }
  readStorage() {
    let result = "";
    if (this.storage) {
      for (let index = 0, segment = this.storage.getItem(_FaviconCache.getStorageKey(index)); segment; segment = this.storage.getItem(_FaviconCache.getStorageKey(index - 1))) {
        result += segment;
        index++;
      }
    }
    return result;
  }
  static canWriteToStorage(storage) {
    const key = this.getStorageKey(-1);
    const value = "0.8802878642890799";
    let canWrite = false;
    runAndIgnoreErrors(() => {
      if (storage) {
        storage.setItem(key, value);
        canWrite = value === storage.getItem(key);
      }
    });
    runAndIgnoreErrors(() => storage ? storage.removeItem(key) : void 0);
    return canWrite;
  }
  static getStorageKey(index) {
    return "shortycut.favicon-cache" + (index ? `.${index}` : "");
  }
};
__publicField(_FaviconCache, "LINE_SEPARATOR", "\n");
__publicField(_FaviconCache, "COLUMN_SEPARATOR", "	");
__publicField(_FaviconCache, "MIN_STORAGE_ITEM_SIZE", 100);
__publicField(_FaviconCache, "CACHE_EXPIRY_DAYS", 14);
__publicField(_FaviconCache, "MS_PER_SECOND", 1e3);
__publicField(_FaviconCache, "SECONDS_PER_MINUTE", 60);
__publicField(_FaviconCache, "MINUTES_PER_HOUR", 60);
__publicField(_FaviconCache, "HOURS_PER_DAY", 24);
__publicField(_FaviconCache, "MS_PER_MINUTE", _FaviconCache.SECONDS_PER_MINUTE * _FaviconCache.MS_PER_SECOND);
__publicField(_FaviconCache, "MS_PER_HOUR", _FaviconCache.MINUTES_PER_HOUR * _FaviconCache.MS_PER_MINUTE);
__publicField(_FaviconCache, "MS_PER_DAY", _FaviconCache.HOURS_PER_DAY * _FaviconCache.MS_PER_HOUR);
__publicField(_FaviconCache, "FIVE", 5);
__publicField(_FaviconCache, "MS_PER_FIVE_SECONDS", _FaviconCache.FIVE * _FaviconCache.MS_PER_SECOND);
__publicField(_FaviconCache, "MS_PER_FIVE_MINUTES", _FaviconCache.FIVE * _FaviconCache.MS_PER_MINUTE);
__publicField(_FaviconCache, "TWO", 2);
__publicField(_FaviconCache, "FILENAME_OFFSET", 1);
__publicField(_FaviconCache, "TIMESTAMP_OFFSET", 2);
__publicField(_FaviconCache, "COLUMNS_PER_ENTRY", 3);
var FaviconCache = _FaviconCache;

// src/web-app/application/favicon-load-job.ts
var FaviconLoadJob = class {
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(url) {
    this.url = url;
    __publicField(this, "status", "new");
    __publicField(this, "observers", new Array());
  }
  //------------------------------------------------------------------------------------------------------------------
  // Add an observer
  //------------------------------------------------------------------------------------------------------------------
  addObserver(file) {
    if ("loaded" === this.status) {
      file.onResolved();
    } else if ("failed" === this.status) {
      file.onRejected();
    } else {
      this.observers.push(file);
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Getters
  //------------------------------------------------------------------------------------------------------------------
  get isNew() {
    return "new" === this.status;
  }
  get isLoading() {
    return "loading" === this.status;
  }
  get isFinished() {
    return this.isLoaded || this.hasFailed;
  }
  get isLoaded() {
    return "loaded" === this.status;
  }
  get hasFailed() {
    return "failed" === this.status;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Start loading the image (if it hasn't started yet)
  //------------------------------------------------------------------------------------------------------------------
  startLoad() {
    if ("new" !== this.status) {
      return false;
    }
    this.status = "loading";
    create("img", (element) => {
      element.addEventListener("load", () => this.onLoadEnd(true));
      element.addEventListener("error", () => this.onLoadEnd(false));
      element.src = this.url;
    });
    return true;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Update the status and notify all observers
  //------------------------------------------------------------------------------------------------------------------
  onLoadEnd(success) {
    var _a;
    this.status = success ? "loaded" : "failed";
    this.observers.forEach((observer) => success ? observer.onResolved() : observer.onRejected());
    (_a = this.observers[0]) == null ? void 0 : _a.origin.domain.registry.startNextLoad();
  }
};

// src/web-app/application/favicon.ts
var _FaviconOriginType = class _FaviconOriginType {
  constructor(isFetchService, isWebsite, isOffline) {
    this.isFetchService = isFetchService;
    this.isWebsite = isWebsite;
    this.isOffline = isOffline;
  }
};
__publicField(_FaviconOriginType, "values", new Array());
__publicField(_FaviconOriginType, "CACHE_OFFLINE", new _FaviconOriginType(false, false, true));
__publicField(_FaviconOriginType, "CACHE_ONLINE", new _FaviconOriginType(false, false, false));
__publicField(_FaviconOriginType, "WEBSITE", new _FaviconOriginType(false, true, false));
__publicField(_FaviconOriginType, "FETCH_SERVICE", new _FaviconOriginType(true, false, false));
var FaviconOriginType = _FaviconOriginType;
var _FaviconLoadScope = class _FaviconLoadScope {
  constructor(...originTypes) {
    __publicField(this, "originTypes");
    this.originTypes = originTypes;
  }
};
__publicField(_FaviconLoadScope, "OFFLINE", new _FaviconLoadScope(FaviconOriginType.CACHE_OFFLINE));
__publicField(_FaviconLoadScope, "ONLINE", new _FaviconLoadScope(FaviconOriginType.CACHE_OFFLINE, FaviconOriginType.WEBSITE));
__publicField(_FaviconLoadScope, "FETCH_SERVICE", new _FaviconLoadScope(FaviconOriginType.FETCH_SERVICE));
__publicField(_FaviconLoadScope, "PRIORITY", new _FaviconLoadScope(
  FaviconOriginType.CACHE_OFFLINE,
  FaviconOriginType.FETCH_SERVICE,
  FaviconOriginType.WEBSITE
));
var FaviconLoadScope = _FaviconLoadScope;
var FaviconFile = class {
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(origin, name, url) {
    this.origin = origin;
    this.name = name;
    this.url = url;
    __publicField(this, "job");
    this.job = origin.domain.registry.jobs.computeIfAbsent(url, () => new FaviconLoadJob(url));
    this.job.addObserver(this);
  }
  //------------------------------------------------------------------------------------------------------------------
  // Event handlers
  //------------------------------------------------------------------------------------------------------------------
  onResolved() {
    this.origin.onResolved(this);
  }
  onRejected() {
    this.origin.onRejected(this);
  }
};
var _FaviconOrigin = class _FaviconOrigin {
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(domain, name, type, url) {
    this.domain = domain;
    this.name = name;
    this.type = type;
    this.url = url;
    __publicField(this, "files", new Array());
    __publicField(this, "resolvedFile");
    if (type.isFetchService) {
      const urlWithoutPort = this.url.replaceAll("%s", this.domain.name.replace(/:\d+$/, ""));
      this.files = [new FaviconFile(this, urlWithoutPort, urlWithoutPort)];
    } else {
      const basename = type.isWebsite ? "favicon" : this.domain.name.replaceAll(":", "!");
      this.files = _FaviconOrigin.EXTENSIONS.map((extension) => `${basename}.${extension}`).map(
        (filename) => new FaviconFile(this, filename, this.url.replaceAll("%s", filename))
      );
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Getters
  //------------------------------------------------------------------------------------------------------------------
  get isLoading() {
    return !!this.files.filter((location) => location.job.isLoading).length;
  }
  get isResolved() {
    return !!this.resolvedFile;
  }
  get isRejected() {
    return !this.isResolved && !this.files.length;
  }
  get resolvedUrl() {
    var _a;
    return (_a = this.resolvedFile) == null ? void 0 : _a.url;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Start loading the next file
  //------------------------------------------------------------------------------------------------------------------
  startNextLoad(includeNonCached, includeAllExtensions) {
    var _a, _b;
    if (this.isResolved || this.isRejected) {
      return false;
    }
    if (this.domain.registry.readCache) {
      const filename = this.domain.registry.cache.get(this.domain.name, this.name);
      if (filename && ((_a = this.files.find((file) => file.name === filename)) == null ? void 0 : _a.job.startLoad())) {
        return true;
      }
    }
    if (includeNonCached) {
      for (const file of this.files.filter((currentFile) => /ico$/i.test(currentFile.name))) {
        if (file.job.startLoad()) {
          return true;
        }
      }
    }
    return includeAllExtensions && ((_b = this.files.find((file) => file.job.isNew)) == null ? void 0 : _b.job.startLoad());
  }
  //------------------------------------------------------------------------------------------------------------------
  // Event handlers
  //------------------------------------------------------------------------------------------------------------------
  onResolved(file) {
    if (!this.resolvedFile) {
      this.resolvedFile = file;
      if (!this.type.isFetchService) {
        this.domain.registry.cache.set(this.domain.name, this.name, this.resolvedFile.name);
      }
      this.domain.onOriginResolved(this);
    }
  }
  onRejected(file) {
    this.files = this.files.filter((currentFile) => currentFile.name !== file.name);
    if (!this.files.length) {
      this.domain.registry.cache.set(this.domain.name, this.name, "");
      this.domain.onOriginRejected(this);
    }
  }
};
__publicField(_FaviconOrigin, "EXTENSIONS", ["ico", "png", "jpg", "gif", "svg", "jpeg"]);
var FaviconOrigin = _FaviconOrigin;
var FaviconDomain = class {
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(registry, name, protocols, isPrimary) {
    this.registry = registry;
    this.name = name;
    this.protocols = protocols;
    this.isPrimary = isPrimary;
    __publicField(this, "origins", new Hashtable());
    __publicField(this, "subDomains", new Hashtable());
    __publicField(this, "parentDomain");
    __publicField(this, "displayName");
    __publicField(this, "resolvedOrigin");
    __publicField(this, "observers", new Array());
    this.createOrigins();
    this.createParentDomain();
    this.displayName = this.name.replace(/^www\./i, "");
  }
  createOrigins() {
    for (const protocol of this.protocols) {
      const url = `${protocol}://${this.name}/%s`;
      this.origins.put(protocol, new FaviconOrigin(this, protocol, FaviconOriginType.WEBSITE, url));
    }
    state.config.favicons.localFolders.forEach((origin) => {
      if (!/^[a-z]+:\/\//i.test(origin)) {
        origin = `${globalThis.location.href.replace(/\/[^/]+$/, "")}/${origin}`;
      }
      origin = origin.replace(/\/$/, "");
      const type = origin.startsWith("file://") ? FaviconOriginType.CACHE_OFFLINE : FaviconOriginType.CACHE_ONLINE;
      this.origins.put(origin, new FaviconOrigin(this, origin, type, `${origin}/%s`));
    });
    if (state.config.favicons.fetchService) {
      const url = state.config.favicons.fetchService;
      this.origins.put(url, new FaviconOrigin(this, url, FaviconOriginType.FETCH_SERVICE, url));
    }
    if (this.registry.readCache) {
      this.origins.keys.filter((origin) => "" === this.registry.cache.get(this.name, origin)).forEach((origin) => this.origins.delete(origin));
    }
  }
  createParentDomain() {
    const parentDomain = this.name.replace(/^[^.]+\./, "");
    if (parentDomain !== this.name) {
      this.parentDomain = this.registry.addDomain(parentDomain, this.protocols, false);
      this.parentDomain.subDomains.put(this.name, this);
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Start the next load
  //------------------------------------------------------------------------------------------------------------------
  startNextLoad(scope) {
    var _a;
    if (this.isLoading) {
      return false;
    }
    const types = scope.originTypes.filter((type) => this.isPrimary || !type.isWebsite);
    for (const type of types) {
      for (const origin of this.origins.values.filter((currentOrigin) => currentOrigin.type === type)) {
        if (this.startNextLoadPrioritized(origin)) {
          return true;
        }
      }
    }
    return !!((_a = this.parentDomain) == null ? void 0 : _a.startNextLoad(scope));
  }
  startNextLoadPrioritized(origin) {
    for (const parameters of [
      [false, false],
      [true, false],
      [true, true]
    ]) {
      if (origin.startNextLoad(parameters[0], parameters[1])) {
        return true;
      }
    }
    return false;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Event handlers
  //------------------------------------------------------------------------------------------------------------------
  onOriginResolved(origin) {
    var _a;
    if (!this.resolvedOrigin) {
      this.resolvedOrigin = origin;
      this.notifyObservers((_a = origin.resolvedFile) == null ? void 0 : _a.url);
      this.subDomains.values.forEach((domain) => domain.onParentDomainResolved(this));
    }
    this.registry.updateFaviconToolsPage();
  }
  onOriginRejected(origin) {
    this.origins.delete(origin.name);
    this.registry.updateFaviconToolsPage();
  }
  onParentDomainResolved(domain) {
    var _a, _b;
    this.notifyObservers((_b = (_a = domain.resolvedOrigin) == null ? void 0 : _a.resolvedFile) == null ? void 0 : _b.url);
    this.registry.updateFaviconToolsPage();
  }
  notifyObservers(url) {
    if (url) {
      this.observers.forEach((img) => img.src = url);
      this.observers = [];
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Getters
  //------------------------------------------------------------------------------------------------------------------
  get isLoading() {
    var _a;
    return !!this.origins.values.filter((origin) => origin.isLoading).length || !!((_a = this.parentDomain) == null ? void 0 : _a.isLoading);
  }
  get isResolved() {
    var _a;
    return !!(this.resolvedOrigin || ((_a = this.parentDomain) == null ? void 0 : _a.isResolved));
  }
  get isRejected() {
    return !this.origins.size && !this.resolvedOrigin && (!this.parentDomain || this.parentDomain.isResolved);
  }
  //------------------------------------------------------------------------------------------------------------------
  // Create a favicon DIV element
  //------------------------------------------------------------------------------------------------------------------
  getFavicon() {
    var _a, _b;
    const img = create("img");
    let domain = this;
    while (!domain.resolvedOrigin && domain.parentDomain) {
      domain = domain.parentDomain;
    }
    const url = (_b = (_a = domain.resolvedOrigin) == null ? void 0 : _a.resolvedFile) == null ? void 0 : _b.url;
    if (url) {
      img.src = url;
    } else {
      this.observers.push(img);
    }
    return create("div.favicon", img, (element) => {
      element.dataset["domain"] = this.name;
    });
  }
};

// src/web-app/application/favicon-registry.ts
var FaviconRegistry = class {
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor(cache, readCache, preload, protocolsPerDomain) {
    this.cache = cache;
    this.readCache = readCache;
    this.preload = preload;
    __publicField(this, "jobs", new Hashtable());
    __publicField(this, "domains", new Hashtable());
    __publicField(this, "currentlyDisplayedDomains");
    protocolsPerDomain.entries.forEach((entry) => this.addDomain(entry.key, entry.value, true));
    this.startNextLoad();
  }
  //------------------------------------------------------------------------------------------------------------------
  // Add a domain to the registry
  //------------------------------------------------------------------------------------------------------------------
  addDomain(domain, protocols, isPrimary) {
    const faviconDomain = this.domains.computeIfAbsent(
      domain,
      () => new FaviconDomain(this, domain, protocols, isPrimary)
    );
    faviconDomain.isPrimary = faviconDomain.isPrimary || isPrimary;
    return faviconDomain;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Set the currently displayed domains (to be loaded first)
  //------------------------------------------------------------------------------------------------------------------
  setCurrentlyDisplayedDomains(domains) {
    this.currentlyDisplayedDomains = domains.map((domain) => this.domains.get(domain)).filter((domain) => !!domain);
    this.startNextLoad();
  }
  removeCurrentlyDisplayedDomains() {
    delete this.currentlyDisplayedDomains;
    this.startNextLoad();
  }
  //------------------------------------------------------------------------------------------------------------------
  // Start the next loads
  //------------------------------------------------------------------------------------------------------------------
  startNextLoad() {
    var _a, _b;
    (_a = this.currentlyDisplayedDomains) == null ? void 0 : _a.filter((domain) => !domain.isResolved).forEach((domain) => domain.startNextLoad(FaviconLoadScope.PRIORITY));
    if (((_b = this.currentlyDisplayedDomains) == null ? void 0 : _b.filter((domain) => domain.isLoading).length) || !this.preload) {
      return;
    }
    let remainingJobs = Math.max(0, MAX_PARALLEL_FAVICON_JOBS - this.currentJobCount);
    for (const scope of [FaviconLoadScope.OFFLINE, FaviconLoadScope.ONLINE, FaviconLoadScope.FETCH_SERVICE]) {
      const domains = this.domains.values.filter((domain) => domain.isPrimary && !domain.isResolved);
      for (const domain of domains) {
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
  }
  get currentJobCount() {
    return this.jobs.values.filter((job) => job.isLoading).length;
  }
  //------------------------------------------------------------------------------------------------------------------
  // Retrieve the favicon for this domain
  //------------------------------------------------------------------------------------------------------------------
  getFavicon(domain) {
    var _a;
    return (_a = this.domains.get(domain)) == null ? void 0 : _a.getFavicon();
  }
  //------------------------------------------------------------------------------------------------------------------
  // Update the favicons tools page
  //------------------------------------------------------------------------------------------------------------------
  updateFaviconToolsPage() {
    pages.faviconTools.refreshPageContent();
  }
};

// src/web-app/application/favicon-manager.ts
var MAX_PARALLEL_FAVICON_JOBS = 10;
var FaviconManager = class _FaviconManager {
  //------------------------------------------------------------------------------------------------------------------
  // Initialization
  //------------------------------------------------------------------------------------------------------------------
  constructor() {
    __publicField(this, "domains", new Hashtable());
    __publicField(this, "cache", new FaviconCache());
    __publicField(this, "registry");
    shortcuts.values.forEach((shortcut) => {
      shortcut.all.map((item) => item.link).flatMap((link) => link.faviconUrls).forEach((url) => {
        const { protocol, domain } = _FaviconManager.extractProtocolAndDomain(url);
        if ("file" !== protocol) {
          const protocols = this.domains.computeIfAbsent(domain, () => new Array());
          if (!protocols.filter((currentProtocol) => currentProtocol === protocol).length) {
            if ("https" === protocol) {
              protocols.unshift(protocol);
            } else {
              protocols.push(protocol);
            }
          }
        }
      });
    });
    this.registry = new FaviconRegistry(this.cache, true, false, this.domains);
  }
  static extractProtocolAndDomain(url) {
    return {
      protocol: assertNotNull(new RegExp(/^([a-z]+:\/\/)?/i).exec(url))[0].replace(/:.*/, "").toLocaleLowerCase() || "http",
      domain: url.toLocaleLowerCase().replace(/^([a-z]+:\/\/+)?/i, "").replace(/\/.*/, "").toLowerCase()
    };
  }
  //------------------------------------------------------------------------------------------------------------------
  // Set the mode of operation
  //------------------------------------------------------------------------------------------------------------------
  startPreload() {
    this.registry.preload = true;
    this.registry.readCache = true;
    this.registry.startNextLoad();
  }
  startFullRescan() {
    this.registry.preload = false;
    this.registry = new FaviconRegistry(this.cache, false, true, this.domains);
    this.registry.updateFaviconToolsPage();
  }
  setCurrentlyDisplayedLinks(urls) {
    const domains = urls.map((url) => _FaviconManager.extractProtocolAndDomain(url).domain);
    this.registry.setCurrentlyDisplayedDomains(domains);
  }
  removeCurrentlyDisplayedLinks() {
    this.registry.removeCurrentlyDisplayedDomains();
  }
  //------------------------------------------------------------------------------------------------------------------
  // Obtain a single favicon
  //------------------------------------------------------------------------------------------------------------------
  getFavicon(url) {
    var _a;
    const createDiv = (url2) => create("div.favicon", createImage(url2));
    if (url == null ? void 0 : url.trim()) {
      const { protocol, domain } = _FaviconManager.extractProtocolAndDomain(url);
      return "file" === protocol ? createDiv("resources/local.svg") : (_a = this.registry.getFavicon(domain)) != null ? _a : createDiv("resources/unknown.svg");
    } else {
      return createDiv("resources/unknown.svg");
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Get listings for the favicon tools page
  //------------------------------------------------------------------------------------------------------------------
  getPendingDomains() {
    return this.registry.domains.values.filter((domain) => domain.isPrimary && !domain.isResolved && !domain.isRejected).map((domain) => domain.displayName).sort((domain1, domain2) => domain1.localeCompare(domain2));
  }
  getMissingDomains() {
    const domains = this.registry.domains.values.filter((domain) => domain.isPrimary && domain.isRejected).map((domain) => domain.displayName);
    this.registry.domains.values.filter((domain) => domain.isPrimary && domain.isResolved).forEach((domain) => {
      var _a, _b, _c;
      while (!domain.resolvedOrigin && domain.parentDomain) {
        domain = domain.parentDomain;
      }
      if (!((_b = (_a = domain.resolvedOrigin) == null ? void 0 : _a.resolvedFile) == null ? void 0 : _b.job.url) || ((_c = domain.resolvedOrigin) == null ? void 0 : _c.type.isFetchService)) {
        domains.push(domain.displayName);
      }
    });
    return domains.sort((domain1, domain2) => domain1.localeCompare(domain2));
  }
  getOnlineDomains() {
    const files = new Hashtable();
    const domains = this.registry.domains.values.filter((domain) => domain.isPrimary && domain.isResolved);
    domains.forEach((domain) => {
      var _a, _b, _c, _d;
      while (!domain.resolvedOrigin && domain.parentDomain) {
        domain = domain.parentDomain;
      }
      if (((_b = (_a = domain.resolvedOrigin) == null ? void 0 : _a.resolvedFile) == null ? void 0 : _b.job.url) && domain.resolvedOrigin.type.isWebsite) {
        const name = domain.displayName.replaceAll(":", "!");
        const extension = (_d = (_c = domain.resolvedOrigin) == null ? void 0 : _c.resolvedFile.name.replace(/^.*\./, "")) != null ? _d : "ico";
        files.put(`${name}.${extension}`, domain.resolvedOrigin.resolvedFile.job.url);
      }
    });
    return files.entries.map((entry) => ({ filename: entry.key, url: entry.value })).sort((a, b) => a.filename.localeCompare(b.filename));
  }
  getOfflineDomains() {
    const files = new Hashtable();
    const prefix = globalThis.location.href.replace(/\/[^/]+$/, "") + "/";
    this.registry.domains.values.filter((domain) => domain.isPrimary && domain.isResolved).forEach((domain) => {
      var _a, _b, _c, _d;
      while (!domain.resolvedOrigin && domain.parentDomain) {
        domain = domain.parentDomain;
      }
      if (((_b = (_a = domain.resolvedOrigin) == null ? void 0 : _a.resolvedFile) == null ? void 0 : _b.job.url) && domain.resolvedOrigin.type.isOffline) {
        const url = (_d = (_c = domain.resolvedOrigin) == null ? void 0 : _c.resolvedFile) == null ? void 0 : _d.job.url;
        files.put(url.substring(0 === url.indexOf(prefix) ? prefix.length : 0), url);
      }
    });
    return files.entries.map((entry) => {
      return { path: entry.key, url: entry.value };
    }).sort((item1, item2) => item1.path.localeCompare(item2.path));
  }
};

// src/web-app/generated/version.ts
var VERSION = "1.5.0";

// src/web-app/pages/menu.ts
var Menu = class {
  //------------------------------------------------------------------------------------------------------------------
  // Initialize the page
  //------------------------------------------------------------------------------------------------------------------
  constructor() {
    __publicField(this, "dom", {
      menu: document.querySelector("#menu"),
      burgerIcon: document.querySelector("#menu .burger-icon"),
      closeIcon: document.querySelector("#menu .close-icon"),
      items: document.querySelector("#menu .items")
    });
    __publicField(this, "onClose");
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
  //------------------------------------------------------------------------------------------------------------------
  // Populate the menu items
  //------------------------------------------------------------------------------------------------------------------
  populateItems() {
    this.dom.items.innerHTML = "";
    const menuItems = [
      [`ShortyCut ${VERSION}`, this.onShortyCut],
      ["User manual", this.onDocumentation],
      ["Link tools", this.onLinkTools],
      ["Browser integration", this.onBrowserIntegration],
      ["Favicons", this.onFavicons]
    ];
    menuItems.forEach(
      (array) => this.dom.items.appendChild(create("a", array[0], (element) => element.addEventListener("click", array[1])))
    );
  }
  //------------------------------------------------------------------------------------------------------------------
  // Add and remove event listeners
  //------------------------------------------------------------------------------------------------------------------
  addEventListeners() {
    this.dom.closeIcon.addEventListener("click", this.onClickCloseIcon);
    this.dom.burgerIcon.addEventListener("click", this.onClickBurgerIcon);
    document.body.addEventListener("click", this.onClickBody);
    document.body.addEventListener("keydown", this.onKeyDown);
  }
  removeEventListeners() {
    this.dom.closeIcon.removeEventListener("click", this.onClickCloseIcon);
    this.dom.burgerIcon.removeEventListener("click", this.onClickBurgerIcon);
    document.body.removeEventListener("click", this.onClickBody);
    document.body.removeEventListener("keydown", this.onKeyDown);
  }
  //------------------------------------------------------------------------------------------------------------------
  // Show and hide icons and menu items
  //------------------------------------------------------------------------------------------------------------------
  showBurgerIcon() {
    if (this.dom.menu.style.display === "none") {
      this.addEventListeners();
    }
    this.dom.burgerIcon.style.display = "block";
    this.dom.closeIcon.style.display = "none";
    this.dom.items.style.display = "none";
    this.dom.menu.style.display = "block";
  }
  showCloseIcon(onClose) {
    this.onClose = onClose;
    if (this.dom.menu.style.display === "none") {
      this.addEventListeners();
    }
    this.dom.burgerIcon.style.display = "none";
    this.dom.closeIcon.style.display = "block";
    this.dom.items.style.display = "none";
    this.dom.menu.style.display = "block";
  }
  hide() {
    this.removeEventListeners();
    this.dom.menu.style.display = "none";
  }
  closeMenu() {
    this.dom.items.style.display = "none";
  }
  //------------------------------------------------------------------------------------------------------------------
  // Event handlers
  //------------------------------------------------------------------------------------------------------------------
  onClickBurgerIcon(event) {
    this.dom.items.style.display = "none" === this.dom.items.style.display ? "block" : "none";
    return this.cancelEvent(event);
  }
  onClickCloseIcon(event) {
    if (this.onClose) {
      this.onClose();
    }
    return this.cancelEvent(event);
  }
  onClickBody() {
    this.closeMenu();
    return true;
  }
  onShortyCut(event) {
    this.closeMenu();
    const url = "https://github.com/david-04/shortycut";
    if (queryParameters.facets.newTabs) {
      globalThis.open(url);
    } else {
      globalThis.location.href = url;
    }
    return this.cancelEvent(event);
  }
  onDocumentation(event) {
    this.closeMenu();
    const url = `${isDemo() ? ".." : "resources/docs"}/index.html`;
    if (queryParameters.facets.newTabs) {
      globalThis.open(url);
    } else {
      globalThis.location.href = url;
    }
    return this.cancelEvent(event);
  }
  onLinkTools(event) {
    this.closeMenu();
    state.router.goto(pages.linkTools.populate());
    return this.cancelEvent(event);
  }
  onBrowserIntegration(event) {
    this.closeMenu();
    state.router.goto(pages.browserIntegration);
    return this.cancelEvent(event);
  }
  onFavicons(event) {
    this.closeMenu();
    state.router.goto(pages.faviconTools);
    return this.cancelEvent(event);
  }
  cancelEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
  onKeyDown(event) {
    if ("Escape" === event.key || "Esc" === event.key) {
      if (this.dom.items.style.display !== "none") {
        this.closeMenu();
        event.preventDefault();
        return false;
      }
    }
    return true;
  }
};

// src/web-app/application/router.ts
var Router = class {
  //------------------------------------------------------------------------------------------------------------------
  // Initialize the router
  //------------------------------------------------------------------------------------------------------------------
  constructor() {
    __publicField(this, "menu", new Menu());
    __publicField(this, "history", new Array());
    this.goBackOrHome = this.goBackOrHome.bind(this);
    this.goHome = this.goHome.bind(this);
    this.onHashChange = this.onHashChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    globalThis.addEventListener("hashchange", this.onHashChange);
    globalThis.addEventListener("keydown", this.onKeyDown);
  }
  //------------------------------------------------------------------------------------------------------------------
  // Navigating between pages
  //------------------------------------------------------------------------------------------------------------------
  goto(page) {
    this.history.length = this.getCurrentHistoryIndex() + 1;
    this.history.push(page);
    if (1 === this.history.length) {
      this.showIndex(0);
    } else {
      globalThis.location.hash = `${this.history.length - 1}`;
      this.onHashChange();
    }
  }
  goHome() {
    this.goto(pages.home);
  }
  goBackOrHome() {
    if (1 < this.history.length && 0 < this.getCurrentHistoryIndex()) {
      globalThis.history.go(-1);
    } else if (this.history[this.getCurrentHistoryIndex()] !== pages.home) {
      this.goto(pages.home);
    }
  }
  goBackToAndResetHomepage() {
    pages.home.populate();
    this.goBackOrHome();
    if (queryParameters.facets.noFocus) {
      setTimeout(() => pages.home.removeFocus(), 1);
    }
  }
  //------------------------------------------------------------------------------------------------------------------
  // Event handlers
  //------------------------------------------------------------------------------------------------------------------
  onHashChange() {
    this.showIndex(this.getCurrentHistoryIndex());
  }
  getCurrentHistoryIndex() {
    const index = Number.parseInt(globalThis.location.hash.replace("#", ""));
    return Math.min(Math.max(Number.isNaN(index) ? 0 : index, 0), this.history.length - 1);
  }
  showIndex(index) {
    const page = this.history[index];
    if (page) {
      pages.hideAllExcept(page);
      page.show();
      if (page.hasMenu()) {
        if (page === pages.home) {
          this.menu.showBurgerIcon();
        } else {
          this.menu.showCloseIcon(this.goBackOrHome);
        }
      } else {
        this.menu.hide();
      }
    }
  }
  onKeyDown(event) {
    if (event.key.startsWith("Esc") && this.history.at(-1) !== pages.home) {
      this.goBackOrHome();
      event.preventDefault();
      return false;
    }
    return true;
  }
};

// src/web-app/application/threads.ts
var SHORTCUTS_PER_BATCH = 2e3;
function parseShortcuts(callback) {
  handleExceptions(callback, () => {
    const lines = new Array();
    startupCache.shortcuts.forEach((shortcut) => lines.push(...shortcut.split(/\r?\n/)));
    const parser = new ShortcutParser();
    parseBatch(parser, lines, 0, SHORTCUTS_PER_BATCH, shortcuts, callback);
  });
}
function parseBatch(parser, lines, index, batchSize, shortcuts2, callback) {
  handleExceptions(callback, () => {
    if (index < lines.length) {
      parser.parseLines(lines, index, Math.min(index + batchSize, lines.length), shortcuts2);
      setTimeout(() => parseBatch(parser, lines, index + batchSize, batchSize, shortcuts2, callback), 0);
    } else {
      callback(shortcuts2);
    }
  });
}

// src/web-app/application/main.ts
function initialize() {
  globalThis.addEventListener("error", (exception) => startupCache.exceptions.push(exception));
  if ((document == null ? void 0 : document.title) !== void 0) {
    document.title = "...";
  }
  globalThis.addEventListener("DOMContentLoaded", () => {
    document.title = "...";
    ["icon", "shortcut icon"].forEach((rel) => addLink(rel, "image/x-icon", "resources/favicon.ico", ""));
    addLink("search", "application/opensearchdescription+xml", "data/search.xml", "ShortyCut");
  });
  window.addEventListener(
    "load",
    () => handleExceptions(displayError, () => javaScriptLoader.onComplete(startApplication))
  );
}
function addLink(rel, type, href, title) {
  const link = document.createElement("link");
  link.rel = rel;
  link.type = type;
  link.href = href;
  link.title = title;
  document.head.appendChild(link);
}
function startApplication() {
  if (queryParameters.theme === "dark" || queryParameters.theme === void 0 && globalThis.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark-theme");
  }
  document.body.innerHTML = isDemo() ? HTML_BODY.replaceAll("resources/docs", "..") : HTML_BODY;
  const self = globalThis.location.href.replace(/[?#].*/, "");
  document.body.innerHTML = document.body.innerHTML.replaceAll("self://", self);
  state.router = new Router();
  applyAndValidateConfig();
  if (!startupCache.config.length && !queryParameters.setup) {
    globalThis.location.href = `${globalThis.location.href.replace(/[#?].*/, "")}?${queryParameters.SETUP_KEY}=welcome`;
    return;
  }
  parseShortcuts((result) => handleExceptions(displayError, () => onParseShortcutsComplete(result)));
}
function onParseShortcutsComplete(result) {
  if (result instanceof Exception) {
    throw result;
  }
  if (queryParameters.facets.newTabs) {
    addBlankTargetToAllLinksOnPage();
  }
  state.faviconManager = new FaviconManager();
  redirector.processQuery();
}
function addBlankTargetToAllLinksOnPage() {
  const links = document.getElementsByTagName("a");
  for (let index = 0; index < links.length; index++) {
    const link = links.item(index);
    if (link) {
      link.target = "_blank";
    }
  }
}

// src/web-app/shortycut.ts
initialize();
Object.assign(globalThis, { shortycut: api_exports });

})();
