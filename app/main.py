from fastapi import FastAPI

app = FastAPI()

@app.get('/')
async def get_profile_data():
    return {"message": "Hello, ", "name": "Ina!"}
