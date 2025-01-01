import Gameboard from "./gameboard.js"

export default class Player {
    gameboard = new Gameboard()

    constructor(type) {
        this.type = type
    }
}