import LinkedList from "./linkedList.js";

export default class HashMap {
    constructor(capacity = 16, load_factor = 0.75) {
        this.capacity = capacity;
        this.load_factor = load_factor;
        // Create array of buckets, each bucket will hold a LinkedList
        this.buckets = new Array(capacity).fill(null);
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
     
        return hashCode;
      }
    
    set(key, value) {
        const index = this.hash(key);
        // If no LinkedList exists at this bucket, create one
        if (!this.buckets[index]) {
            this.buckets[index] = new LinkedList();
        }

        if (this.size > this.capacity * this.load_factor){
            // Double the capacity
            this.capacity *= 2;
            
            // Store old buckets
            const oldBuckets = this.buckets;
            
            // Create new array with doubled size
            this.buckets = new Array(this.capacity).fill(null);
            
            // Rehash all existing entries
            for (let i = 0; i < oldBuckets.length; i++) {
                if (oldBuckets[i]) {
                    let currentNode = oldBuckets[i].getHead();
                    while (currentNode) {
                        // Rehash and insert each key-value pair into new buckets
                        const newIndex = this.hash(currentNode.key);
                        if (!this.buckets[newIndex]) {
                            this.buckets[newIndex] = new LinkedList();
                        }
                        this.buckets[newIndex].append(currentNode.key, currentNode.value);
                        currentNode = currentNode.nextNode;
                    }
                }
            }
        }

        
        // Let the LinkedList handle storing/updating the key-value pair
        this.buckets[index].upsert(key, value);
    }

    get(key) {
        const index = this.hash(key);
        // If no LinkedList at this bucket, key doesn't exist
        if (!this.buckets[index]) {
            return null;
        }
        // Let LinkedList find the node with this key
        const node = this.buckets[index].findByKey(key);
        return node ? node.value : null;
    }

    has(key) {
        const index = this.hash(key);
        if (!this.buckets[index]) {
            return false;
        }
        // Check if key exists in the bucket
        return this.buckets[index].findByKey(key) !== null;
    }

    remove(key) {
        const index = this.hash(key);
        if (this.has(key)) {
            this.buckets[index].removeByKey(key);  // Pass the key!
            this.size--;
            return true;
        }
        return false;
    }

    length() {
        let count = 0;
        for (let i = 0; i < this.capacity; i++) {
            if (this.buckets[i]) {
                count += this.buckets[i].size();
            }
        }
        return count;
    }

    clear(){
        for(let i = 0; i < this.capacity; i++){
            this.buckets[i] = null;
        }
        this.size = 0;
    }

    keys() {
        const keys = [];
        for (let i = 0; i < this.capacity; i++) {
            if (this.buckets[i]) {
                // Start at the head of the LinkedList
                let currentNode = this.buckets[i].head;
                // Traverse the LinkedList
                while (currentNode !== null) {
                    keys.push(currentNode.key);
                    currentNode = currentNode.nextNode;
                }
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for (let i = 0; i < this.capacity; i++) {
            if (this.buckets[i]) {
                let currentNode = this.buckets[i].head;
                while (currentNode !== null) {
                    values.push(currentNode.value);
                    currentNode = currentNode.nextNode;
                }
            }
        }
        return values;
    }

    entries() {
        const entries = [];
        for (let i = 0; i < this.capacity; i++) {
            if (this.buckets[i]) {
                let currentNode = this.buckets[i].head;
                while (currentNode !== null) {
                    entries.push([currentNode.key, currentNode.value]);
                    currentNode = currentNode.nextNode;
                }
            }
        }
        return entries;
    }
      
}