// Functions to perform basic arithmetic operations.
function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    if (number2 === 0) {
        return "Error: Division by zero";
    }
    return number1 / number2;
}

function operate(operator, number1, number2) {
    switch (operator) {
        case "+":
            return add(number1, number2);
        case "-":
            return subtract(number1, number2);
        case "*":
            return multiply(number1, number2);
        case "/":
            return divide(number1, number2);
        default:
            return "Error: Invalid operator";
    }
}

const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");
const basicOperatorButtons = document.querySelectorAll(".basic-operator");
basicOperatorButtons.forEach(button => button.addEventListener("click", () => {
    if (display.textContent.contains("+") || display.textContent.contains("-") || display.textContent.contains("*") || display.textContent.contains("/")) {
        calculate();
        // appendChar(button.textContent);
    }
}));

function clearDisplay() {
    display.textContent = "";
}

function deleteChar() {
    display.textContent = display.textContent.slice(0, -1);
}

function appendChar(char) {
    display.textContent += char;
}

function calculate() {
    const expression = display.textContent;
    const regex = /(\d+)([+\-*/])(\d+)/;
    const match = expression.match(regex);
    if (match) {
        const number1 = parseInt(match[1]);
        const operator = match[2];
        const number2 = parseInt(match[3]);
        const result = operate(operator, number1, number2);
        display.textContent = result;
    }
}

function updateDisplay(event) {
    const char = event.target.textContent;
    if (char === "C") {
        clearDisplay();
    } else if (char === "DEL") {
        deleteChar();
    } else if (char === "=") {
        calculate();
    }
    // else {
    //     appendChar(char);
    // }
}