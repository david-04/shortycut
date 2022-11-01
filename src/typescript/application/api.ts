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

        for (const shortcut of shortcuts) {
            if (Array.isArray(shortcut)) {
                shortcut.forEach(item => startupCache.shortcuts.push(item));
            } else {
                startupCache.shortcuts.push(shortcut);
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Create a virtual URL that points to a function which dynamically generates the actual link at runtime
    //------------------------------------------------------------------------------------------------------------------

    let dynamicLinkIndex = 0;

    export function toUrl(dynamicLinkFunction: DynamicLinkFunction) {

        if ("function" !== typeof dynamicLinkFunction) {
            startupCache.initializationErrors.push(new InitializationError(
                create("div", "The parameter passed to shortycut.toUrl() is not a function:"),
                create("div", create("tt", `${dynamicLinkFunction}`)))
            );
        }

        const key = `${dynamicLinkProtocol}://${startupCache.dynamicLinks.size}-${dynamicLinkIndex}`;
        dynamicLinkIndex++;
        startupCache.dynamicLinks.put(key, {
            generator: dynamicLinkFunction,
            urlForFavicon: getUrlForFavicon(dynamicLinkFunction)
        });
        return key;
    }

    function getUrlForFavicon(dynamicLinkFunction: DynamicLinkFunction) {

        let invalidUrl: string | undefined = undefined;

        for (const searchTerm of [undefined, null, "", "1"]) {
            const result = getDynamicLinkUrl(dynamicLinkFunction, searchTerm);
            if (result.url) {
                return result.url;
            }
            invalidUrl = invalidUrl || result.invalidUrl;
        }

        if (invalidUrl) {
            startupCache.initializationErrors.push(new InitializationError(
                create("div", "The dynamic link function returned an invalid URL."),
                create("div", create("tt", invalidUrl)))
            );
        }

        return "file:///";
    }

    //------------------------------------------------------------------------------------------------------------------
    // Try to get the dynamic link for the given search term - and ignore exceptions
    //------------------------------------------------------------------------------------------------------------------

    function getDynamicLinkUrl(dynamicLinkFunction: DynamicLinkFunction, searchTerm?: string | null) {
        try {
            const generatedLinks = dynamicLinkFunction(searchTerm ?? "");
            const firstGeneratedLink = "string" === typeof generatedLinks ? generatedLinks : generatedLinks[0];
            const url = "string" === typeof firstGeneratedLink ? firstGeneratedLink : firstGeneratedLink.url;
            if (url) {
                if (isUrl(url)) {
                    return { url };
                } else {
                    const name = (dynamicLinkFunction as { name?: string; })?.name || "function";
                    const quotes = undefined === searchTerm || null === searchTerm ? "" : "'";
                    const parameter = `${quotes}${searchTerm}${quotes}`;
                    return { invalidUrl: `${name}(${parameter}) => ${url}` };
                }
            }
        } catch (exception) {
            // try the next search term
        }
        return {};
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
