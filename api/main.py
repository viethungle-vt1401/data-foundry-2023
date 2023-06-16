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
    request_process: str


class Data(BaseModel):
    data_source: str
    poc: Union[List[str], None]
    sensitivity: Union[str, None]
    req_proc: str


app = FastAPI()

connection = psycopg2.connect(database="data_foundry",
                              user="data_foundry_user",
                              password="***REMOVED***",
                              host="codeplus-postgres-test-01.oit.duke.edu",
                              port="5432")
cur = connection.cursor()


@app.post('/data-table')
async def get_data(filters: Filter) -> List[Data]:
    print(filters)
    query = f"SELECT data_source, poc, sensitivity, req_proc FROM datainv \
            WHERE '{filters.sensitivity}' = ANY(sensitivity) \
            AND req_proc = '{filters.request_process}';"
    print(query)
    cur.execute(query)
    rows = cur.fetchall()
    return [{
        "data_source": row[0],
        "poc": row[1],
        "sensitivity": row[2],
        "req_proc": row[3]
    } for row in rows]


@app.get('/')
async def get_profile_data():
    return {"message": "how are you?", "name": "Ina!", "img": "/images/duke_wordmark_white.png"}
