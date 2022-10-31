namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // Convert to lowercase if config.caseSensitive == false
    //------------------------------------------------------------------------------------------------------------------

    export function adjustCase(text: string): string;
    export function adjustCase(text?: string): string | undefined;
    export function adjustCase(text?: string): string | undefined {
        return (text && !config.shortcutFormat.keyword.caseSensitive) ? text.toLowerCase() : text;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Replace all occurrences of the given string
    //------------------------------------------------------------------------------------------------------------------

    export function replaceAll(source: string, search: string, replacement: string, caseSensitive: boolean) {
        let result = "";
        if (!caseSensitive) {
            search = search.toLocaleLowerCase();
        }
        let index = (caseSensitive ? source : source.toLocaleLowerCase()).indexOf(search);
        while (0 <= index) {
            result += source.substring(0, index) + replacement;
            source = source.substring(index + search.length);
            index = (caseSensitive ? source : source.toLocaleLowerCase()).indexOf(search);
        }
        return result + source;
    }

    //------------------------------------------------------------------------------------------------------------------
    // String matching utilities
    //------------------------------------------------------------------------------------------------------------------

    export function startsWith(line?: string, pattern?: string): boolean {
        return !!pattern
            && !!line
            && pattern.length <= line.length
            && line.substring(0, pattern.length) === pattern;
    }

    export function endsWith(line?: string, pattern?: string): boolean {
        return !!pattern
            && !!line
            && pattern.length <= line.length
            && line.substring(line.length - pattern.length, line.length) === pattern;
    }

    //------------------------------------------------------------------------------------------------------------------
    // Check if a given string looks like a URL
    //------------------------------------------------------------------------------------------------------------------

    export function isUrl(text: string) {
        for (const protocol of ["http://", "https://", "ftp://", "file://"]) {
            if (startsWith(text, protocol)) {
                return true;
            }
        }
        return false;
    }
}
