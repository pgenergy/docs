---
title: Profile
description: Account settings and user data.
---

The profile page contains information about the user profile. Here, the user can view and update account information, user data, settings, and delete their account. This is implemented by utilizing input forms. After submission, changes are applied to the database.

## Base Information Form

Personal data such as username, email address, and password is displayed and can be updated. Database updates on the *user* table are initiated by submitting forms.

- **BaseInformationForm**: Updates username if a matching dataset for the account's *user_id* is found. Only the username can be changed as the password input is disabled. Depending on whether the database update is successful, an appropriate toast is displayed.
- **ChangePasswordForm**: Updates the user's password. This can be done by entering the current password and the desired password two times. If the new password and its repetition are the same, `updateBaseInformationPassword()` is called. If the user exists and the entered current password matches the user password, the desired password is encrypted and stored in the *user* table. If this process fails, an appropriate toast is displayed.

## Mail Settings Form

The user can configure their preferences whether they want to receive daily or weekly emails regarding their energy and gas consumption. Database updates on the *mail* table are initiated by submitting this form.

- Using the switches the user can turn daily and weekly emails on. After submitting the settings, the method `updateMailInformation()` is called. Afterwards, an appropriate toast will be displayed.
- `updateMailInformation()`: If the user exists, the *daily* and *weekly* attributes of the *mail* table are updated.

## User Data Form

User data is displayed and can be updated through this form. Database updates on the *user_data* table are initiated by submitting this form.

- Input fields
    - **Property Type**: Dropdown to choose between the property types *house* or *apartment*.
    - **Hot Water**: Dropdown to choose between *electric" or *not-electric* hot water.
    - **Tariff**: Dropdown to choose between a *basic* or *eco* tariff.
    - **Budget**: Enter a budget in euros.
    - **Electricity Price**: Enter an electricity price in euros.
    - **Living Space**: Enter the size of the living space in square meters.
    - **People in the Household**: Enter the number of people in the household.
- After submitting the form, the method `updateUserDataInformation()` is called and an appropriate toast is displayed.
- `updatUserDataInformation()`: If the user and their dataset in the *user_data* table exists, the old dataset is copied into the *history_user_data* table. If storing the old user data into the history table was successful, the *user_data* table is updated, mapping *electricity price* to the attribute *base_price* and *people in the household* to the attribute *household*.

## Account Deletion Form

The current user account can be deleted through this form. This deletes the account from the *user* table and signs out the current user.

- Clicking the *Delete Account* button sets the *open* state to true, which opens a dialogue to confirm the deletion by entering the user's password.
- If a non-empty string is entered, the `onSubmit()` method is triggered: it closes the dialogue, calls the `deleteAccount()` method, and `signOutAction()` method. If an error occurs during this process, an error message is shown in a toast.
- `deleteAccount()`: if the user exists and the entered password string matches the user's password, the user dataset will be deleted from the *user* table.
- Other remaining data regarding the deleted user account reference the same account via the *user_id* attribute but cannot be associated with any personal data anymore.