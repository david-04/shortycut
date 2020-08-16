namespace shortycut {


    //------------------------------------------------------------------------------------------------------------------
    // An exception with pre-rendered HTML
    //------------------------------------------------------------------------------------------------------------------

    export type HTMLContentItem = string | HTMLElement;
    export type HTMLContent = HTMLContentItem | HTMLContentItem[];

    export class Exception {

        public readonly title: string;
        public readonly content: HTMLContent[];

        public constructor(title: string, ...content: HTMLContent[]) {
            this.title = sanitize(title.trim());
            this.content = content;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Exception handler
    //------------------------------------------------------------------------------------------------------------------

    export function handleExceptions(onError: (exception: Exception) => void, action: () => void) {

        try {
            action();
        } catch (exception) {
            onError(exception);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Display an error message
    //------------------------------------------------------------------------------------------------------------------

    export function displayError(exception: any) {
        if (exception instanceof Exception) {
            pages.error.populate(exception);
        } else {
            console.error(exception);
            pages.error.populate('Internal error', [
                create('p', 'An internal error occurred:'),
                create('p', exception)
            ]);
        }
        pages.hideAllExcept(pages.error);
        pages.error.show();
    }
}
