const mongoose = require('mongoose');
const PreRegistration = require('../models/PreRegistration');
require('dotenv').config();

// Sample pre-registration data
const preRegistrationData = [
  // Students
  {
    fullName: "John Doe",
    email: "john.doe@rgukt.ac.in",
    role: "student",
    studentId: "STU001",
    department: "CSE",
    yearOfStudy: "E-3",
    phoneNumber: "9876543210"
  },
  {
    fullName: "Jane Smith",
    email: "jane.smith@rgukt.ac.in",
    role: "student",
    studentId: "STU002", 
    department: "ECE",
    yearOfStudy: "E-2",
    phoneNumber: "9876543211"
  },
  {
    fullName: "Alice Johnson",
    email: "alice.johnson@rgukt.ac.in",
    role: "student",
    studentId: "STU003",
    department: "EEE",
    yearOfStudy: "E-4",
    phoneNumber: "9876543212"
  },

  // Faculty
  {
    fullName: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@rgukt.ac.in",
    role: "faculty",
    facultyId: "FAC001",
    department: "CSE",
    designation: "Professor",
    phoneNumber: "9876543213"
  },
  {
    fullName: "Dr. Priya Sharma",
    email: "priya.sharma@rgukt.ac.in",
    role: "faculty",
    facultyId: "FAC002",
    department: "ECE", 
    designation: "Associate Professor",
    phoneNumber: "9876543214"
  },

  // Admins
  {
    fullName: "Admin User",
    email: "admin@rgukt.ac.in",
    role: "admin",
    adminId: "ADM001",
    phoneNumber: "9876543215"
  },
  {
    fullName: "Super Admin",
    email: "superadmin@rgukt.ac.in",
    role: "admin", 
    adminId: "ADM002",
    phoneNumber: "9876543216"
  }
];

// Seed function
async function seedPreRegistrationData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await PreRegistration.deleteMany({});
    console.log('🗑️ Cleared existing pre-registration data');

    // Insert new data
    await PreRegistration.insertMany(preRegistrationData);
    console.log('✅ Pre-registration data seeded successfully');
    console.log(`📊 Inserted ${preRegistrationData.length} records`);

    // Display seeded data
    const seededData = await PreRegistration.find({});
    console.log('\n📋 Seeded Data:');
    seededData.forEach(record => {
      console.log(`${record.role.toUpperCase()}: ${record.fullName} (${record.email})`);
    });

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run seeder
if (require.main === module) {
  seedPreRegistrationData();
}

module.exports = seedPreRegistrationData;