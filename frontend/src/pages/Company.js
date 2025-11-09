import React, { useState, useEffect } from 'react';
import './Company.css';

const Company = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [companyProfile, setCompanyProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    industry: '',
    size: '',
    description: '',
    website: ''
  });

  const [jobPostings, setJobPostings] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    industry: ''
  });

  const [newJob, setNewJob] = useState({
    title: '',
    type: 'Full-time',
    location: '',
    salary: '',
    description: '',
    requirements: [''],
    qualifications: [''],
    deadline: '',
    category: ''
  });

  // Mock qualified applicants data
  const mockApplicants = [
    {
      id: 1,
      name: '',
      email: '',
      phone: '',
      education: [
        {
          degree: 'Bachelor of Computer Science',
          institution: 'University of Technology',
          gpa: '3.8/4.0',
          year: '2025'
        }
      ],
      experience: [
        {
          position: 'Junior Developer',
          company: 'Tech Startup Inc.',
          duration: '1 year',
          description: 'Developed web applications using React and Node.js'
        }
      ],
      certificates: [
        'AWS Certified Developer',
        'Google Cloud Associate',
        'React Professional Certificate'
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
      matchScore: 95,
      status: 'pending',
      appliedDate: '2025-01-15',
      jobId: 1
    },
    {
      id: 2,
      name: '',
      email: '',
      phone: '',
      education: [
        {
          degree: 'Master of Data Science',
          institution: 'Science University',
          gpa: '3.9/4.0',
          year: '2025'
        }
      ],
      experience: [
        {
          position: 'Data Analyst Intern',
          company: 'Analytics Corp',
          duration: '6 months',
          description: 'Performed data analysis and created visualization dashboards'
        }
      ],
      certificates: [
        'Data Science Professional',
        'Tableau Certified',
        'SQL Expert'
      ],
      skills: ['Python', 'SQL', 'Tableau', 'Machine Learning', 'Statistics'],
      matchScore: 88,
      status: 'pending',
      appliedDate: '2025-01-16',
      jobId: 2
    },
    {
      id: 3,
      name: '',
      email: '',
      phone: '',
      education: [
        {
          degree: 'Bachelor of Electrical Engineering',
          institution: 'University of Technology',
          gpa: '3.7/4.0',
          year: '2022'
        }
      ],
      experience: [
        {
          position: 'Electrical Engineer',
          company: 'Power Solutions Ltd.',
          duration: '2 years',
          description: 'Designed and implemented electrical systems'
        }
      ],
      certificates: [
        'Professional Engineer (PE)',
        'Project Management Professional',
        'AutoCAD Certified'
      ],
      skills: ['Circuit Design', 'AutoCAD', 'Project Management', 'MATLAB'],
      matchScore: 76,
      status: 'pending',
      appliedDate: '2025-01-14',
      jobId: 1
    }
  ];

  // Mock job categories
  const jobCategories = [
    'Technology',
    'Engineering',
    'Data Science',
    'Marketing',
    'Sales',
    'Design',
    'Business',
    'Healthcare'
  ];

  // Mock industries
  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Consulting',
    'Other'
  ];

  // Effects
  useEffect(() => {
    if (isLoggedIn) {
      loadCompanyData();
    }
  }, [isLoggedIn]);

  const loadCompanyData = () => {
    // Load mock applicants
    setApplicants(mockApplicants);
    
    // Load notifications
    setNotifications([
      { 
        id: 1, 
        message: 'New qualified applicant: Mpho ', 
        type: 'applicant', 
        read: false,
        timestamp: new Date().toLocaleTimeString()
      },
      { 
        id: 2, 
        message: 'Your job posting has received 5 new applications', 
        type: 'job', 
        read: false,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const generateVerificationCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCode(code);
    alert(`Your verification code is: ${code}\n\nPlease enter this code to verify your email.`);
    return code;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (registerData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    setIsRegistered(true);
    setCompanyProfile(prev => ({
      ...prev,
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone,
      industry: registerData.industry
    }));
    generateVerificationCode();
  };

  const verifyEmail = () => {
    if (verificationCode === generatedCode) {
      setEmailVerified(true);
      alert('Email verified successfully! You can now login.');
    } else {
      alert('Invalid verification code. Please try again.');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (emailVerified) {
      setIsLoggedIn(true);
      setActiveTab('dashboard');
    } else {
      alert('Please verify your email first!');
    }
  };

  const handleJobPost = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!newJob.title || !newJob.location || !newJob.description) {
      alert('Please fill in all required fields.');
      return;
    }

    const job = {
      id: Date.now(),
      ...newJob,
      postedDate: new Date().toLocaleDateString(),
      status: 'active',
      applicants: 0,
      views: 0
    };

    setJobPostings(prev => [...prev, job]);
    
    // Reset form
    setNewJob({
      title: '',
      type: 'Full-time',
      location: '',
      salary: '',
      description: '',
      requirements: [''],
      qualifications: [''],
      deadline: '',
      category: ''
    });

    setNotifications(prev => [
      ...prev,
      {
        id: Date.now(),
        message: `Job posted: ${job.title}`,
        type: 'job',
        read: false,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);

    alert('Job posted successfully! Qualified applicants will be automatically matched.');
  };

  const addRequirement = () => {
    setNewJob(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const updateRequirement = (index, value) => {
    const updatedRequirements = [...newJob.requirements];
    updatedRequirements[index] = value;
    setNewJob(prev => ({
      ...prev,
      requirements: updatedRequirements
    }));
  };

  const removeRequirement = (index) => {
    if (newJob.requirements.length > 1) {
      const updatedRequirements = newJob.requirements.filter((_, i) => i !== index);
      setNewJob(prev => ({
        ...prev,
        requirements: updatedRequirements
      }));
    }
  };

  const addQualification = () => {
    setNewJob(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, '']
    }));
  };

  const updateQualification = (index, value) => {
    const updatedQualifications = [...newJob.qualifications];
    updatedQualifications[index] = value;
    setNewJob(prev => ({
      ...prev,
      qualifications: updatedQualifications
    }));
  };

  const removeQualification = (index) => {
    if (newJob.qualifications.length > 1) {
      const updatedQualifications = newJob.qualifications.filter((_, i) => i !== index);
      setNewJob(prev => ({
        ...prev,
        qualifications: updatedQualifications
      }));
    }
  };

  const updateApplicantStatus = (applicantId, status) => {
    setApplicants(prev => 
      prev.map(applicant => 
        applicant.id === applicantId ? { ...applicant, status } : applicant
      )
    );

    const applicant = applicants.find(app => app.id === applicantId);
    setNotifications(prev => [
      ...prev,
      {
        id: Date.now(),
        message: `Updated ${applicant?.name}'s status to ${status}`,
        type: 'applicant',
        read: false,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const calculateMatchScore = (applicant, job) => {
    // This is a simplified matching algorithm
    let score = 50; // Base score
    
    // Education match
    if (applicant.education.some(edu => 
      edu.degree.toLowerCase().includes(job.category.toLowerCase()) ||
      edu.institution.toLowerCase().includes('technology') && job.category === 'Technology'
    )) {
      score += 20;
    }

    // Skills match
    const requiredSkills = job.requirements.join(' ').toLowerCase();
    const skillMatches = applicant.skills.filter(skill => 
      requiredSkills.includes(skill.toLowerCase())
    ).length;
    score += (skillMatches / applicant.skills.length) * 20;

    // Experience bonus
    if (applicant.experience.length > 0) {
      score += 10;
    }

    // Certificates bonus
    if (applicant.certificates.length > 2) {
      score += 5;
    }

    return Math.min(Math.round(score), 100);
  };

  const getApplicantsForJob = (jobId) => {
    return applicants.filter(applicant => applicant.jobId === jobId);
  };

  const updateProfile = (e) => {
    e.preventDefault();
    setNotifications(prev => [
      ...prev,
      {
        id: Date.now(),
        message: 'Company profile updated successfully',
        type: 'system',
        read: false,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    alert('Company profile updated successfully!');
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmailVerified(false);
    setIsRegistered(false);
    setJobPostings([]);
    setApplicants([]);
    setNotifications([]);
    setActiveTab('dashboard');
  };

  // Authentication UI
  if (!isLoggedIn) {
    return (
      <div className="company-module">
        <div className="auth-container">
          <div className="auth-header">
            <h2>Company Portal</h2>
            <p>Find qualified candidates and grow your team</p>
          </div>
          
          {!isRegistered ? (
            <div className="registration-section">
              <h3>Create Company Account</h3>
              <form onSubmit={handleRegister} className="auth-form">
                <div className="form-group">
                  <label>Company Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your company name"
                    value={registerData.name}
                    onChange={(e) => setRegisterData(prev => ({...prev, name: e.target.value}))}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      placeholder="Enter company email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData(prev => ({...prev, email: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="Enter company phone"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData(prev => ({...prev, phone: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Industry *</label>
                  <select
                    value={registerData.industry}
                    onChange={(e) => setRegisterData(prev => ({...prev, industry: e.target.value}))}
                    required
                  >
                    <option value="">Select Industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Password *</label>
                    <input
                      type="password"
                      placeholder="Create a password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData(prev => ({...prev, password: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password *</label>
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData(prev => ({...prev, confirmPassword: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary">Create Company Account</button>
              </form>
              <p className="auth-switch">
                Already have an account? <button onClick={() => setIsRegistered(true)}>Sign In</button>
              </p>
            </div>
          ) : !emailVerified ? (
            <div className="verification-section">
              <h3>Verify Your Email</h3>
              <p>We've sent a verification code to your email address.</p>
              <div className="verification-form">
                <div className="form-group">
                  <label>Enter Verification Code</label>
                  <input
                    type="text"
                    placeholder="Enter the 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                  />
                </div>
                <button onClick={verifyEmail} className="btn-primary">Verify Email</button>
                <button onClick={() => generateVerificationCode()} className="btn-secondary">
                  Resend Code
                </button>
              </div>
            </div>
          ) : (
            <div className="login-section">
              <h3>Welcome Back</h3>
              <form onSubmit={handleLogin} className="auth-form">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({...prev, email: e.target.value}))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({...prev, password: e.target.value}))}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">Sign In</button>
              </form>
              <p className="auth-switch">
                Don't have an account? <button onClick={() => setIsRegistered(false)}>Sign Up</button>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main Company Dashboard
  return (
    <div className="company-module">
      {/* Header */}
      <header className="company-header">
        <div className="header-content">
          <div className="header-info">
            <h2>Company Dashboard</h2>
            <p>Welcome back, {companyProfile.name}!</p>
          </div>
          <div className="header-actions">
            <div className="notifications-wrapper">
              <button 
                className="notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                🔔 Notifications ({notifications.filter(n => !n.read).length})
              </button>
              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h4>Notifications</h4>
                    <button onClick={markAllNotificationsAsRead}>Mark all as read</button>
                  </div>
                  <div className="notification-list">
                    {notifications.slice(0, 5).map(notification => (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="notification-message">{notification.message}</div>
                        <div className="notification-time">{notification.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="company-nav">
        {['dashboard', 'post-job', 'applicants', 'jobs', 'profile'].map(tab => (
          <button
            key={tab}
            className={`nav-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="company-content">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-tab">
            <div className="stats-grid">
              <div className="stat-card jobs">
                <h3>{jobPostings.length}</h3>
                <p>Active Job Postings</p>
              </div>
              <div className="stat-card applicants">
                <h3>{applicants.length}</h3>
                <p>Qualified Applicants</p>
              </div>
              <div className="stat-card interviews">
                <h3>{applicants.filter(app => app.status === 'interview').length}</h3>
                <p>Scheduled Interviews</p>
              </div>
              <div className="stat-card matches">
                <h3>{applicants.filter(app => app.matchScore >= 80).length}</h3>
                <p>High Match Candidates</p>
              </div>
            </div>

            <div className="dashboard-content">
              <div className="recent-applicants">
                <h3>Recent Qualified Applicants</h3>
                {applicants.slice(0, 3).map(applicant => (
                  <div key={applicant.id} className="applicant-card">
                    <div className="applicant-info">
                      <strong>{applicant.name}</strong>
                      <span>Match Score: {applicant.matchScore}%</span>
                      <span>Applied: {applicant.appliedDate}</span>
                    </div>
                    <span className={`status-badge ${applicant.status}`}>
                      {applicant.status}
                    </span>
                  </div>
                ))}
                {applicants.length === 0 && (
                  <p className="no-data">No applicants yet</p>
                )}
              </div>

              <div className="active-jobs">
                <h3>Active Job Postings</h3>
                {jobPostings.slice(0, 3).map(job => (
                  <div key={job.id} className="job-card">
                    <strong>{job.title}</strong>
                    <span>{job.location} • {job.type}</span>
                    <span className="applicant-count">
                      {getApplicantsForJob(job.id).length} qualified applicants
                    </span>
                  </div>
                ))}
                {jobPostings.length === 0 && (
                  <p className="no-data">No active job postings</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Post Job Tab */}
        {activeTab === 'post-job' && (
          <div className="post-job-tab">
            <div className="tab-header">
              <h3>Post New Job Opportunity</h3>
              <p>Create a detailed job posting to attract qualified candidates</p>
            </div>

            <form onSubmit={handleJobPost} className="job-form">
              <div className="form-section">
                <h4>Basic Information</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Job Title *</label>
                    <input
                      type="text"
                      placeholder="e.g., Senior Software Engineer"
                      value={newJob.title}
                      onChange={(e) => setNewJob(prev => ({...prev, title: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Job Type *</label>
                    <select
                      value={newJob.type}
                      onChange={(e) => setNewJob(prev => ({...prev, type: e.target.value}))}
                      required
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Location *</label>
                    <input
                      type="text"
                      placeholder="e.g., New York, NY or Remote"
                      value={newJob.location}
                      onChange={(e) => setNewJob(prev => ({...prev, location: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Salary Range</label>
                    <input
                      type="text"
                      placeholder="e.g., $80,000 - $120,000"
                      value={newJob.salary}
                      onChange={(e) => setNewJob(prev => ({...prev, salary: e.target.value}))}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      value={newJob.category}
                      onChange={(e) => setNewJob(prev => ({...prev, category: e.target.value}))}
                      required
                    >
                      <option value="">Select Category</option>
                      {jobCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Application Deadline</label>
                    <input
                      type="date"
                      value={newJob.deadline}
                      onChange={(e) => setNewJob(prev => ({...prev, deadline: e.target.value}))}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4>Job Description *</h4>
                <div className="form-group">
                  <textarea
                    placeholder="Describe the role, responsibilities, and what makes your company great..."
                    value={newJob.description}
                    onChange={(e) => setNewJob(prev => ({...prev, description: e.target.value}))}
                    rows={6}
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h4>Requirements & Qualifications</h4>
                
                <div className="requirements-section">
                  <label>Key Requirements *</label>
                  {newJob.requirements.map((requirement, index) => (
                    <div key={index} className="input-with-actions">
                      <input
                        type="text"
                        placeholder="e.g., 3+ years of experience with React"
                        value={requirement}
                        onChange={(e) => updateRequirement(index, e.target.value)}
                        required
                      />
                      {newJob.requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="remove-btn"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={addRequirement} className="add-more-btn">
                    + Add Another Requirement
                  </button>
                </div>

                <div className="qualifications-section">
                  <label>Preferred Qualifications</label>
                  {newJob.qualifications.map((qualification, index) => (
                    <div key={index} className="input-with-actions">
                      <input
                        type="text"
                        placeholder="e.g., Experience with cloud platforms"
                        value={qualification}
                        onChange={(e) => updateQualification(index, e.target.value)}
                      />
                      {newJob.qualifications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQualification(index)}
                          className="remove-btn"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={addQualification} className="add-more-btn">
                    + Add Another Qualification
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-primary large">Post Job Opportunity</button>
            </form>
          </div>
        )}

        {/* Applicants Tab */}
        {activeTab === 'applicants' && (
          <div className="applicants-tab">
            <div className="tab-header">
              <h3>Qualified Applicants</h3>
              <p>Automatically filtered candidates ready for interview consideration</p>
            </div>

            <div className="applicants-filters">
              <div className="filter-group">
                <label>Filter by Job:</label>
                <select>
                  <option value="all">All Jobs</option>
                  {jobPostings.map(job => (
                    <option key={job.id} value={job.id}>{job.title}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>Filter by Status:</label>
                <select>
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="interview">Interview</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Minimum Match Score:</label>
                <select>
                  <option value="0">Any Score</option>
                  <option value="80">80%+</option>
                  <option value="90">90%+</option>
                </select>
              </div>
            </div>

            <div className="applicants-grid">
              {applicants.map(applicant => (
                <div key={applicant.id} className="applicant-card detailed">
                  <div className="applicant-header">
                    <div className="applicant-main-info">
                      <h4>{applicant.name}</h4>
                      <div className="applicant-contact">
                        <span>📧 {applicant.email}</span>
                        <span>📞 {applicant.phone}</span>
                      </div>
                      <div className="match-score">
                        <div className="score-circle">
                          <span>{applicant.matchScore}%</span>
                        </div>
                        <span>Match Score</span>
                      </div>
                    </div>
                    <div className="applicant-actions">
                      <select
                        value={applicant.status}
                        onChange={(e) => updateApplicantStatus(applicant.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pending">Pending Review</option>
                        <option value="interview">Schedule Interview</option>
                        <option value="hired">Hire</option>
                        <option value="rejected">Reject</option>
                      </select>
                      <button className="btn-secondary">View Full Profile</button>
                    </div>
                  </div>

                  <div className="applicant-details">
                    <div className="detail-section">
                      <h5>Education</h5>
                      {applicant.education.map((edu, index) => (
                        <div key={index} className="education-item">
                          <strong>{edu.degree}</strong>
                          <span>{edu.institution} • GPA: {edu.gpa} • {edu.year}</span>
                        </div>
                      ))}
                    </div>

                    <div className="detail-section">
                      <h5>Work Experience</h5>
                      {applicant.experience.map((exp, index) => (
                        <div key={index} className="experience-item">
                          <strong>{exp.position}</strong>
                          <span>{exp.company} • {exp.duration}</span>
                          <p>{exp.description}</p>
                        </div>
                      ))}
                    </div>

                    <div className="detail-section">
                      <h5>Certificates & Skills</h5>
                      <div className="certificates">
                        {applicant.certificates.map((cert, index) => (
                          <span key={index} className="certificate-badge">{cert}</span>
                        ))}
                      </div>
                      <div className="skills">
                        {applicant.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {applicants.length === 0 && (
              <div className="empty-state">
                <h4>No Qualified Applicants Yet</h4>
                <p>Post a job to start receiving qualified candidate applications.</p>
                <button 
                  onClick={() => setActiveTab('post-job')}
                  className="btn-primary"
                >
                  Post Your First Job
                </button>
              </div>
            )}
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="jobs-tab">
            <div className="tab-header">
              <h3>Your Job Postings</h3>
              <button 
                onClick={() => setActiveTab('post-job')}
                className="btn-primary"
              >
                + Post New Job
              </button>
            </div>

            <div className="jobs-list">
              {jobPostings.map(job => {
                const jobApplicants = getApplicantsForJob(job.id);
                return (
                  <div key={job.id} className="job-posting-card">
                    <div className="job-header">
                      <div className="job-title-section">
                        <h4>{job.title}</h4>
                        <div className="job-meta">
                          <span>📍 {job.location}</span>
                          <span>⏱️ {job.type}</span>
                          <span>💰 {job.salary || 'Salary not specified'}</span>
                          <span>📅 Posted: {job.postedDate}</span>
                        </div>
                      </div>
                      <div className="job-stats">
                        <div className="stat">
                          <strong>{jobApplicants.length}</strong>
                          <span>Applicants</span>
                        </div>
                        <div className="stat">
                          <strong>
                            {jobApplicants.filter(app => app.matchScore >= 80).length}
                          </strong>
                          <span>High Match</span>
                        </div>
                      </div>
                    </div>

                    <div className="job-description">
                      <p>{job.description}</p>
                    </div>

                    <div className="job-requirements">
                      <strong>Requirements:</strong>
                      <ul>
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="job-actions">
                      <button className="btn-secondary">Edit Posting</button>
                      <button className="btn-secondary">View Applicants</button>
                      <button className="btn-danger">Close Job</button>
                    </div>
                  </div>
                );
              })}

              {jobPostings.length === 0 && (
                <div className="empty-state">
                  <h4>No Job Postings Yet</h4>
                  <p>Create your first job posting to start attracting qualified candidates.</p>
                  <button 
                    onClick={() => setActiveTab('post-job')}
                    className="btn-primary"
                  >
                    Create Your First Job Posting
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="profile-tab">
            <h3>Company Profile</h3>
            
            <form onSubmit={updateProfile} className="profile-form">
              <div className="form-section">
                <h4>Company Information</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Company Name *</label>
                    <input
                      type="text"
                      value={companyProfile.name}
                      onChange={(e) => setCompanyProfile(prev => ({...prev, name: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      value={companyProfile.email}
                      onChange={(e) => setCompanyProfile(prev => ({...prev, email: e.target.value}))}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      value={companyProfile.phone}
                      onChange={(e) => setCompanyProfile(prev => ({...prev, phone: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Industry *</label>
                    <select
                      value={companyProfile.industry}
                      onChange={(e) => setCompanyProfile(prev => ({...prev, industry: e.target.value}))}
                      required
                    >
                      <option value="">Select Industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Company Address</label>
                  <input
                    type="text"
                    value={companyProfile.address}
                    onChange={(e) => setCompanyProfile(prev => ({...prev, address: e.target.value}))}
                    placeholder="Enter company address"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Company Size</label>
                    <select
                      value={companyProfile.size}
                      onChange={(e) => setCompanyProfile(prev => ({...prev, size: e.target.value}))}
                    >
                      <option value="">Select Size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Website</label>
                    <input
                      type="url"
                      value={companyProfile.website}
                      onChange={(e) => setCompanyProfile(prev => ({...prev, website: e.target.value}))}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4>Company Description</h4>
                <div className="form-group">
                  <textarea
                    value={companyProfile.description}
                    onChange={(e) => setCompanyProfile(prev => ({...prev, description: e.target.value}))}
                    placeholder="Describe your company, mission, values, and culture..."
                    rows={6}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary">Update Company Profile</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Company;