const express = require('express');
const { FirebaseService, collections } = require('../services/firebaseService');
const { authenticateFirebaseToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Get all companies (public)
router.get('/', async (req, res) => {
  try {
    const companies = await FirebaseService.getAll(collections.COMPANIES);
    const publicCompanies = companies.map(comp => ({
      id: comp.id,
      name: comp.name,
      industry: comp.industry,
      description: comp.description,
      status: comp.status
    }));
    res.json(publicCompanies);
  } catch (error) {
    console.error('Get companies error:', error);
    res.status(500).json({ error: 'Failed to get companies' });
  }
});

// Update company status (admin only)
router.patch('/:id/status', authenticateFirebaseToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    const company = await FirebaseService.update(collections.COMPANIES, req.params.id, { status });
    res.json(company);
  } catch (error) {
    console.error('Update company status error:', error);
    res.status(500).json({ error: 'Failed to update company status' });
  }
});

module.exports = router;