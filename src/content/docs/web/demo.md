---
title: Demo mode
description: Description of the demo mode of the app.
---

To allow users to access our app without needing an account, we provide a demo mode. This allows them to get an overview of the app and consider whether they want to use it.

:::note
The demo mode uses [app version](/web/app-versions/) 3. Therefore, all features are available in the demo. This allows users to get a comprehensive overview of the app.
:::

## Demo user

The app identifies demo users by checking specific session and user details. This ensures that demo-specific logic is applied only to users who are in demo mode. The demo user is identified by the following identifier:

```json
{
    "id": "demo",
    "email": "demo@energyleaf.de"
}
```

Note that this data is not stored in the database, but rather hardcoded. This ensures that database queries never include the demo user and leads to a clear separation between demo and regular users.

## Data processing

In demo mode, we differentiate between static and dynamic data. By dynamic, we mean data that the user can directly modify in the app (e. g. consumption data). In contrast, static data is data that is not directly modifiable by the user (e. g. the sensor data of the user).

### Dynamic data

Dynamic data is stored in cookies. This approach allows the app to simulate a persistent state across page reloads without requiring a backend database. Precisely, the following cookies are used:

- `demo_data`: Contains the user data of the user (equivalent to the [user data database table](/general/database/#user-data-table)).
- `demo_devices`: Contains the devices of the user (equivalent to the [device database table](/general/database/#device-table)).
- `demo_peaks`: Contains the devices that the user has assigned to peaks (equivalent to the [device to peak database table](/general/database/#device-to-peak-table)).

### Static data

In our case, static data is only the sensor data of the user as well as the sequences (TODO: Link to sequences page) for this data. The data being not modifiable by the user suggests that it may be hardcoded for simplicity. However, this approach is not efficient for the large amount of data on the one hand and the need of flexible aggregation of the data on the other hand because the data is processed in memory. Therefore, this data is stored in the database which allows using the same techniques for optimizing the data processing as for regular users (TODO: Link). Because the static data only includes sensor data and data referring to it, the demo sensor data is separated from the regular sensor data through the unique sensor ID `demo_sensor`.

Since the sensor data is a time series, there needs to be a shifting of the timestamps. Otherwise, the data would be outdated after a certain time and users would need to search for the data in the past. Basically, the difference between the current time and the time of the last data point is calculated and added to the timestamps of the demo data.

To allow easy insertion of the static data, we provide a [script](/general/scripts#addDemoData) that inserts the data based on a JSON file and finds all sequences in it.