import Node from "./node.js";
import mergeSortFunc from "./merge.js";

class Tree {
    constructor() {
        this.node = null;
    }

    buildTree(array) {
        array = this.filterSort(array);
        if (array.length === 0) {
            return null;
        }
        let mid = Math.floor(array.length / 2);
        let root = new Node(array[mid]);

        this.root = root;

        root.left = this.buildTree(array.slice(0, mid - 1));
        root.right = this.buildTree(array.slice(mid + 1));

        return root;
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    filterSort(array) {
        array = array.filter((value, index) =>
            array.indexOf(value) === index
        )
        return array = mergeSortFunc(array);
    }
}

let newTree = new Tree;
newTree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
newTree.prettyPrint(newTree.node);
console.log(newTree.node);

console.log(newTree);



