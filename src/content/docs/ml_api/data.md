---
title: Data
description: "Overview about the used model data und preprocessing"
---

## Data basis

The dataset used in this analysis is sourced from [Kaggle](https://www.kaggle.com/datasets/ecoco2/household-appliances-power-consumption/data) and contains power consumption data from various household appliances monitored over a 30-day period in 13 French households. The consumption data was tracked using 42 SmartPlugs, capturing real-world, time-series data for a diverse range of appliances. Power measurements were recorded at one-second intervals, providing valuable insights into the usage patterns of these devices in everyday household scenarios. The appliances are categorized as follows:

- multimedia = [computer, 3D_printer, internet_router, laptop, phone_charger, printer, screen, tv, sound_system]
- kitchen = [boiler, coffee, freezer, fridge, micro_wave_oven]
- washing = [dishwasher, dryer, washing_machine]
- cooling = [air_conditioner, fan]
- other = [air_purifier, dehumidifier, radiator, solar_panel, vacuum]

## Data processing

To align with the measurements from our sensors, we process the data so that they are similar.
This ensures consistency between the data we use for training our models and the data we actually measure.
The processing includes aggregating the dataset to 15-second intervals, because that is our measurement resolution.

The aggregation might look like this, where some mathematical functions are calculated. The raw values have their own column, so that no information is lost.
```py
import pandas as pd
import numpy as np

TIMESTAMP = 'timestamp'
INTERVAL = 15

# todo: load data
# data = ...
df = pd.DataFrame(data)

df.set_index(TIMESTAMP, inplace=True)
aggregated_df = df.resample(f'{INTERVAL}s').agg(['mean', 'max', 'min', 'sum'])

# Extract individual second values within each 15-second interval for every column
for col in df.columns:
    second_values = df.groupby(df.index.floor(f'{INTERVAL}s'))[col].apply(list).apply(lambda x: x + [None]*(INTERVAL-len(x)))
    for i in range(INTERVAL):
        aggregated_df[(col, f'{i+1:02}')] = second_values.apply(lambda x: x[i] if i < len(x) else None)

# Flatten the multi-level columns
aggregated_df.columns = [f'{col}_{stat}' for col, stat in aggregated_df.columns]

# Reset the index to make 'timestamp' a regular column
aggregated_df.reset_index(inplace=True)

filename = 'aggregated.csv'
aggregated_df.to_csv(filename, index=False)
```

We identified significant peaks in the electricity consumption data to focus on the relevant events for model training. Peaks that did not meet the threshold or were too short (less than 2 minutes) were excluded from the data. The remaining peaks were used to train the machine learning model.

We re-implemented the [Median Absolute Deviation (MAD)](https://en.wikipedia.org/wiki/Median_absolute_deviation) algorithm in order so generate peaks that are as similar as possible. However, there might be some minor differences between results due to implementation details.

This approach allowed us to work with the most meaningful data for accurate model predictions.
