//----------------------------------------------------------------------------------------------------------------------
// Sanitize the given content for HTML rendering
//----------------------------------------------------------------------------------------------------------------------

import { Hashtable } from "./hashtable";
import { assertNotNull } from "./misc";

export function sanitize(content: string): string {
    return "string" === typeof content
        ? content.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;")
        : content;
}

//----------------------------------------------------------------------------------------------------------------------
// Create a DOM element
//----------------------------------------------------------------------------------------------------------------------

export type CreateElementConsumer = (element: HTMLElement) => void | Element | string | Element[] | string[];

export type CreateElementProperties =
    | CreateElementConsumer
    | Element
    | string
    | Element[]
    | string[]
    | (Element | string)[];

export function create(type: string, ...args: readonly CreateElementProperties[]): HTMLElement {
    const properties = ElementProperties.of(type);
    const element = document.createElement(properties.tag);
    element.className = properties.className;
    return applyCreateProperties(!element.classList.contains("html"), element, ...args);
}

export function createImage(url: string, ...args: CreateElementProperties[]): HTMLElement {
    const image = create("img", ...args) as HTMLImageElement;
    image.src = url;
    return image;
}

class ElementProperties {
    private static _cache: Hashtable<ElementProperties>;

    private constructor(
        public readonly tag: string,
        public readonly className: string,
        public readonly isSanitized: boolean,
        public readonly id?: string
    ) {}

    private static get cache() {
        const cache = ElementProperties._cache ?? new Hashtable<ElementProperties>();
        ElementProperties._cache = cache;
        return cache;
    }

    public static of(type: string) {
        return ElementProperties.cache.computeIfAbsent(type, ElementProperties.parse);
    }

    private static parse(type: string) {
        const array = type
            .split(/(?=[.#:])/)
            .map(token => token.trim())
            .filter(Boolean);
        return new ElementProperties(
            assertNotNull(array[0]),
            array
                .filter(item => item.startsWith("."))
                .map(item => item.substring(1))
                .join(" "),
            array.includes(":html"),
            array.filter(item => item.startsWith("#")).map(item => item.substring(1))[0]
        );
    }
}

function applyCreateProperties(
    mustSanitize: boolean,
    element: HTMLElement,
    ...args: CreateElementProperties[]
): HTMLElement {
    for (const arg of args) {
        if ("function" === typeof arg) {
            const result = arg(element);
            if (Array.isArray(result)) {
                element = applyCreateProperties(mustSanitize, element, ...result);
            } else if (null !== result && undefined !== result) {
                element = applyCreateProperties(mustSanitize, element, result);
            }
        } else if ("string" === typeof arg) {
            element.innerHTML += mustSanitize ? arg : sanitize(arg);
        } else if (Array.isArray(arg)) {
            element = applyCreateProperties(mustSanitize, element, ...arg);
        } else if (arg) {
            element.appendChild(arg);
        }
    }

    return element;
}
