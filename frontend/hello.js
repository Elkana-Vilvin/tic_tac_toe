console.log("hello.js is connected!");

const board = document.getElementById('board');
let currentPlayer = 'X';
let cells = [];

// Create the 3x3 grid
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  board.appendChild(cell);
  cells.push(cell);
}

// Handle cell clicks
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (cell.textContent === '') {
      cell.textContent = currentPlayer;
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  });
});
