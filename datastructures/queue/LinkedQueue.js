import LinkedList from "../linkedlist/LinkedList.js";

/**
 * Queue datastructure implemented using LinkedList
 */
export default class LinkedQueue {
  constructor (capacity = 20) {
    this.capacity = capacity;
    this.linkedList = new LinkedList();
  }

  isEmpty () {
    return !this.linkedList.head;
  }

  isFull () {
    return this.linkedList.size === this.capacity;
  }

  enqueue (value) {
    if (this.isFull()) {
      throw new Error("Queue Overflow");
    }

    this.linkedList.insertAtLast(value);
    return this;
  }

  dequeue () {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }

    const deletedQueueItem = this.linkedList.deleteHead();
    if (deletedQueueItem) return deletedQueueItem.value;
    return null;
  }

  peek () {
    return this.linkedList.getHead();
  }

  toString () {
    return this.linkedList.toString();
  }
}
