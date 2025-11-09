import React, { useState } from 'react';
import './Institute.css'

function Institute() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [instituteProfile, setInstituteProfile] = useState({
    name: '',
    address: '',
    contact: '',
    website: ''
  });
  const [faculties, setFaculties] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentApplications, setStudentApplications] = useState([]);
  const [admissionsPublished, setAdmissionsPublished] = useState(false);
  
  // Registration and Login States
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Form States
  const [newFaculty, setNewFaculty] = useState({ name: '', dean: '' });
  const [newCourse, setNewCourse] = useState({
    name: '',
    code: '',
    duration: '',
    faculty: ''
  });

  // Registration with Email Verification
  const handleRegister = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Simulate registration
    setIsRegistered(true);
    // Simulate email verification process
    alert('Registration successful! Please check your email for verification.');
  };

  const verifyEmail = () => {
    setEmailVerified(true);
    alert('Email verified successfully! You can now login.');
  };

  // Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (emailVerified) {
      setIsLoggedIn(true);
      // Load sample data
      loadSampleData();
    } else {
      alert('Please verify your email first!');
    }
  };

  const loadSampleData = () => {
    // Sample faculties
    setFaculties([
      { id: 1, name: 'Faculty of Engineering', dean: '' },
      { id: 2, name: 'Faculty of Science', dean: '' }
    ]);
    
    // Sample courses
    setCourses([
      { id: 1, name: 'Computer Science', code: 'CS101', duration: '4 years', faculty: 'Faculty of Engineering' },
      { id: 2, name: 'Electrical Engineering', code: 'EE201', duration: '4 years', faculty: 'Faculty of Engineering' },
      { id: 3, name: 'Biology', code: 'BIO101', duration: '3 years', faculty: 'Faculty of Science' }
    ]);

    // Sample student applications
    setStudentApplications([
      { id: 1, name: '', course: 'Computer Science', status: 'pending', appliedDate: '2025-01-15' },
      { id: 2, name: '', course: 'Biology', status: 'pending', appliedDate: '2025-01-16' },
      { id: 3, name: '', course: 'Electrical Engineering', status: 'admitted', appliedDate: '2025-01-10' }
    ]);
  };

  // Faculty Management
  const addFaculty = (e) => {
    e.preventDefault();
    if (newFaculty.name && newFaculty.dean) {
      const faculty = {
        id: Date.now(),
        ...newFaculty
      };
      setFaculties([...faculties, faculty]);
      setNewFaculty({ name: '', dean: '' });
      alert('Faculty added successfully!');
    }
  };

  const updateFaculty = (id, updates) => {
    setFaculties(faculties.map(faculty => 
      faculty.id === id ? { ...faculty, ...updates } : faculty
    ));
  };

  const deleteFaculty = (id) => {
    setFaculties(faculties.filter(faculty => faculty.id !== id));
    // Also remove courses associated with this faculty
    setCourses(courses.filter(course => course.faculty !== faculties.find(f => f.id === id)?.name));
  };

  // Course Management
  const addCourse = (e) => {
    e.preventDefault();
    if (newCourse.name && newCourse.code && newCourse.duration && newCourse.faculty) {
      const course = {
        id: Date.now(),
        ...newCourse
      };
      setCourses([...courses, course]);
      setNewCourse({ name: '', code: '', duration: '', faculty: '' });
      alert('Course added successfully!');
    }
  };

  const updateCourse = (id, updates) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, ...updates } : course
    ));
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  // Student Application Management
  const updateStudentStatus = (studentId, status) => {
    setStudentApplications(studentApplications.map(app => 
      app.id === studentId ? { ...app, status } : app
    ));
  };

  // Admissions Publishing
  const toggleAdmissions = () => {
    setAdmissionsPublished(!admissionsPublished);
    alert(`Admissions ${admissionsPublished ? 'closed' : 'published'} successfully!`);
  };

  // Institute Profile Management
  const updateInstituteProfile = (e) => {
    e.preventDefault();
    alert('Institute profile updated successfully!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmailVerified(false);
    setIsRegistered(false);
    setFaculties([]);
    setCourses([]);
    setStudentApplications([]);
  };

  // Registration and Login UI
  if (!isLoggedIn) {
    return (
      <div className="institute-module">
        <h3>Institute Module</h3>
        
        {/* Registration Section */}
        {!isRegistered ? (
          <div className="registration-section">
            <h4>Institute Registration</h4>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Institute Name"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  required
                />
              </div>
              <button type="submit">Register</button>
            </form>
            <p>Already registered? <button onClick={() => setIsRegistered(true)}>Login here</button></p>
          </div>
        ) : !emailVerified ? (
          // Email Verification Section
          <div className="verification-section">
            <h4>Email Verification Required</h4>
            <p>Please check your email for the verification link.</p>
            <button onClick={verifyEmail}>Verify Email</button>
            <p>Didn't receive the email? <button onClick={() => alert('Verification email sent again!')}>Resend</button></p>
          </div>
        ) : (
          // Login Section
          <div className="login-section">
            <h4>Institute Login</h4>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        )}
      </div>
    );
  }

  // Main Institute Dashboard
  return (
    <div className="institute-module">
      <div className="institute-header">
        <h3>Institute Dashboard</h3>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {/* Institute Profile Management */}
      <div className="profile-section">
        <h4>Institute Profile</h4>
        <form onSubmit={updateInstituteProfile}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Institute Name"
              value={instituteProfile.name}
              onChange={(e) => setInstituteProfile({...instituteProfile, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Address"
              value={instituteProfile.address}
              onChange={(e) => setInstituteProfile({...instituteProfile, address: e.target.value})}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Contact Number"
              value={instituteProfile.contact}
              onChange={(e) => setInstituteProfile({...instituteProfile, contact: e.target.value})}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Website"
              value={instituteProfile.website}
              onChange={(e) => setInstituteProfile({...instituteProfile, website: e.target.value})}
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>

      {/* Faculty Management */}
      <div className="faculty-management">
        <h4>Manage Faculties</h4>
        <form onSubmit={addFaculty} className="add-faculty-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="Faculty Name"
              value={newFaculty.name}
              onChange={(e) => setNewFaculty({...newFaculty, name: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Dean Name"
              value={newFaculty.dean}
              onChange={(e) => setNewFaculty({...newFaculty, dean: e.target.value})}
              required
            />
            <button type="submit">Add Faculty</button>
          </div>
        </form>

        <div className="faculties-list">
          <h5>Existing Faculties</h5>
          {faculties.map(faculty => (
            <div key={faculty.id} className="faculty-item">
              <strong>{faculty.name}</strong> - Dean: {faculty.dean}
              <div className="faculty-actions">
                <button onClick={() => updateFaculty(faculty.id, { 
                  name: prompt('New faculty name:', faculty.name),
                  dean: prompt('New dean name:', faculty.dean)
                })}>Update</button>
                <button onClick={() => deleteFaculty(faculty.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Management */}
      <div className="course-management">
        <h4>Manage Courses</h4>
        <form onSubmit={addCourse} className="add-course-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="Course Name"
              value={newCourse.name}
              onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Course Code"
              value={newCourse.code}
              onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Duration"
              value={newCourse.duration}
              onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
              required
            />
            <select
              value={newCourse.faculty}
              onChange={(e) => setNewCourse({...newCourse, faculty: e.target.value})}
              required
            >
              <option value="">Select Faculty</option>
              {faculties.map(faculty => (
                <option key={faculty.id} value={faculty.name}>{faculty.name}</option>
              ))}
            </select>
            <button type="submit">Add Course</button>
          </div>
        </form>

        <div className="courses-list">
          <h5>Existing Courses</h5>
          {courses.map(course => (
            <div key={course.id} className="course-item">
              <strong>{course.code}</strong> - {course.name} ({course.duration}) - Faculty: {course.faculty}
              <div className="course-actions">
                <button onClick={() => updateCourse(course.id, {
                  name: prompt('New course name:', course.name),
                  code: prompt('New course code:', course.code),
                  duration: prompt('New duration:', course.duration)
                })}>Update</button>
                <button onClick={() => deleteCourse(course.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Applications */}
      <div className="applications-section">
        <h4>Student Applications</h4>
        <div className="applications-list">
          {studentApplications.map(application => (
            <div key={application.id} className="application-item">
              <div className="application-info">
                <strong>{application.name}</strong>
                <span>Course: {application.course}</span>
                <span>Applied: {application.appliedDate}</span>
                <span className={`status ${application.status}`}>
                  Status: {application.status}
                </span>
              </div>
              <div className="application-actions">
                <button onClick={() => updateStudentStatus(application.id, 'admitted')}>
                  Admit
                </button>
                <button onClick={() => updateStudentStatus(application.id, 'rejected')}>
                  Reject
                </button>
                <button onClick={() => updateStudentStatus(application.id, 'pending')}>
                  Pending
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admissions Publishing */}
      <div className="admissions-section">
        <h4>Admissions Control</h4>
        <div className="admissions-status">
          <p>Current Status: <strong>{admissionsPublished ? 'PUBLISHED' : 'CLOSED'}</strong></p>
          <button 
            onClick={toggleAdmissions}
            className={admissionsPublished ? 'close-btn' : 'publish-btn'}
          >
            {admissionsPublished ? 'Close Admissions' : 'Publish Admissions'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Institute;