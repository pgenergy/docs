---
title: Hosting
description: "Overview about ML-API Hosting and Communication with the WebApp"
---

## Fly.io

The **Hosting** was carried out via Fly.io. As soon as a change on the main branch happened (eg. a pull request is merged), a deployment is automatically carried out on Fly.io using Github Actions. Fly.io has two CPUs with 512MB RAM each. This is to ensure that the API continues to function even if one machine should fail.

[Basic settings](https://fly.io/docs/reference/configuration/) have been defined in the ML-API in Fly.toml.

## Communication

The communication between the ML-API and the Web App occurs through two different formats:

1. **[Protobuf (Protocol Buffers)](https://github.com/pgenergy/Protocol/blob/main/proto/Energyleaf-ML.proto)**:
    - Used for efficient, binary communication between the WebApp and the API.
    - It ensures strong typing of the data, reducing errors in data exchange.
    - Protobuf is faster and uses less bandwidth compared to text-based formats like JSON.
    - The Web App sends requests in Protobuf format, and the ML-API processes these requests and sends Protobuf responses back.

2. **JSON**:
    - JSON is used primarily for prototyping and debugging purposes.
    - Unlike Protobuf, JSON is text-based, which makes it easier to read and debug.
    - When needed, the Web App can send requests in JSON format to specific API endpoints, and receive JSON-formatted responses for easier analysis.

While there is a Protobuf package for Node.js, there is no such thing for Python as of now. Therefore you have to copy the compiled protocol.

Overall, Protobuf is preferred for most interactions due to its efficiency, while JSON remains available for specific cases, such as development and debugging.