import Node from "./node.js";

class Tree {
    addTreeNode(array, start, end) {
        if (start > end) {
            return null;
        }

        const mid = parseInt((start + end) / 2);

        new Node(array[mid]);
        this.addTreeNode(array, start, mid - 1);
        this.addTreeNode(array, mid + 1, end);

        return node;
    }
}

