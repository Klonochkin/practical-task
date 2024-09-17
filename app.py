from fastapi import FastAPI, Request,Form,Response
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pymongo import MongoClient

templates=Jinja2Templates(directory='templates')
app = FastAPI()

client = MongoClient("db", 27017)
db = client.test_database
collection = client.test_collection
posts = db.posts
dict1 = {'Name': 'Smith', "Adm": 45}
 
print(dict1.keys())
print(dict1["Name"])
print(dict1.get("Adm"))

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
    n=posts.count_documents({})
    if( posts.count_documents({}) == n):
        post = {
            "number": f"{posts.count_documents({})+1}",
            "type_device": type_device,
            "model_device": model_device,
            "serial_number": serial_number,
            "ITAM_device": ITAM_device,
            "photo_device": photo_device,
            "photo_serial_number_device": photo_serial_number_device,
            "photo_ITAM_device": photo_ITAM_device,
        }
        posts.insert_one(post).inserted_id
    return Response(status_code=302, headers={"Location": "/"})

@app.post('/changeData')
async def upload(request: Request):
    data = await request.json()
    numFilter = data["numFilter"]
    value0 = data["value0"]
    value1 = data["value1"]
    value2 = data["value2"]
    value3 = data["value3"]
    print(f"ПЕРЕХВАТ ДАННЫХ: {numFilter} {value0} {value1} {value2} {value3} ")
    filter = {'number': numFilter}
    
    print("!!!")
    posts.update_many(filter, {'$set': {'type_device': value0}})
    posts.update_many(filter, {'$set': {'model_device': value1}})
    posts.update_many(filter, {'$set': {'serial_number': value2}})
    posts.update_many(filter, {'$set': {'ITAM_device': value3}})

    return {"message": "true"}


@app.get("/data/")
async def read_data():
    print("READ DATA")
    return list(posts.aggregate([{'$unset': '_id'}]))


@app.post('/deleteData')
async def delete(request: Request):
    data = await request.json()
    numDelete = data["numDelete"]
    print(f"НОМЕР УДАЛЕНИЯ: {numDelete}")
    count = posts.count_documents({})
    print(f"КОЛИЧЕСТВО ПОСТОВ: {count}")
    filterDelete = {'number': numDelete}
    resultDelete = posts.delete_one(filterDelete)
    print(f"1КОЛИЧЕСТВО УДАЛЕНИЙ {resultDelete.deleted_count}")
    print(list(posts.aggregate([{'$unset': '_id'}])))
    for i in range(int(numDelete)+1,count+1):
        print(f"i: {i}")
        filter = {'number': f"{i}"}
        result = posts.update_one(filter, {'$set': {'number': f"{i-1}"}})
        print(f"1КОЛИЧЕСТВО ИЗМЕНЕНИЙ {result.matched_count}")
        print(f"2КОЛИЧЕСТВО ИЗМЕНЕНИЙ {result.modified_count}")

    return {"message": "true"}
