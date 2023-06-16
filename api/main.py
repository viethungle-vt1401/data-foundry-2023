from fastapi import FastAPI
import psycopg2
from pydantic import BaseModel
from typing import List, Union
from enum import Enum


FIELDS = {
    "sensitivity": "ANY(sensitivity) = "
}


class Sensitivity(Enum):
    Public: 1
    Restricted: 2
    Sensitive: 3


class Filter(BaseModel):
    sensitivity: str


class Data(BaseModel):
    data_source: str
    poc: Union[List[str], None]
    sensitivity: Union[str, None]


app = FastAPI()

connection = psycopg2.connect(database="data_foundry",
                              user="data_foundry_user",
                              password="***REMOVED***",
                              host="codeplus-postgres-test-01.oit.duke.edu",
                              port="5432")
cur = connection.cursor()


@app.post('/data-table')
async def get_data(filters: Filter) -> List[Data]:
    cur.execute(f"SELECT data_source, poc, sensitivity FROM datainv WHERE '{filters.sensitivity}' = ANY(sensitivity);")
    rows = cur.fetchall()
    return [{
        "data_source": row[0],
        "poc": row[1],
        "sensitivity": row[2]
    } for row in rows]


@app.get('/')
async def get_profile_data():
    return {"message": "how are you?", "name": "Ina!", "img": "/images/duke_wordmark_white.png"}
