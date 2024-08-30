---
title: Project Structure
description: Overview of the directory structure for the ml-api project.
---

# Project Structure

## Overview

This documentation provides an overview of the directory structure for the `ml-api` project. The project is organized in a way that facilitates easy development, deployment, and scaling of machine learning models as microservices. Each folder and file plays a specific role in the architecture, and this document explains their purpose and functionality.

## Directory Structure

The directory structure is designed to separate concerns, ensuring clear organization of the codebase. Below is a description of the key folders and files:

### Top-Level Files
- **README.md**: The main README file that provides an overview of the project and instructions on how to get started.
- **requirements.txt**: Contains the list of Python dependencies required to build the environment.
- **docker-compose.yaml**: Configuration file for Docker Compose, defining the services, networks, and volumes for the project.
- **Dockerfile**: The central Dockerfile for the project, defining the image used to run the application.

### App Directory
The `app` folder defines the core application logic and is organized as follows:

- **`__init__.py`**: Initializes the app module.
- **`main.py`**: The main function for the microservice application. This file contains the entry point to start the service.
- **`settings.py`**: The settings file for the microservice, defining input and output configurations for the application's interface.

#### Models
- **`app/models`**: This folder defines the internal data structures used within the application.
  - **`models.py`**: Contains the classes and schemas that represent the data models.

#### Routers
- **`app/routers`**: Contains all the routers and their corresponding input and output models, allowing for routing logic and API endpoints.
  - **`ds_api/ds_api.py`**: Defines the routes for the Data Science API.
  - **`ds_api/models.py`**: Contains the models used specifically by the Data Science API.

#### Services
- **`app/services`**: The core services used for the microservice processes, such as loading models, managing data, and more.
  - **`services.py`**: Implements the logic for the core services.

#### Tasks
- **`app/tasks`**: Subtasks that are part of the application, often related to machine learning operations.
  - **`load_models/load_models.py`**: Contains the logic to load machine learning models into the application.

### Code Directory
- **`code`**: Contains the experimental code developed during the early stages of the project.
  - **`archive`**: Outdated code that is no longer part of the active project.
  - **`training`**: The code used for training the machine learning models.

### Data Directory
- **`data`**: Serves as a storage location for data and scripts used to download or create datasets for the models.

## Functionality

The following section provides a brief overview of the key functionalities within the project:

### Microservice Application
- The `main.py` file under the `app` folder defines the entry point for the microservice application. It sets up the necessary configurations, initializes routes, and starts the application server.

### Loading Models
- The `load_models.py` file in the `app/tasks/load_models` folder handles the task of loading machine learning models into the application. This is a core part of the microservice, as it prepares the models to be used for predictions.

### API Endpoints
- The API routes are managed under the `app/routers` folder. These routes allow users to interact with the machine learning models through a structured API, and the associated models define the expected inputs and outputs.

---