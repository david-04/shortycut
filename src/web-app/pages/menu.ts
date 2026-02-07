import { pages } from "../data/page";
import { queryParameters } from "../data/query-parameters";
import { state } from "../data/state";
import { VERSION } from "../generated/version";
import { create } from "../utilities/html";
import { isDemo } from "../utilities/misc";
import "./menu.css";

//----------------------------------------------------------------------------------------------------------------------
// An error page that displays an error only
//----------------------------------------------------------------------------------------------------------------------

export class Menu {
    private readonly dom = {
        menu: document.querySelector("#menu") as HTMLElement,
        burgerIcon: document.querySelector("#menu .burger-icon") as HTMLElement,
        closeIcon: document.querySelector("#menu .close-icon") as HTMLElement,
        items: document.querySelector("#menu .items") as HTMLElement,
    };

    private onClose?: () => void;

    //------------------------------------------------------------------------------------------------------------------
    // Initialize the page
    //------------------------------------------------------------------------------------------------------------------

    public constructor() {
        this.onClickCloseIcon = this.onClickCloseIcon.bind(this);
        this.onClickBurgerIcon = this.onClickBurgerIcon.bind(this);
        this.onClickBody = this.onClickBody.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

        this.onShortyCut = this.onShortyCut.bind(this);
        this.onDocumentation = this.onDocumentation.bind(this);
        this.onLinkTools = this.onLinkTools.bind(this);
        this.onBrowserIntegration = this.onBrowserIntegration.bind(this);
        this.onFavicons = this.onFavicons.bind(this);

        this.populateItems();
    }

    //------------------------------------------------------------------------------------------------------------------
    // Populate the menu items
    //------------------------------------------------------------------------------------------------------------------

    private populateItems() {
        this.dom.items.innerHTML = "";

        const menuItems: Array<[string, ((event: MouseEvent) => boolean) | (() => boolean)]> = [
            [`ShortyCut ${VERSION}`, this.onShortyCut],
            ["User manual", this.onDocumentation],
            ["Link tools", this.onLinkTools],
            ["Browser integration", this.onBrowserIntegration],
            ["Favicons", this.onFavicons],
        ];

        menuItems.forEach(array =>
            this.dom.items.appendChild(create("a", array[0], element => element.addEventListener("click", array[1])))
        );
    }

    //------------------------------------------------------------------------------------------------------------------
    // Add and remove event listeners
    //------------------------------------------------------------------------------------------------------------------

    private addEventListeners() {
        this.dom.closeIcon.addEventListener("click", this.onClickCloseIcon);
        this.dom.burgerIcon.addEventListener("click", this.onClickBurgerIcon);
        document.body.addEventListener("click", this.onClickBody);
        document.body.addEventListener("keydown", this.onKeyDown);
    }

    private removeEventListeners() {
        this.dom.closeIcon.removeEventListener("click", this.onClickCloseIcon);
        this.dom.burgerIcon.removeEventListener("click", this.onClickBurgerIcon);
        document.body.removeEventListener("click", this.onClickBody);
        document.body.removeEventListener("keydown", this.onKeyDown);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Show and hide icons and menu items
    //------------------------------------------------------------------------------------------------------------------

    public showBurgerIcon() {
        if (this.dom.menu.style.display === "none") {
            this.addEventListeners();
        }
        this.dom.burgerIcon.style.display = "block";
        this.dom.closeIcon.style.display = "none";
        this.dom.items.style.display = "none";
        this.dom.menu.style.display = "block";
    }

    public showCloseIcon(onClose: () => void) {
        this.onClose = onClose;
        if (this.dom.menu.style.display === "none") {
            this.addEventListeners();
        }
        this.dom.burgerIcon.style.display = "none";
        this.dom.closeIcon.style.display = "block";
        this.dom.items.style.display = "none";
        this.dom.menu.style.display = "block";
    }

    public hide() {
        this.removeEventListeners();
        this.dom.menu.style.display = "none";
    }

    public closeMenu() {
        this.dom.items.style.display = "none";
    }

    //------------------------------------------------------------------------------------------------------------------
    // Event handlers
    //------------------------------------------------------------------------------------------------------------------

    public onClickBurgerIcon(event: MouseEvent) {
        this.dom.items.style.display = "none" === this.dom.items.style.display ? "block" : "none";
        return this.cancelEvent(event);
    }

    public onClickCloseIcon(event: MouseEvent) {
        if (this.onClose) {
            this.onClose();
        }
        return this.cancelEvent(event);
    }

    public onClickBody() {
        this.closeMenu();
        return true;
    }

    public onShortyCut(event: MouseEvent) {
        this.closeMenu();
        const url = "https://github.com/david-04/shortycut";
        if (queryParameters.facets.newTabs) {
            globalThis.open(url);
        } else {
            globalThis.location.href = url;
        }
        return this.cancelEvent(event);
    }

    public onDocumentation(event: MouseEvent) {
        this.closeMenu();
        const url = `${isDemo() ? ".." : "resources/docs"}/index.html`;
        if (queryParameters.facets.newTabs) {
            globalThis.open(url);
        } else {
            globalThis.location.href = url;
        }
        return this.cancelEvent(event);
    }

    public onLinkTools(event: MouseEvent) {
        this.closeMenu();
        state.router.goto(pages.linkTools.populate());
        return this.cancelEvent(event);
    }

    public onBrowserIntegration(event: MouseEvent) {
        this.closeMenu();
        state.router.goto(pages.browserIntegration);
        return this.cancelEvent(event);
    }

    public onFavicons(event: MouseEvent) {
        this.closeMenu();
        state.router.goto(pages.faviconTools);
        return this.cancelEvent(event);
    }

    private cancelEvent(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    private onKeyDown(event: KeyboardEvent) {
        if ("Escape" === event.key || "Esc" === event.key) {
            if (this.dom.items.style.display !== "none") {
                this.closeMenu();
                event.preventDefault();
                return false;
            }
        }
        return true;
    }
}
