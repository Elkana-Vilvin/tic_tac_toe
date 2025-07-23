from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/move', methods=['POST'])
def get_best_move():
    data = request.get_json()
    board = data.get("board")

    # Dummy AI logic: choose first empty spot
    for i in range(9):
        if board[i] == "":
            return jsonify({"bestMove": i})
    return jsonify({"bestMove": -1})  # no moves available

if __name__ == '__main__':
    app.run(debug=True)
