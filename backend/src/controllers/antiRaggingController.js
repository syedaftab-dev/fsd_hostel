import { AntiRagging } from '../models/AntiRagging.js';

// Student: Submit an anti-ragging complaint
export const submitComplaint = async (req, res) => {
  try {
    const { accusedName, incidentLocation, description } = req.body;
    
    if (!accusedName || !incidentLocation || !description) {
      return res.status(400).json({ message: 'Please provide all details.' });
    }

    const report = new AntiRagging({
      victim: req.user.id,
      victimName: req.user.name,
      victimRollNumber: req.user.rollNumber || req.user.email,
      accusedName,
      incidentLocation,
      description,
      status: 'pending'
    });

    await report.save();
    res.status(201).json(report);
  } catch (error) {
    console.error('Error submitting anti-ragging complaint:', error);
    res.status(500).json({ message: 'Failed to submit complaint' });
  }
};

// Student: Get my complaints
export const getMyComplaints = async (req, res) => {
  try {
    const reports = await AntiRagging.find({ victim: req.user.id }).sort({ dateReported: -1 });
    res.json(reports);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ message: 'Failed to fetch complaints' });
  }
};

// Admin: Get all complaints
export const getAllComplaints = async (req, res) => {
  try {
    const reports = await AntiRagging.find().sort({ dateReported: -1 });
    res.json(reports);
  } catch (error) {
    console.error('Error fetching all complaints:', error);
    res.status(500).json({ message: 'Failed to fetch complaints' });
  }
};

// Admin: Update complaint status
export const updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const report = await AntiRagging.findById(id);
    if (!report) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    if (status) report.status = status;
    if (adminNotes !== undefined) report.adminNotes = adminNotes;

    await report.save();
    res.json(report);
  } catch (error) {
    console.error('Error updating complaint:', error);
    res.status(500).json({ message: 'Failed to update complaint' });
  }
};
