---
title: Database
description: Planetscale database schema and table content.
---

Data is stored in the [planetscale](https://app.planetscale.com/energyleaf/energyleaf) database with MySQL as the DBMS. This page provides an overview of the database schema and table content.

## Historisation of data

In order to analyse the how the users modify their data, we historise some of our database tables. To do so, we create a history table for each table that we'd like to historise. Therefore, the history table has the exact same schema as the original table. To differentiate between the history and original tables, the name of the history table includes the prefix `history_` or suffix `_history`.

Before a record is modified or deleted, it gets copied into the history table. After that, a new record can be added to the original table. In order of that, the original table only contains the currently active record. To be able to identify when a record is modified, such tables include a timestamp field with its creation date.

## Database Schema

The following figure shows an entity relationship diagram of our database.

![entity relationship diagram](/src/assets/database_entity_relationship.svg)

In the following, each table and its columns are briefly described.

### User Table
The user table contains personal and account information of each user.

| Name | Type | Description |
|------|---|---|
| id   | varchar(30) | Unique user identifier  |
| created | timestamp | Timestamp at which the user was created |
| email | varchar(256) | The email address of the user |
| username | varchar(30) | The name of the user |
| password | varchar(256) | The hash of the user's password |
| is_admin | boolean | Determines whether the user is an admin and has access to the admin app |
| is_active | boolean | Determines whether the user is active and can use the app in general |
| onboarding_completed | boolean | Determines whether the user has finished the initial onboarding process |
| app_version | smallint | Represents the app version of the user (0=transparency, 1=self_reflection, 2=support) |

### User Data Table

The **user_data** table mainly contains information about the user's household, electricity tariff, and consumption habits.

| Name | Type | Description |
|------|---|---|
| id   | int | Unique user data identifier  |
| user_id | varchar(30) | Reference to the [user table](#user-table) |
| timestamp | timestamp | Creation date of the record |
| base_price | float | The base price of the user's electricity tariff (in €). This a fix amount that the user needs to pay each month regardless of how much energy he consumed (german: Grundpreis) |
| working_price | float | Represents how much one kWh costs (in €/kWh) (german: Arbeitspreis) |
| tariff | enum | Determines which kind of tariff the user has (`basic` or `eco`) |
| households | int | The number of people living in the household |
| property | enum | The kind of household (`house` or `apartment`) |
| living_space | int | The size of the house/apartment (in m²) |
| hot_water | enum | Specifies how the water is heated (`electric` or `not_electric`) |
| advance_payment_electricity | int | The amount the user has to pay in advance each month for electricity (in €) (german: Abschlagszahlung) |
| consumption_goal | int | A daily consumption goal for the user (in kWh/d) |

### History User Data Table

The **history_user_data** table stores historic user data. See [above](#user-data-table) for information about the schema.

### Session Table

The **session** table stores the sessions of the user in the Web App.

| Name | Type | Description |
|------|---|---|
| id | varchar(255) | The unique identifier of the session |
| user_id | varchar(30) | Reference to the [user table](#user-table) |
| expires_at | datetime | The point in time where this sessions expires |

### Reports Table

The **reports** table stores the configurations of users regarding reports.

| Name | Type | Description |
|------|---|---|
| id | int | The unique identifier of the reports configuration |
| user_id | varchar(30) | Reference to the [user table](#user-table) |
| receive_mails | boolean | Determines whether this user wants to receive mails at all |
| interval | int | The interval between the reports (in days) |
| time | int | The hour at which the report should be send (e. g. `6` means 6am and `18` mean 6pm) |
| timestamp_last | timestamp | The point in time where the last reports of the user has been sent |
| created_timestamp | timestamp | The point in time where this record was created |

### Reports History Table

The **history_reports** table stores historic report configuration. See [above](#reports-table) for information about the schema.

### Sensor Table

The **sensor** table contains the sensors that are registered in the system.

| Name | Type | Description |
|------|---|---|
| id | varchar(30) | Unique sensor identifier |
| client_id | varchar(255) | The MAC address of the sensor in the format `01:23:45:67:89:AB` |
| version | int | The version of the sensor |
| sensor_type | enum | The type of sensor (`electricity` or `gas`) |
| user_id | varchar(30) | Reference to the [user table](#user-table). Represents the user which the sensor is assigned to |
| needs_script | boolean | Determines whether the sensor needs a script to work |
| script | text | The script of the sensor (should be used in combination with `needs_script`) |

### Sensor History Table

The **sensor_history** table stores historic sensor data. See [above](#sensor-table) for information about the schema.

### Sensor Token Table

The **sensor_token** table stores the tokens that sensors need to send data to the server.

| Name | Type | Description |
|------|---|---|
| code | varchar(30) | The unique token code |
| sensor_id | varchar(30) | Reference to the [sensor table](#sensor-table) |
| timestmap | timestamp | The point in time where this token has been created |

### Sensor Data Table

The **sensor_data** table contains the data captured by sensors. The *id* field is used as a primary key, while the *sensor_id* and *timestamp* combination should be unique. 

| Name | Type | Description |
|------|---|---|
| id | varchar(35) | Unique identifier |
| value | real(precision: 12, scale: 4) | Captured data value from the sensor. This represents meter reading in kWh |
| timestamp | timestamp | Date at which the sensor data was captured |
| sensor_id | varchar(30) | Reference to the [sensor table](#sensor-table) |

### Device Table

The **device** table contains each user's devices.

| Name | Type | Description |
|------|---|---|
| id | int | Unique device identifier |
| user_id | varchar(30) | Reference to the [user table](#user-table) |
| name | varchar(30) | The name of the device |
| category | varchar(30) | The category of the device (`CoolingAndFreezing`, `CookingAndBaking`, `CleaningAndLaundry`, `EntertainmentAndComputers`, `SmallKitchenAppliances`, `ClimateAndHeating`, `Lighting`, `Care`) |
| created | The point in time where this device was created |
| timestamp | The point in time where tha device was last updated |

### History Device Table

The **history_device_data** table stores historic device data. See [above](#device-table) for information about the schema.

### Peaks Table

The **peaks** table contains data about peaks in the energy consumption. Note that each peak in this table represents an assignment of a device to a [sensor data record](#sensor-data-table). Thus, not each peak in the user's consumption is saved in this table.

| Name | Type | Description |
|------|---|---|
| id | int | Unique identifier |
| sensor_id | varchar(30) | Reference to the [sensor table](#sensor-table) |
| device_id | int | Reference to the [device table](#device-table) |
| timestamp | timestamp | Time in point where this peak was last updated |