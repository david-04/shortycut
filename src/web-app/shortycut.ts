import * as api from "./application/api";
import { initialize } from "./application/main";

initialize();

Object.assign(globalThis, { shortycut: api });
