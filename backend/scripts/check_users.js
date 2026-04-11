
import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/hostel_management';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  rollNumber: String,
});

const User = mongoose.model('User', UserSchema);

async function checkUsers() {
  try {
    console.log('Connecting to:', uri);
    await mongoose.connect(uri);
    const users = await User.find({});
    console.log('Total Users:', users.length);
    users.forEach(u => {
      console.log(`- ${u.name} (${u.email}) [${u.role}] (Roll: ${u.rollNumber || 'N/A'})`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkUsers();
