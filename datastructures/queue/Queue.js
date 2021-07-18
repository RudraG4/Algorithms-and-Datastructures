import Stack from "../stack/Stack.js";

/**
 * Queue datastructure implemented using Stack datastructure
 */
export default class Queue {
  #stack1;
  #stack2;
  constructor (capacity = 20) {
    this.size = 0;
    this.capacity = capacity;
    this.#stack1 = new Stack(this.capacity);
    this.#stack2 = new Stack(this.capacity);
  }

  isEmpty () {
    return this.#stack1.isEmpty();
  }

  isFull () {
    return this.#stack1.isFull();
  }

  enqueue (value) {
    if (this.isFull()) {
      throw new Error("Queue Overflow");
    }

    while (!this.#stack1.isEmpty()) {
      this.#stack2.push(this.#stack1.pop());
    }

    this.#stack1.push(value);
    this.size++;

    while (!this.#stack2.isEmpty()) {
      this.#stack1.push(this.#stack2.pop());
    }
    return this;
  }

  dequeue () {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    const dequeuedItem = this.#stack1.pop();
    this.size--;
    return dequeuedItem;
  }

  peek () {
    return this.#stack1.peek();
  }

  toString () {
    return this.#stack1.toString();
  }
}
