const express = require('express');
const router = express.Router();

console.log('📋 Submissions routes file loaded');

// Simple test route (no auth needed)
router.get('/test', (req, res) => {
  console.log('✅ Test route hit');
  res.json({
    status: 'success',
    message: 'Submissions route is working!',
    timestamp: new Date().toISOString()
  });
});

// Test route with database
router.get('/db-test', async (req, res) => {
  try {
    const Submission = require('../models/Submission');
    const count = await Submission.countDocuments();
    res.json({
      status: 'success',
      message: 'Database connection working',
      totalSubmissions: count
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Simple get all (no auth for testing)
router.get('/all', async (req, res) => {
  try {
    const Submission = require('../models/Submission');
    const submissions = await Submission.find().sort({ submittedAt: -1 });
    res.json({
      status: 'success',
      data: {
        submissions,
        count: submissions.length
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Simple create (no auth for testing)
router.post('/create', async (req, res) => {
  try {
    console.log('Creating submission:', req.body);
    
    const Submission = require('../models/Submission');
    const { title, description, category } = req.body;
    
    if (!title || !description || !category) {
      return res.status(400).json({
        status: 'error',
        message: 'Title, description, and category required'
      });
    }
    
    const submissionData = {
      title,
      description,
      category,
      additionalInfo: req.body.additionalInfo || '',
      studentId: 'test-student-id',
      studentName: 'Test Student',
      department: 'Test Department',
      yearOfStudy: 'E-4',
      status: 'pending'
    };
    
    const submission = new Submission(submissionData);
    const saved = await submission.save();
    
    console.log('Submission saved:', saved._id);
    
    res.status(201).json({
      status: 'success',
      message: 'Submission created',
      data: { submission: saved }
    });
    
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

console.log('📋 Submissions routes configured');
module.exports = router;