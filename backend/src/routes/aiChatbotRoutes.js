const express = require('express');
const router = express.Router();

// Basic route setup
router.get('/', (req, res) => {
    res.json({ message: 'AI Chatbot API' });
});

module.exports = router;
