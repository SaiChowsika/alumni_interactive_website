const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
    required: [true, 'Role is required']
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
  
  profilePhoto: {
    type: String,
    default: '/src/assets/profile1.jpg'
  },

  // Pre-registration reference
  preRegistrationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PreRegistration',
    sparse: true
  },

  isActive: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
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

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);