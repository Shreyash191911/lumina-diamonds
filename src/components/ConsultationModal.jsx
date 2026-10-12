import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Calendar, CheckCircle, Sparkles } from 'lucide-react';
import { saveRecord } from '../services/echo.jsx';

export default function ConsultationModal() {
  const { isConsultationOpen, setIsConsultationOpen } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: 'morning',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isConsultationOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await saveRecord('consultations', {
        ...formData,
        createdAt: new Date().toISOString()
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      // Fallback for demo mode
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsConsultationOpen(false)}>
      <div className="modal-container max-w-md" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={() => setIsConsultationOpen(false)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="consultation-success">
            <div className="success-icon-wrapper">
              <CheckCircle size={40} className="success-icon" />
            </div>
            <h3 className="success-title">Consultation Requested</h3>
            <p className="success-text">
              A Lumina private gemologist will contact you within 24 hours to confirm your bespoke viewing appointment.
            </p>
            <button 
              className="btn-primary full-width"
              onClick={() => {
                setSubmitted(false);
                setIsConsultationOpen(false);
              }}
            >
              Return to Gallery
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="consultation-form">
            <div className="form-header">
              <Sparkles size={24} className="form-icon" />
              <h3 className="form-title">Private Consultation</h3>
              <p className="form-subtitle">Schedule a bespoke session with a certified gemologist.</p>
            </div>

            <div className="form-group">
              <label htmlFor="consult-name" className="form-label">Full Name</label>
              <input
                id="consult-name"
                type="text"
                required
                className="form-input"
                placeholder="e.g. Eleanor Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="consult-email" className="form-label">Email Address</label>
              <input
                id="consult-email"
                type="email"
                required
                className="form-input"
                placeholder="e.g. eleanor@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="consult-phone" className="form-label">Phone Number</label>
              <input
                id="consult-phone"
                type="tel"
                required
                className="form-input"
                placeholder="e.g. +1 (555) 019-2834"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="consult-date" className="form-label">Preferred Date</label>
                <input
                  id="consult-date"
                  type="date"
                  required
                  className="form-input"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="consult-time" className="form-label">Preferred Time</label>
                <select
                  id="consult-time"
                  className="form-select"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                >
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                  <option value="evening">Evening (4 PM - 7 PM)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="consult-notes" className="form-label">Special Requests or Specific Diamonds of Interest</label>
              <textarea
                id="consult-notes"
                className="form-textarea"
                rows="3"
                placeholder="e.g. Interested in 3+ Carat Marquise cuts..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="btn-primary full-width"
              disabled={loading}
            >
              {loading ? 'Scheduling...' : 'Request Private Appointment'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
