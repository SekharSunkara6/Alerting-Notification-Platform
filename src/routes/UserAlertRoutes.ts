import express from 'express';
import { AlertService } from '../services/AlertService';
import { UserAlertPreferenceService } from '../services/UserAlertPreferenceService';
import { users } from '../data/seed';

const router = express.Router();
const alertService = new AlertService();
const userPrefService = new UserAlertPreferenceService();

// Middleware to mock authenticated user by userId Query param for demo
router.use((req, res, next) => {
  const userId = req.header('x-user-id') || req.query.userId;
  if (!userId) {
    return res.status(401).json({ error: 'User ID header or query param missing (x-user-id or ?userId)' });
  }
  // Attach user object to req
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  (req as any).currentUser = user;
  next();
});

// Fetch active alerts for user (excluding snoozed)
router.get('/alerts', (req, res) => {
  const user = (req as any).currentUser;

  const alerts = alertService.listAlerts({ audienceUser: user, isActive: true });

  // Filter out snoozed alerts
  const visibleAlerts = alerts.filter(alert => {
    return !userPrefService.isAlertSnoozed(alert.id, user.id);
  });

  return res.json(visibleAlerts);
});

// Mark alert as read
router.post('/alerts/:alertId/read', (req, res) => {
  const user = (req as any).currentUser;
  const alertId = req.params.alertId;

  const pref = userPrefService.markAsRead(alertId, user.id);
  return res.json(pref);
});

// Mark alert as unread
router.post('/alerts/:alertId/unread', (req, res) => {
  const user = (req as any).currentUser;
  const alertId = req.params.alertId;

  const pref = userPrefService.markAsUnread(alertId, user.id);
  return res.json(pref);
});

// Snooze alert for today
router.post('/alerts/:alertId/snooze', (req, res) => {
  const user = (req as any).currentUser;
  const alertId = req.params.alertId;

  const pref = userPrefService.snoozeAlertForToday(alertId, user.id);
  return res.json(pref);
});

export default router;
