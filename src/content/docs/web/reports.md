---
title: Reports
description: Reports of the user's energy consumption that are generated periodically.
---

The report creation routine is responsible for generating periodic summaries of the user's energy consumption. It provides a detailed breakdown of the consumption for the configured time period and prepares reports for viewing in the web app and for sending via email, depending on user settings.

## Content

The report consists of different module that provide information about the energy consumption for the last period.
All information will be calculated based on the number of days configured in the interval, while the day before the creation date is the last day of the interval.The report provides details on daily energy consumption, highlighting the relationship between each day's consumption and the user's target. It also includes key metrics such as the average daily consumption.

## Configuration

The user can configure the following settings to personalize their reports.
The user is asked to configure this settings in the onboarding process in his first login after account acitvation.

| Setting | Impact                                                            |
--------------- | ------------------------------------------------------------------------ |
| Reports mails | If activated, new created reports will be send as mails to the user |
|Report interval | The user can configure the number of days for the report interval between 1 and 7.  This defines the frequency of the reports, as a new report is created after the number of days defined in the interval has elapsed.Futhermore, this defines the number of days considered in the report.| 
Report time         | The user can configure the day time for the creation of a new report. This is mostly relevant to manage the arrival time of the reports in the mailbox of the user. |

## Creation Routine

Every full hour, the creation routine for new reports is triggered.
The process involves the following key steps:

1. User Selection: The system checks for users with a due report based on their configured interval and time. The report is generated only when both the user’s report interval and the configured time of day for the next report have passed.

2. Data Gathering: For each user with a due report, the relevant data is collected. If the data gathering step fails for one user, the following steps will not be executed for this user. The Data Gathering process includes:
- The total energy consumption during the interval period
- Daily consumption statistics such as average daily consumption, best and worst consumption days, and total consumption costs (if applicable).

3. Email Reports: If the user has enabled email reports, the system sends the created report via email, including an unsubscribe link. The user can update his report settings without logging into the web app, because the link includes a generated authentification token. If the process of sending the report as a mail fails for a user, the routine does not execute the following steps of the routine to ensure that no report is created without sending a mail. 

4. Database Update: Once the report is created and possibly sent, the system saves the calculated data for the user to ensure that the report can also be viewed in the web app. 

5. Timestamp Update: After successfully generating sending and saving a report, the system updates the user's last report timestamp, ensuring the correct timing of future reports.