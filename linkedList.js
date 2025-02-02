import Node from "./Node.js";

export default class LinkedList {

    constructor(head = null, tail= null){
        this.head = head;
        this.tail = tail;
    }

    append(key, value){
        const newNode = new Node(key, value);
        if (this.head == null && this.tail == null){
            this.head = newNode;
            this.tail = newNode;
        }
        else if (this.head != null){
            this.tail.nextNode = newNode;
            this.tail = newNode;
        }
    }

    prepend(key, value){
        const newNode = new Node(key, value);
        if (this.head == null && this.tail == null){
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.nextNode = this.head;
            this.head = newNode;
        }
    }

    size(){
        let i = 1;
        let currentNode = this.head;
        if (this.head == null){
            return 0
        }
        else{
            while(currentNode.nextNode != null){
                i++;
                currentNode = currentNode.nextNode;
            }
            return i;
        }

    }

    getHead(){
        return this.head;
    }

    getTail(){
        return this.tail;
    }

    at(index){
        let size = this.size();
        if (index>size){
            throw new Error("Index out of bounds");
        }
        if (index < 0) {
            throw new Error("Index cannot be negative");
        }
        else{
            let currentNode = this.head;
            if(index == 0){
                return this.head
            }
            for(let i = 0; i < index;i++){
                currentNode = currentNode.nextNode;
            }
            return currentNode;
        }
    }

    pop(){
        if(this.head == null){
            throw new Error("List is Empty");
        }
        else if(this.head == this.tail){
            this.head = null;
            this.tail = null;
        }
        else {
            let size = this.size();
            let newTail = this.at(size-2);
            this.tail = newTail;
            this.tail.nextNode = null;
        }
    }

    contains(value){
        let currentNode = this.head;
        for(let i = 0; i < this.size();i++){
            if(currentNode.value == value){
                return true;
            }
            currentNode = currentNode.nextNode;
        }
        return false;
    }

    find(value){
        let currentNode = this.head;
        for(let i = 0; i < this.size();i++){
            if(currentNode.value == value){
                return i;
            }
            currentNode = currentNode.nextNode;
        }
        return null;
    }

    toString(){
        let printString = "";
        let currentNode = this.head;
        for(let i = 0; i < this.size();i++){
            printString += "(" + currentNode.value + ")" + "->";
            currentNode = currentNode.nextNode;
        }
        printString += "null";
        return printString;
    }

    insertAt(key, value, index) {
        if (index < 0) {
            throw new Error("Index cannot be negative");
        }
        
        let size = this.size();
        if (index > size) {
            throw new Error("Index out of bounds");
        }
    
        if (index === 0) {
            this.prepend(key, value);
            return;
        }
    
        if (index === size) {
            this.append(key, value);
            return;
        }
    
        const newNode = new Node(key, value);
        const prevNode = this.at(index - 1);
        newNode.nextNode = prevNode.nextNode;
        prevNode.nextNode = newNode;
    }
    
    removeAt(index) {
        if (index < 0) {
            throw new Error("Index cannot be negative");
        }
    
        let size = this.size();
        if (index >= size) {
            throw new Error("Index out of bounds");
        }
    
        if (index === 0) {
            this.head = this.head.nextNode;
            if (size === 1) {
                this.tail = null;
            }
            return;
        }
    
        const prevNode = this.at(index - 1);
        if (index === size - 1) {
            prevNode.nextNode = null;
            this.tail = prevNode;
        } else {
            prevNode.nextNode = prevNode.nextNode.nextNode;
        }
    }

    findByKey(key) {
        let currentNode = this.head;
        while (currentNode !== null) {
            if (currentNode.key === key) {
                return currentNode;
            }
            currentNode = currentNode.nextNode;
        }
        return null;
    }
    
    upsert(key, value) {
        // Find existing node with this key
        let node = this.findByKey(key);
        if (node) {
            // Update value if key exists
            node.value = value;
        } else {
            // Append new node if key doesn't exist
            this.append(key, value);
        }
    }

    removeByKey(key){
        let currentNode = this.head;
        let prevNode = null;
        
        // Handle empty list
        if (!currentNode) {
            return;
        }
        
        // Handle head node containing key
        if (currentNode.key === key) {
            this.head = currentNode.nextNode;
            if (!this.head) {
                this.tail = null;
            }
            return;
        }
        
        // Search for node with matching key
        while (currentNode && currentNode.key !== key) {
            prevNode = currentNode;
            currentNode = currentNode.nextNode;
        }
        
        // Key not found
        if (!currentNode) {
            return;
        }
        
        // Remove the node
        prevNode.nextNode = currentNode.nextNode;
        
        // Update tail if we removed last node
        if (!prevNode.nextNode) {
            this.tail = prevNode;
        }
    }
}