const playerForm = document.querySelector("#player-form")
const startGameBtn = document.querySelector("#start-game")
const playersInp = document.querySelectorAll("#player-form>div>input")
const playerLabels = document.querySelector("#player-labels")
const gameBoardEl = document.querySelector("#game-board")
const restartbtn = document.querySelector("#restart")
const outcomeText = document.querySelector("#game-outcome")

const gameBoard = (function () {
    let board = Array(9).fill("")

    const getBoardArray = () => board

    function updateBoard(pos, marker) {
        board[pos] = marker
    }

    function checkWinner() {
        // don't check for outcome until atleast 5 cells are filled
        let nFilled = 0
        for (let i = 0; i < board.length; i++) {
            if (!(board[i] === null || board[i] === undefined || board[i] === "")) {
                nFilled++
            }
        }
        if (nFilled < 5) return

        const criterias = [
            [0, 1, 2],
            [0, 3, 6],
            [6, 7, 8],
            [2, 5, 8],
            [3, 4, 5],
            [1, 4, 7],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let criteria of criterias) {
            if (board[criteria[0]] === board[criteria[1]] &&
                board[criteria[1]] === board[criteria[2]] &&
                (board[criteria[0]] === "X" || board[criteria[0]] === "O")) {
                return board[criteria[0]]
            }
        }
        if (!board.includes("")) {
            return "Draw"
        }
    }

    return { getBoardArray, updateBoard, checkWinner }
})()

const domInterations = (function () {
    function renderBoard(gameBoardArray) {
        for (let i = 0; i < gameBoardArray.length; i++) {
            gameBoardEl.children[i].innerHTML = gameBoardArray[i]
        }
    }

    function moveNotAllowed(pos) {
        gameBoardEl.children[pos].classList.add("flash")
        setTimeout(() => {
            gameBoardEl.children[pos].classList.remove("flash")
        }, 500);
    }

    function hideElement(el) {
        el.classList.add("hidden")
    }

    function showElement(el) {
        el.classList.remove("hidden")
    }

    function createPlayersLabels(name1, name2) {
        playerLabels.innerHTML = `${name1} : X  vs  ${name2} : O`
    }

    function showWinner(res) {
        if (res !== "Draw") {
            outcomeText.innerHTML = `Winner: ${res}`
        } else {
            outcomeText.innerHTML = res
        }
        showElement(outcomeText)
    }

    return { renderBoard, moveNotAllowed, hideElement, showElement, createPlayersLabels, showWinner }
})()

function Player(name, marker) {
    return { name, marker }
}

function Game() {
    function makeMove(pos, marker) {
        gameBoard.updateBoard(pos, marker)
        domInterations.renderBoard(gameBoard.getBoardArray())
        const winner = gameBoard.checkWinner()
        if (winner !== null && winner !== undefined) {
            domInterations.showWinner(winner)
        }
    }

    return { makeMove }
}

let game
let lastMove = ""

startGameBtn.addEventListener("click", () => {
    const player1 = Player(playersInp[0].value, "X")
    const player2 = Player(playersInp[1].value, "O")

    game = Game()

    // hide form after game start
    domInterations.hideElement(playerForm)

    // show game board after game start
    domInterations.createPlayersLabels(player1.name, player2.name)
    domInterations.showElement(playerLabels)
    domInterations.showElement(gameBoardEl)
    domInterations.showElement(restartbtn)
})

gameBoardEl.addEventListener("click", (e) => {
    clickedCell = Array.from(gameBoardEl.children).indexOf(e.target)

    if (gameBoard.getBoardArray()[clickedCell] === "X" || gameBoard.getBoardArray()[clickedCell] === "O") {
        domInterations.moveNotAllowed(clickedCell)
        return
    }

    let currMove
    if (lastMove === "X") {
        currMove = "O"
    } else if (lastMove === "O" || lastMove === "") {
        currMove = "X"
    }
    game.makeMove(clickedCell, currMove)
    lastMove = currMove
})

restartbtn.addEventListener("click", () => {
    location.reload()
})