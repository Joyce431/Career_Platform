const express = require('express');
const { db, generateId } = require('../data/db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all jobs (public)
router.get('/', (req, res) => {
  const { search, type, category } = req.query;
  
  let allJobs = db.companies.flatMap(company => 
    company.jobs
      .filter(job => job.status === 'active')
      .map(job => ({
        ...job,
        company: company.name,
        companyId: company.id,
        companyEmail: company.email,
        companyIndustry: company.industry
      }))
  );

  // Apply filters
  if (search) {
    const searchLower = search.toLowerCase();
    allJobs = allJobs.filter(job => 
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower)
    );
  }

  if (type && type !== 'all') {
    allJobs = allJobs.filter(job => job.type.toLowerCase() === type.toLowerCase());
  }

  if (category) {
    allJobs = allJobs.filter(job => job.category === category);
  }

  res.json(allJobs);
});

// Get specific job
router.get('/:id', (req, res) => {
  let targetJob = null;
  let targetCompany = null;

  for (const company of db.companies) {
    const job = company.jobs.find(j => j.id === req.params.id);
    if (job) {
      targetJob = job;
      targetCompany = company;
      break;
    }
  }

  if (!targetJob) {
    return res.status(404).json({ error: 'Job not found' });
  }

  res.json({
    ...targetJob,
    company: targetCompany.name,
    companyId: targetCompany.id,
    companyEmail: targetCompany.email,
    companyIndustry: targetCompany.industry,
    companyDescription: targetCompany.description
  });
});

// Create job (company only)
router.post('/', authenticateToken, (req, res) => {
  const company = db.companies.find(comp => comp.id === req.user.id);
  if (!company) {
    return res.status(403).json({ error: 'Only companies can post jobs' });
  }

  const job = {
    id: generateId(),
    ...req.body,
    postedDate: new Date().toISOString(),
    status: 'active',
    applicants: 0,
    views: 0
  };

  company.jobs.push(job);
  res.status(201).json(job);
});

// Update job
router.put('/:id', authenticateToken, (req, res) => {
  const company = db.companies.find(comp => comp.id === req.user.id);
  if (!company) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const job = company.jobs.find(j => j.id === req.params.id);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  Object.assign(job, req.body);
  res.json(job);
});

// Delete job
router.delete('/:id', authenticateToken, (req, res) => {
  const company = db.companies.find(comp => comp.id === req.user.id);
  if (!company) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const jobIndex = company.jobs.findIndex(j => j.id === req.params.id);
  if (jobIndex === -1) {
    return res.status(404).json({ error: 'Job not found' });
  }

  company.jobs.splice(jobIndex, 1);
  res.json({ message: 'Job deleted successfully' });
});

// Apply for job
router.post('/:id/apply', authenticateToken, (req, res) => {
  const student = db.students.find(s => s.id === req.user.id);
  if (!student) {
    return res.status(403).json({ error: 'Only students can apply for jobs' });
  }

  // Find job
  let targetJob = null;
  let targetCompany = null;

  for (const company of db.companies) {
    const job = company.jobs.find(j => j.id === req.params.id);
    if (job) {
      targetJob = job;
      targetCompany = company;
      break;
    }
  }

  if (!targetJob) {
    return res.status(404).json({ error: 'Job not found' });
  }

  // Check if already applied
  if (student.appliedJobs && student.appliedJobs.includes(req.params.id)) {
    return res.status(400).json({ error: 'Already applied to this job' });
  }

  // Add to student's applied jobs
  if (!student.appliedJobs) {
    student.appliedJobs = [];
  }
  student.appliedJobs.push(req.params.id);

  // Increment applicant count
  targetJob.applicants = (targetJob.applicants || 0) + 1;

  res.json({ 
    message: 'Application submitted successfully',
    job: targetJob.title,
    company: targetCompany.name
  });
});

module.exports = router;