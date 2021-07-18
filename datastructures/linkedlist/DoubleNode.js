export default class DoubleNode {
  constructor (value, next = null, prev = null) {
    this.next = next;
    this.prev = prev;
    this.value = value;
  }

  toString () {
    return this.value;
  }
}
