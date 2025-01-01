export default class Ship {
    length
    hits = 0
    sunk = false

    constructor(length) {
        this.length = length
    }

    hit() {
        this.hits++

        if (this.length === this.hits) this.sunk = true
    }

    isSunk() {
        return this.sunk
    }
}