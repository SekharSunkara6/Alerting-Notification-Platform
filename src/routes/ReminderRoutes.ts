import express from 'express';
import { AlertService } from '../services/AlertService';
import { UserAlertPreferenceService } from '../services/UserAlertPreferenceService';
import { NotificationService } from '../services/NotificationService';

const router = express.Router();

const alertService = new AlertService();
const userPrefService = new UserAlertPreferenceService();

const notificationService = new NotificationService(alertService, userPrefService);

// API to trigger reminders manually (simulate scheduled reminders)
router.post('/trigger-reminders', (_req, res) => {
  const deliveries = notificationService.triggerRemindersForAllUsers();
  res.json({ message: 'Reminders triggered', deliveries });
});

export default router;
