const SKETCHPAD_SIZE_PX = 800;
let gridSize = 33;

const gridSizeInput = document.querySelector("#grid-size");
const gridSizeButton = document.querySelector("#grid-size-input button");
const information = document.querySelector("#information");

const gridContainer = document.querySelector("#grid-container");
gridContainer.style.width = `${SKETCHPAD_SIZE_PX}px`;
gridContainer.style.height = `${SKETCHPAD_SIZE_PX}px`;

function getSquareDiv() {
    const squareDiv = document.createElement("div");
    squareDiv.style.width = `${(SKETCHPAD_SIZE_PX / gridSize)}px`;
    squareDiv.style.height = `${(SKETCHPAD_SIZE_PX / gridSize)}px`;

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    squareDiv.style.backgroundColor = `#${randomColor}`;

    squareDiv.style.opacity = 0;
    squareDiv.addEventListener("mouseover", (e) => {
        e.target.style.opacity = parseFloat(e.target.style.opacity) + 0.1;
    });

    return squareDiv;
}

function resetSketchPad(gridSize) {
    gridContainer.replaceChildren();

    for (let i = 0; i < (gridSize ** 2); i++) {
        gridContainer.appendChild(getSquareDiv());
    }
}

window.onload = resetSketchPad(gridSize);

gridSizeButton.addEventListener("click", () => {
    gridSize = +gridSizeInput.value;

    if ((gridSize > 100) || (gridSize < 1) || !(Number.isInteger(gridSize))) {
        information.textContent = "Invalid size. Please enter a whole number from 1 to 100.";
        gridSizeInput.focus();
        return;
    }

    resetSketchPad(gridSize);
    information.textContent = "";
});
