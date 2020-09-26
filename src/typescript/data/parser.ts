namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // Internal data structure for intermediate parser results
    //------------------------------------------------------------------------------------------------------------------

    class ParserContext {

        // input data
        public line: string = '';

        // extracted components
        public description: string = '';
        public urlOrDynamicLink: string | DynamicLink = '';
        public isStandardProtocol: boolean = false;
        public onMultiLink: OnMultiLink = OnMultiLink.OPEN_IN_NEW_TAB;
        public postFields?: string;

        // re-usable components (garbage collection performance tuning)
        public combination = new Array<number>();
    }

    //------------------------------------------------------------------------------------------------------------------
    // Shortcut parser
    //------------------------------------------------------------------------------------------------------------------

    export class ShortcutParser {

        private KNOWN_PROTOCOLS = ['file', 'ftp', 'http', 'https', dynamicLinkProtocol];
        private KNOWN_PROTOCOLS_REGEXP = new RegExp(`(${this.KNOWN_PROTOCOLS.join('|')})://.*\$`, 'i');

        //--------------------------------------------------------------------------------------------------------------
        // Parse all shortcut definitions
        //--------------------------------------------------------------------------------------------------------------

        public parseLines(lines: string[], startIndex: number, endIndex: number, shortcuts: Shortcuts) {

            const context = new ParserContext();

            for (let index = startIndex; index < endIndex; index++) {
                context.line = lines[index]?.trim();
                if (context.line && (!startsWith(context.line, config.shortcutFormat.comment))) {
                    try {
                        this.parseLineAndStoreShortcut(context, shortcuts);
                    } catch (exception) {
                        if (exception instanceof ParserError) {
                            startupCache.initializationErrors.push(exception);
                        } else {
                            throw exception;
                        }
                    }
                }
            }

            if ('defaultsearchengine' === config.defaultSearchEngine.keyword) {
                shortcuts.delete(config.defaultSearchEngine.keyword);
            }

            if (!defaultSearchEngine) {
                defaultSearchEngine = new Shortcut(
                    'config.defaultSearchEngine.keyword',
                    [],
                    OnMultiLink.SHOW_MENU,
                    'https://duckduckgo.com/?q='
                    + config.shortcutFormat.url.searchTermPlaceholder
                    + '&kah=us-en%2Chk-tzh&kav=1&kam=google-maps&kak=-1&kax=-1&kaq=-1&kap=-1&kao=-1&kau=-1',
                    undefined
                );
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Parse a single line
        //--------------------------------------------------------------------------------------------------------------

        private parseLineAndStoreShortcut(context: ParserContext, shortcuts: Shortcuts) {

            this.splitDescriptionAndUrl(context);
            this.parseOnMultiLink(context);
            this.parsePostFields(context);
            let keywords = this.formKeywords(context, this.parseKeywordsAndDescription(context));
            let hasKeywords = false;

            keywords.entries.filter(entry => entry.key).forEach(entry => {
                const keyword = entry.key;
                const sections = entry.value;
                if (shortcuts.get(keyword)) {
                    shortcuts.get(keyword).addLink(
                        keyword,
                        sections,
                        context.onMultiLink,
                        context.urlOrDynamicLink,
                        context.postFields
                    );
                } else {
                    shortcuts.put(keyword, new Shortcut(
                        keyword,
                        sections,
                        context.onMultiLink,
                        context.urlOrDynamicLink,
                        context.postFields
                    ));
                }
                if (keyword === config.defaultSearchEngine.keyword) {
                    defaultSearchEngine = shortcuts.get(keyword);
                }
                hasKeywords = true;
            }
            );

            if (!hasKeywords) {
                throw new ParserError('Failed to retrieve the keyword', context.line)
            }

            return shortcuts;
        }

        //--------------------------------------------------------------------------------------------------------------
        // Separate the description from the  URL
        //--------------------------------------------------------------------------------------------------------------

        private splitDescriptionAndUrl(context: ParserContext) {

            let url = context.line.match(this.KNOWN_PROTOCOLS_REGEXP);
            context.isStandardProtocol = !!url;
            url = url || context.line.match(/[a-z]+:\/\/.*$/i);
            if (!url) {
                throw new ParserError(
                    'Unable to retrieve the link (make sure it starts with a protocol like https://)',
                    context.line
                );
            }

            context.urlOrDynamicLink = url[0].trim();
            context.description = context.line.substr(0, context.line.length - url[0].length);

            if (0 === context.urlOrDynamicLink.indexOf(dynamicLinkProtocol)) {
                context.urlOrDynamicLink = startupCache.dynamicLinks.get(context.urlOrDynamicLink);
                if (!context.urlOrDynamicLink) {
                    throw new ParserError(
                        'The dynamic link created via shortycut.toUrl() must be at the end of the line',
                        context.line
                    );
                }
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Extract the behavior for duplicate keywords
        //--------------------------------------------------------------------------------------------------------------

        private parseOnMultiLink(context: ParserContext) {

            const multiLinkIndicator = config.shortcutFormat.url.multiLinkIndicator;

            for (let pass = 0; pass < 2; pass++) {
                for (const onMultiLink of OnMultiLink.values) {
                    let symbol = (multiLinkIndicator as any)[onMultiLink.key] as string;
                    if (!pass && context.isStandardProtocol
                        && 'string' === typeof context.urlOrDynamicLink
                        && startsWith(context.urlOrDynamicLink, symbol)) {
                        context.onMultiLink = onMultiLink;
                        context.urlOrDynamicLink = context.urlOrDynamicLink.substr(symbol.length).trim();
                        return;
                    } else if (pass && endsWith(context.description, symbol)) {
                        context.description = context.description.substr(0, context.description.length - symbol.length).trim();
                        context.onMultiLink = onMultiLink;
                        return;
                    }
                }
            }

            context.onMultiLink = OnMultiLink.getDefault();
        }

        //--------------------------------------------------------------------------------------------------------------
        // Extract the post parameters
        //--------------------------------------------------------------------------------------------------------------

        private parsePostFields(context: ParserContext) {

            context.postFields = undefined;

            if ('string' === typeof context.urlOrDynamicLink) {
                const separator = config.shortcutFormat.url.postIndicator;
                let index = separator ? adjustCase(context.urlOrDynamicLink).indexOf(separator) : -1;
                if (separator && 0 <= index) {
                    context.postFields = context.urlOrDynamicLink.substr(index + separator.length);
                    context.urlOrDynamicLink = context.urlOrDynamicLink.substr(0, index);
                }
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Split keywords and descriptions and create segments as required
        //--------------------------------------------------------------------------------------------------------------

        private parseKeywordsAndDescription(context: ParserContext) {

            context.description = context.description.replace(/\s+/, ' ');

            if (startsWith(context.description, config.shortcutFormat.keyword.openingDelimiter)) {
                return this.parseSegments(context, context.description);
            } else {
                const index = context.description.search(/(\s|$)/);
                return [{
                    keywords: this.splitKeywords(context, context.description.substr(0, index)),
                    description: context.description.substr(index).trim()
                }];
            }
        }

        private parseSegments(context: ParserContext, description: string) {

            let splitResult = this.splitNextSegment(context, description);
            const segments = [splitResult?.nextSegment || { keywords: [], description: description }];

            while (config.shortcutFormat.enableGrouping && splitResult.nextSegment) {
                splitResult = this.splitNextSegment(context, splitResult.nextSegment.description);
                if (splitResult.nextSegment) {
                    segments[segments.length - 1].description = splitResult.description;
                    segments.push(splitResult.nextSegment);
                }
            }

            return segments;
        }

        private splitNextSegment(context: ParserContext, description: string) {

            const openingDelimiter = config.shortcutFormat.keyword.openingDelimiter!;
            const closingDelimiter = config.shortcutFormat.keyword.closingDelimiter!;
            const startIndex = description.indexOf(openingDelimiter);

            if (0 <= startIndex) {
                const nextSegment = description.substr(startIndex + openingDelimiter.length);
                let endIndex = nextSegment.indexOf(closingDelimiter);
                if (endIndex < 0) {
                    throw new ParserError(`Missing ${closingDelimiter} after ${openingDelimiter}`, context.line);
                }
                return {
                    description: description.substring(0, startIndex),
                    nextSegment: {
                        keywords: this.splitKeywords(context, nextSegment.substr(0, endIndex)),
                        description: nextSegment.substr(endIndex + closingDelimiter.length).trim()
                    }
                };
            }

            return { description };
        }

        private splitKeywords(context: ParserContext, keywords: string) {
            const result = new Array<string>();
            for (let keyword of keywords.split(config.shortcutFormat.keyword.separator || /\s+/)) {
                keyword = keyword.trim();
                if (keyword) {
                    if (keyword.match(/\s/)) {
                        throw new ParserError(`The keyword "${keyword}" contains whitespace`, context.line);
                    } else {
                        result.push(adjustCase(keyword));
                    }
                }
            }
            return result;
        }

        //--------------------------------------------------------------------------------------------------------------
        // Combine each keyword of each segment with each keyword in each other segment
        //--------------------------------------------------------------------------------------------------------------

        private formKeywords(context: ParserContext, segments: Array<{ keywords: string[], description: string }>) {

            let result = new Hashtable<Array<Segment>>();
            let hasMoreCombinations = true;
            let keyword = new Array<string>();

            for (let index = 0; index < segments.length; index++) {
                context.combination[index] = 0;
            }

            while (hasMoreCombinations) {

                let array = new Array<Segment>();
                for (let index = 0; index < segments.length; index++) {
                    keyword[index] = segments[index].keywords[context.combination[index]] ?? '';
                    array.push(this.createSegment(keyword[index], segments[index].description));
                }
                result.put(keyword.join(''), array);

                hasMoreCombinations = false;
                for (let index = segments.length - 1; 0 <= index; index--) {
                    if (context.combination[index] + 1 < segments[index].keywords.length) {
                        context.combination[index]++;
                        hasMoreCombinations = true;
                        break;
                    } else {
                        context.combination[index] = 0;
                    }
                }
            };

            return result;
        }

        //--------------------------------------------------------------------------------------------------------------
        // Splits hotkeys from non-hotkeys (e.g. _Git_Hub is converted into ['', 'G', 'it', 'H', 'ub']
        //--------------------------------------------------------------------------------------------------------------

        private createSegment(keyword: string, description: string) {

            const marker = config.shortcutFormat.hotkeyMarker;

            if (marker) {

                const sections = replaceAll(description, `${marker}${marker}`, '\n', true)
                    .split(marker)
                    .map(item => replaceAll(item, '\n', `${marker}${marker}`, true));

                for (let index = 1; index < sections.length; index++) {
                    const keywordChar = adjustCase(keyword.charAt(index - 1));
                    const sectionChar = adjustCase(sections[index].charAt(0));
                    if (keywordChar !== sectionChar) {
                        sections[index - 1] += sections[index];
                        sections.splice(index, 1);
                        index--;
                    }
                }
                return new Segment(keyword, keyword.length + 1 === sections.length ? sections : [sections.join('')]);
            }

            return new Segment(keyword, [description]);
        }
    }
}
