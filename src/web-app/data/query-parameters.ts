import { Exception, InitializationError } from "../utilities/error";
import { Hashtable } from "../utilities/hashtable";
import { create } from "../utilities/html";
import { adjustCase } from "../utilities/string";
import { FinalizedUrlBase } from "./shortcut";
import { startupCache } from "./variables";

export class QueryParameters {
    public static readonly QUERY = "q";
    public static readonly REDIRECT = "r";
    public static readonly SETUP = "setup";
    public static readonly FACETS = "facets";

    public readonly queryParameters: Hashtable<string>;
    public readonly fullQuery: string;
    public readonly keyword: string;
    public readonly searchTerm: string;
    public readonly redirect?: FinalizedUrlBase;
    public readonly setup?: string | undefined;
    public readonly facets = {
        newTabs: false,
        noFocus: false,
    };

    //------------------------------------------------------------------------------------------------------------------
    // Initialize the redirector and extract the query parameters
    //------------------------------------------------------------------------------------------------------------------

    constructor() {
        this.queryParameters = this.getQueryParameters();

        this.fullQuery = this.queryParameters.getOrDefault(QueryParameters.QUERY, "").replaceAll("+", " ");
        this.keyword = adjustCase(this.fullQuery).replace(/\s.*/, "");
        this.searchTerm = this.fullQuery.replace(/^[^\s]+\s*/, "");
        const redirect = this.queryParameters.get(QueryParameters.REDIRECT);
        this.redirect = redirect ? JSON.parse(redirect) : undefined;
        this.setup = this.queryParameters.get(QueryParameters.SETUP);
        this.queryParameters
            .getOrDefault(QueryParameters.FACETS, "")
            .split(",")
            .map(facet => facet.trim().toLowerCase())
            .filter(Boolean)
            .forEach(facet => this.applyFacet(facet));
    }

    private applyFacet(facet: string) {
        if ("new-tabs" === facet) {
            this.facets.newTabs = true;
        } else if ("no-focus" === facet) {
            this.facets.noFocus = true;
        } else {
            startupCache.initializationErrors.push(
                new InitializationError(
                    create("div", "Facet ", create("tt", facet), " (in this page's address) is not supported")
                )
            );
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Parse all query parameters into a key-value object
    //------------------------------------------------------------------------------------------------------------------

    private getQueryParameters() {
        const result = new Hashtable<string>();
        if (!globalThis.location.search) {
            return result;
        }
        for (const parameter of globalThis.location.search.trim().replace(/^\?/, "").trim().split("&")) {
            const index = parameter.indexOf("=");
            if (0 < index) {
                const key = this.urlDecode(parameter.substring(0, index));
                if (key) {
                    result.put(key, this.urlDecode(parameter.substring(index + 1)));
                }
            } else {
                result.put(this.urlDecode(parameter), "");
            }
        }

        return result;
    }

    private urlDecode(value: string) {
        try {
            return decodeURIComponent(value).trim();
        } catch {
            throw new Exception(
                "URL syntax error",
                create("p", "A query parameter passed in the URL is not url-encoded:"),
                create("p", value)
            );
        }
    }
}
