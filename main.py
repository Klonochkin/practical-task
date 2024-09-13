from fastapi import FastAPI, Request, File, UploadFile,Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from typing import Annotated
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import uvicorn
from pymongo import MongoClient

templates=Jinja2Templates(directory='templates')
app = FastAPI()

client = MongoClient("localhost", 27017)
db = client.test_database
collection = client.test_collection
post = {
    "author": "Mike",
    "text": "My first blog post!",
    "tags": ["mongodb", "python", "pymongo"],
}

posts = db.posts
post_id = posts.insert_one(post).inserted_id

print(posts.find_one())
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get('/')
async def welcome(request:Request) :
    return templates.TemplateResponse(name='index.html',context={'request':request})

@app.post('/send/')
async def submit_form(
    type_device: str = Form(...),
    model_device: str = Form(...),
    serial_number: str = Form(...),
    ITAM_device: str = Form(...),
    photo_device: str = Form(...),
    photo_serial_number_device: str = Form(...),
    photo_ITAM_device: str = Form(...)
    ):
    print(f"type_device: {type_device} ")
    print(f"model_device: {model_device}")
    print(f"serial_number: {serial_number}")
    print(f"ITAM_device: {ITAM_device}")
    print(f"photo_device: {photo_device}")
    print(f"photo_serial_number_device: {photo_serial_number_device}")
    print(f"photo_ITAM_device: {photo_ITAM_device}")
    return {"message": type_device}



if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
