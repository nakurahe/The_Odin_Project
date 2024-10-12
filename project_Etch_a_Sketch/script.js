const selectionArea = document.querySelector('.selection-area');
const colorBtn = document.querySelector('#color');
colorBtn.addEventListener('click', () => {
    // Change the text content of the button.
    colorBtn.textContent = colorBtn.textContent === 'RGB ON' ? 'RGB OFF' : 'RGB ON';

    if (colorBtn.textContent === 'RGB ON') {
        // Set the color of all cells to black.
        for (let row of sketchArea.children) {
            for (let cell of row.children) {
                setCellStyle(cell);
            }
        }
    } else if (colorBtn.textContent === 'RGB OFF') {
        // Set the color of all cells to random RGB values.
        for (let row of sketchArea.children) {
            for (let cell of row.children) {
                // Randomly generate a color for each cell, which is ugly.
                setCellStyle(cell, `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
            }
        }
    }
});


const resizeBtn = document.querySelector('#resize');
resizeBtn.addEventListener('click', () => {
    let input = prompt('Enter a number between 1 and 100 (inclusive).');
    input = parseInt(input);
    if (input < 1 || input > 100 || isNaN(input)) {
        alert('Invalid input. Please enter a number between 1 and 100 (inclusive).');
    } else {
        sketchArea.innerHTML = '';
        createGrid(input);
    }
});

const resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', () => {
    for (let row of sketchArea.children) {
        for (let cell of row.children) {
            cell.style.backgroundColor = 'transparent';
        }
    }
});

const ROWS = 16;
const COLS = 16;
const sketchArea = document.querySelector('.sketch-area');

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
            setCellStyle(cell);
            rowDiv.appendChild(cell);
        }
        sketchArea.appendChild(rowDiv);
    }
}

createGrid();