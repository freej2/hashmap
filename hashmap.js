import LinkedList from "./linkedList.js";

class HashMap {
    constructor(capacity = 16, load_factor = 0.75) {
        this.capacity = capacity;
        this.load_factor = load_factor;
        // Create array of buckets, each bucket will hold a LinkedList
        this.buckets = new Array(capacity).fill(null);
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

    has(key){

    }

    remove(key){

    }

    length(){

    }

    clear(){

    }

    keys(){

    }

    values(){

    }

    entries(){

    }
      
}