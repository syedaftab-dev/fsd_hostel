import express from 'express';
import { createNotification, getNotifications, markNotificationsRead } from '../controllers/notificationController.js';
import { authRequired, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authRequired, getNotifications);
router.post('/', authRequired, requireRole('admin'), createNotification);
router.post('/read', authRequired, markNotificationsRead);

export default router;
