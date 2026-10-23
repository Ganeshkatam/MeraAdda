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
      {/* Dark cinematic hero */}
      <section className="ts-cinematic-hero">
        <div className="ts-hero-atmosphere" aria-hidden="true">
          <div className="ts-hero-glow ts-hero-glow-one" />
          <div className="ts-hero-glow ts-hero-glow-two" />
          <div className="ts-hero-orbit ts-hero-orbit-one" />
          <div className="ts-hero-orbit ts-hero-orbit-two" />
          <div className="ts-hero-grain" />
        </div>
        <div className="ts-hero-layout">
          <div className="ts-hero-copy">
            <div className="ts-hero-kicker"><span className="ts-hero-kicker-dot" /> INDEPENDENT DIGITAL STUDIO</div>
            <h1 className="ts-hero-title">
              Useful ideas.<br />
              <span>Beautifully</span><br />
              engineered.
            </h1>
            <p className="ts-hero-description">
              TomeSphere builds focused digital products, thoughtful web experiences, and tools that make everyday work feel simpler.
            </p>
            <div className="ts-hero-actions">
              <Link href="/products" className="ts-hero-primary">Explore products <ArrowRight size={16} /></Link>
              <Link href="/about" className="ts-hero-secondary">Meet the studio <ArrowUpRight size={16} /></Link>
            </div>
            <div className="ts-hero-footnote"><span className="ts-hero-footnote-line" /> Independent by design. Useful by default.</div>
          </div>
          <div className="ts-hero-art" aria-label="Abstract visual representing the TomeSphere digital product studio">
            <div className="ts-art-orbit ts-art-orbit-back" />
            <div className="ts-art-orbit ts-art-orbit-front" />
            <div className="ts-art-core">
              <div className="ts-art-core-inner"><span>TS</span><i /></div>
            </div>
            <div className="ts-art-label ts-art-label-top"><span className="ts-art-label-dot" /> PRODUCT STUDIO <span>01 / 03</span></div>
            <div className="ts-art-label ts-art-label-bottom"><span className="ts-art-label-mark">✳</span><div><strong>Built with intent</strong><small>From first idea to useful product</small></div></div>
            <div className="ts-art-cross ts-art-cross-one">+</div>
            <div className="ts-art-cross ts-art-cross-two">+</div>
          </div>
        </div>
        <div className="ts-hero-bottom">
          <span>DESIGN · ENGINEERING · PRODUCT</span>
          <span className="ts-hero-bottom-center">A small studio for useful software</span>
          <Link href="/products">Discover what we're building <ArrowRight size={13} /></Link>
        </div>
      </section>

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
