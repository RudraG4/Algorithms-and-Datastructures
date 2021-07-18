import BinaryTreeNode from "./BinaryTreeNode.js";

/** Binary Search Tree Implementation */
export default class BinarySearchTree {
  constructor() {
    this.root = new BinaryTreeNode();
    this.height = 0;
  }

  /**
     * Insert a new node to the tree.
     * @param {*} value
     * @returns {BinaryTreeNode} node
     */
  insert(value) {
    return this.root.insert(value);
  }

  /**
     * Search the tree node for specific value. Returns the node matching the value.
     * @param {object} { filter: function, value: any }
     * @returns {BinaryTreeNode} node
     */
  find({ filter = null, value = null }) {
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

  /**
     * Returns the sibling node if exists
     * @param {*} value
     * @returns {BinaryTreeNode} node
     */
  findSibling(value) {
    const node = this.find({ value: value });
    if (node) { return node.getSibling(); }
    return null;
  }

  /**
     * Returns the distance of a node identified by its value from the root node.
     * @param {*} value
     * @returns {number} height
     */
  getDistance(value) {
    const node = this.find({ value: value });
    if (node) { return node.getHeight(); }
    return null;
  }

  /**
     * Traverse the tree in an order
     * @param {string} order - inorder, preorder, postorder
     * @returns {[]} list of node values traversed in a specified order.
     */
  traverse(order) {
    return this.root.toString(order);
  }
}
