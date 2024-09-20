---
title: ML API
description: The machine learning API providing access to the machine learning models.
---

The ML-API can be found at `https://github.com/pgenergy/ml-api`.

This API is built to facilitate efficient and seamless integration between machine learning models and the Energyleaf web application. It currently supports models for device classification and CO2 predictions, with the flexibility to incorporate additional models in the future as needed.

The models for requests and responses are located in `app/models/`. The routes through which the various requests can be accessed are in `app/routers/`. The routes are divided into different versions. The models are loaded in `app/tasks/load_models.py` and stored under `models/`.

**Hosting** is handled through Fly.io (`https://fly.io`), and **communication** uses Protobuf.

## Install dependencies

It is assumed that Python is installed on the device. Create a virtual python3 environment at the top level of the folder structure, install `requirements.txt`, and run the API on `http://localhost:80/`.

## Running in Docker container

The ML-API uses **Docker** and can be launched locally with the following command:
```bash
$ docker-compose up --build
```

Once Docker is installed, the API can be accessed via the OpenAPI/Swagger interface at `http://localhost:80/docs`.