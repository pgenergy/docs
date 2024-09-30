---
title: Solar calculator
description: A simple calculator that simulates the electrical output of a solar panel.
---

In order to make informed decisions, we built a simple calculator that calculates the expected electrical output for the last 30 days and next 7 days (more is realistically not possible due to the chaotic nature of weather). It multiplies the Balkonkraftwerk's rating with the cumulated sun intensity.

In order to get the weather, first [OpenStreetMap](https://nominatim.openstreetmap.org/) is queried using the user's address in order to get coordinates. Next, the coordinates are trimmed, because a low resolution is sufficient for weather prediction. This enables caching results more effectively in scenarios with a lot of users in a small space (like a city). For weather, we use [BrightSky](https://brightsky.dev/docs/#/operations/getWeather).

Further development could include additional parameters to make the calculator more accurate.
