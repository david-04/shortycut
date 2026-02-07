import { Exception } from "../utilities/error";
import { sanitize } from "../utilities/html";
import { adjustCase, replaceAll } from "../utilities/string";
import { queryParameters } from "./query-parameters";
import { Segment, Segments } from "./segments";
import {
    DynamicShortcut,
    FinalizedLink,
    FinalizedPostFields,
    FinalizedUrlBase,
    GeneratedLinks,
    OnMultiLink,
} from "./shortcut";
import { state } from "./state";

//----------------------------------------------------------------------------------------------------------------------
// A single link/URL (GET or POST)
//----------------------------------------------------------------------------------------------------------------------

export class Link {
    public readonly isQuery: boolean;
    private _filterSummary?: string;
    private _overridden = false;

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------

    constructor(
        public readonly keyword: string,
        public readonly index: number,
        public readonly segments: Segments,
        public readonly onMultiLink: OnMultiLink,
        public readonly isSearchable: boolean,
        private readonly urlOrDynamicShortcut: string | DynamicShortcut
    ) {
        this.isQuery =
            "string" === typeof this.urlOrDynamicShortcut
                ? adjustCase(this.urlOrDynamicShortcut).includes(state.config.shortcutFormat.url.searchTermPlaceholder)
                : this.urlOrDynamicShortcut.isQuery;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Convert this link into finalized links/URLs (with the search term replaced)
    //------------------------------------------------------------------------------------------------------------------

    public toFinalizedLinks(searchTerm: string) {
        if ("string" === typeof this.urlOrDynamicShortcut) {
            return this.constructFinalizedLinks([this.urlOrDynamicShortcut], searchTerm);
        }
        const urlOrUrls = this.urlOrDynamicShortcut.generator(searchTerm);
        return this.constructFinalizedLinks(Link.normalizeDynamicLinks(urlOrUrls), searchTerm);
    }

    //----------------------------------------------------------------------------------------------------------------------
    // Normalize dynamically generated URLs
    //----------------------------------------------------------------------------------------------------------------------

    public static normalizeDynamicLinks(generatedLinks: GeneratedLinks) {
        if ("string" === typeof generatedLinks) {
            return this.normalizeDynamicLink(generatedLinks);
        }
        return generatedLinks.flatMap(generatedLink => {
            return (
                "string" === typeof generatedLink
                    ? this.normalizeDynamicLink(generatedLink)
                    : [{ ...generatedLink, url: generatedLink.url.trim() }]
            ) as ReadonlyArray<string | { description: string; url: string }>;
        }) as Exclude<GeneratedLinks, string>;
    }

    private static normalizeDynamicLink(generatedLink: string) {
        const commentIndicator = state.config.shortcutFormat.comment;
        return generatedLink
            .split(/\r?\n/)
            .map(link => link.trim())
            .filter(Boolean)
            .filter(link => !commentIndicator || !link.startsWith(commentIndicator));
    }

    //------------------------------------------------------------------------------------------------------------------
    // Convert the given URLs/links into one or more finalized links
    //------------------------------------------------------------------------------------------------------------------

    private constructFinalizedLinks(
        urls: ReadonlyArray<string | { description: string; url: string }>,
        searchTerm: string
    ) {
        if (0 === urls.filter(link => "string" !== typeof link && link.description?.trim()).length) {
            return [
                this.constructFinalizedLink(
                    "",
                    urls.map(link => ("string" === typeof link ? link : link.url)),
                    searchTerm
                ),
            ];
        }
        return urls
            .map(link => ("string" === typeof link ? { description: "", url: link } : link))
            .map(link => this.constructFinalizedLink(link.description, [link.url], searchTerm));
    }

    //------------------------------------------------------------------------------------------------------------------
    // Convert the given URLs into one finalized link
    //------------------------------------------------------------------------------------------------------------------

    private constructFinalizedLink(description: string, urls: readonly string[], searchTerm: string): FinalizedLink {
        const segment = new Segments([...this.segments.segments, new Segment("", [description])]);
        return {
            htmlDescription: (description ? segment : this.segments).descriptionHtml,
            urls: urls.map(url => this.constructFinalizedUrl(url, searchTerm)),
        };
    }

    //------------------------------------------------------------------------------------------------------------------
    // Convert a single URL into a finalized URL
    //------------------------------------------------------------------------------------------------------------------

    private constructFinalizedUrl(link: string, searchTerm: string) {
        const parsedLink = Link.splitUrlAndPostFields(link);
        const url = Link.insertSearchTerm(parsedLink.url, searchTerm);
        const postFields = Link.constructFinalizedPostFields(parsedLink.postFields, searchTerm);
        const permalink = postFields ? Link.constructFinalizedPermalink(url, postFields) : url;
        return { url, postFields, permalink };
    }

    //------------------------------------------------------------------------------------------------------------------
    // Create a permalink (the regular URL for GET requests and a ShortyCut self-link for POST requests)
    //------------------------------------------------------------------------------------------------------------------

    public static constructFinalizedPermalink(finalizedUrl: string, finalizedPostFields?: FinalizedPostFields) {
        const baseUrl = globalThis.location.href.replaceAll(/[#?].*/g, "");
        const json: FinalizedUrlBase = { url: finalizedUrl, postFields: finalizedPostFields };
        const redirect = encodeURIComponent(JSON.stringify(json));
        return `${baseUrl}?${queryParameters.REDIRECT_KEY}=${redirect}`;
    }

    public get faviconUrls() {
        return "string" === typeof this.urlOrDynamicShortcut
            ? [this.urlOrDynamicShortcut]
            : this.urlOrDynamicShortcut.getFaviconUrls();
    }

    public get overridden() {
        return this._overridden;
    }

    public markAsOverridden() {
        this._overridden = true;
    }

    public get filterSummary() {
        if (!this._filterSummary) {
            this._filterSummary = `${this.keyword} ${this.segments.description}`
                .toLocaleLowerCase()
                .replaceAll(/\s/g, "");
        }
        return this._filterSummary;
    }

    private static insertSearchTerm(text: string, searchTerm: string) {
        return replaceAll(
            text,
            state.config.shortcutFormat.url.searchTermPlaceholder,
            encodeURIComponent(searchTerm),
            state.config.shortcutFormat.keyword.caseSensitive
        );
    }

    public static splitUrlAndPostFields(url: string) {
        const separator = state.config.shortcutFormat.url.postIndicator;
        const index = separator ? adjustCase(url).indexOf(separator) : -1;
        return separator && 0 <= index
            ? { url: url.substring(0, index), postFields: url.substring(index + separator.length) }
            : { url };
    }

    //------------------------------------------------------------------------------------------------------------------
    // Construct a finalized post fields as key/value pairs with the search term already replaced
    //------------------------------------------------------------------------------------------------------------------
    private static constructFinalizedPostFields(postFields: string | undefined, searchTerm: string) {
        return postFields
            ?.split("&")
            .filter(Boolean)
            .map(field => this.constructFinalizedPostField(field, searchTerm));
    }

    //------------------------------------------------------------------------------------------------------------------
    // Construct a single post field as key/value pair with the search term already replaced
    //------------------------------------------------------------------------------------------------------------------
    private static constructFinalizedPostField(parameter: string, searchTerm: string) {
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
        } catch {
            throw new Exception(
                "Shortcut definition error",
                `Post parameter ${sanitize(parameter)} is not URL encoded`
            );
        }
    }
}
