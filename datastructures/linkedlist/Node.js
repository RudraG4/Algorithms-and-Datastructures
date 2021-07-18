export default class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  toString() {
    return Object.prototype.toString.call(this.value) === "[object Object]" ? JSON.stringify(this.value) : this.value;
  }
}
