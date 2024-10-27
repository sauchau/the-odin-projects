const screenInput = document.querySelector("#screen-input");
const screenOutput = document.querySelector("#screen-output");
const calcButtons = document.querySelector("#calc-buttons");
let operand1, operand2;
let operator;
let currentNumber = "";

function add(op1, op2) {
    return op1 + op2;
}

function subtract(op1, op2) {
    return op1 - op2;
}

function multiply(op1, op2) {
    return op1 * op2;
}

function divide(op1, op2) {
    return op2 !== 0 ? op1 / op2 : "To infinity and beyooooond!";
}

function operate(operator, operand1, operand2) {
    let operationResult;

    switch (operator) {
        case "+":
            operationResult = add(operand1, operand2);
            break;
        case "-":
            operationResult = subtract(operand1, operand2);
            break;
        case "*":
            operationResult = multiply(operand1, operand2);
            break;
        case "/":
            operationResult = divide(operand1, operand2);
            break;
        default:
            operationResult = "ERROR!";
            break;
    }

    return operationResult;
}

function isDigit(button) {
    return ((+button >= 0) && (+button <= 9));
}

function isOperator(button) {
    const operators = ["+", "-", "*", "/"];
    return operators.includes(button);
}

function resetCalculator() {
    screenInput.textContent = "";
    screenOutput.textContent = "=";
    currentNumber = "";
    operand1 = undefined;
    operand2 = undefined;
    operator = undefined;
}

calcButtons.addEventListener("click", (e) => {
    const clickedButton = e.target.textContent;

    if (isDigit(clickedButton)) {
        screenInput.textContent += clickedButton;
        currentNumber += clickedButton;
    } else if (clickedButton === "AC") {
        resetCalculator();
    } else if (clickedButton === "=") {
        operand2 = currentNumber;
        if ((operand1 !== undefined) && (operand2 !== undefined) && (operator !== undefined)) {
            screenOutput.textContent = `=${operate(operator, parseFloat(operand1), parseFloat(operand2))}`;
        }
    } else if (isOperator(clickedButton)) {
        if (screenInput.textContent === "") return;
        if (isOperator(screenInput.textContent[screenInput.textContent.length - 1])) return;

        operand2 = currentNumber;
        screenInput.textContent += clickedButton;
        if ((operand1 !== undefined) && (operand2 !== undefined)) {
            currentOperation = operate(operator, parseFloat(operand1), parseFloat(operand2))
            screenOutput.textContent = "=" + currentOperation;
            operand1 = currentOperation;
        } else {
            operand1 = operand2;
            screenOutput.textContent = "=" + operand1;
        }
        operator = clickedButton;
        currentNumber = "";
    } else if (clickedButton === ".") {
        if (!currentNumber.includes(".")) {
            currentNumber += ".";
            screenInput.textContent += ".";
        }
    }
});
