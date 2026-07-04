import { useState, useEffect } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';
import { submitLead } from '../utils/submitLead';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, classTitle }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [submitted, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setSubmitting(true);
    setError('');

    const result = await submitLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      interest: classTitle,
      source: 'website',
    });

    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError('Something went wrong. Please try again or message us on WhatsApp.');
    }
  };

  const isDisabled = submitting || !formData.name || !formData.phone;

  return (
    <div className="booking-modal-backdrop" onClick={onClose}>
      <div
        className="booking-modal glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="booking-modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {submitted ? (
          <div className="booking-modal-success">
            <CheckCircle size={48} className="success-icon" />
            <h3>Thank you, {formData.name}!</h3>
            <p>Karuna will reach out to you shortly on WhatsApp.</p>
          </div>
        ) : (
          <>
            <h2>Book {classTitle}</h2>
            <p className="booking-modal-subtitle">Share your details and we'll get you started.</p>

            <form className="booking-modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="booking-name">Name</label>
                <input
                  type="text"
                  id="booking-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="booking-phone">WhatsApp Number</label>
                <input
                  type="tel"
                  id="booking-phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="form-group">
                <label htmlFor="booking-email">Email (optional)</label>
                <input
                  type="email"
                  id="booking-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>

              {error && <p className="booking-modal-error">{error}</p>}

              <button type="submit" className="btn btn-primary btn-submit" disabled={isDisabled}>
                <Send size={18} /> {submitting ? 'Sending...' : 'Confirm Booking'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
