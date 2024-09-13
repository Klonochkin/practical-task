# Practical Task

## Running Locally

To run database:

```sh
docker compose up
```

To run app:

```sh
uvicorn main:app --reload
```

## Running DB

```sh
docker run --name some-mongo -d mongo:latest
```