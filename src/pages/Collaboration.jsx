import { useState } from 'react';
import { Briefcase, Send, CheckCircle } from 'lucide-react';
import { submitLead } from '../utils/submitLead';
import './Collaboration.css';

const Collaboration = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Exhibition',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const result = await submitLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      interest: `Collaboration: ${formData.projectType}`,
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
    setFormData({ name: '', phone: '', email: '', projectType: 'Exhibition', message: '' });
    setSubmitted(false);
    setError('');
  };

  return (
    <div className="collaboration-page page-transition-enter-active">
      <div className="page-header pattern-bg" data-component="src/pages/Collaboration.jsx (Header)">
        <div className="container">
          <h1>Let's Create Together</h1>
          <p>Open for exhibitions, brand partnerships, and custom commissions.</p>
        </div>
      </div>

      <div className="container collab-container">
        <div className="collab-info" data-component="src/pages/Collaboration.jsx (Info)">
          <h2>Why Collaborate?</h2>
          <p>
            I believe that bringing different perspectives together results in the most compelling art.
            Whether you're a gallery looking for fresh contemporary pieces, a brand seeking unique visual identity,
            or a fellow creator aiming to cross-pollinate ideas—I'm always open to discussing new projects.
          </p>
          <ul className="collab-list">
            <li><Briefcase className="list-icon" /> Gallery Exhibitions & Installations</li>
            <li><Briefcase className="list-icon" /> Brand Packaging & Editorial Illustration</li>
            <li><Briefcase className="list-icon" /> Private Client Custom Commissions</li>
            <li><Briefcase className="list-icon" /> Community Art Workshops</li>
          </ul>
        </div>

        <div className="collab-form-wrapper glass-panel" data-component="src/pages/Collaboration.jsx (Form)">
          {submitted ? (
            <div className="collab-success">
              <CheckCircle size={48} className="success-icon" />
              <h2>Request Sent!</h2>
              <p>Karuna will get back to you soon.</p>
              <button className="btn btn-outline" onClick={handleReset}>Send another request</button>
            </div>
          ) : (
            <>
              <h2>Start a Conversation</h2>
              <form onSubmit={handleSubmit} className="collab-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="Jane Doe" />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">WhatsApp Number</label>
                  <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address (optional)</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="jane@example.com" />
                </div>

                <div className="form-group">
                  <label htmlFor="projectType">Project Type</label>
                  <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange}>
                    <option value="Exhibition">Exhibition</option>
                    <option value="Commercial">Commercial/Brand</option>
                    <option value="Commission">Private Commission</option>
                    <option value="Workshop/Corporate">Workshop/Corporate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Tell me about your idea</label>
                  <textarea id="message" name="message" rows="5" required value={formData.message} onChange={handleChange} placeholder="I'd love to work with you on..."></textarea>
                </div>

                {error && <p className="collab-error">{error}</p>}

                <button type="submit" className="btn btn-primary btn-submit" disabled={submitting}>
                  <Send size={18} /> {submitting ? 'Sending...' : 'Send Request'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
