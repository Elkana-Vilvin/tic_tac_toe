from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

board = [["" for _ in range(3)] for _ in range(3)]
current_player = ["X"]  # Mutable to keep state between requests

def check_winner():
    # Check rows, columns and diagonals
    lines = board + list(zip(*board)) + [
        [board[i][i] for i in range(3)],
        [board[i][2 - i] for i in range(3)],
    ]
    for line in lines:
        if line == ["X"] * 3:
            return "X"
        elif line == ["O"] * 3:
            return "O"
    return None

@app.route("/move", methods=["POST"])
def make_move():
    data = request.json
    row, col = data["row"], data["col"]
    if board[row][col] == "":
        board[row][col] = current_player[0]
        winner = check_winner()
        if winner:
            return jsonify({"status": "win", "winner": winner})
        current_player[0] = "O" if current_player[0] == "X" else "X"
        return jsonify({"status": "ok", "player": current_player[0]})
    return jsonify({"status": "error", "message": "Cell already filled"})

@app.route("/reset", methods=["POST"])
def reset_game():
    global board, current_player
    board = [["" for _ in range(3)] for _ in range(3)]
    current_player[0] = "X"
    return jsonify({"status": "reset"})
