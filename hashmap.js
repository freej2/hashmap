import LinkedList from "./linkedList.js";

class hashmap {

    constructor(capacity = 16, load_factor = 0){
        this.capacity = capacity;
        this.load_factor = load_factor;
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
     
        return hashCode;
      }
    
      set(key, value){

      }

      get(key){

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