import BinaryTreeNode from "./BinaryTreeNode.js";

/**Binary Search Tree Implementation */
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
   * Deletes a value in the node
   * @param {*} value
   * @returns {Boolean} boolean
   */
  delete(value) {
    let current = this.root;
    while (current) {
      if (current.value === value) {
        let successor = null;
        if (current.left && current.right) { //Both child exists
          let tempNode = current.right;
          while (tempNode.left) {
            tempNode = tempNode.left; //Traverse far left of current right's node
          }

          current.left.parent = tempNode;
          tempNode.left = current.left;

          current.right.parent = current.parent;
          if (!current.parent) { //root node
            this.root = current.right; //Change the root node
            return true;
          }
          if (current.value > current.parent.value) {
            //Attach as parents' right child
            current.parent.right = current.left;
          } else {
            //Attach as parent's left child
            current.parent.left = current.right;
          }
          return true;
        } else if (current.left) {
          current.left.parent = current.parent;
          successor = current.left;
        } else if (current.right) {
          current.right.parent = current.parent;
          successor = current.right;
        }
        if (current.value > current.parent.value) {
          //Attach as parents' right child
          current.parent.right = successor;
        } else {
          //Attach as parent's left child
          current.parent.left = successor;
        }
        return true;
      }
      if ([value].join().localeCompare([current.value].join()) < 0) { //Traverse Left Child
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
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
