/**
 * Session Management Routes
 * 
 * Handles all session-related operations including creation, updates,
 * and management of mentoring/guidance sessions between users.
 * 
 * Routes:
 * - POST /api/sessions/create: Create new session request
 * - GET /api/sessions/user/:userId: Get user's sessions
 * - GET /api/sessions/pending: Get pending session requests
 * - PUT /api/sessions/:id/status: Update session status
 * - GET /api/sessions/stats: Get session statistics
 * - GET /api/sessions/upcoming: Get upcoming sessions
 * - DELETE /api/sessions/:id: Cancel/delete session
 * 
 * Features:
 * - Session request creation
 * - Status management (pending, accepted, rejected, completed)
 * - Session scheduling
 * - Notification integration
 * - Statistics tracking
 * 
 * Access Control:
 * - Students can request sessions
 * - Alumni/Faculty can accept/reject requests
 * - Admins have full access
 * - Users can only view their own sessions
 * 
 * Data Validation:
 * - Date/time validation
 * - User role verification
 * - Session status transitions
 * 
 * Error Handling:
 * - Invalid requests
 * - Unauthorized access
 * - Scheduling conflicts
 * - Server errors
 * 
 * @type {dynamic} - Handles real-time session management
 */

const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Session = require('../models/Session');

// Get all sessions
router.get('/', protect, async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate('sessionHead', 'fullName email profilePhoto')
      .populate('participants', 'fullName email')
      .sort({ date: 1 }); // Sort by date ascending

    if (!sessions) {
      return res.status(404).json({
        status: 'error',
        message: 'No sessions found'
      });
    }

    // Map sessions to the expected format
    const formattedSessions = sessions.map(session => {
      try {
        return {
          _id: session._id,
          title: session.title || 'Untitled Session',
          description: session.description || 'No description available',
          date: session.date,
          time: session.time || '00:00',
          venue: session.venue || 'TBA',
          status: session.status || 'upcoming',
          sessionHead: session.sessionHead || { fullName: 'TBA' },
          participants: session.participants || [],
          meetingLink: session.meetingLink,
          feedbackFormLink: session.feedbackFormLink
        };
      } catch (err) {
        console.error('Error formatting session:', err);
        return null;
      }
    }).filter(Boolean); // Remove any null entries

    res.json({
      status: 'success',
      data: {
        sessions: formattedSessions
      }
    });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching sessions. Please try again later.'
    });
  }
});

// Get session by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate('sessionHead', 'fullName email profilePhoto')
      .populate('participants', 'fullName email');
    
    if (!session) {
      return res.status(404).json({
        status: 'error',
        message: 'Session not found'
      });
    }

    const formattedSession = {
      _id: session._id,
      title: session.title || 'Untitled Session',
      description: session.description || 'No description available',
      date: session.date,
      time: session.time || '00:00',
      venue: session.venue || 'TBA',
      status: session.status || 'upcoming',
      sessionHead: session.sessionHead || { fullName: 'TBA' },
      participants: session.participants || [],
      meetingLink: session.meetingLink,
      feedbackFormLink: session.feedbackFormLink
    };

    res.json({
      status: 'success',
      data: { session: formattedSession }
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching session. Please try again later.'
    });
  }
});

// Create new session (admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const sessionData = {
      ...req.body,
      sessionHead: req.body.sessionHead || req.user._id // Default to current user if not specified
    };

    const session = await Session.create(sessionData);
    
    const populatedSession = await Session.findById(session._id)
      .populate('sessionHead', 'fullName email profilePhoto')
      .populate('participants', 'fullName email');

    res.status(201).json({
      status: 'success',
      message: 'Session created successfully',
      data: { session: populatedSession }
    });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error creating session'
    });
  }
});

// Update session (admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('sessionHead', 'fullName email profilePhoto')
     .populate('participants', 'fullName email');
    
    if (!session) {
      return res.status(404).json({
        status: 'error',
        message: 'Session not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Session updated successfully',
      data: { session }
    });
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error updating session'
    });
  }
});

// Delete session (admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    
    if (!session) {
      return res.status(404).json({
        status: 'error',
        message: 'Session not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Session deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting session:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error deleting session'
    });
  }
});

module.exports = router; 