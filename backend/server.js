// Career Platform Backend Server with Firebase
const express = require('express');
const cors = require('cors');
const { initializeSampleData } = require('./data/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const institutionRoutes = require('./routes/institute');
const companyRoutes = require('./routes/companies');
const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/applications');
const adminRoutes = require('./routes/admin');

// Middleware
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Your React app URL
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/institutions', institutionRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Career Platform Backend with Firebase is running' });
});

// Initialize sample data on startup
initializeSampleData();

app.listen(PORT, () => {
  console.log(`🚀 Career Platform Backend Server running on port ${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔥 Firebase integration active`);
});
