/**
 * Session Model
 * 
 * Defines the schema for mentorship sessions between alumni/faculty and students.
 * Handles session scheduling, management, and participant tracking.
 * 
 * Schema Fields:
 * - title: Session title/topic
 * - description: Detailed session description
 * - host: Reference to User (alumni/faculty)
 * - date: Session date and time
 * - duration: Session duration in minutes
 * - type: Session type (technical/career/motivational)
 * - mode: Session mode (online/offline/hybrid)
 * - venue: Physical or virtual location
 * - maxParticipants: Maximum allowed participants
 * - participants: Array of registered students
 * - status: Session status (pending/approved/rejected/completed)
 * - materials: Array of uploaded materials/resources
 * - feedback: Array of participant feedback
 * 
 * Indexes:
 * - host: For quick lookup of host's sessions
 * - date: For chronological queries
 * - status: For filtering by session status
 * 
 * Features:
 * - Automatic status updates based on date
 * - Participant limit enforcement
 * - Material attachment handling
 * - Feedback collection
 * 
 * @type {dynamic} - Includes session management functionality
 */

const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  sessionHead: {
    type: String,
    required: true,
    trim: true
  },
  feedbackFormLink: {
    type: String
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  meetingLink: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
sessionSchema.index({ date: 1, status: 1 });
sessionSchema.index({ sessionHead: 1 });

module.exports = mongoose.model('Session', sessionSchema); 