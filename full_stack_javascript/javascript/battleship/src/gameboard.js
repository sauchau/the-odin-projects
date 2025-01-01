import Ship from "./ship.js"

export default class Gameboard {
    N = 10
    board = Array(this.N).fill(Array(this.N).fill(0)).map(a => a.slice())
    placedShips = []

    getGameboard() { return this.board }

    resetGameboard() {
        this.board = Array(this.N).fill(Array(this.N).fill(0)).map(a => a.slice())
    }

    placeShip(x, y, length) {
        const direction = this.getValidDirection(x, y, length)
        const ship = new Ship(length)

        if (direction !== null) {
            this.placedShips.push(ship)
            switch (direction) {
                case "right":
                    for (let i = 0; i < length; i++) {
                        this.board[x][y + i] = ship
                    }
                    break;
                case "down":
                    for (let i = 0; i < length; i++) {
                        this.board[x + i][y] = ship
                    }
                    break;
                case "left":
                    for (let i = 0; i < length; i++) {
                        this.board[x][y - i] = ship
                    }
                    break;
                case "up":
                    for (let i = 0; i < length; i++) {
                        this.board[x - i][y] = ship
                    }
                    break;

                default:
                    break;
            }
        }
    }

    getValidDirection(x, y, length) {
        for (let i = 0; i < length; i++) {
            if ((y + i > this.N - 1) || (this.board[x][y + i] !== 0)) break
            if (i === length - 1) return "right"
        }
        for (let i = 0; i < length; i++) {
            if ((x + i > this.N - 1) || (this.board[x + i][y] !== 0)) break
            if (i === length - 1) return "down"
        }
        for (let i = 0; i < length; i++) {
            if ((y - i < 0) || (this.board[x][y - i] !== 0)) break
            if (i === length - 1) return "left"
        }
        for (let i = 0; i < length; i++) {
            if ((x - i < 0) || (this.board[x - i][y] !== 0)) break
            if (i === length - 1) return "up"
        }

        return null
    }

    receiveAttack(x, y) {
        if (this.board[x][y] instanceof Ship) {
            this.board[x][y].hit()
        } else {
            this.board[x][y] = -1
        }
    }

    allShipSunk() {
        for (let ship of this.placedShips) {
            if (!ship.isSunk()) return false
        }
        return true
    }

    displayBoard() {
        for (let i = 0; i < this.N; i++) {
            let row = ""
            for (let j = 0; j < this.N; j++) {
                if (this.board[i][j] !== 0) {
                    row += 'S '
                } else {
                    row += `${this.board[i][j]} `
                }
            }
            console.log(row)
        }
    }
}