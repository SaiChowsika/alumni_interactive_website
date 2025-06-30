const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  // User reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Submission type
  type: {
    type: String,
    enum: ['placement', 'internship'],
    required: true
  },

  // Company/Organization details
  companyName: {
    type: String,
    required: true,
    trim: true
  },

  position: {
    type: String,
    required: true,
    trim: true
  },

  // Application details
  applicationDate: {
    type: Date,
    required: true
  },

  status: {
    type: String,
    enum: ['applied', 'interview', 'selected', 'rejected', 'pending'],
    default: 'applied'
  },

  // Compensation details
  salary: {
    type: String,
    sparse: true
  },

  location: {
    type: String,
    required: true,
    trim: true
  },

  // Additional details
  description: {
    type: String,
    trim: true
  },

  skills: [{
    type: String,
    trim: true
  }],

  // Application documents
  resume: {
    type: String,
    sparse: true
  },

  coverLetter: {
    type: String,
    sparse: true
  },

  // Timeline
  startDate: {
    type: Date,
    sparse: true
  },

  endDate: {
    type: Date,
    sparse: true
  },

  // Metadata
  isActive: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
submissionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Submission', submissionSchema); 