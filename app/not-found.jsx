import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found | TomeSphere',
  description: 'The requested resource could not be found.'
};

export default function NotFound() {
  return (
    <div className="site-layout">
      <main className="page-wrapper not-found-wrapper">
        <div className="not-found-card">
          <div className="not-found-icon-box">
            <Compass size={36} />
          </div>
          <div className="page-eyebrow">404 Error</div>
          <h1 className="not-found-title">Resource Not Found</h1>
          <p className="not-found-text">
            The product or page you requested could not be located in the TomeSphere directory.
            It may have been moved, renamed, or is currently unavailable.
          </p>
          <div className="not-found-actions">
            <Link href="/products" className="btn-primary-glow">
              Explore Products <ArrowRight size={14} />
            </Link>
            <Link href="/" className="btn-secondary-glass">
              <ArrowLeft size={14} /> Return Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
