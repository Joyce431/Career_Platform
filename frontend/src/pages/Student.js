import React, { useState, useEffect } from 'react';
import './Student.css';

const Student = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [studentProfile, setStudentProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    dateOfBirth: '',
    nationality: '',
    emergencyContact: ''
  });

  const [applications, setApplications] = useState([]);
  const [admissionsResults, setAdmissionsResults] = useState([]);
  const [documents, setDocuments] = useState({
    transcripts: [],
    certificates: [],
    identification: [],
    other: []
  });
  
  const [jobPostings, setJobPostings] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: ''
  });

  const [courseApplication, setCourseApplication] = useState({
    institution: '',
    course1: '',
    course2: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock data
  const availableInstitutions = [
    {
      id: 1,
      name: 'University of Technology',
      location: 'Maseru',
      courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'],
      description: 'Leading institution in technology and engineering education'
    },
    {
      id: 2,
      name: 'Science University',
      location: 'Maseru',
      courses: ['Biology', 'Chemistry', 'Physics', 'Mathematics', 'Environmental Science'],
      description: 'Premier science and research university'
    },
    {
      id: 3,
      name: 'IBC College',
      location: 'Sea_point',
      courses: ['Business Administration', 'Economics', 'Accounting', 'Marketing', 'Finance'],
      description: 'Top-ranked business and management school'
    },
    {
      id: 4,
      name:'LUCT',
      location: 'Maseru',
      courses: ['Fine Arts', 'Graphic Design', 'Music', 'Theater', 'Film Production'],
      description: 'Creative arts and design institution'
    }
  ];

  const mockJobPostings = [
    {
      id: 1,
      title: 'Junior Software Developer',
      company: 'Tech Solutions Inc.',
      location: 'Maseru, Sea-point',
      type: 'Full-time',
      salary: 'R65,000 - R85,000',
      requirements: ['Computer Science degree', 'JavaScript/React knowledge', 'Problem-solving skills'],
      description: 'Join our dynamic team to develop cutting-edge web applications.',
      postedDate: '2025-01-15',
      deadline: '2025-02-15',
      category: 'Technology'
    },
    {
      id: 2,
      title: 'Data Analyst',
      company: 'Analytics Pro',
      location: 'Remote',
      type: 'Contract',
      salary: 'R55,000 - R70,000',
      requirements: ['Statistics/Mathematics background', 'SQL skills', 'Data visualization'],
      description: 'Analyze complex datasets and provide business insights.',
      postedDate: '2025-01-16',
      deadline: '2025-02-10',
      category: 'Data Science'
    },
    {
      id: 3,
      title: 'Research Assistant',
      company: 'Science Research Institute',
      location: 'Maseru',
      type: 'Part-time',
      salary: 'R35,000 - R45,000',
      requirements: ['Biology degree', 'Research experience', 'Laboratory skills'],
      description: 'Support ongoing research projects in molecular biology.',
      postedDate: '2025-01-17',
      deadline: '2025-02-20',
      category: 'Research'
    },
    {
      id: 4,
      title: 'Marketing Intern',
      company: 'Global Brands Co.',
      location: 'Leribe, Hlotse',
      type: 'Internship',
      salary: 'R25,000 - R30,000',
      requirements: ['Marketing knowledge', 'Social media skills', 'Creative thinking'],
      description: 'Learn digital marketing strategies and campaign management.',
      postedDate: '2025-01-18',
      deadline: '2025-02-05',
      category: 'Marketing'
    }
  ];

  // Effects
  useEffect(() => {
    if (isLoggedIn) {
      loadStudentData();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // Simulate new job notifications
    const interval = setInterval(() => {
      if (isLoggedIn && Math.random() > 0.7) {
        const newJobs = mockJobPostings.filter(job => 
          !jobPostings.some(existing => existing.id === job.id)
        );
        if (newJobs.length > 0) {
          setNotifications(prev => [
            ...prev,
            {
              id: Date.now(),
              message: `New job posting: ${newJobs[0].title}`,
              type: 'job',
              read: false,
              timestamp: new Date().toLocaleTimeString()
            }
          ]);
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isLoggedIn, jobPostings]);

  // Core functions
  const loadStudentData = () => {
    setJobPostings(mockJobPostings);
    setNotifications([
      { 
        id: 1, 
        message: 'Welcome to your student dashboard!', 
        type: 'system', 
        read: false,
        timestamp: new Date().toLocaleTimeString()
      },
      { 
        id: 2, 
        message: 'New job posting: Junior Software Developer', 
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
    setStudentProfile(prev => ({
      ...prev,
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone,
      dateOfBirth: registerData.dateOfBirth
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

  const handleCourseApplication = (e) => {
    e.preventDefault();
    
    const existingApplications = applications.filter(app => 
      app.institution === courseApplication.institution
    );
    
    if (existingApplications.length >= 2) {
      alert('You can only apply to maximum 2 courses per institution!');
      return;
    }

    const newApplications = [];
    const institution = availableInstitutions.find(inst => inst.name === courseApplication.institution);
    
    if (courseApplication.course1) {
      newApplications.push({
        id: Date.now(),
        institution: courseApplication.institution,
        institutionLocation: institution?.location,
        course: courseApplication.course1,
        status: 'pending',
        appliedDate: new Date().toLocaleDateString(),
        applicationId: `APP${Date.now().toString().slice(-6)}`
      });
    }
    
    if (courseApplication.course2 && courseApplication.course2 !== courseApplication.course1) {
      newApplications.push({
        id: Date.now() + 1,
        institution: courseApplication.institution,
        institutionLocation: institution?.location,
        course: courseApplication.course2,
        status: 'pending',
        appliedDate: new Date().toLocaleDateString(),
        applicationId: `APP${(Date.now() + 1).toString().slice(-6)}`
      });
    }

    if (newApplications.length > 0) {
      setApplications(prev => [...prev, ...newApplications]);
      setCourseApplication({ institution: '', course1: '', course2: '' });
      
      setNotifications(prev => [
        ...prev,
        {
          id: Date.now(),
          message: `Application submitted for ${newApplications.map(app => app.course).join(', ')}`,
          type: 'application',
          read: false,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);

      alert('Application submitted successfully!');
      
      setTimeout(() => {
        const results = newApplications.map(app => ({
          ...app,
          status: Math.random() > 0.3 ? (Math.random() > 0.5 ? 'admitted' : 'rejected') : 'pending',
          decisionDate: new Date().toLocaleDateString(),
          ...(Math.random() > 0.3 && Math.random() > 0.5 ? { 
            admissionLetter: `Congratulations! You've been admitted to ${app.course} at ${app.institution}.` 
          } : {})
        }));
        setAdmissionsResults(prev => [...prev, ...results]);
        
        // Notification for admission results
        setNotifications(prev => [
          ...prev,
          {
            id: Date.now() + 1000,
            message: `Admission decision available for ${newApplications[0].course}`,
            type: 'admission',
            read: false,
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
      }, 5000);
    }
  };

  const handleDocumentUpload = (type, file) => {
    if (!file) return;

    // Validate file type and size
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      alert('Please upload PDF, JPEG, PNG, or Word documents only.');
      return;
    }

    if (file.size > maxSize) {
      alert('File size must be less than 10MB.');
      return;
    }

    const newDocument = {
      id: Date.now(),
      name: file.name,
      type: type,
      uploadDate: new Date().toLocaleDateString(),
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      file: file
    };

    setDocuments(prev => ({
      ...prev,
      [type === 'transcript' ? 'transcripts' : 
       type === 'certificate' ? 'certificates' :
       type === 'id' ? 'identification' : 'other']: [
        ...prev[type === 'transcript' ? 'transcripts' : 
               type === 'certificate' ? 'certificates' :
               type === 'id' ? 'identification' : 'other'],
        newDocument
      ]
    }));

    setNotifications(prev => [
      ...prev,
      {
        id: Date.now(),
        message: `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded: ${file.name}`,
        type: 'document',
        read: false,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);

    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully!`);
  };

  const removeDocument = (type, docId) => {
    setDocuments(prev => ({
      ...prev,
      [type]: prev[type].filter(doc => doc.id !== docId)
    }));
  };

  const applyForJob = (jobId) => {
    const job = jobPostings.find(j => j.id === jobId);
    if (job && !appliedJobs.includes(jobId)) {
      setAppliedJobs(prev => [...prev, jobId]);
      
      setNotifications(prev => [
        ...prev,
        {
          id: Date.now(),
          message: `Application submitted for ${job.title} at ${job.company}`,
          type: 'job',
          read: false,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);

      alert(`Successfully applied for ${job.title} at ${job.company}`);
    }
  };

  const updateProfile = (e) => {
    e.preventDefault();
    setNotifications(prev => [
      ...prev,
      {
        id: Date.now(),
        message: 'Profile updated successfully',
        type: 'system',
        read: false,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    alert('Profile updated successfully!');
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
    setApplications([]);
    setAdmissionsResults([]);
    setDocuments({ transcripts: [], certificates: [], identification: [], other: [] });
    setAppliedJobs([]);
    setNotifications([]);
    setActiveTab('dashboard');
  };

  const getAvailableCourses = () => {
    const institution = availableInstitutions.find(inst => inst.name === courseApplication.institution);
    return institution ? institution.courses : [];
  };

  const filteredJobPostings = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || job.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getApplicationStatusCount = () => {
    const pending = applications.filter(app => app.status === 'pending').length;
    const admitted = admissionsResults.filter(result => result.status === 'admitted').length;
    const rejected = admissionsResults.filter(result => result.status === 'rejected').length;
    return { pending, admitted, rejected };
  };

  const statusCount = getApplicationStatusCount();

  // Authentication UI
  if (!isLoggedIn) {
    return (
      <div className="student-module">
        <div className="auth-container">
          <div className="auth-header">
            <h2>Student Portal</h2>
            <p>Your gateway to education and career opportunities</p>
          </div>
          
          {!isRegistered ? (
            <div className="registration-section">
              <h3>Create Student Account</h3>
              <form onSubmit={handleRegister} className="auth-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={registerData.name}
                      onChange={(e) => setRegisterData(prev => ({...prev, name: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData(prev => ({...prev, email: e.target.value}))}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData(prev => ({...prev, phone: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      value={registerData.dateOfBirth}
                      onChange={(e) => setRegisterData(prev => ({...prev, dateOfBirth: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Create a password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData(prev => ({...prev, password: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData(prev => ({...prev, confirmPassword: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary">Create Account</button>
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

  // Main Student Dashboard
  return (
    <div className="student-module">
      {/* Header */}
      <header className="student-header">
        <div className="header-content">
          <div className="header-info">
            <h2>Student Dashboard</h2>
            <p>Welcome back, {studentProfile.name}!</p>
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
      <nav className="student-nav">
        {['dashboard', 'applications', 'jobs', 'documents', 'profile'].map(tab => (
          <button
            key={tab}
            className={`nav-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="student-content">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-tab">
            <div className="stats-grid">
              <div className="stat-card pending">
                <h3>{statusCount.pending}</h3>
                <p>Pending Applications</p>
              </div>
              <div className="stat-card admitted">
                <h3>{statusCount.admitted}</h3>
                <p>Admissions</p>
              </div>
              <div className="stat-card jobs">
                <h3>{appliedJobs.length}</h3>
                <p>Job Applications</p>
              </div>
              <div className="stat-card documents">
                <h3>{documents.transcripts.length + documents.certificates.length}</h3>
                <p>Documents Uploaded</p>
              </div>
            </div>

            <div className="dashboard-content">
              <div className="recent-applications">
                <h3>Recent Applications</h3>
                {applications.slice(0, 3).map(application => (
                  <div key={application.id} className="application-card">
                    <div className="app-info">
                      <strong>{application.course}</strong>
                      <span>{application.institution}</span>
                    </div>
                    <span className={`status-badge ${application.status}`}>
                      {application.status}
                    </span>
                  </div>
                ))}
                {applications.length === 0 && (
                  <p className="no-data">No applications yet</p>
                )}
              </div>

              <div className="upcoming-deadlines">
                <h3>Upcoming Deadlines</h3>
                {jobPostings.slice(0, 2).map(job => (
                  <div key={job.id} className="deadline-card">
                    <strong>{job.title}</strong>
                    <span>Due: {job.deadline}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="applications-tab">
            <div className="tab-header">
              <h3>Course Applications</h3>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="btn-secondary"
              >
                View Dashboard
              </button>
            </div>

            {/* Application Form */}
            <div className="application-form-section">
              <h4>Apply for New Courses</h4>
              <form onSubmit={handleCourseApplication} className="application-form">
                <div className="form-group">
                  <label>Select Institution</label>
                  <select
                    value={courseApplication.institution}
                    onChange={(e) => setCourseApplication(prev => ({...prev, institution: e.target.value, course1: '', course2: ''}))}
                    required
                  >
                    <option value="">Choose an institution</option>
                    {availableInstitutions.map(inst => (
                      <option key={inst.id} value={inst.name}>
                        {inst.name} - {inst.location}
                      </option>
                    ))}
                  </select>
                </div>
                
                {courseApplication.institution && (
                  <div className="courses-selection">
                    <div className="form-group">
                      <label>First Course Preference *</label>
                      <select
                        value={courseApplication.course1}
                        onChange={(e) => setCourseApplication(prev => ({...prev, course1: e.target.value}))}
                        required
                      >
                        <option value="">Select your first choice</option>
                        {getAvailableCourses().map((course, index) => (
                          <option key={index} value={course}>{course}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Second Course Preference (Optional)</label>
                      <select
                        value={courseApplication.course2}
                        onChange={(e) => setCourseApplication(prev => ({...prev, course2: e.target.value}))}
                      >
                        <option value="">Select your second choice</option>
                        {getAvailableCourses().map((course, index) => (
                          <option key={index} value={course}>{course}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                
                <button type="submit" className="btn-primary">Submit Application</button>
              </form>
            </div>

            {/* Current Applications */}
            <div className="applications-list">
              <h4>Your Applications</h4>
              {applications.length === 0 ? (
                <div className="empty-state">
                  <p>No applications submitted yet.</p>
                  <p>Start by applying to courses above.</p>
                </div>
              ) : (
                <div className="applications-grid">
                  {applications.map(application => {
                    const result = admissionsResults.find(r => r.id === application.id);
                    return (
                      <div key={application.id} className="application-card detailed">
                        <div className="app-header">
                          <div className="app-basic-info">
                            <h5>{application.course}</h5>
                            <p>{application.institution} • {application.institutionLocation}</p>
                            <small>Application ID: {application.applicationId}</small>
                          </div>
                          <div className="app-status">
                            <span className={`status-badge large ${result?.status || application.status}`}>
                              {result?.status || application.status}
                            </span>
                            {result?.decisionDate && (
                              <small>Decided on: {result.decisionDate}</small>
                            )}
                          </div>
                        </div>
                        {result?.admissionLetter && (
                          <div className="admission-letter">
                            <strong>Admission Letter:</strong>
                            <p>{result.admissionLetter}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="jobs-tab">
            <div className="jobs-header">
              <h3>Career Opportunities</h3>
              <div className="jobs-filters">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>

            <div className="jobs-grid">
              {filteredJobPostings.map(job => (
                <div key={job.id} className="job-card">
                  <div className="job-header">
                    <div className="job-title-section">
                      <h4>{job.title}</h4>
                      <span className="company">{job.company}</span>
                    </div>
                    <div className="job-meta">
                      <span className="location">📍 {job.location}</span>
                      <span className="type">⏱️ {job.type}</span>
                      <span className="salary">💰 {job.salary}</span>
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

                  <div className="job-footer">
                    <div className="job-dates">
                      <span>Posted: {job.postedDate}</span>
                      <span className="deadline">Apply by: {job.deadline}</span>
                    </div>
                    <button 
                      onClick={() => applyForJob(job.id)}
                      disabled={appliedJobs.includes(job.id)}
                      className={`apply-btn ${appliedJobs.includes(job.id) ? 'applied' : ''}`}
                    >
                      {appliedJobs.includes(job.id) ? '✓ Applied' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Applied Jobs */}
            <div className="applied-jobs-section">
              <h4>Your Job Applications</h4>
              <div className="applied-jobs-list">
                {appliedJobs.length === 0 ? (
                  <p className="no-data">No job applications yet</p>
                ) : (
                  appliedJobs.map(jobId => {
                    const job = jobPostings.find(j => j.id === jobId);
                    return job ? (
                      <div key={job.id} className="applied-job-item">
                        <div className="applied-job-info">
                          <strong>{job.title}</strong>
                          <span>at {job.company}</span>
                          <span className="applied-date">Applied on {job.postedDate}</span>
                        </div>
                        <span className="application-status">Under Review</span>
                      </div>
                    ) : null;
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="documents-tab">
            <h3>Document Management</h3>
            
            <div className="upload-sections">
              <div className="upload-section">
                <h4>Academic Transcripts</h4>
                <p>Upload your official academic transcripts</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  onChange={(e) => handleDocumentUpload('transcript', e.target.files[0])}
                  className="file-input"
                />
                <div className="uploaded-files">
                  {documents.transcripts.map(doc => (
                    <div key={doc.id} className="document-item">
                      <span className="doc-icon">📄</span>
                      <div className="doc-info">
                        <strong>{doc.name}</strong>
                        <span>Uploaded: {doc.uploadDate} • {doc.size}</span>
                      </div>
                      <button 
                        onClick={() => removeDocument('transcripts', doc.id)}
                        className="remove-btn"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="upload-section">
                <h4>Certificates & Achievements</h4>
                <p>Upload additional certificates, awards, or achievements</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  onChange={(e) => handleDocumentUpload('certificate', e.target.files[0])}
                  className="file-input"
                />
                <div className="uploaded-files">
                  {documents.certificates.map(doc => (
                    <div key={doc.id} className="document-item">
                      <span className="doc-icon">📄</span>
                      <div className="doc-info">
                        <strong>{doc.name}</strong>
                        <span>Uploaded: {doc.uploadDate} • {doc.size}</span>
                      </div>
                      <button 
                        onClick={() => removeDocument('certificates', doc.id)}
                        className="remove-btn"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="upload-section">
                <h4>Identification Documents</h4>
                <p>Upload ID cards, passports, or other identification</p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => handleDocumentUpload('id', e.target.files[0])}
                  className="file-input"
                />
                <div className="uploaded-files">
                  {documents.identification.map(doc => (
                    <div key={doc.id} className="document-item">
                      <span className="doc-icon">📄</span>
                      <div className="doc-info">
                        <strong>{doc.name}</strong>
                        <span>Uploaded: {doc.uploadDate} • {doc.size}</span>
                      </div>
                      <button 
                        onClick={() => removeDocument('identification', doc.id)}
                        className="remove-btn"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="profile-tab">
            <h3>Student Profile</h3>
            
            <form onSubmit={updateProfile} className="profile-form">
              <div className="form-section">
                <h4>Personal Information</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={studentProfile.name}
                      onChange={(e) => setStudentProfile(prev => ({...prev, name: e.target.value}))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={studentProfile.email}
                      onChange={(e) => setStudentProfile(prev => ({...prev, email: e.target.value}))}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={studentProfile.phone}
                      onChange={(e) => setStudentProfile(prev => ({...prev, phone: e.target.value}))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      value={studentProfile.dateOfBirth}
                      onChange={(e) => setStudentProfile(prev => ({...prev, dateOfBirth: e.target.value}))}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    value={studentProfile.address}
                    onChange={(e) => setStudentProfile(prev => ({...prev, address: e.target.value}))}
                    placeholder="Enter your current address"
                  />
                </div>
              </div>

              <div className="form-section">
                <h4>Educational Background</h4>
                <div className="form-group">
                  <label>Education History</label>
                  <textarea
                    value={studentProfile.education}
                    onChange={(e) => setStudentProfile(prev => ({...prev, education: e.target.value}))}
                    placeholder="Describe your educational background, degrees, and qualifications..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="form-section">
                <h4>Additional Information</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Nationality</label>
                    <input
                      type="text"
                      value={studentProfile.nationality}
                      onChange={(e) => setStudentProfile(prev => ({...prev, nationality: e.target.value}))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Emergency Contact</label>
                    <input
                      type="text"
                      value={studentProfile.emergencyContact}
                      onChange={(e) => setStudentProfile(prev => ({...prev, emergencyContact: e.target.value}))}
                      placeholder="Name and phone number"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary">Update Profile</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Student;