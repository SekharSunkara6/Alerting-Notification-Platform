import express from 'express';
import { AlertService } from '../services/AlertService';
import { UserAlertPreferenceService } from '../services/UserAlertPreferenceService';
import { AnalyticsService } from '../services/AnalyticsService';

const router = express.Router();

const alertService = new AlertService();
const userPrefService = new UserAlertPreferenceService();

const analyticsService = new AnalyticsService(alertService, userPrefService);

router.get('/analytics', (_req, res) => {
  const summary = analyticsService.getSummary();
  res.json(summary);
});

export default router;
