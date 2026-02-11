import mongoose from 'mongoose';
import { MessMenuItem } from './src/models/MessMenuItem.js';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hostel_management');
  await MessMenuItem.deleteMany({});
  console.log('Deleted old menu');
  process.exit(0);
}
run();
