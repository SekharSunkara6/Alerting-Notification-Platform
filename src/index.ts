import express from 'express';
import bodyParser from 'body-parser';

import alertRoutes from './routes/AlertRoutes';
import userAlertRoutes from './routes/UserAlertRoutes';
import analyticsRoutes from './routes/AnalyticsRoutes';
import reminderRoutes from './routes/ReminderRoutes';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Default route
app.get('/', (req, res) => {
  res.send('Alerting & Notification Platform API');
});

// Admin routes for alert management
app.use('/admin', alertRoutes);

// User routes for user alert interactions
app.use('/user', userAlertRoutes);

// Analytics route
app.use('/', analyticsRoutes);

// Reminder trigger simulation route
app.use('/', reminderRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
