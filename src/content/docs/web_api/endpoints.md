---
title: API Endpoints
description: Detailed documentation of all API endpoints with request/response structures and error handling.
---

## Sensor Endpoints

### `POST /sensor_input`
- **Description**: This endpoint allows sensors to send their energy consumption data to the system.
- **Trigger**: Triggered by the sensors installed in the user's household when they need to send energy data to the server.
- **Request**:
  - **Headers**:
    - `Authorization`: Sensor token for authentication (e.g., `Bearer <token>`).
  - **Body**: Protobuf format containing:
    - `value`: Energy consumption reading (numeric).
    - `timestamp`: (Optional) Timestamp of the reading. Defaults to the current time.
- **Validation Logic**:
  - The new sensor value is compared against the last stored value from the database.
  - The time difference between the new reading and the previous reading is calculated.
  - The value difference is then validated to ensure it is within reasonable limits to avoid false readings.
  - If the difference is too large, the system will reject the new value as a possible erroneous reading.
- **Response**:
  - `200 OK`: Data was successfully received and saved.
  - `400 Bad Request`: The sensor data is invalid or incomplete, including when the value difference exceeds the validation threshold.
  - `401 Unauthorized`: The token provided is invalid or missing.

### `POST /token`
- **Description**: Used to generate a new token for a sensor.
- **Trigger**: Triggered by the sensor itself when it needs a new or refreshed token for further API interactions.
- **Request**:
  - **Headers**:
    - `Content-Type`: `application/json`
  - **Body**: Protobuf object containing:
    - `sensor_id`: Unique identifier of the sensor.
    - `secret`: A secret key (if required) for additional security.
- **Response**:
  - `200 OK`: A new token was generated successfully.
  - `401 Unauthorized`: Token request failed due to invalid credentials.

### `POST /script_accepted`
- **Description**: Confirms that a sensor has successfully received and accepted its script.
- **Trigger**: Triggered after a sensor receives a script from the server.
- **Request**:
  - **Headers**:
    - `Authorization`: Sensor token.
  - **Body**: Protobuf object containing:
    - `sensor_id`: Unique identifier of the sensor.
    - `script_id`: ID of the script that was received.
- **Response**:
  - `200 OK`: The script was accepted successfully.
  - `404 Not Found`: The sensor or script could not be found in the system.

---

## Machine Learning Endpoint

### `POST /ml`
- **Description**: Triggers a machine learning model to classify energy consumption peaks for a sensor.
- **Trigger**: Typically triggered after a peak is detected in the energy data.
- **Request**:
  - **Headers**:
    - `Authorization`: API key for the machine learning model.
  - **Body**: JSON object containing:
    - `sensor_id`: Unique identifier of the sensor.
    - `data`: Sensor data to be analyzed for classification.
- **Response**:
  - `200 OK`: The machine learning model successfully classified the data.
  - `500 Internal Server Error`: There was an issue with the ML model or the data provided.

---

## CSV Endpoints

### `GET /csv_energy`
- **Description**: Exports energy consumption data for a given sensor in CSV format.
- **Trigger**: Called by users to download their energy consumption data.
- **Request**:
  - **Headers**:
    - `Authorization`: User authentication token.
  - **Query Parameters**:
    - `start`: Start date for the data range (optional).
    - `end`: End date for the data range (optional).
  - **Example**: `/csv_energy?start=2023-01-01&end=2023-01-31`
- **Response**:
  - `200 OK`: Returns the CSV data.
  - `404 Not Found`: The user does not exist or no data was found for the given user or date range.

### `GET /csv_experiment`
- **Description**: Exports experiment data related to energy consumption in CSV format.
- **Trigger**: Called by administrators or researchers to retrieve experimental data.
- **Request**:
  - **Headers**:
    - `Authorization`: Admin authentication token.
  - **Query Parameters**:
    - `experiment_id`: Unique identifier for the experiment.
- **Response**:
  - `200 OK`: Returns the CSV file containing experiment data.
  - `404 Not Found`: No data found for the given experiment ID.

---

## Process Endpoints

In Vercel, long running endpoints typically run into timeouts. In our case, that mainly happened when the same operation needs to be performed for multiple users. To prevent such timeouts, we move the operation into a process endpoint that performs the operation for one user. Thus, each user specific operation has its own timeout.

### `POST /process_peaks`
- **Description**: Processes and marks peaks in the energy consumption data for one specific user. These peaks are often linked to the use of high-energy devices.
- **Trigger**: Triggered automatically after peaks are detected in the sensor data.
- **Request**:
  - **Headers**:
    - `Content-Type`: `application/json`
  - **Body**: JSON object containing:
    - `sensor_id`: Unique identifier of the sensor.
    - `secret`: Authentication secret for the cronjob.
- **Response**:
  - `200 OK`: Peaks were processed and marked successfully.
  - `404 Not Found`: No peaks found to process.

### `POST /process_anomaly`
- **Description**: Processes anomalies in the energy consumption data for one specific user. Anomalies typically represent unexpected or irregular energy usage.
- **Trigger**: Triggered either manually or by a cron job when anomalies are detected.
- **Request**:
  - **Headers**:
    - `Content-Type`: `application/json`
  - **Body**: JSON object containing:
    - `sensor_id`: Unique identifier of the sensor.
    - `secret`: Authentication secret for the cronjob.
- **Response**:
  - `200 OK`: Anomalies were processed successfully.
  - `404 Not Found`: No anomalies detected.

### `POST /process_reports`
- **Description**: Generates an energy consumption report based on sensor data and user activity.
- **Trigger**: Triggered by a cron job or manually to generate periodic reports.
- **Request**:
  - **Headers**:
    - `Content-Type`: `application/json`
  - **Body**: JSON object containing:
    - `user_id`: Unique identifier of the user.
    - `secret`: Authentication secret for the cronjob.
- **Response**:
  - `200 OK`: The report was generated successfully.
  - `500 Internal Server Error`: An error occurred during report generation.
