# Backend/VeloraAi/mongo_client.py
from pymongo import MongoClient
from urllib.parse import quote_plus
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))  # move to parent directory

# Your Atlas credentials
usn, psw=os.getenv('mongodbCREDENTIALS').split(':')

# Connect to Atlas
client = MongoClient(
    f"mongodb+srv://{usn}:{quote_plus(psw)}@veloraai.pxsrftr.mongodb.net/?retryWrites=true&w=majority&appName=VeloraAI"
)

# Select database and collection
db = client["InterviewSchedular"]
org_collection = db["OrganizationInfos"]
std_collection = db["StudentInfos"]
