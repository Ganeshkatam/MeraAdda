'use client';

import React, { useState, useEffect, useActionState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Code2,
  Copy,
  Cpu,
  ExternalLink,
  Github,
  Globe,
  Laptop,
  LayoutDashboard,
  Linkedin,
  LogOut,
  Mail,
  Menu,
  Monitor,
  Moon,
  Pencil,
  Plus,
  Search,
  Send,
  Settings,
  Sparkles,
  Sun,
  Terminal,
  Trash2,
  X
} from 'lucide-react';
import { submitContactMessage, submitGuestbookEntry } from '../app/actions';
import { apiClient } from '../lib/api-client';

const defaultProjects = [
  {
    id: 1,
    name: 'BookGarden',
    category: 'WEB APPS',
    description: 'An elegant digital book sanctuary and reading library companion. Features distraction-free reading, progress tracking, and personal bookshelves living on the TomeSphere network.',
    url: 'bookgarden.tomesphere.in',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=85',
    accent: 'lavender',
    featured: true,
    status: 'Live',
    year: '2026',
    tags: ['Next.js', 'React', 'Supabase', 'TypeScript', 'EPUB/PDF']
  },
  {
    id: 2,
    name: 'Focusmate Hub',
    category: 'PRODUCTIVITY',
    description: 'A quieter, mindful workspace designed to build intentional flow states with structured pomodoro cadence and ambient soundscapes.',
    url: 'focusmate.app',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1100&q=85',
    accent: 'peach',
    featured: true,
    status: 'Live',
    year: '2025',
    tags: ['React', 'TypeScript', 'Web Audio API']
  },
  {
    id: 3,
    name: 'HyperSync Engine',
    category: 'DEVELOPER TOOLS',
    description: 'High-performance real-time data synchronization pipeline and developer toolkit for low-latency state hydration across distributed clients.',
    url: 'hypersync.dev',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1100&q=85',
    accent: 'blue',
    featured: true,
    status: 'Live',
    year: '2025',
    tags: ['Node.js', 'WebSockets', 'PostgreSQL', 'Redis']
  },
  {
    id: 4,
    name: 'Zenith Finance',
    category: 'FINANCE',
    description: 'A transparent, human-centered wealth visualization dashboard with multi-currency tracking, real-time charts, and financial milestone forecasting.',
    url: 'zenith.money',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1100&q=85',
    accent: 'mint',
    featured: false,
    status: 'Live',
    year: '2024',
    tags: ['React', 'Vite', 'ChartJS', 'Finance API']
  },
  {
    id: 5,
    name: 'Aether Component System',
    category: 'DEVELOPER TOOLS',
    description: 'An accessible, production-ready component library built with modern CSS custom properties, accessible ARIA primitives, and fluid micro-interactions.',
    url: 'aether.ui',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1100&q=85',
    accent: 'yellow',
    featured: false,
    status: 'In progress',
    year: '2025',
    tags: ['Design System', 'Accessibility', 'CSS3']
  },
  {
    id: 6,
    name: 'Sunday Table',
    category: 'COMMUNITY',
    description: 'A neighborhood culinary collective connecting home chefs and food enthusiasts to organize intimate communal dining pop-ups.',
    url: 'sundaytable.co',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1100&q=85',
    accent: 'rose',
    featured: false,
    status: 'In progress',
    year: '2025',
    tags: ['React', 'Maps API', 'Community']
  }
];

const defaultProfile = {
  name: 'Katam Ganesh Reddy',
  title: 'Full-Stack Developer · Independent Builder',
  location: 'India',
  domain: 'tomesphere.in',
  libraryUrl: 'bookgarden.tomesphere.in',
  email: 'katamganesh61@gmail.com',
  intro: 'Welcome to TomeSphere — my digital hub to explore all my software products, technical architecture, and background. Check out BookGarden, my digital book library hosted at bookgarden.tomesphere.in.',
  socials: {
    github: 'github.com/Ganeshkatam',
    linkedin: 'linkedin.com/in/ganeshkatam'
  }
};

const initialGuestbook = [
  {
    id: 'gb_1',
    author: 'Elena R.',
    message: 'TomeSphere looks incredible! The reading interface is so calm and distraction-free.',
    timestamp: 'Oct 22, 2026'
  },
  {
    id: 'gb_2',
    author: 'Dev Community Member',
    message: 'Love the clean full-stack architecture and terminal dossier. Excited to see what else you build!',
    timestamp: 'Oct 23, 2026'
  }
];

const techStack = [
  'Next.js 16',
  'React 19',
  'TypeScript',
  'Server Actions',
  'Node.js',
  'PostgreSQL',
  'Supabase',
  'Tailwind CSS',
  'Vite',
  'Docker',
  'REST & GraphQL',
  'Git'
];

export default function PortfolioClient({
  initialRepos = [],
  initialProjects = defaultProjects,
  initialProfile = defaultProfile,
  initialGuestbook: initialGb = initialGuestbook
}) {
  const [theme, setTheme] = useState('dark');
  const [products, setProducts] = useState(initialProjects);
  const [profile, setProfile] = useState(initialProfile);
  const [view, setView] = useState('home');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Overview');
  const [guestbook, setGuestbook] = useState(initialGb);

  const [contactState, contactAction, contactPending] = useActionState(submitContactMessage, null);
  const [gbState, gbAction, gbPending] = useActionState(submitGuestbookEntry, null);

  const [terminalHistory, setTerminalHistory] = useState([
    { cmd: 'whoami', output: 'Katam Ganesh Reddy — Full-Stack Developer & Independent Builder' },
    { cmd: 'server', output: 'Next.js App Router (Full-Stack Dynamic Engine) hosted on Vercel' },
    { cmd: 'domain', output: 'tomesphere.in' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');

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
    navigator.clipboard.writeText(profile.email);
    showToast(`Copied ${profile.email} to clipboard!`);
  };

  const categories = ['ALL', ...new Set(products.map(p => p.category))];

  const visibleProjects = products.filter(p => {
    const matchesFilter = activeFilter === 'ALL' || p.category === activeFilter;
    const matchesSearch = `${p.name} ${p.category} ${p.description} ${(p.tags || []).join(' ')}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const flagshipProject = products.find(p => p.name === 'BookGarden') || products.find(p => p.name === 'TomeSphere') || products[0];

  const handleCommand = (cmdText) => {
    const clean = (cmdText || terminalInput).trim().toLowerCase();
    let res = '';
    if (clean === 'help') {
      res = 'Available commands: whoami, bio, skills, projects, flagship, library, tomesphere, live, contact, clear';
    } else if (clean === 'whoami') {
      res = `${profile.name} (${profile.title}) based in ${profile.location}`;
    } else if (clean === 'bio') {
      res = profile.intro;
    } else if (clean === 'tomesphere') {
      res = 'TomeSphere (tomesphere.in) — The digital product hub and engineering portfolio of Katam Ganesh Reddy.';
    } else if (clean === 'library' || clean === 'bookgarden') {
      res = 'BookGarden (bookgarden.tomesphere.in) — The digital book sanctuary and library companion.';
    } else if (clean === 'flagship') {
      res = `BookGarden -> https://${flagshipProject.url} : ${flagshipProject.description}`;
    } else if (clean === 'skills') {
      res = techStack.join(' · ');
    } else if (clean === 'projects') {
      res = products.map(p => `${p.name} [${p.status}] - ${p.category} (${p.url})`).join('\n');
    } else if (clean === 'live') {
      res = `Live Repos: ${initialRepos.length} discovered on GitHub. Server status: Dynamic full-stack Next.js on Vercel.`;
    } else if (clean === 'contact') {
      res = `Email: ${profile.email}\nGitHub: https://${profile.socials.github}\nLinkedIn: https://${profile.socials.linkedin}`;
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

  const monogram = profile.name
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const openEditor = (item) => {
    setActiveModal({
      type: 'product',
      item: item || {
        id: Date.now(),
        name: '',
        category: 'WEB APPS',
        description: '',
        url: '',
        image: '',
        accent: 'lavender',
        featured: true,
        status: 'Live',
        year: '2026',
        tags: ['React', 'TypeScript']
      }
    });
  };

  const saveProduct = async (item) => {
    try {
      const exists = products.some(p => String(p.id) === String(item.id));
      let saved;
      if (exists) {
        saved = await apiClient.projects.update(item.id, item);
      } else {
        saved = await apiClient.projects.create(item);
      }
      const finalItem = saved || item;
      const updated = exists
        ? products.map(p => (String(p.id) === String(item.id) ? finalItem : p))
        : [finalItem, ...products];
      setProducts(updated);
      setActiveModal(null);
      showToast('Project saved to backend successfully');
    } catch (err) {
      const updated = products.some(p => String(p.id) === String(item.id))
        ? products.map(p => (String(p.id) === String(item.id) ? item : p))
        : [item, ...products];
      setProducts(updated);
      setActiveModal(null);
      showToast(err.message || 'Saved locally');
    }
  };

  const removeProduct = async (id) => {
    if (!window.confirm('Delete this project from your portfolio?')) return;
    try {
      await apiClient.projects.delete(id);
      setProducts(prev => prev.filter(p => String(p.id) !== String(id)));
      showToast('Project removed from backend');
    } catch (err) {
      setProducts(prev => prev.filter(p => String(p.id) !== String(id)));
      showToast(err.message || 'Project removed');
    }
  };

  const handleProfileSave = async (updatedProfile) => {
    try {
      const res = await apiClient.profile.update(updatedProfile || profile);
      if (res) setProfile(res);
      showToast('Profile updated on backend successfully');
    } catch (err) {
      showToast(err.message || 'Profile saved');
    }
  };

  if (view === 'admin') {
    return (
      <StudioDashboard
        products={products}
        profile={profile}
        setProfile={setProfile}
        setView={setView}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        openEditor={openEditor}
        activeModal={activeModal}
        closeModal={() => setActiveModal(null)}
        saveProduct={saveProduct}
        removeProduct={removeProduct}
        showToast={showToast}
        toastMessage={toastMessage}
        theme={theme}
        toggleTheme={toggleTheme}
        onSaveProfile={handleProfileSave}
      />
    );
  }

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
          <a href="#flagship" className="nav-link">TomeSphere</a>
          <a href="#live-activity" className="nav-link">Live Repos</a>
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
            className="btn-pill-studio"
            onClick={() => {
              setView('admin');
              window.scrollTo(0, 0);
            }}
          >
            <LayoutDashboard size={14} /> Studio Control
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
        <section className="hero-section">
          <div className="badge-beacon">
            <span className="beacon-dot" />
            <span>Full-Stack Dynamic App · Next.js &amp; Server Actions</span>
          </div>

          <h1 className="hero-title">
            Crafting digital products at the intersection of <span className="hero-gradient-text">design &amp; systems.</span>
          </h1>

          <p className="hero-description">
            Hello, I am <strong>{profile.name}</strong>. I design and engineer modern web applications, distributed digital systems, and
            delightful interfaces powered by full-stack architectures.
          </p>

          <div className="hero-cta-group">
            <a href="#work" className="btn-primary-glow">
              Explore Selected Work <ArrowDown size={16} />
            </a>
            <button onClick={copyEmail} className="btn-secondary-glass">
              <Copy size={15} /> Copy Contact Email
            </button>
            <a
              href={`https://${profile.socials.github}`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary-glass"
            >
              <Github size={15} /> GitHub <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="hero-stats-banner">
            <div className="hero-stat-card">
              <div className="stat-header">
                <Laptop size={13} /> Active Projects
              </div>
              <div className="stat-value">{String(products.length).padStart(2, '0')}</div>
              <div className="stat-subtext">Catalogued applications</div>
            </div>
            <div className="hero-stat-card">
              <div className="stat-header">
                <Globe size={13} /> Live Deployment
              </div>
              <div className="stat-value">{profile.domain}</div>
              <div className="stat-subtext">Verified custom domain on Vercel</div>
            </div>
            <div className="hero-stat-card">
              <div className="stat-header">
                <Cpu size={13} /> Runtime Engine
              </div>
              <div className="stat-value">Next.js 16</div>
              <div className="stat-subtext">Server Actions &amp; React 19</div>
            </div>
          </div>
        </section>

        {/* Tech Marquee */}
        <section className="tech-marquee-wrapper">
          <div className="tech-marquee-label">Full-Stack Tech Ecosystem</div>
          <div className="tech-chips-grid">
            {techStack.map(tech => (
              <span key={tech} className="tech-chip">
                <span className="chip-dot" />
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Flagship Project: BookGarden Library */}
        <section id="flagship" className="section-wrapper">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">Flagship Library Application</div>
              <h2 className="section-title">BookGarden — The Digital Book Sanctuary</h2>
              <p className="section-subtitle">
                The reading companion and digital book sanctuary living at <strong>bookgarden.tomesphere.in</strong>.
              </p>
            </div>
          </div>

          <div className="flagship-card">
            <div className="flagship-glow-bg" />
            <div>
              <div className="flagship-badge">
                <Sparkles size={12} /> FEATURED LIBRARY SANCTUARY
              </div>
              <h3 className="flagship-title">BookGarden</h3>
              <div className="flagship-domain">
                <Globe size={14} /> bookgarden.tomesphere.in
              </div>
              <p className="flagship-desc">{flagshipProject.description}</p>
              <div className="flagship-tags">
                {(flagshipProject.tags || ['Next.js', 'React', 'Supabase', 'TypeScript', 'EPUB/PDF']).map(t => (
                  <span key={t} className="flagship-tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flagship-actions">
                <a
                  href="https://bookgarden.tomesphere.in"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary-glow"
                >
                  Launch BookGarden Library <ArrowUpRight size={16} />
                </a>
                <a
                  href={`https://${profile.socials.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary-glass"
                >
                  <Github size={15} /> Source Code
                </a>
              </div>
            </div>

            <div className="flagship-visual">
              <img
                src={flagshipProject.image || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=85'}
                alt="BookGarden Digital Sanctuary"
                loading="lazy"
              />
            </div>
          </div>
        </section>

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
                <div className="card-media-wrapper">
                  <img src={project.image} alt={project.name} loading="lazy" />
                  <span className={`card-overlay-badge ${project.status === 'Live' ? 'badge-live' : 'badge-draft'}`}>
                    {project.status}
                  </span>
                </div>

                <div className="card-content-area">
                  <div className="card-meta-row">
                    <span className="card-category">{project.category}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="card-title">{project.name}</h3>
                  <p className="card-description">{project.description}</p>

                  <div className="card-footer-action">
                    <a
                      href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="card-link-preview"
                    >
                      Visit Website <ArrowUpRight size={13} />
                    </a>

                    <button
                      className="btn-secondary-glass"
                      style={{ padding: '6px 12px', fontSize: '11px' }}
                      onClick={() => openEditor(project)}
                      title="Edit in studio"
                    >
                      <Pencil size={12} /> Edit
                    </button>
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

        {/* Live GitHub Activity Stream */}
        <section id="live-activity" className="section-wrapper">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">Server-Side Dynamic Stream</div>
              <h2 className="section-title">Live GitHub Repositories</h2>
              <p className="section-subtitle">Real-time public code repositories fetched from GitHub API.</p>
            </div>
          </div>

          <div className="github-repos-grid">
            {initialRepos.length > 0 ? (
              initialRepos.map(repo => (
                <div key={repo.name} className="github-repo-card">
                  <div className="github-repo-name">
                    <Github size={16} /> {repo.name}
                  </div>
                  <div className="github-repo-desc">{repo.description}</div>
                  <div className="github-repo-meta">
                    <span>{repo.language}</span>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      View Code <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: 'var(--text-muted)', fontSize: '14px', gridColumn: '1 / -1' }}>
                Connected to GitHub API for {profile.socials.github}. Repositories hydrate dynamically.
              </div>
            )}
          </div>
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
                {['help', 'whoami', 'skills', 'flagship', 'live', 'contact', 'clear'].map(cmd => (
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

              <form action={gbAction}>
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
              {guestbook.map(entry => (
                <div key={entry.id} className="guestbook-entry">
                  <div className="guestbook-entry-header">
                    <span className="guestbook-author">{entry.author}</span>
                    <span>{entry.timestamp}</span>
                  </div>
                  <div className="guestbook-body">{entry.message}</div>
                </div>
              ))}
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
              <h3 className="capability-title">Backend &amp; Server Actions</h3>
              <p className="capability-desc">
                Designing resilient schemas, Server Actions, RESTful &amp; GraphQL endpoints, database subscriptions, and low-latency APIs.
              </p>
              <div className="capability-tags">
                <span className="cap-tag">Server Actions</span>
                <span className="cap-tag">PostgreSQL</span>
                <span className="cap-tag">Supabase</span>
                <span className="cap-tag">Node.js</span>
              </div>
            </div>

            <div className="capability-card">
              <div className="capability-icon-box">
                <BookOpen size={24} />
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
                <span className="cap-tag">Vercel</span>
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

              <form action={contactAction}>
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
          <a href={`https://${profile.socials.github}`} target="_blank" rel="noreferrer">
            <Github size={15} /> GitHub
          </a>
          <a href={`https://${profile.socials.linkedin}`} target="_blank" rel="noreferrer">
            <Linkedin size={15} /> LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>
            <Mail size={15} /> Email
          </a>
          <button
            onClick={() => {
              setView('admin');
              window.scrollTo(0, 0);
            }}
            style={{ color: 'var(--accent-primary)', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <LayoutDashboard size={13} /> Studio
          </button>
        </div>
      </footer>

      {/* Modal */}
      {activeModal && (
        <ProductModal
          item={activeModal.item}
          onClose={() => setActiveModal(null)}
          onSave={saveProduct}
        />
      )}

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

function StudioDashboard({
  products,
  profile,
  setProfile,
  setView,
  activeNav,
  setActiveNav,
  openEditor,
  activeModal,
  closeModal,
  saveProduct,
  removeProduct,
  showToast,
  toastMessage,
  theme,
  toggleTheme,
  onSaveProfile
}) {
  const liveCount = products.filter(p => p.status === 'Live').length;
  const featuredCount = products.filter(p => p.featured).length;

  return (
    <div className="studio-layout">
      <aside className="studio-sidebar">
        <div className="studio-sidebar-brand">
          <div className="brand-monogram" style={{ width: '32px', height: '32px', fontSize: '14px' }}>
            {profile.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>Studio Control</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{profile.domain}</div>
          </div>
        </div>

        <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '8px' }}>
          NAVIGATION
        </div>

        <nav className="studio-nav-list">
          <button
            className={`studio-nav-item ${activeNav === 'Overview' ? 'active' : ''}`}
            onClick={() => setActiveNav('Overview')}
          >
            <Monitor size={16} /> Overview
          </button>
          <button
            className={`studio-nav-item ${activeNav === 'Projects' ? 'active' : ''}`}
            onClick={() => setActiveNav('Projects')}
          >
            <Laptop size={16} /> Projects ({products.length})
          </button>
          <button
            className={`studio-nav-item ${activeNav === 'Settings' ? 'active' : ''}`}
            onClick={() => setActiveNav('Settings')}
          >
            <Settings size={16} /> Profile &amp; Domain
          </button>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            className="btn-secondary-glass"
            style={{ width: '100%', justifyContent: 'center', fontSize: '12px' }}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />} {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>

          <button
            className="btn-primary-glow"
            style={{ width: '100%', justifyContent: 'center', fontSize: '12px', padding: '10px' }}
            onClick={() => setView('home')}
          >
            <LogOut size={14} /> Back to Portfolio
          </button>
        </div>
      </aside>

      <main className="studio-main-panel">
        <div className="studio-topbar">
          <div>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', marginBottom: '4px' }}>
              STUDIO &gt; {activeNav.toUpperCase()}
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 700 }}>
              {activeNav === 'Overview'
                ? `Welcome back, ${profile.name.split(' ')[0]}`
                : activeNav === 'Projects'
                  ? 'Manage Portfolio Projects'
                  : 'Profile & Portfolio Settings'}
            </h1>
          </div>

          <button className="btn-primary-glow" onClick={() => openEditor(null)}>
            <Plus size={16} /> Add New Project
          </button>
        </div>

        {activeNav === 'Overview' && (
          <>
            <div className="studio-stats-grid">
              <div className="studio-stat-box">
                <div className="studio-stat-label">Total Projects</div>
                <div className="studio-stat-num">{String(products.length).padStart(2, '0')}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Registered in catalog</div>
              </div>
              <div className="studio-stat-box">
                <div className="studio-stat-label">Live on Web</div>
                <div className="studio-stat-num">{String(liveCount).padStart(2, '0')}</div>
                <div style={{ fontSize: '12px', color: 'var(--accent-emerald)' }}>Production ready</div>
              </div>
              <div className="studio-stat-box">
                <div className="studio-stat-label">Featured Work</div>
                <div className="studio-stat-num">{String(featuredCount).padStart(2, '0')}</div>
                <div style={{ fontSize: '12px', color: 'var(--accent-secondary)' }}>Showcased on main page</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700 }}>
                Recent Portfolio Projects
              </h2>
              <button
                style={{ fontSize: '12px', color: 'var(--accent-primary)', fontWeight: 600 }}
                onClick={() => setActiveNav('Projects')}
              >
                View all projects ({products.length}) &rarr;
              </button>
            </div>

            <div className="studio-table-card">
              {products.slice(0, 5).map(p => (
                <div key={p.id} className="studio-table-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{p.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{p.category}</div>
                    </div>
                  </div>
                  <div>
                    <span className={`card-overlay-badge ${p.status === 'Live' ? 'badge-live' : 'badge-draft'}`} style={{ position: 'static' }}>
                      {p.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{p.url}</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => openEditor(p)} className="btn-icon-round" style={{ width: '32px', height: '32px' }} title="Edit">
                      <Pencil size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeNav === 'Projects' && (
          <div className="studio-table-card">
            {products.map(p => (
              <div key={p.id} className="studio-table-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '15px' }}>{p.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '340px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p.description}
                    </div>
                  </div>
                </div>
                <div>
                  <span className={`card-overlay-badge ${p.status === 'Live' ? 'badge-live' : 'badge-draft'}`} style={{ position: 'static' }}>
                    {p.status}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{p.url}</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => openEditor(p)} className="btn-icon-round" style={{ width: '32px', height: '32px' }} title="Edit">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => removeProduct(p.id)} className="btn-icon-round" style={{ width: '32px', height: '32px' }} title="Delete">
                    <Trash2 size={13} style={{ color: 'var(--accent-rose)' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeNav === 'Settings' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
            <div className="studio-stat-box" style={{ padding: '28px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>
                Profile Identity
              </h3>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.name}
                  onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Professional Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.title}
                  onChange={e => setProfile(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Domain Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.domain || 'tomesphere.in'}
                  onChange={e => setProfile(prev => ({ ...prev, domain: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.location}
                  onChange={e => setProfile(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </div>

            <div className="studio-stat-box" style={{ padding: '28px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>
                Contact &amp; Social Links
              </h3>
              <div className="form-group">
                <label className="form-label">Contact Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={profile.email}
                  onChange={e => setProfile(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">GitHub URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.socials.github}
                  onChange={e =>
                    setProfile(prev => ({
                      ...prev,
                      socials: { ...prev.socials, github: e.target.value }
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label">LinkedIn URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.socials.linkedin}
                  onChange={e =>
                    setProfile(prev => ({
                      ...prev,
                      socials: { ...prev.socials, linkedin: e.target.value }
                    }))
                  }
                />
              </div>
              <button
                className="btn-primary-glow"
                style={{ width: '100%', justifyContent: 'center', marginTop: '14px' }}
                onClick={() => {
                  if (onSaveProfile) {
                    onSaveProfile(profile);
                  } else {
                    showToast('Profile details updated');
                  }
                }}
              >
                <Check size={16} /> Save Changes
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Studio Modal & Toast */}
      {activeModal && (
        <ProductModal
          item={activeModal.item}
          onClose={closeModal}
          onSave={saveProduct}
        />
      )}
      {toastMessage && (
        <div className="toast-container">
          <Check size={16} style={{ color: 'var(--accent-emerald)' }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

function ProductModal({ item, onClose, onSave }) {
  const [form, setForm] = useState(item);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      url: form.url.trim(),
      image: form.image.trim() || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=85'
    });
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog">
        <div className="modal-title-row">
          <h2 className="modal-title">{item.name ? 'Edit Project' : 'Add New Project'}</h2>
          <button className="btn-icon-round" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Project Name</label>
            <input
              type="text"
              required
              className="form-control"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. TomeSphere"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Website URL or Domain</label>
            <input
              type="text"
              required
              className="form-control"
              value={form.url}
              onChange={e => setForm({ ...form, url: e.target.value })}
              placeholder="e.g. tomesphere.in"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-control"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
            >
              <option value="WEB APPS">WEB APPS</option>
              <option value="PRODUCTIVITY">PRODUCTIVITY</option>
              <option value="DEVELOPER TOOLS">DEVELOPER TOOLS</option>
              <option value="FINANCE">FINANCE</option>
              <option value="COMMUNITY">COMMUNITY</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              <option value="Live">Live</option>
              <option value="In progress">In progress</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Short Description</label>
            <textarea
              required
              rows="3"
              className="form-control"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="What makes this project compelling?"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Preview Image URL</label>
            <input
              type="text"
              className="form-control"
              value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" className="btn-secondary-glass" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary-glow">
              <Check size={16} /> Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
