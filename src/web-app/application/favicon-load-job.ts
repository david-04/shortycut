import { create } from "../utilities/html";
import { FaviconFile } from "./favicon";

//----------------------------------------------------------------------------------------------------------------------
// A job loading a single favicon
//----------------------------------------------------------------------------------------------------------------------

export class FaviconLoadJob {
    private status: "new" | "loading" | "loaded" | "failed" = "new";
    private readonly observers = new Array<FaviconFile>();

    //------------------------------------------------------------------------------------------------------------------
    // Initialization
    //------------------------------------------------------------------------------------------------------------------
    public constructor(public readonly url: string) {}

    //------------------------------------------------------------------------------------------------------------------
    // Add an observer
    //------------------------------------------------------------------------------------------------------------------
    public addObserver(file: FaviconFile) {
        if ("loaded" === this.status) {
            file.onResolved();
        } else if ("failed" === this.status) {
            file.onRejected();
        } else {
            this.observers.push(file);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Getters
    //------------------------------------------------------------------------------------------------------------------
    public get isNew() {
        return "new" === this.status;
    }

    public get isLoading() {
        return "loading" === this.status;
    }

    public get isFinished() {
        return this.isLoaded || this.hasFailed;
    }

    public get isLoaded() {
        return "loaded" === this.status;
    }

    public get hasFailed() {
        return "failed" === this.status;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Start loading the image (if it hasn't started yet)
    //------------------------------------------------------------------------------------------------------------------
    public startLoad() {
        if ("new" !== this.status) {
            return false;
        }
        this.status = "loading";
        create("img", element => {
            element.addEventListener("load", () => this.onLoadEnd(true));
            element.addEventListener("error", () => this.onLoadEnd(false));
            (element as HTMLImageElement).src = this.url;
        });

        return true;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Update the status and notify all observers
    //------------------------------------------------------------------------------------------------------------------
    private onLoadEnd(success: boolean) {
        this.status = success ? "loaded" : "failed";
        this.observers.forEach(observer => (success ? observer.onResolved() : observer.onRejected()));
        this.observers[0]?.origin.domain.registry.startNextLoad();
    }
}
