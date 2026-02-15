import express from 'express';
import { getHealthRecord, getMyHealthRecord, getAllHealthRecords } from '../controllers/healthController.js';
import { authRequired, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/my', authRequired, getMyHealthRecord);
router.get('/:studentId', authRequired, requireRole('admin'), getHealthRecord);
router.get('/', authRequired, requireRole('admin'), getAllHealthRecords);

export default router;
