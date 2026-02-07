import { FaviconManager } from "../application/favicon-manager";
import { Redirector } from "../application/redirector";
import { Router } from "../application/router";
import { JavaScriptLoader } from "../application/script-loader";
import { HotkeySelector } from "../utilities/hotkey-selector";
import { DEFAULT_CONFIG } from "./config";
import { Shortcut } from "./shortcut";

export const state = {
    config: DEFAULT_CONFIG,
    defaultSearchEngine: nullAs<Shortcut | null>(),
    redirector: nullAs<Redirector>(),
    router: nullAs<Router>(),
    faviconManager: nullAs<FaviconManager>(),
    javaScriptLoader: nullAs<JavaScriptLoader>(),
    hotkeySelector: nullAs<HotkeySelector>(),
};

function nullAs<T>() {
    return null as unknown as T;
}
