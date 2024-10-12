const selectionArea = document.querySelector('.selection-area');
const colorBtn = document.querySelector('#color');
const resizeBtn = document.querySelector('#resize');
const resetBtn = document.querySelector('#reset');
let isRGBMode = false;

const sketchArea = document.querySelector('.sketch-area');
const ROWS = 16;
const COLS = 16;

function getRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

colorBtn.addEventListener('click', () => {
    isRGBMode = !isRGBMode;
    // Change the text content of the button.
    colorBtn.textContent = isRGBMode? 'RGB OFF' : 'RGB ON';

    if (!isRGBMode) {
        // Set the color of all cells to black.
        for (let row of sketchArea.children) {
            for (let cell of row.children) {
                setCellStyle(cell);
            }
        }
    } else {
        // Set the color of all cells to random RGB values.
        for (let row of sketchArea.children) {
            for (let cell of row.children) {
                // Randomly generate a color for each cell, which is ugly.
                setCellStyle(cell, `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
            }
        }
    }
});

resizeBtn.addEventListener('click', () => {
    let row = prompt('Enter a number for row between 1 and 100 (inclusive).');
    let col = prompt('Enter a number for column between 1 and 100 (inclusive).');
    row = parseInt(row);
    col = parseInt(col);
    if (row < 1 || row > 100 || isNaN(row) || col < 1 || col > 100 || isNaN(col)) {
        alert('Invalid input. Please enter a number between 1 and 100 (inclusive).');
    } else {
        sketchArea.innerHTML = '';
        createGrid(row, col);
    }
});

resetBtn.addEventListener('click', () => {
    for (let row of sketchArea.children) {
        for (let cell of row.children) {
            cell.style.backgroundColor = 'transparent';
        }
    }
});

// Function to set a row of cells to a specific style.
function setRowStyle(row) {
    row.style.display = 'flex';
    row.style.flexDirection = 'row';
    row.style.alignItems = 'center';
    row.style.justifyContent = 'center';
    row.style.height = '100%';
    row.style.width = '100%';
    // I'll keep the gap here for reference. Will remove it later.
    // row.style.gap = '3px';
}

// Function to set cells in a row to a specific style.
function setCellStyle(cell, color='black') {
    cell.style.height = '100%';
    cell.style.width = '100%';
    cell.addEventListener('mouseover', () => {
        cell.style.backgroundColor = color;
    });
}

// Create 16x16 grid of square divs and append them to sketch area.
function createGrid(rows=ROWS, cols=COLS) {
    for (let row = 0; row < rows; row++) {
        const rowDiv = document.createElement('div');
        setRowStyle(rowDiv);
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            if (isRGBMode) {
                setCellStyle(cell, `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
            } else {
                setCellStyle(cell);
            }
            rowDiv.appendChild(cell);
        }
        sketchArea.appendChild(rowDiv);
    }
}

createGrid();