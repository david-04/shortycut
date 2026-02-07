import { Page } from "../data/page";
import { Exception, HTMLContent } from "../utilities/error";
import "./error-page.css";

//----------------------------------------------------------------------------------------------------------------------
// An error page that displays an error only
//----------------------------------------------------------------------------------------------------------------------

export class ErrorPage implements Page {
    private readonly dom = {
        error: document.querySelector("#error") as HTMLElement,
        title: document.querySelector("#error .title") as HTMLElement,
        message: document.querySelector("#error .message") as HTMLElement,
    };

    //------------------------------------------------------------------------------------------------------------------
    // Populate the page
    //------------------------------------------------------------------------------------------------------------------

    public populate(title: string, ...message: HTMLContent[]): void;
    public populate(exception: Exception): void;
    public populate(titleOrException: string | Exception | undefined, ...message: HTMLContent[]) {
        if (titleOrException instanceof Exception) {
            this.dom.title.innerHTML = titleOrException.title;
            message = titleOrException.content;
        } else if ("string" === typeof titleOrException) {
            this.dom.title.innerHTML = titleOrException;
        }

        message.forEach(item => {
            (Array.isArray(item) ? item : [item]).forEach(element => {
                if ("object" === typeof element) {
                    this.dom.message.appendChild(element);
                } else {
                    this.dom.message.innerHTML += element;
                }
            });
        });

        return this;
    }

    public hasMenu() {
        return false;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Show and hide the page
    //------------------------------------------------------------------------------------------------------------------

    public show(): void {
        this.dom.error.style.display = "flex";
    }

    public hide() {
        this.dom.error.style.display = "none";
    }
}
