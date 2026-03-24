const aiChatbotController = {
    async handleMessage(req, res) {
        try {
            const { message } = req.body;
            
            // Validate input
            if (!message || typeof message !== 'string') {
                return res.status(400).json({ error: 'Valid message required' });
            }
            
            if (message.length > 500) {
                return res.status(400).json({ error: 'Message too long' });
            }
            
            res.json({ response: 'Message received: ' + message });
        } catch (error) {
            res.status(500).json({ error: 'Processing failed' });
        }
    }
};

module.exports = aiChatbotController;
