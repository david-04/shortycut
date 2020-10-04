namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // Index page with a listing of all shortcuts
    //------------------------------------------------------------------------------------------------------------------

    export class Homepage implements Page {

        private readonly dom = {
            filter: document.querySelector('#home .input') as HTMLInputElement,
            home: document.querySelector('#home')!! as HTMLDivElement,
            suggestions: document.querySelector('#home .suggestions') as HTMLElement,
            headerRow: document.querySelector('#home > .row') as HTMLElement,
            rows: new Array<HTMLElement>(),
            notification: {
                self: document.querySelector('#home .notification') as HTMLElement,
                welcome: {
                    self: document.querySelector('#home .notification .welcome') as HTMLElement,
                    newTabs: document.querySelector('#home .notification .welcome .new-tabs') as HTMLElement,
                },
                applicationErrors: document.querySelector('#home .notification .application-errors') as HTMLElement,
                noShortcutsNoError: document.querySelector('#home .notification .no-shortcuts-no-error') as HTMLElement,
                errorWithBacktickSupport: document.querySelector('#home .notification .error-with-backtick-support') as HTMLElement,
                errorWithoutBacktickSupport: document.querySelector('#home .notification .error-without-backtick-support') as HTMLElement,
            }
        };

        private static readonly MAX_SUGGESTIONS = 12;
        private readonly filter = new Filter(Homepage.MAX_SUGGESTIONS);
        private suggestions = new Array<Suggestion>();
        private selectedIndex = -1;
        private originalInput = '';
        private previousInput?: string;
        private lastCancelClearFilterEvent: number = -1;
        private clearFilterJob?: number;

        //--------------------------------------------------------------------------------------------------------------
        // Initialize the page
        //--------------------------------------------------------------------------------------------------------------

        public constructor() {
            this.onKeyBody = this.onKeyBody.bind(this);
            this.onFilterChanged = this.onFilterChanged.bind(this);
            this.onFocusEvent = this.onFocusEvent.bind(this);
            this.clearFilter = this.clearFilter.bind(this);
            this.scheduleClearFilter = this.scheduleClearFilter.bind(this);
            this.cancelClearFilter = this.cancelClearFilter.bind(this);
            this.populateNotification();
        }

        public hasMenu() {
            return true;
        }

        //--------------------------------------------------------------------------------------------------------------
        // Populate the page
        //--------------------------------------------------------------------------------------------------------------

        public populate(query?: string) {
            this.dom.filter.value = query ?? '';
            this.previousInput = undefined;
            this.originalInput = '';
            this.dom.suggestions.innerHTML = '';
            this.selectSuggestion(-1);
            this.onFilterChanged();
            if (queryParameters.facets.noFocus) {
                this.dom.headerRow.classList.add('no-focus');
            }
            return this;
        }

        public populateNotification() {
            if (startupCache.initializationErrors.length) {
                this.dom.notification.applicationErrors.innerHTML = create('div.header',
                    1 === startupCache.initializationErrors.length
                        ? 'An error occurred during initialization'
                        : 'Errors occurred during initialization'
                ).outerHTML;
                startupCache.initializationErrors
                    .map(error => error.toHtml())
                    .forEach(element => this.dom.notification.applicationErrors.appendChild(element));
                this.dom.notification.applicationErrors.style.display = 'block';
            } else if (0 === shortcuts.size) {
                if (startupCache.exceptions.length) {
                    if (supportsBacktickSyntax()) {
                        this.dom.notification.errorWithBacktickSupport.style.display = 'block';
                    } else {
                        this.dom.notification.errorWithoutBacktickSupport.style.display = 'block';
                    }
                } else {
                    this.dom.notification.noShortcutsNoError.style.display = 'block';
                }
            } else if (isDemoMode()) {
                this.dom.notification.welcome.newTabs.style.display = queryParameters.facets.newTabs ? 'none' : 'block';
                this.dom.notification.welcome.self.style.display = 'block';
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Show and hide the page
        //--------------------------------------------------------------------------------------------------------------

        public show() {
            this.addEventHandlers();
            this.dom.home.style.display = 'flex';
            this.dom.filter.focus();
            this.updateFaviconManagerParameters(true);
        }

        public hide() {
            this.removeEventHandlers();
            this.dom.home.style.display = 'none';
            this.updateFaviconManagerParameters(false);
        }

        //--------------------------------------------------------------------------------------------------------------
        // Add and remove event handlers
        //--------------------------------------------------------------------------------------------------------------

        private addEventHandlers() {
            ['change', 'keydown', 'input'].forEach(event =>
                this.dom.filter.addEventListener(event, this.onFilterChanged)
            );
            ['focus', 'blur'].forEach(event =>
                [window, document, document.body, this.dom.filter].forEach(element =>
                    element.addEventListener(event, this.onFocusEvent)
                )
            );
            if (queryParameters.facets.noFocus) {
                ['mousedown', 'keydown', 'blur'].forEach(event =>
                    window.addEventListener(event, this.cancelClearFilter)
                );
                this.dom.filter.addEventListener('blur', this.scheduleClearFilter);
            }
            document.addEventListener('keydown', this.onKeyBody);
        }

        private removeEventHandlers() {
            ['change', 'keydown', 'input'].forEach(event =>
                this.dom.filter.removeEventListener(event, this.onFilterChanged)
            );
            ['focus', 'blur'].forEach(event =>
                [window, document, document.body, this.dom.filter].forEach(element =>
                    element.removeEventListener(event, this.onFocusEvent)
                )
            );
            if (queryParameters.facets.noFocus) {
                ['mousedown', 'keydown', 'blur'].forEach(event =>
                    window.removeEventListener(event, this.cancelClearFilter)
                );
                this.dom.filter.removeEventListener('blur', this.scheduleClearFilter);
            }
            document.removeEventListener('keydown', this.onKeyBody);
        }

        //--------------------------------------------------------------------------------------------------------------
        // Event handlers
        //--------------------------------------------------------------------------------------------------------------

        private onKeyBody(event: KeyboardEvent) {

            var isRightArrow = ('ArrowRight' === event.key || 'Right' === event.key)
                && 0 <= this.selectedIndex
                && (
                    this.suggestions[this.selectedIndex].hidesMoreChildren
                    || 'segment' === this.suggestions[this.selectedIndex].type
                );

            if (!queryParameters.facets.noFocus) {
                this.dom.filter.focus();
            }

            if ('Escape' === event.key || 'Esc' === event.key) {
                if (queryParameters.facets.noFocus) {
                    if (this.dom.filter.value) {
                        this.clearFilter();
                    } else {
                        this.removeFocus();
                    }
                } else {
                    this.clearFilter();
                }
                event.preventDefault();
                return false;
            } else if ('ArrowDown' === event.key || 'Down' === event.key) {
                this.selectSuggestion(this.selectedIndex + 1);
                event.preventDefault();
                return false;
            } else if ('ArrowUp' === event.key || 'Up' === event.key) {
                this.selectSuggestion(this.selectedIndex - 1);
                event.preventDefault();
                return false;
            } else if ('Enter' === event.key || isRightArrow) {
                const mode = event.ctrlKey ? RedirectMode.NEW_TAB : RedirectMode.PRESERVE_HISTORY;
                if (-1 === this.selectedIndex) {
                    this.redirect(mode);
                } else {
                    this.applySuggestion(mode, isRightArrow);
                }
                event.preventDefault();
                return false;
            } else if ('q' === event.key && event.ctrlKey) {
                this.dom.filter.focus();
            }
            return true;
        }

        private onFilterChanged() {

            if (this.dom.filter.value !== this.previousInput) {
                this.applyFilter();
                this.selectedIndex = -1;
            }
            return true;
        }

        private onFocusEvent() {
            if (!queryParameters.facets.noFocus) {
                setTimeout(() => this.dom.filter.focus(), 0);
            }
        }

        private cancelClearFilter() {
            if (this.clearFilterJob) {
                clearTimeout(this.clearFilterJob);
                this.clearFilterJob = undefined;
            }
            this.lastCancelClearFilterEvent = new Date().getTime();
        }

        private scheduleClearFilter() {
            if (100 <= new Date().getTime() - this.lastCancelClearFilterEvent) {
                this.clearFilterJob = setTimeout(this.clearFilter, 10);
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Clear or apply the current filter
        //--------------------------------------------------------------------------------------------------------------

        private clearFilter() {

            if (!queryParameters.facets.noFocus || this.dom.filter.value) {
                this.dom.filter.focus();
            }
            this.dom.filter.value = '';
            this.applyFilter();
        }

        private applyFilter(autoSelectFirstRow: boolean = false) {

            this.suggestions.length = 0;

            const input = this.dom.filter.value;
            const splitInput = input.split(/\s+/).filter(word => word);
            const keyword = adjustCase(splitInput[0] ?? '');
            const postKeywordInput = input.replace(/^\s*/, '').substr(keyword.length);

            if (keyword) {

                const shortcut = shortcuts.get(keyword);

                if (!postKeywordInput) {
                    this.suggestions.push(...this.filter.keywordSearch(keyword, postKeywordInput));
                } else if (shortcut) {
                    if (shortcut.queries && 1 < splitInput.length && shortcut.queries) {
                        this.suggestions.push(this.createSuggestion(shortcut, 'match', 'query'));
                    } else if (shortcut.bookmarks) {
                        this.suggestions.push(this.createSuggestion(shortcut, 'match', shortcut.type));
                    } else {
                        this.suggestions.push(this.createSuggestion(shortcut, 'match', 'query'));
                    }
                }
                if (!this.suggestions.length) {
                    this.suggestions.push(...this.filter.fullTextSearch(splitInput));
                }
            }

            this.suggestions.length = Math.min(Homepage.MAX_SUGGESTIONS, this.suggestions.length);
            this.displaySuggestions();
            this.previousInput = input;
            if (autoSelectFirstRow && 0 < this.suggestions.length) {
                this.selectedIndex = 0;
                this.dom.rows[0].classList.add('selected');
            } else {
                this.selectedIndex = -1;
                this.dom.headerRow.classList.add('selected');
            }

            this.dom.notification.self.style.display = 0 < this.suggestions.length || this.dom.filter.value.trim().length
                ? 'none'
                : 'block';
            this.updateInputFieldHighlight();
        }

        private createSuggestion(shortcut: Shortcut, type: SuggestionType, shortcutType: ShortcutType): Suggestion {

            const links = 'bookmark' === shortcutType ? shortcut.bookmarks! : shortcut.queries!;

            return {
                type,
                keyword: shortcut.keyword,
                keywordHtml: sanitize(shortcut.keyword),
                descriptionHtml: links.descriptionHtml,
                shortcutType,
                shortcut,
                hidesMoreChildren: false
            };
        }

        private displaySuggestions() {

            this.updateFaviconManagerParameters(true);
            this.dom.rows = this.suggestions.map((suggestion, index) =>
                create(`div.row.${suggestion.type}.${suggestion.shortcutType}`, [
                    create('div.cursor', create('img.icon', element => (element as HTMLImageElement).src = 'resources/arrow.svg')),
                    create('div.row-content', [
                        config.homepage.suggestions.showKeywords
                            ? create('div.keyword:html', suggestion.keywordHtml)
                            : '',
                        config.homepage.suggestions.showFavicons
                            ? faviconManager.getFavicon(suggestion.shortcut.all[0].link.urlForFavicon)
                            : '',
                        create('div.description:html', this.getDescription(suggestion))
                    ], rowContent => rowContent.addEventListener('click', (event: MouseEvent) => {
                        this.selectSuggestion(index);
                        this.applySuggestion(event.ctrlKey ? RedirectMode.NEW_TAB : RedirectMode.PRESERVE_HISTORY, false);
                    }))
                ])
            );
            this.dom.suggestions.innerHTML = '';
            this.dom.rows.forEach(row => this.dom.suggestions.appendChild(row));

            if (Homepage.MAX_SUGGESTIONS <= this.suggestions.length) {
                this.dom.suggestions.classList.add('truncated');
            } else {
                this.dom.suggestions.classList.remove('truncated');
            }
        }

        private getDescription(suggestion: Suggestion) {
            if (suggestion.hidesMoreChildren || suggestion.type === 'segment') {
                return create('div:html', [
                    suggestion.descriptionHtml,
                    ' ',
                    create('span.more-indicator-text:html',
                        `${Segments.SEPARATOR_HTML} ...`
                    ),
                    create('span.more-indicator-key:html',
                        create('span.key:html', '&rarr;'),
                        ' more'
                    )
                ]);
            } else {
                return suggestion.descriptionHtml;
            }
        }

        private updateInputFieldHighlight() {

            const hasInput = !!this.dom.filter.value.trim();
            const canUseSearchEngine = defaultSearchEngine && config.defaultSearchEngine.useOnHomepage;
            const focusOnSuggestion = this.selectedIndex != -1;
            const hasFullTextSearchSuggestions = !!this.suggestions.length;
            const hasMatches = !!this.suggestions.filter(suggestion => suggestion.type != 'search-result').length;

            if (!hasInput || canUseSearchEngine || focusOnSuggestion || hasMatches) {
                this.dom.filter.classList.remove('error');
                this.dom.filter.classList.remove('warning');
            } else if (hasFullTextSearchSuggestions) {
                this.dom.filter.classList.remove('error');
                this.dom.filter.classList.add('warning');
            } else {
                this.dom.filter.classList.add('error');
                this.dom.filter.classList.remove('warning');
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Select a suggestion via cursor up/down
        //--------------------------------------------------------------------------------------------------------------

        private selectSuggestion(index: number) {

            index = Math.min(Math.max(-1, index), this.suggestions.length - 1);

            if (index !== this.selectedIndex) {

                if (-1 === this.selectedIndex) {
                    this.originalInput = this.dom.filter.value;
                }

                (this.dom.rows[this.selectedIndex] ?? this.dom.headerRow).classList.remove('selected');
                this.selectedIndex = index;
                (this.dom.rows[this.selectedIndex] ?? this.dom.headerRow).classList.add('selected');

                if (-1 === this.selectedIndex) {
                    this.previousInput = this.dom.filter.value = this.originalInput;
                } else {
                    const suggestion = this.suggestions[this.selectedIndex];
                    const keyword = this.suggestions[this.selectedIndex].keyword;
                    if (suggestion.type !== 'segment' && suggestion.shortcutType !== 'bookmark') {
                        this.previousInput = `${keyword} `;
                    } else {
                        this.previousInput = keyword;
                    }
                    this.dom.filter.value = this.previousInput;
                }

                this.dom.filter.selectionStart = this.dom.filter.selectionEnd = this.dom.filter.value.length;
                this.updateInputFieldHighlight();
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Accept a suggestion via return key
        //--------------------------------------------------------------------------------------------------------------

        private applySuggestion(mode: RedirectMode, viaRightArrow: boolean) {

            const suggestion = this.suggestions[this.selectedIndex];
            const shortcut = suggestion.shortcut;

            if (suggestion.type === 'segment' || (viaRightArrow && suggestion.hidesMoreChildren)) {
                this.applyFilter(viaRightArrow && suggestion.hidesMoreChildren);
            } else if (suggestion.type === 'search-result') {
                if (suggestion.link?.type === 'query') {
                    const searchTerm = prompt('Search term')?.trim();
                    if (searchTerm) {
                        redirector.redirect([suggestion.link], suggestion.link.onMultiLink, searchTerm, mode);
                    }
                } else if (suggestion.link?.type === 'bookmark') {
                    redirector.redirect([suggestion.link], suggestion.link.onMultiLink, '', mode);
                }
            } else if (shortcut.bookmarks) {
                redirector.redirect(shortcut.bookmarks.current, shortcut.bookmarks.onMultiLink, '', mode);
            } else if (shortcut.queries) {
                const searchTerm = prompt('Search term')?.trim();
                if (searchTerm) {
                    redirector.redirect(shortcut.queries.current, shortcut.queries!.onMultiLink, searchTerm, mode);
                }
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Try to redirect based on the input
        //--------------------------------------------------------------------------------------------------------------

        private redirect(mode: RedirectMode) {

            const input = this.dom.filter.value.trim();
            const keyword = adjustCase(input.replace(/\s.*/, ''));
            const shortcut = shortcuts.get(keyword);
            let searchTerm: string | undefined = input.replace(/^[^\s]*\s*/, '');

            if (!shortcut?.bookmarks && shortcut?.queries && !searchTerm) {
                searchTerm = searchTerm || prompt('Search term')?.trim();
                if (!searchTerm) {
                    return;
                }
            }

            const links = shortcut?.queries && searchTerm ? shortcut?.queries : shortcut?.bookmarks;

            if (links) {
                if (1 < links.current.length && RedirectMode.NEW_TAB === mode) {
                    const url = window.location.href.replace(/[?#].*/, '');
                    const query = encodeURIComponent(`${keyword} ${searchTerm}`.trim());
                    redirector.openUrl(`${url}?${QueryParameters.QUERY}=${query}`, mode)
                } else {
                    redirector.redirect(links.current, links.onMultiLink, searchTerm, mode);
                }
            } else if (isUrl(input)) {
                redirector.openUrl(input, mode);
            } else if (defaultSearchEngine?.queries && config.defaultSearchEngine.useOnHomepage) {
                defaultSearchEngine.replacePlaceholders(input);
                redirector.redirect(defaultSearchEngine.queries.current, defaultSearchEngine.queries.onMultiLink, input, mode);
            } else if (this.suggestions.length) {
                this.selectedIndex = 0;
                this.applySuggestion(mode, false);
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Remove the focus from the input field
        //--------------------------------------------------------------------------------------------------------------

        public removeFocus() {
            setTimeout(() => this.dom.filter.blur(), 0);
        }

        //--------------------------------------------------------------------------------------------------------------
        // Update the favicon manager's list of currently displayed icons
        //--------------------------------------------------------------------------------------------------------------

        private updateFaviconManagerParameters(homepageIsVisible: boolean) {

            if (homepageIsVisible) {
                faviconManager.setCurrentlyDisplayedLinks(
                    this.suggestions.map(suggestion => suggestion.shortcut.all[0].link.urlForFavicon)
                );
                if (config.favicons.preloadOnStart) {
                    faviconManager.startPreload();
                }
            } else {
                faviconManager.removeCurrentlyDisplayedLinks();
            }
        }
    }
}
