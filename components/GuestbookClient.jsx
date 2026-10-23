'use client';

import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { apiClient } from '../lib/api-client';

export default function GuestbookClient({ initialEntries = [] }) {
  const [guestbook, setGuestbook] = useState(initialEntries || []);
  const [gbState, setGbState] = useState(null);
  const [gbPending, setGbPending] = useState(false);

  const handleGuestbookSubmit = async (e) => {
    e.preventDefault();
    setGbPending(true);
    setGbState(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      author: fd.get('author'),
      message: fd.get('message')
    };

    try {
      const res = await apiClient.guestbook.create(payload);
      setGbState({ success: true });
      setGuestbook(prev => [res, ...prev]);
      e.target.reset();
    } catch (err) {
      setGbState({ error: err.message || 'Failed to post guestbook entry.' });
    } finally {
      setGbPending(false);
    }
  };

  return (
    <div className="guestbook-wrapper">
      <div className="guestbook-form-card">
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, marginBottom: '14px' }}>
          Sign the Guestbook
        </h3>

        {gbState?.error && <div className="form-alert-error">{gbState.error}</div>}
        {gbState?.success && (
          <div className="form-alert-success">
            <Check size={14} /> Thank you! Your note has been submitted successfully.
          </div>
        )}

        <form onSubmit={handleGuestbookSubmit}>
          <div className="form-group">
            <label className="form-label">Your Name or Handle</label>
            <input
              type="text"
              name="author"
              className="form-control"
              placeholder="e.g. Alex"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              rows="3"
              className="form-control"
              placeholder="Leave a thought, greeting, or feedback..."
              required
            />
          </div>
          <button
            type="submit"
            disabled={gbPending}
            className="btn-primary-glow"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {gbPending ? 'Posting...' : <><Send size={15} /> Sign Guestbook</>}
          </button>
        </form>
      </div>

      <div className="guestbook-feed">
        {guestbook.length === 0 ? (
          <div style={{ padding: '36px 20px', textAlign: 'center', background: 'var(--bg-surface-glass)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>No guestbook entries yet</p>
            <p style={{ fontSize: '13px' }}>Be the first to sign and leave a note above.</p>
          </div>
        ) : (
          guestbook.map(entry => (
            <div key={entry.id} className="guestbook-entry">
              <div className="guestbook-entry-header">
                <span className="guestbook-author">{entry.author}</span>
                <span>{entry.timestamp || (entry.created_at ? new Date(entry.created_at).toLocaleDateString() : '')}</span>
              </div>
              <div className="guestbook-body">{entry.message}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
