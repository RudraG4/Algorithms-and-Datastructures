import Node from "./Node.js";

export default class LinkedList {
  constructor () {
    this.head = null;
    this.last = this.head;
    this.size = 0;
  }

  isWithinBound (index) {
    return (index >= 0 && index < this.size);
  }

  /**
     * Inserts a new node at the beginning.
     * @param {*} value
     * @returns LinkedList
     */
  insertAtHead (value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.last = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size++;
    return this;
  }

  /**
     * Insert a new node at the specified index
     * @param {*} value
     * @param {number} index
     * @returns LinkedList
     */
  insertAt (value, index) {
    if (!this.isWithinBound(index)) {
      throw new Error("Index out of bound");
    }
    if (index === 0) {
      return this.insertAtHead(value);
    } else if (index === (this.size - 1)) {
      return this.insertAtLast(value);
    } else {
      const newNode = new Node(value);
      let previous; let current = this.head; let i = 0;
      while (i < index) {
        previous = current;
        current = current.next;
        i++;
      }
      newNode.next = current;
      previous.next = newNode;
    }
    this.size++;
    return this;
  }

  /**
     * Appends a new node at the end of the LinkedList
     * @param {*} value
     * @returns LinkedList
     */
  insertAtLast (value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      this.last.next = newNode;
    }
    this.last = newNode;
    this.size++;
    return this;
  }

  /**
     * Removes a node at the beginning and returns the removed node
     * @returns {Node} Node
     */
  deleteHead () {
    if (!this.head) return null;
    const deletedNode = this.head;
    if (!this.head.next) {
      this.head = null;
    } else {
      this.head = this.head.next;
    }
    this.size--;
    return deletedNode;
  }

  /**
     * Removes a node at the specified index and returns a delete node. Throws error if index out of buund
     * @param {number} index
     * @returns {Node} Node
     */
  deleteAt (index) {
    if (!this.isWithinBound(index)) {
      throw new Error("Index out of bound");
    }
    if (index === 0) return this.deleteHead();
    if (index === this.size - 1) return this.deleteLast();
    let previous;
    let current = this.head;
    let i = 0;
    while (i < index) {
      previous = current;
      current = current.next;
      i++;
    }
    const deletedNode = current;
    previous.next = deletedNode.next;
    this.size--;
    return deletedNode;
  }

  /**
     * Removed last node of the list. Returns deleted last node
     * @returns {Node} Node
     */
  deleteLast () {
    if (this.last == null) return null;
    let deletedNode;
    if (this.head === this.last) {
      deletedNode = this.head;
      this.head = null;
      this.last = this.head;
    } else {
      let previous; let current = this.head;
      while (current && current.next) {
        previous = current;
        current = current.next;
      }
      deletedNode = current;
      previous.next = null;
      this.last = previous;
    }
    this.size--;
    return deletedNode;
  }

  /**
     * Empties the list
     */
  clearAll () {
    this.head = null;
    this.last = this.head;
    this.size = 0;
    return this;
  }

  /**
     * Search the linked list for the value. Returns value and index if found.
     * @param {*} value
     * @returns value, index
     */
  find (value) {
    if (!value || !this.head) return null;
    let current = this.head; let i = 0;
    while (current) {
      if (current.value === value) return { value: current.value, index: i };
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
  getAt (index) {
    if (!this.isWithinBound(index)) {
      throw new Error("Index out of bound");
    }
    if (!this.head) return null;
    if (index === this.size - 1) return this.last.value;
    let current = this.head; let i = 0;
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
  getHead () {
    if (!this.head) return null;
    return this.head.value;
  }

  /**
     * Returns the value at the last node if exists.
     * @returns {any} value
     */
  getLast () {
    if (!this.last) return null;
    return this.last.value;
  }

  /**
     * Reverse the LinkedList
     * @returns LinkedList
     */
  reverse () {
    let current = this.head; let previous = null; let next = null;
    this.last = this.head;
    while (current) {
      next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }
    this.head = previous;
    return this;
  }

  /**
     * Create a new LinkedList out of an array list.
     * @param {*[]} list
     * @returns {LinkedList} LinkedList
     */
  static from (list) {
    if (!list || Object.prototype.toString.call(list) !== "[object Array]") {
      throw new Error("Expected arguments of type Array");
    }
    const newLinkedList = new LinkedList();
    list.forEach((value) => newLinkedList.insertAtLast(value));
    return newLinkedList;
  }

  toString () {
    let current = this.head;
    const nodes = [];
    while (current) {
      nodes.push(current);
      current = current.next;
    }
    return nodes.map((node) => node.toString()).toString();
  }
}
