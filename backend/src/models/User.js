import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], required: true },
  rollNumber: { type: String },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  feePaid: { type: Boolean, default: false },
  contactNumber: { type: String },
  guardian: {
    name: String,
    contactNumber: String,
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
