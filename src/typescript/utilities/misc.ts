namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // Comparators for sorting arrays
    //------------------------------------------------------------------------------------------------------------------

    export function comparator<T>(a: T, b: T) {
        return a < b ? -1 : (a === b ? 0 : 1);
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
        const key = 'shortycutBrowserTest';
        const value = 'success';
        try {
            eval('window["' + key + '"] = `' + value + '`');
        } catch (exception) {
            // ignored
        }
        const supportsBacktickSyntax = value === (window as any)[key];
        delete (window as any)[key];
        return supportsBacktickSyntax;
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
            throw 'Value is undefined';
        } else if (null === value) {
            throw 'Value is null';
        } else {
            return value as Exclude<T, null | undefined>;
        }
    }
}
