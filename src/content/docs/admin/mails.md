---
title: E-Mails
description: An overview of how e-mails are created and sent in the system.
---

There are several use cases in the system where e-mails need to be sent. This includes the [reports](/web/reports) and basic user management tasks like password resets. To send e-mails, we use [Resend](https://resend.com/).

To handle e-mails in code, we use the [Resend integration of react email](https://react.email/docs/integrations/resend). This allows us to design e-mails in a similar way to how we design the frontend of our apps. All the templates are stored in the `mail` package (see [project structure](/general/mono-repo#structure)).

## Generating Graphs

Especially for the [reports](/web/reports), we need to generate graphs. To do this, we use the [Chart.js](https://www.chartjs.org/) library. All the logic for generating graphs is wrapped in a single function `renderChart` that accepts a chart configuration and returns a base64 encoded image of the graph. Internally, this function renders the graph as a HTML canvas.

:::note
Be aware that you need to have the fonts that are used in the graphs installed on the server where the e-mails are generated. Otherwise, the graphs may look different than expected. You can include fonts inside our project (as we did with the Arial font) and register them as follows:

```ts
registerFont(join(process.cwd(), "/fonts/ARIAL.TTF"), { family: "Arial" });
```
:::

## Image Handling

Including images in e-mails in base64 format is not recommended as some e-mail providers (e.g. Gmail) block images that are included in this way. We avoided this by hosting the images on our own storage and including them in the e-mails as links. For storage, we use an [S3 bucket](/general/architecture#dependencies-between-components).

:::note
Since the S3 bucket is an optional component, images are still included as base64 in the e-mails if no S3 bucket is configured.
:::