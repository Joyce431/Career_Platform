const express = require('express');
const firebaseService = require('../services/firebaseService');
const { FirebaseService, collections } = firebaseService;
const { authenticateFirebaseToken, authorizeRoles, authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All admin routes require admin role
router.use(authenticateToken, authorizeRoles('admin'));

// Get system overview
router.get('/overview', async (req, res) => {
  try {
    const [users, institutions, companies, applications, jobs] = await Promise.all([
      FirebaseService.getAll(collections.USERS),
      FirebaseService.getAll(collections.INSTITUTIONS),
      FirebaseService.getAll(collections.COMPANIES),
      FirebaseService.getAll(collections.APPLICATIONS),
      FirebaseService.getAll(collections.JOBS)
    ]);

    const overview = {
      totalUsers: users.length,
      totalInstitutions: institutions.length,
      totalCompanies: companies.length,
      totalApplications: applications.length,
      totalJobs: jobs.length,
      pendingApplications: applications.filter(app => app.status === 'pending').length,
      approvedCompanies: companies.filter(comp => comp.status === 'approved').length
    };

    res.json(overview);
  } catch (error) {
    console.error('Get overview error:', error);
    res.status(500).json({ error: 'Failed to get system overview' });
  }
});

module.exports = router;