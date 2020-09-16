namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // Comparators for sorting arrays
    //------------------------------------------------------------------------------------------------------------------

    export function comparator(a: any, b: any) {
        return a < b ? -1 : (a === b ? 0 : 1)
    }

    export function comparing<T>(fieldSelector?: (object: T) => any) {
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
        } catch (ignored) { }
        const supportsBacktickSyntax = value === (window as any)[key];
        delete (window as any)[key];
        return supportsBacktickSyntax;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Check if we're running with the default (template) shortcuts
    //------------------------------------------------------------------------------------------------------------------

    export function isDemoMode() {
        const keywords = ['tm', 'tz', 'tp', 'tt', 'tr', 'e', 'news'];
        return Object.keys(shortcuts).length == keywords.length
            && keywords.filter(keyword => shortcuts[keyword]).length === keywords.length;
    }
}
