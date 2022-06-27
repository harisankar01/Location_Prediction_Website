from crypt import methods
from flask import Flask, jsonify
app = Flask(__name__)


@app.route('/',methods=["GET"])
def index():
    return jsonify("gjkk")

@app.route('/predict',methods=["POST"])
def predict():
    return jsonify("predicted")

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True) 