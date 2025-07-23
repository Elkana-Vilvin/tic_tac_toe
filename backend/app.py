from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

board = [""] * 9
current_player = "X"

@app.route("/move", methods=["POST"])
def move():
    global board, current_player
    data = request.get_json()
    cell = data.get("cell")

    if board[cell] == "":
        board[cell] = current_player
        current_player = "O" if current_player == "X" else "X"

    return jsonify({"board": board})

@app.route("/reset", methods=["POST"])
def reset():
    global board, current_player
    board = [""] * 9
    current_player = "X"
    return jsonify({"board": board})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
    
