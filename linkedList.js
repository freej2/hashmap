import Node from "./Node.js";

export default class LinkedList {

    constructor(head = null, tail= null){
        this.head = head;
        this.tail = tail;
    }

    append(value){
        const newNode = new Node(value);
        if (this.head == null && this.tail == null){
            this.head = newNode;
            this.tail = newNode;
        }
        else if (this.head != null){
            this.tail.nextNode = newNode;
            this.tail = newNode;
        }
    }

    prepend(value){
        const newNode = new Node(value);
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

    insertAt(value, index) {
        if (index < 0) {
            throw new Error("Index cannot be negative");
        }
        
        let size = this.size();
        if (index > size) {
            throw new Error("Index out of bounds");
        }
    
        if (index === 0) {
            this.prepend(value);
            return;
        }
    
        if (index === size) {
            this.append(value);
            return;
        }
    
        const newNode = new Node(value);
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
}