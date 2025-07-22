window.onload = () => {
  fetch("https://tic-tac-toe-0mv8.onrender.com/move", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      player: "X",
      row: 1,
      col: 2
    })
  })
  .then(res => res.json())
  .then(data => console.log("✅ Response from backend:", data))
  .catch(err => console.error("❌ Error:", err));
};
