from fastapi import FastAPI
import uvicorn
from fastapi.responses import FileResponse
app = FastAPI()

@app.get("/")
def root():
    return FileResponse("index.html")



@app.post("/send")
def send():
    content = "Hello, FastAPI!"




if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)