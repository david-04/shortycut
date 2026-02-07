import { FaviconManager } from "../application/favicon-manager";
import { Router } from "../application/router";
import { JavaScriptLoader } from "../application/script-loader";
import { DEFAULT_CONFIG } from "./config";
import { Shortcut } from "./shortcut";

export const state = {
    config: DEFAULT_CONFIG,
    defaultSearchEngine: nullAs<Shortcut | null>(),
    router: nullAs<Router>(),
    faviconManager: nullAs<FaviconManager>(),
    javaScriptLoader: nullAs<JavaScriptLoader>(),
};

function nullAs<T>() {
    return null as unknown as T;
}
