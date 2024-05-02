---
title: Architecture
description: The architecture of the energyleaf system.
---

## Components

Our system consits of the following components:
- The [web app](/web/overview/) is the user interface facing the households, which can be accessed via browser. It conveys the household's energy consumption through a dashboard and many more features.
- The [admin app](/admin/overview) is the user interface facing administrators that manage the households' accounts and their associated sensors.
- The [web API](/web_api/overview) is an API that allows to interact with the web and admin app.
- The [sensor code](/sensors/overview) is used to configure the sensors and their communication.
- The [ML API](/ml_api/overview) provides access to machine learning models that are mainly used by the web app.

## Dependencies between components

The following diagram shows how the components interact with each other.

![System diagram](/src/assets/system_diagram.svg)