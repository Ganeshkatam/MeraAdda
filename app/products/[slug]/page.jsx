import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowUpRight,
  Globe,
  Github,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { apiClient } from '../../../lib/api-client.js';

export const revalidate = 1800;

async function getProduct(slug) {
  if (!slug) return null;
  try {
    const project = await apiClient.projects.get(slug);
    if (project) return project;
  } catch {
    // Fall back to server service directly if API client request fails
  }

  try {
    const { projectService } = await import('../../../server/services/project.service.js');
    return await projectService.getProjectById(slug);
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const projects = await apiClient.projects.list();
    return (projects || []).map((p) => ({
      slug: p.slug || p.id,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProduct(slug);

  if (!project) {
    return {
      title: 'Product Not Found — TomeSphere',
      description: 'The requested product could not be found in the TomeSphere directory.'
    };
  }

  const title = `${project.name} — TomeSphere Digital Product`;
  const description = project.tagline || project.description || `Explore ${project.name} on the TomeSphere platform.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.tomesphere.in/products/${project.slug || project.id}`,
      type: 'website'
    }
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const project = await getProduct(slug);

  if (!project) {
    notFound();
  }

  // Format destination URL
  const launchHref = project.url?.startsWith('http') ? project.url : `https://${project.url}`;
  const displayUrl = project.url?.replace(/^https?:\/\//, '') || '';

  // Get related products for ecosystem navigation
  let relatedProducts = [];
  try {
    const all = await apiClient.projects.list();
    relatedProducts = (all || [])
      .filter(p => (p.slug || p.id) !== (project.slug || project.id))
      .slice(0, 3);
  } catch {
    relatedProducts = [];
  }

  return (
    <div className="page-wrapper product-detail-page">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="detail-breadcrumb">
        <Link href="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator" aria-hidden="true">/</span>
        <Link href="/products" className="breadcrumb-link">Products</Link>
        <span className="breadcrumb-separator" aria-hidden="true">/</span>
        <span className="breadcrumb-current" aria-current="page">{project.name}</span>
      </nav>

      {/* Product Hero Header */}
      <header className="product-detail-header">
        <div className="product-header-badge-row">
          <span className={`card-status-badge ${project.status === 'Live' ? 'badge-live' : 'badge-draft'}`}>
            <span className="status-indicator-dot" />
            {project.status}
          </span>
          <span className="card-category-badge">{project.category}</span>
          {project.year && (
            <span className="detail-meta-pill">
              <Calendar size={12} /> {project.year}
            </span>
          )}
        </div>

        <h1 className="product-detail-title">{project.name}</h1>
        {project.tagline && (
          <p className="product-detail-tagline">{project.tagline}</p>
        )}

        <div className="product-header-actions">
          <a
            href={launchHref}
            target="_blank"
            rel="noreferrer"
            className="btn-primary-glow btn-launch-highlight"
          >
            Launch Application <ArrowUpRight size={16} />
          </a>
          <Link href="/products" className="btn-secondary-glass">
            <ArrowLeft size={15} /> All Products
          </Link>
        </div>
      </header>

      {/* Main Detail Two-Column Content Grid */}
      <div className="product-detail-grid">
        {/* Left Column: Product Information & Architecture */}
        <div className="detail-primary-content">
          <section className="detail-panel">
            <h2 className="detail-panel-title">Overview &amp; Purpose</h2>
            <p className="detail-panel-description">{project.description}</p>
          </section>

          {project.tags && project.tags.length > 0 && (
            <section className="detail-panel">
              <h2 className="detail-panel-title">Technologies &amp; Architecture</h2>
              <div className="detail-tags-wrap">
                {project.tags.map((tag) => (
                  <span key={tag} className="detail-tech-badge">
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section className="detail-panel">
            <h2 className="detail-panel-title">Product Specification</h2>
            <dl className="detail-specs-list">
              <div className="spec-item">
                <dt className="spec-label">Category</dt>
                <dd className="spec-value">{project.category}</dd>
              </div>
              <div className="spec-item">
                <dt className="spec-label">Canonical Identifier</dt>
                <dd className="spec-value spec-mono">{project.slug || project.id}</dd>
              </div>
              <div className="spec-item">
                <dt className="spec-label">Operational Status</dt>
                <dd className="spec-value">
                  <span className={`card-status-badge ${project.status === 'Live' ? 'badge-live' : 'badge-draft'}`}>
                    <span className="status-indicator-dot" />
                    {project.status}
                  </span>
                </dd>
              </div>
              <div className="spec-item">
                <dt className="spec-label">Target Domain</dt>
                <dd className="spec-value">
                  <a href={launchHref} target="_blank" rel="noreferrer" className="spec-link">
                    <Globe size={13} /> {displayUrl}
                  </a>
                </dd>
              </div>
            </dl>
          </section>
        </div>

        {/* Right Column: Launch Action & Application Boundary Card */}
        <aside className="detail-sidebar-content">
          <div className="detail-launch-card">
            <div className="launch-card-header">
              <div className="launch-icon-container">
                <Globe size={22} />
              </div>
              <div>
                <h3 className="launch-card-title">Live Application</h3>
                <span className="launch-card-sub">Independent Platform</span>
              </div>
            </div>

            <p className="launch-card-explanation">
              This application is independently deployed and maintained within the TomeSphere product ecosystem. Launching will direct you to its production domain.
            </p>

            <a
              href={launchHref}
              target="_blank"
              rel="noreferrer"
              className="btn-primary-glow launch-block-btn"
            >
              Launch {project.name} <ArrowUpRight size={15} />
            </a>

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary-glass launch-source-btn"
              >
                <Github size={15} /> View Source Code
              </a>
            )}

            <div className="launch-notice-row">
              <ShieldCheck size={13} />
              <span>Verified TomeSphere Product</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Ecosystem Navigation: Related Products */}
      {relatedProducts.length > 0 && (
        <section className="detail-related-section">
          <div className="section-head">
            <div>
              <div className="page-eyebrow">TomeSphere Studio</div>
              <h2 className="section-title">Explore Other Products</h2>
              <p className="section-subtitle">
                Discover more purposeful software developed under the TomeSphere umbrella.
              </p>
            </div>
            <Link href="/products" className="btn-secondary-glass">
              All Products ({relatedProducts.length + 1}) <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="projects-masonry">
            {relatedProducts.map((rel) => (
              <article key={rel.id} className="project-card-modern">
                <div className="project-card-header">
                  <div className="project-badge-row">
                    <span className={`card-status-badge ${rel.status === 'Live' ? 'badge-live' : 'badge-draft'}`}>
                      <span className="status-indicator-dot" />
                      {rel.status}
                    </span>
                    <span className="card-category-badge">{rel.category}</span>
                  </div>
                  <span className="card-year-label">{rel.year}</span>
                </div>

                <div className="card-content-area">
                  <h3 className="card-title">
                    <Link href={`/products/${rel.slug || rel.id}`} className="card-title-link">
                      {rel.name}
                    </Link>
                  </h3>
                  <div className="card-url-row">
                    <Globe size={12} />
                    <span>{rel.url}</span>
                  </div>
                  <p className="card-description">{rel.description}</p>

                  <div className="card-dual-actions">
                    <Link href={`/products/${rel.slug || rel.id}`} className="btn-detail-link">
                      View Details
                    </Link>
                    <a
                      href={rel.url?.startsWith('http') ? rel.url : `https://${rel.url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-launch-link"
                    >
                      Launch <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
