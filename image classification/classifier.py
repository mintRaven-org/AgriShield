import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.models import load_model
import numpy as np

model = load_model("crop_disease.h5")
data_cat = ["Wheat black rust", "Wheat powdery mildew"]

img_height = 180
img_width = 180
image = "black_rust.jpg"

image_load = tf.keras.utils.load_img(image, target_size=(img_height, img_width))
img_arr = tf.keras.utils.array_to_img(image_load)
img_bat = tf.expand_dims(img_arr, 0)

predict = model.predict(img_bat)

score = tf.nn.softmax(predict)
print("disease in image is " + data_cat[np.argmax(score)])
print("confidence: ", np.max(score) * 100)
