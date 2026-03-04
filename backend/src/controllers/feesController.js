import { User } from '../models/User.js';

export async function toggleFeeStatus(req, res) {
  try {
    const { studentId } = req.params;
    const user = await User.findById(studentId);
    if (!user) {
      return res.status(404).send('Student not found');
    }
    user.feePaid = !user.feePaid;
    await user.save();
    res.json(mapUser(user));
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update fee status');
  }
}

function mapUser(u) {
  return {
    id: u._id.toString(),
    name: u.name,
    email: u.email,
    passwordHash: u.passwordHash,
    role: u.role,
    rollNumber: u.rollNumber,
    feePaid: u.feePaid,
  };
}

// update_final_3

// update_final_7
