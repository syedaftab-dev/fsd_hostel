import mongoose from 'mongoose';

const lostAndFoundItemSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentName: { type: String, required: true },
  itemType: { type: String, required: true }, // Changed from enum to any string
  description: { type: String, required: true },
  location: { type: String, required: true },
  datePosted: { type: Date, default: Date.now },
  status: { type: String, enum: ['Open', 'Claimed'], default: 'Open' },
}, { timestamps: true });

export const LostAndFoundItem = mongoose.model('LostAndFoundItem', lostAndFoundItemSchema);
