import { useState } from 'react';
import { MapPin, Phone, Send } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/whatsapp';
import './Contact.css';

const Contact = () => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const message = [
      'Hi Karuna, I have a question.',
      `Name: ${formData.name}`,
      `My WhatsApp number: ${formData.phone}`,
      formData.email && `Email: ${formData.email}`,
      `Message: ${formData.message}`,
    ].filter(Boolean).join('\n');
    const url = createWhatsAppUrl(message);
    if (!url) {
      setError('WhatsApp messaging is not configured yet. Please contact the site owner.');
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
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
            <Phone className="info-icon" />
            <h3>WhatsApp</h3>
            <p>{whatsappNumber ? <a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">Message Karuna on WhatsApp</a> : 'Message us anytime'}<br />Usually replies within an hour.</p>
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

                <button type="submit" className="btn btn-primary btn-submit">
                  <Send size={18} /> Continue to WhatsApp
                </button>
                <p className="form-note">WhatsApp will open with your message ready to send.</p>
              </form>
          </>
        </div>
      </div>
    </div>
  );
};

export default Contact;
