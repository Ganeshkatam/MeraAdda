'use client';

import React, { useState } from 'react';
import { Send, Check, Copy, Mail } from 'lucide-react';
import { apiClient } from '../lib/api-client';

export default function ContactClient({ profile }) {
  const [contactState, setContactState] = useState(null);
  const [contactPending, setContactPending] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = profile?.email || 'katamganesh61@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactPending(true);
    setContactState(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      message: fd.get('message')
    };

    try {
      const res = await apiClient.contact.send(payload);
      setContactState({ success: true, message: res.confirmation || 'Thank you! Your message has been received.' });
      e.target.reset();
    } catch (err) {
      setContactState({ error: err.message || 'Failed to submit contact message.' });
    } finally {
      setContactPending(false);
    }
  };

  return (
    <div className="contact-cta-section" style={{ margin: '0' }}>
      <div style={{ flex: '1', minWidth: '280px' }}>
        <div className="section-eyebrow" style={{ color: 'var(--accent-primary)' }}>
          Let&apos;s Connect
        </div>
        <h2 className="contact-cta-title">Have an ambitious system or product in mind?</h2>
        <p className="contact-cta-subtitle" style={{ marginBottom: '24px' }}>
          Send a direct message using the form below or reach out directly by email.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button type="button" onClick={copyEmail} className="btn-copy-email">
            {copiedEmail ? <Check size={16} className="icon-emerald" /> : <Copy size={16} />}
            {copiedEmail ? 'Copied to Clipboard!' : email}
          </button>
          <a href={`mailto:${email}`} className="btn-secondary-glass">
            <Mail size={16} /> Open Mail Client
          </a>
        </div>
      </div>

      <div style={{ flex: '1', minWidth: '320px', maxWidth: '480px' }}>
        <div className="guestbook-form-card">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>
            Direct Message
          </h3>

          {contactState?.error && <div className="form-alert-error" role="alert">{contactState.error}</div>}
          {contactState?.success && (
            <div className="form-alert-success" role="status" aria-live="polite">
              <Check size={14} /> {contactState.message}
            </div>
          )}

          <form onSubmit={handleContactSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Name</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                className="form-control"
                placeholder="Your name"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Email</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                autoComplete="email"
                required
                className="form-control"
                placeholder="your.email@example.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="4"
                required
                className="form-control"
                placeholder="Tell us about your project, idea, or inquiry..."
              />
            </div>
            <button
              type="submit"
              disabled={contactPending}
              aria-busy={contactPending}
              className="btn-primary-glow"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {contactPending ? 'Submitting...' : <><Send size={15} /> Send Direct Message</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
