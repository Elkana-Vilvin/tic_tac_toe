const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";

// Create 3x3 grid
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  board.appendChild(cell);
}

// Add click listeners
board.addEventListener("click", async (e) => {
  const cell = e.target;
  if (!cell.classList.contains("cell") || cell.textContent !== "") return;

  const index = cell.dataset.index;

  try {
    const res = await fetch("https://tic-tac-toe-5-kf1r.onrender.com/move", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ index: parseInt(index), player: currentPlayer })
    });

    const data = await res.json();
    if (data.success) {
      cell.textContent = currentPlayer;
      if (data.winner) {
        statusText.textContent = `${currentPlayer} wins!`;
        board.style.pointerEvents = "none";
      } else if (data.draw) {
        statusText.textContent = "It's a draw!";
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `${currentPlayer}'s turn`;
      }
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server error!");
  }
});

// Reset game
resetButton.addEventListener("click", async () => {
  try {
    const res = await fetch("https://tic-tac-toe-5-kf1r.onrender.com/reset", {
      method: "POST"
    });

    const data = await res.json();
    if (data.success) {
      document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
      board.style.pointerEvents = "auto";
      currentPlayer = "X";
      statusText.textContent = "X's turn";
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server error!");
  }
});
