const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
      this.treeRoot = null; // корень bst
  }
  root() {
    return this.treeRoot
  }

  add(data) {
    let newNode = new Node(data);
    if (this.treeRoot === null) {
        this.treeRoot = newNode;
    } else {
        this.addNode(this.treeRoot, newNode); // helper method below
    }
  }
  addNode(node, newNode) {
      if (newNode.data < node.data) {
          if (node.left === null) {
              node.left = newNode;
          } else {
              this.addNode(node.left, newNode);
          }
      } else {
          if (node.right === null) {
              node.right = newNode;
          } else {
              this.addNode(node.right, newNode);
          }
      }
  }

  has(data) {
    let res = this.search(this.treeRoot, data)? true: false;
    return res
  }

  search(node, data) {
  // console.log(node, data)
    if (node === null) {
        return null;
    } else if (data < node.data) {
        return this.search(node.left, data);
    } else if (data > node.data) {
        return this.search(node.right, data);
    } else {
        return node;
    }
  }
  find(data) {
    return this.search(this.treeRoot, data)
  }

  // находит минимальный узел в дереве
  minNode(node) {
    // если слева от узла ноль тогда это должен быть минимальный узел
    if (node.left === null)
        return node;
    else
        return this.minNode(node.left);
  }
  remove(data) {
    this.treeRoot = this.removeNode(this.treeRoot, data); // helper method below
  }
  removeNode(node, data) {
    if (node === null) {
        return null;
    // если данные, которые нужно удалить, меньше, чем данные корня, переходим к левому поддереву
    } else if (data < node.data) {
        node.left = this.removeNode(node.left, data);
        return node;
    // если данные, которые нужно удалить, больше, чем данные корня, переходим к правому поддереву
    } else if (data > node.data) {
        node.right = this.removeNode(node.right, data);
        return node;
    // если данные такие как данные корня, удаляем узел
    } else {
        // удаляем узел без потомков (листовой узел (leaf) или крайний)
        if (node.left === null && node.right === null) {
            node = null;
            return node;
        }
        // удаляем узел с одним потомком
        if (node.left === null) {
            node = node.right;
            return node;
        } else if(node.right === null) {
            node = node.left;
            return node;
        }
        // удаляем узел с двумя потомками
        // minNode правого поддерева хранится в новом узле
        let newNode = this.minNode(node.right);
        node.data = newNode.data;
        node.right = this.removeNode(node.right, newNode.data);
        return node;
    }
  }
  min() {
      if (!this.treeRoot) {
      return null;
    }

    let node = this.treeRoot;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }
  max() {
    if (!this.treeRoot) {
      return null;
    }

    let node = this.treeRoot;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}
module.exports = {
  BinarySearchTree
};
// const tree = new BinarySearchTree();
//       tree.add(2);
//       tree.add(7);
//       tree.add(1);
//       tree.add(8);
//       tree.add(4);
//       tree.add(32);
//       tree.add(12);
//       tree.add(14);
// console.log(tree.has(8))
// tree.remove(8);
// console.log(tree.root())