import { useState } from 'react';
import { MapPin, Mail, Clock, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! I will reply as soon as possible.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page page-transition-enter-active">
      <div className="page-header pattern-bg" data-component="src/pages/Contact.jsx (Header)">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>Questions about classes, artworks, or just want to say hi? Send me a message.</p>
        </div>
      </div>

      <div className="container contact-container">
        <div className="contact-info" data-component="src/pages/Contact.jsx (Info)">
          <div className="info-card">
            <MapPin className="info-icon" />
            <h3>Studio Location</h3>
            <p>123 Canvas Street, Art District<br />Creative City, NY 10001</p>
          </div>
          <div className="info-card">
            <Clock className="info-icon" />
            <h3>Timezone</h3>
            <p>Eastern Standard Time (EST)<br />Online classes scheduled accordingly.</p>
          </div>
          <div className="info-card">
            <Mail className="info-icon" />
            <h3>Email Me</h3>
            <p>hello@karunagupta.com<br />Usually replies within 24 hours.</p>
          </div>

          <div className="social-connect">
            <h3>Connect Online</h3>
            <div className="social-links-large">
              <a href="https://www.instagram.com/karuna.artwork" target="_blank" rel="noopener noreferrer" className="social-btn">Instagram</a>
              <a href="https://www.linkedin.com/in/karunaartwork/" target="_blank" rel="noopener noreferrer" className="social-btn">LinkedIn</a>
              <a href="https://www.youtube.com/@karunaartwork4996" target="_blank" rel="noopener noreferrer" className="social-btn">YouTube</a>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper glass-panel" data-component="src/pages/Contact.jsx (Form)">
          <h2>Send a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="6" required value={formData.message} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-submit">
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
