namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // Data structure representing a single JavaScript file
    //------------------------------------------------------------------------------------------------------------------

    export class JavaScriptFile {

        public readonly dependencies = new Array<JavaScriptFile>();
        public status: 'waiting' | 'loading' | 'completed' = 'waiting';

        public constructor(public readonly url: string, dependencies?: JavaScriptFile[]) {
            dependencies?.forEach(dependency => this.dependencies.push(dependency));
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Container for JavaScriptFiles
    //------------------------------------------------------------------------------------------------------------------

    export class JavaScriptLoader {

        private onCompleteHandler?: () => void;
        private readonly files: { [index: string]: JavaScriptFile } = {};

        //--------------------------------------------------------------------------------------------------------------
        // Add a file and start loading it (if possible)
        //--------------------------------------------------------------------------------------------------------------

        public add(url: string, dependencies?: JavaScriptFile[]) {
            const file = this.files[url] = this.files[url] ?? new JavaScriptFile(url, []);
            dependencies?.forEach(dependency => file.dependencies.push(dependency));
            this.checkDependenciesAndLoadFiles();
            return file;
        }

        //--------------------------------------------------------------------------------------------------------------
        // Load files whose prerequisites are met, check for deadlocks and start the application when done
        //--------------------------------------------------------------------------------------------------------------

        private checkDependenciesAndLoadFiles() {
            const files = Object.keys(this.files).map(url => this.files[url]);
            for (const file of files) {
                if (file.status === 'waiting' && !file.dependencies.filter(dep => dep.status !== 'completed').length) {
                    this.startLoad(file);
                }
            }

            const waitingFiles = files.filter(file => file.status === 'waiting');
            const hasWaitingFiles = !!waitingFiles.length;
            const hasLoadingFiles = !!files.filter(file => file.status === 'loading').length;

            if (!hasWaitingFiles && !hasLoadingFiles && this.onCompleteHandler) {
                this.onCompleteHandler();
            }
            if (hasWaitingFiles && !hasLoadingFiles) {
                startupCache.initializationErrors.push(new ScriptLoadingError(`
                    There's a cyclic dependency (&quot;deadlock&quot;) between the following JavaScript files:
                    ${(waitingFiles).map(file => sanitize(file.url)).join(' and ')}
                `.trim()));
                waitingFiles.forEach(file => this.startLoad(file));
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Start loading the given file
        //--------------------------------------------------------------------------------------------------------------

        private startLoad(file: JavaScriptFile) {
            file.status = 'loading';
            const script = document.createElement('script');
            script.addEventListener('load', () => this.onLoad(file));
            script.addEventListener('error', () => this.onError(file));
            script.type = 'text/javascript';
            script.src = file.url.match(/^[a-z]+:\/\/.*/i) ? file.url : `data/${file.url}`;
            document.getElementsByTagName('head')[0].appendChild(script);
        }

        //--------------------------------------------------------------------------------------------------------------
        // Handle file load events
        //--------------------------------------------------------------------------------------------------------------

        private onLoad(file: JavaScriptFile) {
            file.status = 'completed';
            this.checkDependenciesAndLoadFiles();
        }

        private onError(file: JavaScriptFile) {
            file.status = 'completed';
            startupCache.initializationErrors.push(new ScriptLoadingError(`Failed to load ${sanitize(file.url)}`));
            this.checkDependenciesAndLoadFiles();
        }

        //--------------------------------------------------------------------------------------------------------------
        // Register the callback and invoke it immediately there are no pending/loading files
        //--------------------------------------------------------------------------------------------------------------

        public onComplete(onCompleteHandler?: () => void) {
            this.onCompleteHandler = onCompleteHandler;
            this.checkDependenciesAndLoadFiles();
        }
    }
}
