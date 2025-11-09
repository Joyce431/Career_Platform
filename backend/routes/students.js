const express = require('express');
const { FirebaseService, collections, generateId } = require('../services/firebaseService');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Get student profile
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    // Students can only access their own profile, admins can access any
    if (req.user.role !== 'admin' && req.params.id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const student = await FirebaseService.getById(collections.STUDENTS, req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student profile' });
  }
});

// Update student profile
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    // Students can only update their own profile
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const student = await FirebaseService.getById(collections.STUDENTS, req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const updatedStudent = await FirebaseService.update(collections.STUDENTS, req.params.id, req.body);
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student profile' });
  }
});

// Get student applications
router.get('/:id/applications', authenticateToken, async (req, res) => {
  try {
    // Students can only access their own applications
    if (req.params.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const student = await FirebaseService.getById(collections.STUDENTS, req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const applications = await FirebaseService.query(collections.APPLICATIONS, 'studentId', '==', req.params.id);
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Document Management
router.post('/:id/documents', authenticateToken, async (req, res) => {
  try {
    // Students can only upload to their own profile
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const student = await FirebaseService.getById(collections.STUDENTS, req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const { type, name, size } = req.body;

    if (!['transcripts', 'certificates', 'identification', 'other'].includes(type)) {
      return res.status(400).json({ error: 'Invalid document type' });
    }

    const document = {
      id: generateId(),
      name,
      type,
      size,
      uploadDate: new Date().toISOString()
    };

    if (!student.documents) {
      student.documents = { transcripts: [], certificates: [], identification: [], other: [] };
    }
    student.documents[type].push(document);
    await FirebaseService.update(collections.STUDENTS, req.params.id, student);
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

router.delete('/:id/documents/:docId', authenticateToken, async (req, res) => {
  try {
    // Students can only delete their own documents
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const student = await FirebaseService.getById(collections.STUDENTS, req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    let deleted = false;
    Object.keys(student.documents).forEach(type => {
      student.documents[type] = student.documents[type].filter(doc => {
        if (doc.id === req.params.docId) {
          deleted = true;
          return false;
        }
        return true;
      });
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Document not found' });
    }

    await FirebaseService.update(collections.STUDENTS, req.params.id, student);
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

// Get applied jobs
router.get('/:id/applied-jobs', authenticateToken, async (req, res) => {
  try {
    // Students can only access their own job applications
    if (req.params.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const student = await FirebaseService.getById(collections.STUDENTS, req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const applications = await FirebaseService.query(collections.APPLICATIONS, 'studentId', '==', req.params.id);
    const appliedJobs = [];

    for (const app of applications) {
      const job = await FirebaseService.getById(collections.JOBS, app.jobId);
      if (job) {
        const company = await FirebaseService.getById(collections.COMPANIES, job.companyId);
        appliedJobs.push({
          ...job,
          company: company ? company.name : 'Unknown',
          companyId: job.companyId,
          applicationStatus: app.status,
          appliedDate: app.createdAt
        });
      }
    }

    res.json(appliedJobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applied jobs' });
  }
});

module.exports = router;
