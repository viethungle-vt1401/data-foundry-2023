from fastapi import FastAPI
import psycopg2
from pydantic import BaseModel
from typing import List, Union


class Data(BaseModel):
    data_source: str
    platform: str
    office: str
    poc: str
    app_auth: str
    sensitivity: Union[str,None]
    req_proc: bool
    req_form: bool
    app_req: str
    provided: Union[str, None]
    freeq: Union[str, None]
    notes: str


app = FastAPI()

connection = psycopg2.connect(database="data_foundry",
                              user="data_foundry_user",
                              password="***REMOVED***",
                              host="codeplus-postgres-test-01.oit.duke.edu",
                              port="5432")
cur = connection.cursor()


@app.get('/source-poc')
async def get_poc() -> List[Data]:
    cur.execute("SELECT data_source,platform,office,poc,app_auth,sensitivity,req_proc,req_form,app_req,provided,freeq,notes FROM datainv")
    # poc,
    rows = cur.fetchall()
    return [{
        "data_source": row[0],
        "platform": row[1],
        "office": row[2].replace("{","").replace("}",""),
        "poc": (str(row[3]).replace("[","").replace("]","").replace("'","")),
        "app_auth": row[4].replace("{","").replace("}",""),
        "sensitivity": row[5].replace("{", "").replace("}",""),
        "req_proc": row[7],
        "req_form": row[6],
        "app_req": (row[8]),
        "provided": row[9].replace("{", "").replace("}", ""),
        "freeq": (row[10]).replace("{", "").replace("}",""),
        "notes": (row[11])

    } for row in rows]


@app.get('/')
async def get_profile_data():
    return {"message": "how are you?", "name": "Ina!", "photo": "/duke_wordmark_white.png"}