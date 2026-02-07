import { InitializationError } from "../utilities/error";
import { create } from "../utilities/html";
import { adjustCase } from "../utilities/string";
import { FinalizedUrlBase } from "./shortcut";
import { startupCache } from "./startup-cache";

//----------------------------------------------------------------------------------------------------------------------
// Data types
//----------------------------------------------------------------------------------------------------------------------

export type Theme = "light" | "dark" | undefined;

//----------------------------------------------------------------------------------------------------------------------
// Parse URL query parameters
//----------------------------------------------------------------------------------------------------------------------

export namespace queryParameters {
    //
    //------------------------------------------------------------------------------------------------------------------
    // Query parameter key names
    //------------------------------------------------------------------------------------------------------------------

    export const QUERY_KEY = "q";
    export const REDIRECT_KEY = "r";
    export const SETUP_KEY = "setup";
    export const FACETS_KEY = "facets";
    export const THEME_KEY = "theme";

    //------------------------------------------------------------------------------------------------------------------
    // Query parameters
    //------------------------------------------------------------------------------------------------------------------

    export const urlSearchParams = new URLSearchParams(globalThis.location.search);

    export const facets = getFacets(urlSearchParams);
    export const query = getQuery(urlSearchParams);
    export const redirect = getRedirect(urlSearchParams);
    export const setup = urlSearchParams.get(SETUP_KEY);
    export const theme = (["light", "dark"] as const).find(theme => theme === urlSearchParams.get(THEME_KEY));

    //------------------------------------------------------------------------------------------------------------------
    // Extract facets from the URL query parameters (e.g. "new-tabs" and "no-focus")
    //------------------------------------------------------------------------------------------------------------------

    function getFacets(urlSearchParams: URLSearchParams) {
        const facets = (urlSearchParams.get(FACETS_KEY) ?? "")
            .split(",")
            .map(facet => facet.trim().toLowerCase())
            .filter(Boolean);

        return facets.reduce(
            (accumulated, current) => {
                const key = ({ "new-tabs": "newTabs", "no-focus": "noFocus" } as const)[current];
                if (key) {
                    return { ...accumulated, [key]: true };
                }
                startupCache.initializationErrors.push(
                    new InitializationError(
                        create("div", "Facet ", create("tt", current), " (in this page's address) is not supported")
                    )
                );
                return accumulated;
            },
            { newTabs: false, noFocus: false }
        );
    }

    //------------------------------------------------------------------------------------------------------------------
    // Get the requested shortcut and search term
    //------------------------------------------------------------------------------------------------------------------

    function getQuery(urlSearchParams: URLSearchParams) {
        const full = (urlSearchParams.get(QUERY_KEY) ?? "").trim();
        const keyword = adjustCase(full).replace(/\s.*/, "");
        const searchTerm = full.replace(/^[^\s]+\s*/, "");
        return { full, keyword, searchTerm } as const;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Get the requested redirect URL
    //------------------------------------------------------------------------------------------------------------------

    function getRedirect(urlSearchParams: URLSearchParams) {
        const redirect = urlSearchParams.get(REDIRECT_KEY);
        return redirect ? (JSON.parse(redirect) as FinalizedUrlBase) : undefined;
    }
}
