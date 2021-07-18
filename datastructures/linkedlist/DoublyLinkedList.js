import DoubleNode from "./DoubleNode.js";

export default class DoublyLinkedList {

    constructor() {
        this.head = null;
        this.last = null;
        this.size = 0;
    }

    #isWithinBound(index) {
        return (index >= 0 && index < this.size);
    }

    /**
     * Inserts a new node at the beginning.
     * @param {*} value 
     * @returns DoublyLinkedList
     */
    insertAtHead(value) {
        const newNode = new DoubleNode(value);
        if (!this.head) {
            this.head = newNode;
            this.last = this.head;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
        return this;
    }

    /**
     * Insert a new node at the specified index
     * @param {*} value 
     * @param {number} index 
     * @returns DoublyLinkedList
     */
    insertAt(value, index) {
        if (!this.#isWithinBound(index)) {
            throw new Error("Index out of bound");
        }
        if (index == 0) {
            return this.insertAtHead(value);
        } else if (index == (this.size - 1)) {
            return this.insertAtLast(value);
        } else {
            let newNode = new DoubleNode(value);
            let previous, current = this.head, i = 0;
            while (i < index) {
                previous = current;
                current = current.next;
                i++;
            }
            newNode.next = current;
            newNode.prev = previous;
            current.prev = newNode;
            previous.next = newNode;
        }
        this.size++;
        return this;
    }

    /**
     * Appends a new node at the end of the DoublyLinkedList
     * @param {*} value 
     * @returns DoublyLinkedList
     */
    insertAtLast(value) {
        const newNode = new DoubleNode(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            this.last.next = newNode;
            newNode.prev = this.last;
        }
        this.last = newNode;
        this.size++;
        return this;
    }

    /**
     * Removes a node at the beginning and returns the removed node
     * @returns {DoubleNode} DoubleNode
     */
    deleteHead() {
        if (!this.head) return null;
        let deletedNode = this.head;
        this.head = this.head.next;
        if (this.head) {
            this.head.prev = null;
        }
        this.size--;
        return deletedNode;
    }

    /**
     * Removes a node at the specified index and returns a delete node. Throws error if index out of buund
     * @param {number} index 
     * @returns {DoubleNode} DoubleNode
     */
    deleteAt(index) {
        if (!this.#isWithinBound(index)) {
            throw new Error("Index out of bound");
        }
        if (index == 0) return this.deleteHead();
        if (index == this.size - 1) return this.deleteLast();
        let previous, current = this.head, deletedNode, i = 0;
        while (i < index) {
            previous = current;
            current = current.next;
            i++;
        }
        deletedNode = current;
        previous.next = current.next;
        current.next.prev = previous;
        this.size--;
        return deletedNode;
    }

    /**
     * Removed last node of the list. Returns deleted last node
     * @returns {DoubleNode} DoubleNode
     */
    deleteLast() {
        if (this.last == null) return null;
        let deletedNode;
        if (this.head == this.last) {
            deletedNode = this.head;
            this.head = null;
            this.last = this.head;
        } else {
            let previous, current = this.head;
            while (current && current.next) {
                previous = current;
                current = current.next;
            }
            current.prev = null;
            deletedNode = current;
            previous.next = null;
            this.last = previous;
        }
        this.size--;
        return deletedNode;
    }

    delete(value) {
        if (!this.head) return null;
        let deletedNode = null;
        let current = this.head;
        while (current) {
            if (current.value == value) {
                deletedNode = current;
                // Mid nodes
                if (current.next && current.prev) {
                    current.prev.next = current.next;
                    current.next.prec = current.prev;
                } else if (current == this.head) {
                    //Head node
                    this.head = this.head.next;
                    if (this.head)
                        this.head.prev = null;
                } else {
                    //Last Node
                    this.last = this.last.prev;
                    this.last.next = null;
                }
                this.size--;
                return deletedNode;
            }
            current = current.next;
        }
        return deletedNode;
    }

    /**
    * Empties the list
    */
    clearAll() {
        this.head = null;
        this.last = this.head;
        this.size = 0;
        return this;
    }

    /**
     * Search the doubly linked list for the value. Returns value and index if found.
     * @param {*} value 
     * @returns value, index
     */
    find(value) {
        if (!value || !this.head) return null;
        let current = this.head, i = 0;
        while (current) {
            if (current.value == value) return { value: current.value, index: i };
            current = current.next;
            i++;
        }
        return null;
    }

    /**
     * Find the node value at the specified index. Throws error if index out of bound.
     * @param {number} index 
     * @returns {*} value
     */
    getAt(index) {
        if (!this.#isWithinBound(index)) {
            throw new Error("Index out of bound");
        }
        if (!this.head) return null;
        if (index == this.size - 1) return this.last.value;
        let current = this.head, i = 0;
        while (i < index) {
            current = current.next;
            i++;
        }
        return current.value;
    }

    /**
     * Returns the value at the head if exists.
     * @returns {any} value
     */
    getHead() {
        if (!this.head) return null;
        return this.head.value;
    }

    /**
     * Returns the value at the last node if exists.
     * @returns {any} value
     */
    getLast() {
        if (!this.last) return null;
        return this.last.value;
    }

    /**
     * Reverse the DoublyLinkedList
     * @returns {DoublyLinkedList} DoublyLinkedList
     */
    reverse() {
        let current = this.head, previous = null, next = null;
        this.last = this.head;
        while (current) {
            next = current.next;
            current.prev = next;
            current.next = previous;
            previous = current;
            current = next;
        }
        this.head = previous;
        return this;
    }

    /**
     * Create a new DoublyLinkedList from an array list.
     * @param {*[]} list 
     * @returns {DoublyLinkedList} DoublyLinkedList
     */
    static from(list) {
        if (!list || Object.prototype.toString.call(list) != '[object Array]') {
            throw new Error("Expected arguments of type Array");
        }
        const newLinkedList = new DoublyLinkedList();
        list.forEach((value) => newLinkedList.insertAtLast(value));
        return newLinkedList;
    }

    toString() {
        let current = this.head;
        const nodes = [];
        while (current) {
            nodes.push(current);
            current = current.next;
        }
        return nodes.map((node) => node.toString()).toString();
    }
}