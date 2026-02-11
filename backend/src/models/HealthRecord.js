import mongoose from 'mongoose';

const healthRecordSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  studentName: { type: String, required: true },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  heightCm: { type: Number },
  weightKg: { type: Number },
  allergies: { type: [String], default: [] },
  existingMedicalConditions: { type: [String], default: [] },
  currentMedications: { type: [String], default: [] },
  emergencyContact: {
    name: String,
    relation: String,
    phone: String
  },
  doctorDetails: {
    name: String,
    hospital: String,
    phone: String
  },
  vaccinationRecords: [{
    vaccineName: String,
    dateAdministered: Date
  }],
  recentIllnesses: { type: [String], default: [] },
  medicalHistory: { type: String },
  disabilityInfo: { type: String, default: 'None' },
  healthInsuranceDetails: {
    providerName: String,
    policyNumber: String
  },
  lastMedicalCheckup: { type: Date }
}, { timestamps: true });

export const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);
