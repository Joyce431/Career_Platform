import React, { useState } from 'react';
import './Support.css';

const Support = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [faqItems] = useState([
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button in the top right corner and follow the registration process."
    },
    {
      question: "How can institutions register?",
      answer: "Institutions can register through the dedicated institution portal with proper verification."
    },
    {
      question: "What information do companies need to provide?",
      answer: "Companies need to provide business registration details, contact information, and industry classification."
    },
    {
      question: "How long does verification take?",
      answer: "Verification typically takes 24-48 hours for institutions and companies."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, our mobile app is available on both iOS and Android platforms."
    }
  ]);

  const [activeFaq, setActiveFaq] = useState(null);

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    alert('Thank you for your message! We will get back to you soon.');
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="support-container">
      <div className="support-hero">
        <h1>Support Center</h1>
        <p>We're here to help you succeed</p>
      </div>

      <div className="support-content">
        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <div 
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <h3>{item.question}</h3>
                  <span className={`faq-toggle ${activeFaq === index ? 'active' : ''}`}>
                    {activeFaq === index ? '−' : '+'}
                  </span>
                </div>
                {activeFaq === index && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-section">
          <h2>Contact Us</h2>
          <p>Can't find what you're looking for? Send us a message!</p>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={contactForm.subject}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={contactForm.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </section>

        {/* Quick Help Section */}
        <section className="quick-help-section">
          <h2>Quick Help</h2>
          <table className="help-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Contact</th>
                <th>Hours</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>📞 Phone Support</td>
                <td>+266...</td>
                <td>Mon-Fri: 9AM-6PM EST</td>
              </tr>
              <tr>
                <td>✉️ Email Support</td>
                <td>support@careerplatform.com</td>
                <td>Response within 24 hours</td>
              </tr>
              <tr>
                <td>💬 Live Chat</td>
                <td>Available 24/7</td>
                <td>Instant assistance</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Support;