import React, { useState, useEffect } from 'react';
import './Admin.css';

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [institutions, setInstitutions] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Tech Solutions Ltd', status: 'pending', email: 'contact@techsolutions.com', registeredDate: '2025-01-15' },
    { id: 2, name: 'Innovate Corp', status: 'approved', email: 'info@innovatecorp.com', registeredDate: '2025-01-10' },
    { id: 3, name: 'Future Enterprises', status: 'suspended', email: 'support@futureent.com', registeredDate: '2025-01-08' }
  ]);
  const [reports, setReports] = useState([
    { id: 1, title: 'Monthly User Registration', type: 'users', date: '2025-01-20', data: { total: 1500, new: 120 } },
    { id: 2, title: 'Institution Performance', type: 'institutions', date: '2025-01-19', data: { total: 45, active: 38 } },
    { id: 3, title: 'Company Engagement', type: 'companies', date: '2025-01-18', data: { approved: 89, pending: 12 } }
  ]);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [newInstitution, setNewInstitution] = useState({ name: '', location: '', type: 'University' });
  const [newFaculty, setNewFaculty] = useState({ name: '', description: '' });
  const [newCourse, setNewCourse] = useState({ name: '', code: '', duration: '', credits: '' });
  const [activeTab, setActiveTab] = useState('institutions');
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Mock admin credentials
  const adminCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  // Authentication
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === adminCredentials.username && 
        loginData.password === adminCredentials.password) {
      setIsLoggedIn(true);
      // Load mock data
      loadMockData();
    } else {
      alert('Invalid credentials! Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ username: '', password: '' });
  };

  const loadMockData = () => {
    // Load some mock institutions for demonstration
    const mockInstitutions = [
      {
        id: 1,
        name: 'University of Technology',
        location: 'LUCT',
        type: 'University',
        faculties: [
          {
            id: 101,
            name: 'Engineering',
            description: 'School of Engineering and Technology',
            courses: [
              { id: 1001, name: 'Computer Science', code: 'CS101', duration: '4 years', credits: '120' },
              { id: 1002, name: 'Electrical Engineering', code: 'EE201', duration: '4 years', credits: '125' }
            ]
          }
        ],
        isPublished: true
      },
      {
        id: 2,
        name: 'IBC College',
        location: 'Maseru',
        type: 'College',
        faculties: [
          {
            id: 201,
            name: 'Business',
            description: 'School of Business Administration',
            courses: [
              { id: 2001, name: 'Business Management', code: 'BM101', duration: '3 years', credits: '90' }
            ]
          }
        ],
        isPublished: false
      }
    ];
    setInstitutions(mockInstitutions);

    // Mock registered users
    setRegisteredUsers([
      { id: 1, name: '', email: '', institutionId: 1, faculty: 'Engineering', course: 'Computer Science', appliedDate: '2025-01-20' },
      { id: 2, name: '', email: '', institutionId: 1, faculty: 'Engineering', course: 'Electrical Engineering', appliedDate: '2025-01-19' }
    ]);
  };

  // Institution Management
  const addInstitution = () => {
    if (newInstitution.name && newInstitution.location) {
      const institution = {
        id: Date.now(),
        ...newInstitution,
        faculties: [],
        isPublished: false
      };
      setInstitutions([...institutions, institution]);
      setNewInstitution({ name: '', location: '', type: 'University' });
      alert('Institution added successfully!');
    } else {
      alert('Please fill all required fields!');
    }
  };

  const updateInstitution = (id) => {
    const institution = institutions.find(inst => inst.id === id);
    if (institution) {
      const newName = prompt('Enter new name:', institution.name);
      const newLocation = prompt('Enter new location:', institution.location);
      if (newName && newLocation) {
        setInstitutions(institutions.map(inst => 
          inst.id === id ? { ...inst, name: newName, location: newLocation } : inst
        ));
      }
    }
  };

  const deleteInstitution = (id) => {
    if (window.confirm('Are you sure you want to delete this institution?')) {
      setInstitutions(institutions.filter(inst => inst.id !== id));
      // Also remove any admissions for this institution
      setAdmissions(admissions.filter(adm => adm.institutionId !== id));
    }
  };

  // Faculty Management
  const addFaculty = (institutionId) => {
    if (newFaculty.name) {
      setInstitutions(institutions.map(inst => 
        inst.id === institutionId 
          ? { 
              ...inst, 
              faculties: [...inst.faculties, { 
                id: Date.now(), 
                ...newFaculty, 
                courses: [] 
              }] 
            }
          : inst
      ));
      setNewFaculty({ name: '', description: '' });
      alert('Faculty added successfully!');
    } else {
      alert('Please enter faculty name!');
    }
  };

  const deleteFaculty = (institutionId, facultyId) => {
    if (window.confirm('Are you sure you want to delete this faculty?')) {
      setInstitutions(institutions.map(inst => 
        inst.id === institutionId 
          ? { ...inst, faculties: inst.faculties.filter(fac => fac.id !== facultyId) }
          : inst
      ));
    }
  };

  // Course Management
  const addCourse = (institutionId, facultyId) => {
    if (newCourse.name && newCourse.code) {
      setInstitutions(institutions.map(inst => 
        inst.id === institutionId 
          ? { 
              ...inst, 
              faculties: inst.faculties.map(fac => 
                fac.id === facultyId 
                  ? { ...fac, courses: [...fac.courses, { id: Date.now(), ...newCourse }] }
                  : fac
              )
            }
          : inst
      ));
      setNewCourse({ name: '', code: '', duration: '', credits: '' });
      alert('Course added successfully!');
    } else {
      alert('Please fill course name and code!');
    }
  };

  const deleteCourse = (institutionId, facultyId, courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setInstitutions(institutions.map(inst => 
        inst.id === institutionId 
          ? { 
              ...inst, 
              faculties: inst.faculties.map(fac => 
                fac.id === facultyId 
                  ? { ...fac, courses: fac.courses.filter(course => course.id !== courseId) }
                  : fac
              )
            }
          : inst
      ));
    }
  };

  // Admissions Management
  const publishAdmission = (institutionId) => {
    setInstitutions(institutions.map(inst => 
      inst.id === institutionId ? { ...inst, isPublished: true } : inst
    ));
    const admission = {
      id: Date.now(),
      institutionId,
      publishedAt: new Date().toLocaleDateString(),
      status: 'active'
    };
    setAdmissions([...admissions, admission]);
    alert('Admissions published successfully!');
  };

  const closeAdmission = (institutionId) => {
    setInstitutions(institutions.map(inst => 
      inst.id === institutionId ? { ...inst, isPublished: false } : inst
    ));
    setAdmissions(admissions.map(adm => 
      adm.institutionId === institutionId ? { ...adm, status: 'closed' } : adm
    ));
    alert('Admissions closed successfully!');
  };

  // Company Management
  const approveCompany = (companyId) => {
    setCompanies(companies.map(comp => 
      comp.id === companyId ? { ...comp, status: 'approved' } : comp
    ));
  };

  const suspendCompany = (companyId) => {
    setCompanies(companies.map(comp => 
      comp.id === companyId ? { ...comp, status: 'suspended' } : comp
    ));
  };

  const deleteCompany = (companyId) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      setCompanies(companies.filter(comp => comp.id !== companyId));
    }
  };

  // Report Management
  const generateReport = (type) => {
    const report = {
      id: Date.now(),
      title: `${type} Report - ${new Date().toLocaleDateString()}`,
      type: type,
      date: new Date().toLocaleDateString(),
      generatedAt: new Date().toLocaleString()
    };
    setReports([report, ...reports]);
    alert(`${type} report generated successfully!`);
  };

  const deleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter(report => report.id !== reportId));
    }
  };

  // Get institution name by ID
  const getInstitutionName = (id) => {
    const institution = institutions.find(inst => inst.id === id);
    return institution ? institution.name : 'Unknown Institution';
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-module">
        <div className="login-container">
          <div className="login-section">
            <h3>Admin Login</h3>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label>Username:</label>
                <input 
                  type="text" 
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input 
                  type="password" 
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  placeholder="Enter password"
                  required
                />
              </div>
              <button type="submit" className="login-btn">Login</button>
              <div className="demo-credentials">
                <p><strong>Demo Credentials:</strong></p>
                <p>Username: admin</p>
                <p>Password: admin123</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-module">
      {/* Header */}
      <div className="admin-header">
        <h3>Admin Dashboard</h3>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-nav">
        <button 
          className={activeTab === 'institutions' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('institutions')}
        >
          Institutions
        </button>
        <button 
          className={activeTab === 'companies' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('companies')}
        >
          Companies
        </button>
        <button 
          className={activeTab === 'admissions' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('admissions')}
        >
          Admissions
        </button>
        <button 
          className={activeTab === 'reports' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </button>
      </div>

      {/* Institutions Management */}
      {activeTab === 'institutions' && (
        <div className="institution-management">
          <h4>Manage Higher Learning Institutions</h4>
          
          {/* Add New Institution */}
          <div className="add-institution">
            <h5>Add New Institution</h5>
            <div className="form-row">
              <input 
                type="text" 
                placeholder="Institution Name *" 
                value={newInstitution.name}
                onChange={(e) => setNewInstitution({...newInstitution, name: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Location *" 
                value={newInstitution.location}
                onChange={(e) => setNewInstitution({...newInstitution, location: e.target.value})}
              />
              <select 
                value={newInstitution.type}
                onChange={(e) => setNewInstitution({...newInstitution, type: e.target.value})}
              >
                <option value="University">University</option>
                <option value="College">College</option>
                <option value="Institute">Institute</option>
              </select>
            </div>
            <button onClick={addInstitution} className="primary-btn">Add Institution</button>
          </div>

          {/* Institutions List */}
          <div className="institutions-list">
            <h5>Institutions ({institutions.length})</h5>
            {institutions.length === 0 ? (
              <p className="no-data">No institutions added yet.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {institutions.map(institution => (
                    <tr key={institution.id}>
                      <td>{institution.name}</td>
                      <td>{institution.type}</td>
                      <td>{institution.location}</td>
                      <td>
                        <span className={`status ${institution.isPublished ? 'published' : 'closed'}`}>
                          {institution.isPublished ? 'Admissions Open' : 'Admissions Closed'}
                        </span>
                      </td>
                      <td>
                        <button onClick={() => updateInstitution(institution.id)} className="update-btn">
                          Update
                        </button>
                        <button onClick={() => deleteInstitution(institution.id)} className="delete-btn">
                          Delete
                        </button>
                        <button
                          onClick={() => setSelectedInstitution(
                            selectedInstitution?.id === institution.id ? null : institution
                          )}
                          className="expand-btn"
                        >
                          {selectedInstitution?.id === institution.id ? 'Collapse' : 'Manage'}
                        </button>
                        {institution.isPublished ? (
                          <button onClick={() => closeAdmission(institution.id)} className="close-btn">
                            Close Admissions
                          </button>
                        ) : (
                          <button onClick={() => publishAdmission(institution.id)} className="publish-btn">
                            Publish Admissions
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Faculty Management for Selected Institution */}
            {selectedInstitution && (
              <div className="faculty-management">
                <h6>Manage Faculties for {selectedInstitution.name}</h6>

                {/* Add Faculty */}
                <div className="add-faculty">
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Faculty Name *"
                      value={newFaculty.name}
                      onChange={(e) => setNewFaculty({...newFaculty, name: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={newFaculty.description}
                      onChange={(e) => setNewFaculty({...newFaculty, description: e.target.value})}
                    />
                  </div>
                  <button onClick={() => addFaculty(selectedInstitution.id)} className="primary-btn">
                    Add Faculty
                  </button>
                </div>

                {/* Faculties List */}
                {selectedInstitution.faculties.map(faculty => (
                  <div key={faculty.id} className="faculty-item">
                    <div className="faculty-header">
                      <div className="faculty-info">
                        <strong>{faculty.name}</strong>
                        {faculty.description && <span>{faculty.description}</span>}
                        <span>{faculty.courses.length} courses</span>
                      </div>
                      <button
                        onClick={() => deleteFaculty(selectedInstitution.id, faculty.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Course Management */}
                    <div className="course-management">
                      <h7>Courses</h7>

                      {/* Add Course */}
                      <div className="add-course">
                        <div className="form-row">
                          <input
                            type="text"
                            placeholder="Course Name *"
                            value={newCourse.name}
                            onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                          />
                          <input
                            type="text"
                            placeholder="Course Code *"
                            value={newCourse.code}
                            onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
                          />
                          <input
                            type="text"
                            placeholder="Duration"
                            value={newCourse.duration}
                            onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                          />
                          <input
                            type="text"
                            placeholder="Credits"
                            value={newCourse.credits}
                            onChange={(e) => setNewCourse({...newCourse, credits: e.target.value})}
                          />
                        </div>
                        <button
                          onClick={() => addCourse(selectedInstitution.id, faculty.id)}
                          className="primary-btn"
                        >
                          Add Course
                        </button>
                      </div>

                      {/* Courses List */}
                      {faculty.courses.map(course => (
                        <div key={course.id} className="course-item">
                          <div className="course-info">
                            <strong>{course.code} - {course.name}</strong>
                            <span>Duration: {course.duration || 'N/A'}</span>
                            <span>Credits: {course.credits || 'N/A'}</span>
                          </div>
                          <button
                            onClick={() => deleteCourse(selectedInstitution.id, faculty.id, course.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Company Management */}
      {activeTab === 'companies' && (
        <div className="company-management">
          <h4>Manage Registered Companies</h4>
          <div className="companies-list">
            {companies.length === 0 ? (
              <p className="no-data">No companies registered yet.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registered Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map(company => (
                    <tr key={company.id}>
                      <td>{company.name}</td>
                      <td>{company.email}</td>
                      <td>{company.registeredDate}</td>
                      <td>
                        <span className={`status ${company.status}`}>
                          {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        {company.status !== 'approved' && (
                          <button onClick={() => approveCompany(company.id)} className="approve-btn">
                            Approve
                          </button>
                        )}
                        {company.status !== 'suspended' && (
                          <button onClick={() => suspendCompany(company.id)} className="suspend-btn">
                            Suspend
                          </button>
                        )}
                        <button onClick={() => deleteCompany(company.id)} className="delete-btn">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Admissions Monitor */}
      {activeTab === 'admissions' && (
        <div className="admissions-monitor">
          <h4>Published Admissions & Registered Users</h4>
          
          {/* Active Admissions */}
          <div className="admissions-section">
            <h5>Active Admissions ({admissions.filter(adm => adm.status === 'active').length})</h5>
            {admissions.filter(adm => adm.status === 'active').length === 0 ? (
              <p className="no-data">No active admissions.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Institution</th>
                    <th>Published Date</th>
                    <th>Status</th>
                    <th>Registered Users</th>
                  </tr>
                </thead>
                <tbody>
                  {admissions.filter(adm => adm.status === 'active').map(admission => (
                    <tr key={admission.id}>
                      <td>{getInstitutionName(admission.institutionId)}</td>
                      <td>{admission.publishedAt}</td>
                      <td>
                        <span className="status active">Active</span>
                      </td>
                      <td>
                        <button className="view-btn">
                          View ({registeredUsers.filter(user => user.institutionId === admission.institutionId).length})
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Registered Users */}
          <div className="users-section">
            <h5>Registered Users ({registeredUsers.length})</h5>
            {registeredUsers.length === 0 ? (
              <p className="no-data">No registered users yet.</p>
            ) : (
              <div className="users-table">
                <div className="table-header">
                  <span>Name</span>
                  <span>Email</span>
                  <span>Institution</span>
                  <span>Faculty</span>
                  <span>Course</span>
                  <span>Applied Date</span>
                </div>
                {registeredUsers.map(user => (
                  <div key={user.id} className="table-row">
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                    <span>{getInstitutionName(user.institutionId)}</span>
                    <span>{user.faculty}</span>
                    <span>{user.course}</span>
                    <span>{user.appliedDate}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* System Reports */}
      {activeTab === 'reports' && (
        <div className="system-reports">
          <h4>System Reports</h4>
          
          {/* Report Generation */}
          <div className="report-generation">
            <h5>Generate Reports</h5>
            <div className="report-actions">
              <button onClick={() => generateReport('users')} className="report-btn">
                User Registration Report
              </button>
              <button onClick={() => generateReport('institutions')} className="report-btn">
                Institution Report
              </button>
              <button onClick={() => generateReport('companies')} className="report-btn">
                Company Report
              </button>
              <button onClick={() => generateReport('admissions')} className="report-btn">
                Admissions Report
              </button>
            </div>
          </div>

          {/* Reports List */}
          <div className="reports-list">
            <h5>Generated Reports ({reports.length})</h5>
            {reports.length === 0 ? (
              <p className="no-data">No reports generated yet.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Generated At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(report => (
                    <tr key={report.id}>
                      <td>{report.title}</td>
                      <td>{report.type}</td>
                      <td>{report.date}</td>
                      <td>{report.generatedAt || 'N/A'}</td>
                      <td>
                        <button className="view-btn">View Details</button>
                        <button
                          onClick={() => deleteReport(report.id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;