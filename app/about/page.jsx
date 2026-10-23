import React from 'react';
import Link from 'next/link';
import { Code2, Cpu, Compass, Globe, ArrowRight, ShieldCheck, Server, Database } from 'lucide-react';
import { apiClient } from '../../lib/api-client';

export const revalidate = 1800;

export const metadata = {
  title: 'Product Architecture & Systems Design — TomeSphere',
  description: 'Decoupled backend architecture, database authority boundaries, and engineering disciplines of the TomeSphere product ecosystem.'
};

export default async function AboutPage() {
  const [profile, skills] = await Promise.all([
    apiClient.profile.get().catch(() => null),
    apiClient.skills.list().catch(() => [])
  ]);

  const skillsList = Array.isArray(skills) ? skills.map(s => s.name || s) : [];
  const founderName = profile?.name || 'Katam Ganesh Reddy';

  return (
    <div className="page-wrapper">
      <div className="page-head">
        <div className="page-eyebrow">Studio Infrastructure</div>
        <h1 className="page-title">Product Architecture &amp; Design</h1>
        <p className="page-subtitle">
          How TomeSphere products are designed, decoupled, and deployed for high resilience, zero-leak database boundaries, and lightning-fast client execution.
        </p>
      </div>

      {/* Architectural Boundaries */}
      <section className="section-wrapper" style={{ padding: '0 0 60px' }}>
        <div className="section-head">
          <div>
            <div className="page-eyebrow">Authority &amp; Decoupling</div>
            <h2 className="section-title">Decoupled Architecture</h2>
            <p className="section-subtitle">
              Strict isolation between client interfaces and server-side database authority.
            </p>
          </div>
        </div>

        <div className="capabilities-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="capability-card">
            <div className="capability-icon-box" style={{ background: 'rgba(99, 102, 241, 0.12)', color: '#818cf8', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
              <Server size={24} />
            </div>
            <h3 className="capability-title">Standalone REST Server</h3>
            <p className="capability-desc">
              All data operations are exclusively managed by the standalone Express engine (<code>api.tomesphere.in</code>). It holds all database credentials, enforces input validation schemas, and exposes typed REST endpoints.
            </p>
            <div className="capability-tags">
              <span className="cap-tag">Express 5</span>
              <span className="cap-tag">Node.js</span>
              <span className="cap-tag">REST API</span>
            </div>
          </div>

          <div className="capability-card">
            <div className="capability-icon-box" style={{ background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 className="capability-title">Zero Client Database Leaks</h3>
            <p className="capability-desc">
              The frontend web application contains zero Supabase drivers, zero database connection strings, and zero secret keys. All requests flow through secure server boundaries and typed API clients.
            </p>
            <div className="capability-tags">
              <span className="cap-tag">Zero Secrets</span>
              <span className="cap-tag">HTTP-Only Auth</span>
              <span className="cap-tag">Safe Boundaries</span>
            </div>
          </div>

          <div className="capability-card">
            <div className="capability-icon-box" style={{ background: 'rgba(6, 182, 212, 0.12)', color: 'var(--accent-cyan)', borderColor: 'rgba(6, 182, 212, 0.3)' }}>
              <Database size={24} />
            </div>
            <h3 className="capability-title">Relational Supabase Core</h3>
            <p className="capability-desc">
              Relational data models in Supabase PostgreSQL enforce referential integrity, indexed querying, automated triggers, and transactional persistence across all TomeSphere products.
            </p>
            <div className="capability-tags">
              <span className="cap-tag">PostgreSQL</span>
              <span className="cap-tag">Supabase</span>
              <span className="cap-tag">Triggers &amp; RLS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Engineering Disciplines */}
      <section className="section-wrapper" style={{ padding: '0 0 60px' }}>
        <div className="section-head">
          <div>
            <div className="page-eyebrow">Disciplines</div>
            <h2 className="section-title">Core Engineering Pillars</h2>
            <p className="section-subtitle">Disciplines and technical crafts honed through shipping real production systems.</p>
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
              <span className="cap-tag">Next.js 16</span>
              <span className="cap-tag">React 19</span>
              <span className="cap-tag">TypeScript</span>
              <span className="cap-tag">Vanilla CSS</span>
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
              <div className="page-eyebrow">Verified Tech Ecosystem</div>
              <h2 className="section-title">Technical Competencies ({skillsList.length})</h2>
              <p className="section-subtitle">Verified frameworks, languages, and protocols powering active TomeSphere products.</p>
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

      {/* Founder & Engineering Credit */}
      <section className="section-wrapper" style={{ paddingBottom: '40px' }}>
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
                Founder and systems architect responsible for the architecture, implementation, and maintenance of all TomeSphere digital products and APIs.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn-primary-glow">
              Explore Products <ArrowRight size={14} />
            </Link>
            <Link href="/contact" className="btn-secondary-glass">
              Contact Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
