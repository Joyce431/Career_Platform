// backend/data/db.js
// This file is no longer needed for Firebase version
// Keeping it for compatibility, but it will use Firebase services

const { FirebaseService, collections } = require('../services/firebaseService');

// For compatibility with existing code
const db = {
  institutions: [],
  students: [],
  companies: [],
  admissions: [],
  jobPostings: [],
  applications: [],
  users: []
};

const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

// Initialize sample data in Firebase
const initializeSampleData = async () => {
  try {
    console.log('Initializing sample data in Firebase...');
    
    // Check if sample data already exists
    const existingInstitutions = await FirebaseService.getAll(collections.INSTITUTIONS);
    if (existingInstitutions.length > 0) {
      console.log('Sample data already exists, skipping initialization.');
      return;
    }

    // Sample institution
    const institution = await FirebaseService.create(collections.INSTITUTIONS, {
      name: 'University of Technology',
      email: 'admin@unitech.edu',
      location: 'New York',
      type: 'University',
      phone: '+1 (555) 123-4567',
      website: 'https://unitech.edu',
      description: 'Leading institution in technology and engineering education',
      faculties: [
        {
          id: generateId(),
          name: 'Faculty of Engineering',
          dean: 'Dr. Smith',
          description: 'School of Engineering and Technology',
          courses: [
            { id: generateId(), name: 'Computer Science', code: 'CS101', duration: '4 years', credits: '120' },
            { id: generateId(), name: 'Electrical Engineering', code: 'EE201', duration: '4 years', credits: '125' }
          ]
        }
      ],
      isPublished: true,
      userId: 'sample-institution-id' // This would be a real user ID in production
    });

    // Sample company
    const company = await FirebaseService.create(collections.COMPANIES, {
      name: 'Tech Solutions Ltd',
      email: 'contact@techsolutions.com',
      industry: 'Technology',
      phone: '+1 (555) 987-6543',
      address: '123 Tech Street, New York, NY',
      size: '201-500',
      description: 'Leading technology solutions provider',
      website: 'https://techsolutions.com',
      status: 'approved',
      registeredDate: new Date().toLocaleDateString(),
      jobs: [],
      userId: 'sample-company-id' // This would be a real user ID in production
    });

    // Sample job
    const job = await FirebaseService.create(collections.JOBS, {
      title: 'Junior Software Developer',
      type: 'Full-time',
      location: 'New York, NY',
      salary: '$65,000 - $85,000',
      description: 'Join our dynamic team to develop cutting-edge web applications.',
      requirements: ['Computer Science degree', 'JavaScript/React knowledge', 'Problem-solving skills'],
      qualifications: ['Experience with cloud platforms', 'Knowledge of Agile methodologies'],
      deadline: '2024-02-15',
      category: 'Technology',
      companyId: company.id,
      status: 'active',
      applicants: 0,
      views: 0,
      postedDate: new Date().toISOString()
    });

    console.log('Sample data initialized successfully in Firebase');
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
};

module.exports = { db, generateId, initializeSampleData };