import { Alert, Severity } from '../models/Alert';
import { User } from '../models/User';

// In-memory store for demo purpose, later can replace with DB
const alertsStore: Map<string, Alert> = new Map<string, Alert>();

export class AlertService {
  // Create a new alert
  createAlert(alert: Alert): Alert {
    alertsStore.set(alert.id, alert);
    return alert;
  }

  // Update an existing alert
  updateAlert(alertId: string, updateData: Partial<Alert>): Alert | null {
    const alert = alertsStore.get(alertId);
    if (!alert) return null;

    Object.assign(alert, updateData);
    alertsStore.set(alert.id, alert);
    return alert;
  }

  // Archive (disable) alert
  archiveAlert(alertId: string): boolean {
    const alert = alertsStore.get(alertId);
    if (!alert) return false;

    alert.isActive = false;
    alertsStore.set(alertId, alert);
    return true;
  }

  // List all alerts with optional filtering
  listAlerts(filter?: {
    severity?: Severity;
    isActive?: boolean;
    audienceUser?: User; // For user-level filtering
  }): Alert[] {
    let alerts = Array.from(alertsStore.values());

    if (filter?.severity) {
      alerts = alerts.filter(alert => alert.severity === filter.severity);
    }

    if (filter?.isActive !== undefined) {
      alerts = alerts.filter(alert => alert.isActive === filter.isActive);
    }

    if (filter?.audienceUser) {
      const user = filter.audienceUser;
      alerts = alerts.filter(alert => {
        // Check if alert is visible to the user
        if (!alert.isCurrentlyActive()) return false;

        if (alert.visibleToOrg) return true;

        if (alert.visibleToUsers.includes(user.id)) return true;

        if (alert.visibleToTeams.includes(user.teamId)) return true;

        return false;
      });
    }

    return alerts;
  }
}
