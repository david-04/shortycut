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
        // Analyse the query and redirect as required
        //--------------------------------------------------------------------------------------------------------------

        public processQuery() {

            const shortcut = shortcuts.get(queryParameters.keyword) || undefined;
            const setup = queryParameters.setup;
            const isHomepageKeyword = config.homepage.keywords.some(keyword => keyword === queryParameters.keyword);

            if (setup) {
                document.title = 'ShortyCut';
                this.showSetupPage(setup);
            } else if (shortcut) {
                this.redirectShortcut(shortcut);
            } else if (isUrl(queryParameters.fullQuery)) {
                this.openUrl(queryParameters.fullQuery, RedirectMode.ERASE_HISTORY);
            } else if (!queryParameters.keyword || !defaultSearchEngine || !config.defaultSearchEngine.useInAddressBar || isHomepageKeyword) {
                this.alwaysOpenNewTabs = queryParameters.facets.newTabs;
                this.showRedirectPage = false;
                document.title = 'ShortyCut';
                router.goto(pages.home.populate(
                    isHomepageKeyword
                        ? queryParameters.fullQuery.replace(/^\s*[^\s]+/, '').trim()
                        : queryParameters.fullQuery
                ));
                if (queryParameters.facets.noFocus) {
                    pages.home.removeFocus();
                }
            } else {
                defaultSearchEngine.replacePlaceholders(queryParameters.fullQuery);
                const links = defaultSearchEngine.queries?.current || defaultSearchEngine.bookmarks?.current;
                this.redirect(
                    assertNotNull(links),
                    OnMultiLink.OPEN_IN_NEW_TAB,
                    queryParameters.fullQuery,
                    RedirectMode.ERASE_HISTORY
                );
            }
        }

        private redirectShortcut(shortcut: Shortcut) {
            shortcut.replacePlaceholders(queryParameters.searchTerm);
            if (queryParameters.index && shortcut.all[queryParameters.index]) {
                this.redirect(
                    [shortcut.all[queryParameters.index].link],
                    OnMultiLink.OPEN_IN_NEW_TAB,
                    queryParameters.searchTerm,
                    RedirectMode.ERASE_HISTORY
                );
            } else if (shortcut.queries && (queryParameters.searchTerm || !shortcut.bookmarks)) {
                this.redirect(
                    shortcut.queries.current,
                    shortcut.queries.onMultiLink,
                    queryParameters.searchTerm,
                    RedirectMode.ERASE_HISTORY
                );
            } else if (shortcut.bookmarks) {
                this.redirect(
                    shortcut.bookmarks.current,
                    shortcut.bookmarks.onMultiLink,
                    queryParameters.searchTerm,
                    RedirectMode.ERASE_HISTORY
                );
            } else {
                throw new Exception('Internal error', 'Found no links to use for redirection');
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Open the selected link(s) or display the shortlist
        //--------------------------------------------------------------------------------------------------------------

        public redirect(links: Link[], onMultiLink: OnMultiLink, searchTerm: string, mode: RedirectMode) {

            links.forEach(link => link.replacePlaceholder(searchTerm));

            if (1 === links.length) {
                this.openLink(links[0], searchTerm, mode);
            } else if (onMultiLink === OnMultiLink.SHOW_MENU) {
                this.showRedirectPage = false;
                setTimeout(() => router.goto(pages.shortlist.populate(links, searchTerm)), 0);
            } else if (this.alwaysOpenNewTabs) {
                links.forEach(link => window.open(link.url));
                router.goBackToAndResetHomepage();
            } else {
                links.slice(1).forEach(link => window.open(link.url));
                this.openLink(links[0], searchTerm, mode);
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Open a link in the current tab
        //--------------------------------------------------------------------------------------------------------------

        private openLink(link: Link, searchTerm: string, mode: RedirectMode) {

            if (this.showRedirectPage) {
                router.goto(pages.redirect.populate(link));
            }

            if (link.postFields) {
                if (RedirectMode.NEW_TAB === mode || this.alwaysOpenNewTabs) {
                    this.openUrl(link.getHref(searchTerm), mode);
                } else {
                    this.submitForm(link);
                }
            } else {
                this.openUrl(link.url, mode);
            }
        }

        public openUrl(url: string, mode: RedirectMode) {

            if (RedirectMode.PRESERVE_HISTORY === mode && !this.alwaysOpenNewTabs) {
                window.location.href = url;
            } else if (RedirectMode.ERASE_HISTORY == mode && !this.alwaysOpenNewTabs) {
                window.location.replace(url);
            } else {
                window.open(url);
                if (this.alwaysOpenNewTabs) {
                    router.goBackToAndResetHomepage();
                }
            }
        }

        private submitForm(link: Link) {

            const form = document.createElement('form');
            form.action = link.url;
            form.method = 'post';
            form.style.display = 'none';

            for (const field of (link.postFields || [])) {
                const input = document.createElement('input');
                input.type = 'text';
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
