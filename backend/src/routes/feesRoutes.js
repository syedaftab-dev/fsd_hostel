import express from 'express';
import { toggleFeeStatus } from '../controllers/feesController.js';
import { authRequired, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/:studentId/toggle', authRequired, requireRole('admin'), toggleFeeStatus);

export default router;
