---
title: Admin App
description: An overview of the admin app.
---

The admin app is used by privileged users to manage the overall system. It mainly consists of a [user management](/admin/user-management) and a [sensor management](/admin/sensor-management).

## Authentication

The admin app can be accessed by the same credentials as the [web app](/web/overview). To restrict access, only users with the `is_admin` flag (see [database schema](/general/database#user-table)) can log in.

:::caution
Be careful about who you give admin access to. Admins have full control over the system and may revoke your admin privileges. Furthermore, they get access to sensitive data about the users. 
:::