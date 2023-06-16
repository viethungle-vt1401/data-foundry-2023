from fastapi import FastAPI
import psycopg2
from pydantic import BaseModel
from typing import List, Union

#Fields is a shortcut "map" so we dont have to type everything out if we add new filters
FIELDS = {
    "sensitivity": "ANY(sensitivity) = "
}


class Filter(BaseModel):
    sensitivity: str
    request_process: str


class Data(BaseModel):
    data_source: str
    poc: Union[List[str], None]
    sensitivity: Union[str, None]
    req_proc: str

##app connects to fastapi so is why we say main:app when running uvicorn
app = FastAPI()

connection = psycopg2.connect(database="data_foundry",
                              user="data_foundry_user",
                              password="***REMOVED***",
                              host="codeplus-postgres-test-01.oit.duke.edu",
                              port="5432")
cur = connection.cursor()


##This is our query that sends back info from the database
@app.post('/data-table')
async def get_data(filters: Filter) -> List[Data]:
    ## Query is a string we concatenate to use multi lines 
    query = f"SELECT data_source, poc, sensitivity, req_proc FROM datainv \
            WHERE '{filters.sensitivity}' = ANY(sensitivity) \
            AND req_proc = '{filters.request_process}';"
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
