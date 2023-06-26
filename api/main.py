from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Union
from search_filter import SearchFilter


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

# search_filter is the object that stores filters and search_strings
search_filter = SearchFilter()


# This is our query that sends back info from the database
@app.post('/data-table')
async def get_data_default(filters: Filter) -> List[Data]:
    search_filter.update_filters(filters)
    search_filter.update_search_string("")
    return search_filter.query()


@app.post('/data-table/{search_string}')
async def get_data(filters: Filter, search_string: str = "") -> List[Data]:
    search_filter.update_filters(filters)
    search_filter.update_search_string(search_string)
    return search_filter.query()


@app.get('/')
async def get_profile_data():
    return {"message": "how are you?", "name": "Ina Ding", "photo": "/images/duke_wordmark_white.png"}

@app.get('/header')
async def get_header_data():
    return {"message": "how are you?", "name": "Ina Ding", "photo": "/images/duke_wordmark_white.png"}

