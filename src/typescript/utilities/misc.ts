namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // Comparators for sorting arrays
    //------------------------------------------------------------------------------------------------------------------

    export function comparator<T>(a: T, b: T) {
        if (a < b) {
            return -1;
        } else {
            return a === b ? 0 : 1
        }
    }

    export function comparing<T, R>(fieldSelector?: (object: T) => R) {
        if (fieldSelector) {
            return (a: T, b: T) => comparator(fieldSelector(a), fieldSelector(b));
        } else {
            return comparator;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Get the current version number
    //------------------------------------------------------------------------------------------------------------------

    export function getVersionNumber() {
        return '##VERSION_NUMBER##'.replace(/^##.*/, '');
    }

    //------------------------------------------------------------------------------------------------------------------
    // Check if the browser supports the backtick syntax
    //------------------------------------------------------------------------------------------------------------------

    export function supportsBacktickSyntax() {
        try {
            eval('window["shortycutBrowserTest"] = `success`');
        } catch (exception) {
            // ignored
        }
        const valueMatches = 'success' === (window as any)['shortycutBrowserTest'];
        delete (window as any)['shortycutBrowserTest'];
        return valueMatches;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Check if we're running with the default (template) shortcuts
    //------------------------------------------------------------------------------------------------------------------

    export function isDemoMode() {
        const demoKeywords = ['tm', 'tz', 'tp', 'tt', 'tr', 'e', 'news'];
        const matchedKeywords = demoKeywords.filter(keyword => shortcuts.get(keyword));
        return shortcuts.size == demoKeywords.length && matchedKeywords.length === demoKeywords.length;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Throw an exception if the value is undefined or null
    //------------------------------------------------------------------------------------------------------------------

    export function assertNotNull<T>(value: T): Exclude<T, null | undefined> {
        if (undefined === value) {
            throw new Error('Value is undefined');
        } else if (null === value) {
            throw new Error('Value is null');
        } else {
            return value as Exclude<T, null | undefined>;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Get the current URL's base path (without the file)
    //------------------------------------------------------------------------------------------------------------------

    export function getWindowLocationPath() {
        const url = window.location.href.replace(/[#?].*/, '');
        const index = url.lastIndexOf('/');
        const lastPathSegment = url.substring(index + 1);
        if (lastPathSegment) {
            if (0 <= lastPathSegment.indexOf('.')) {
                return url.substring(0, index + 1);
            } else {
                return `${url}/`;
            }
        } else {
            return url;
        }
    }
}
