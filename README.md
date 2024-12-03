# Distributed Systems: Valdivian (E-Commerce)

## Goal

The goal of the project is to set up a three-tier application using Docker Compose, with separate frontend, backend, and database services. It includes managing service dependencies and implementing health checks to ensure proper service availability and reliability.

To fulfill this goal, an e-commerce website will be developed, meeting the requirements for the three-tier architecture with separate frontend, backend, and database layers.

## Startup (Windows/MacOS)

You first need to install Docker Desktop -> https://www.docker.com/products/docker-desktop/. In order for the app to start, docker desktop needs to be running.

Clone this repository

```
git clone https://github.com/codr1an/valdivian.git
```

Change directory into the project folder

```
cd valdivian/
```

Start the app with docker compose

```
docker-compose up --build
```

Access the app: http://localhost:3000/

Shutting down

```
docker-compose down
```

Following users are already created for testing:

| ID  | Address                          | Email           | Name       | Password | Role  |
| --- | -------------------------------- | --------------- | ---------- | -------- | ----- |
| 1   | Admin Street 1, 61616 Adminstadt | admin@gmail.com | Cool Admin | admin12  | admin |
| 2   | User street, 61234 Userstadt     | user@gmail.com  | Cool User  | user12   | user  |

## Health checks

This project contains two types of health checks:

- Internal (can be accessed in the app itself at http://localhost:3000/service_dashboard while logged in as admin), this is done through a dedicated controller in the backend.
- Docker compose healthchecks that are shown in the `Status` column after executing the command below in a terminal

```
docker ps
```

## Technologies Used

The backend of the project is built using Java 17 and Spring Boot 3.3.4.

The frontend of the project is built using React and styled with Bootstrap to create a responsive, user-friendly interface.

For the database, MariaDB was used during development, hosted via XAMPP. In the production environment, a MySQL Docker container is utilized.

The project is containerized using Docker Compose, which includes three services:

1. **db**: A MySQL database service built from the `Dockerfile.db`, with environment variables for database configuration and a health check.
2. **frontend**: A React-based frontend service, built from the `Dockerfile.frontend`, and exposed on port `3000`.
3. **backend**: A Spring Boot backend service, built from the `Dockerfile.backend`, and exposed on port `8080`. It depends on the `db` service being healthy before starting.
