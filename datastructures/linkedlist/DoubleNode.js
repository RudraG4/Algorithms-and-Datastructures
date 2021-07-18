export default class DoubleNode {
  constructor(value, next = null, prev = null) {
    this.next = next;
    this.prev = prev;
    this.value = value;
  }

  toString() {
    return Object.prototype.toString.call(this.value) === "[object Object]" ? JSON.stringify(this.value) : this.value;
  }
}
