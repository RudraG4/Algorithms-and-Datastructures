export default class BinaryTreeNode {
  constructor (value, left = null, right = null) {
    this.left = left;
    this.value = value;
    this.right = right;
    this.parent = null;
    this.height = 0;
  }

  setLeft (node) {
    this.left = node;
    node.setParent(this);
  }

  setRight (node) {
    this.right = node;
    node.setParent(this);
  }

  setParent (node) {
    this.parent = node;
    this.height = this.parent.height + 1;
  }

  getHeight () {
    if (!this.parent) return 0;
    return this.height;
  }

  isLeaf () {
    return !this.right && !this.left;
  }

  getSibling () {
    if (!this.parent) return null;
    if (this.parent.left === this) {
      return this.parent.right;
    }
    return this.parent.left;
  }

  insert (value) {
    if (!this.value) {
      this.value = value;
      return this;
    }
    if ([value].join().localeCompare([this.value].join()) < 0) { // Traverse Left Child
      if (this.left) {
        return this.left.insert(value);
      }
      const leftNode = new BinaryTreeNode(value);
      this.setLeft(leftNode);
      return this;
    }
    if ([value].join().localeCompare([this.value].join()) > 0) { // Traverse Right Child
      if (this.right) {
        return this.right.insert(value);
      }
      const rightNode = new BinaryTreeNode(value);
      this.setRight(rightNode);
      return this;
    }
    return this; // Return current node if same.
  }

  /**
     * Traverse the tree in the order : Left -> Root -> Right recursively
     * @returns {[]} List of tree nodes in sorted ascending order traversed in Inorder traversal
     */
  traverseInOrder () {
    let orderList = [];

    if (this.left) { orderList = orderList.concat(this.left.traverseInOrder()); }

    orderList.push(this.value);

    if (this.right) { orderList = orderList.concat(this.right.traverseInOrder()); }

    return orderList;
  }

  /**
     * Traverse the tree in the order : Root -> Left -> Right recursively
     * @returns {[]} List of tree nodes traversed in Preorder traversal
     */
  traversePreOrder () {
    let orderList = [];

    orderList.push(this.value);

    if (this.left) { orderList = orderList.concat(this.left.traversePreOrder()); }

    if (this.right) { orderList = orderList.concat(this.right.traversePreOrder()); }

    return orderList;
  }

  /**
     * Traverse the tree in the order : Left -> Right -> Root recursively
     * @returns {[]} List of tree nodes traversed in Postorder traversal
     */
  traversePostOrder () {
    let orderList = [];

    if (this.left) { orderList = orderList.concat(this.left.traversePostOrder()); }

    if (this.right) { orderList = orderList.concat(this.right.traversePostOrder()); }

    orderList.push(this.value);

    return orderList;
  }

  toString (order = "inorder") {
    return order === "preorder" ? this.traversePreOrder() : order === "postorder" ? this.traversePostOrder() : this.traverseInOrder();
  }
}
