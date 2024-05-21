# Planner

The Planner application is built using TypeScript and the Express.js framework. It provides developers with a Model-View-Controller (MVC) framework skeleton, complete with a pre-built User RESTful API for further development.

## Prerequisites

Before proceeding with the setup, ensure you have the following installed on your machine:

- **Docker:** Verify the installation by running `docker --version` in your terminal. If not installed, download and install it from [Docker's official site.](https://www.docker.com/products/docker-desktop/)

- **Docker Compose:** Verify the installation by running `docker-compose --version` in your terminal. If not installed, download and install it from [Docker Compose official site](https://docs.docker.com/compose/install/).

## Setup

0.  **Clone the Repository**
    
    First, clone the repository to your local machine. Open a terminal and run the following command:
    
    `git clone git@github.com:gediminasnn/express.planner.git` 
    
    (Optional) Replace `git@github.com:gediminasnn/express.planner.git` with the URL of repository.

1.  **Navigate to the Application Directory**
    
    Change directory to the application root:
    
    `cd planner` 
    
    (Optional) Replace `planner` with the path where you cloned the repository.

2.  **Prepare the Environment File**
    
    Prepare the application's environment file. Locate the `env.example` file in the application root and create a new file named `.env` using it as a template. Optionally, edit the `.env` file to adjust any environment variables specific to your setup.

3.  **Start the Docker Containers**
    
    Use Docker Compose to start the Docker containers. Run the following command in your terminal:
    
    `docker-compose up` 
    
    This command builds and starts all containers needed for the application. The first time you run this, it might take a few minutes to download and build everything.

    By completing this step, you will have fully set up your application on your local development environment, ensuring it is ready for further development or testing.

## API Documentation

You can send HTTP requests to the following RESTful endpoints:

1. Create user
    ```
    POST /users
    Content-Type: application/json

    {
        "email": "test@test.com",
        "username": "test1",
        "password": "password"
    }
    ``` 

    ```
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
        "username": "test1",
        "email": "test@test.com",
        "password": "password",
        "deletedAt": null,
        "id": "005f35f2-ae0b-40ab-9f00-9aa60cbeb8a2",
        "createdAt": "2024-05-21T14:20:59.675Z",
        "updatedAt": "2024-05-21T14:20:59.675Z"
    }
    ```

2. Get users
    ```
    GET /users
    ``` 

    ```
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    [
        {
            "id": "005f35f2-ae0b-40ab-9f00-9aa60cbeb8a2",
            "username": "test1",
            "email": "test@test.com",
            "password": "password",
            "createdAt": "2024-05-21T14:20:59.675Z",
            "updatedAt": "2024-05-21T14:20:59.675Z",
            "deletedAt": null
        }
    ]
    ```

3. Get user
    ```
    GET /users/:id
    ``` 

    ```
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
        "id": "005f35f2-ae0b-40ab-9f00-9aa60cbeb8a2",
        "username": "test1",
        "email": "test@test.com",
        "password": "password",
        "createdAt": "2024-05-21T14:20:59.675Z",
        "updatedAt": "2024-05-21T14:20:59.675Z",
        "deletedAt": null
    }
    ```

4. Update user
    ```
    PUT /users
    Content-Type: application/json

    {
        "email": "test@test.com",
        "username": "test1",
        "password": "password"
    }
    ``` 

    ```
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
        "id": "005f35f2-ae0b-40ab-9f00-9aa60cbeb8a2",
        "email": "newemail@test.com",
        "createdAt": "2024-05-21T14:20:59.675Z",
        "updatedAt": "2024-05-21T14:22:18.000Z",
        "deletedAt": null
    }
    ```

5. Delete user
    ```
    DELETE /users/:id
    ``` 

    ```
    HTTP/1.1 200 OK
    Content-Type: text/html; charset=utf-8
    
    User 005f35f2-ae0b-40ab-9f00-9aa60cbeb8a2 deletion successful
    ```

## License

This project is licensed under the MIT License
