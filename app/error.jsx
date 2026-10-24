'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCw, ArrowLeft } from 'lucide-react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log unexpected errors for operational tracking without exposing credentials
    console.error('[TomeSphere Error Boundary]:', error?.message || error);
  }, [error]);

  return (
    <div className="site-layout">
      <main className="page-wrapper not-found-wrapper">
        <div className="not-found-card">
          <div className="not-found-icon-box" style={{ color: 'var(--accent-violet)' }}>
            <AlertTriangle size={36} />
          </div>
          <div className="page-eyebrow">System Issue</div>
          <h1 className="not-found-title">Unable to Load Resource</h1>
          <p className="not-found-text">
            TomeSphere encountered a temporary problem while retrieving data from backend services.
            The product is not missing, but the platform is currently unable to reach the catalog data source.
          </p>
          <div className="not-found-actions">
            <button
              type="button"
              onClick={() => reset()}
              className="btn-primary-glow"
              style={{ cursor: 'pointer' }}
            >
              <RotateCw size={14} /> Try Again
            </button>
            <Link href="/products" className="btn-secondary-glass">
              <ArrowLeft size={14} /> Product Directory
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
