---
title: Dashboard
description: An overview of the web app.
---

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

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

## Further reading

- Read [about reference](https://diataxis.fr/reference/) in the Diátaxis framework
