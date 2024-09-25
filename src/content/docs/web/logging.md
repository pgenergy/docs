---
title: Logging
description: Logging of relevant events and errors in the app.
---

The system uses a logging mechanism to track different events and errors during its operation. This helps developers and administrators understand what happens in the system, identify issues, and keep a record of important activities.

## Data structure

| **Name**              | **Type**         | **Description**                                                                 |
|-----------------------|------------------|---------------------------------------------------------------------------------|
| `id`                | `Integer`        | A unique identifier for each log entry.                                         |
| `timestamp`         | `Timestamp`      | The date and time when the log was created.                                     |
| `logType`           | `action`, `error`, or `info` | The type of log for filtering |
|`appComponent`| `web`, `admin`, or `api` | The part of the application related to the log.      |
| `title`             | `String`         | A brief description of what’s being logged.                                     |
| `appFunction`       | `String`         | The specific function in the application where the event occurred.              |
| `details`           | `Object`         | Extra information about the event, such as user data or session details.        |


There are three main logging functions used in the system:

1. [General Logging (log())](#general-logging)
2. [Error Logging (logError())](#error-logging)
3. [Action Tracking (trackAction())](#action-tracking)

#### General Logging
The log function is the basic way to record information about an event in the system. It stores details like what happened, which part of the system was involved, and any additional data related to the event. It should only be used in exceptional cases, because the next two more specific methods should be used every time an error or an action happens.

#### Error Logging
The logError function is used specifically for logging errors when something goes wrong in the system.
You need to pass an error to use this method.
It not only logs the error message but also includes additional data such as the name of the error and a part of the stack trace to help figure out where the problem occurred.

#### Action Tracking
The trackAction function is used to record user or system actions. For example, if a user performs a significant action like resetting a password or changing settings, this function logs it for future reference.

## Example: User Sign-In and Logging
Here’s an example of how logging fits into a sign-in function. When a user signs in, the system checks if the user exists, verifies the password, and creates a session. If any of these steps fail (like a wrong password or inactive user), an error is logged with `logError`. If the sign-in is successful, it tracks this action using `trackAction`. `waitUntil` is used to prevent blocking the main thread or delaying important user actions, such as signing in, due to non-essential tasks like logging. This ensures smoother user experience while still recording important information for later use.

```ts
export async function signInAction(data) {
    try {
        const user = await getUserByMail(data.email);
        if (!user) throw new Error("Email or password incorrect.");

        if (!user isActive) throw new UserNotActiveError();

        // Check password, create session, etc.

        waitUntil(trackAction("user/sign-in", "sign-in", "web", { userId: user.id }));
    } catch (err) {
        waitUntil(logError("sign-in-failed", "sign-in", "web", { email: data.email }, err));
        return { success: false, message: err.message };
    }
}
```