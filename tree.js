import Node from "./node.js";
import mergeSortFunc from "./merge.js";

class Tree {
    constructor(array) {
        this.tree = this.buildTree(array);
    }

    buildTree(array) {
        if (array.length === 0) {
            return null;
        }
        array = this.filterSort(array);
        let mid = parseInt(array.length / 2);
        let root = new Node(array[mid]);

        root.left = this.buildTree(array.slice(0, mid));
        root.right = this.buildTree(array.slice(mid + 1));

        return root;
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    filterSort(array) {
        array = array.filter((value, index) =>
            array.indexOf(value) === index
        )
        return array = mergeSortFunc(array);
    }

    insert(value) {
        let current = this.tree;

        while (current.right || current.left) {
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        if (value < current.data) {
            current.left = new Node(value);
        } else {
            current.right = new Node(value);
        }
    }

    findValue(value) {
        let current = this.tree;

        while (current && current.data !== value) {
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        if (current === null) {
            console.log("Enter a valid number")
        }
        return current;
    }

    deleteItem(node, value) {
        if (node === null) {
            return node;
        }

        if (value < node.data) {
            node.left = this.deleteItem(node.left, value);
        } else if (value > node.data) {
            node.right = this.deleteItem(node.right, value);
        } else {
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }

            node.data = this.minValue(node.right);
            node.right = this.deleteItem(node.right, node.data)
        }
        return node;
    }

    minValue(node) {
        let value = node.data;
        while (node.left !== null) {
            value = node.left.data;
            node = node.left;
        }
        return value;
    }
}

let newTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// let myNode = newTree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
newTree.insert(400);
newTree.insert(500);
newTree.insert(450);
newTree.prettyPrint(newTree.tree);
newTree.deleteItem(newTree.tree, 67);
newTree.prettyPrint(newTree.tree);




