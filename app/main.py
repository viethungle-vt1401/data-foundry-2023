from fastapi import FastAPI

app = FastAPI()

@app.get('/')
async def get_profile_data():
    return {"message": "how are you?", "name": "Ina!", "img" : "/duke_wordmark_white.png"}
