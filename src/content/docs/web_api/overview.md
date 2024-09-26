---
title: Web API Overview
description: Detailed overview of the Web API and its structure.
---

## Introduction

The Energyleaf Web API is a central component of the Energyleaf platform, designed to facilitate interaction between various system elements such as sensors, machine learning models, and the user interface. This API supports multiple types of requests including data submissions, report generation, and sensor management.

### Purpose

The API serves as the backbone of the Energyleaf system, allowing for:

- Real-time data collection from energy sensors.
- Machine learning-based analysis of energy consumption.
- Exporting energy and experimental data for research and user transparency.
- Automatic detection of anomalies and energy peaks.
- Regularly generating and sending reports on user energy consumption patterns.

### Structure

The Web API consists of the following endpoint categories:

1. **Sensor Endpoints**: Manage the interaction between the system and the energy sensors installed in households. These endpoints allow sensors to submit data, request tokens for authentication, and confirm script execution. The detailed documentation for sensors is provided in [`sensors overview`](../sensors/v1/overview.md).

2. **Machine Learning Endpoint**: This endpoint triggers machine learning models to analyze and classify peaks in energy consumption, assisting users in understanding their energy usage.

3. **CSV Endpoints**: These are responsible for exporting energy data and experiment data in CSV format, allowing users and administrators to download the data for further analysis.

4. **Cron Endpoints**: These endpoints handle tasks that are automatically triggered by scheduled cron jobs. Examples include marking energy consumption peaks, detecting anomalies, and generating regular reports.

5. **Process Endpoints**: These endpoints execute various backend processes like peak detection and anomaly processing. They are triggered automatically by the system and are for internal purposes only.

### API Trigger Mechanisms

The endpoints are triggered through various mechanisms:

- **Direct Calls**: Some endpoints are triggered by direct API requests from sensors, the web app, or the admin app. Examples include sending sensor data or exporting CSV files.
- **Cron Jobs**: Cron-based endpoints are automatically triggered at scheduled intervals, defined in the `vercel.json` configuration in the [Admin App](../admin/overview.md). These tasks ensure that essential background processes, such as marking peaks and detecting anomalies, are performed regularly.
- **User Actions**: Certain endpoints are triggered by user actions, such as manually generating reports or updating sensor settings.

## Documentation Structure

The detailed documentation for each API endpoint is provided in [`endpoints.md`](./endpoints.md). It covers the following:

- **Endpoint Description**: What the endpoint does and its purpose.
- **Triggering Mechanism**: How the endpoint is triggered, whether manually or automatically.
- **Request and Response Structure**: Details on the required parameters, headers, and the format of responses.
- **Error Handling**: Information on possible errors and how they are handled.

For endpoints that are triggered by cron jobs, refer to [`cron_jobs.md`](./cron_jobs.md), which outlines the configuration of scheduled tasks using Vercel and the specific endpoints involved.