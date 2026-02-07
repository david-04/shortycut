import { Redirector } from "../application/redirector";
import { Router } from "../application/router";
import { HotkeySelector } from "../utilities/hotkey-selector";
import { state } from "./state";

//----------------------------------------------------------------------------------------------------------------------
// Initialization of global variables once all modules have been loaded
//----------------------------------------------------------------------------------------------------------------------

export function initializeVariables() {
    state.redirector = new Redirector();
    state.router = new Router();
    state.hotkeySelector = new HotkeySelector();
}
