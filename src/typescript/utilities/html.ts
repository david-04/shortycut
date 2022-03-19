namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // Sanitize the given content for HTML rendering
    //------------------------------------------------------------------------------------------------------------------

    export function sanitize(content: string): string {
        if ('string' !== typeof content) {
            return content;
        } else {
            return content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Create a DOM element
    //------------------------------------------------------------------------------------------------------------------

    export type CreateElementConsumer = ((element: HTMLElement) => void | Element | string | Element[] | string[]);

    export type CreateElementProperties = CreateElementConsumer | Element | string | Element[] | string[] | (Element | string)[];

    export function create(type: string, ...args: CreateElementProperties[]): HTMLElement {
        const properties = ElementProperties.of(type);
        const element = document.createElement(properties.tag);
        element.className = properties.className;
        return applyCreateProperties(!element.classList.contains('html'), element, ...args);
    }

    export function createImage(url: string, ...args: CreateElementProperties[]): HTMLElement {
        const image = create('img', ...args) as HTMLImageElement;
        image.src = url;
        return image;
    }

    class ElementProperties {

        private static _cache: Hashtable<ElementProperties>;

        private constructor(
            public readonly tag: string,
            public readonly className: string,
            public readonly isSanitized: boolean,
            public readonly id?: string) { }

        private static get cache() {
            const cache = ElementProperties._cache ?? new Hashtable<ElementProperties>();
            ElementProperties._cache = cache;
            return cache;
        }

        public static of(type: string) {
            return ElementProperties.cache.computeIfAbsent(type, ElementProperties.parse);
        }

        private static parse(type: string) {
            const array = type.split(/(?=[.#:])/).map(token => token.trim()).filter(token => token);
            return new ElementProperties(
                array[0],
                array.filter(item => '.' === item.charAt(0)).map(item => item.substring(1)).join(' '),
                array.some(item => item === ':html'),
                array.filter(item => '#' === item.charAt(0)).map(item => item.substring(1))[0]
            );
        }
    }

    function applyCreateProperties(mustSanitize: boolean, element: HTMLElement, ...args: CreateElementProperties[]): HTMLElement {

        for (const arg of args) {
            if ('function' === typeof arg) {
                const result = arg(element);
                if (Array.isArray(result)) {
                    element = applyCreateProperties(mustSanitize, element, ...result);
                } else if (null !== result && undefined !== result) {
                    element = applyCreateProperties(mustSanitize, element, result);
                }
            } else if ('string' === typeof arg) {
                element.innerHTML += mustSanitize ? arg : sanitize(arg);
            } else if (Array.isArray(arg)) {
                element = applyCreateProperties(mustSanitize, element, ...arg);
            } else if (arg) {
                element.appendChild(arg);
            }
        }

        return element;
    }
}
