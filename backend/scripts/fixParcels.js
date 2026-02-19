import mongoose from 'mongoose';
import { connectDB } from '../src/config/db.js';
import { Parcel } from '../src/models/Parcel.js';
import { User } from '../src/models/User.js';

async function fixParcels() {
  try {
    await connectDB();

    const parcels = await Parcel.find({}).populate('student');
    if (parcels.length === 0) {
      console.log('No parcels found');
      return;
    }

    for (const p of parcels) {
      if (!p.student) continue;
      const user = await User.findById(p.student._id || p.student);
      if (!user) continue;
      p.studentName = user.name;
      p.rollNumber = user.rollNumber || user.email;
      await p.save();
    }

    console.log(`Updated ${parcels.length} parcels with correct studentName and rollNumber.`);
  } catch (err) {
    console.error('Error fixing parcels:', err);
  } finally {
    await mongoose.disconnect();
  }
}

fixParcels();
