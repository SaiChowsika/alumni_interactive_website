/**
 * Placement Routes
 * 
 * Handles all placement-related operations including submissions,
 * updates, and retrievals.
 * 
 * Routes:
 * - POST /api/placements: Submit new placement
 * - GET /api/placements/user/:userId: Get user's placements
 * - GET /api/placements: Get all placements (admin only)
 * - PUT /api/placements/:id: Update placement status (admin only)
 */

const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Placement = require('../models/Placement');

// Submit new placement
router.post('/', protect, async (req, res) => {
  try {
    const {
      studentName,
      year,
      company,
      type,
      position,
      package,
      location,
      joiningDate,
      additionalInfo
    } = req.body;

    const placement = await Placement.create({
      studentName,
      year,
      company,
      type,
      position,
      package,
      location,
      joiningDate,
      additionalInfo,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      data: { placement }
    });
  } catch (error) {
    console.error('Error submitting placement:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error submitting placement'
    });
  }
});

// Get user's placements
router.get('/user/:userId', protect, async (req, res) => {
  try {
    const placements = await Placement.find({ studentName: req.params.userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { placements }
    });
  } catch (error) {
    console.error('Error fetching placements:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching placements'
    });
  }
});

// Get all placements (admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const placements = await Placement.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { placements }
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
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const placement = await Placement.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: 'Placement not found'
      });
    }

    res.json({
      success: true,
      data: { placement }
    });
  } catch (error) {
    console.error('Error updating placement:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating placement'
    });
  }
});

module.exports = router; 