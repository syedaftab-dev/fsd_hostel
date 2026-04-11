import express from 'express';
import { searchUsers, getMessages, sendMessage, getRecentChats } from '../controllers/chatController.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

router.get('/search', authRequired, searchUsers);
router.get('/recent', authRequired, getRecentChats);
router.get('/:userId', authRequired, getMessages);
router.post('/', authRequired, sendMessage);

export default router;
