import { Redirector } from "../application/redirector";
import { Router } from "../application/router";
import { Hashtable } from "../utilities/hashtable";
import { HotkeySelector } from "../utilities/hotkey-selector";
import { DEFAULT_CONFIG } from "./config";
import { Shortcut } from "./shortcut";
import { state } from "./state";

export type Shortcuts = Hashtable<Shortcut>;

//----------------------------------------------------------------------------------------------------------------------
// Initialization of global variables once all modules have been loaded
//----------------------------------------------------------------------------------------------------------------------

export function initializeVariables() {
    state.config = DEFAULT_CONFIG;
    state.shortcuts = new Hashtable<Shortcut>();
    state.redirector = new Redirector();
    state.router = new Router();
    state.hotkeySelector = new HotkeySelector();
}
