import { create, sanitize } from "../utilities/html";
import { assertNotNull } from "../utilities/misc";
import { state } from "./state";

//----------------------------------------------------------------------------------------------------------------------
// A segment contains part of the keyword and part of the description. Multiple segments form the whole keyword and
// description.
//----------------------------------------------------------------------------------------------------------------------

export class Segment {
    constructor(
        public readonly keyword: string,
        public readonly sections: string[]
    ) {}

    public get description() {
        return this.sections.join("");
    }
}

export class Segments {
    public static readonly SEPARATOR_TEXT = " » ";
    public static readonly SEPARATOR_HTML = " &raquo; ";
    public static readonly SEPARATOR_PLACEHOLDER = "\n";

    private _description?: string;
    private _descriptionPlaceholder?: string;
    private _descriptionHtml?: string;

    constructor(public readonly segments: Segment[]) {}

    public getMatch(length: number): MatchingSegment {
        return new MatchingSegment(this.segments, length);
    }

    public get descriptionHtml() {
        const descriptionHtml =
            this._descriptionHtml ??
            this.segments.map(segment => sanitize(segment.description)).join(Segments.SEPARATOR_HTML);
        this._descriptionHtml = descriptionHtml;
        return descriptionHtml;
    }

    public get description() {
        const description =
            this._description ?? this.segments.map(segment => segment.description).join(Segments.SEPARATOR_TEXT);
        this._description = description;
        return description;
    }

    public get descriptionPlaceholder() {
        const descriptionPlaceholder =
            this._descriptionPlaceholder ??
            this.segments.map(segment => segment.description).join(Segments.SEPARATOR_PLACEHOLDER);
        this._descriptionPlaceholder = descriptionPlaceholder;
        return descriptionPlaceholder;
    }
}

export class MatchingSegment {
    public readonly fingerprint = "";
    public readonly keyword = "";
    public readonly descriptionHtml = "";
    public readonly isPartial: boolean = false;
    public hidesMoreChildren = false;

    constructor(segments: Segment[], length: number) {
        let lengthOffset = 0;
        const segmentsToDisplay = this.countSegmentsToDisplay(segments);

        for (let index = 0; index < segments.length; index++) {
            const segment = segments[index];
            if (this.keyword.length <= length || 0 === segment?.keyword.length) {
                this.keyword += segment?.keyword;
                if (segment?.description && index < segmentsToDisplay) {
                    const description = this.getDescription(
                        segment.sections,
                        length - lengthOffset,
                        lengthOffset,
                        length
                    );
                    this.descriptionHtml += `${this.descriptionHtml ? Segments.SEPARATOR_HTML : ""}${description}`;
                }
                this.fingerprint += MatchingSegment.getFingerprint(
                    assertNotNull(segment),
                    index + 1 !== segments.length
                );
                lengthOffset += segment?.keyword.length ?? 0;
            } else {
                this.isPartial = true;
                break;
            }
        }
    }

    private static getFingerprint(segment: Segment, appendDescription: boolean) {
        const openingDelimiter = state.config.shortcutFormat.keyword.openingDelimiter || "[";
        const closingDelimiter = state.config.shortcutFormat.keyword.closingDelimiter || "]";
        const suffix = appendDescription ? segment.description.trim().toLocaleLowerCase() : "";
        return openingDelimiter + segment.keyword + closingDelimiter + suffix;
    }

    private countSegmentsToDisplay(segments: Segment[]) {
        let segmentsToDisplay = segments.length;
        for (; 0 < segmentsToDisplay && !segments[segmentsToDisplay - 1]?.keyword; segmentsToDisplay--) {
            // just calculate segmentsToDisplay
        }
        return Math.max(0, segmentsToDisplay);
    }

    private getDescription(sections: string[], hotkeysMatched: number, lengthOffset: number, length: number) {
        if (!state.config.homepage.suggestions.showHotkeys) {
            return sanitize(sections.join(""));
        } else if (1 === sections.length) {
            return this.autoDetectHotkeys(
                assertNotNull(sections[0]),
                this.keyword.substring(lengthOffset),
                length - lengthOffset
            );
        } else {
            let result = sanitize(assertNotNull(sections[0]));
            for (let index = 1; index < sections.length; index++) {
                if (hotkeysMatched < index) {
                    result += create("span.hotkey", sanitize(assertNotNull(sections[index]).charAt(0))).outerHTML;
                    result += sanitize(assertNotNull(sections[index]).substring(1));
                } else {
                    result += sanitize(assertNotNull(sections[index]));
                }
            }
            return result;
        }
    }

    private autoDetectHotkeys(description: string, keyword: string, hotkeysMatched: number) {
        return state.hotkeySelector
            .selectHotkeys(keyword, description, hotkeysMatched)
            .map(item => (item.isHotkey ? create("span.hotkey", item.text).outerHTML : sanitize(item.text)))
            .join("");
    }
}
