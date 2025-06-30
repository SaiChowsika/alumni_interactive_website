const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const { authMiddleware } = require('../middleware/auth');

// Middleware to check if student is E-3 or E-4
const checkEligibility = (req, res, next) => {
  const { yearOfStudy } = req.user;
  if (yearOfStudy !== 'E-3' && yearOfStudy !== 'E-4') {
    return res.status(403).json({
      status: 'error',
      message: 'Only E-3 and E-4 students can submit forms'
    });
  }
  next();
};

// Get all submissions for the current student
router.get('/', authMiddleware, async (req, res) => {
  try {
    const studentId = req.user.studentId || req.user.id;
    
    const submissions = await Submission.find({ studentId })
      .sort({ submittedAt: -1 }) // Most recent first
      .lean();

    res.json({
      status: 'success',
      data: {
        submissions,
        count: submissions.length
      }
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch submissions'
    });
  }
});

// Create new submission
router.post('/', authMiddleware, checkEligibility, async (req, res) => {
  try {
    const { title, description, category, additionalInfo } = req.body;
    
    // Validate required fields
    if (!title || !description || !category) {
      return res.status(400).json({
        status: 'error',
        message: 'Title, description, and category are required'
      });
    }

    // Create submission with user data
    const submissionData = {
      title: title.trim(),
      description: description.trim(),
      category,
      additionalInfo: additionalInfo?.trim() || '',
      studentId: req.user.studentId || req.user.id,
      studentName: req.user.fullName,
      department: req.user.department,
      yearOfStudy: req.user.yearOfStudy
    };

    const submission = new Submission(submissionData);
    await submission.save();

    res.status(201).json({
      status: 'success',
      message: 'Submission created successfully',
      data: {
        submission
      }
    });
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create submission'
    });
  }
});

// Get specific submission by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.user.studentId || req.user.id;

    const submission = await Submission.findOne({ 
      _id: id, 
      studentId 
    });

    if (!submission) {
      return res.status(404).json({
        status: 'error',
        message: 'Submission not found'
      });
    }

    res.json({
      status: 'success',
      data: {
        submission
      }
    });
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch submission'
    });
  }
});

module.exports = router;