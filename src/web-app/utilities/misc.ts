import { shortcuts } from "../data/shortcuts";

//----------------------------------------------------------------------------------------------------------------------
// Comparators for sorting arrays
//----------------------------------------------------------------------------------------------------------------------

export function comparator<T>(a: T, b: T) {
    if (a < b) {
        return -1;
    } else {
        return a === b ? 0 : 1;
    }
}

export function comparing<T, R>(fieldSelector?: (object: T) => R) {
    return fieldSelector ? (a: T, b: T) => comparator(fieldSelector(a), fieldSelector(b)) : comparator;
}

//----------------------------------------------------------------------------------------------------------------------
// Check if the browser supports the backtick syntax
//----------------------------------------------------------------------------------------------------------------------

export function supportsBacktickSyntax() {
    const globalThisTyped = globalThis as { shortycutBrowserTest?: string };
    try {
        eval('globalThis["shortycutBrowserTest"] = `success`');
    } catch {}
    const valueMatches = "success" === globalThisTyped.shortycutBrowserTest;
    delete globalThisTyped.shortycutBrowserTest;
    return valueMatches;
}

//----------------------------------------------------------------------------------------------------------------------
// Check if we're running with the default (template) shortcuts
//----------------------------------------------------------------------------------------------------------------------

export function isDemoMode() {
    const demoKeywords = ["tm", "tz", "tp", "tt", "tr", "e", "news"];
    const matchedKeywords = demoKeywords.filter(keyword => shortcuts.get(keyword));
    return shortcuts.size === demoKeywords.length && matchedKeywords.length === demoKeywords.length;
}

//----------------------------------------------------------------------------------------------------------------------
// Throw an exception if the value is undefined or null
//----------------------------------------------------------------------------------------------------------------------

export function assertNotNull<T>(value: T): Exclude<T, null | undefined> {
    if (undefined === value) {
        throw new Error("Value is undefined");
    } else if (null === value) {
        throw new Error("Value is null");
    } else {
        return value as Exclude<T, null | undefined>;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Get the current URL's base path (without the file)
//----------------------------------------------------------------------------------------------------------------------

export function getWindowLocationPath() {
    const url = globalThis.location.href.replace(/[#?].*/, "");
    const index = url.lastIndexOf("/");
    const lastPathSegment = url.substring(index + 1);
    if (lastPathSegment) {
        return lastPathSegment.includes(".") ? url.substring(0, index + 1) : `${url}/`;
    } else {
        return url;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Retrieve a property value from an object
//----------------------------------------------------------------------------------------------------------------------

export function getProperty<T>(object: { [index: string]: T }, key: string) {
    return object && "object" === typeof object ? object[key] : undefined;
}

//----------------------------------------------------------------------------------------------------------------------
// Check if we're running in demo mode
//----------------------------------------------------------------------------------------------------------------------

export function isDemo() {
    return (globalThis as Record<string, unknown>)["shortycut/is-demo"] === true;
}
