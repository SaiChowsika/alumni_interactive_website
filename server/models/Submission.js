const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
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
    required: true,
    enum: ['E-3', 'E-4'] // Only E-3 and E-4 can submit
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for faster queries
submissionSchema.index({ studentId: 1, submittedAt: -1 });
submissionSchema.index({ status: 1 });

module.exports = mongoose.model('Submission', submissionSchema);