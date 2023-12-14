---
title: Database
description: Planetscale database schema and table content.
---

Data is stored in the [planetscale](https://app.planetscale.com/energyleaf/energyleaf) database. This page provides an overview of the database schema and table content.

## Database Schema

The existing tables are listed below with a short description of their content.

### User Table

The user table contains personal and account information of each user:
- **id**: Unique user identifier
- **created**: Timestamp at which the user was created
- **email**: Email address
- **username**: Name that the user is referred to
- **password**: Password used for login
- **is_admin**: Determines whether the user has access to the admin app

```
CREATE TABLE `user` (
	`id` int NOT NULL AUTO_INCREMENT,
	`created` timestamp NULL DEFAULT current_timestamp(),
	`email` varchar(30) NOT NULL,
	`username` varchar(30) NOT NULL,
	`password` varchar(256) NOT NULL,
	`is_admin` tinyint(1) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
)
```

### User Data Table

The **user_data** table contains information about the user's household:
- **id**: Unique user data identifier
- **user_id**: Reference to [user table](#user-table)
- **budget**: User's budget in euros
- **base_price**: User's fixed electricity base price in euros
- **working_price**: User's varied electricity working price in euros
- **tariff**: User's electricity tariff (*basic* or *eco*)
- **limit_energy**: User's energy limit
- **household**: Number of people in the user's household
- **property**: User's property type (*house* or *apartment*)
- **living_space**: User's living space in square meters
- **hot_water**: *electric* or *not electric* hot water
- **timestamp**: Timestamp at which the user data was saved

 ```
 CREATE TABLE `user_data` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
	`budget` int DEFAULT '2500',
	`base_price` float,
	`working_price` float,
	`tariff` enum('basic', 'eco') DEFAULT 'basic',
	`limit_energy` int DEFAULT '800',
	`household` int,
	`property` enum('house', 'apartment'),
	`livingSpace` int,
	`hotWater` enum('electric', 'not_electric'),
	`timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
	PRIMARY KEY (`id`)
)
 ```

### History User Data Table

The **history_user_data** table stores historic user data. Before an update is performed on the [user_data_table](#user-data-table), the old user data of a user is saved to the *historic_user_data* table. 

```
CREATE TABLE `history_user_data` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
	`budget` int DEFAULT '2500',
	`base_price` float,
	`working_price` float,
	`tariff` enum('basic', 'eco') DEFAULT 'basic',
	`limit_energy` int DEFAULT '800',
	`household` int,
	`property` enum('house', 'apartment'),
	`living_s_pace` int,
	`hot_water` enum('electric', 'not_electric'),
	`timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
	PRIMARY KEY (`id`)
)
```

### Mail Table

The **mail** table contains the user's mail settings:
- **id**: Unique identifier
- **user_id**: Reference to the [user table](#user-table)
- **mail_daily**: Determines whether a daily mail should be sent
- **mail_weekly**: Determines whether a weekly mail should be sent

```
CREATE TABLE `mail` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
	`mail_daily` tinyint(1) NOT NULL DEFAULT '1',
	`mail_weekly` tinyint(1) NOT NULL DEFAULT '1',
	PRIMARY KEY (`id`)
)
```

### Sensor Table

The **sensor** table contains the sensor data:
- **sensor_id**: Unique sensor identifier
- **version**: Sensor version number
- **code**: Sensor code
- **sensor_type**: Sensor type (*electricity* or *gas*)
- **user_id**: Reference to the [user table](#user-table)

```
CREATE TABLE `sensor` (
	`sensor_id` varchar(30) NOT NULL,
	`version` int NOT NULL DEFAULT '1',
	`code` varchar(30) NOT NULL,
    `sensor_type` enum('electricity', 'gas') NOT NULL,
    `user_id` int NOT NULL,
	PRIMARY KEY (`sensor_id`)
)
```

### Sensor Data Table

The **sensor_data** table contains the data captured by sensors. The *sensor_id* and *timestamp* fields are used as a primary key. Additionally, an index for the *timestamp* attribute makes the search for certain timestamps faster.
- **sensor_id**: Reference to the [sensor table](#sensor-table)
- **value**: Captured data value from the sensor
- **timestamp**: Data at which the sensor data was captured

```
CREATE TABLE `sensor_data` (
	`sensor_id` varchar(30) NOT NULL,
	`value` int NOT NULL,
	`timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
	PRIMARY KEY (`sensor_id`, `timestamp`),
    KEY `idx_timestamp` (`timestamp`)
)
```

### Click Tracking Table

The **click_tracking** table contains the tracking data for further analysis:
- **id**: Unique identifier
- **element**: UI element that has been clicked
- **timestamp**: Timestamp at which the clicking was performed
- **user_id**: Reference to the [user table](#user-table)

```
CREATE TABLE `click_tracking` (
	`id` int NOT NULL AUTO_INCREMENT,
	`element` varchar(255) NOT NULL,
	`timestamp` timestamp NULL DEFAULT current_timestamp(),
	`user_id` int NOT NULL,
	PRIMARY KEY (`id`)
)
```

### Device Table

The **device** table contains device data:
- **id**: Unique device identifier
- **user_id**: Reference to the [user table](#user-table)
- **name**: Device name
- **created**: Timestamp at which the device was created
- **timestamp**: Timestamp at which the device was updated

```
CREATE TABLE `device` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
	`name` varchar(30) NOT NULL,
	`created` timestamp NULL DEFAULT current_timestamp(),
	`timestamp` timestamp NOT NULL DEFAULT (now()) ON UPDATE current_timestamp(),
	PRIMARY KEY (`id`)
)
```

### History Device Table

The **history_device_data** table stores historic device data. Before an update is performed on the [device table](#device-table), the old device data is saved to the *historc_device* table.

```
CREATE TABLE `history_device` (
	`id` int NOT NULL AUTO_INCREMENT,
	`device_id` int NOT NULL,
	`user_id` int NOT NULL,
	`name` varchar(30) NOT NULL,
	`created` timestamp NULL DEFAULT current_timestamp(),
	`timestamp` timestamp NULL,
	PRIMARY KEY (`id`)
)
```

### Reason Table

```
CREATE TABLE `reason` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
	`reason` varchar(255),
	`timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
	`value` int NOT NULL,
	PRIMARY KEY (`id`)
)
```

### Feedback Table

```
CREATE TABLE `feedback` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
	`recommendation` varchar(255),
	`value` varchar(255),
	`feedback` varchar(255),
	PRIMARY KEY (`id`)
)
```