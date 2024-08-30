---
title: ML API
description: The machine learning API providing access to the machine learning models.
---

The ML-API can be found at `https://github.com/pgenergy/ml-api`.

The models for requests and responses can be found in `app/models/models.py`. The routes through which the various requests can be accessed are located in `app/routers/ml_api.py`. There, the routes are divided into different versions. The models are loaded in `app/tasks/load_models.py` and stored under `code/models/`.

- [Structure](/ml_api/structure)
- [Data-processing](/ml_api/data_processing)
- [Model-training](/ml_api/model_training)
- [Hosting](/ml_api/hosting)

**Hosting** is handled through Fly.io (`https://fly.io`). The **communication** is done via Protobuf. 

## Install dependencies

It is assumed that Python is installed on the device. Create a virtual python3 environment at top level of folder structure and install requirements.text inside that environment and run `http://localhost:80/`.

## Running in Docker container

Overall, the ML-API uses **Docker**, which can be launched locally through the command line with `docker-compose up --build` after Docker is installed.

Visit the OpenAPI/Swagger Iterface via `http://localhost:80/docs`.