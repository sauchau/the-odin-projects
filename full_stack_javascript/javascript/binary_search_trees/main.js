class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array)
    }

    buildTree(array) {
        array = [...new Set(array)].sort((a, b) => a - b)

        const build = (arr) => {
            if (arr.length === 0) return null
            const mid = Math.floor(arr.length / 2)
            const node = new Node(arr[mid])
            node.left = build(arr.slice(0, mid))
            node.right = build(arr.slice(mid + 1))
            return node
        }

        return build(array)
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
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

    insert(value) {
        const insertNode = (node, value) => {
            if (value < node.data) {
                if (node.left === null) {
                    node.left = new Node(value)
                } else {
                    insertNode(node.left, value)
                }
            } else if (value > node.data) {
                if (node.right === null) {
                    node.right = new Node(value)
                } else {
                    insertNode(node.right, value)
                }
            }
        }

        insertNode(this.root, value)
    }

    deleteItem(value) {
        const deleteNode = (node, value) => {
            if (node === null) return null

            if (value < node.data) {
                node.left = deleteNode(node.left, value)
            } else if (value > node.data) {
                node.right = deleteNode(node.right, value)
            } else {
                if (node.left === null && node.right === null) {
                    return null
                }
                if (node.left === null) {
                    return node.right
                } else if (node.right === null) {
                    return node.left
                }
                let minNode = this.findMin(node.right)
                node.data = minNode.data
                node.right = deleteNode(node.right, minNode.data)
            }
            return node
        }
        this.root = deleteNode(this.root, value)
    }

    findMin(node) {
        while (node.left !== null) {
            node = node.left
        }
        return node
    }

    find(value) {
        let current = this.root
        while (current !== null) {
            if (value === current.data) {
                return current
            }
            if (value < current.data) {
                current = current.left
            } else {
                current = current.right
            }
        }
        return null
    }

    levelOrder(callback) {
        if (!callback) throw new Error("Callback function required")

        const queue = [this.root]
        while (queue.length > 0) {
            const node = queue.shift()
            callback(node)
            if (node.left != null) queue.push(node.left)
            if (node.right != null) queue.push(node.right)
        }
    }

    inOrder(callback) {
        if (!callback) throw new Error("Callback function required")

        const traverse = (node) => {
            if (node === null) return
            traverse(node.left)
            callback(node)
            traverse(node.right)
        }
        traverse(this.root)
    }

    preOrder(callback) {
        if (!callback) throw new Error("Callback function required")

        const traverse = (node) => {
            if (node === null) return
            callback(node)
            traverse(node.left)
            traverse(node.right)
        }
        traverse(this.root)
    }

    postOrder(callback) {
        if (!callback) throw new Error("Callback function required")

        const traverse = (node) => {
            if (node === null) return
            traverse(node.left)
            traverse(node.right)
            callback(node)
        }
        traverse(this.root)
    }

    height(node) {
        if (node === null) return -1
        const leftHeight = this.height(node.left)
        const rightHeight = this.height(node.right)
        return Math.max(leftHeight, rightHeight) + 1
    }

    depth(node) {
        let depth = 0
        let current = this.root
        while (current !== null && current !== node) {
            if (node.data, current.data) {
                current = current.left
            } else {
                current = current.right
            }
            depth++
        }
        return current === null ? -1 : depth
    }

    isBalanced() {
        const checkBalance = (node) => {
            if (node === null) return 0
            const leftHeight = checkBalance(node.left)
            const rightHeight = checkBalance(node.right)
            if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
                return -1
            }
            return Math.max(leftHeight, rightHeight) + 1
        }
        return checkBalance(this.root) !== -1
    }

    rebalance() {
        const array = []
        this.inOrder((node) => array.push(node.data))
        this.root = this.buildTree(array)
    }
}