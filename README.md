# team-availability
team availability system

# React + FastAPI Dockerized Application

This project contains a React frontend and a FastAPI backend, both containerized with Docker and orchestrated via Docker Compose.

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine  
- [Docker Compose](https://docs.docker.com/compose/install/) installed

---

## Project Structure
project-root/
├── backend/ # FastAPI backend source code and Dockerfile
├── frontend/ # React frontend source code and Dockerfile
└── docker-compose.yml # Compose file to run frontend and backend together

---

## How to Run Locally (Development)

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd project-root
   
2. **Build and Start Containers:**
  ```bash
  docker-compose up --build

3. **Access the application:**
React frontend: http://localhost:3000
FastAPI backend (optional): http://localhost:8000
The frontend will automatically communicate with the backend using the Docker internal network.
