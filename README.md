# Alerting & Notification Platform

## Project Overview

This project is a scalable, extensible backend system for managing alerts and notifications within an organization. It enables administrators to create, configure, and manage alerts based on organizational, team, or user-level visibility. End Users receive alerts via an in-app delivery system with recurring reminders every 2 hours until snoozed or expired.

The system ensures timely communication, user control over notifications, and analytical insights into alert usage and engagement.

***

## Features Summary

### Admin Capabilities

- Create, update, and archive alerts with flexible visibility settings
- Alert details: title, message, severity (Info, Warning, Critical)
- Delivery type: MVP supports In-App notifications (extensible to Email/SMS)
- Reminder frequency: default 2 hours reminder until snoozed or expiry
- Alert visibility: whole org, selected teams, or selected users
- Analytics on alerts: view total created, read rates, snoozes, severity breakdown

### User Capabilities

- Receive alerts relevant to their organization/team/user assignment
- Alerts auto re-trigger every 2 hours till user snoozes or alert expires
- Snooze an alert for current day; reset snooze next day automatically
- Mark alerts as read/unread
- View history of snoozed and active alerts

### Shared & Backend Features

- Alerts visible based on effective visibility calculating org/team/user membership
- Notification delivery logging with user preferences for snooze and read states
- Analytics endpoint providing alert metrics for system-wide monitoring
- Modular, clean OOP design with extensibility for new notification channels and reminder frequencies

***

## Tech Stack

- Node.js with Express framework
- TypeScript for type safety and OOP principles
- In-memory data store for demo, easily extensible to real database
- API testing via Postman (or any API client)

***

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd alerting-notification-platform
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. The backend server will run at:

   ```
   http://localhost:3000
   ```

***

## Core Data Models

| Model                 | Description                                                     |
|-----------------------|-----------------------------------------------------------------|
| Alert                 | Represents alerts with details such as title, message, severity, reminder frequency, visibility, and scheduling. |
| User                  | Holds user details including ID, name, and team association.    |
| Team                  | Represents organizational teams with unique IDs and names.     |
| UserAlertPreference   | Tracks per-user per-alert states: read/unread and snoozed until.|
| NotificationDelivery  | Logs each alert delivery to a user for analytics and debugging. |

***

## API Endpoints & Usage

### Admin APIs (`/admin` prefix)

| Method | Endpoint                | Description                   | Request Body (JSON) Summary                   |
|--------|-------------------------|-------------------------------|-----------------------------------------------|
| POST   | `/admin/alerts`          | Create a new alert            | title, message, severity, startTime, expiryTime, visibility, reminderFrequencyMinutes, enableReminders |
| GET    | `/admin/alerts`          | List all alerts with filters  | Query params: severity, status (active/expired), audience |
| PUT    | `/admin/alerts/:id`      | Update an existing alert      | Same as POST body for patching alerts          |
| DELETE | `/admin/alerts/:id`      | Archive/delete alert          | None                                            |

***

### User APIs (`/user` prefix)

All require an `x-user-id` header with the user’s ID.

| Method | Endpoint                          | Description                         | Notes                        |
|--------|----------------------------------|-----------------------------------|------------------------------|
| GET    | `/user/alerts`                   | Fetch all active alerts visible to user | Filters out snoozed alerts for the current day |
| POST   | `/user/alerts/:alertId/read`      | Mark alert as read                 | Requires alert ID            |
| POST   | `/user/alerts/:alertId/unread`    | Mark alert as unread               |                              |
| POST   | `/user/alerts/:alertId/snooze`    | Snooze alert for current day      | Resets at midnight            |

***

### Reminder Simulation Endpoint

| Method | Endpoint             | Description                       |
|--------|----------------------|-----------------------------------|
| POST   | `/trigger-reminders` | Manually trigger reminders        |

***

### Analytics Endpoint

| Method | Endpoint      | Description                            |
|--------|---------------|--------------------------------------|
| GET    | `/analytics`  | Get alert system metrics and statistics |

***

## Sample Workflow & Postman Test Cases

### 1. Create Alert (Admin)

- **Method:** POST  
- **URL:** `/admin/alerts`  
- **Body:**

```json
{
  "title": "System Downtime",
  "message": "Scheduled system downtime from 2 AM to 4 AM.",
  "severity": "Info",
  "startTime": "2025-09-24T00:00:00.000Z",
  "expiryTime": "2025-09-25T00:00:00.000Z",
  "visibleToOrg": true,
  "reminderFrequencyMinutes": 120,
  "enableReminders": true
}
```

***

### 2. List Alerts (Admin)

- **Method:** GET  
- **URL:** `/admin/alerts`  
- Verifies the alert is created and active.

***

### 3. Fetch User Alerts

- **Method:** GET  
- **URL:** `/user/alerts`  
- **Header:** `x-user-id: user1`  
- Fetches alerts visible to user1 based on visibility and snooze filters.

***

### 4. Mark Alert as Read

- **Method:** POST  
- **URL:** `/user/alerts/{alertId}/read`  
- **Header:** `x-user-id: user1`

***

### 5. Snooze Alert

- **Method:** POST  
- **URL:** `/user/alerts/{alertId}/snooze`  
- **Header:** `x-user-id: user1`  
- Snoozes alert for current day, suppressing repeat reminders.

***

### 6. Analytics Check

- **Method:** GET  
- **URL:** `/analytics`  
- Returns aggregated alert metrics.

***

## Postman Screenshot Proof

### Create Alert

![Create Alert](screenshots/create_alert.jpg

![List Alerts](screenshots/list_alerts.jpg Alerts

![Fetch Alerts](screenshots/fetch_alerts_user Alert As Read

![Mark as Read](screenshots/mark_read.jpg Alert

![Snooze Alert](screenshots/snooze_alert.jpg Summary

![Analytics](screenshots/analytics.jpgensibility & Future Scope

While this MVP satisfies all assignment requirements, the code is designed for easy extension to include:

- Email and SMS delivery channels via Strategy Pattern
- Custom reminder frequencies beyond 2 hours
- Scheduled alerts running on cron or specific times of day
- Escalation logic for unacknowledged alerts
- Role-based access control for secure admin operations
- Push notification service integration
- Persistent database support
- Frontend dashboard for admins and users

***

## Notes & Known Limitations

- In-memory data storage limits persistence (loses data on server restart)
- User authentication simulated using headers for demo purposes
- Timezone consistency maintained with UTC datetime handling
- Manual API endpoint for reminder triggering simulates real scheduling

***

## Author

Your Name  
Contact: sekharsunkara2002@gmail.com

***
