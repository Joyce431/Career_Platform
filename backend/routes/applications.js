const express = require('express');
const { db, generateId } = require('../data/db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Apply for course
router.post('/', authenticateToken, (req, res) => {
  const student = db.students.find(s => s.id === req.user.id);
  if (!student) {
    return res.status(403).json({ error: 'Only students can apply for courses' });
  }

  const { institutionId, courseId, courseName, institutionName } = req.body;

  // Validate input
  if (!institutionId || !courseId || !courseName || !institutionName) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if institution exists and is published
  const institution = db.institutions.find(inst => inst.id === institutionId);
  if (!institution) {
    return res.status(404).json({ error: 'Institution not found' });
  }

  if (!institution.isPublished) {
    return res.status(400).json({ error: 'Institution is not accepting applications' });
  }

  // Check max 2 applications per institution
  const applicationsToInstitution = student.applications.filter(app => app.institutionId === institutionId);
  if (applicationsToInstitution.length >= 2) {
    return res.status(400).json({ error: 'Maximum 2 applications per institution allowed' });
  }

  // Check if already applied to this course
  const existingApplication = student.applications.find(app => 
    app.institutionId === institutionId && app.courseId === courseId
  );
  if (existingApplication) {
    return res.status(400).json({ error: 'Already applied to this course' });
  }

  const application = {
    id: generateId(),
    studentId: student.id,
    studentName: student.name,
    studentEmail: student.email,
    institutionId,
    institutionName,
    courseId,
    courseName,
    status: 'pending',
    appliedDate: new Date().toISOString(),
    applicationId: `APP${generateId().slice(-6)}`
  };

  student.applications.push(application);
  db.applications.push(application);

  res.status(201).json(application);
});

// Update application status (for institutions)
router.patch('/:id/status', authenticateToken, (req, res) => {
  const application = db.applications.find(app => app.id === req.params.id);
  if (!application) {
    return res.status(404).json({ error: 'Application not found' });
  }

  // Check if user owns the institution or is admin
  const institution = db.institutions.find(inst => inst.id === application.institutionId);
  if (!institution) {
    return res.status(404).json({ error: 'Institution not found' });
  }

  if (institution.id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  const { status } = req.body;
  if (!['pending', 'admitted', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  application.status = status;
  application.decisionDate = new Date().toISOString();

  // Also update in student's applications
  const student = db.students.find(s => s.id === application.studentId);
  if (student) {
    const studentApp = student.applications.find(app => app.id === application.id);
    if (studentApp) {
      studentApp.status = status;
      studentApp.decisionDate = application.decisionDate;
    }
  }

  res.json(application);
});

// Get all applications (admin only)
router.get('/', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  res.json(db.applications);
});

module.exports = router;