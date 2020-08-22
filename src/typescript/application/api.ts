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
