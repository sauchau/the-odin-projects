class Node {
    constructor(value = null, nextNode = null) {
        this.value = value
        this.nextNode = nextNode
    }
}

class LinkedList {
    head = null
    tail = null
    size = 0

    append(value) {
        const newNode = new Node(value)

        if (this.size === 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            this.tail.nextNode = newNode
            this.tail = newNode
        }

        this.size++
    }

    prepend(value) {
        const newNode = new Node(value)

        if (this.size === 0) {
            newNode.nextNode = null
            this.head = newNode
            this.tail = newNode
        } else {
            newNode.nextNode = this.head
            this.head = newNode
        }

        this.size++
    }

    length() { return this.size }

    headNode() { return this.head }

    tailNode() { return this.tail }

    at(index) {
        let currNode = this.head
        for (let i = 0; i < index; i++) {
            currNode = currNode.nextNode
        }

        return currNode
    }

    pop() {
        let currNode = this.head
        for (let i = 0; i < this.size - 2; i++) {
            currNode = currNode.nextNode
        }

        this.tail = currNode
        this.tail.nextNode = null
        this.size--
    }

    popFirst() {
        this.head = this.head.nextNode
        this.size--
    }

    contains(value) {
        let currNode = this.head
        for (let i = 0; i < this.size; i++) {
            if (currNode.value === value) {
                return true
            }
            currNode = currNode.nextNode
        }

        return false
    }

    find(value) {
        let currNode = this.head
        for (let i = 0; i < this.size; i++) {
            if (currNode.value === value) {
                return i
            }
            currNode = currNode.nextNode
        }
        return null
    }

    toString() {
        let res = ""
        let currNode = this.head
        for (let i = 0; i < this.size; i++) {
            res += `( ${currNode.value} ) -> `
            currNode = currNode.nextNode
        }
        res += "null"

        return res
    }

    insertAt(value, index) {
        if (index === 0) {
            this.prepend(value)
            return
        } else if (index === this.size - 1) {
            this.append(value)
            return
        }

        let currNode = this.head
        for (let i = 0; i < index - 1; i++) {
            currNode = currNode.nextNode
        }

        const newNode = new Node(value)
        newNode.nextNode = currNode.nextNode
        currNode.nextNode = newNode

        this.size++
    }

    removeAt(index) {
        if (index === 0) {
            this.popFirst(value)
            return
        } else if (index === this.size - 1) {
            this.pop(value)
            return
        }

        let currNode = this.head
        for (let i = 0; i < index - 1; i++) {
            currNode = currNode.nextNode
        }

        const removedNode = currNode.nextNode
        currNode.nextNode = removedNode.nextNode

        this.size--
    }
}