---
title: Cron Endpoints
description: Detailed documentation for all cron-triggered endpoints and their scheduling configuration.
---

## Introduction

The Web API contains several endpoints that are triggered automatically using **Vercel Cronjobs**. These jobs are responsible for running specific tasks at scheduled intervals, such as detecting energy anomalies, marking peaks in energy usage, and generating reports.

Cronjobs ensure that the backend tasks are executed without user intervention, making the system more efficient by automating repetitive processes. In this documentation, we will cover the cron-triggered endpoints, their configuration, and how they work.

## Vercel Cronjob Configuration

The Vercel platform handles cronjob scheduling via the `vercel.json` configuration file. This file defines the cron jobs' schedules and specifies which API paths are triggered by each cron job.

The `vercel.json` file includes the following cronjob configuration:

```json
{
    "crons": [
        {
            "path": "/api/v1/reports",
            "schedule": "0 * * * *"
        },
        {
            "path": "/api/v1/survey_routine",
            "schedule": "0 0 * * *"
        },
        {
            "path": "/api/v1/mark_peaks",
            "schedule": "0,30 * * * *"
        },
        {
            "path": "/api/v1/anomaly",
            "schedule": "0,30 * * * *"
        }
    ]
}
```

If you're not using Vercel as your deployment platform, you will need to configure your own cron job system.

### Schedule Format

The schedule uses the **cron format**, which follows the structure:

```
*    *    *    *    *  
│    │    │    │    │
│    │    │    │    └── Day of the week (0 - 7) (Sunday to Saturday)
│    │    │    └── Month (1 - 12)
│    │    └── Day of the month (1 - 31)
│    └── Hour (0 - 23)
└── Minute (0 - 59)
```

In the examples provided:
- `"0 * * * *"` means the job runs at the beginning of every hour.
- `"0 0 * * *"` means the job runs at midnight every day.
- `"0,30 * * * *"` means the job runs every 30 minutes.

## Cron-Triggered Endpoints

### `GET /survey_routine`
- **Description**: This endpoint sends survey invitations to users.
- **Schedule**: Triggered every day at midnight (`0 0 * * *`).
- **Response**:
  - `200 OK`: Surveys were successfully sent to all due participants.
  - `500 Internal Server Error`: There was an issue sending survey invitations.

### `GET /anomaly`
- **Description**: This endpoint checks for anomalies in the energy consumption data of registered users. Anomalies may indicate abnormal energy usage. The detailed documentation of the anomaly detection logic is provided in [`sequences`](../web/sequences.mdx).
- **Schedule**: Triggered every 30 minutes (`0,30 * * * *`).
- **Response**:
  - `200 OK`: Anomalies were successfully detected and processed.
  - `500 Internal Server Error`: An error occurred during the anomaly detection process.

### `GET /mark_peaks`
- **Description**: This endpoint analyzes energy consumption data to detect and mark peaks in energy usage. Peaks typically represent periods when high-energy devices are in use. The detailed documentation of the peak detection logic is provided in [`sequences`](../web/sequences.mdx).
- **Schedule**: Triggered every 30 minutes (`0,30 * * * *`).
- **Response**:
  - `200 OK`: Peaks were successfully detected and marked.
  - `500 Internal Server Error`: There was an issue processing the peak detection.

### `GET /reports`
- **Description**: This endpoint generates periodic reports for users based on their energy consumption data.
- **Schedule**: Triggered every hour (`0 * * * *`).
- **Response**:
  - `200 OK`: Reports were successfully generated and sent to users.
  - `500 Internal Server Error`: There was an error during report generation.
