namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // Store configuration to be applied later
    //------------------------------------------------------------------------------------------------------------------

    export function configure(newConfig: object) {
        startupCache.config.push(newConfig);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Store shortcut definitions to be parsed later
    //------------------------------------------------------------------------------------------------------------------

    export function addShortcuts(...shortcuts: (string | string[])[]) {

        for (let item of shortcuts) {
            if (Array.isArray(item)) {
                item.forEach(item => startupCache.shortcuts.push(item));
            } else {
                startupCache.shortcuts.push(item);
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Create a virtual URL that points to a function which dynamically generates the actual link at runtime
    //------------------------------------------------------------------------------------------------------------------

    export function toUrl(dynamicLinkFunction: DynamicLinkFunction) {

        if ('function' !== typeof dynamicLinkFunction) {
            startupCache.initializationErrors.push(new InitializationError(
                create('div', 'The parameter passed to shortycut.toUrl() is not a function:'),
                create('div', create('tt', `${dynamicLinkFunction}`)))
            );
        }

        const key = `${dynamicLinkProtocol}://${startupCache.dynamicLinks.size}-${Math.random()}`;
        startupCache.dynamicLinks.put(key, {
            generator: dynamicLinkFunction,
            urlForFavicon: getUrlForFavicon(dynamicLinkFunction)
        });
        return key;
    }

    function getUrlForFavicon(dynamicLinkFunction: DynamicLinkFunction) {

        let invalidUrl: string | undefined = undefined;

        for (let searchTerm of [undefined, null, '', '1']) {
            try {
                const url = dynamicLinkFunction(searchTerm as any)?.trim();
                if (url) {
                    if (isUrl(url)) {
                        return url;
                    } else if (!invalidUrl) {
                        const name = (dynamicLinkFunction as any)?.name || 'function';
                        const parameter = undefined === searchTerm || null === searchTerm ? `${searchTerm}` : `'${searchTerm}'`;
                        invalidUrl = `${name}(${parameter}) => ${url}`;
                    }
                }
            } catch (ignored) { }
        }

        if (invalidUrl) {
            startupCache.initializationErrors.push(new InitializationError(
                create('div', 'The dynamic link function returned an invalid URL.'),
                create('div', create('tt', invalidUrl)))
            );
        }

        return 'file:///';
    }

    //------------------------------------------------------------------------------------------------------------------
    // Load JavaScript files
    //------------------------------------------------------------------------------------------------------------------

    class JavaScriptDependencyBuilder {

        public constructor(public readonly dependencies: JavaScriptFile[]) { }

        public andThen(...files: string[]) {
            return new JavaScriptDependencyBuilder(files.map(file => javaScriptLoader.add(file, this.dependencies)));
        }
    }

    export function loadJavaScript(...files: string[]) {
        return new JavaScriptDependencyBuilder([]).andThen(...files);
    }
}
