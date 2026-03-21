import express from 'express';
import { applyForGatePass, decideGatePass } from '../controllers/gatePassController.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authRequired, applyForGatePass);
router.post('/:id/decision', authRequired, decideGatePass);

export default router;
