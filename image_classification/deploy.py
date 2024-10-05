import os
import dotenv
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io
import base64
from chatbot import *
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import pymongo

dotenv.load_dotenv()
uri = os.environ.get("MONGODB_URI")

client = MongoClient(uri, server_api=ServerApi("1"))
try:
    client.admin.command("ping")
    print("You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client["AgriShield"]

model = load_model("crop_disease.h5")
data_cat = ["Wheat black rust", "Wheat powdery mildew"]

img_height = 180
img_width = 180

app = FastAPI()


class ImageRequest(BaseModel):
    image: str


@app.get("/")
def index():
    return {"health": "ok", "status": "working"}


@app.post("/predict")
def get_name(request: ImageRequest):
    try:
        b = base64.b64decode(
            request.image.split(",")[1]
        )  # Remove the data URL scheme prefix
        img = Image.open(io.BytesIO(b))

        img = img.resize((img_width, img_height))  # Resize image to match model input
        img_arr = np.array(img)
        img_arr = np.expand_dims(img_arr, 0)  # Create batch dimension

        predict = model.predict(img_arr)
        score = tf.nn.softmax(predict)

        return {
            "disease": f"{data_cat[np.argmax(score)]}",
            "confidence": np.max(score) * 100,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/chatbot")
async def get_text(request: Request):
    try:
        query = await request.body()
        query_str = query.decode("utf-8")  # Decode the byte data to a string
        res = get_text_reponse(
            query_str
        )  # Pass the raw string to the response function
        question_history = db["textquestions"]
        chats = question_history.find({})
        length = 0
        count = 0
        for i in chats:
            length += 1
        if length >= 5:
            record_to_delete = question_history.find().sort("_id", 1).limit(1)
            question_history.insert_one({"question": query_str, "response": res})
            for i in record_to_delete:
                for j in i:
                    if j == "_id":
                        question_history.delete_one({"_id": i[j]})
        else:
            question_history.insert_one({"query": query_str, "response": res})

        return {"diagnosis": f"{res}"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
