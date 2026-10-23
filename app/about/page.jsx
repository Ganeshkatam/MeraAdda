import React from 'react';
import Link from 'next/link';
import { Code2, Cpu, Compass, Globe, ArrowRight } from 'lucide-react';
import { apiClient } from '../../lib/api-client';

export const revalidate = 1800;

export const metadata = {
  title: 'About & Engineering Pillars — Katam Ganesh Reddy',
  description: 'Technical background, architectural principles, and engineering capabilities of Katam Ganesh Reddy.'
};

export default async function AboutPage() {
  const [profile, skills] = await Promise.all([
    apiClient.profile.get().catch(() => null),
    apiClient.skills.list().catch(() => [])
  ]);

  const skillsList = Array.isArray(skills) ? skills.map(s => s.name || s) : [];

  return (
    <div className="page-wrapper">
      <div className="page-head">
        <div className="page-eyebrow">Profile &amp; Architecture</div>
        <h1 className="page-title">Engineering Philosophy</h1>
        <p className="page-subtitle">
          {profile?.bio || profile?.intro || 'Software engineer and independent builder creating modern web applications, developer tools, and distributed architecture.'}
        </p>
      </div>

      {/* Core Engineering Pillars */}
      <section className="section-wrapper" style={{ padding: '0 0 60px' }}>
        <div className="section-head">
          <div>
            <div className="section-eyebrow">Disciplines</div>
            <h2 className="section-title">Core Capabilities</h2>
            <p className="section-subtitle">Disciplines and technical crafts honed through shipping real production products.</p>
          </div>
        </div>

        <div className="capabilities-grid">
          <div className="capability-card">
            <div className="capability-icon-box">
              <Code2 size={24} />
            </div>
            <h3 className="capability-title">Frontend Engineering</h3>
            <p className="capability-desc">
              Building reactive web applications with Next.js 16, React 19, TypeScript, fluid CSS animations, and deep attention to accessibility.
            </p>
            <div className="capability-tags">
              <span className="cap-tag">Next.js</span>
              <span className="cap-tag">React 19</span>
              <span className="cap-tag">TypeScript</span>
              <span className="cap-tag">Tailwind</span>
            </div>
          </div>

          <div className="capability-card">
            <div className="capability-icon-box">
              <Cpu size={24} />
            </div>
            <h3 className="capability-title">Backend &amp; API Architecture</h3>
            <p className="capability-desc">
              Designing resilient schemas, RESTful endpoints, real-time event streams, and high-performance standalone server modules.
            </p>
            <div className="capability-tags">
              <span className="cap-tag">Node.js</span>
              <span className="cap-tag">PostgreSQL</span>
              <span className="cap-tag">WebSockets</span>
              <span className="cap-tag">REST APIs</span>
            </div>
          </div>

          <div className="capability-card">
            <div className="capability-icon-box">
              <Compass size={24} />
            </div>
            <h3 className="capability-title">Product &amp; System Design</h3>
            <p className="capability-desc">
              Transforming conceptual visions into functional web products with intentional design systems, polished micro-copy, and intuitive UX flows.
            </p>
            <div className="capability-tags">
              <span className="cap-tag">Design Systems</span>
              <span className="cap-tag">UI/UX Craft</span>
              <span className="cap-tag">Micro-interactions</span>
            </div>
          </div>

          <div className="capability-card">
            <div className="capability-icon-box">
              <Globe size={24} />
            </div>
            <h3 className="capability-title">Deployment &amp; Edge Cloud</h3>
            <p className="capability-desc">
              Configuring modern CI/CD pipelines, custom DNS domains, edge delivery, and production optimization for rapid global access.
            </p>
            <div className="capability-tags">
              <span className="cap-tag">CI/CD</span>
              <span className="cap-tag">Edge Routing</span>
              <span className="cap-tag">DNS/CNAME</span>
              <span className="cap-tag">Docker</span>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Skills from Database */}
      {skillsList.length > 0 && (
        <section className="section-wrapper" style={{ padding: '0 0 60px' }}>
          <div className="section-head">
            <div>
              <div className="section-eyebrow">Verified Tech Ecosystem</div>
              <h2 className="section-title">Technical Competencies ({skillsList.length})</h2>
              <p className="section-subtitle">Verified frameworks, languages, and protocols used across active projects.</p>
            </div>
          </div>

          <div className="tech-chips-grid">
            {skillsList.map(skill => (
              <span key={skill} className="tech-chip">
                <span className="chip-dot" />
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Navigation CTA */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link href="/products" className="btn-primary-glow">
          Explore Deployed Products <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
