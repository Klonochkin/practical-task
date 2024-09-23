from fastapi import FastAPI, Request,Form,Response,File,UploadFile,HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from pymongo import MongoClient
import string
import random
import hashlib
import os


# Алфавит для создания случайных названий картинок
alphabet = string.digits + string.ascii_lowercase


templates=Jinja2Templates(directory='templates')
app = FastAPI()

client = MongoClient("db", 27017)
# client.drop_database('password_database')
db = client.test_database
dbPassword = client.password_database
dbSession = client.session_database
collection = client.test_collection
collectionPassword = client.password_collection
posts = db.posts
postsPassword = dbPassword.posts
postsSession = dbSession.posts


app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get('/')
async def welcome(request:Request) :
    return templates.TemplateResponse(name='index.html',context={'request':request})

@app.get('/auth')
async def welcome(request:Request) :
    return templates.TemplateResponse(name='auth.html',context={'request':request})

@app.get('/register')
async def welcome(request:Request) :
    return templates.TemplateResponse(name='register.html',context={'request':request})


@app.post('/changeData')
async def upload(request: Request):
    cookies = request.cookies
    session_value = cookies.get("session")
    res = postsSession.find_one({"Session": session_value})
    if(res==None):
        return {"status": 403}
    data = await request.json()
    email = data["email"]
    numFilter = data["numFilter"]
    value0 = data["value0"]
    value1 = data["value1"]
    value2 = data["value2"]
    value3 = data["value3"]
    value4 = data["value4"]
    value5 = data["value5"]
    value6 = data["value6"]
    filter = {'email':email,'number': numFilter}

    posts.update_many(filter, {'$set': {'type_device': value0}})
    posts.update_many(filter, {'$set': {'model_device': value1}})
    posts.update_many(filter, {'$set': {'serial_number': value2}})
    posts.update_many(filter, {'$set': {'ITAM_device': value3}})
    posts.update_many(filter, {'$set': {'photo_device': value4}})
    posts.update_many(filter, {'$set': {'photo_serial_number_device': value5}})
    posts.update_many(filter, {'$set': {'photo_ITAM_device': value6}})

    return {"message": "true"}


@app.get("/data")
async def read_data(request: Request):

    cookies = request.cookies
    session_value = cookies.get("session")
    res = postsSession.find_one({"Session": session_value})
    if(res==None):
        return {"status": 403}
    return list(posts.aggregate([{'$unset': '_id'}]))


@app.post('/deleteData')
async def delete(request: Request):
    cookies = request.cookies
    session_value = cookies.get("session")
    res = postsSession.find_one({"Session": session_value})
    if(res==None):
        return {"status": 403}
    data = await request.json()
    numDelete = data["numDelete"]
    email = data["email"]
    count = posts.count_documents({})
    filterDelete = {'email':email,'number': numDelete}
    resultDelete = posts.delete_one(filterDelete)
    for i in range(int(numDelete)+1,count+1):
        filter = {'email':email,'number': i}
        result = posts.update_one(filter, {'$set': {'number': i-1}})

    return {"message": "true"}

@app.post('/uploadFile')
async def uploadFile(file: UploadFile, request: Request):
    cookies = request.cookies
    session_value = cookies.get("session")
    res = postsSession.find_one({"Session": session_value})
    if(res==None):
        return {"status": 403}
    newName = "".join([alphabet[random.randint(0, len(alphabet) -1)] for _ in range(0, 60)])
    exp=f".{file.filename.rsplit('.', 1)[1]}"
    newName +=exp
    file.filename = newName
    with open(f"static/images/{file.filename}", "wb") as f:
            f.write(await file.read())
    return newName


@app.post('/sendForm')
async def sendForm(request: Request):
    cookies = request.cookies
    session_value = cookies.get("session")
    res = postsSession.find_one({"Session": session_value})
    if(res==None):
        return {"status": 403}
    form_data = await request.form()
    n=posts.count_documents({})
    newN = posts.find({'email': session_value })
    count = int(len(list(newN)))+1
    if( posts.count_documents({}) == n):
        post = {
            "email": session_value,
            "number": count,
            "type_device": form_data.get("type_device"),
            "model_device": form_data.get("model_device"),
            "serial_number": form_data.get("serial_number"),
            "ITAM_device": form_data.get("ITAM_device"),
            "photo_device": form_data.get("photo_device"),
            "photo_serial_number_device": form_data.get("photo_serial_number_device"),
            "photo_ITAM_device": form_data.get("photo_ITAM_device"),
        }
        res = posts.insert_one(post).inserted_id
    return ""

@app.post("/deletefile")
async def delete_file(request: Request):
    cookies = request.cookies
    session_value = cookies.get("session")
    res = postsSession.find_one({"Session": session_value})
    if(res==None):
        return {"status": 403}
    data = await request.body()
    try:
        with open(data, "rb") as f:
            pass
        open(data, "wb").close()
    except FileNotFoundError:
        pass
    return {"info": f"file {data} deleted"}

@app.post("/signIn")
async def signIn(request: Request):
    data = await request.json()
    email = data["email"]
    password = data["password"]
    res = postsPassword.find_one({'email': email})
    if(res==None):
        return {"status" : 403}
    salt = res['salt']
    hash = res['password']
    newHash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000).hex()
    if(hash != newHash):
        return {"status" : 403}
    hashSession = hashlib.pbkdf2_hmac('sha256', email.encode('utf-8'),os.urandom(16).hex().encode('utf-8'), 100000).hex()
    content = {"message": "true"}
    response = JSONResponse(content=content)
    response.set_cookie(key="session", value=hashSession)
    n=postsSession.count_documents({})
    if( postsSession.count_documents({}) == n):
        post = {
            "id": res["id"],
            "Session": hashSession
        }
        res = postsSession.insert_one(post).inserted_id

    return response

@app.post("/signUp")
async def signUp(request: Request):
    data = await request.json()
    email = data["email"]
    password = data["password"]
    res = postsPassword.find_one({'email': email})
    if(res!=None):
        return {"status" : 403}
    if(len(password)<8):
        return {"status" : 422}
    n=postsPassword.count_documents({})
    salt = os.urandom(16)
    hashPassword = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.hex().encode('utf-8'), 100000)
    newId = postsPassword.count_documents({})+1
    if( postsPassword.count_documents({}) == n):
        post = {
            "id": newId,
            "email": email,
            "password":hashPassword.hex(),
            "salt":salt.hex().encode('utf-8')
        }
        postsPassword.insert_one(post).inserted_id
    return {"message": "Регистрация успешна"}
