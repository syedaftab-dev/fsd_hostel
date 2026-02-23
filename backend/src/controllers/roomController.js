import { Room } from '../models/Room.js';
import { User } from '../models/User.js';

export async function getAllRooms(req, res) {
  try {
    const rooms = await Room.find().populate('occupants', 'name email rollNumber');
    res.json(rooms.map(mapRoom));
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch rooms');
  }
}

export async function allocateRoom(req, res) {
  try {
    const { studentId, roomId } = req.body;
    if (!studentId || !roomId) {
      return res.status(400).send('Missing studentId or roomId');
    }
    const student = await User.findById(studentId);
    const room = await Room.findById(roomId);
    if (!student || !room) {
      return res.status(404).send('Student or room not found');
    }

    // Remove from any previous room
    if (student.room) {
      await Room.updateOne({ _id: student.room }, { $pull: { occupants: student._id } });
    }

    if (room.occupants.length >= room.capacity) {
      return res.status(400).send('Room is full');
    }

    room.occupants.push(student._id);
    student.room = room._id;
    await room.save();
    await student.save();

    res.json(mapRoom(room));
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to allocate room');
  }
}

export async function unassignRoom(req, res) {
  try {
    const { roomId } = req.params;
    const { studentId } = req.body;
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).send('Student not found');
    }
    await Room.updateOne({ _id: roomId }, { $pull: { occupants: student._id } });
    student.room = null;
    await student.save();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to unassign room');
  }
}

function mapRoom(r) {
  return {
    id: r._id.toString(),
    roomNumber: r.roomNumber,
    block: r.block,
    capacity: r.capacity,
    occupants: r.occupants.map(o => o.toString()),
  };
}

// update_final_0

// update_final_4
