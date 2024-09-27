---
title: Scripts
description: A collection of scripts that help with specific tasks.
---

In the mono-repo, there are several scripts that help with various tasks, such as downloading and inserting energy data, generation of demo data, and data migration. These scripts are written in Typescript and can be executed using the following command:

```bash
pnpm execute <file> <script-name> [args]
```

## Insert Energy Data 

The file `insert-energy-data.ts` contains scripts that handle various tasks related to energy data, such as inserting and downloading energy data and marking peaks.

### 1. `insertEnergyData`
- **Description**: This function inserts energy data given in a local JSON file (`download.json`) for a specific sensor into the database.
- **Arguments**: 
  - `sensorId`: The ID of the sensor for which data needs to be inserted.
- **Behavior**: The function checks if a `sensorId` is provided and calls an internal function to insert sensor data for that sensor.

### 2. `download`
- **Description**: This function retrieves energy data for a specific sensor from the database over a specific time period and saves it to a local JSON file (`download.json`).
- **Arguments**: 
  - `sensorId`: The ID of the sensor whose data is to be downloaded.
- **Behavior**: It checks if a `sensorId` is provided, retrieves data for the last 15 days, and saves it in a JSON format locally.

### 3. `markPeaks`
- **Description**: Marks peaks in energy consumption for a specific sensor over a predefined time period (from 10 days ago to 5 days in the future).
- **Arguments**: 
  - `sensorId`: The ID of the sensor for which peaks need to be marked.
- **Behavior**: The function checks for a valid `sensorId` and then marks peaks for that sensor within the specified time frame.

### 4. `addDemoData`
- **Description**: Adds demonstration sensor data to the database for the [demo mode](/web/demo).
- **Arguments**: *None*
- **Behavior**: It adds data for a demo sensor (`"demo_sensor"`) and marks peaks in the data after inserting it.

## TimescaleDB Migrate

The file `timescaledb-migrate.ts` contains a script for migrating data from a MySQL database to a PostgreSQL (TimescaleDB) database (see [DB schema](/general/database#database-schema)).

### 1. `timescaleDbMigrate`
- **Description**: The main function responsible for migrating data from MySQL to PostgreSQL.
- **Arguments**: *None*
- **Behavior**: Executes the database migration process as a transaction in TimescaleDB. It also tracks the time taken for the migration process.