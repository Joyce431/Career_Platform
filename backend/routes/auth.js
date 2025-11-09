const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { FirebaseService, collections, generateId } = require('../services/FirebaseService');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key_here';

// Utility functions
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, phone, industry, dateOfBirth } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!['student', 'institution', 'company'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Check if user already exists
    const existingUsers = await FirebaseService.query(collections.USERS, 'email', '==', email);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = {
      id: generateId(),
      name,
      email,
      password: hashedPassword,
      role,
      phone: phone || '',
      industry: industry || '',
      dateOfBirth: dateOfBirth || '',
      emailVerified: false,
      verificationCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      createdAt: new Date().toISOString()
    };

    await FirebaseService.create(collections.USERS, user);

    // Create profile based on role
    if (role === 'student') {
      const student = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        address: '',
        education: '',
        nationality: '',
        emergencyContact: '',
        applications: [],
        documents: {
          transcripts: [],
          certificates: [],
          identification: [],
          other: []
        },
        appliedJobs: [],
        createdAt: new Date().toISOString()
      };
      await FirebaseService.create(collections.STUDENTS, student);
    } else if (role === 'institution') {
      const institution = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: '',
        location: '',
        website: '',
        type: 'University',
        description: '',
        faculties: [],
        isPublished: false,
        createdAt: new Date().toISOString()
      };
      await FirebaseService.create(collections.INSTITUTIONS, institution);
    } else if (role === 'company') {
      const company = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        industry: user.industry,
        address: '',
        size: '',
        description: '',
        website: '',
        status: 'pending',
        registeredDate: new Date().toLocaleDateString(),
        jobs: [],
        createdAt: new Date().toISOString()
      };
      await FirebaseService.create(collections.COMPANIES, company);
    }

    res.status(201).json({ 
      message: 'Registration successful', 
      userId: user.id,
      verificationCode: user.verificationCode, // In production, send via email
      role: user.role
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Verify email
router.post('/verify-email', async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    const users = await FirebaseService.query(collections.USERS, 'email', '==', email);
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];
    if (user.verificationCode === verificationCode) {
      await FirebaseService.update(collections.USERS, user.id, { emailVerified: true });
      res.json({ message: 'Email verified successfully' });
    } else {
      res.status(400).json({ error: 'Invalid verification code' });
    }
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ error: 'Email verification failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const users = await FirebaseService.query(collections.USERS, 'email', '==', email);
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];
    if (!user.emailVerified) {
      return res.status(400).json({ error: 'Please verify your email first' });
    }

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await FirebaseService.getById(collections.USERS, req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let profile = null;
    if (req.user.role === 'student') {
      profile = await FirebaseService.getById(collections.STUDENTS, req.user.id);
    } else if (req.user.role === 'institution') {
      profile = await FirebaseService.getById(collections.INSTITUTIONS, req.user.id);
    } else if (req.user.role === 'company') {
      profile = await FirebaseService.getById(collections.COMPANIES, req.user.id);
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      profile
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

module.exports = router;