import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Institute from './pages/Institute';
import Student from './pages/Student';
import Company from './pages/Company';
import Support from './components/Support';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/">CareerConnect</Link>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/institute">Institute</Link>
            <Link to="/student">Student</Link>
            <Link to="/company">Company</Link>
            <Link to="/support">Support</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/institute" element={<Institute />} />
          <Route path="/student" element={<Student />} />
          <Route path="/company" element={<Company />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;