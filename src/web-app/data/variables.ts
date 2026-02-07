import { Router } from "../application/router";
import { state } from "./state";

//----------------------------------------------------------------------------------------------------------------------
// Initialization of global variables once all modules have been loaded
//----------------------------------------------------------------------------------------------------------------------

export function initializeVariables() {
    state.router = new Router();
}
