const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const { authMiddleware } = require('../middleware/auth');

// Get submissions - FIXED LOGIC
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('Getting submissions for user:', req.user.email);
    
    // Use the user's MongoDB _id as studentId
    const studentId = req.user._id.toString();
    
    const submissions = await Submission.find({ studentId }).sort({ submittedAt: -1 });
    
    console.log(`Found ${submissions.length} submissions for student: ${studentId}`);
    
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

// Create submission - FIXED LOGIC
router.post('/', authMiddleware, async (req, res) => {
  try {
    console.log('Creating submission for user:', req.user.email);
    
    const { title, description, category, additionalInfo } = req.body;
    
    if (!title || !description || !category) {
      return res.status(400).json({
        status: 'error',
        message: 'Title, description, and category are required'
      });
    }
    
    const submissionData = {
      title: title.trim(),
      description: description.trim(),
      category,
      additionalInfo: additionalInfo?.trim() || '',
      // FIXED: Use the user's _id consistently
      studentId: req.user._id.toString(),
      studentName: req.user.fullName || req.user.name || req.user.email,
      department: req.user.department || 'Not specified',
      yearOfStudy: req.user.yearOfStudy || 'E-4',
      status: 'pending'
    };
    
    console.log('Saving submission:', submissionData);
    
    const submission = new Submission(submissionData);
    const savedSubmission = await submission.save();
    
    console.log('Submission saved successfully with ID:', savedSubmission._id);
    
    res.status(201).json({
      status: 'success',
      message: 'Submission created successfully',
      data: {
        submission: savedSubmission
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

module.exports = router;