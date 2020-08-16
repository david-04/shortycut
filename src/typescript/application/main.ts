declare var __SHORTYCUT_BODY_INNER_HTML: string;

namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // Register event listeners
    //------------------------------------------------------------------------------------------------------------------

    export function initialize() {

        window.addEventListener('error', (exception) => { startupCache.exceptions.push(exception); });

        window.addEventListener('DOMContentLoaded', () => {

            document.title = 'ShortyCut';
            ['icon', 'shortcut icon'].forEach(rel => addLink(rel, 'image/x-icon', 'resources/favicon.ico', ''));
            addLink('search', 'application/opensearchdescription+xml', 'data/search.xml', 'ShortyCut');
        });

        window.addEventListener('load', () => handleExceptions(displayError, startApplication));
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

        shortycut.initializeVariables();
        applyAndValidateConfig();

        if (!startupCache.config.length && !queryParameters.setup) {
            window.location.href = `${window.location.href.replace(/[#?].*$/, '')}?${QueryParameters.SETUP}=welcome`;
            return;
        }

        parseShortcuts(result => handleExceptions(displayError, () => {
            if (result instanceof Exception) {
                throw result;
            } else {
                redirector.processQuery();
            }
        }));
    }
}
