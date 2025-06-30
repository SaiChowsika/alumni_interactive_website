const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const PreRegistration = require('../models/PreRegistration');

// Helper function to generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// SIGNUP ROUTE - Complete Registration
router.post('/signup', async (req, res) => {
  try {
    console.log('📝 Signup attempt:', req.body.email, req.body.role);
    
    const { email, password, role, ...otherFields } = req.body;

    // Validate required fields
    if (!email || !password || !role) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email, password, and role'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User already registered. Please use sign in.'
      });
    }

    // Find pre-registration record
    const preRegRecord = await PreRegistration.findOne({ 
      email: email.toLowerCase(),
      role: role,
      isRegistered: false
    });

    if (!preRegRecord) {
      return res.status(400).json({
        status: 'error',
        message: 'No pre-registration found for this email and role. Please contact admin.'
      });
    }

    // Validate role-specific fields match pre-registration
    let validationError = null;

    if (role === 'student') {
      if (req.body.studentId !== preRegRecord.studentId) {
        validationError = 'Student ID does not match our records';
      } else if (req.body.department !== preRegRecord.department) {
        validationError = 'Department does not match our records';
      } else if (req.body.yearOfStudy !== preRegRecord.yearOfStudy) {
        validationError = 'Year of study does not match our records';
      }
    } else if (role === 'faculty') {
      if (req.body.facultyId !== preRegRecord.facultyId) {
        validationError = 'Faculty ID does not match our records';
      } else if (req.body.department !== preRegRecord.department) {
        validationError = 'Department does not match our records';
      }
    } else if (role === 'admin') {
      if (req.body.adminId !== preRegRecord.adminId) {
        validationError = 'Admin ID does not match our records';
      }
    }

    if (validationError) {
      return res.status(400).json({
        status: 'error',
        message: validationError
      });
    }

    // Create new user with pre-registration data
    const userData = {
      fullName: preRegRecord.fullName,
      email: preRegRecord.email,
      password: password,
      role: preRegRecord.role,
      phoneNumber: preRegRecord.phoneNumber,
      preRegistrationId: preRegRecord._id
    };

    // Add role-specific fields
    if (role === 'student') {
      userData.studentId = preRegRecord.studentId;
      userData.department = preRegRecord.department;
      userData.yearOfStudy = preRegRecord.yearOfStudy;
    } else if (role === 'faculty') {
      userData.facultyId = preRegRecord.facultyId;
      userData.department = preRegRecord.department;
      userData.designation = preRegRecord.designation;
    } else if (role === 'admin') {
      userData.adminId = preRegRecord.adminId;
    }

    const user = new User(userData);
    await user.save();

    // Mark pre-registration as completed
    preRegRecord.isRegistered = true;
    preRegRecord.registeredAt = new Date();
    await preRegRecord.save();

    // Generate JWT token
    const token = generateToken(user._id, user.role);

    console.log('✅ User registered successfully:', user.email);

    res.status(201).json({
      status: 'success',
      message: 'Registration completed successfully',
      token,
      data: {
        user: user.toJSON()
      }
    });

  } catch (error) {
    console.error('❌ Signup error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already registered'
      });
    }

    res.status(500).json({
      status: 'error',
      message: error.message || 'Error completing registration'
    });
  }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
  try {
    console.log('🔑 Login attempt:', req.body.email);
    
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide both email and password'
      });
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email, isActive: true }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = generateToken(user._id, user.role);

    console.log('✅ Login successful:', user.email, user.role);

    res.json({
      status: 'success',
      message: 'Login successful',
      token,
      data: {
        user: user.toJSON()
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error during login'
    });
  }
});

// Check if email exists in pre-registration
router.post('/check-eligibility', async (req, res) => {
  try {
    const { email, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and role are required'
      });
    }

    const preRegRecord = await PreRegistration.findOne({
      email: email.toLowerCase(),
      role: role,
      isRegistered: false
    });

    if (!preRegRecord) {
      return res.status(404).json({
        status: 'error',
        message: 'No pre-registration found for this email and role'
      });
    }

    res.json({
      status: 'success',
      message: 'Eligible for registration',
      data: {
        fullName: preRegRecord.fullName,
        email: preRegRecord.email,
        role: preRegRecord.role,
        // Return role-specific fields for validation
        ...(role === 'student' && {
          studentId: preRegRecord.studentId,
          department: preRegRecord.department,
          yearOfStudy: preRegRecord.yearOfStudy
        }),
        ...(role === 'faculty' && {
          facultyId: preRegRecord.facultyId,
          department: preRegRecord.department,
          designation: preRegRecord.designation
        }),
        ...(role === 'admin' && {
          adminId: preRegRecord.adminId
        })
      }
    });

  } catch (error) {
    console.error('❌ Eligibility check error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error checking eligibility'
    });
  }
});

module.exports = router;  