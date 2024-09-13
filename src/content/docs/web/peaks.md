---
title: Peak Detection
description: Detection logic of high consumptions over a longer period.
---

## Peaks
:::note
To work with peaks, you first need to register your devices. You can find further details on how to do that on the [devices page](/web/devices).
:::

Peaks in the energy consumption are display as red dots in the line chart of the dashboard. Since the peaks depend on the granularity of the data, they are only shown if the data is not aggregated (as by default).
![Peaks in consumption chart](/src/assets/dashboard-consumption-chart-peaks.png)

When you click on one of the red dots, a dialog will open. Here, you can manually assign a specific device to peak to record that the device has led to the peak. 
![Dialog to assign a specific device to a peak](/src/assets/dashboard-peak-dialog.png)

The dialog contains a combo box where all of your devices are listed. You can select one of the devices and save the assignment by clicking the save button. A toast will inform you whether the save operation was successful. If you don't want to save the changes, you can either click the X in the top right corner of the dialog or beside the dialog.
![Device options in peak assignment dialog](/src/assets/dashboard-peak-dialog-device-options.png)

If you now want to assign a different device to the peak, you can click the red dot again, just change the selected device and save again.

<!-- TODO: Add technical details when the page structure is more clear -->

### AI-Based Device Detection

#### Introduction
The AI-based device detection is an essential extension of the peak analysis functionality on the dashboard. It leverages machine learning models to automatically classify the devices likely responsible for energy consumption peaks. This feature assists users in gaining insights into their energy usage and identifying potential areas for energy savings.

#### How Peak Detection Works

1. **Peak Detection**:
   Peaks in energy consumption are detected when consumption exceeds a certain threshold, typically indicating the operation of energy-intensive devices. These peaks are identified and classified in the backend using machine learning algorithms and deviation detection methods like the Median Absolute Deviation (MAD).

2. **Automatic Device Assignment**:
   Once peaks are detected, the `classifyAndSaveDevicesForPeaks` function is triggered to classify the devices responsible for these peaks using a machine learning model. This model analyzes the consumption patterns and timestamps of the sensor data to determine which device caused the peak.

3. **Manual Device Assignment**:
   If the AI model’s classification is incorrect or if the user prefers, they can manually assign a device to the peak. This can be done by clicking on the red dot representing the peak on the dashboard and selecting the appropriate device from the dropdown menu in the dialog box.

4. **Feedback and Model Improvement**:
   Users can either confirm the device suggested by the model or manually update it. This feedback helps refine the machine learning model over time, improving the accuracy of future device classifications.

5. **Peak Detection and Marking (Technical Details)**:
   Peaks are detected using the `findAndMark` function, which analyzes the sensor data to identify significant spikes in energy consumption based on median values and MAD. This process occurs in the background via the API route `/api/v1/process_peaks`.

6. **Anomaly Detection**:
   In addition to peak detection, the system also identifies anomalies in the consumption pattern. If energy consumption deviates significantly from the expected patterns, an anomaly is flagged and recorded. This helps in identifying unusual energy usage that may indicate an issue or unexpected behavior.

#### Detailed Description of Functions and Processes

##### **Peak Detection and Classification**
Peaks are detected by analyzing sensor data and calculating the median consumption value. A threshold is used to classify significant deviations as peaks. The following process is employed:

- **Sensor Data Analysis**: The sensor data is processed to calculate the median consumption and the MAD to determine whether a peak has occurred.
- **AI Device Classification**: After peak detection, the function `classifyAndSaveDevicesForPeaks` assigns a device to each peak. The energy data associated with the peak is input into the model, which then classifies and stores the device responsible.

##### **Manual Review and Adjustment**
If the AI model assigns an incorrect device, users can manually adjust the assignment through the peak dialog box on the dashboard. This allows for greater flexibility and control over the peak-device relationships.

#### Technical API Details

- **POST Request to `/api/v1/process_peaks`**: This API endpoint is used to identify peaks based on sensor data and associate them with devices. A scheduled process handles the detection and classification, saving the results accordingly.
- **Machine Learning Model**: The machine learning model used for device classification relies on historical energy data and peak consumption patterns. Over time, it improves its accuracy based on user feedback.

#### Conclusion
The AI-based device detection is a powerful tool to provide transparency in energy consumption. By automatically classifying devices responsible for peaks, users save time and gain valuable insights into their energy data.

## Further reading

- Read [about reference](https://diataxis.fr/reference/) in the Diátaxis framework
