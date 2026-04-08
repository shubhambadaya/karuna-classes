import { useState } from 'react';
import { Briefcase, Send } from 'lucide-react';
import './Collaboration.css';

const Collaboration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Exhibition',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Collaboration request sent! Karuna will get back to you soon.');
    setFormData({ name: '', email: '', projectType: 'Exhibition', message: '' });
  };

  return (
    <div className="collaboration-page page-transition-enter-active">
      <div className="page-header pattern-bg">
        <div className="container">
          <h1>Let's Create Together</h1>
          <p>Open for exhibitions, brand partnerships, and custom commissions.</p>
        </div>
      </div>

      <div className="container collab-container">
        <div className="collab-info">
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

        <div className="collab-form-wrapper glass-panel">
          <h2>Start a Conversation</h2>
          <form onSubmit={handleSubmit} className="collab-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="Jane Doe" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} placeholder="jane@example.com" />
            </div>

            <div className="form-group">
              <label htmlFor="projectType">Project Type</label>
              <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange}>
                <option value="Exhibition">Exhibition</option>
                <option value="Commercial">Commercial/Brand</option>
                <option value="Commission">Private Commission</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Tell me about your idea</label>
              <textarea id="message" name="message" rows="5" required value={formData.message} onChange={handleChange} placeholder="I'd love to work with you on..."></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-submit">
              <Send size={18} /> Send Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
