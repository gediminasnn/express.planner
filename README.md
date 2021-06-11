# Planner

## Setup

Considering you already downloaded the code you must follow these steps:

**Run project with Docker**

```
docker-compose up
```

In the terminal you must see working dockerized node client

## Enviroment variables

Create .env file from .env.example and fill in the global variables

Example

```
API_PORT=8000

MYSQL_USERNAME=root
MYSQL_PASSWORD=pass
MYSQL_DATABASE=planner
MYSQL_HOST=database
MYSQL_PORT=3306

NODE_ENV=production

JWT_SECRET=RANDOMSTRING123
```

## Technical description map

![Planner](https://user-images.githubusercontent.com/39725714/119777574-0c5f1e00-becf-11eb-87fa-096573a8fd1d.png)
