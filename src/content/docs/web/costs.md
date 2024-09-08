---
title: Costs
description: An overview about the user's energy costs.
---


# Energy Costs Page

The Energy Costs page focuses on displaying cost data related to energy consumption in various formats and time frames.

## Components Overview

### 1. **CostDayChart**

#### Description:
This component is used to display the energy costs per day of the week.

#### Key Features:
- Displays data for each day of the week (Monday through Sunday).
- Uses the `recharts` BarChart to visualize the data.
- Cost values are displayed in euros (€).
- Tick formatting is localized to German weekdays (e.g., "Montag" for Monday).

#### Props:
- `data`: An array of sensor data with cost values. Each data point contains:
  - `id`: Unique identifier.
  - `sensorId`: ID of the associated sensor.
  - `timestamp`: Date object for the day.
  - `cost`: Energy cost for that day.

#### Key Methods:
- **tickFormatter**: Formats the day to display the name of the weekday.
- **fillArray**: Initializes an array representing each day of the week with default values.
- **processedData**: Merges incoming data with the initialized array to ensure every day has a value.

### 2. **CostHourChart**

#### Description:
Displays hourly energy costs over a 24-hour period.

#### Key Features:
- Displays hourly cost data using `recharts` BarChart.
- The cost for each hour is visualized and compared.
- Supports switching between consumption, feed-in (Einspeisung), and power.

#### Props:
- `data`: An array of sensor data with cost values for each hour.

#### Key Methods:
- **tickFormatter**: Formats the hour (e.g., "13 Uhr").
- **fillArray**: Creates an array representing every hour in the 24-hour period with default values.
- **processedData**: Fills the chart with actual cost data for each hour.

### 3. **CostWeekChart**

#### Description:
This chart displays energy costs per week in a month.

#### Key Features:
- Week-based cost display for up to 4-5 weeks per month.
- Week numbers are calculated using the `getWeekOfMonth` helper function.
- Uses `recharts` BarChart to visualize costs.

#### Props:
- `data`: An array of sensor data with weekly cost values.

#### Key Methods:
- **tickFormatter**: Formats the week (e.g., "Woche 3").
- **fillArray**: Generates default values for every week in the current month.
- **processedData**: Fills the chart with actual cost data for each week.

### 4. **CostDiscountChart**

#### Description:
Displays the discount (Abschlag) cost in comparison to the actual daily costs for the month.

#### Key Features:
- Line chart visualizing the projected daily discount and the actual daily costs.
- Shows the accumulated discount over the month.
- Uses `recharts` LineChart.

#### Props:
- `data`: An array of sensor data representing daily costs.
- `dailyCost`: Projected daily cost (discount).

#### Key Methods:
- **tickFormatter**: Formats the day of the month.
- **fillArray**: Initializes each day of the month with default discount values.
- **processedData**: Merges the real cost data with the initialized values.
- **maxKey**: Determines whether to display the daily cost or the actual cost depending on the highest value.

### 5. **EnergyCompareChart**

#### Description:
This chart allows users to compare energy costs between two time frames.

#### Key Features:
- Side-by-side comparison of costs for two different dates (e.g., two different days or months).
- Supports comparing consumption, feed-in, and power values.
- Uses `recharts` BarChart.

#### Props:
- `data`: An array of sensor data for the primary date range.
- `compareData`: An array of sensor data for the comparison date range.
- `date`: Primary date.
- `compareDate`: Comparison date.

#### Key Methods:
- **tickFormatter**: Formats the time of day (e.g., "14 Uhr").
- **fillArray**: Initializes default values for every hour in a day for both primary and comparison data.
- **processedData**: Combines both primary and comparison data for side-by-side visualization.

## Utility Functions

### 1. **calculateAggregationOptions**

#### Description:
Calculates available aggregation options (e.g., hour, day, week, month) based on the selected date range.

#### Input:
- `startDateStr`: Start date.
- `endDateStr`: End date.

#### Output:
- An array of aggregation options available based on the difference between the two dates.

### 2. **computeTimestampLabel**

#### Description:
Generates the appropriate label for the cost chart based on the aggregation type (e.g., "kWh (Monat)" for month-based aggregation).

#### Input:
- `aggregationParam`: Aggregation type (e.g., day, month, year).
- `withWh`: Whether to append energy unit to the label.

#### Output:
- A formatted label for display.

### 3. **formatDate**

#### Description:
Formats a given date to the `dd.MM.yyyy` format, ensuring leading zeroes for single-digit days and months.

### 4. **getDayOfWeek**

#### Description:
Returns the name of the day (e.g., "Montag") based on a Date object.