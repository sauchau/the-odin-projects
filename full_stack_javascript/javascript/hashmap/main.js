class Entry {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.hash = this.hashKey(key);
    }

    hashKey(key) {
        return key === null ? 0 : (key.hashCode ? key.hashCode() : 0) ^ (key.toString().length);
    }

    equals(other) {
        if (this.hash !== other.hash) return false;
        return this.key === other.key;
    }

    toString() {
        return `${this.key} => ${this.value}`;
    }
}

class HashMap {
    constructor() {
        this.capacity = 3
        this.maxLoadFactor = 0.75
        this.threshold = Math.floor(this.capacity * this.maxLoadFactor);
        this.map = Array(this.capacity).fill(null);
        this.size = 0;
    }

    set(key, value) {
        if (key === null) throw new Error("key cannot be null");
        const newEntry = new Entry(key, value);
        const bucketIdx = this.normalizeIndex(newEntry.hash);
        return this.bucketInsertEntry(bucketIdx, newEntry);
    }

    get(key) {
        if (key === null) return null;
        const bucketIdx = this.normalizeIndex(this.hashKey(key));
        const entry = this.bucketSeekEntry(bucketIdx, key);
        return entry !== null ? entry.value : null;
    }

    has(key) {
        const bucketIdx = this.normalizeIndex(this.hashKey(key));
        return this.bucketSeekEntry(bucketIdx, key) !== null;
    }

    remove(key) {
        if (key === null) return null;
        const bucketIdx = this.normalizeIndex(this.hashKey(key));
        return this.bucketRemoveEntry(bucketIdx, key);
    }

    length() {
        return this.size;
    }

    clear() {
        this.map = Array(this.capacity).fill(null);
        this.size = 0;
    }

    keys() {
        const keys = [];
        for (const bucket of this.map) {
            if (bucket !== null) {
                for (const entry of bucket) {
                    keys.push(entry.key);
                }
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for (const bucket of this.map) {
            if (bucket !== null) {
                for (const entry of bucket) {
                    values.push(entry.value);
                }
            }
        }
        return values;
    }

    entries() {
        const entries = [];
        for (const bucket of this.map) {
            if (bucket !== null) {
                for (const entry of bucket) {
                    entries.push(entry);
                }
            }
        }
        return entries;
    }

    normalizeIndex(keyHash) {
        return (keyHash & 0x7FFFFFFF) % this.capacity;
    }

    hashKey(key) {
        return key === null ? 0 : (key.hashCode ? key.hashCode() : 0) ^ (key.toString().length);
    }

    bucketRemoveEntry(bucketIndex, key) {
        const entry = this.bucketSeekEntry(bucketIndex, key);
        if (entry !== null) {
            const bucket = this.map[bucketIndex];
            const index = bucket.indexOf(entry);
            bucket.splice(index, 1);
            this.size--;
            return true;
        }
        return false;
    }

    bucketInsertEntry(bucketIndex, entry) {
        let bucket = this.map[bucketIndex];
        if (bucket === null) {
            bucket = [];
            this.map[bucketIndex] = bucket;
        }

        const existentEntry = this.bucketSeekEntry(bucketIndex, entry.key);
        if (existentEntry === null) {
            bucket.push(entry);
            this.size++;
            if (this.size > this.threshold) this.resizemap();
            return null;
        } else {
            const oldVal = existentEntry.value;
            existentEntry.value = entry.value;
            return oldVal;
        }
    }

    bucketSeekEntry(bucketIndex, key) {
        const bucket = this.map[bucketIndex];
        if (bucket === null) return null;

        return bucket.find(entry => entry.key === key) || null;
    }

    resizemap() {
        this.capacity *= 2;
        this.threshold = Math.floor(this.capacity * this.maxLoadFactor);

        const newmap = Array(this.capacity).fill(null);

        for (let i = 0; i < this.map.length; i++) {
            const bucket = this.map[i];
            if (bucket !== null) {
                for (const entry of bucket) {
                    const bucketIndex = this.normalizeIndex(entry.hash);
                    let newBucket = newmap[bucketIndex];
                    if (newBucket === null) {
                        newBucket = [];
                        newmap[bucketIndex] = newBucket;
                    }
                    newBucket.push(entry);
                }
            }
        }

        this.map = newmap;
    }
}