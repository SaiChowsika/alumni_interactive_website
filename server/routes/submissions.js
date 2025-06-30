const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Submission = require('../models/Submission');
const User = require('../models/User');

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User not found'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token'
    });
  }
};

// GET /api/submissions - Get all submissions for current user
router.get('/', authenticateUser, async (req, res) => {
  try {
    const submissions = await Submission.find({ 
      userId: req.user._id,
      isActive: true 
    }).sort({ createdAt: -1 });

    console.log(`✅ Found ${submissions.length} submissions for user ${req.user.email}`);

    res.json({
      status: 'success',
      data: {
        submissions
      }
    });
  } catch (error) {
    console.error('❌ Error fetching submissions:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch submissions'
    });
  }
});

// POST /api/submissions - Create new submission
router.post('/', authenticateUser, async (req, res) => {
  try {
    console.log('📝 Creating new submission for user:', req.user.email);
    console.log('Submission data:', req.body);

    const submissionData = {
      userId: req.user._id,
      ...req.body
    };

    const submission = new Submission(submissionData);
    await submission.save();

    console.log('✅ Submission created successfully:', submission._id);

    res.status(201).json({
      status: 'success',
      message: 'Submission created successfully',
      data: {
        submission
      }
    });
  } catch (error) {
    console.error('❌ Error creating submission:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to create submission'
    });
  }
});

// PUT /api/submissions/:id - Update submission
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const submission = await Submission.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!submission) {
      return res.status(404).json({
        status: 'error',
        message: 'Submission not found'
      });
    }

    Object.assign(submission, req.body);
    await submission.save();

    console.log('✅ Submission updated successfully:', submission._id);

    res.json({
      status: 'success',
      message: 'Submission updated successfully',
      data: {
        submission
      }
    });
  } catch (error) {
    console.error('❌ Error updating submission:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update submission'
    });
  }
});

// DELETE /api/submissions/:id - Delete submission
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const submission = await Submission.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!submission) {
      return res.status(404).json({
        status: 'error',
        message: 'Submission not found'
      });
    }

    submission.isActive = false;
    await submission.save();

    console.log('✅ Submission deleted successfully:', submission._id);

    res.json({
      status: 'success',
      message: 'Submission deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting submission:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete submission'
    });
  }
});

module.exports = router;