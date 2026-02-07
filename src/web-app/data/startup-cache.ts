import { InitializationError } from "../utilities/error";
import { Hashtable } from "../utilities/hashtable";
import { DynamicShortcut } from "./shortcut";

//----------------------------------------------------------------------------------------------------------------------
// Data provided by settings.js and shortcuts.js during the start-up phase
//----------------------------------------------------------------------------------------------------------------------

export const startupCache = {
    exceptions: new Array<ErrorEvent>(),
    config: new Array<object>(),
    shortcuts: new Array<string>(),
    initializationErrors: new Array<InitializationError | (() => InitializationError)>(),
    dynamicLinks: new Hashtable<DynamicShortcut>(),
} as const;
