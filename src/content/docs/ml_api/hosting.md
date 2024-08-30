---
title: Hosting
description: "Overview about ML-API Hosting and Communication with the WebApp"
---

## Fly.io

The **Hosting** was carried out via Fly.io. As soon as a pull request from the ML-API is merged, a deployment is automatically carried out on Fly.io. Fly.io has two CPUs with 512MB RAM each. This is to ensure that the API continues to function even if one machine should fail.

Basic settings have been defined in the ML-API in Fly.toml.

## Communication