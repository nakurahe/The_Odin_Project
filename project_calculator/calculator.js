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
display.textContent = "";
const buttons = document.querySelectorAll(".btn");
const basicOperatorButtons = document.querySelectorAll(".basic-btn");

let lastActionWasCalculation = false;

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
    // If char is a digit and the last action was a calculation, clear the display.
    let regex = /\d/;
    let match = char.match(regex);
    if (match && lastActionWasCalculation) {
        clearDisplay();
    }

    regex = /[+\-*/%]$/;
    match = display.textContent.match(regex);
    if (match && regex.test(char)) {
        deleteChar();
    }

    // Other than that, append the character to the display and set lastActionWasCalculation to false.
    display.textContent += char;
    lastActionWasCalculation = false;
}

// Function to calculate the result based on the current expression.
function calculate() {
    const expression = display.textContent;
    // Check if the expression contains a decimal number, an operator, and another number.
    let regex = /(\d*.*\d+%*)([+\-*/])(\d*.*\d+%*)/;
    let match = expression.match(regex);
    if (match) {
        if (match[1].includes("%")) {
            match[1] = percentage(parseFloat(match[1].slice(0, -1)));
        }
        const number1 = parseFloat(match[1]);
        const operator = match[2];
        if (match[3].includes("%")) {
            match[3] = percentage(parseFloat(match[3].slice(0, -1)));
        }
        const number2 = parseFloat(match[3]);
        const result = operate(operator, number1, number2);
        return result;
    }

    // Check if the expression contains an integer, an operator, and another integer.
    regex = /(\d+%*)([+\-*/])(\d+%*)/;
    match = expression.match(regex);
    if (match) {
        if (match[1].includes("%")) {
            match[1] = percentage(parseFloat(match[1].slice(0, -1)));
        }
        const number1 = parseInt(match[1]);
        const operator = match[2];
        if (match[3].includes("%")) {
            match[3] = percentage(parseFloat(match[3].slice(0, -1)));
        }
        const number2 = parseInt(match[3]);
        const result = operate(operator, number1, number2);
        return result;
    }

    // If the expression contains a percentage, calculate it.
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
        if (display.textContent === "") {
            alert("Please enter an expression.");
            return;
        }
        const result = calculate();
        display.textContent = result;
        lastActionWasCalculation = true;
    } else if (char === ".") {
        let regex = /\.\d+$|\.$/;
        let match = display.textContent.match(regex);
        if (!match) {
            appendChar(char);
        }
    } else if (display.textContent === "" && (char === "%" || char === "*" || char === "/")) {
        alert("Please enter a number first.");
        return;
    } else if (!/.%$/.test(display.textContent)) {
        appendChar(char);
    } else {
        appendChar(char);
    }
}

// Add event listener to all buttons.
buttons.forEach(button => button.addEventListener('click', handleButtonClick));

// Add event listener to basic operator buttons.
basicOperatorButtons.forEach((button) =>
    button.addEventListener("click", () => {
        const currentDisplay = display.textContent;
        if (/[+\-*/]/.test(currentDisplay)) {
            const result = calculate();
            display.textContent = result;
            lastActionWasCalculation = false;
        }
    })
);

// TODO: Add keyboard support.
// TODO: Make it look nice.
