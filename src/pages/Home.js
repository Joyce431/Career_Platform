import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({
    students: 0,
    companies: 0,
    institutions: 0,
    jobs: 0
  });

  const navigate = useNavigate();

  const features = [
    {
      icon: '🎓',
      title: 'Student Success',
      description: 'Connect with top institutions and find your dream career path',
      color: '#667eea'
    },
    {
      icon: '🏫',
      title: 'Institution Excellence',
      description: 'Manage admissions and connect with qualified students',
      color: '#764ba2'
    },
    {
      icon: '💼',
      title: 'Company Growth',
      description: 'Find perfectly matched candidates with our AI-powered system',
      color: '#f093fb'
    },
    {
      icon: '🔍',
      title: 'Smart Matching',
      description: 'Advanced algorithms connect the right talent with the right opportunities',
      color: '#4facfe'
    }
  ];

  const testimonials = [
    {
      name: 'Mpho Sello',
      role: 'Computer Science Graduate',
      text: 'Found my dream job at a tech startup through this platform! The matching system is incredible.',
      avatar: '👩‍💻'
    },
    {
      name: 'Dr. Neo Sello',
      role: 'University Admissions Director',
      text: 'Streamlined our entire admission process and connected us with highly qualified students.',
      avatar: '👨‍🏫'
    },
    {
      name: 'Tech Innovations Inc.',
      role: 'Hiring Manager',
      text: 'The quality of candidates we receive is outstanding. Saved us countless hours of screening.',
      avatar: '🏢'
    }
  ];

  const statsTarget = {
    students: 12500,
    companies: 850,
    institutions: 120,
    jobs: 5600
  };

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animation on load
  useEffect(() => {
    setIsVisible(true);
    
    // Animate stats counter
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    Object.keys(statsTarget).forEach(key => {
      let current = 0;
      const increment = statsTarget[key] / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= statsTarget[key]) {
          current = statsTarget[key];
          clearInterval(timer);
        }
        setStats(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, stepDuration);
    });
  }, []);

  const navigateToModule = (module) => {
    navigate(`/${module.toLowerCase()}`);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        
        <div className="hero-content">
          <div className={`hero-text ${isVisible ? 'visible' : ''}`}>
            <h1 className="hero-title">
              <span className="title-line">Shape Your</span>
              <span className="title-line highlight">Future Career</span>
            </h1>
            <p className="hero-subtitle">
              Connecting students, institutions, and companies through intelligent career matching. 
              Your journey to success starts here.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn-primary hero-btn"
                onClick={() => navigateToModule('student')}
              >
                Start Your Journey
              </button>
              <button 
                className="btn-secondary hero-btn"
                onClick={() => navigateToModule('student')}
              >
                Explore Platform
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="floating-cards">
              <div 
                className="card student-card"
                onClick={() => navigateToModule('student')}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-icon">🎓</div>
                <h4>Students</h4>
                <p>Find your path</p>
              </div>
              <div 
                className="card institution-card"
                onClick={() => navigateToModule('institute')}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-icon">🏫</div>
                <h4>Institutions</h4>
                <p>Connect with talent</p>
              </div>
              <div 
                className="card company-card"
                onClick={() => navigateToModule('company')}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-icon">💼</div>
                <h4>Companies</h4>
                <p>Hire the best</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number" data-target={statsTarget.students}>
                {stats.students.toLocaleString()}+
              </div>
              <div className="stat-label">Successful Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target={statsTarget.companies}>
                {stats.companies.toLocaleString()}+
              </div>
              <div className="stat-label">Partner Companies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target={statsTarget.institutions}>
                {stats.institutions.toLocaleString()}+
              </div>
              <div className="stat-label">Institutions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target={statsTarget.jobs}>
                {stats.jobs.toLocaleString()}+
              </div>
              <div className="stat-label">Jobs Matched</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>How We Transform Careers</h2>
            <p>Comprehensive solutions for every stage of your professional journey</p>
          </div>

          <div className="features-table-container">
            <table className="features-table">
              <thead>
                <tr>
                  <th>Icon</th>
                  <th>Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={index}
                    className={`feature-row ${index === currentSlide ? 'active' : ''}`}
                    onMouseEnter={() => setCurrentSlide(index)}
                    style={{ '--accent-color': feature.color }}
                  >
                    <td className="feature-icon-cell">{feature.icon}</td>
                    <td className="feature-title-cell">{feature.title}</td>
                    <td className="feature-description-cell">{feature.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="modules-section">
        <div className="container">
          <div className="section-header">
            <h2>Explore Our Platform</h2>
            <p>Choose your role to get started</p>
          </div>

          <div className="modules-table-container">
            <table className="modules-table">
              <thead>
                <tr>
                  <th>Module</th>
                  <th>Features</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="module-row student-module-row">
                  <td className="module-info-cell">
                    <div className="module-header">
                      <div className="module-icon">🎓</div>
                      <h3>Student Module</h3>
                    </div>
                  </td>
                  <td className="module-features-cell">
                    <div className="module-features">
                      <div className="feature">• Course Applications</div>
                      <div className="feature">• Job Matching</div>
                      <div className="feature">• Document Management</div>
                      <div className="feature">• Career Guidance</div>
                    </div>
                  </td>
                  <td className="module-action-cell">
                    <button
                      className="module-btn"
                      onClick={() => navigateToModule('student')}
                    >
                      Enter as Student
                    </button>
                  </td>
                </tr>

                <tr className="module-row institution-module-row">
                  <td className="module-info-cell">
                    <div className="module-header">
                      <div className="module-icon">🏫</div>
                      <h3>Institution Module</h3>
                    </div>
                  </td>
                  <td className="module-features-cell">
                    <div className="module-features">
                      <div className="feature">• Admissions Management</div>
                      <div className="feature">• Student Applications</div>
                      <div className="feature">• Course Management</div>
                      <div className="feature">• Analytics & Reports</div>
                    </div>
                  </td>
                  <td className="module-action-cell">
                    <button
                      className="module-btn"
                      onClick={() => navigateToModule('institute')}
                    >
                      Enter as Institution
                    </button>
                  </td>
                </tr>

                <tr className="module-row company-module-row">
                  <td className="module-info-cell">
                    <div className="module-header">
                      <div className="module-icon">💼</div>
                      <h3>Company Module</h3>
                    </div>
                  </td>
                  <td className="module-features-cell">
                    <div className="module-features">
                      <div className="feature">• Job Posting</div>
                      <div className="feature">• Smart Candidate Matching</div>
                      <div className="feature">• Applicant Tracking</div>
                      <div className="feature">• Company Profile</div>
                    </div>
                  </td>
                  <td className="module-action-cell">
                    <button
                      className="module-btn"
                      onClick={() => navigateToModule('company')}
                    >
                      Enter as Company
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Success Stories</h2>
            <p>Hear from our community members</p>
          </div>

          <div className="testimonials-table-container">
            <table className="testimonials-table">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Testimonial</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((testimonial, index) => (
                  <tr key={index} className="testimonial-row">
                    <td className="testimonial-avatar-cell">{testimonial.avatar}</td>
                    <td className="testimonial-name-cell">{testimonial.name}</td>
                    <td className="testimonial-role-cell">{testimonial.role}</td>
                    <td className="testimonial-text-cell">"{testimonial.text}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Career Journey?</h2>
            <p>Join thousands of students, institutions, and companies already using our platform</p>
            <div className="cta-buttons">
              <button 
                className="btn-primary cta-btn"
                onClick={() => navigateToModule('student')}
              >
                Get Started Today
              </button>
              <button 
                className="btn-secondary cta-btn"
                onClick={() => navigateToModule('company')}
              >
                For Companies
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>CareerGuidance Platform</h3>
              <p>Connecting talent with opportunity through intelligent matching.</p>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4>Platform</h4>
                <button onClick={() => navigateToModule('student')} className="footer-link">For Students</button>
                <button onClick={() => navigateToModule('institute')} className="footer-link">For Institutions</button>
                <button onClick={() => navigateToModule('company')} className="footer-link">For Companies</button>
              </div>
              <div className="link-group">
                <h4>Support</h4>
                <button className="footer-link">Help Center</button>
                <button className="footer-link">Contact Us</button>
                <button className="footer-link">Privacy Policy</button>
              </div>
              <div className="link-group">
                <h4>Company</h4>
                <button className="footer-link">About Us</button>
                <button className="footer-link">Careers</button>
                <button className="footer-link">Blog</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 CareerGuidance Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;