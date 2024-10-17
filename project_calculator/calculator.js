// Functions to perform basic arithmetic operations.
function add(number1, number2) {
    return parseFloat((number1 + number2).toFixed(9));
}

function subtract(number1, number2) {
    return parseFloat((number1 - number2).toFixed(9));
}

function multiply(number1, number2) {
    return parseFloat((number1 * number2).toFixed(9));
}

function divide(number1, number2) {
    if (number2 === 0) {
        return "Error: Division by zero";
    }
    return parseFloat((number1 / number2).toFixed(9));
}
function percentage(number) {
    return parseFloat((number / 100).toFixed(9));
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
const basicOperatorButtons = document.querySelectorAll(".basic-btn");

// Function to clear the display.
function clearDisplay() {
    display.textContent = "";
}

// Function to delete the last character from the display.
function deleteChar() {
    display.textContent = display.textContent.slice(0, -1);
}

// Function to append a character to the display.
function appendChar(char) {
    display.textContent += char;
}

// Function to calculate the result based on the current expression.
function calculate() {
    const expression = display.textContent;
    let regex = /(\d*.*\d+)([+\-*/])(\d*.*\d+)/;
    let match = expression.match(regex);
    if (match) {
        const number1 = parseFloat(match[1]);
        const operator = match[2];
        const number2 = parseFloat(match[3]);
        const result = operate(operator, number1, number2);
        return result;
    }
    
    regex = /(\d+)([+\-*/])(\d+)/;
    match = expression.match(regex);
    if (match) {
        const number1 = parseInt(match[1]);
        const operator = match[2];
        const number2 = parseInt(match[3]);
        const result = operate(operator, number1, number2);
        return result;
    }

    if (expression.includes("%")) {
        const number = parseFloat(expression);
        const result = percentage(number);
        return result;
    }

    return display.textContent;
}

// Function to handle button clicks.
function handleButtonClick(event) {
    const char = event.target.textContent;
    if (char === "C") {
        clearDisplay();
    } else if (char === "DEL") {
        deleteChar();
    } else if (char === "=") {
        const result = calculate();
        display.textContent = result;
    } else {
        appendChar(char);
    }
}

// Add event listener to all buttons.
buttons.addEventListener("click", handleButtonClick);

// Add event listener to basic operator buttons.
basicOperatorButtons.forEach(button => button.addEventListener("click", () => {
    const currentDisplay = display.textContent;
    if (/[+\-*/]/.test(currentDisplay)) {
        const result = calculate();
        display.textContent = result;
    } 
}));

// TODO: Add keyboard support.
// TODO: Erase numbers in display after one calculation.
// TODO: Pressing = before entering all of the numbers or an operator could cause problems!
// TODO: Other extra credit features.