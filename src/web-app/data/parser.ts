import { ParserError } from "../utilities/error";
import { Hashtable } from "../utilities/hashtable";
import { assertNotNull, getProperty } from "../utilities/misc";
import { adjustCase, endsWith, replaceAll, startsWith } from "../utilities/string";
import { DYNAMIC_LINK_PROTOCOL } from "./constants";
import { Segment } from "./segments";
import { DynamicShortcut, OnMultiLink, Shortcut } from "./shortcut";
import { startupCache } from "./startup-cache";
import { state } from "./state";
import { Shortcuts } from "./variables";

//----------------------------------------------------------------------------------------------------------------------
// Internal data structure for intermediate parser results
//----------------------------------------------------------------------------------------------------------------------

class ParserContext {
    // input data
    public line = "";

    // extracted components
    public description = "";
    public urlOrDynamicShortcut: string | DynamicShortcut = "";
    public isStandardProtocol = false;
    public onMultiLink: OnMultiLink = OnMultiLink.OPEN_IN_NEW_TAB;

    // re-usable components (garbage collection performance tuning)
    public combination = new Array<number>();
}

//----------------------------------------------------------------------------------------------------------------------
// Shortcut parser
//----------------------------------------------------------------------------------------------------------------------

export class ShortcutParser {
    private readonly KNOWN_PROTOCOLS = ["file", "ftp", "http", "https", DYNAMIC_LINK_PROTOCOL].map(p => `${p}://`);

    private static readonly PROTOCOL_SEPARATOR = "://";

    //------------------------------------------------------------------------------------------------------------------
    // Parse all shortcut definitions
    //------------------------------------------------------------------------------------------------------------------

    public parseLines(lines: string[], startIndex: number, endIndex: number, shortcuts: Shortcuts) {
        const context = new ParserContext();

        for (let index = startIndex; index < endIndex; index++) {
            context.line = lines[index]?.trim() ?? "";
            if (context.line && !startsWith(context.line, state.config.shortcutFormat.comment)) {
                try {
                    this.parseLineAndStoreShortcut(context, shortcuts);
                } catch (exception) {
                    this.handleParserError(exception);
                }
            }
        }

        if ("defaultsearchengine" === state.config.defaultSearchEngine.keyword) {
            shortcuts.delete(state.config.defaultSearchEngine.keyword);
        }

        state.defaultSearchEngine ??= new Shortcut(
            "config.defaultSearchEngine.keyword",
            [],
            OnMultiLink.SHOW_MENU,
            [
                "https://duckduckgo.com/?q=",
                state.config.shortcutFormat.url.searchTermPlaceholder,
                "&kah=us-en%2Chk-tzh&kav=1&kam=google-maps&kak=-1&kax=-1&kaq=-1&kap=-1&kao=-1&kau=-1",
            ].join("")
        );
    }

    private handleParserError(exception: unknown) {
        if (exception instanceof ParserError) {
            startupCache.initializationErrors.push(exception);
        } else {
            throw exception;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Parse a single line
    //------------------------------------------------------------------------------------------------------------------

    private parseLineAndStoreShortcut(context: ParserContext, shortcuts: Shortcuts) {
        this.splitDescriptionAndUrl(context);
        this.parseOnMultiLink(context);
        const keywords = this.formKeywords(context, this.parseKeywordsAndDescription(context));
        let hasKeywords = false;

        keywords.entries
            .filter(entry => entry.key)
            .forEach(entry => {
                const keyword = entry.key;
                const sections = entry.value;
                if (shortcuts.get(keyword)) {
                    shortcuts
                        .get(keyword)
                        ?.addLink(keyword, sections, context.onMultiLink, context.urlOrDynamicShortcut);
                } else {
                    shortcuts.put(
                        keyword,
                        new Shortcut(keyword, sections, context.onMultiLink, context.urlOrDynamicShortcut)
                    );
                }
                if (keyword === state.config.defaultSearchEngine.keyword) {
                    state.defaultSearchEngine = assertNotNull(shortcuts.get(keyword));
                }
                hasKeywords = true;
            });

        if (!hasKeywords) {
            throw new ParserError("Failed to retrieve the keyword", context.line);
        }

        return shortcuts;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Separate the description from the  URL
    //------------------------------------------------------------------------------------------------------------------

    private splitDescriptionAndUrl(context: ParserContext) {
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

    private getUrl(line: string) {
        const lineLowerCase = line.toLowerCase();
        return this.getStandardProtocolUrl(line, lineLowerCase) || this.getNonStandardProtocolUrl(line, lineLowerCase);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Get the line's standard protocol URL (if found)
    //------------------------------------------------------------------------------------------------------------------

    private getStandardProtocolUrl(line: string, lineLowerCase: string) {
        const index = this.KNOWN_PROTOCOLS.map(protocol => lineLowerCase.indexOf(protocol))
            .filter(matchIndex => 0 <= matchIndex)
            .reduce((a, b) => Math.min(a, b), line.length);
        if (index < line.length) {
            return { isStandardProtocol: true, url: line.substring(index) };
        } else {
            return undefined;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Get the line's non-standard protocol URL (if found)
    //------------------------------------------------------------------------------------------------------------------

    private getNonStandardProtocolUrl(line: string, lineLowerCase: string) {
        let offset = 0;
        while (offset < line.length) {
            const index = line.indexOf(ShortcutParser.PROTOCOL_SEPARATOR, offset);
            if (0 < index) {
                if ("a" <= lineLowerCase.charAt(index - 1) && lineLowerCase.charAt(index - 1) <= "z") {
                    const start = this.getProtocolStartOffset(index, lineLowerCase);
                    return { isStandardProtocol: false, url: line.substring(start) };
                } else {
                    offset = index + ShortcutParser.PROTOCOL_SEPARATOR.length;
                }
            } else {
                offset = line.length;
            }
        }

        throw new ParserError("Unable to retrieve the link (make sure it starts with a protocol like https://)", line);
    }

    private getProtocolStartOffset(index: number, lineLowerCase: string) {
        let start = index - 1;
        while (0 < start && "a" <= lineLowerCase.charAt(start - 1) && lineLowerCase.charAt(start - 1) <= "z") {
            start--;
        }
        return start;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Extract the behavior for duplicate keywords
    //------------------------------------------------------------------------------------------------------------------

    private parseOnMultiLink(context: ParserContext) {
        const multiLinkIndicator = state.config.shortcutFormat.url.multiLinkIndicator as object as {
            [index: string]: string | undefined;
        };

        for (let pass = 0; pass <= 1; pass++) {
            for (const onMultiLink of OnMultiLink.values) {
                const symbol = getProperty(multiLinkIndicator, onMultiLink.key) ?? "~!@#$%^&*()_+";
                if (
                    !pass &&
                    context.isStandardProtocol &&
                    "string" === typeof context.urlOrDynamicShortcut &&
                    startsWith(context.urlOrDynamicShortcut, symbol)
                ) {
                    context.onMultiLink = onMultiLink;
                    context.urlOrDynamicShortcut = context.urlOrDynamicShortcut.substring(symbol.length).trim();
                    return;
                } else if (pass && endsWith(context.description, symbol)) {
                    context.description = context.description
                        .substring(0, context.description.length - symbol.length)
                        .trim();
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

    private parseKeywordsAndDescription(context: ParserContext) {
        context.description = context.description.replace(/\s+/, " ");

        if (startsWith(context.description, state.config.shortcutFormat.keyword.openingDelimiter)) {
            return this.parseSegments(context, context.description);
        } else {
            const index = context.description.search(/(\s|$)/);
            return [
                {
                    keywords: this.splitKeywords(context, context.description.substring(0, index)),
                    description: context.description.substring(index).trim(),
                },
            ];
        }
    }

    private parseSegments(context: ParserContext, description: string) {
        let splitResult = this.splitNextSegment(context, description);
        const segments = [splitResult?.nextSegment || { keywords: [], description: description }];

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

    private splitNextSegment(context: ParserContext, description: string) {
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
                    description: nextSegment.substring(endIndex + closingDelimiter.length).trim(),
                },
            };
        }

        return { description };
    }

    private splitKeywords(context: ParserContext, keywords: string) {
        const result = new Array<string>();
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

    private formKeywords(context: ParserContext, segments: Array<{ keywords: string[]; description: string }>) {
        const result = new Hashtable<Array<Segment>>();
        const keyword = new Array<string>();
        let hasMoreCombinations = true;

        for (let index = 0; index < segments.length; index++) {
            context.combination[index] = 0;
        }

        while (hasMoreCombinations) {
            const array = new Array<Segment>();
            for (let index = 0; index < segments.length; index++) {
                keyword[index] = segments[index]?.keywords[assertNotNull(context.combination[index])] ?? "";
                array.push(
                    this.createSegment(assertNotNull(keyword[index]), assertNotNull(segments[index]).description)
                );
            }
            result.put(keyword.join(""), array);

            hasMoreCombinations = false;
            for (let index = segments.length - 1; 0 <= index; index--) {
                if (assertNotNull(context.combination[index]) + 1 < assertNotNull(segments[index]).keywords.length) {
                    context.combination[index] = (context.combination[index] ?? 0) + 1;
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

    private createSegment(keyword: string, description: string) {
        const marker = state.config.shortcutFormat.hotkeyMarker;

        if (marker) {
            const sections = replaceAll(description, `${marker}${marker}`, "\n", true)
                .split(marker)
                .map(item => replaceAll(item, "\n", `${marker}${marker}`, true));

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
}
