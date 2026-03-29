const mongoose = require('mongoose');

const lostAndFoundItemSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: true, maxlength: 500 },
    category: { type: String, enum: ['electronics', 'clothing', 'documents', 'other'] },
    status: { type: String, enum: ['lost', 'found', 'claimed'], default: 'lost' },
    location: { type: String, maxlength: 200 },
    reportedBy: { type: String, required: true },
    contactInfo: { type: String, required: true },
    dateReported: { type: Date, default: Date.now },
    dateResolved: { type: Date }
});

module.exports = mongoose.model('LostAndFoundItem', lostAndFoundItemSchema);
