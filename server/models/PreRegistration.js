const mongoose = require('mongoose');

const preRegistrationSchema = new mongoose.Schema({
  // Common fields
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
    required: true
  },

  // Student specific fields
  studentId: {
    type: String,
    sparse: true
  },
  department: {
    type: String,
    enum: ['CSE', 'ECE', 'EEE', 'CIVIL', 'MECH', 'CHEM', 'MME'],
    sparse: true
  },
  yearOfStudy: {
    type: String,
    enum: ['E-1', 'E-2', 'E-3', 'E-4'],
    sparse: true
  },

  // Faculty specific fields
  facultyId: {
    type: String,
    sparse: true
  },
  designation: {
    type: String,
    sparse: true
  },

  // Admin specific fields
  adminId: {
    type: String,
    sparse: true
  },

  // Common fields
  phoneNumber: {
    type: String,
    sparse: true
  },

  // Registration status
  isRegistered: {
    type: Boolean,
    default: false
  },
  
  registeredAt: {
    type: Date,
    sparse: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PreRegistration', preRegistrationSchema);