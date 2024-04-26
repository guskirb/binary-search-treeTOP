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
                if (!current.left) {
                    break;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    break;
                }
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

    deleteItem(value) {
        let current = this.tree;

        while (current) {
            if (value > current.data) {
                current = current.right;
            } else if (value < current.data) {
                current = current.left;
            } else {
                break;
            }
        }

        let replace = current.right ? current.right : current.left;

        while (replace) {
            if (replace.data > value && replace.left) {
                replace = replace.left;
            } else if (replace.data < value && replace.right) {
                replace = replace.right;
            } else {
                break;
            }
        }

        let replaceParent = this.getParent(replace.data);

        current.data = replace.data;

        if (replaceParent.left && replaceParent.left.data === current.data) {
            if (!replaceParent.left.right && !replaceParent.left.left) {
                replaceParent.left = null;
            } else if (replaceParent.left.left !== null) {
                replaceParent.left = replaceParent.left.left;
            } else if (replaceParent.left.right) {
                replaceParent.left = replaceParent.left.right;
            }
        } else {
            if (!replaceParent.right.right && !replaceParent.right.left) {
                replaceParent.right = null;
            } else if (replaceParent.right.left !== null) {
                replaceParent.right = replaceParent.right.left;
            } else if (replaceParent.right.right) {
                replaceParent.right = replaceParent.right.right;
            }
        }
    }

    getParent(value) {
        let current = this.tree;
        let parent;

        while (current) {
            if (value > current.data) {
                if (current.right.data === value) {
                    parent = current;
                }
                current = current.right;
            } else if (value < current.data) {
                if (current.left.data === value) {
                    parent = current;
                }
                current = current.left;
            } else {
                break;
            }
        }
        return parent;
    }
}

let newTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

newTree.insert(400);
newTree.insert(500);
newTree.insert(450);
newTree.insert(350);
newTree.insert(325);
newTree.insert(320);
newTree.insert(323);
newTree.insert(6);
newTree.prettyPrint(newTree.tree);
newTree.deleteItem(3);
newTree.prettyPrint(newTree.tree);




