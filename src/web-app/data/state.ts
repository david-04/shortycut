import { FaviconManager } from "../application/favicon-manager";
import { Redirector } from "../application/redirector";
import { Router } from "../application/router";
import { JavaScriptLoader } from "../application/script-loader";
import { HotkeySelector } from "../utilities/hotkey-selector";
import { Config } from "./config";
import { QueryParameters } from "./query-parameters";
import { Shortcut } from "./shortcut";
import { Shortcuts } from "./variables";

export const state = {
    config: nullAs<Config>(),
    shortcuts: nullAs<Shortcuts>(),
    defaultSearchEngine: nullAs<Shortcut | null>(),
    queryParameters: nullAs<QueryParameters>(),
    redirector: nullAs<Redirector>(),
    router: nullAs<Router>(),
    faviconManager: nullAs<FaviconManager>(),
    javaScriptLoader: nullAs<JavaScriptLoader>(),
    hotkeySelector: nullAs<HotkeySelector>(),
};

function nullAs<T>() {
    return null as unknown as T;
}
