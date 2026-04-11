import { User } from '../models/User.js';
import { Room } from '../models/Room.js';
import { GatePass } from '../models/GatePass.js';
import { LeaveRequest } from '../models/LeaveRequest.js';
import { Complaint } from '../models/Complaint.js';
import { Parcel } from '../models/Parcel.js';
import { MessMenuItem } from '../models/MessMenuItem.js';
import { EmergencyAlert } from '../models/EmergencyAlert.js';
import { LostAndFoundItem } from '../models/LostAndFoundItem.js';
import { Notification } from '../models/Notification.js';

export async function getStudentData(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('Student not found');
    }

    const room = user.room ? await Room.findById(user.room) : null;
    const gatePass = await GatePass.findOne({ student: user._id }).sort({ createdAt: -1 });
    const leaves = await LeaveRequest.find({ student: user._id }).sort({ createdAt: -1 });
    const complaints = await Complaint.find({ student: user._id }).sort({ createdAt: -1 });
    const parcels = await Parcel.find({ student: user._id }).sort({ createdAt: -1 });
    const messMenu = await MessMenuItem.find({}).sort({ day: 1 });
    const emergencyAlerts = await EmergencyAlert.find({}).sort({ createdAt: -1 });
    const lostAndFoundItems = await LostAndFoundItem.find({}).sort({ createdAt: -1 });
    const notifications = await Notification.find({}).sort({ createdAt: -1 }).limit(10);

    res.json({
      user: mapUser(user),
      room: room ? mapRoom(room) : null,
      gatePass: gatePass ? mapGatePass(gatePass) : null,
      leaves: leaves.map(mapLeave),
      complaints: complaints.map(mapComplaint),
      parcels: parcels.map(mapParcel),
      messMenu: messMenu.map(mapMenu),
      emergencyAlerts: emergencyAlerts.map(mapEmergency),
      lostAndFoundItems: lostAndFoundItems.map(mapLostAndFound),
      notifications: notifications.map(mapNotification),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load student data');
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
    contactNumber: u.contactNumber,
  };
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

function mapGatePass(g) {
  return {
    id: g._id.toString(),
    studentId: g.student.toString(),
    studentName: g.studentName,
    rollNumber: g.rollNumber,
    reason: g.reason,
    fromDate: g.fromDate,
    toDate: g.toDate,
    status: g.status,
    approvalQrCodeData: g.approvalQrCodeData,
    qrCodeData: g.qrCodeData,
  };
}

function mapLeave(l) {
  return {
    id: l._id.toString(),
    studentId: l.student.toString(),
    studentName: l.studentName,
    rollNumber: l.rollNumber,
    reason: l.reason,
    fromDate: l.fromDate,
    toDate: l.toDate,
    status: l.status,
    requestDate: l.requestDate,
  };
}

function mapComplaint(c) {
  return {
    id: c._id.toString(),
    studentId: c.student.toString(),
    studentName: c.studentName,
    rollNumber: c.rollNumber,
    subject: c.subject,
    description: c.description,
    status: c.status,
  };
}

function mapParcel(p) {
  return {
    id: p._id.toString(),
    studentId: p.student.toString(),
    studentName: p.studentName,
    rollNumber: p.rollNumber,
    courier: p.courier,
    trackingId: p.trackingId,
    receivedDate: p.receivedDate,
    collected: p.collected,
  };
}

function mapMenu(m) {
  return {
    day: m.day,
    breakfast: m.breakfast,
    lunch: m.lunch,
    snacks: m.snacks,
    dinner: m.dinner,
  };
}

function mapEmergency(e) {
  return {
    id: e._id.toString(),
    studentId: e.student.toString(),
    studentName: e.studentName,
    rollNumber: e.rollNumber,
    roomDetails: e.roomDetails,
    emergencyType: e.emergencyType,
    description: e.description,
    timestamp: e.timestamp,
    status: e.status,
  };
}

function mapLostAndFound(l) {
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

function mapNotification(n) {
  return {
    id: n._id.toString(),
    title: n.title,
    message: n.message,
    createdAt: n.createdAt,
  };
}
