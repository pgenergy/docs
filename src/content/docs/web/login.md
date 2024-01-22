---
title: Login
description: Login form to authenticate the user.
---

This form is used by the user to put in their login data for authentication. As login data mail address and password is required. 

After successful login, a suitable toast is displayed and the function `signInAction` is executed. If a user with the provided email can be found and the encrypted password matches that of the user, the user is redirected to the [dashboard](/web/dashboard/).

If the login fails, a toast with an error message is displayed and the user can put in new login data.

Alternativley, the user can register a new account by clicking on the link. They then get redirected to the [sign-up](/web/signup/) page.

