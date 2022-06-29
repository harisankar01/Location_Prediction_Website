import json
from tkinter import Image
from flask import Flask, jsonify, request
import numpy as np
from werkzeug.utils import secure_filename
import io
from os import getenv
from pymongo import MongoClient, errors
import PIL.Image as Image
import tensorflow as tf
import tensorflow_hub as hub
from dotenv import load_dotenv
load_dotenv()
app = Flask(__name__)
# Connect to mongodb on linode mongodb instance
client = MongoClient(getenv("DB_URL"), 27017,
                     username=getenv("DB_USERNAME"), password=getenv("DB_PASSWORD"))
DB = getenv("DB_NAME")
collection_name = getenv("DB_COLLECTION_NAME")
# Select database and collection
data_base = client.admin
collection = data_base['Places_to_predict']
# Initialize model for prediction
tf.compat.v1.disable_eager_execution()
graph = tf.Graph()
with tf.compat.v1.Session(graph=graph) as session:
    model = hub.Module(
        "https://tfhub.dev/google/on_device_vision/classifier/landmarks_classifier_asia_V1/1")
IMAGE_SHAPE = (321, 321)


@app.route('/', methods=["GET"])
def index():
    return jsonify("The home page")


@app.route('/predict', methods=['POST'])
def predict():
    image = request.files['file']
    if not image:
        return "Image prediction failed"
    file = secure_filename(image.name)
    mime_file = image.mimetype
    if not file or not mime_file:
        return 'Bad upload!', 400
    image_bytes = image.read()
# Preprocessing image to meet the size requirements of model
    image = Image.open(io.BytesIO(image_bytes))
    final_image = Image.new("RGB", IMAGE_SHAPE, (255, 255, 255))
    final_image.paste(image, None, mask=image.split()[2])
    final_image = np.asarray(final_image)[None, ...]
# Get metadata of file
    file_names = model.get_input_info_dict()
# Perform prediction
    with tf.compat.v1.Session(graph=graph) as session:
        result = session.run(model(final_image, as_dict=True))
    results = json.dumps(result['predictions:logits'].tolist())
# Return prediction as probabilites
    return jsonify(json.dumps(results))


@app.route('/db', methods=["POST"])
def data():
    predictions = request.get_data(cache=False)
    data_predictions = json.loads(predictions)
    predicted_locations = []
    try:
        # If connection is wrong, server_info() results in error
        print("server_info:", client.server_info())
    except errors.ServerSelectionTimeoutError as err:
        print("An error occured in database", err)
    try:
        for i in data_predictions['array']:
            predicted_locations.append(collection.find_one(
                {"id": str(i)}, {"name": 1, "_id": 0}))
    except Exception as e:
        print("AN exception occured", e)
# Returning predictions as places
    return jsonify(predicted_locations)


# Server info
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
