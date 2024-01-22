---
title: Sign-up
description: Sign-up form to register a new account.
---

This form is used by the user to create a new account. As input the following data is required:
- **username** (cannot be longer than 30 characters)
- **mail** (cannot be longer than 256 characters)
- **password** (cannot be longer than 256 characters)
- **repetition** of the password (has to match with the password)

If the form is submitted, the function `createAccount`is executed. If at least one of the mentioned conditions are not met, the function is exited with an error and a toast with the error message is displayed. The user can put in new account data.
If there is no existing account with the provided mail address, the password gets encryped and a new account will be created.

Next, the function `signInAction` is executed. If a user with the provided email can be found and the encrypted password matches that of the user, the user is redirected to the [dashboard](/web/dashboard/). If the login fails, a toast with an error message is displayed and the user can put in new login data.

Alternativley, the user can login with an existing account by clicking on the link. They then get redirected to the [login](/web/login/) page.