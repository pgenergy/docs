---
title: Overview
description: An overview of the used v1 sensor system 
---

The main focus of the v1 sensor system is the reading of electricity meter data.

![v1 sensor system structure](/src/assets/sensors/v1/sensor_network_structure.svg)

The structure is split into three parts. The first two are responsible for a digital or smart electricity meter, and the third handles analog electricity meters.

:::note
Only https-connections are allowed. If you want to change the host from *.energyleaf.de to any other, that address needs to be changed directly in the code, and also the certificate maybe needs to be changed. Currently the lets encrypt x1 cert is used.
:::

### Digital / Smart Electricity Meter

The code for this type of meter is available at [Smart Electricity Meter Repository](https://github.com/pgenergy/smart-electricity-meter).

The supported SML protocol definitions can be found [here](../protocol).

![Functionality of the sensor for smart electricity meters](/src/assets/sensors/v1/protocol_ir_example.svg)

The functionality of the sensor can be illustrated like in the image as a series of requests and responses. The first request and response is checking if the sensor is registered in Energyleaf by requesting a token. This token is needed for the data transmission to ensure only the correct sensor is sending its data. 

Because this type of sensor needs a script that contains the definitions of the SML protocol from the electricity meter, like what values should be read and what the used type of data is (for example, raw SML or OBIS) it will get that script by the token response. After that, the sensor needs to confirm by an ScriptAcceptedRequest that the script is no longer needed to be contained in any further TokenResponse. Only if the sensor requests a new script or Energyleaf is sending a new script, the sensor is sending again a ScriptAcceptedRequest. Otherwise, it will skip the script part.
After that, the sensor will send its data by the SensorDataRequestV2 and will retry the sending if the SensorDataResponse indicates some sort of failure. 

An failure could be that the lifetime of the token is exceeded and the sensor itself didn't correctly request a new token (the sensor itself also counts the lifetime it gets by TokenResponse). In that case, the sensor will handle that by requesting a new token and will retry the sending of the data package.

### Analog Electricity Meter

The code for this type of meter is available at [Analog Electricity Meter Repository](https://github.com/pgenergy/analog-electricity-meter).

To read data from an analog meter, we used a camera-based solution, which is using cv-algorithms to detect the rotation of the ferraris runner. For this, the datastream library [Apalinea](https://github.com/SlepiK/Apalinea) was used (which is a by-product of this). 

![Operator graph for analog electricity meter](/src/assets/sensors/v1/analog_sensor.svg)

The above operator graph was used to handle the tokens, the detection of the ferraris runner and the sending of data. The code of the operators can be found in [Apalinea](https://github.com/SlepiK/Apalinea) and the [Analog Electricity Meter Repository](https://github.com/pgenergy/analog-electricity-meter). The threshold for the found red pixels is currently set to 300.

Most of the names are indicating the purpose of the operator itself. So the SelectPipeOperator is responsible for checking the above threshold. The DetectorPipeOperator handles the cv-algorithms to find the red pixles. To handle false readings, a time value is given that needs to be passed (false readings means here detecting twice the red stripe).

![Functionality of the sensor for analog electricity meters](/src/assets/sensors/v1/protocol_example.svg)

Because this type of sensor did not need any script (only the round per kWh number), the ScriptAcceptedRequest and -Response are not used.
