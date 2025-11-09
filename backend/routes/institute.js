// backend/routes/institutions.js
const express = require('express');
const { FirebaseService, collections, generateId } = require('../services/firebaseService');
const { authenticateFirebaseToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Get all institutions (public)
router.get('/', async (req, res) => {
  try {
    const institutions = await FirebaseService.getAll(collections.INSTITUTIONS);
    
    const publicInstitutions = institutions.map(inst => ({
      id: inst.id,
      name: inst.name,
      location: inst.location,
      type: inst.type,
      description: inst.description,
      isPublished: inst.isPublished,
      faculties: inst.faculties || []
    }));
    
    res.json(publicInstitutions);
  } catch (error) {
    console.error('Get institutions error:', error);
    res.status(500).json({ error: 'Failed to get institutions' });
  }
});

// Get specific institution
router.get('/:id', async (req, res) => {
  try {
    const institution = await FirebaseService.getById(collections.INSTITUTIONS, req.params.id);
    if (!institution) {
      return res.status(404).json({ error: 'Institution not found' });
    }
    res.json(institution);
  } catch (error) {
    console.error('Get institution error:', error);
    res.status(500).json({ error: 'Failed to get institution' });
  }
});

// Create institution (admin only)
router.post('/', authenticateFirebaseToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const institution = await FirebaseService.create(collections.INSTITUTIONS, {
      ...req.body,
      userId: req.user.uid,
      faculties: [],
      isPublished: false
    });
    res.status(201).json(institution);
  } catch (error) {
    console.error('Create institution error:', error);
    res.status(500).json({ error: 'Failed to create institution' });
  }
});

// Update institution
router.put('/:id', authenticateFirebaseToken, async (req, res) => {
  try {
    const institution = await FirebaseService.getById(collections.INSTITUTIONS, req.params.id);
    if (!institution) {
      return res.status(404).json({ error: 'Institution not found' });
    }

    // Check if user owns this institution or is admin
    if (req.user.data.role !== 'admin' && institution.userId !== req.user.uid) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updatedInstitution = await FirebaseService.update(collections.INSTITUTIONS, req.params.id, req.body);
    res.json(updatedInstitution);
  } catch (error) {
    console.error('Update institution error:', error);
    res.status(500).json({ error: 'Failed to update institution' });
  }
});

// Faculty Management
router.post('/:id/faculties', authenticateFirebaseToken, async (req, res) => {
  try {
    const institution = await FirebaseService.getById(collections.INSTITUTIONS, req.params.id);
    if (!institution) {
      return res.status(404).json({ error: 'Institution not found' });
    }

    // Check if user owns this institution
    if (institution.userId !== req.user.uid && req.user.data.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const faculty = {
      id: generateId(),
      ...req.body,
      courses: []
    };

    const updatedFaculties = [...(institution.faculties || []), faculty];
    const updatedInstitution = await FirebaseService.update(collections.INSTITUTIONS, req.params.id, {
      faculties: updatedFaculties
    });

    res.status(201).json(faculty);
  } catch (error) {
    console.error('Add faculty error:', error);
    res.status(500).json({ error: 'Failed to add faculty' });
  }
});

// Course Management
router.post('/:instId/faculties/:facultyId/courses', authenticateFirebaseToken, async (req, res) => {
  try {
    const institution = await FirebaseService.getById(collections.INSTITUTIONS, req.params.instId);
    if (!institution) {
      return res.status(404).json({ error: 'Institution not found' });
    }

    // Check if user owns this institution
    if (institution.userId !== req.user.uid && req.user.data.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const faculty = (institution.faculties || []).find(fac => fac.id === req.params.facultyId);
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }

    const course = {
      id: generateId(),
      ...req.body
    };

    const updatedFaculties = (institution.faculties || []).map(fac => 
      fac.id === req.params.facultyId 
        ? { ...fac, courses: [...(fac.courses || []), course] }
        : fac
    );

    await FirebaseService.update(collections.INSTITUTIONS, req.params.instId, {
      faculties: updatedFaculties
    });

    res.status(201).json(course);
  } catch (error) {
    console.error('Add course error:', error);
    res.status(500).json({ error: 'Failed to add course' });
  }
});

// Admissions Management
router.post('/:id/publish-admissions', authenticateFirebaseToken, async (req, res) => {
  try {
    const institution = await FirebaseService.getById(collections.INSTITUTIONS, req.params.id);
    if (!institution) {
      return res.status(404).json({ error: 'Institution not found' });
    }

    // Check if user owns this institution
    if (institution.userId !== req.user.uid && req.user.data.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Update institution
    await FirebaseService.update(collections.INSTITUTIONS, req.params.id, {
      isPublished: true
    });

    // Create admission record
    const admission = await FirebaseService.create(collections.ADMISSIONS, {
      institutionId: institution.id,
      institutionName: institution.name,
      publishedAt: new Date().toISOString(),
      status: 'active'
    });

    res.json({ message: 'Admissions published successfully', admission });
  } catch (error) {
    console.error('Publish admissions error:', error);
    res.status(500).json({ error: 'Failed to publish admissions' });
  }
});

// Get institution applications
router.get('/:id/applications', authenticateFirebaseToken, async (req, res) => {
  try {
    const institution = await FirebaseService.getById(collections.INSTITUTIONS, req.params.id);
    if (!institution) {
      return res.status(404).json({ error: 'Institution not found' });
    }

    // Check if user owns this institution
    if (institution.userId !== req.user.uid && req.user.data.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const applications = await FirebaseService.query(collections.APPLICATIONS, 'institutionId', '==', req.params.id);
    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ error: 'Failed to get applications' });
  }
});

module.exports = router;