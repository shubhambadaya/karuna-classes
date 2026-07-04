import { useState } from 'react';
import { MapPin, Phone, Clock, Send, CheckCircle } from 'lucide-react';
import { submitLead } from '../utils/submitLead';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const result = await submitLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      interest: 'General Inquiry',
      source: 'website',
      message: formData.message,
    });

    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError('Something went wrong. Please try again or message us on WhatsApp.');
    }
  };

  const handleReset = () => {
    setFormData({ name: '', phone: '', email: '', message: '' });
    setSubmitted(false);
    setError('');
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
            <p>Jaipur, Rajasthan, India</p>
          </div>
          <div className="info-card">
            <Clock className="info-icon" />
            <h3>Timezone</h3>
            <p>Mon – Sat: 10 AM – 7 PM IST<br />Sunday: Closed</p>
          </div>
          <div className="info-card">
            <Phone className="info-icon" />
            <h3>WhatsApp</h3>
            <p>Message us anytime<br />Usually replies within 24 hours.</p>
          </div>

          <div className="social-connect">
            <h3>Connect Online</h3>
            <div className="social-links-large">
              <a href="https://www.instagram.com/karuna.artwork" target="_blank" rel="noopener noreferrer" className="social-btn">Instagram</a>
              <a href="https://www.youtube.com/@karunaartwork4996" target="_blank" rel="noopener noreferrer" className="social-btn">YouTube</a>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper glass-panel" data-component="src/pages/Contact.jsx (Form)">
          {submitted ? (
            <div className="contact-success">
              <CheckCircle size={48} className="success-icon" />
              <h2>Message Sent!</h2>
              <p>Karuna will get back to you within 24 hours.</p>
              <button className="btn btn-outline" onClick={handleReset}>Send another message</button>
            </div>
          ) : (
            <>
              <h2>Send a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">WhatsApp Number</label>
                  <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address (optional)</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="6" required value={formData.message} onChange={handleChange}></textarea>
                </div>

                {error && <p className="contact-error">{error}</p>}

                <button type="submit" className="btn btn-primary btn-submit" disabled={submitting}>
                  <Send size={18} /> {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
