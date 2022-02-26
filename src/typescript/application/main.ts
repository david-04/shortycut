declare const __SHORTYCUT_BODY_INNER_HTML: string;

namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // Register event listeners
    //------------------------------------------------------------------------------------------------------------------

    export function initialize() {

        window.addEventListener('error', (exception) => { startupCache.exceptions.push(exception); });

        if (document && document.title !== undefined) {
            document.title = '...';
        }

        window.addEventListener('DOMContentLoaded', () => {
            document.title = '...';
            ['icon', 'shortcut icon'].forEach(rel => addLink(rel, 'image/x-icon', 'resources/favicon.ico', ''));
            addLink('search', 'application/opensearchdescription+xml', 'data/search.xml', 'ShortyCut');
        });

        javaScriptLoader = new JavaScriptLoader();

        window.addEventListener('load', () => handleExceptions(
            displayError,
            () => javaScriptLoader.onComplete(startApplication)
        ));
    }

    //------------------------------------------------------------------------------------------------------------------
    // Add a <link> to the <head>
    //------------------------------------------------------------------------------------------------------------------

    function addLink(rel: string, type: string, href: string, title: string) {

        const link = document.createElement('link');
        link.rel = rel;
        link.type = type;
        link.href = href;
        link.title = title;
        document.head.appendChild(link);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Apply the configuration and parse the shortcuts
    //------------------------------------------------------------------------------------------------------------------

    function startApplication() {

        if ("undefined" !== typeof __SHORTYCUT_BODY_INNER_HTML) {
            document.body.innerHTML = __SHORTYCUT_BODY_INNER_HTML;
        }
        const self = window.location.href.replace(/[?#].*$/, '');
        document.body.innerHTML = document.body.innerHTML.replace(/self:\/\//g, self);

        initializeVariables();
        applyAndValidateConfig();

        if (!startupCache.config.length && !queryParameters.setup) {
            window.location.href = `${window.location.href.replace(/[#?].*$/, '')}?${QueryParameters.SETUP}=welcome`;
            return;
        }

        parseShortcuts(result => handleExceptions(displayError, () => {
            if (result instanceof Exception) {
                throw result;
            } else {
                if (queryParameters.facets.newTabs) {
                    const links = document.getElementsByTagName('a');
                    for (let index = 0; index < links.length; index++) {
                        const link = links.item(index);
                        if (link) {
                            link.target = '_blank';
                        }
                    }
                }
                faviconManager = new FaviconManager();
                redirector.processQuery();
            }
        }));
    }
}
