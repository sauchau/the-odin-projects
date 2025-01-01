import Player from "./player.js"
import View from "./view.js"

const player1 = new Player("player1")
const player2 = new Player("player2")

const view = new View()

let currentTurn = "player1"

document.addEventListener("DOMContentLoaded", () => {
    randomizeShipPlacements()
    addEventListeners()
    updateTurnRemark()
})

function disableBoardNotInTurn() {
    const gb1 = document.querySelector("#player1-gameboard-container div:first-child")
    const gb2 = document.querySelector("#player2-gameboard-container div:first-child")

    switch (currentTurn) {
        case "player1":
            view.removeInteractivityFromElement(gb1)
            view.addInteractivityFromElement(gb2)
            break
        case "player2":
            view.removeInteractivityFromElement(gb2)
            view.addInteractivityFromElement(gb1)
            break
    }
}

function addEventListeners() {
    const gameboards = document.querySelectorAll(".gameboard")
    gameboards.forEach(element => {
        element.addEventListener("click", (e) => handleBoardClick(e))
    })

    const randomizeBtn = document.querySelector("#randomize")
    randomizeBtn.addEventListener("click", () => restartGame())

    const restartBtn = document.querySelector("#restart")
    restartBtn.addEventListener("click", () => restartGame())
}

function handleBoardClick(e) {
    const cellIndex = Array.prototype.indexOf.call(e.target.parentElement.children, e.target)
    const x = Math.floor(cellIndex / 10)
    const y = cellIndex % 10

    if (e.target.classList.contains('attacked')) {
        return
    }

    if (currentTurn === 'player1') {
        player2.gameboard.receiveAttack(x, y)
        e.target.classList.remove('not-attacked')
        e.target.classList.add('attacked')

        currentTurn = "player2"
    } else {
        player1.gameboard.receiveAttack(x, y)
        e.target.classList.remove('not-attacked')
        e.target.classList.add('attacked')

        currentTurn = "player1"
    }

    disableBoardNotInTurn()
    updateTurnRemark()

    checkIfAnyoneWon()
}

function randomizeShipPlacements() {
    player1.gameboard.resetGameboard()
    player2.gameboard.resetGameboard()

    for (let i = 0; i < 6; i++) {
        const x = getRandomIntInclusive(0, 9)
        const y = getRandomIntInclusive(0, 9)
        player1.gameboard.placeShip(x, y, i + 1)
    }
    for (let i = 0; i < 6; i++) {
        const x = getRandomIntInclusive(0, 9)
        const y = getRandomIntInclusive(0, 9)
        player2.gameboard.placeShip(x, y, i + 1)
    }

    view.createPlayerBoard(player1)
    view.createPlayerBoard(player2)

    currentTurn = "player1"

    disableBoardNotInTurn()
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

function updateTurnRemark() {
    const el = document.querySelector("#turn-remark")
    el.textContent = `${currentTurn[0].toUpperCase()}${currentTurn.slice(1, -1)} ${currentTurn.slice(-1)} turn`
}

function checkIfAnyoneWon() {
    const el = document.querySelector("#turn-remark")
    const gb1 = document.querySelector("#player1-gameboard-container div:first-child")
    const gb2 = document.querySelector("#player2-gameboard-container div:first-child")

    if (player1.gameboard.allShipSunk()) {
        el.textContent = "Player 2 Won"
        el.className = "won-effect"
        view.removeInteractivityFromElement(gb1)
        view.removeInteractivityFromElement(gb2)
    } else if (player2.gameboard.allShipSunk()) {
        el.textContent = "Player 1 Won"
        el.className = "won-effect"
        view.removeInteractivityFromElement(gb1)
        view.removeInteractivityFromElement(gb2)
    }
}

function restartGame() {
    location.reload()
}