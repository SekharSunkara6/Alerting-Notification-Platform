import express from 'express';
import { AlertService } from '../services/AlertService';
import { Alert } from '../models/Alert';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const alertService = new AlertService();

// Create a new alert
router.post('/alerts', (req, res) => {
  try {
    const {
      title,
      message,
      severity,
      startTime,
      expiryTime,
      visibleToOrg,
      visibleToTeams,
      visibleToUsers,
      enableReminders,
    } = req.body;

    if (!title || !message || !severity || !startTime || !expiryTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const alert = new Alert({
      id: uuidv4(),
      title,
      message,
      severity,
      startTime: new Date(startTime),
      expiryTime: new Date(expiryTime),
      visibleToOrg: !!visibleToOrg,
      visibleToTeams: visibleToTeams || [],
      visibleToUsers: visibleToUsers || [],
      enableReminders: enableReminders ?? true,
    });

    alertService.createAlert(alert);
    return res.status(201).json(alert);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an existing alert
router.put('/alerts/:id', (req, res) => {
  const alertId = req.params.id;
  const updateData = req.body;

  const updatedAlert = alertService.updateAlert(alertId, updateData);

  if (!updatedAlert) {
    return res.status(404).json({ error: 'Alert not found' });
  }

  return res.json(updatedAlert);
});

// Archive (disable) an alert
router.delete('/alerts/:id', (req, res) => {
  const alertId = req.params.id;
  const archived = alertService.archiveAlert(alertId);

  if (!archived) {
    return res.status(404).json({ error: 'Alert not found' });
  }

  return res.json({ message: 'Alert archived successfully' });
});

// List alerts with optional filters: severity, status
router.get('/alerts', (req, res) => {
  const { severity, status } = req.query;
  let isActive: boolean | undefined;

  if (status === 'active') isActive = true;
  else if (status === 'expired') isActive = false;

  const alerts = alertService.listAlerts({
    severity: severity as any,
    isActive,
  });

  return res.json(alerts);
});

export default router;
