import { UserAlertPreference } from '../models/UserAlertPreference';

const userAlertPreferencesStore: Map<string, UserAlertPreference> = new Map();

function generateKey(alertId: string, userId: string): string {
  return `${alertId}_${userId}`;
}

export class UserAlertPreferenceService {
  getPreference(alertId: string, userId: string): UserAlertPreference | null {
    const key = generateKey(alertId, userId);
    return userAlertPreferencesStore.get(key) || null;
  }

  createOrGetPreference(alertId: string, userId: string): UserAlertPreference {
    const key = generateKey(alertId, userId);
    let pref = userAlertPreferencesStore.get(key);
    if (!pref) {
      pref = new UserAlertPreference(alertId, userId);
      userAlertPreferencesStore.set(key, pref);
    }
    return pref;
  }

  markAsRead(alertId: string, userId: string): UserAlertPreference | null {
    const pref = this.createOrGetPreference(alertId, userId);
    pref.readStatus = 'Read';
    return pref;
  }

  markAsUnread(alertId: string, userId: string): UserAlertPreference | null {
    const pref = this.createOrGetPreference(alertId, userId);
    pref.readStatus = 'Unread';
    return pref;
  }

  snoozeAlertForToday(alertId: string, userId: string): UserAlertPreference | null {
    const pref = this.createOrGetPreference(alertId, userId);
    pref.snoozeForToday();
    return pref;
  }

  isAlertSnoozed(alertId: string, userId: string): boolean {
    const pref = this.getPreference(alertId, userId);
    if (!pref) return false;
    return pref.isSnoozed();
  }
}
