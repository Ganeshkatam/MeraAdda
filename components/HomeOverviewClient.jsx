'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Cpu,
  Globe,
  Github,
  Linkedin,
  Server,
  Terminal,
  Code2,
  Compass
} from 'lucide-react';

export default function HomeOverviewClient({
  profile,
  projects = [],
  skills = []
}) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [heroMouse, setHeroMouse] = useState({ x: '50%', y: '25%' });

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHeroMouse({ x: `${x.toFixed(1)}%`, y: `${y.toFixed(1)}%` });
  };

  const email = profile?.email || 'katamganesh61@gmail.com';
  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const previewProjects = projects.slice(0, 3);

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
            Crafting digital products at the intersection of{' '}
            <span className="hero-gradient-text hero-shimmer-text">
              systems, architecture &amp; craft.
            </span>
          </h1>

          <p className="hero-description-centered hero-fade-in-3">
            Hello, I am <strong>{profile?.name || 'Katam Ganesh Reddy'}</strong>. {profile?.bio || profile?.intro || 'Software engineer and independent builder creating modern web applications, real-time interactive systems, developer tools, and distributed architecture.'}
          </p>

          <div className="hero-cta-group-centered hero-fade-in-4">
            <Link href="/work" className="btn-primary-glow hero-btn-magnetic">
              Explore Selected Work <ArrowRight size={16} />
            </Link>
            <button type="button" onClick={copyEmail} className="btn-secondary-glass">
              {copiedEmail ? (
                <>
                  <Check size={15} className="icon-emerald" /> Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy size={15} /> Copy Contact Email
                </>
              )}
            </button>
            {profile?.socials?.github && (
              <a
                href={`https://${profile.socials.github}`}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary-glass"
              >
                <Github size={15} /> GitHub <ArrowUpRight size={14} />
              </a>
            )}
            {profile?.socials?.linkedin && (
              <a
                href={`https://${profile.socials.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary-glass"
              >
                <Linkedin size={15} /> LinkedIn <ArrowUpRight size={14} />
              </a>
            )}
          </div>

          {/* Hero Interactive Bento Showcase (MPA Portals) */}
          <div className="hero-bento-grid hero-fade-in-5">
            <Link href="/about" className="hero-bento-card">
              <div className="bento-card-header">
                <div className="bento-icon-box bento-icon-lavender">
                  <Server size={18} />
                </div>
                <span className="bento-badge-pill">Architecture</span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-card-title">Production Architecture</h3>
                <div className="bento-card-sub">Clean Patterns · Resilient APIs</div>
                <p className="bento-card-desc">
                  Specialized in building scalable full-stack applications, real-time protocols, and secure database-driven backend services.
                </p>
              </div>
              <div className="bento-card-footer">
                <span className="bento-action-link">
                  Learn About Pillars <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            <Link href="/work" className="hero-bento-card">
              <div className="bento-card-header">
                <div className="bento-icon-box bento-icon-emerald">
                  <Globe size={18} />
                </div>
                <span className="bento-badge-pill bento-pill-live">
                  <span className="sat-dot sat-emerald" /> {String(projects.length || 7).padStart(2, '0')} Systems
                </span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-card-title">Deployed Applications</h3>
                <div className="bento-card-sub">Web Apps, DevTools &amp; Platforms</div>
                <p className="bento-card-desc">
                  Explore the full catalog of production systems across SaaS, collaborative platforms, and developer tooling.
                </p>
              </div>
              <div className="bento-card-footer">
                <span className="bento-action-link">
                  Open Catalog <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            <Link href="/terminal" className="hero-bento-card">
              <div className="bento-card-header">
                <div className="bento-icon-box bento-icon-cyan">
                  <Terminal size={18} />
                </div>
                <span className="bento-badge-pill">Interactive</span>
              </div>
              <div className="bento-card-body">
                <h3 className="bento-card-title">Developer Dossier</h3>
                <div className="bento-card-sub">Terminal Shell &amp; Specs</div>
                <p className="bento-card-desc">
                  Query technical competencies, runtime metrics, background notes, and endpoints via interactive command shell.
                </p>
              </div>
              <div className="bento-card-footer">
                <span className="bento-action-link">
                  Launch Shell <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Marquee */}
      {skills.length > 0 && (
        <section className="tech-marquee-wrapper">
          <div className="tech-marquee-label">Full-Stack Tech Ecosystem</div>
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

      {/* Selected Work Preview */}
      <section className="section-wrapper">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">Featured Systems</div>
            <h2 className="section-title">Selected Production Work</h2>
            <p className="section-subtitle">A glimpse into recent full-stack systems and tools.</p>
          </div>
          <Link href="/work" className="btn-secondary-glass" style={{ alignSelf: 'flex-start' }}>
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
                    Visit Website <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/work" className="btn-primary-glow">
            Explore All {projects.length} Applications <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Quick Connect CTA */}
      <section className="section-wrapper" style={{ paddingBottom: '80px' }}>
        <div className="guestbook-form-card" style={{ textAlign: 'center', padding: '48px 24px', background: 'linear-gradient(135deg, rgba(14, 17, 26, 0.8) 0%, rgba(20, 24, 36, 0.9) 100%)' }}>
          <div className="section-eyebrow" style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>
            Collaboration
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, marginBottom: '12px' }}>
            Ready to build scalable digital systems?
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 24px', fontSize: '15px' }}>
            Available for software engineering contracts, distributed system design, and product development.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary-glow">
              Get in Touch <ArrowRight size={15} />
            </Link>
            <Link href="/guestbook" className="btn-secondary-glass">
              Sign Guestbook
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
