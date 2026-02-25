const mongoose = require('mongoose');

const lostAndFoundItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ['lost', 'found'], default: 'lost' },
    reportedBy: { type: String, required: true },
    dateReported: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LostAndFoundItem', lostAndFoundItemSchema);
