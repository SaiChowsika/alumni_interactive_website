const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');

console.log('📋 Submissions routes file loaded');

// Test route
router.get('/test', async (req, res) => {
  try {
    console.log('✅ Test route hit');
    const count = await Submission.countDocuments();
    res.json({
      status: 'success',
      message: 'Submissions route is working!',
      totalSubmissions: count,
      database: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Test route error:', error);
    res.json({
      status: 'error',
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Get all submissions
router.get('/all', async (req, res) => {
  try {
    console.log('📋 Getting all submissions...');
    const submissions = await Submission.find().sort({ submittedAt: -1 });
    console.log(`📋 Found ${submissions.length} submissions`);
    
    res.json({
      status: 'success',
      data: {
        submissions,
        count: submissions.length
      }
    });
  } catch (error) {
    console.error('❌ Error getting submissions:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Create submission
router.post('/create', async (req, res) => {
  try {
    console.log('📋 Creating submission with data:', req.body);
    
    const { title, description, category, additionalInfo } = req.body;
    
    // Validate required fields
    if (!title || !description || !category) {
      console.log('❌ Missing required fields');
      return res.status(400).json({
        status: 'error',
        message: 'Title, description, and category are required'
      });
    }
    
    // Create submission data
    const submissionData = {
      title: title.trim(),
      description: description.trim(),
      category,
      additionalInfo: additionalInfo ? additionalInfo.trim() : '',
      studentId: 'student-' + Date.now(),
      studentName: 'Test Student',
      department: 'Computer Science',
      yearOfStudy: 'E-4',
      status: 'pending'
    };
    
    console.log('📋 Submission data to save:', submissionData);
    
    // Create and save submission
    const submission = new Submission(submissionData);
    const savedSubmission = await submission.save();
    
    console.log('✅ Submission saved successfully:', savedSubmission._id);
    
    res.status(201).json({
      status: 'success',
      message: 'Submission created successfully',
      data: {
        submission: savedSubmission
      }
    });
    
  } catch (error) {
    console.error('❌ Error creating submission:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create submission: ' + error.message
    });
  }
});

// Get submission by ID
router.get('/:id', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({
        status: 'error',
        message: 'Submission not found'
      });
    }
    
    res.json({
      status: 'success',
      data: { submission }
    });
  } catch (error) {
    console.error('❌ Error getting submission:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

console.log('📋 Submissions routes configured');
module.exports = router;