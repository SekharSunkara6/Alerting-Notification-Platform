export type AlertReadStatus = 'Unread' | 'Read';

export class UserAlertPreference {
  alertId: string;
  userId: string;
  readStatus: AlertReadStatus;
  snoozedUntil: Date | null;

  constructor(alertId: string, userId: string) {
    this.alertId = alertId;
    this.userId = userId;
    this.readStatus = 'Unread';
    this.snoozedUntil = null;
  }

  snoozeForToday() {
    const now = new Date();
    // Sets snoozedUntil to end of day (midnight)
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    this.snoozedUntil = endOfDay;
  }

  isSnoozed(): boolean {
    if (!this.snoozedUntil) return false;
    return new Date() < this.snoozedUntil;
  }
}
