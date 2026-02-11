import { HealthRecord } from '../models/HealthRecord.js';

export const getMyHealthRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findOne({ student: req.user._id });
    if (!record) {
      return res.status(404).json({ error: 'Health record not found for this user' });
    }
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getHealthRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findOne({ student: req.params.studentId });
    if (!record) {
      return res.status(404).json({ error: 'Health record not found' });
    }
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllHealthRecords = async (req, res) => {
    try {
        const records = await HealthRecord.find().populate('student', 'name rollNumber email');
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
