const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    required: true,
    enum: ['student', 'alumni', 'faculty', 'admin']
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Student specific fields
  studentId: {
    type: String,
    sparse: true
  },
  department: {
    type: String,
    enum: ['CSE', 'ECE', 'EEE', 'CIVIL', 'MECH', 'CHEM', 'MME']
  },
  yearOfStudy: {
    type: String,
    enum: ['E-1', 'E-2', 'E-3', 'E-4']
  },
  // Faculty specific fields
  facultyId: {
    type: String,
    sparse: true
  },
  designation: {
    type: String
  },
  // Admin specific fields
  adminId: {
    type: String,
    sparse: true
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Transform toJSON to remove sensitive data
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);