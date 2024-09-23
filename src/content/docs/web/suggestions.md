---
title: Suggestions
description: Suggestions that are provided by machine learning models and are integrated into the app.
---

## Introduction
The machine learning based device detection is an essential extension of the peak functionality on the dashboard. It leverages machine learning models to automatically classify the devices likely responsible for energy consumption peaks. This feature assists users in gaining insights into their energy usage and identifying potential areas for energy savings.

## How Peak Detection Works

1. **Peak Detection**:
   Peaks in energy consumption are detected when consumption exceeds a certain threshold, typically indicating the operation of energy-intensive devices (see [sequences page](/web/sequences)). These peaks are identified and classified in the backend using machine learning algorithms and deviation detection methods like the Median Absolute Deviation (MAD).

2. **Automatic Device Assignment**:
   Once peaks are detected, the `classifyAndSaveDevicesForPeaks` function is triggered to classify the devices responsible for these peaks using a machine learning model. This model analyzes the consumption patterns and timestamps of the sensor data to determine which device caused the peak.

3. **Manual Device Assignment**:
   If the AI model’s classification is incorrect or if the user prefers, they can manually assign a device to the peak. This can be done by clicking on the red area representing the peak on the dashboard and selecting the appropriate device from the dropdown menu in the dialog box.

4. **Feedback and Model Improvement**:
   Users can either confirm the device suggested by the model or manually update it. This feedback helps refine the machine learning model over time, improving the accuracy of future device classifications.

## Detailed Description of Functions and Processes

### Peak Detection and Classification
Peaks are detected by analyzing sensor data and calculating the median consumption value. A threshold is used to classify significant deviations as peaks. The following process is employed:

- **Sensor Data Analysis**: The sensor data is processed to calculate the median consumption and the MAD to determine whether a peak has occurred.
- **AI Device Classification**: After peak detection, the function `classifyAndSaveDevicesForPeaks` assigns a device to each peak. The energy data associated with the peak is input into the model, which then classifies and stores the device responsible.

### Manual Review and Adjustment
If the AI model assigns an incorrect device, users can manually adjust the assignment through the peak dialog box on the dashboard. This allows for greater flexibility and control over the peak-device relationships.

## Conclusion
The AI-based device detection is a powerful tool to provide transparency in energy consumption. By automatically classifying devices responsible for peaks, users save time and gain valuable insights into their energy data.