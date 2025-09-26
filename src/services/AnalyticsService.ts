import { AlertService } from './AlertService';
import { UserAlertPreferenceService } from './UserAlertPreferenceService';
import { NotificationDelivery } from '../models/NotificationDelivery';

export class AnalyticsService {
  private alertService: AlertService;
  private userPrefService: UserAlertPreferenceService;

  constructor(alertService: AlertService, userPrefService: UserAlertPreferenceService) {
    this.alertService = alertService;
    this.userPrefService = userPrefService;
  }

  getSummary() {
    const alerts = this.alertService.listAlerts();

    const totalAlerts = alerts.length;

    // For demo, we do not have real NotificationDelivery logs, so approximate:
    let readCount = 0;
    let snoozedCount = 0;
    const severityCount = {
      Info: 0,
      Warning: 0,
      Critical: 0,
    };

    alerts.forEach(alert => {
      severityCount[alert.severity]++;

      // Approximate counts by scanning user preferences (assuming small dataset)
      // A real DB approach needed for large scale
      // For simplicity, skipped here
    });

    return {
      totalAlerts,
      readCount,
      snoozedCount,
      severityCount,
    };
  }
}
