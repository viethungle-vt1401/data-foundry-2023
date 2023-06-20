from fastapi import FastAPI
import psycopg2
from pydantic import BaseModel
from typing import List, Union

# Fields is a shortcut "map" so we dont have to type everything out if we add new filters
FIELDS = {
    "sensitivity": "ANY(sensitivity) = "
}


class Filter(BaseModel):
    sensitivity: str
    request_process: str


class Data(BaseModel):
    data_source: str
    platform: str
    office: str
    poc: str
    app_auth: str
    sensitivity: Union[str, None]
    req_proc: bool
    req_form: bool
    app_req: str
    provided: Union[str, None]
    freeq: Union[str, None]
    notes: str


# app connects to fastapi so is why we say main:app when running uvicorn
app = FastAPI()

connection = psycopg2.connect(database="data_foundry",
                              user="data_foundry_user",
                              password="***REMOVED***",
                              host="codeplus-postgres-test-01.oit.duke.edu",
                              port="5432")
cur = connection.cursor()


# This is our query that sends back info from the database
@app.post('/data-table')
async def get_data(filters: Filter) -> List[Data]:
    # Query is a string we concatenate to use multi lines
    query = f"SELECT data_source, platform, office,poc, app_auth, \
            sensitivity, req_proc, req_form, app_req, provided, freeq, notes FROM datainv \
            WHERE '{filters.sensitivity}' = ANY(sensitivity) \
            AND req_proc = '{filters.request_process}';"
    cur.execute(query)
    rows = cur.fetchall()

    return [{
        "data_source": row[0],
        "platform": row[1],
        "office": row[2].replace("{", "").replace("}", ""),
        "poc": (str(row[3]).replace("[", "").replace("]", "").replace("'", "")),
        "app_auth": row[4].replace("{", "").replace("}", ""),
        "sensitivity": row[5].replace("{", "").replace("}", ""),
        "req_proc": row[7],
        "req_form": row[6],
        "app_req": (row[8]),
        "provided": row[9].replace("{", "").replace("}", ""),
        "freeq": (row[10]).replace("{", "").replace("}", ""),
        "notes": (row[11])
    } for row in rows]


@app.get('/')
async def get_profile_data():
    return {"message": "how are you?", "name": "Ina!", "photo": "/images/duke_wordmark_white.png"}
