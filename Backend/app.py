import json
from tkinter import Image
from flask import Flask, jsonify, request
import numpy as np
from werkzeug.utils import secure_filename
import io
import pandas as pd
from json import JSONEncoder
import PIL.Image as Image
import tensorflow as tf
import tensorflow_hub as hub
app = Flask(__name__)

tf.compat.v1.disable_eager_execution()
graph = tf.Graph()
with tf.compat.v1.Session(graph=graph) as session:
    model = hub.Module(
        "https://tfhub.dev/google/on_device_vision/classifier/landmarks_classifier_asia_V1/1")
IMAGE_SHAPE = (321, 321)


@app.route('/', methods=["GET"])
def index():
    return jsonify("JKGF")


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
    image = Image.open(io.BytesIO(image_bytes))
    final_image = Image.new("RGB", IMAGE_SHAPE, (255, 255, 255))
    final_image.paste(image, None, mask=image.split()[2])
    final_image = np.asarray(final_image)[None, ...]
    print(type(final_image))
    print("The shape of final image is " + str(final_image.shape))
    # imggg = tf.image.resize(image, (321, 321), ,name=None)
    # with g.as_default():
    #     result = model([image], as_dict=True)
    # g.finalize()
    # shape = tf.TensorSpec(shape=[None, 321, 321, 3],
    #                       dtype=tf.float32, name=None)
    file_names = model.get_input_info_dict()
    with tf.compat.v1.Session(graph=graph) as session:
        result = session.run(model(final_image, as_dict=True))
    results = json.dumps(result['predictions:logits'].tolist())
    return jsonify(json.dumps(results))


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
