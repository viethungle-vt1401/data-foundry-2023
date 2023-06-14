from fastapi import FastAPI
import psycopg2
from pydantic import BaseModel
from typing import List, Union


class Data(BaseModel):
    data_source: str
    poc: Union[str, None]


app = FastAPI()

connection = psycopg2.connect(database="data_foundry",
                              user="data_foundry_user",
                              password="***REMOVED***",
                              host="codeplus-postgres-test-01.oit.duke.edu",
                              port="5432")
cur = connection.cursor()


@app.get('/source-poc')
async def get_poc() -> List[Data]:
    cur.execute("SELECT data_source, poc FROM di")
    rows = cur.fetchall()
    return [{
        "data_source": row[0],
        "poc": row[1]
    } for row in rows]


@app.get('/')
async def get_profile_data():
    return {"message": "how are you?", "name": "Ina!", "img": "/duke_wordmark_white.png"}
