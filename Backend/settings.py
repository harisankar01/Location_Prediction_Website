from os import getenv
from dotenv import load_dotenv
load_dotenv()
Database_URL = getenv("DB_URL")
Database_Username = getenv("DB_USERNAME")
Database_PWD = getenv("DB_PASSWORD")
Database_Collection = getenv("DB_COLLECTION_NAME")
Database_DB = getenv("DB_NAME")
