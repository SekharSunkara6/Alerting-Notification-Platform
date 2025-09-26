import { AlertService } from './AlertService';
import { UserAlertPreferenceService } from './UserAlertPreferenceService';
import { users } from '../data/seed';

export class NotificationService {
  private alertService: AlertService;
  private userPrefService: UserAlertPreferenceService;

  constructor(alertService: AlertService, userPrefService: UserAlertPreferenceService) {
    this.alertService = alertService;
    this.userPrefService = userPrefService;
  }

  triggerRemindersForAllUsers() {
    const alerts = this.alertService.listAlerts({ isActive: true });
    const deliveries: any[] = [];

    users.forEach(user => {
      alerts.forEach(alert => {
        if (
          alert.isCurrentlyActive() &&
          (alert.visibleToOrg ||
            alert.visibleToTeams.includes(user.teamId) ||
            alert.visibleToUsers.includes(user.id)) &&
          !this.userPrefService.isAlertSnoozed(alert.id, user.id)
        ) {
          // Simulate delivery: Here just push log, in future extend to real delivery
          deliveries.push({ alertId: alert.id, userId: user.id, deliveredAt: new Date() });
          console.log(`Reminder sent to user ${user.name} for alert ${alert.title}`);
        }
      });
    });

    return deliveries;
  }
}
