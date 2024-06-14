namespace shortycut {

    export type SuggestionType = "match" | "suggestion" | "segment" | "search-result";

    const MAX_LEVEL = 999;

    //------------------------------------------------------------------------------------------------------------------
    // Data structures
    //------------------------------------------------------------------------------------------------------------------

    export interface Suggestion {

        type: SuggestionType;
        keyword: string;
        keywordHtml: string;
        descriptionHtml: string;
        shortcutType: ShortcutType;
        shortcut: Shortcut;
        hidesMoreChildren: boolean;
        link?: Link;
    }

    interface SearchableLink {

        link: Link;
        keyword: string;
        keywordLowerCase: string;
        description: string;
        descriptionLowerCase: string;
        shortcut: Shortcut;
        isSearchable: boolean;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Dictionary of shortcuts for fast look-ups
    //------------------------------------------------------------------------------------------------------------------

    class DictionaryItem {

        private _children?: Hashtable<DictionaryItem>;
        private _suggestions?: Suggestion[];

        //--------------------------------------------------------------------------------------------------------------
        // Initialize the dictionary item
        //--------------------------------------------------------------------------------------------------------------

        constructor(private readonly level: number, private readonly shortcuts: Shortcut[]) { }

        //--------------------------------------------------------------------------------------------------------------
        // Obtain suggestions
        //--------------------------------------------------------------------------------------------------------------

        public getSuggestions(keyword: string, maxResults: number, postKeywordInput: string): Suggestion[] {

            if (this.level === keyword.length) {
                return this.childSuggestions(maxResults, postKeywordInput);
            } else {
                const letter = keyword.charAt(this.level);
                return this.children.get(letter)?.getSuggestions(keyword, maxResults, postKeywordInput) ?? [];
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Get (and initialize) the dictionary children
        //--------------------------------------------------------------------------------------------------------------

        private get children() {
            const children = this._children ?? this.initializeChildren();
            this._children = children;
            return children;
        }

        private initializeChildren() {
            const dictionary = new Hashtable<DictionaryItem>();
            this.shortcuts.forEach(shortcut => {
                if (this.level < shortcut.keyword.length) {
                    const letter = shortcut.keyword ? shortcut.keyword.charAt(this.level) : "";
                    dictionary.computeIfAbsent(letter, () => new DictionaryItem(this.level + 1, []))
                        .shortcuts.push(shortcut);
                }
            });
            return dictionary;
        }

        //--------------------------------------------------------------------------------------------------------------
        // Get (and initialize) the suggestions
        //--------------------------------------------------------------------------------------------------------------

        private childSuggestions(maxResults: number, postKeywordInput: string) {
            if (!this._suggestions) {
                const shortcuts = this.getChildShortcuts(postKeywordInput ? this.level : MAX_LEVEL);
                this._suggestions = this.calculateChildSuggestions(maxResults, shortcuts);
            }
            return this._suggestions;
        }

        private calculateChildSuggestions(maxResults: number, shortcuts: Shortcut[]) {
            const matches = new Hashtable<{ match: MatchingSegment, shortcuts: Shortcut[]; }>();
            let count = 0;
            for (const shortcut of shortcuts) {
                for (const match of shortcut.getSegmentMatches(this.level)) {
                    const nonPartialMatch = matches.values.filter(item => item.match.keyword === match.keyword)[0];
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

            return matches.values.map(match => this.createChildSuggestion(match.match, match.shortcuts));
        }

        private getChildShortcuts(maxLength: number) {
            const shortcuts = this.shortcuts.filter(shortcut =>
                this.level === shortcut.keyword.length && shortcut.keyword.length <= maxLength
            );
            this.shortcuts
                .filter(shortcut => this.level < shortcut.keyword.length && shortcut.keyword.length <= maxLength)
                .forEach(shortcut => shortcuts.push(shortcut));
            return shortcuts;
        }

        private createChildSuggestion(match: MatchingSegment, shortcuts: Shortcut[]): Suggestion {

            const keyword = `${match.keyword}${match.isPartial ? "..." : ""}`;
            const keywordHtml = create("div",
                create("span.matched", keyword.substring(0, this.level)),
                create("span.unmatched", keyword.substring(this.level))
            ).innerHTML;

            const descriptionHtmlSuffix = !match.isPartial && shortcuts[0].searchable
                ? ` <span class="more-indicator-text">${Segments.SEPARATOR_HTML} ...</span>`
                : "";

            const segmentOrSuggestion = match.isPartial ? "segment" : "suggestion";
            return {
                type: this.level === match.keyword.length ? "match" : segmentOrSuggestion,
                keyword: match.keyword,
                keywordHtml,
                descriptionHtml: match.descriptionHtml + descriptionHtmlSuffix,
                shortcutType: this.getShortcutType(shortcuts),
                shortcut: shortcuts[0],
                hidesMoreChildren: match.hidesMoreChildren
            };
        }

        private getShortcutType(shortcuts: Shortcut[]): ShortcutType {
            if (shortcuts.some(shortcut => "both" === shortcut.type)) {
                return "both";
            } else if (shortcuts.some(shortcut => "bookmark" === shortcut.type)) {
                if (shortcuts.some(shortcut => "query" === shortcut.type)) {
                    return "both";
                } else {
                    return "bookmark";
                }
            } else if (shortcuts.some(shortcut => "query" === shortcut.type)) {
                return "query";
            } else {
                return "none";
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // The filter engine
    //------------------------------------------------------------------------------------------------------------------

    export class Filter {

        private static _dictionary?: DictionaryItem;
        private static _allLinks?: Array<SearchableLink>;
        private static readonly includeOverriddenShortcuts = false;

        public constructor(private readonly maxResults: number) { }

        //--------------------------------------------------------------------------------------------------------------
        // Get suggestions based on the keyword
        //--------------------------------------------------------------------------------------------------------------

        public keywordSearch(keyword: string, postKeywordInput: string) {
            return this.dictionary.getSuggestions(keyword, this.maxResults, postKeywordInput);
        }

        //--------------------------------------------------------------------------------------------------------------
        // Perform a full-text search
        //--------------------------------------------------------------------------------------------------------------

        public fullTextSearch(searchTerms: string[], keyword?: string) {

            const result = new Array<Suggestion>();
            for (const item of this.allLinks) {
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
        }

        private createSuggestion(searchTerms: string[], searchableLink: SearchableLink, result: Array<Suggestion>) {

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

        private markMatch(searchTerm: string, text: string, mask: Array<boolean>) {

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

        private highlightMatch(text: string, mask: Array<boolean>) {

            const result = new Array<string>();
            let end = 0;
            for (let start = 0; start < mask.length; start = end) {
                end = start + 1;
                for (; end < mask.length && mask[end - 1] === mask[end]; end++) {
                    // find the end index
                }
                let section = sanitize(text.substring(start, end));
                if (mask[start]) {
                    section = `<span class="matched-substring">${section}</span>`;
                }
                result.push(section);
            }

            return replaceAll(result.join(""), Segments.SEPARATOR_PLACEHOLDER, Segments.SEPARATOR_HTML, false);
        }

        //--------------------------------------------------------------------------------------------------------------
        // Initialize the dictionary
        //--------------------------------------------------------------------------------------------------------------

        private get dictionary() {
            const dictionary = Filter._dictionary ?? Filter.initializeDictionary();
            Filter._dictionary = dictionary;
            return dictionary;
        }

        private static initializeDictionary() {
            return new DictionaryItem(
                0, shortcuts.values.sort(
                    comparing(s => (s.bookmarks?.current[0].segments.description ?? s.queries?.current[0].segments.description ?? ""))
                )
            );
        }

        //--------------------------------------------------------------------------------------------------------------
        // Initialize the links
        //--------------------------------------------------------------------------------------------------------------

        private get allLinks() {
            const allLinks = Filter._allLinks ?? Filter.initializeLinks();
            Filter._allLinks = allLinks;
            return allLinks;
        }

        private static initializeLinks(): Array<SearchableLink> {

            const result = new Array<{ link: Link, links: Links; }>();
            shortcuts.values.forEach(shortcut =>
                result.push(...shortcut.all.filter(item => this.includeOverriddenShortcuts || !item.link.overridden))
            );
            result.sort(comparing((item => item.link.segments.description)));
            return result.map(item => ({
                link: item.link,
                links: item.links,
                keyword: item.link.keyword,
                keywordLowerCase: item.link.keyword.toLocaleLowerCase(),
                description: item.link.segments.descriptionPlaceholder,
                descriptionLowerCase: item.link.segments.descriptionPlaceholder.toLowerCase(),
                shortcut: shortcuts.get(item.link.keyword),
                isSearchable: item.link.isSearchable
            }));
        }
    }
}
