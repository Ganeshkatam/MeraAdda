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
  Terminal,
  Layers,
  Code2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap
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
          <div className="badge-beacon hero-fade-in-1">
            <span className="beacon-dot" />
            <span>TomeSphere Product Ecosystem · {projects.length || 7} Systems Active</span>
          </div>

          <h1 className="hero-title-centered hero-fade-in-2">
            Software products engineered for{' '}
            <span className="hero-gradient-text hero-shimmer-text">
              utility, performance &amp; craft.
            </span>
          </h1>

          <p className="hero-description-centered hero-fade-in-3">
            Welcome to <strong>TomeSphere</strong> — an independent digital product place building production web platforms, business growth engines, real-time collaboration tools, and developer utilities.
          </p>

          <div className="hero-cta-group-centered hero-fade-in-4">
            <Link href="/products" className="btn-primary-glow hero-btn-magnetic">
              Explore All Products <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="btn-secondary-glass">
              <Layers size={15} /> System Architecture
            </Link>
            <Link href="/terminal" className="btn-secondary-glass">
              <Terminal size={15} /> Live Terminal
            </Link>
          </div>

          {/* Product Metrics Strip */}
          <div className="product-metrics-strip hero-fade-in-5">
            <div className="metric-item">
              <span className="metric-value">{String(projects.length || 7).padStart(2, '0')}</span>
              <span className="metric-label">Production Products</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">100%</span>
              <span className="metric-label">REST Decoupled</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">Supabase</span>
              <span className="metric-label">PostgreSQL Backend</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">Next.js 16</span>
              <span className="metric-label">Turbopack Engine</span>
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
                  Browse all active digital products with live domain links, status tracking, category filters, and tech stacks.
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
                  <Server size={18} />
                </div>
                <span className="bento-badge-pill">Decoupled</span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-card-title">Product Architecture</h3>
                <div className="bento-card-sub">Clean Architecture · Zero Client DB</div>
                <p className="bento-card-desc">
                  Explore how TomeSphere products are engineered with dedicated Express REST micro-services and PostgreSQL schemas.
                </p>
              </div>
              <div className="bento-card-footer">
                <span className="bento-action-link">
                  Inspect Architecture <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            <Link href="/terminal" className="hero-bento-card">
              <div className="bento-card-header">
                <div className="bento-icon-box bento-icon-cyan">
                  <Terminal size={18} />
                </div>
                <span className="bento-badge-pill">Live Shell</span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-card-title">Studio Console</h3>
                <div className="bento-card-sub">Interactive Developer Shell</div>
                <p className="bento-card-desc">
                  Query product states, inspect verified tech stacks, view system health, and test command execution in real-time.
                </p>
              </div>
              <div className="bento-card-footer">
                <span className="bento-action-link">
                  Launch Console <ArrowRight size={14} />
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
                Systems architect and independent software builder designing and developing the complete TomeSphere product suite, database schemas, and microservices.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary-glow">
              Connect With Studio <ArrowRight size={14} />
            </Link>
            <Link href="/about" className="btn-secondary-glass">
              Read Architecture
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
