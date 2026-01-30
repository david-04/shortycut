import { state } from "../data/state";
import { Page } from "../data/variables";
import { create, sanitize } from "../utilities/html";
import "./link-tools.css";

//----------------------------------------------------------------------------------------------------------------------
// A menu of links attached to the current keyword
//----------------------------------------------------------------------------------------------------------------------

export class LinkTools implements Page {
    private readonly dom = {
        linkTools: document.querySelector("#link-tools") as HTMLElement,
        harParser: {
            input: document.querySelector("#link-tools .har-parser .input") as HTMLTextAreaElement,
            output: document.querySelector("#link-tools .har-parser .output") as HTMLElement,
        },
        urlEncoding: {
            decoded: document.querySelector("#link-tools input.decoded") as HTMLInputElement,
            encoded: document.querySelector("#link-tools input.encoded") as HTMLInputElement,
        },
    };

    //------------------------------------------------------------------------------------------------------------------
    // Initialize the link-tools page
    //------------------------------------------------------------------------------------------------------------------

    public constructor() {
        this.onDecodedChanged = this.onDecodedChanged.bind(this);
        this.onEncodedChanged = this.onEncodedChanged.bind(this);
        this.onHarInputChanged = this.onHarInputChanged.bind(this);
    }

    public hasMenu() {
        return true;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Populate (i.e. reset) the page
    //------------------------------------------------------------------------------------------------------------------

    public populate() {
        this.dom.urlEncoding.decoded.value = "";
        this.dom.urlEncoding.encoded.classList.remove("invalid");
        this.dom.urlEncoding.encoded.value = "";
        this.dom.harParser.input.classList.remove("invalid");
        this.dom.harParser.input.value = "";
        this.dom.harParser.output.innerHTML = "";
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Show and hide the page
    //------------------------------------------------------------------------------------------------------------------

    public show() {
        this.addEventHandlers();
        this.dom.linkTools.style.display = "flex";
    }

    public hide() {
        this.removeEventHandlers();
        this.dom.linkTools.style.display = "none";
    }

    //------------------------------------------------------------------------------------------------------------------
    // Add and remove event handlers
    //------------------------------------------------------------------------------------------------------------------

    private addEventHandlers() {
        ["change", "keydown", "input"].forEach(event => {
            this.dom.urlEncoding.encoded.addEventListener(event, this.onEncodedChanged);
            this.dom.urlEncoding.decoded.addEventListener(event, this.onDecodedChanged);
            this.dom.harParser.input.addEventListener(event, this.onHarInputChanged);
        });
    }

    private removeEventHandlers() {
        ["change", "keydown", "input"].forEach(event => {
            this.dom.urlEncoding.encoded.removeEventListener(event, this.onEncodedChanged);
            this.dom.urlEncoding.decoded.removeEventListener(event, this.onDecodedChanged);
            this.dom.harParser.input.removeEventListener(event, this.onHarInputChanged);
        });
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event handlers
    //------------------------------------------------------------------------------------------------------------------

    private onDecodedChanged() {
        this.dom.urlEncoding.encoded.value = encodeURIComponent(this.dom.urlEncoding.decoded.value);
    }

    private onEncodedChanged() {
        try {
            this.dom.urlEncoding.decoded.value = decodeURIComponent(this.dom.urlEncoding.encoded.value);
            this.dom.urlEncoding.encoded.classList.remove("invalid");
        } catch {
            this.dom.urlEncoding.decoded.value = "";
            this.dom.urlEncoding.encoded.classList.add("invalid");
        }
    }

    private onHarInputChanged() {
        const input = this.dom.harParser.input.value.trim() || '{"log":{"entries":[]}}';
        try {
            this.dom.harParser.output.innerHTML = "";
            const links = this.extractPostLinks(input);
            if (links.length) {
                this.dom.harParser.output.appendChild(
                    create("p", `This HAR file contain the following POST link${1 < links.length ? "s" : ""}:`)
                );
                links.forEach(url => this.dom.harParser.output.appendChild(url));
            } else if (this.dom.harParser.input.value.trim()) {
                this.dom.harParser.output.appendChild(create("p", "This HAR file does not contain any POST links."));
            }
            this.dom.harParser.input.classList.remove("invalid");
        } catch {
            this.dom.harParser.input.classList.add("invalid");
        }
    }

    private extractPostLinks(input: string) {
        const har = JSON.parse(input);
        const result = new Array<HTMLElement>();
        for (const entry of har.log.entries) {
            if ("POST" === entry?.request?.method) {
                let url = entry.request.url;
                const postParameters = entry?.request?.postData?.params;
                for (let index = 0; postParameters && index < postParameters.length; index++) {
                    url += 0 === index ? state.config.shortcutFormat.url.postIndicator : `&`;
                    const name = encodeURIComponent(postParameters[index].name);
                    const value = encodeURIComponent(postParameters[index].value);
                    url += `${name}=${value}`;
                }
                result.push(create("p.url", sanitize(url)));
            }
        }
        return result;
    }
}
