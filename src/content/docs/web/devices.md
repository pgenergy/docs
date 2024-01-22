---
title: Devices
description: An overview about the user's devices.
---

The devices page allows the user to manage its own devices. By doing so, the user will be able to assign a specific device to a peak in his consumpution pattern (see [here](/web/dashboard#peaks)). 

## Functionality
The following explains the functionality of the device management.

### Adding a device
In the device overview, you can add a device by clicking the add button in the top right corner.
![Button for adding a device](/src/assets/devices/add_device_button.png)

This will open a dialog where you can insert the name of the device. You can save the device by clicking the save button, whereupon a toast appears to indicate whether the operation was successful. To cancel the operation, you can either click the X in the top right corner of the dialog or beside the dialog.
![Dialog for adding a device](/src/assets/devices/add_device_dialog.png)

### Editing a device
To edit an existing device, you can either click the edit button in the actions column of the grid (as shown in the following screenshot) or the row as a whole.
![Begin to edit a device](/src/assets/devices/edit_device_button.png)

This will a open the same dialog as when adding a device, except that the device name is pre-assigned. Unlike when adding, the save button is only active if changes have been made.

### Deleting a device
Devices can be deleted by clicking the delete button in the actions column of the grid.
![Button to delete a device](/src/assets/devices/delete_device_button.png)

After accepting the confirmation dialog, the device will be deleting from your account.

### Sorting
The device grid can be sorted by clicking on the column headers. By default, the grid is sorted by device name in ascending order. Please note that you cannot sort the grid by the actions column.

## Technical details
Below, the technical implementation of the device management is further explained.

### DevicesOverviewCard
The *DevicesOverviewCard* is the main component of the devices page. It represents the card component that is shown in the screenshots above. Mainly, it consists of the [*DevicesTable component*](#devicestable).

### DevicesTable
The *DevicesTable* represents the table that contains the devices that are displayed on the devices page. Furthermore, it contains the buttons to add, edit, and delete devices as well as the logic required to open/close the [*DeviceDetailsDialog*](#devicedetailsdialog).

### DeviceDetailsDialog
The *DeviceDetailsDialog* is the dialog that opens when you click the buttons to add or edit a device (see [the screenshot above](#adding-a-device)). The dialog encloses the [*DeviceDetailsForm*](#devicedetailsform).

### DeviceDetailsForm
The *DeviceDetailsForm* is the form used to add or edit devices. By default, the form will add a new device. If you want to edit an existing device, you can pass it to the *device* parameter of the component. When the form is submitted, it will trigger a save or update operation in the database, depending on whether a device is edited.