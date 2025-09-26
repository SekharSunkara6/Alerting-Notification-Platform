export class NotificationDelivery {
  alertId: string;
  userId: string;
  deliveredAt: Date;
  read: boolean;

  constructor(alertId: string, userId: string) {
    this.alertId = alertId;
    this.userId = userId;
    this.deliveredAt = new Date();
    this.read = false;
  }
}
