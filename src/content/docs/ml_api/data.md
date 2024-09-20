---
title: Data
description: "Overview about the used model data und preprocessing"
---

## Data basis

The dataset used in this analysis is sourced from Kaggle (`https://www.kaggle.com/datasets/ecoco2/household-appliances-power-consumption/data`) and contains power consumption data from various household appliances monitored over a 30-day period in 13 French households. The consumption data was tracked using 42 SmartPlugs, capturing real-world, time-series data for a diverse range of appliances. Power measurements were recorded at one-second intervals, providing valuable insights into the usage patterns of these devices in everyday household scenarios. The appliances are categorized as follows:

- multimedia = [computer, 3D_printer, internet_router, laptop, phone_charger, printer, screen, tv, sound_system]
- kitchen = [boiler, coffee, freezer, fridge, micro_wave_oven]
- washing = [dishwasher, dryer, washing_machine]
- cooling = [air_conditioner, fan]
- other = [air_purifier, dehumidifier, radiator, solar_panel, vacuum]

## Data processing

To align with the measurements from our sensors, which record data every 15 seconds, we aggregated the dataset to 15-second intervals. This ensures consistency in the data we use for training our models.

We identified significant peaks in the electricity consumption data to focus on the relevant events for model training. Peaks that did not meet the threshold or were too short (less than 2 minutes) were excluded from the data. The remaining peaks were used to train the machine learning model.

This approach allowed us to work with the most meaningful data for accurate model predictions.