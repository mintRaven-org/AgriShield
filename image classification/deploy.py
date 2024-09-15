import uvicorn
from fastapi import FastAPI
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.models import load_model
import numpy as np
import PIL.Image as Image
import io

model = load_model("crop_disease.h5")
data_cat = ["Wheat black rust", "Wheat powdery mildew"]

img_height = 180
img_width = 180

app = FastAPI()


@app.get("/")
def index():
    return {"health": "ok", "status": "working"}


@app.post("/predict")
def get_name(image):
    img = Image.open(io.BytesIO(image))

    image_load = tf.keras.utils.load_img(img, target_size=(img_height, img_width))
    img_arr = tf.keras.utils.array_to_img(image_load)
    img_bat = tf.expand_dims(img_arr, 0)

    predict = model.predict(img_bat)
    score = tf.nn.softmax(predict)

    return {
        "disease": f"{data_cat[np.argmax(score)]}",
        "confidence": np.max(score) * 100,
    }


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
