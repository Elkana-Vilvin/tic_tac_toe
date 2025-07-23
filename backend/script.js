let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameOver = false;

function makeMove(cell, index) {
  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    document.getElementById('winner').textContent = `${currentPlayer} wins!`;
    gameOver = true;
  } else if (!board.includes(null)) {
    document.getElementById('winner').textContent = `It's a draw!`;
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
  document.getElementById('winner').textContent = '';
}
