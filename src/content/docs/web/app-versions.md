---
title: App versions
description: The different versions of the web app.
---

For academic purposes, we differentiate between the following app versions:

| Version | Name            | Description                                                              |
| ------- | --------------- | ------------------------------------------------------------------------ |
| 1       | Transparency    | Provides just data about the user's energy consumption.                  |
| 2       | Self reflection | Encourages the user to reflect his own consumption.                      |
| 3       | Support         | Supports the user by providing recommendations to lower the consumption. |

Each version builds upon the previous one. This means that all features of app version 1 are also contained in app version 2 and so on.

The app version of the user is stored in the `user` table in the [database](/general/database#user-table). To check if a specific feature can be used by the user, we check if his app version according to the database is greater than or equal to the required app version.