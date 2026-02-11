import mongoose from 'mongoose';
import { connectDB } from '../src/config/db.js';
import { User } from '../src/models/User.js';

const INDIAN_NAMES = [
  'Aarav Sharma', 'Vivaan Patel', 'Aditya Verma', 'Krishna Iyer', 'Rohan Singh',
  'Ishaan Mehta', 'Ananya Gupta', 'Diya Reddy', 'Isha Nair', 'Kavya Menon',
  'Sanjay Kumar', 'Rahul Desai', 'Neha Jain', 'Priya Roy', 'Sneha Das',
  'Akash Yadav', 'Pooja Mishra', 'Ritu Choudhary', 'Tarun Bhatia', 'Varun Joshi',
  'Arjun Rao', 'Meera Pillai', 'Nikhil Kapoor', 'Sakshi Bansal', 'Simran Kaur',
  'Manish Goyal', 'Gaurav Malhotra', 'Kiran Joshi', 'Rakesh Pandey', 'Ajay Tiwari'
];

async function updateStudents() {
  try {
    await connectDB();

    const students = await User.find({ email: /@iiitk\.ac\.in$/ });
    if (students.length === 0) {
      console.log('No iiitk.ac.in students found');
      return;
    }

    let nameIndex = 0;

    for (const s of students) {
      const [local] = s.email.split('@');
      s.rollNumber = local;
      s.name = INDIAN_NAMES[nameIndex % INDIAN_NAMES.length];
      nameIndex++;
      await s.save();
    }

    console.log(`Updated ${students.length} students with rollNumber and Indian names.`);
  } catch (err) {
    console.error('Error updating students:', err);
  } finally {
    await mongoose.disconnect();
  }
}

updateStudents();
