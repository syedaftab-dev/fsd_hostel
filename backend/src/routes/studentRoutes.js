import express from 'express';
import { getStudentData } from '../controllers/studentController.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', authRequired, getStudentData);

export default router;
