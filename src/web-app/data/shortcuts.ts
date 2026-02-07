import { Hashtable } from "../utilities/hashtable";
import { Shortcut } from "./shortcut";

export type Shortcuts = Hashtable<Shortcut>;

export const shortcuts = new Hashtable<Shortcut>();
