from fastapi import FastAPI
import psycopg2
from pydantic import BaseModel
from typing import List, Union

# FIELDS_QUERIES is a shortcut "map" so we dont have to type everything out if we add new filters
FIELDS_QUERIES = {
    "office": "'{}' = ANY(office)",
    "sensitivity": "'{}' = ANY(sensitivity)",
    "request_process": "req_proc = '{}'",
    "request_form": "req_form = '{}'",
    "frequency": "'{}' = ANY(freeq)"
}


def create_query_conditions(filters):
    query = []
    for field in FIELDS_QUERIES:
        if field == "office":
            office_conditions = [FIELDS_QUERIES[field].format(office) if office != "All"
                                 else "1 = 1" for office in getattr(filters, field)]
            query.append(f"({' OR '.join(office_conditions)})")
        elif getattr(filters, field) != "All":
            query.append(FIELDS_QUERIES[field].format(getattr(filters, field)))
        else:
            query.append("1 = 1")
    return " AND ".join(query)


class Filter(BaseModel):
    office: List[str]
    sensitivity: str
    request_process: str
    request_form: str
    frequency: str


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
    description: str
    icon: str


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
    query = f"SELECT data_source, platform, office, poc, app_auth, sensitivity, \
              req_proc, req_form, app_req, provided, freeq, notes, description, icon FROM datainv \
              WHERE {create_query_conditions(filters)}"

    cur.execute(query)
    rows = cur.fetchall()

    return [{
        "data_source": row[0],
        "platform": row[1],
        "office": row[2].replace("{", "").replace("}", ""),
        "poc": str(row[3]).replace("[", "").replace("]", "").replace("'", ""),
        "app_auth": row[4].replace("{", "").replace("}", ""),
        "sensitivity": row[5].replace("{", "").replace("}", ""),
        "req_form": row[6],
        "req_proc": row[7],
        "app_req": row[8],
        "provided": row[9].replace("{", "").replace("}", ""),
        "freeq": row[10].replace("{", "").replace("}", ""),
        "notes": row[11],
        "description": row[12],
        "icon": row[13]
    } for row in rows]


@app.get('/')
async def get_profile_data():
    return {"message": "how are you?", "name": "Ina!", "photo": "/images/duke_wordmark_white.png"}
