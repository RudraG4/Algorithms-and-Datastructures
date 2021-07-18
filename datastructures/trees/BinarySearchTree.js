import BinaryTreeNode from "./BinaryTreeNode.js";

/** Binary Search Tree Implementation */
export default class BinarySearchTree {
  constructor () {
    this.root = new BinaryTreeNode();
    this.height = 0;
  }

  insert (value) {
    return this.root.insert(value);
  }

  find ({ filter = null, value = null }) {
    let current = this.root;
    while (current) {
      if ((Object.prototype.toString.call(filter) === "[object Function]" && filter(current)) ||
                (current.value === value)) {
        return current;
      } else {
        if ([value].join().localeCompare([current.value].join()) < 0) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
    }
    return null;
  }

  findSibling (value) {
    const node = this.find({ value: value });
    if (node) { return node.getSibling(); }
    return null;
  }

  traverse (order) {
    return this.root.toString(order);
  }
}
