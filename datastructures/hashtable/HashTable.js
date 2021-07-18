import LinkedList from "../linkedlist/LinkedList.js";

export default class HashTable {
    #keyMemory = {};
    #bucket = [];
    constructor(bucketSize = 32) {
      this.#bucket = new Array(bucketSize).fill(null).map(function() { return new LinkedList(); });
    }

    #getHashIndex(hashKey) {
      return parseInt(Math.abs(hashKey) % this.#bucket.length, 10);
    }

    #isValidKey(key) {
      return Object.prototype.toString.call(key) === "[object String]";
    }

    /**
     * Associate a key to the value. If a key already exists, updates its value
     * @param {string} key
     * @param {*} value
     * @returns `{ key, value }`
     */
    put(key, value) {
      if (!key || !value) { throw new Error("Key/Value should be non-null value."); }
      if (!this.#isValidKey(key)) { throw new Error("Key is expected to be of type String"); }
      const hashKey = this.hash(key);
      const hashIndex = this.#getHashIndex(hashKey);
      this.#keyMemory[key] = hashKey;
      const nodeData = { key, value };
      const node = this.#bucket[hashIndex].find({ filter: (node) => node.value.key === key });
      if (!node) {
        this.#bucket[hashIndex].insertAtLast(nodeData);
      } else {
        node.value.value = value;
      }
      return nodeData;
    }

    /**
     * Add a new key-value pair if a record with the key does not already exists in the hashtable.
     * @param {string} key
     * @param {*} value
     * @returns `{ key, value }` if record with key doesnot exists. null otherwise
     */
    putIfAbsent(key, value) {
      if (!key || !value) { throw new Error("Key/Value should be non-null value."); }
      if (!this.#isValidKey(key)) { throw new Error("Key is expected to be of type String"); }
      if (!this.#keyMemory[key]) {
        const nodeData = { key, value };
        const hashKey = this.hash(key);
        const hashIndex = this.#getHashIndex(hashKey);
        this.#keyMemory[key] = hashKey;
        this.#bucket[hashIndex].insertAtLast(nodeData);
        return nodeData;
      }
      return null;
    }

    /**
     * Copies all of the key-value from the specified keyValuePair to the hashtable.
     * The effect of this call is equivalent to that of calling put(k, v) on the hashtable once for each key k - value v.
     * @param {object} keyValuePair { key: value, key: value .. }
     */
    putAll(keyValuePair) {
      if (Object.prototype.toString.call(keyValuePair) !== "[object Object]") { throw new Error("Expected arguement of type [object Object]"); }
      for (const key in keyValuePair) {
        if (!this.#isValidKey(key)) { throw new Error("Key is expected to be of type String"); }
      }
      Object.keys(keyValuePair).forEach((key) => this.put(key, keyValuePair[key]));
    }

    /**
     * Retuns a list of keys in the hashtable.
     * @returns key list
     */
    keys() {
      return Object.keys(this.#keyMemory);
    }

    /**
     * Returns a list of value in the hashtable.
     * @returns list of values
     */
    values() {
      return this.#bucket.reduce((accumulator, linkedList) => {
        accumulator = accumulator.concat(linkedList.toArray().map((node) => node.value.value));
        return accumulator;
      }, []);
    }

    /**
     * Returns key-value pair matching the sspecified key if exists.
     * @param {string} key
     * @returns `{ key, value }`
     */
    get(key) {
      if (!this.#isValidKey(key)) { throw new Error("Key is expected to be of type String"); }
      const hashKey = this.hash(key);
      const hashIndex = this.#getHashIndex(hashKey);
      const node = this.#bucket[hashIndex].find({ filter: (node) => node.value.key === key });
      if (node) {
        return node.value;
      }
      return node;
    }

    /**
     * Returns a boolen value true if the key exists in the hastable. false otherwise
     * @param {string} key
     * @returns {boolean} true if hastable contains a specified key.
     */
    containsKey(key) {
      if (!this.#isValidKey(key)) { throw new Error("Key is expected to be of type String"); }
      return Object.hasOwnProperty.call(this.#keyMemory, key);
    }

    /**
     * Returns a boolen value true if the value exists in the hastable. false otherwise
     * @param {*} value
     * @returns {boolean} true if hastable contains a specified value.
     */
    containsValue(value) {
      return this.values().includes(value);
    }

    /**
     *
     * @param {string} key
     * @returns
     */
    remove(key) {
      if (!this.#isValidKey(key)) { throw new Error("Key is expected to be of type String"); }
      const hashKey = this.hash(key);
      const hashIndex = this.#getHashIndex(hashKey);
      const node = this.#bucket[hashIndex].find({ filter: (node) => node.value.key === key });
      if (node) {
        this.#bucket[hashIndex].delete(node.value);
      }
      return node;
    }

    /**
     * Hash function for uniformly distributing the hash key across the bucket
     * Stringfold hash function.
     * @param {*} key
     * @returns
     */
    hash(key) {
      const fourByteLength = Math.floor(key.length / 4);
      let sum = 0; let mult = 1; let current = 0;
      for (let i = 0; i < fourByteLength; i++) {
        mult = 1;
        for (let j = 0; j < 4; j++) {
          sum += key.charCodeAt(current) * mult;
          current++;
          mult *= 256;
        }
      }
      mult = 1;
      while (current < key.length) {
        sum += key.charCodeAt(current) * mult;
        current++;
        mult *= 256;
      }
      return sum;
    }

    toString() {
      return this.#bucket.reduce((accum, linkedList, index) => {
        accum[index] = linkedList.toString();
        return accum;
      }, {});
    }
}
