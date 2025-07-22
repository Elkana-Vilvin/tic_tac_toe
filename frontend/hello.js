const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (cell.textContent === "") {
      cell.textContent = currentPlayer;
      sendMoveToBackend(cell.dataset.index, currentPlayer);
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
});

function sendMoveToBackend(cellIndex, player) {
  fetch("http://127.0.0.1:5000/move", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ index: cellIndex, player: player }),
  })
    .then((response) => response.json())
    .then((data) => console.log("Server response:", data))
    .catch((error) => console.error("Error:", error));
}
