namespace shortycut {

    export enum RedirectMode {
        NEW_TAB,
        PRESERVE_HISTORY,
        ERASE_HISTORY
    }

    export class Redirector {

        private alwaysOpenNewTabs = false;
        private showRedirectPage = true;

        //--------------------------------------------------------------------------------------------------------------
        // Analyze the query and redirect as required
        //--------------------------------------------------------------------------------------------------------------

        public processQuery() {

            const shortcut = shortcuts.get(queryParameters.keyword) || undefined;
            const { setup, redirect } = queryParameters;
            const isHomepageKeyword = config.homepage.keywords.some(keyword => keyword === queryParameters.keyword);

            if (setup) {
                document.title = "ShortyCut";
                this.showSetupPage(setup);
            } else if (redirect) {
                this.processAuxiliaryRedirect(redirect);
            } else if (shortcut) {
                this.processShortcut(shortcut);
            } else if (isUrl(queryParameters.fullQuery)) {
                this.openUrl(queryParameters.fullQuery, RedirectMode.ERASE_HISTORY);
            } else if (!queryParameters.keyword
                || !defaultSearchEngine
                || !config.defaultSearchEngine.useInAddressBar
                || isHomepageKeyword) {
                this.openHomepage(isHomepageKeyword);
            } else {
                const links = defaultSearchEngine.getFinalizedLinks(queryParameters.fullQuery);
                this.redirect({ ...links, onMultiLink: OnMultiLink.OPEN_IN_NEW_TAB }, RedirectMode.ERASE_HISTORY);
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Redirect to the URL provided in the query parameter
        //--------------------------------------------------------------------------------------------------------------

        private processAuxiliaryRedirect(redirect: FinalizedUrlBase) {
            const { url, postFields } = redirect;
            const permalink = Link.constructFinalizedPermalink(url, postFields);
            const finalizedLinks = {
                onMultiLink: OnMultiLink.OPEN_IN_NEW_TAB,
                links: [{ htmlDescription: "", urls: [{ url, postFields, permalink }] }]
            };
            this.redirect(finalizedLinks, RedirectMode.ERASE_HISTORY);
        }

        //--------------------------------------------------------------------------------------------------------------
        // Display the homepage
        //--------------------------------------------------------------------------------------------------------------

        private openHomepage(isHomepageKeyword: boolean) {
            this.alwaysOpenNewTabs = queryParameters.facets.newTabs;
            this.showRedirectPage = false;
            document.title = "ShortyCut";
            const query = isHomepageKeyword
                ? queryParameters.fullQuery.replace(/^\s*[^\s]+/, "").trim()
                : queryParameters.fullQuery;
            router.goto(pages.home.populate(query));
            if (queryParameters.facets.noFocus) {
                pages.home.removeFocus();
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Process a shortcut by opening the links or rendering the shortlist
        //--------------------------------------------------------------------------------------------------------------

        private processShortcut(shortcut: Shortcut) {
            if (shortcut.queries && (queryParameters.searchTerm || !shortcut.bookmarks)) {
                this.redirect(shortcut.getFinalizedQueries(queryParameters.searchTerm), RedirectMode.ERASE_HISTORY);
            } else if (shortcut.bookmarks) {
                this.redirect(shortcut.getFinalizedBookmarks(), RedirectMode.ERASE_HISTORY);
            } else {
                throw new Exception("Internal error", "Found no links to use for redirection");
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Open the selected link(s) or display the shortlist
        //--------------------------------------------------------------------------------------------------------------

        public redirect(finalizedLinks: FinalizedLinks, mode: RedirectMode) {
            const urls = this.flattenUrls(finalizedLinks);
            const htmlDescription = finalizedLinks.links[0]?.htmlDescription ?? "";
            if (1 === urls.length) {
                this.openLink(htmlDescription, urls[0], mode);
            } else if (1 < finalizedLinks.links.length && finalizedLinks.onMultiLink === OnMultiLink.SHOW_MENU) {
                this.showRedirectPage = false;
                setTimeout(() => router.goto(pages.shortlist.populate(finalizedLinks)), 0);
            } else {
                if (this.alwaysOpenNewTabs) {
                    urls.forEach(link => window.open(link.permalink));
                    router.goBackToAndResetHomepage();
                } else {
                    urls.slice(1).forEach(link => window.open(link.permalink));
                    this.openLink(htmlDescription, urls[0], mode);
                }
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Flatten nested URLs
        //--------------------------------------------------------------------------------------------------------------

        private flattenUrls(finalizedLinks: FinalizedLinks) {
            const finalizedUrls = new Array<FinalizedUrl>();
            finalizedLinks.links.forEach(link => link.urls.forEach(url => finalizedUrls.push(url)));
            return finalizedUrls;
        }

        //--------------------------------------------------------------------------------------------------------------
        // Open a link in the current tab
        //--------------------------------------------------------------------------------------------------------------

        private openLink(htmlDescription: string, url: FinalizedUrl, mode: RedirectMode) {

            if (this.showRedirectPage) {
                router.goto(pages.redirect.populate(htmlDescription, url.url));
            }

            if (url.postFields) {
                if (RedirectMode.NEW_TAB === mode || this.alwaysOpenNewTabs) {
                    this.openUrl(url.permalink, mode);
                } else {
                    this.submitForm(url);
                }
            } else {
                this.openUrl(url.url, mode);
            }
        }

        public openUrl(url: string, mode: RedirectMode) {

            if (RedirectMode.PRESERVE_HISTORY === mode && !this.alwaysOpenNewTabs) {
                window.location.href = url;
            } else if (RedirectMode.ERASE_HISTORY === mode && !this.alwaysOpenNewTabs) {
                window.location.replace(url);
            } else {
                window.open(url);
                if (this.alwaysOpenNewTabs) {
                    router.goBackToAndResetHomepage();
                }
            }
        }

        private submitForm(link: FinalizedUrl) {

            const form = document.createElement("form");
            form.action = link.url;
            form.method = "post";
            form.style.display = "none";

            for (const field of (link.postFields || [])) {
                const input = document.createElement("input");
                input.type = "text";
                input.name = field.key;
                input.value = field.value;
                form.appendChild(input);
            }
            document.body.appendChild(form);
            form.submit();
        }

        //--------------------------------------------------------------------------------------------------------------
        // Show the setup
        //--------------------------------------------------------------------------------------------------------------

        public showSetupPage(mode: string) {

            if (pages.setup) {
                pages.setup.hide();
            }
            pages.setup.populate(mode).show();
        }
    }
}
