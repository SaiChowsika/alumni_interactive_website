const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Academic Project', 'Research Proposal', 'Internship Application', 'Placement Application', 'Event Proposal', 'Other']
  },
  additionalInfo: {
    type: String,
    default: ''
  },
  studentId: {
    type: String,
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  yearOfStudy: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'in-review'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
submissionSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;