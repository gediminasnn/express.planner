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

MYSQL_ROOT_USERNAME=root
MYSQL_ROOT_PASSWORD=pass
MYSQL_DATABASE=planner
MYSQL_PORT=4000

TYPEORM_CONN_HOST=database
TYPEORM_CONN_PORT=3306 //by default 3306 is recommended, since docker's default internal port is 3306
TYPEORM_CONN_SYNC=true

```

## Technical description map

![Planner](https://user-images.githubusercontent.com/39725714/119777574-0c5f1e00-becf-11eb-87fa-096573a8fd1d.png)
