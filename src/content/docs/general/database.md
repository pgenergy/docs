---
title: Database
description: Database schema and table content.
---

We store data in a PostgreSQL database. This page provides an overview of the database schema and table content.

## Historisation of data

In order to analyze how users modify their data, we historize some of our database tables. To do so, we create a history table for each table that we'd like to historize. Therefore, the history table has the exact same schema as the original table. To differentiate between the history and original tables, the name of the history table includes the prefix `history_`.

Before a record is modified or deleted, it gets copied into the history table. After that, a new record can be added to the original table. In order to achieve this, the original table only contains the currently active record. To be able to identify when a record is modified, such tables include a timestamp field with its creation date.

## Timestamps

All timestamps in the database are stored in UTC. When displaying timestamps in the frontend, they are converted to the user's local timezone.

## Database Schema

:::note
This covers the main tables and their schemas in the database. Please note that some columns or tables might have been added or modified since the time this documentation was written. If you need more up-to-date information or have any specific questions, it's recommended to consult the [codebase](https://github.com/pgenergy/energyleaf) directly or reach out to the development team.
:::

The following figure shows an entity relationship diagram of our database. Note that attributes are not shown in the diagram to keep it simple, but they are described in detail in the following sections below.

![Database entity relationship diagram](/src/assets/database_entity_relationship.svg)

The following sections describe each table and its columns in detail.

### User Table

The **user** table contains personal and account information of each user.

| Name | Type | Description |
|------|------|--------------|
| id | text | Unique user identifier |
| created | timestamp | Timestamp at which the user was created |
| email | text | The email address of the user |
| phone | text | The phone number of the user |
| address | text | The full address of the user |
| firstname | text | The first name of the user |
| lastname | text | The last name of the user |
| username | text | The username of the user |
| password | text | The hash of the user's password |
| is_admin | boolean | Determines whether the user is an admin and has access to the admin app |
| is_active | boolean | Determines whether the user is active and can use the app in general |
| is_participant | boolean | Determines whether the user is a participant in our field experiments |
| onboarding_completed | boolean | Determines whether the user has finished the initial onboarding process |
| app_version | smallint | Represents the app version of the user (0=transparency, 1=self_reflection, 2=support) |
| receive_anomaly_mails | boolean | Determines whether the user wants to receive anomaly mails |
| activation_date | timestamp | The date when the user's account was activated |

### History User Table

The **history_user** table stores historic user data. See [above](#user-table) for information about the schema.

### User Experiment Data Table

The **user_experiment_data** table stores information about users participating in our field experiments.

| Name | Type | Description |
|------|------|--------------|
| user_id | text | Reference to the [user table](#user-table) |
| experiment_status | text | The current status of the user in the experiment (e.g., registered, approved, dismissed, exported, etc.) |
| installation_date | timestamp | The date when the sensor was installed for the user |
| deinstallation_date | timestamp | The date when the sensor was deinstalled for the user |
| experiment_number | integer | (Obsolete) The number of the experiment run the user is currently in |
| gets_paid | boolean | Determines whether the user gets paid for participating in the experiment |
| uses_prolific | boolean | (Obsolete) Determines whether the user is using the Prolific platform to get paid |

### User Data Table

The **user_data** table mainly contains information about the user's household, electricity tariff, and consumption habits.

| Name | Type | Description |
|------|------|--------------|
| id | integer | Unique user data identifier |
| user_id | text | Reference to the [user table](#user-table) |
| timestamp | timestamp | Creation date of the record |
| base_price | double precision | The base price of the user's electricity tariff (in €). This is a fixed amount that the user needs to pay each month regardless of how much energy they consumed (German: Grundpreis) |
| working_price | double precision | Represents how much one kWh costs (in €/kWh) (German: Arbeitspreis) |
| tariff | text | Determines which kind of tariff the user has (`basic` or `eco`) |
| household | integer | The number of people living in the household |
| property | text | The kind of household (`house` or `apartment`) |
| living_space | integer | The size of the house/apartment (in m²) |
| hot_water | text | Specifies how the water is heated (`electric` or `not_electric`) |
| monthly_payment | integer | The amount the user has to pay in advance each month for electricity (in €) (German: Abschlagszahlung) |
| consumption_goal | double precision | A daily consumption goal for the user (in kWh/d) |
| electricity_meter_number | text | The number of the user's electricity meter |
| electricity_meter_type | text | The type of the user's electricity meter (`digital` or `analog`) |
| electricity_meter_img_url | text | The URL of an image of the user's electricity meter |
| power_at_electricity_meter | boolean | Determines whether there is power available at the electricity meter |
| wifi_at_electricity_meter | boolean | Determines whether there is WiFi available at the electricity meter |
| installation_comment | text | A comment regarding the installation of the user's electricity meter |
| device_power_estimation_r_squared | double precision | The R-squared value for the device power estimation |

### History User Data Table

The **history_user_data** table stores historic user data. See [above](#user-data-table) for information about the schema.

### User Tip of the Day Table

The **user_tip_of_the day** table stores information about the energy saving tip of the day shown to users.

| Name | Type | Description |
|------|------|--------------|
| user_id | text | Reference to the [user table](#user-table) |
| tip_id | integer | The unique identifier of the tip |
| timestamp | timestamp | The date when the tip was shown to the user |

### Session Table

The **session** table stores the sessions of the user in the Web App.

| Name | Type | Description |
|------|------|--------------|
| id | text | The unique identifier of the session |
| user_id | text | Reference to the [user table](#user-table) |
| expires_at | timestamp | The point in time where this session expires |

### Token Table

The **token** table stores tokens for user authentication.

| Name | Type | Description |
|------|------|--------------|
| token | text | The unique token value |
| user_id | text | Reference to the [user table](#user-table) |
| created_timestamp | timestamp | The point in time when the token was created |

### Sensor Table

The **sensor** table contains the sensors that are registered in the system.

| Name | Type | Description |
|------|------|--------------|
| sensor_id | text | Unique sensor identifier |
| client_id | text | The MAC address of the sensor in the format `01:23:45:67:89:AB` |
| version | integer | The version of the sensor |
| sensor_type | text | The type of sensor (`Electricity` or `Gas`) |
| user_id | text | Reference to the [user table](#user-table). Represents the user which the sensor is assigned to |
| needs_script | boolean | Determines whether the sensor needs a script to work |
| script | text | The script of the sensor (should be used in combination with `needs_script`) |

### Sensor History Table

The **sensor_history** table stores historic sensor data. See [above](#sensor-table) for information about the schema.

### Sensor Token Table

The **sensor_token** table stores the tokens that sensors need to send data to the server.

| Name | Type | Description |
|------|------|--------------|
| code | text | The unique token code |
| sensor_id | text | Reference to the [sensor table](#sensor-table) |
| timestamp | timestamp | The point in time where this token has been created |

### Sensor Data Table

The **sensor_data** table contains the data captured by sensors. The *id* field is used as a primary key, while the *sensor_id* and *timestamp* combination should be unique.

| Name | Type | Description |
|------|------|--------------|
| id | text | Unique identifier |
| sensor_id | text | Reference to the [sensor table](#sensor-table) |
| value | numeric | Captured data value from the sensor. This represents the meter reading in kWh |
| consumption | numeric | The calculated consumption based on the sensor data |
| value_out | numeric | The output value measured by the sensor (if applicable). This represents meter reading in kWh of the energy that has been fed into to grid |
| inserted | numeric | The amount of energy inserted into the grid (if applicable) |
| value_current | numeric | The current power value measured by the sensor (if applicable) |
| timestamp | timestamp | Date at which the sensor data was captured |

### Device Table

The **device** table contains each user's devices.

| Name | Type | Description |
|------|------|--------------|
| id | integer | Unique device identifier |
| user_id | text | Reference to the [user table](#user-table) |
| name | text | The name of the device |
| category | text | The category of the device (see [categorization](/web/devices#categorization-of-devices)) |
| created | timestamp | The point in time where this device was created |
| timestamp | timestamp | The point in time where the device was last updated |
| power | numeric | The power of the device in Watt |
| is_power_estimated | boolean | Determines whether the power consumption of the device should be estimated |
| weekly_usage_estimation | numeric | An estimation of the weekly usage of the device in hours |

### History Device Table

The **history_device** table stores historic device data. See [above](#device-table) for information about the schema.

### Device to Peak Table

The **device_to_peak** table defines the n:m relationship between a peak in the [sensor data sequence](#sensor-data-sequence-table) and the [device table](#device-table).

| Name | Type | Description |
|------|------|--------------|
| device_id | integer | References the [device table](#device-table) |
| sensor_data_sequence_id | text | References the [sensor data sequence table](#sensor-data-sequence-table) |

### Device Suggestions Peak Table

The **device_suggestions_peak** table stores suggestions for device categories per peak provided by a machine learning model.

| Name | Type | Description |
|------|------|--------------|
| id | integer | Unique identifier |
| sensor_data_sequence_id | text | References the [sensor data sequence table](#sensor-data-sequence-table) |
| device_category | text | The suggested device category for the peak |

### Sensor Data Sequence Table

The **sensor_data_sequence** table stores information about sequences of sensor data, such as peaks or anomalies (see [sequences page](/web/sequences)).

| Name | Type | Description |
|------|------|--------------|
| id | text | Unique identifier |
| sensor_id | text | Reference to the [sensor table](#sensor-table) |
| start | timestamp | The start timestamp of the sequence |
| end | timestamp | The end timestamp of the sequence |
| type | text | The type of the sequence (`peak` or `anomaly`) |
| average_peak_power | numeric | The average power consumption during the peak sequence |


### Peak Suggestions Evaluation Table

The **peak_suggestions_evaluation** table is a view that evaluates the device category suggestions provided by the machine learning model.

| Name | Type | Description |
|------|------|--------------|
| sensor_data_sequence_id | text | References the [sensor data sequence table](#sensor-data-sequence-table) |
| correct | text[] | The device categories that were correctly suggested by the model and kept by the user |
| wrong | text[] | The device categories that were incorrectly suggested by the model and not kept by the user |
| missing | text[] | The device categories that were not suggested by the model but were selected by the user |

### Logs Table

The **logs** table stores logs from various parts of the application, categorizing them into actions, errors, and informational messages.

| Name         | Type      | Description |
|--------------|-----------|-------------|
| id           | integer   | Unique log identifier, automatically generated. |
| timestamp    | timestamp | The timestamp when the log was created, defaults to the current date and time. |
| title        | text      | A brief title describing the log event. |
| log_type     | text      | The type of the log event (`action`, `error`, `info`, `undefined`). Defaults to `undefined`. |
| app_function | text      | The function in the app where the log was generated. |
| app_component| text      | The application component (`web`, `admin`, `api`, `undefined`). Defaults to `undefined`. |
| details      | json      | JSON object containing additional details about the log event. |

### Report Config Table

The **report_config** table stores user-specific configurations receiving their [reports](/web/reports).

| Name                | Type      | Description |
|---------------------|-----------|-------------|
| id                  | integer   | Unique identifier, automatically generated. |
| user_id             | text      | Reference to the user for whom the report is configured. |
| receive_mails       | boolean   | Determines whether the user receives report emails. Defaults to `true`. |
| interval            | integer   | The interval (in days) at which reports are generated. Defaults to `3`. |
| time                | integer   | The time of day (in hours) when the report is generated. Defaults to `6`. |
| timestamp_last      | timestamp | The last time a report was generated. Defaults to `2020-01-01 00:00:00`. |
| created_timestamp   | timestamp | The timestamp when the report configuration was created. Defaults to the current timestamp. |

### History Report Config Table

The **history_report_config** table stores historic configurations for energy consumption reports. The schema is identical to the [report_config](#report-config-table).

### Report Data Table

The **report_data** table stores the [report](/web/reports) data generated for the user.

| Name                          | Type           | Description |
|-------------------------------|----------------|-------------|
| id                             | text           | Unique identifier for the report, automatically generated. |
| timestamp                      | timestamp      | The timestamp when the report was created, defaults to the current timestamp. |
| user_id                        | text           | Reference to the user for whom the report is generated. |
| date_from                      | timestamp      | The start date for the data in the report. Defaults to the current timestamp. |
| date_to                        | timestamp      | The end date for the data in the report. Defaults to the current timestamp. |
| total_energy_consumption        | doublePrecision| The total energy consumption for the period. |
| avg_energy_consumption_per_day  | doublePrecision| The average daily energy consumption for the period. |
| total_energy_cost              | doublePrecision| The total cost of energy for the period. |
| avg_energy_cost                | doublePrecision| The average daily cost of energy for the period. |
| worst_day                      | timestamp      | The day with the highest energy consumption. |
| worst_day_consumption           | doublePrecision| The energy consumption on the worst day. |
| best_day                       | timestamp      | The day with the lowest energy consumption. |
| best_day_consumption            | doublePrecision| The energy consumption on the best day. |

### Reports Day Statistics Table

The **reports_day_statistics** table stores daily statistics for energy consumption reports.

| Name              | Type            | Description |
|-------------------|-----------------|-------------|
| id                | text            | Unique identifier for the daily statistics, automatically generated. |
| date              | timestamp       | The date for which the statistics are recorded. |
| daily_consumption | doublePrecision | The energy consumption for that day. |
| daily_goal        | doublePrecision | The daily consumption goal (optional). |
| exceeded          | boolean         | Whether the user exceeded their consumption goal for the day. |
| progress          | doublePrecision | The user's progress towards their daily goal, represented as a percentage. |
| report_id         | text            | Reference to the [report_data](#report-data-table) for which these statistics were generated. |


## Performance of Timeseries Data

As the amount of data grows, querying timeseries data can become a performance bottleneck, especially when you need to aggregate data a lot. To improve the performance of timeseries data queries, data can be partitioned by time. Unfortunately, this leads to overhead in maintenance since you need to plan and manage the partitions yourself. To lower this overhead and still benefit from partitioning, the TimescaleDB extension of PostgreSQL can be used. It provides automatic partitioning of timeseries data and is optimized for time-series data queries.

:::tip
Check out the [TimescaleDB documentation](https://docs.timescale.com/) for more information.
:::

Applying TimescaleDB to our database schema, the [sensor_data](#sensor-data-table) table can be transformed into a hypertable. To query aggregated data efficiently, we use the following materialized views:

- **sensor_data_hour**: Aggregates sensor data per hour
- **sensor_data_day**: Aggregates sensor data per day
- **sensor_data_week**: Aggregates sensor data per week
- **sensor_data_month**: Aggregates sensor data per month

These tables contain columns for various aggregated values, such as `max_value`, `min_value`, `avg_value_current`, `sum_consumption`, `sum_inserted`, `min_timestamp`, and `max_timestamp`.
