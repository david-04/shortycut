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

        private static readonly LINE_SEPARATOR = "\n";
        private static readonly COLUMN_SEPARATOR = "\t";

        private static readonly MIN_STORAGE_ITEM_SIZE = 100;
        private static readonly CACHE_EXPIRY_DAYS = 14;

        private static readonly MS_PER_SECOND = 1_000;
        private static readonly SECONDS_PER_MINUTE = 60;
        private static readonly MINUTES_PER_HOUR = 60;
        private static readonly HOURS_PER_DAY = 24;

        private static readonly MS_PER_MINUTE = FaviconCache.SECONDS_PER_MINUTE * FaviconCache.MS_PER_SECOND;
        private static readonly MS_PER_HOUR = FaviconCache.MINUTES_PER_HOUR * FaviconCache.MS_PER_MINUTE;
        private static readonly MS_PER_DAY = FaviconCache.HOURS_PER_DAY * FaviconCache.MS_PER_HOUR;

        private static readonly FIVE = 5;
        private static readonly MS_PER_FIVE_SECONDS = FaviconCache.FIVE * FaviconCache.MS_PER_SECOND;
        private static readonly MS_PER_FIVE_MINUTES = FaviconCache.FIVE * FaviconCache.MS_PER_MINUTE;

        private static readonly TWO = 2;

        private static readonly FILENAME_OFFSET = 1;
        private static readonly TIMESTAMP_OFFSET = 2;
        private static readonly COLUMNS_PER_ENTRY = 3;

        private readonly storage?: Storage;
        private today = 0;
        private saveJobTimeout?: number;

        //--------------------------------------------------------------------------------------------------------------
        // cache
        // +- github.com
        // |  +- http => {"", 1234}
        // |  +- https => {"favicon.ico", 1234}
        // |  +- file:///c/ShortyCut/data/favicons => {"github.com.ico", 1234}
        // +- google.com
        //    +- http => {"favicon.png", 1234}
        //    +- file:///c/ShortyCut/data/favicons => {"", 1234}
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
                const storage = config.favicons.rememberUrls ? localStorage : sessionStorage;
                if (this.canWriteToStorage()) {
                    this.storage = storage;
                }
            } catch (_ignored) { }

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
            const msPerDay = FaviconCache.MS_PER_DAY;
            this.today = Math.ceil(epochMs / msPerDay);
            setTimeout(this.recalculateToday, this.today * msPerDay - epochMs + FaviconCache.MS_PER_FIVE_MINUTES);
        }

        private deleteExpiredEntries(cache: Hashtable<Hashtable<FaviconCacheEntry>>) {

            cache.forEach((domain: string, origins: Hashtable<FaviconCacheEntry>) => {
                origins.forEach((origin: string, entry: FaviconCacheEntry) => {
                    if (FaviconCache.CACHE_EXPIRY_DAYS < this.today - entry.lastAccessed) {
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
            this.saveJobTimeout = this.saveJobTimeout ?? setTimeout(this.saveCache, FaviconCache.MS_PER_FIVE_SECONDS);
        }

        private cancelScheduledSaveJob() {

            if ("number" === typeof this.saveJobTimeout) {
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
                });
                return columns.join(FaviconCache.COLUMN_SEPARATOR);
            }).join(FaviconCache.LINE_SEPARATOR);
        }

        private loadCache() {
            this.cache = this.deserializeCache(this.readStorage());
        }

        private deserializeCache(data: string) {
            const cache = new Hashtable<Hashtable<FaviconCacheEntry>>();
            const table = data.split(FaviconCache.LINE_SEPARATOR)
                .map(line => line.split(FaviconCache.COLUMN_SEPARATOR));
            for (const row of table) {
                if (1 === row.length % FaviconCache.COLUMNS_PER_ENTRY) {
                    const origins = cache.computeIfAbsent(row[0], () => new Hashtable<FaviconCacheEntry>());
                    for (
                        let offset = 1;
                        offset + FaviconCache.COLUMNS_PER_ENTRY <= row.length;
                        offset += FaviconCache.COLUMNS_PER_ENTRY
                    ) {
                        origins.put(
                            row[offset],
                            new FaviconCacheEntry(
                                row[offset + FaviconCache.FILENAME_OFFSET],
                                parseInt(row[offset + FaviconCache.TIMESTAMP_OFFSET])
                            )
                        );
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
                for (let index = 0; ; index++) {
                    const key = this.getStorageKey(index);
                    if (!this.storage.getItem(key)) {
                        break;
                    }
                    this.storage.removeItem(key);
                }
            }
        }

        private writeStorage(data: string) {
            if (!this.storage) {
                return;
            }
            this.deleteStorage();
            let index = 0;
            let size = data.length;
            while (data) {
                try {
                    while (data) {
                        this.storage.setItem(this.getStorageKey(index), data.substring(0, size));
                        data = data.substring(size);
                        size = Math.min(size, data.length);
                        index++;
                    }
                } catch (exception) {
                    if (size < FaviconCache.MIN_STORAGE_ITEM_SIZE) {
                        throw exception;
                    }
                }
                size = Math.min(Math.ceil(size / FaviconCache.TWO), data.length);
            }
        }

        private readStorage() {
            let result = "";
            if (this.storage) {
                for (let index = 0, segment = this.storage.getItem(this.getStorageKey(index));
                    segment; segment = this.storage.getItem(this.getStorageKey(index - 1))) {
                    result += segment;
                    index++;
                }
            }
            return result;
        }


        private canWriteToStorage() {

            const key = this.getStorageKey(-1);
            const value = "0.8802878642890799";
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
            return "shortycut.favicon-cache" + (index ? `.${index}` : "");
        }
    }
}
