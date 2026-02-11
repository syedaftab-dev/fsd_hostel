import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  category: { type: String, enum: ['general', 'sports'], default: 'general' },
  link: { type: String },
}, { timestamps: true });

export const Notification = mongoose.model('Notification', notificationSchema);
