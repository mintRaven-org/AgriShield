import google.generativeai as genai
from google.generativeai.types.generation_types import collections
import pymongo
import os
import platform
import dotenv
from collections.abc import Collection
from bson.objectid import ObjectId
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# ------------------------------------------------------------
if platform.architecture()[1] == "ELF":
    os.environ["GRPC_VERBOSITY"] = "ERROR"
    os.environ["GLOG_minloglevel"] = "2"

# ------------------------------------------------------------
dotenv.load_dotenv()

uri = os.environ.get("MONGODB_URI")
api = os.environ.get("API_KEY")

client = MongoClient(uri, server_api=ServerApi("1"))
try:
    client.admin.command("ping")
    print("You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client["AgriShield"]
collection = db["diseasetexts"]
res = collection.find({})
diseases = []
symptoms = []
for i in res:
    for j in i:
        if j == "symptoms":
            symptoms.append(i[j])
        if j == "diseaseName":
            diseases.append(i[j])


# ------------------------------------------------------------
def get_text_reponse(query):
    genai.configure(api_key=api)

    model = genai.GenerativeModel("gemini-1.5-flash")
    chat = model.start_chat(
        history=[
            {
                "role": "user",
                "parts": "you are a chatbot trained to help farmers with identifying diseases of crops based on the information you are being provided. You will be taught about various symptoms of various diseases and you should be able to classify them easily when you are asked and told about different symptoms. Is it well understood?",
            },
            {
                "role": "model",
                "parts": "it is well understood. I will help farmers classify diseases based on the teachings from you and the symptoms from the farmers as input",
            },
            {
                "role": "user",
                "parts": [
                    f"Following are the symptoms for the disease {diseases[0]}...{symptoms[0]}. Use this knowledge when classifying disease with these symptoms from farrmer"
                ],
            },
            {
                "role": "model",
                "parts": "ok, from now on i will use these symptoms to classify the disease black rust",
            },
            {
                "role": "user",
                "parts": [
                    f"following are the symptoms for the disease {diseases[1]}...{symptoms[1]}. Use this knowledge when classifying disease with these symptoms from farmer"
                ],
            },
            {
                "role": "model",
                "parts": "ok, from now on i will use these symptoms to classify the disease brown spots",
            },
            {
                "role": "user",
                "parts": [
                    f"following are the symptoms for the disease {diseases[2]}...{symptoms[2]}. Use this knowledge when classifying disease with these symptoms from farmer"
                ],
            },
            {
                "role": "model",
                "parts": "ok, from now on i will use these symptoms to classify the disease powdered mildew",
            },
            {
                "role": "user",
                "parts": [
                    f"following are the symptoms for the disease {diseases[3]}...{symptoms[3]}. Use this knowledge when classifying disease with these symptoms from farmer"
                ],
            },
            {
                "role": "model",
                "parts": "ok, from now on i will use these symptoms to classify the green ear disease",
            },
        ]
    )

    # query = input("enter the string: ")
    response = chat.send_message(query)
    return response.text
