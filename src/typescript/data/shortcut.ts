namespace shortycut {

    export type LinkType = 'query' | 'bookmark';
    export type ShortcutType = LinkType | 'both';

    export type DynamicLinkFunction = (searchTerm: string) => string;
    export type DynamicLink = { generator: DynamicLinkFunction, urlForFavicon: string };

    //------------------------------------------------------------------------------------------------------------------
    // Action to be taken if a keyword has multiple links
    //------------------------------------------------------------------------------------------------------------------

    export class OnMultiLink {

        public static readonly values = new Array<OnMultiLink>();
        public static readonly byName: { [index: string]: OnMultiLink } = {};

        private constructor(public readonly key: string) {
            OnMultiLink.values.push(this);
            OnMultiLink.byName[this.key] = this;
        }

        public static getDefault() {
            return OnMultiLink.byName[config.shortcutFormat.url.multiLinkIndicator.default] || OnMultiLink.SHOW_MENU;
        }

        public static readonly REPLACE_PREVIOUS = new OnMultiLink('replacePrevious');
        public static readonly OPEN_IN_NEW_TAB = new OnMultiLink('openInNewTab');
        public static readonly SHOW_MENU = new OnMultiLink('showMenu');
    }

    //------------------------------------------------------------------------------------------------------------------
    // A link to a single website or POST form
    //------------------------------------------------------------------------------------------------------------------

    export class Link {

        public readonly type: LinkType;
        private _filterSummary?: string;
        private _overridden = false;
        private searchTerm = '';

        constructor(
            public readonly keyword: string,
            public readonly index: number,
            public readonly segments: Segments,
            public readonly onMultiLink: OnMultiLink,
            private urlOrDynamicLink: string | DynamicLink,
            private _postFields?: string
        ) {
            if ('string' !== typeof this.urlOrDynamicLink
                || 0 <= adjustCase(this.urlOrDynamicLink).indexOf(config.shortcutFormat.url.searchTermPlaceholder)
                || 0 <= adjustCase(this._postFields ?? '').indexOf(config.shortcutFormat.url.searchTermPlaceholder)) {
                this.type = 'query';
            } else {
                this.type = 'bookmark'
            }
        }

        public get url() {
            return replaceAll(
                'string' === typeof this.urlOrDynamicLink
                    ? this.urlOrDynamicLink
                    : this.urlOrDynamicLink.generator(this.searchTerm),
                config.shortcutFormat.url.searchTermPlaceholder,
                encodeURIComponent(this.searchTerm || ''),
                config.shortcutFormat.keyword.caseSensitive
            );
        }

        public get urlForFavicon() {
            return 'string' === typeof (this.urlOrDynamicLink)
                ? this.urlOrDynamicLink
                : this.urlOrDynamicLink.urlForFavicon;
        }

        public get overridden() {
            return this._overridden;
        }

        public markAsOverridden() {
            this._overridden = true;
        }

        public get filterSummary() {
            if (!this._filterSummary) {
                this._filterSummary = `${this.keyword} ${this.segments.description}`.toLocaleLowerCase().replace(/\s/g, '');
            }
            return this._filterSummary;
        }

        public replacePlaceholder(searchTerm: string) {
            this.searchTerm = searchTerm;
        }

        public getHref(searchTerm: string) {
            if (this._postFields) {
                const query = `${this.keyword} ${decodeURIComponent(searchTerm)}`.trim();
                return window.location.href.replace(/[#?].*/g, '')
                    + `?${QueryParameters.QUERY}=${query}`
                    + `&${QueryParameters.INDEX}=${this.index}`;
            } else {
                return this.url;
            }
        }

        public get postFields() {

            if (this._postFields) {
                return replaceAll(
                    this._postFields,
                    config.shortcutFormat.url.searchTermPlaceholder,
                    encodeURIComponent(this.searchTerm),
                    config.shortcutFormat.keyword.caseSensitive
                )
                    .split('&')
                    .filter(parameter => parameter)
                    .map(parameter => {
                        const index = parameter.indexOf('=');
                        if (index < 1) {
                            throw new Exception('Shortcut definition error',
                                `Post parameter ${sanitize(parameter)} is not in key=value format`);
                        }
                        try {
                            return {
                                key: decodeURIComponent(parameter.substr(0, index)),
                                value: decodeURIComponent(parameter.substr(index + 1))
                            };
                        } catch (exception) {
                            throw new Exception('Shortcut definition error',
                                `Post parameter ${sanitize(parameter)} is not URL encoded`);
                        }
                    });
            } else {
                return undefined;
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // A collection of current and overridden links
    //------------------------------------------------------------------------------------------------------------------

    export class Links {

        public readonly overridden = new Array<Link>();
        public readonly current = new Array<Link>();
        private _filterSummary?: string;
        private _descriptionHtml?: string;

        constructor(link: Link) {
            this.current.push(link)
        }

        public addLink(link: Link) {
            if (this.current.length && link.onMultiLink === OnMultiLink.REPLACE_PREVIOUS) {
                this.current.forEach(link => link.markAsOverridden());
                this.overridden.push(...this.current);
                this.current.length = 0
            }
            this.current.push(link);
        }

        public get onMultiLink() {
            return this.current[this.current.length - 1].onMultiLink;
        }

        public get type() {
            return this.current[0].type;
        }

        public get filterSummary() {
            if (!this._filterSummary) {
                this._filterSummary = this.current.map(link => link.filterSummary).join(' ');
            }
            return this._filterSummary;
        }

        public replacePlaceholders(searchTerm: string) {
            [this.overridden, this.current].forEach(array => array.forEach(link => link.replacePlaceholder(searchTerm)));
        }

        public get descriptionHtml() {
            return this._descriptionHtml = this._descriptionHtml ?? this.calculateDescriptionHtml();
        }

        private calculateDescriptionHtml() {

            if (1 === this.current.length) {
                return this.current[0].segments.descriptionHtml;
            } else {
                let length = 0;
                do {
                    let matches = true;
                    for (let index = 1; index < this.current.length && matches; index++) {
                        const current = this.current[index].segments.segments;
                        const previous = this.current[index - 1].segments.segments;
                        matches = length <= Math.min(current.length, previous.length) &&
                            length < current.length && current[length].description === previous[length].description;
                    }
                    if (!matches) {
                        break;
                    }
                } while (++length);

                if (length < 0) {
                    return this.current[0].segments.descriptionHtml;
                } else {
                    return this.current[0].segments.segments
                        .slice(0, length).map(segment => sanitize(segment.description))
                        .join(Segments.SEPARATOR_HTML);
                }
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // A segment contains part of the keyword and part of the description. Multiple segments form the whole keyword and
    // description.
    //------------------------------------------------------------------------------------------------------------------

    export class Segment {

        constructor(
            public readonly keyword: string,
            public readonly sections: string[]
        ) { };

        public get description() {
            return this.sections.join('');
        }
    }

    export class Segments {

        public static readonly SEPARATOR_TEXT = ' » ';
        public static readonly SEPARATOR_HTML = ' &raquo; ';
        public static readonly SEPARATOR_PLACEHOLDER = '\n';

        private _description?: string;
        private _descriptionPlaceholder?: string;
        private _descriptionHtml?: string;

        constructor(public readonly segments: Segment[]) { }

        public getMatch(length: number): MatchingSegment {
            return new MatchingSegment(this.segments, length);
        }

        public get descriptionHtml() {
            return this._descriptionHtml = this._descriptionHtml ??
                this.segments.map(segment => sanitize(segment.description)).join(Segments.SEPARATOR_HTML);
        }

        public get description() {
            return this._description = this._description
                ?? this.segments.map(segment => segment.description).join(Segments.SEPARATOR_TEXT);
        }

        public get descriptionPlaceholder() {
            return this._descriptionPlaceholder = this._descriptionPlaceholder
                ?? this.segments.map(segment => segment.description).join(Segments.SEPARATOR_PLACEHOLDER);
        }
    }

    export class MatchingSegment {

        public readonly fingerprint = '';
        public readonly keyword = '';
        public readonly descriptionHtml = '';
        public readonly isPartial: boolean;
        public hidesMoreChildren = false;

        constructor(segments: Segment[], length: number) {

            this.isPartial = false;

            let lengthOffset = 0;
            const segmentsToDisplay = this.countSegmentsToDisplay(segments);

            for (let index = 0; index < segments.length; index++) {
                const segment = segments[index];
                if (this.keyword.length <= length || 0 === segment.keyword.length) {
                    this.keyword += segment.keyword;
                    if (segment.description && index < segmentsToDisplay) {
                        const description = this.getDescription(segment.sections, length - lengthOffset, lengthOffset, length);
                        this.descriptionHtml += `${this.descriptionHtml ? Segments.SEPARATOR_HTML : ''}${description}`;
                    }
                    this.fingerprint +=
                        (config.shortcutFormat.keyword.openingDelimiter || '[') +
                        segment.keyword +
                        (config.shortcutFormat.keyword.closingDelimiter || ']');
                    if (index + 1 !== segments.length) {
                        this.fingerprint += segment.description.trim().toLocaleLowerCase();
                    }
                    lengthOffset += segment.keyword.length;
                } else {
                    this.isPartial = true;
                    break;
                }
            }
        }

        private countSegmentsToDisplay(segments: Segment[]) {

            let segmentsToDisplay = segments.length;
            for (; 0 < segmentsToDisplay && !segments[segmentsToDisplay - 1].keyword; segmentsToDisplay--);
            return Math.max(0, segmentsToDisplay);
        }

        private getDescription(sections: string[], hotkeysMatched: number, lengthOffset: number, length: number) {

            if (!config.homepage.suggestions.showHotkeys) {
                return sanitize(sections.join(''));
            } else if (1 === sections.length) {
                return this.autoDetectHotkeys(sections[0], this.keyword.substr(lengthOffset), length - lengthOffset);
            } else {
                let result = sanitize(sections[0]);
                for (let index = 1; index < sections.length; index++) {
                    if (hotkeysMatched < index) {
                        result += create('span.hotkey', sanitize(sections[index].charAt(0))).outerHTML;
                        result += sanitize(sections[index].substr(1));
                    } else {
                        result += sanitize(sections[index]);
                    }
                }
                return result;
            }
        }

        private autoDetectHotkeys(description: string, keyword: string, hotkeysMatched: number) {
            return hotkeySelector.selectHotkeys(keyword, description, hotkeysMatched)
                .map(item => item.isHotkey ? create('span.hotkey', item.text).outerHTML : sanitize(item.text))
                .join('');
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // A shortcut that maps a single keyword to one or more URLs
    //------------------------------------------------------------------------------------------------------------------

    export class Shortcut {

        private _bookmarks?: Links;
        private _queries?: Links;
        public readonly all = new Array<{ link: Link, links: Links }>();

        public get bookmarks() {
            return this._bookmarks;
        }

        public get queries() {
            return this._queries;
        }

        public get type() {
            return this._bookmarks ? (this._queries ? 'both' : 'bookmark') : 'query';
        }

        constructor(
            public readonly keyword: string,
            segments: Segment[],
            onMultiLink: OnMultiLink,
            urlOrDynamicLink: string | DynamicLink,
            postParameters?: string
        ) {
            this.addLink(keyword, segments, onMultiLink, urlOrDynamicLink, postParameters);
        }

        public addLink(
            keyword: string,
            segments: Segment[],
            onMultiLink: OnMultiLink,
            urlOrDynamicLink: string | DynamicLink,
            postParameters?: string
        ) {
            const link = new Link(
                keyword,
                this.all.length,
                new Segments(segments),
                onMultiLink,
                urlOrDynamicLink,
                postParameters
            );
            if ('query' === link.type) {
                this._queries = this.createOrAdd(link, this._queries);
            } else {
                this._bookmarks = this.createOrAdd(link, this._bookmarks);
            }
        }

        private createOrAdd(link: Link, links?: Links) {
            if (links) {
                links.addLink(link);
            } else {
                links = new Links(link);
            }
            this.all[link.index] = { link, links };
            return links;
        }

        public replacePlaceholders(searchTerm: string) {
            this._queries?.replacePlaceholders(searchTerm);
        }

        public getSegmentMatches(length: number) {
            const result = new Hashtable<MatchingSegment>();
            for (const link of [...(this._bookmarks?.current || []), ...this.queries?.current || []]) {
                const match = link.segments.getMatch(length);
                result.computeIfAbsent(match.fingerprint, () => match);
            }
            return result.values;
        }
    }
}
