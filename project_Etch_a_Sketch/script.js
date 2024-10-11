const selectionArea = document.querySelector('.selection-area');
const colorBtn = document.querySelector('#color');
colorBtn.testContent = 'RGB ON';

const resizeBtn = document.querySelector('#resize');
resizeBtn.textContent = 'Resize';
resetBtn.addEventListener('click', () => {
    
    const cells = document.querySelectorAll('.sketch-area div div');
    cells.forEach(cell => {
        cell.style.backgroundColor = 'white';
    });
});

const resetBtn = document.querySelector('#reset');
resetBtn.textContent = 'Reset';

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
    row.style.gap = '3px';
}

// Function to set cells in a row to a specific style.
function setCellStyle(cell) {
    cell.style.height = '100%';
    cell.style.width = '100%';
    cell.addEventListener('mouseover', () => {
        cell.style.backgroundColor = 'black';
    });
}

// Create 16x16 grid of square divs and append them to sketch area.
for (let row = 0; row < ROWS; row++) {
    const rowDiv = document.createElement('div');
    setRowStyle(rowDiv);
    for (let col = 0; col < COLS; col++) {
        const cell = document.createElement('div');
        setCellStyle(cell);        
        rowDiv.appendChild(cell);
    }
    sketchArea.appendChild(rowDiv);
}
