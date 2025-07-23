from flask import Flask, send_file

app = Flask(__name__)

# Serve index.html
@app.route('/')
def index():
    return send_file('index.html')

# Serve style.css
@app.route('/style.css')
def style():
    return send_file('style.css')

# Serve script.js
@app.route('/script.js')
def script():
    return send_file('script.js')
