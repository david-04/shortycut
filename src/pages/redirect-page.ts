import { Page } from "../data/variables";
import { create, sanitize } from "../utilities/html";
import "./redirect-page.css";

//----------------------------------------------------------------------------------------------------------------------
// The page displayed when redirecting to the target page
//----------------------------------------------------------------------------------------------------------------------

export class RedirectPage implements Page {
    private readonly dom = {
        redirect: document.querySelector("#redirect") as HTMLElement,
        title: document.querySelector("#redirect .title") as HTMLElement,
        url: document.querySelector("#redirect .url") as HTMLElement,
    };

    //------------------------------------------------------------------------------------------------------------------
    // Populate the page
    //------------------------------------------------------------------------------------------------------------------

    public populate(htmlDescription: string, url: string) {
        this.dom.title.innerHTML = htmlDescription;
        this.dom.url.innerHTML = sanitize(url);
        return this;
    }

    public hasMenu() {
        return false;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Show and hide the page
    //------------------------------------------------------------------------------------------------------------------

    public show() {
        document.body.append(create("div:html", "&nbsp;"));
    }

    public hide() {
        this.dom.redirect.style.display = "none";
    }
}
