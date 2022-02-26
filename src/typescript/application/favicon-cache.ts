namespace shortycut {

    //------------------------------------------------------------------------------------------------------------------
    // A cached favicon entry
    //------------------------------------------------------------------------------------------------------------------

    export class FaviconCacheEntry {
        public constructor(public fileName: string, public lastAccessed: number) { }
    }

    //------------------------------------------------------------------------------------------------------------------
    // Cached favicon origins
    //------------------------------------------------------------------------------------------------------------------

    export class FaviconCache {

        private static readonly LINE_SEPARATOR = '\n';
        private static readonly COLUMN_SEPARATOR = '\t';

        private storage?: Storage;
        private today = 0;
        private saveJobTimeout?: number;

        //--------------------------------------------------------------------------------------------------------------
        // cache
        // +- github.com
        // |  +- http => {'', 1234}
        // |  +- https => {'favicon.ico', 1234}
        // |  +- file:///c/ShortyCut/data/favicons => {'github.com.ico', 1234}
        // +- google.com
        //    +- http => {'favicon.png', 1234}
        //    +- file:///c/ShortyCut/data/favicons => {'', 1234}
        //--------------------------------------------------------------------------------------------------------------

        private cache = new Hashtable<Hashtable<FaviconCacheEntry>>();

        //--------------------------------------------------------------------------------------------------------------
        // Initialization
        //--------------------------------------------------------------------------------------------------------------

        public constructor() {

            this.deleteStorage = this.deleteStorage.bind(this);
            this.recalculateToday = this.recalculateToday.bind(this);
            this.saveCache = this.saveCache.bind(this);

            try {
                this.storage = config.favicons.rememberUrls ? localStorage : sessionStorage;
                if (!this.canWriteToStorage()) {
                    delete this.storage;
                }
            } catch (ignored) {
                delete this.storage;
            }

            this.recalculateToday();
            runAndIgnoreErrors(() => this.loadCache());
        }

        //--------------------------------------------------------------------------------------------------------------
        // Query and update favicon origins
        //--------------------------------------------------------------------------------------------------------------

        public get(domain: string, origin: string) {

            const cacheEntry = this.cache.get(domain)?.get(origin);
            if (cacheEntry) {
                if (cacheEntry.lastAccessed !== this.today) {
                    cacheEntry.lastAccessed = this.today;
                    this.scheduleSaveCache();
                }
            }
            return cacheEntry?.fileName;
        }

        public set(domain: string, origin: string, fileName: string) {

            this.cache.computeIfAbsent(domain, () => new Hashtable<FaviconCacheEntry>())
                .put(origin, new FaviconCacheEntry(fileName, this.today));
            this.scheduleSaveCache();
        }

        //--------------------------------------------------------------------------------------------------------------
        // Timestamp calculations
        //--------------------------------------------------------------------------------------------------------------

        private recalculateToday() {

            const epochMs = new Date().getTime();
            const msPerDay = 24 * 60 * 60 * 1000;
            this.today = Math.ceil(epochMs / msPerDay);
            setTimeout(this.recalculateToday, this.today * msPerDay - epochMs + 5 * 60 * 1000);
        }

        private deleteExpiredEntries(cache: Hashtable<Hashtable<FaviconCacheEntry>>) {

            cache.forEach((domain: string, origins: Hashtable<FaviconCacheEntry>) => {
                origins.forEach((origin: string, entry: FaviconCacheEntry) => {
                    if (14 < this.today - entry.lastAccessed) {
                        origins.delete(origin);
                    }
                });
                if (!origins.size) {
                    cache.delete(domain);
                }
            });
        }

        //--------------------------------------------------------------------------------------------------------------
        // Schedule the storage to be updated
        //--------------------------------------------------------------------------------------------------------------

        private scheduleSaveCache() {

            this.saveJobTimeout = this.saveJobTimeout ?? setTimeout(this.saveCache, 5 * 1000);
        }

        private cancelScheduledSaveJob() {

            if ('number' === typeof this.saveJobTimeout) {
                clearTimeout(this.saveJobTimeout);
                delete this.saveJobTimeout;
            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Read and update the browser storage as a serialized multiline string ("|" represents a tab)
        //
        // github.com|http||1234|https|favicon.ico|1234|file:///c/ShortyCut/data/favicons|github.com.ico|1234\n
        // google.com|http||1234|https|favicon.png|1234|file:///c/ShortyCut/data/favicons|google.com.png|1234
        //--------------------------------------------------------------------------------------------------------------

        private saveCache() {

            this.cancelScheduledSaveJob();
            try {
                this.deleteExpiredEntries(this.cache);
                this.writeStorage(this.serializeCache());
            } catch (exception) {
                runAndIgnoreErrors(this.deleteStorage);
                throw exception;
            }
        }

        private serializeCache() {

            return this.cache.map((domain: string, origins: Hashtable<FaviconCacheEntry>) => {
                const columns = [domain];
                origins.forEach((origin: string, entry: FaviconCacheEntry) => {
                    columns.push(origin);
                    columns.push(entry.fileName);
                    columns.push(`${entry.lastAccessed}`);
                })
                return columns.join(FaviconCache.COLUMN_SEPARATOR);
            }).join(FaviconCache.LINE_SEPARATOR);
        }

        private loadCache() {
            this.cache = this.deserializeCache(this.readStorage());
        }

        private deserializeCache(data: string) {

            const cache = new Hashtable<Hashtable<FaviconCacheEntry>>();
            const table = data.split(FaviconCache.LINE_SEPARATOR).map(line => line.split(FaviconCache.COLUMN_SEPARATOR));
            for (let index = 0; index < table.length; index++) {
                const row = table[index];
                if (1 === row.length % 3) {
                    const origins = cache.computeIfAbsent(row[0], () => new Hashtable<FaviconCacheEntry>());
                    for (let offset = 1; offset + 2 < row.length; offset += 3) {
                        origins.put(row[offset], new FaviconCacheEntry(row[offset + 1], parseInt(row[offset + 2])));
                    }
                } else {
                    return new Hashtable<Hashtable<FaviconCacheEntry>>();
                }
            }
            return cache;
        }

        //--------------------------------------------------------------------------------------------------------------
        // Reading and writing the storage
        //--------------------------------------------------------------------------------------------------------------

        private deleteStorage() {

            if (this.storage) {
                for (let index = 0; true; index++) {
                    const key = this.getStorageKey(index);
                    if (!this.storage.getItem(key)) {
                        break;
                    }
                    this.storage.removeItem(key);
                }
            }
        }

        private writeStorage(data: string) {

            if (this.storage) {
                this.deleteStorage();
                for (let index = 0, size = data.length; data; size = Math.min(Math.ceil(size / 2), data.length)) {
                    try {
                        for (; data; index++, size = Math.min(size, data.length)) {
                            this.storage.setItem(this.getStorageKey(index), data.substring(0, size));
                            data = data.substring(size);
                        }
                    } catch (exception) {
                        if (size < 100) {
                            throw exception;
                        }
                    }
                }
            }
        }

        private readStorage() {

            let result = '';
            let segment: string | null;
            if (this.storage) {
                for (let index = 0; segment = this.storage.getItem(this.getStorageKey(index)); index++) {
                    result += segment;
                }
            }
            return result;
        }

        private canWriteToStorage() {

            const key = this.getStorageKey(-1);
            const value = `${Math.random()}`;
            let canWrite = false;
            runAndIgnoreErrors(() => {
                if (this.storage) {
                    this.storage.setItem(key, value);
                    canWrite = value === this.storage.getItem(key);
                }
            });
            runAndIgnoreErrors(() => this.storage ? this.storage.removeItem(key) : void (0));
            return canWrite;
        }

        private getStorageKey(index: number) {
            return 'shortycut.favicon-cache' + (index ? `.${index}` : '');
        }
    }
}
