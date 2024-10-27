const instructions = document.querySelector("#instructions");
const startButton = document.querySelector("#start-btn");
const movesContainer = document.querySelector("#moves-container");
const movesPlayed = document.querySelector("#moves-played");
const playerScoreDom = document.querySelector("#player-score");
const computerScoreDom = document.querySelector("#computer-score");

// hide the game UI until the game is started
movesContainer.style.display = "none";
movesPlayed.style.display = "none";
playerScoreDom.style.display = "none";
computerScoreDom.style.display = "none";

function getComputerChoice() {
    const moves = new Array("Rock", "Paper", "Scissor");
    // All this...for a drop of blood
    const randomComputerMove = moves[Math.floor(Math.random() * moves.length)];

    return randomComputerMove;
}

function playRound(playerSelection, computerSelection) {
    if ((playerSelection === "Rock" && computerSelection === "Scissor") ||
        (playerSelection === "Paper" && computerSelection === "Rock") ||
        (playerSelection === "Scissor" && computerSelection === "Paper")) {
        return "Win";
    } else if (playerSelection == computerSelection) {
        return "Draw";
    } else {
        return "Lose";
    }
}

function startGame() {
    startButton.style.display = "none";
    movesContainer.style.display = "block";
    movesPlayed.style.display = "block";
    playerScoreDom.style.display = "block";
    computerScoreDom.style.display = "block";

    instructions.textContent = "Game has started! Please select a move.";
}

let playerScore = 0;
let computerScore = 0;

startButton.addEventListener('click', startGame);

movesContainer.addEventListener('click', (e) => {
    const playerSelection = e.target.textContent;
    const computerSelection = getComputerChoice();

    movesPlayed.textContent = `You played ${playerSelection} and computer played ${computerSelection}`

    roundResult = playRound(playerSelection, computerSelection);
    switch (roundResult) {
        case "Win":
            playerScore++;
            break;
        case "Lose":
            computerScore++;
            break;
        default:
            break;
    }

    playerScoreDom.textContent = `Player Score: ${playerScore}`;
    computerScoreDom.textContent = `Player Score: ${computerScore}`;

    if (playerScore === 5) {
        instructions.textContent = "Player has Won! Refresh the page to play again.";
    } else if (computerScore === 5) {
        instructions.textContent = "Computer has Won! Refresh the page to play again.";
    }
});
