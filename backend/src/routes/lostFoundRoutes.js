import express from 'express';
import { postItem, claimItem, deleteItem } from '../controllers/lostFoundController.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authRequired, postItem);
router.post('/:id/claim', authRequired, claimItem);
router.delete('/:id', authRequired, deleteItem);

export default router;
