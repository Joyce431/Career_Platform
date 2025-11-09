import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <h3>CareerConnect</h3>
            <p>
              Bridging the gap between education and employment. 
              Connecting students, institutions, and companies for a brighter future.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="LinkedIn">💼</a>
              <a href="#" aria-label="Instagram">📷</a>
            </div>
          </div>

          {/* Support Links */}
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="/help-center">Help Center</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/support">Customer Support</a></li>
              <li><a href="/guides">User Guides</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/press">Press</a></li>
              <li><a href="/partners">Partners</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/cookies">Cookie Policy</a></li>
              <li><a href="/gdpr">GDPR Compliance</a></li>
              <li><a href="/security">Security</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="footer-section">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for the latest updates</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} CareerConnect. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="/sitemap">Sitemap</a>
              <a href="/accessibility">Accessibility</a>
              <a href="/legal">Legal</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;