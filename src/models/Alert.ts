export type Severity = 'Info' | 'Warning' | 'Critical';

export type DeliveryType = 'InApp'; // Future: Email, SMS

export class Alert {
  id: string;
  title: string;
  message: string;
  severity: Severity;
  deliveryType: DeliveryType;
  reminderFrequencyMinutes: number;
  startTime: Date;
  expiryTime: Date;
  visibleToOrg: boolean;
  visibleToTeams: string[]; // team ids
  visibleToUsers: string[]; // user ids
  isActive: boolean;
  enableReminders: boolean;

  constructor(params: {
    id: string;
    title: string;
    message: string;
    severity: Severity;
    deliveryType?: DeliveryType;
    reminderFrequencyMinutes?: number;
    startTime: Date;
    expiryTime: Date;
    visibleToOrg: boolean;
    visibleToTeams?: string[];
    visibleToUsers?: string[];
    isActive?: boolean;
    enableReminders?: boolean;
  }) {
    this.id = params.id;
    this.title = params.title;
    this.message = params.message;
    this.severity = params.severity;
    this.deliveryType = params.deliveryType || 'InApp';
    this.reminderFrequencyMinutes = params.reminderFrequencyMinutes || 120; // default 2 hours
    this.startTime = params.startTime;
    this.expiryTime = params.expiryTime;
    this.visibleToOrg = params.visibleToOrg;
    this.visibleToTeams = params.visibleToTeams || [];
    this.visibleToUsers = params.visibleToUsers || [];
    this.isActive = params.isActive ?? true;
    this.enableReminders = params.enableReminders ?? true;
  }

  isExpired(): boolean {
    return new Date() > this.expiryTime;
  }

  isCurrentlyActive(): boolean {
    const now = new Date();
    return this.isActive && now >= this.startTime && now <= this.expiryTime;
  }
}
