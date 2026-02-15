const express = require('express');
const router = express.Router();
const aiChatbotController = require('../controllers/aiChatbotController');

router.post('/message', aiChatbotController.handleMessage);

module.exports = router;
