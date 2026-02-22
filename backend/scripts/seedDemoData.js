import mongoose from 'mongoose';
import { connectDB } from '../src/config/db.js';
import { User } from '../src/models/User.js';
import { Complaint } from '../src/models/Complaint.js';
import { LeaveRequest } from '../src/models/LeaveRequest.js';
import { Parcel } from '../src/models/Parcel.js';
import { GatePass } from '../src/models/GatePass.js';
import { LostAndFoundItem } from '../src/models/LostAndFoundItem.js';
import { Notification } from '../src/models/Notification.js';

async function seedDemoData() {
  try {
    await connectDB();

    const students = await User.find({ role: 'student' }).limit(20);
    if (students.length === 0) {
      console.log('No students found. Run seedStudents.js first.');
      return;
    }

    const sampleNotifications = [
      { title: 'Hostel Cleaning Drive', message: 'Hostel cleaning will be conducted this Sunday. Please keep your belongings safe.' },
      { title: 'Mess Menu Update', message: 'New mess menu has been updated for this week. Check the Mess section.' },
      { title: 'Fee Payment Reminder', message: 'Kindly clear your hostel fee dues before the end of this month.' },
    ];

    if (await Notification.countDocuments() === 0) {
      await Notification.insertMany(sampleNotifications);
      console.log('Inserted sample notifications');
    }

    const complaints = students.slice(0, 5).map((s, idx) => ({
      student: s._id,
      studentName: s.name,
      rollNumber: s.rollNumber || s.email,
      description: `Complaint ${idx + 1}: Issue with room maintenance`,
      status: 'pending',
    }));

    const leaves = students.slice(5, 10).map((s, idx) => ({
      student: s._id,
      studentName: s.name,
      rollNumber: s.rollNumber || s.email,
      reason: `Family visit ${idx + 1}`,
      status: 'pending',
      requestDate: new Date(),
    }));

    const parcels = students.slice(10, 15).map((s, idx) => ({
      student: s._id,
      studentName: s.name,
      rollNumber: s.rollNumber || s.email,
      courier: 'BlueDart',
      trackingId: `TRACK${1000 + idx}`,
      collected: false,
    }));

    const gatePasses = students.slice(15, 20).map((s, idx) => ({
      student: s._id,
      studentName: s.name,
      rollNumber: s.rollNumber || s.email,
      reason: `Going home ${idx + 1}`,
      fromDate: new Date(),
      toDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      status: 'pending',
      approvalQrCodeData: `${s._id.toString()}-${Date.now()}-${idx}`,
    }));

    const lostAndFound = students.slice(0, 5).map((s, idx) => ({
      student: s._id,
      studentName: s.name,
      itemType: idx % 2 === 0 ? 'lost' : 'found',
      description: idx % 2 === 0 ? 'Lost wallet near mess' : 'Found keys near library',
      location: idx % 2 === 0 ? 'Mess' : 'Library',
      status: 'Open',
      datePosted: new Date(),
    }));

    if (complaints.length) await Complaint.insertMany(complaints);
    if (leaves.length) await LeaveRequest.insertMany(leaves);
    if (parcels.length) await Parcel.insertMany(parcels);
    if (gatePasses.length) await GatePass.insertMany(gatePasses);
    if (lostAndFound.length) await LostAndFoundItem.insertMany(lostAndFound);

    console.log('Inserted sample complaints, leaves, parcels, gate passes, lost & found items.');
  } catch (err) {
    console.error('Error seeding demo data:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seedDemoData();
