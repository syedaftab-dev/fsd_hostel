import { LostAndFoundItem } from '../models/LostAndFoundItem.js';
import { User } from '../models/User.js';

export async function postItem(req, res) {
  try {
    const { itemType, description, location } = req.body;
    // Get student ID from authenticated user
    const studentId = req.user._id.toString();
    
    if (!itemType || !description || !location) {
      return res.status(400).send('Missing required fields: itemType, description, location');
    }
    
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).send('Student not found');
    }
    
    const item = await LostAndFoundItem.create({
      student: student._id,
      studentName: student.name,
      itemType,
      description,
      location,
    });
    res.status(201).json(mapItem(item));
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to post item');
  }
}

export async function claimItem(req, res) {
  try {
    const { id } = req.params;
    const item = await LostAndFoundItem.findById(id);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    item.status = 'Claimed';
    await item.save();
    res.json(mapItem(item));
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to claim item');
  }
}

export async function deleteItem(req, res) {
  try {
    const { id } = req.params;
    const item = await LostAndFoundItem.findById(id);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    await item.deleteOne();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete item');
  }
}

function mapItem(l) {
  return {
    id: l._id.toString(),
    studentId: l.student.toString(),
    studentName: l.studentName,
    itemType: l.itemType,
    description: l.description,
    location: l.location,
    datePosted: l.datePosted,
    status: l.status,
  };
}
