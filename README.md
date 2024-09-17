# Practical Task

## Running Locally

To run app:

```sh
uvicorn main:app --reload
```

To run docker:

```sh
docker compose up --watch --build
```

## Running DB

```sh
docker run --name some-mongo -d mongo:latest
```
