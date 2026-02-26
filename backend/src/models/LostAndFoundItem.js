const mongoose = require('mongoose');

// Basic schema structure
const lostAndFoundItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, default: 'lost' }
});

module.exports = mongoose.model('LostAndFoundItem', lostAndFoundItemSchema);
