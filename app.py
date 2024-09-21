from fastapi import FastAPI, Request,Form,Response,File,UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pymongo import MongoClient
import string
import random


# Алфавит для создания случайных названий картинок
alphabet = string.digits + string.ascii_lowercase


templates=Jinja2Templates(directory='templates')
app = FastAPI()

client = MongoClient("db", 27017)
db = client.test_database
collection = client.test_collection
posts = db.posts

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get('/')
async def welcome(request:Request) :
    return templates.TemplateResponse(name='index.html',context={'request':request})

@app.get('/auth')
async def welcome(request:Request) :
    return templates.TemplateResponse(name='auth.html',context={'request':request})

@app.post('/changeData')
async def upload(request: Request):
    data = await request.json()
    numFilter = data["numFilter"]
    value0 = data["value0"]
    value1 = data["value1"]
    value2 = data["value2"]
    value3 = data["value3"]
    value4 = data["value4"]
    value5 = data["value5"]
    value6 = data["value6"]
    filter = {'number': numFilter}

    posts.update_many(filter, {'$set': {'type_device': value0}})
    posts.update_many(filter, {'$set': {'model_device': value1}})
    posts.update_many(filter, {'$set': {'serial_number': value2}})
    posts.update_many(filter, {'$set': {'ITAM_device': value3}})
    posts.update_many(filter, {'$set': {'photo_device': value4}})
    posts.update_many(filter, {'$set': {'photo_serial_number_device': value5}})
    posts.update_many(filter, {'$set': {'photo_ITAM_device': value6}})

    return {"message": "true"}


@app.get("/data")
async def read_data():
    file_path = "static/images/1.jpg"
    return list(posts.aggregate([{'$unset': '_id'}]))


@app.post('/deleteData')
async def delete(request: Request):
    data = await request.json()
    numDelete = data["numDelete"]
    count = posts.count_documents({})
    filterDelete = {'number': numDelete}
    resultDelete = posts.delete_one(filterDelete)
    for i in range(int(numDelete)+1,count+1):
        filter = {'number': f"{i}"}
        result = posts.update_one(filter, {'$set': {'number': f"{i-1}"}})

    return {"message": "true"}

@app.post('/uploadFile')
async def uploadFile(file: UploadFile):
    newName = "".join([alphabet[random.randint(0, len(alphabet) -1)] for _ in range(0, 60)])
    exp=f".{file.filename.rsplit('.', 1)[1]}"
    newName +=exp
    file.filename = newName
    with open(f"static/images/{file.filename}", "wb") as f:
            f.write(await file.read())
    return newName


@app.post('/sendForm')
async def sendForm(request: Request):
    form_data = await request.form()
    photo_device = form_data.get("photo_device")

    n=posts.count_documents({})
    if( posts.count_documents({}) == n):
        post = {
            "number": f"{posts.count_documents({})+1}",
            "type_device": form_data.get("type_device"),
            "model_device": form_data.get("model_device"),
            "serial_number": form_data.get("serial_number"),
            "ITAM_device": form_data.get("ITAM_device"),
            "photo_device": form_data.get("photo_device"),
            "photo_serial_number_device": form_data.get("photo_serial_number_device"),
            "photo_ITAM_device": form_data.get("photo_ITAM_device"),
        }
        posts.insert_one(post).inserted_id

    return ""

@app.post("/deletefile")
async def delete_file(request: Request):
    data = await request.body()
    try:
        with open(data, "rb") as f:
            pass
        open(data, "wb").close()
    except FileNotFoundError:
        pass
    return {"info": f"file {data} deleted"}
