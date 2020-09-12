namespace shortycut {

    export class QueryParameters {

        public static readonly QUERY = 'q';
        public static readonly INDEX = 'i';
        public static readonly SETUP = 'setup';
        public static readonly FACETS = 'facets';

        public readonly queryParameters: ({ [index: string]: string })
        public readonly fullQuery: string;
        public readonly keyword: string;
        public readonly searchTerm: string;
        public readonly index?: number;
        public readonly setup?: string;
        public readonly facets = {
            newTabs: false,
            noFocus: false
        }

        //--------------------------------------------------------------------------------------------------------------
        // Initialize the redirector and extract the query parameters
        //--------------------------------------------------------------------------------------------------------------

        constructor() {

            this.queryParameters = this.getQueryParameters();

            this.fullQuery = (this.queryParameters[QueryParameters.QUERY] || '').replace(/\+/g, ' ');
            this.keyword = adjustCase(this.fullQuery).replace(/\s.*$/, '');
            this.searchTerm = this.fullQuery.replace(/^[^\s]+\s*/, '');
            this.index = (this.queryParameters[QueryParameters.INDEX] || '').match(/^[0-9]+$/)
                ? parseInt(this.queryParameters[QueryParameters.INDEX])
                : undefined;
            this.setup = this.queryParameters[QueryParameters.SETUP];
            (this.queryParameters[QueryParameters.FACETS] || '')
                .split(',')
                .map(facet => facet.trim().toLowerCase())
                .filter(facet => facet)
                .forEach(facet => this.applyFacet(facet));
        }

        private applyFacet(facet: string) {
            if ('new-tabs' === facet) {
                this.facets.newTabs = true;
            } else if ('no-focus' === facet) {
                this.facets.noFocus = true;
            } else {
                startupCache.initializationErrors.push(
                    new InitializationError(
                        create('div', 'Facet ', create('tt', facet), ' (in this page\'s address) is not supported')
                    )
                );
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Parse all query parameters into a key-value object
        //--------------------------------------------------------------------------------------------------------------

        private getQueryParameters() {

            const result: ({ [index: string]: string }) = {};

            if (window.location.search) {
                for (const parameter of window.location.search.trim().replace(/^\?/, '').trim().split('&')) {
                    const index = parameter.indexOf('=');
                    if (0 < index) {
                        const key = this.urlDecode(parameter.substr(0, index));
                        if (key) {
                            result[key] = this.urlDecode(parameter.substr(index + 1));
                        }
                    } else {
                        result[this.urlDecode(parameter)] = '';
                    }
                }
            }

            return result;
        }

        private urlDecode(value: string) {
            try {
                return decodeURIComponent(value).trim();
            } catch (error) {
                throw new Exception('URL syntax error',
                    create('p', 'A query parameter passed in the URL is not url-encoded:'),
                    create('p', value)
                );
            }
        }
    }
}
