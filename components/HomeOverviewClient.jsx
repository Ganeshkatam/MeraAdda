'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Globe,
  Github,
  Linkedin,
  Server,
  Layers,
  Code2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
  Compass
} from 'lucide-react';

export default function HomeOverviewClient({
  profile,
  projects = [],
  skills = []
}) {
  const [heroMouse, setHeroMouse] = useState({ x: '50%', y: '25%' });

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHeroMouse({ x: `${x.toFixed(1)}%`, y: `${y.toFixed(1)}%` });
  };

  const previewProjects = projects.slice(0, 4);
  const founderName = profile?.name || 'Katam Ganesh Reddy';

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero-section"
        onMouseMove={handleHeroMouseMove}
        style={{
          '--mouse-x': heroMouse.x,
          '--mouse-y': heroMouse.y
        }}
      >
        <div className="hero-cosmic-glow" aria-hidden="true">
          <div className="hero-cursor-spotlight" />
          <div className="cosmic-orb orb-1" />
          <div className="cosmic-orb orb-2" />
          <div className="hero-grid-mesh" />
        </div>

        <div className="hero-container-centered">
          <h1 className="hero-title-centered hero-fade-in-1">
            Software products engineered for{' '}
            <span className="hero-gradient-text hero-shimmer-text">
              utility, performance &amp; craft.
            </span>
          </h1>

          <p className="hero-description-centered hero-fade-in-2">
            Welcome to <strong>TomeSphere</strong> — an independent digital product place building production web platforms, business growth engines, real-time collaboration tools, and developer utilities.
          </p>

          <div className="hero-cta-group-centered hero-fade-in-3">
            <Link href="/products" className="btn-primary-glow hero-btn-magnetic">
              Explore All Products <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="btn-secondary-glass">
              <Compass size={15} /> About Studio
            </Link>
          </div>

          {/* Product Metrics Strip */}
          <div className="product-metrics-strip hero-fade-in-4">
            <div className="metric-item">
              <span className="metric-value">{String(projects.length || 7).padStart(2, '0')}</span>
              <span className="metric-label">Production Products</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">99.9%</span>
              <span className="metric-label">Platform Availability</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">Global</span>
              <span className="metric-label">Edge Network</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">&lt;100ms</span>
              <span className="metric-label">Sub-Second Delivery</span>
            </div>
          </div>

          {/* Bento Portals to Core Sections */}
          <div className="hero-bento-grid hero-fade-in-5">
            <Link href="/products" className="hero-bento-card">
              <div className="bento-card-header">
                <div className="bento-icon-box bento-icon-emerald">
                  <Globe size={18} />
                </div>
                <span className="bento-badge-pill bento-pill-live">
                  <span className="sat-dot sat-emerald" /> {String(projects.length || 7).padStart(2, '0')} Deployed
                </span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-card-title">Product Catalog</h3>
                <div className="bento-card-sub">Web Apps, DevTools &amp; Platforms</div>
                <p className="bento-card-desc">
                  Browse all active digital products with live links, release updates, and capability guides.
                </p>
              </div>
              <div className="bento-card-footer">
                <span className="bento-action-link">
                  Open Catalog <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            <Link href="/about" className="hero-bento-card">
              <div className="bento-card-header">
                <div className="bento-icon-box bento-icon-lavender">
                  <Compass size={18} />
                </div>
                <span className="bento-badge-pill">Studio</span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-card-title">About TomeSphere</h3>
                <div className="bento-card-sub">Product Craft &amp; Philosophy</div>
                <p className="bento-card-desc">
                  Learn how TomeSphere conceptualizes, refines, and ships purposeful digital platforms and tools.
                </p>
              </div>
              <div className="bento-card-footer">
                <span className="bento-action-link">
                  About Studio <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            <Link href="/guestbook" className="hero-bento-card">
              <div className="bento-card-header">
                <div className="bento-icon-box bento-icon-cyan">
                  <Sparkles size={18} />
                </div>
                <span className="bento-badge-pill">Community</span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-card-title">Community Feedback</h3>
                <div className="bento-card-sub">Real-Time Notes &amp; Thoughts</div>
                <p className="bento-card-desc">
                  Share product suggestions, ask questions, or leave a greeting for the TomeSphere team.
                </p>
              </div>
              <div className="bento-card-footer">
                <span className="bento-action-link">
                  Sign Guestbook <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Ecosystem Marquee */}
      {skills.length > 0 && (
        <section className="tech-marquee-wrapper">
          <div className="tech-marquee-label">TomeSphere Engineering Stack</div>
          <div className="tech-chips-grid">
            {skills.map(tech => (
              <span key={tech} className="tech-chip">
                <span className="chip-dot" />
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products Grid */}
      <section className="section-wrapper">
        <div className="section-head">
          <div>
            <div className="page-eyebrow">Digital Products &amp; Platforms</div>
            <h2 className="section-title">Production Systems Showcase</h2>
            <p className="section-subtitle">Active software products built and maintained under the TomeSphere umbrella.</p>
          </div>
          <Link href="/products" className="btn-secondary-glass" style={{ alignSelf: 'flex-start' }}>
            View All ({projects.length}) <ArrowRight size={14} />
          </Link>
        </div>

        <div className="projects-masonry">
          {previewProjects.map(project => (
            <article key={project.id} className="project-card-modern">
              <div className="project-card-header">
                <div className="project-badge-row">
                  <span className={`card-status-badge ${project.status === 'Live' ? 'badge-live' : 'badge-draft'}`}>
                    <span className="status-indicator-dot" />
                    {project.status}
                  </span>
                  <span className="card-category-badge">{project.category}</span>
                </div>
                <span className="card-year-label">{project.year}</span>
              </div>

              <div className="card-content-area">
                <h3 className="card-title">{project.name}</h3>
                <div className="card-url-row">
                  <Globe size={12} />
                  <span>{project.url}</span>
                </div>
                <p className="card-description">{project.description}</p>

                {project.tags && project.tags.length > 0 && (
                  <div className="card-tags-list">
                    {project.tags.map(t => (
                      <span key={t} className="card-tag-item">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="card-footer-action">
                  <a
                    href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="card-link-preview"
                  >
                    Launch Product <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/products" className="btn-primary-glow">
            Explore All {projects.length} Products <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Founder & Engineering Credit Card */}
      <section className="section-wrapper" style={{ paddingBottom: '80px' }}>
        <div className="studio-founder-card">
          <div className="founder-info">
            <div className="founder-avatar">
              TS
            </div>
            <div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Studio Leadership &amp; Engineering
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>
                {founderName}
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', maxWidth: '580px' }}>
                Founder and product lead designing and developing modern web platforms, creator utilities, and digital software under the TomeSphere brand.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary-glow">
              Connect With Studio <ArrowRight size={14} />
            </Link>
            <Link href="/about" className="btn-secondary-glass">
              About Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
