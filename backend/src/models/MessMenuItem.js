import mongoose from 'mongoose';

const messMenuItemSchema = new mongoose.Schema({
  day: { type: String, required: true },
  breakfast: { type: String, required: true },
  lunch: { type: String, required: true },
  snacks: { type: String, required: false },
  dinner: { type: String, required: true },
}, { timestamps: true });

export const MessMenuItem = mongoose.model('MessMenuItem', messMenuItemSchema);
