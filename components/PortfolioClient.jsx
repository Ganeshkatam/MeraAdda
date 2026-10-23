'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Compass,
  Copy,
  Cpu,
  ExternalLink,
  Github,
  Globe,
  Layers,
  Linkedin,
  Mail,
  Menu,
  Monitor,
  Moon,
  Search,
  Send,
  Server,
  Sun,
  Terminal,
  X,
  Zap
} from 'lucide-react';
import { apiClient } from '../lib/api-client';


export default function PortfolioClient({
  initialProjects = [],
  initialProfile = null,
  initialGuestbook = [],
  initialSkills = []
}) {
  const [theme, setTheme] = useState('dark');
  const [products, setProducts] = useState(initialProjects || []);
  const [profile, setProfile] = useState(initialProfile);
  const [skillsList, setSkillsList] = useState(initialSkills || []);
  const [guestbook, setGuestbook] = useState(initialGuestbook || []);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [contactState, setContactState] = useState(null);
  const [contactPending, setContactPending] = useState(false);
  const [gbState, setGbState] = useState(null);
  const [gbPending, setGbPending] = useState(false);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [heroMouse, setHeroMouse] = useState({ x: '50%', y: '25%' });

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHeroMouse({ x: `${x.toFixed(1)}%`, y: `${y.toFixed(1)}%` });
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
      setGbState({ success: true, entry: res });
      setGuestbook(prev => [res, ...prev]);
      showToast('Guestbook entry posted successfully!');
      e.target.reset();
    } catch (err) {
      setGbState({ error: err.message || 'Failed to post guestbook entry.' });
    } finally {
      setGbPending(false);
    }
  };

  const [terminalHistory, setTerminalHistory] = useState([
    { cmd: 'help', output: 'Available commands: whoami, bio, skills, projects, contact, clear' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  useEffect(() => {
    // If SSR did not populate data, hydrate from live API client
    if (products.length === 0 || !profile || skillsList.length === 0) {
      Promise.all([
        apiClient.projects.list().catch(() => []),
        apiClient.profile.get().catch(() => null),
        apiClient.skills.list().catch(() => []),
        apiClient.guestbook.list(20).catch(() => [])
      ]).then(([p, prof, sk, gb]) => {
        if (p && p.length > 0) setProducts(p);
        if (prof) setProfile(prof);
        if (sk && sk.length > 0) setSkillsList(sk.map(s => s.name || s));
        if (gb && gb.length > 0) setGuestbook(gb);
      });
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('site-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    if (gbState?.success && gbState?.entry) {
      setGuestbook(prev => [gbState.entry, ...prev]);
      setToastMessage('Guestbook entry posted successfully!');
      setTimeout(() => setToastMessage(''), 2800);
    }
  }, [gbState]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('site-theme', next);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2800);
  };

  const copyEmail = () => {
    const emailToCopy = profile?.email || 'katamganesh61@gmail.com';
    navigator.clipboard.writeText(emailToCopy);
    setCopiedEmail(true);
    showToast(`Copied ${emailToCopy} to clipboard!`);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const categories = ['ALL', ...new Set(products.map(p => p.category))];

  const visibleProjects = products.filter(p => {
    const matchesFilter = activeFilter === 'ALL' || p.category === activeFilter;
    const matchesSearch = `${p.name} ${p.category} ${p.description} ${(p.tags || []).join(' ')}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCommand = (cmdText) => {
    const clean = (cmdText || terminalInput).trim().toLowerCase();
    let res = '';
    if (clean === 'help') {
      res = 'Available commands: whoami, bio, skills, projects, contact, clear';
    } else if (clean === 'whoami') {
      res = `${profile?.name || 'Katam Ganesh Reddy'} (${profile?.title || 'Full-Stack Developer'}) based in ${profile?.location || 'India'}`;
    } else if (clean === 'bio') {
      res = profile?.intro || profile?.bio || 'Full-stack software engineer and systems builder.';
    } else if (clean === 'skills') {
      res = skillsList.length > 0 ? skillsList.join(' · ') : 'Loading verified skills...';
    } else if (clean === 'projects') {
      res = products.length > 0 ? products.map(p => `${p.name} [${p.status}] - ${p.category} (${p.url})`).join('\n') : 'No projects loaded.';
    } else if (clean === 'contact') {
      res = `Email: ${profile?.email || 'katamganesh61@gmail.com'}\nLinkedIn: https://${profile?.socials?.linkedin || 'linkedin.com/in/ganeshkatam'}`;
    } else if (clean === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else {
      res = `Command not recognized: "${clean}". Type 'help' for available commands.`;
    }
    setTerminalHistory(prev => [...prev, { cmd: clean, output: res }]);
    setTerminalInput('');
  };

  const monogram = (profile?.name || 'Katam Ganesh Reddy')
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();


  return (
    <div className="site-layout">
      {/* Navigation */}
      <header className="site-header">
        <div className="brand-wrapper">
          <a href="#top" className="brand-monogram">
            {monogram}
          </a>
          <div>
            <div className="brand-name">{profile.name}</div>
            <div className="brand-tag">{profile.domain}</div>
          </div>
        </div>

        <nav className="nav-desktop">
          <a href="#work" className="nav-link">Work</a>
          <a href="#terminal" className="nav-link">Terminal</a>
          <a href="#guestbook" className="nav-link">Guestbook</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        <div className="nav-actions">
          <button
            className="btn-icon-round"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>


          <button
            className="btn-icon-round btn-menu-mobile"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <main id="top">
        {/* Hero Section */}
        {/* Hero Section - Redesigned with Centered Architectural Harmony & Interactive Bento Grid */}
        <section
          className="hero-section"
          onMouseMove={handleHeroMouseMove}
          style={{
            '--mouse-x': heroMouse.x,
            '--mouse-y': heroMouse.y
          }}
        >
          {/* Ambient Lighting & Interactive Cursor Spotlight */}
          <div className="hero-cosmic-glow" aria-hidden="true">
            <div className="hero-cursor-spotlight" />
            <div className="cosmic-orb orb-1" />
            <div className="cosmic-orb orb-2" />
            <div className="hero-grid-mesh" />
          </div>

          <div className="hero-container-centered">
            {/* Headline */}
            <h1 className="hero-title-centered hero-fade-in-1">
              Crafting digital products at the intersection of{' '}
              <span className="hero-gradient-text hero-shimmer-text">
                systems, architecture &amp; craft.
              </span>
            </h1>

            {/* Subtitle / Bio */}
            <p className="hero-description-centered hero-fade-in-3">
              Hello, I am <strong>{profile?.name || 'Katam Ganesh Reddy'}</strong>. {profile?.bio || profile?.intro || 'Software engineer and independent builder creating modern web applications, real-time interactive systems, developer tools, and distributed architecture.'}
            </p>

            {/* Action Buttons */}
            <div className="hero-cta-group-centered hero-fade-in-4">
              <a href="#work" className="btn-primary-glow hero-btn-magnetic">
                Explore Selected Work <ArrowDown size={16} className="btn-icon-bounce" />
              </a>
              <button onClick={copyEmail} className="btn-secondary-glass">
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
              {profile.socials?.github && (
                <a
                  href={`https://${profile.socials.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary-glass"
                >
                  <Github size={15} /> GitHub <ArrowUpRight size={14} />
                </a>
              )}
              {profile.socials?.linkedin && (
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

            {/* Hero Interactive Bento Showcase (Holistic Engineering Pillars) */}
            <div className="hero-bento-grid hero-fade-in-5">
              <a href="#terminal" className="hero-bento-card">
                <div className="bento-card-header">
                  <div className="bento-icon-box bento-icon-lavender">
                    <Server size={18} />
                  </div>
                  <span className="bento-badge-pill">System Design</span>
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
                    Inspect Dossier <ArrowDown size={14} />
                  </span>
                </div>
              </a>

              <a href="#work" className="hero-bento-card">
                <div className="bento-card-header">
                  <div className="bento-icon-box bento-icon-emerald">
                    <Globe size={18} />
                  </div>
                  <span className="bento-badge-pill bento-pill-live">
                    <span className="sat-dot sat-emerald" /> {String(products.length || 7).padStart(2, '0')} Systems
                  </span>
                </div>
                <div className="bento-card-body">
                  <h3 className="bento-card-title">Deployed Applications</h3>
                  <div className="bento-card-sub">Web Apps, DevTools &amp; Platforms</div>
                  <p className="bento-card-desc">
                    Diverse product catalog spanning web apps, real-time collaboration platforms, mobile utilities, and developer CLIs.
                  </p>
                </div>
                <div className="bento-card-footer">
                  <span className="bento-action-link">
                    Explore Full Work <ArrowDown size={14} />
                  </span>
                </div>
              </a>

              <a href="#capabilities" className="hero-bento-card">
                <div className="bento-card-header">
                  <div className="bento-icon-box bento-icon-cyan">
                    <Cpu size={18} />
                  </div>
                  <span className="bento-badge-pill">Live Stack</span>
                </div>
                <div className="bento-card-body">
                  <h3 className="bento-card-title">{String(skillsList.length || 12).padStart(2, '0')} Verified Technologies</h3>
                  <div className="bento-card-sub">Modern Engineering Stack</div>
                  <p className="bento-card-desc">
                    Engineered using Next.js 16, React 19, TypeScript, Node.js, PostgreSQL, Supabase, WebSockets, and Docker.
                  </p>
                </div>
                <div className="bento-card-footer">
                  <span className="bento-action-link">
                    View Pillars <ArrowDown size={14} />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Tech Marquee */}
        {skillsList.length > 0 && (
          <section className="tech-marquee-wrapper">
            <div className="tech-marquee-label">Full-Stack Tech Ecosystem</div>
            <div className="tech-chips-grid">
              {skillsList.map(tech => (
                <span key={tech} className="tech-chip">
                  <span className="chip-dot" />
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}



        {/* Selected Work Portfolio Grid */}
        <section id="work" className="section-wrapper">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">Interactive Catalog</div>
              <h2 className="section-title">Selected Work ({products.length})</h2>
              <p className="section-subtitle">Web apps, developer tools, and digital experiments.</p>
            </div>
          </div>

          <div className="projects-filter-bar">
            <div className="filter-pills">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-pill ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  <span>{cat}</span>
                  <span className="pill-count">
                    {cat === 'ALL' ? products.length : products.filter(p => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>

            <div className="search-input-wrapper">
              <Search size={14} />
              <input
                type="text"
                className="search-field"
                placeholder="Search projects or tags..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="projects-masonry">
            {visibleProjects.map(project => (
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

          {visibleProjects.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              No projects found matching that filter or search term.
            </div>
          )}
        </section>



        {/* Interactive Terminal Shell */}
        <section id="terminal" className="section-wrapper">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">Interactive Shell</div>
              <h2 className="section-title">Developer Dossier</h2>
              <p className="section-subtitle">Type commands to inspect technical stack, background, and server specs.</p>
            </div>
          </div>

          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot dot-red" />
                <span className="terminal-dot dot-yellow" />
                <span className="terminal-dot dot-green" />
              </div>
              <div className="terminal-title">guest@tomesphere: ~</div>
              <Terminal size={14} style={{ color: 'var(--text-muted)' }} />
            </div>

            <div className="terminal-body">
              {terminalHistory.map((item, index) => (
                <div key={index} style={{ marginBottom: '12px' }}>
                  <div className="term-line">
                    <span className="term-prompt">visitor@tomesphere:~$</span>
                    <span className="term-cmd">{item.cmd}</span>
                  </div>
                  <div className="term-output" style={{ whiteSpace: 'pre-wrap' }}>
                    {item.output}
                  </div>
                </div>
              ))}

              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (terminalInput.trim()) handleCommand(terminalInput);
                }}
                className="term-line"
                style={{ marginTop: '12px' }}
              >
                <span className="term-prompt">visitor@tomesphere:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={e => setTerminalInput(e.target.value)}
                  placeholder="Type 'help', 'skills', 'live', 'projects'..."
                  style={{
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    flex: 1
                  }}
                />
              </form>

              <div className="term-quick-btns">
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', alignSelf: 'center', marginRight: '6px' }}>
                  Quick commands:
                </span>
                {['help', 'whoami', 'skills', 'projects', 'contact', 'clear'].map(cmd => (
                  <button key={cmd} type="button" className="term-btn" onClick={() => handleCommand(cmd)}>
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Guestbook (Powered by Server Action) */}
        <section id="guestbook" className="section-wrapper">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">Real-Time Community</div>
              <h2 className="section-title">Visitor Guestbook</h2>
              <p className="section-subtitle">Leave a quick note on tomesphere.in powered by Next.js Server Actions.</p>
            </div>
          </div>

          <div className="guestbook-wrapper">
            <div className="guestbook-form-card">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, marginBottom: '14px' }}>
                Sign the Guestbook
              </h3>

              {gbState?.error && <div className="form-alert-error">{gbState.error}</div>}
              {gbState?.success && (
                <div className="form-alert-success">
                  <Check size={14} /> Entry posted dynamically!
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
        </section>

        {/* Core Capabilities */}
        <section id="capabilities" className="section-wrapper">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">Engineering Pillars</div>
              <h2 className="section-title">Core Capabilities</h2>
              <p className="section-subtitle">Disciplines and technical crafts honed through building.</p>
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
                Designing resilient schemas, RESTful &amp; GraphQL endpoints, real-time event streams, and high-performance services.
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

        {/* Dynamic Contact Form (Server Action Backed) */}
        <section id="contact" className="contact-cta-section">
          <div style={{ flex: '1', minWidth: '280px' }}>
            <div className="section-eyebrow" style={{ color: 'var(--accent-primary)' }}>
              Let&apos;s Connect
            </div>
            <h2 className="contact-cta-title">Have an ambitious project in mind?</h2>
            <p className="contact-cta-subtitle" style={{ marginBottom: '20px' }}>
              Send a direct message through this dynamic endpoint or reach out via email.
            </p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button onClick={copyEmail} className="btn-copy-email">
                <Copy size={16} /> {profile.email}
              </button>
              <a href={`mailto:${profile.email}`} className="btn-secondary-glass">
                <Mail size={16} /> Open Mail Client
              </a>
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '320px', maxWidth: '480px' }}>
            <div className="guestbook-form-card">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>
                Direct Server Message
              </h3>

              {contactState?.error && <div className="form-alert-error">{contactState.error}</div>}
              {contactState?.success && (
                <div className="form-alert-success">
                  <Check size={14} /> {contactState.message}
                </div>
              )}

              <form onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-control"
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="form-control"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    rows="3"
                    required
                    className="form-control"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={contactPending}
                  className="btn-primary-glow"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {contactPending ? 'Submitting...' : <><Send size={15} /> Send Dynamic Message</>}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-monogram" style={{ width: '28px', height: '28px', fontSize: '13px' }}>
            {monogram}
          </span>
          <span>{profile.name} — {profile.domain}</span>
        </div>

        <div className="footer-social-links">
          <a href={`https://${profile.socials.linkedin}`} target="_blank" rel="noreferrer">
            <Linkedin size={15} /> LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>
            <Mail size={15} /> Email
          </a>
        </div>
      </footer>

      {/* Toast */}
      {toastMessage && (
        <div className="toast-container">
          <Check size={16} style={{ color: 'var(--accent-emerald)' }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}




