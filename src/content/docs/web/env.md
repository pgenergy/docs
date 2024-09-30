---
title: Environment Variables
description: An overview of all environment variables used in the web app.
---

## `HASH_SECRET`
- **Type:** `string`
- **Required:** Yes
- **Description:** This secret is used for hashing sensitive information within the application.

## `CRON_SECRET`
- **Type:** `string`
- **Required:** No
- **Description:** A secret used to authenticate or secure scheduled cron jobs. If not provided, certain cron jobs might require additional authentication measures.

---

## `ML_API_URL`
- **Type:** `string`
- **Required:** Yes
- **Description:** The base URL for the machine learning API service used by the application. This URL points to the endpoint where the app will send requests for ML-related operations.

## `ML_API_KEY`
- **Type:** `string`
- **Required:** Yes
- **Description:** API key for authenticating requests to the machine learning service.

---

## `PG_CONNECTION`
- **Type:** `string`
- **Required:** Yes
- **Description:** Connection string for accessing the main PostgreSQL database. It typically includes the database host, port, user, password, and database name.

## `PG_DIRECT`
- **Type:** `string`
- **Required:** Yes
- **Description:** Direct connection string for the PostgreSQL database, possibly used for specific direct queries or operations that bypass other connection pools or intermediaries.

---

## `RESEND_API_KEY`
- **Type:** `string`
- **Required:** No
- **Description:** API key for integrating with Resend. Required only if the application sends emails using Resend.

## `RESEND_API_MAIL`
- **Type:** `string`
- **Required:** No
- **Description:** The default email address to be used as the sender when sending emails via Resend. Optional if email functionality is not required.

---

## `ADMIN_MAIL`
- **Type:** `string`
- **Required:** No
- **Description:** Admin email address used for sending important notifications or alerts to administrators. It’s optional if no such alerts or notifications are needed.

## `SIGNUP_DISABLED`
- **Type:** `boolean`
- **Required:** No
- **Description:** A flag to disable user signup functionality. If set to `"true"` or `"1"`, the signup process will be disabled. Otherwise, it will remain enabled.

---

## `AWS_ACCESS_KEY_ID`
- **Type:** `string`
- **Required:** No
- **Description:** AWS Access Key ID for interacting with AWS S3. Required only if the app should use an AWS S3 bucket.

## `AWS_SECRET_ACCESS_KEY`
- **Type:** `string`
- **Required:** No
- **Description:** AWS Secret Access Key for securely interacting with AWS S3. Required only if the app should use an AWS S3 bucket.

## `AWS_ENDPOINT_URL_S3`
- **Type:** `string`
- **Required:** No
- **Description:** The endpoint URL for the S3 service, used when working with non-standard S3-compatible storage providers or AWS S3 itself. Optional based on AWS integration needs.

## `AWS_REGION`
- **Type:** `string`
- **Required:** No
- **Description:** The region where the AWS S3 bucket is located. Required only if the app should use an AWS S3 bucket.

## `BUCKET_NAME`
- **Type:** `string`
- **Required:** No
- **Description:** Name of the S3 bucket used for storing files. Optional unless file storage in AWS S3 (or an S3-compatible service) is used.

## `FILE_URL`
- **Type:** `string`
- **Required:** No
- **Description:** The base URL for accessing files stored in the S3 bucket or other file storage services. Optional if file storage functionality is not required.

---

## `HANDBOOK_TRANSPARENCY_VERSION_KEY`
- **Type:** `string`
- **Required:** No
- **Description:** File key in the S3 bucket for retrieving the handbook for [app version](/web/app-versions) 1.

## `HANDBOOK_SELF_REFLECTION_VERSION_KEY`
- **Type:** `string`
- **Required:** No
- **Description:** File key in the S3 bucket for retrieving the handbook for [app version](/web/app-versions) 2.

## `HANDBOOK_SUPPORT_VERSION_KEY`
- **Type:** `string`
- **Required:** No
- **Description:** File key in the S3 bucket for retrieving the handbook for [app version](/web/app-versions) 3.