/**
 * Placement Routes
 *
 * Handles all placement-related operations including submissions,
 * updates, and retrievals.
 *
 * Routes:
 * - POST /api/placements/submit: Submit new placement application
 * - GET /api/placements/student-submissions: Get current user's submissions
 * - GET /api/placements: Get all placements (admin only)
 * - PUT /api/placements/:id: Update placement status (admin only)
 */

const express = require('express');
const router = express.Router();
// const { protect, authorize } = require('../middleware/auth');
// const Placement = require('../models/Placement');

// Mock data storage for development (replace with database later)
let submissions = [
  {
    id: 1,
    studentName: "John Doe",
    studentId: "20191CSE001",
    email: "john@example.com",
    phone: "9876543210",
    department: "CSE",
    yearOfGraduation: 2023,
    cgpa: 8.5,
    skills: "JavaScript, React, Node.js",
    resumeLink: "https://drive.google.com/file/example",
    linkedinProfile: "https://linkedin.com/in/johndoe",
    githubProfile: "https://github.com/johndoe",
    projects: "E-commerce website, Chat application",
    internships: "Software Developer Intern at TCS",
    achievements: "Best Project Award, Dean's List",
    submittedAt: new Date().toISOString(),
    status: "pending"
  }
];

// Submit new placement application
router.post('/submit', async (req, res) => {
  try {
    const {
      studentName,
      studentId,
      email,
      phone,
      department,
      yearOfGraduation,
      cgpa,
      skills,
      resumeLink,
      linkedinProfile,
      githubProfile,
      projects,
      internships,
      achievements
    } = req.body;

    // Create new submission
    const newSubmission = {
      id: Date.now(),
      studentName,
      studentId,
      email,
      phone,
      department,
      yearOfGraduation: parseInt(yearOfGraduation),
      cgpa: parseFloat(cgpa),
      skills,
      resumeLink,
      linkedinProfile,
      githubProfile,
      projects,
      internships,
      achievements,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };

    submissions.push(newSubmission);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: { submission: newSubmission }
    });

  } catch (error) {
    console.error('Error submitting placement application:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error submitting placement application'
    });
  }
});

// Get current user's submissions
router.get('/student-submissions', async (req, res) => {
  try {
    // For now, return all submissions
    // In real implementation, filter by user ID from auth token
    const userSubmissions = submissions.filter(sub => sub.studentId);

    res.json({
      success: true,
      submissions: userSubmissions
    });

  } catch (error) {
    console.error('Error fetching student submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching submissions'
    });
  }
});

// Get all placements (admin only)
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      data: { placements: submissions }
    });

  } catch (error) {
    console.error('Error fetching all placements:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching placements'
    });
  }
});

// Update placement status (admin only)
router.put('/:id', async (req, res) => {
  try {
    const submissionId = parseInt(req.params.id);
    const submissionIndex = submissions.findIndex(sub => sub.id === submissionId);

    if (submissionIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    // Update submission
    submissions[submissionIndex] = {
      ...submissions[submissionIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      data: { submission: submissions[submissionIndex] }
    });

  } catch (error) {
    console.error('Error updating placement:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating placement'
    });
  }
});

// Delete submission
router.delete('/:id', async (req, res) => {
  try {
    const submissionId = parseInt(req.params.id);
    const submissionIndex = submissions.findIndex(sub => sub.id === submissionId);

    if (submissionIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    submissions.splice(submissionIndex, 1);

    res.json({
      success: true,
      message: 'Submission deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting submission'
    });
  }
});

module.exports = router;