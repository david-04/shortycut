namespace shortycut {

    type CallbackKey<R> = (key: string) => R;
    type CallbackKeyValue<T, R> = ((key: string, value: T) => R) | CallbackKey<T>;
    type CallbackKeyValueHashtable<T, R> = ((key: string, value: T, hashtable: Hashtable<T>) => R) | CallbackKeyValue<T, R>;
    type CallbackKeyHashtable<T, R> = ((key: string, hashtable: Hashtable<T>) => R) | CallbackKey<R>;
    type CallbackValue<T, R> = (value: T) => R;

    //------------------------------------------------------------------------------------------------------------------
    // A hashtable with helper methods to map and iterate over items
    //------------------------------------------------------------------------------------------------------------------

    export class Hashtable<T> {

        private data: { [index: string]: T } = {};

        //--------------------------------------------------------------------------------------------------------------
        // Add and retrieve items
        //--------------------------------------------------------------------------------------------------------------

        public get(key: string,) {
            return this.data[key];
        }

        public getOrDefault(key: string, defaultValue: T) {
            return this.data[key] ?? defaultValue;
        }

        public put(key: string, value: T) {
            this.data[key] = value;
        }

        public computeIfAbsent(key: string, supplier: (((key: string) => T) | (() => T))): T {
            return this.data[key] = this.data[key] ?? supplier(key);
        }

        public delete(key: string) {
            delete this.data[key];
        }

        //--------------------------------------------------------------------------------------------------------------
        // Retrieve keys, values and entries
        //--------------------------------------------------------------------------------------------------------------

        public get keys() {
            return Object.keys(this.data);
        }

        public get values() {
            return Object.keys(this.data).map(key => this.data[key]);
        }

        public get entries() {
            return Object.keys(this.data).map(key => ({ key, value: this.data[key] }));
        }

        public get size() {
            return this.keys.length;
        }

        //--------------------------------------------------------------------------------------------------------------
        // Apply operations to each key, value or entry
        //--------------------------------------------------------------------------------------------------------------

        public map<R>(callback: CallbackKeyValueHashtable<T, R>) {
            return this.entries.map(entry => callback(entry.key, entry.value, this));
        }

        public mapKeys<R>(callback: CallbackKeyHashtable<T, R>) {
            return this.keys.map(key => callback(key, this));
        }

        public mapValues<R>(callback: CallbackValue<T, R>) {
            return this.values.map(value => callback(value));
        }

        public forEach(callback: CallbackKeyValueHashtable<T, unknown>) {
            this.entries.forEach(entry => callback(entry.key, entry.value, this));
        }
    }
}
