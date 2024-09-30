---
title: Overview
description: An overview of the used v1 sensor system 
sidebar:
  order: 0
---

Welcome to the v1 section of our documentation. Here, you will find essential information about our sensors and their installation.

### Sensor Structure
Below is a diagram illustrating the interconnection between our sensors, specifically designed for monitoring electricity consumption:

![v1 sensor structure](/src/assets/sensors/v1/sensor_network_structure.svg)

:::note
Only https-connections are allowed. If you want to change the host from *.energyleaf.de to any other, that address needs to be changed directly in the code, and also the certificate maybe needs to be changed. Currently the lets encrypt x1 cert is used.
:::

### Sensors Overview
- [**Digital Electricity Meter and Smart Meter Sensor**](../digital_smart_sensor): A brief description of the functionalities.
- [**Analog Electricity Sensor**](../analog_sensor): A brief description of its functionalities.

### Installation Instructions
For detailed installation steps, please refer to the Installation Instructions section.

- [**Digital Electricity Meter and Smart Meter Sensor Installation Instructions**](../Installation-Instructions/digital_smart_sensor.md)
- [**Analog Electricity Sensor Installation Instructions**](../Installation-Instructions/analog_sensor)
