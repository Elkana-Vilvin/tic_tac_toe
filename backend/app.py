from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

@app.route("/")
def home():
    return "✅ Welcome to the Tic Tac Toe backend! Server is running."

@app.route("/move", methods=["POST"])
def move():
    data = request.get_json()
    print(f"Received move: {data}")
    return jsonify({"status": "OK", "received": data})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
