import { sanitize } from "../utilities/html";
import { assertNotNull } from "../utilities/misc";
import { Link } from "./link";
import { Segments } from "./segments";
import { FinalizedLink, FinalizedLinks, OnMultiLink } from "./shortcut";

//----------------------------------------------------------------------------------------------------------------------
// A collection of current and overridden links
//----------------------------------------------------------------------------------------------------------------------

export class Links {
    public readonly overridden = new Array<Link>();
    public readonly current = new Array<Link>();
    private _filterSummary?: string;
    private _descriptionHtml?: string;

    constructor(link: Link) {
        this.current.push(link);
    }

    public addLink(link: Link) {
        if (this.current.length && link.onMultiLink === OnMultiLink.REPLACE_PREVIOUS) {
            this.current.forEach(currentLink => currentLink.markAsOverridden());
            this.overridden.push(...this.current);
            this.current.length = 0;
        }
        this.current.push(link);
    }

    public get onMultiLink() {
        return this.current.at(-1)?.onMultiLink ?? OnMultiLink.getDefault();
    }

    public get isQuery() {
        return this.current[0]?.isQuery;
    }

    public get isSearchable() {
        return this.current[0]?.isSearchable;
    }

    public get filterSummary() {
        const filterSummary = this._filterSummary ?? this.current.map(link => link.filterSummary).join(" ");
        this._filterSummary = filterSummary;
        return filterSummary;
    }

    public get descriptionHtml() {
        const descriptionHtml = this._descriptionHtml ?? this.calculateDescriptionHtml();
        this._descriptionHtml = descriptionHtml;
        return descriptionHtml;
    }

    private calculateDescriptionHtml() {
        if (1 === this.current.length) {
            return assertNotNull(this.current[0]).segments.descriptionHtml;
        }
        let length = 0;
        do {
            let matches = true;
            for (let index = 1; index < this.current.length && matches; index++) {
                const current = assertNotNull(this.current[index]).segments.segments;
                const previous = assertNotNull(this.current[index - 1]).segments.segments;
                matches =
                    length <= Math.min(current.length, previous.length) &&
                    length < current.length &&
                    current[length]?.description === previous[length]?.description;
            }
            if (!matches) {
                break;
            }
            length++;
        } while (length);

        return length < 0
            ? assertNotNull(this.current[0]).segments.descriptionHtml
            : assertNotNull(this.current[0])
                  .segments.segments.slice(0, length)
                  .map(segment => sanitize(segment.description))
                  .join(Segments.SEPARATOR_HTML);
    }

    public toFinalizedLinks(searchTerm: string): FinalizedLinks {
        const links = new Array<FinalizedLink>();
        let onMultiLink = this.onMultiLink;
        for (const link of this.current) {
            const newLinks = link.toFinalizedLinks(searchTerm);
            newLinks.forEach(link => links.push(link));
            if (1 < newLinks.length && 1 === this.current.length) {
                onMultiLink = OnMultiLink.SHOW_MENU;
            }
        }
        if (1 < links.length && onMultiLink !== OnMultiLink.SHOW_MENU) {
            onMultiLink = OnMultiLink.OPEN_IN_NEW_TAB;
        }
        return { onMultiLink, links };
    }
}
