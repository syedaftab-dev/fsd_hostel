import mongoose from 'mongoose';
import { User } from '../src/models/User.js';
import { HealthRecord } from '../src/models/HealthRecord.js';

// Connect to testing or specific DB URI
mongoose.connect('mongodb://localhost:27017/hostel_management')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const fakeAllergies = [['Peanuts'], ['Dust'], ['Penicillin'], ['Pollen', 'Dust'], []];
const fakeConditions = [['Asthma'], ['Diabetes Type 1'], ['Migraines'], []];
const fakeMedications = [['Albuterol'], ['Insulin'], ['Ibuprofen'], []];
const fakeVaccines = ['COVID-19', 'Hepatitis B', 'Typhoid', 'Tetanus'];

async function seedHealthRecords() {
  try {
    const students = await User.find({ role: 'student' });
    console.log(`Found ${students.length} students. Generating health records...`);

    // Remove existing records if any
    await HealthRecord.deleteMany({});
    
    const records = [];

    for (const student of students) {
      records.push({
        student: student._id,
        studentName: student.name,
        bloodGroup: randomElement(bloodGroups),
        heightCm: Math.floor(Math.random() * (190 - 150 + 1)) + 150, // 150cm to 190cm
        weightKg: Math.floor(Math.random() * (95 - 50 + 1)) + 50, // 50kg to 95kg
        allergies: randomElement(fakeAllergies),
        existingMedicalConditions: randomElement(fakeConditions),
        currentMedications: randomElement(fakeMedications),
        emergencyContact: {
          name: `Guardian of ${student.name}`,
          relation: randomElement(['Father', 'Mother', 'Uncle']),
          phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`
        },
        doctorDetails: {
          name: `Dr. ${randomElement(['Smith', 'Sharma', 'Patel', 'Reddy'])}`,
          hospital: `${randomElement(['City', 'Apollo', 'Global', 'Care'])} Hospital`,
          phone: `040 ${Math.floor(Math.random() * 9000000) + 1000000}`
        },
        vaccinationRecords: [
          { vaccineName: randomElement(fakeVaccines), dateAdministered: new Date(Date.now() - Math.random() * 100000000000) }
        ],
        recentIllnesses: Math.random() > 0.8 ? ['Viral Fever'] : [],
        medicalHistory: 'No major surgeries.',
        disabilityInfo: 'None',
        healthInsuranceDetails: {
          providerName: randomElement(['Star Health', 'HDFC Ergo', 'LIC']),
          policyNumber: `POL-${Math.floor(Math.random() * 900000)}`
        },
        lastMedicalCheckup: new Date(Date.now() - Math.random() * 31536000000) // Within last year
      });
    }

    if (records.length > 0) {
      await HealthRecord.insertMany(records);
      console.log(`Successfully inserted ${records.length} health records.`);
    } else {
      console.log('No students found to generate health records for.');
    }
  } catch (error) {
    console.error('Error seeding health records:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedHealthRecords();
