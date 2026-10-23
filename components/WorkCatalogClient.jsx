'use client';

import React, { useState } from 'react';
import { Search, Globe, ArrowUpRight } from 'lucide-react';

export default function WorkCatalogClient({ initialProjects = [] }) {
  const [products] = useState(initialProjects || []);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['ALL', ...new Set(products.map(p => p.category).filter(Boolean))];

  const visibleProjects = products.filter(p => {
    const matchesFilter = activeFilter === 'ALL' || p.category === activeFilter;
    const matchesSearch = `${p.name} ${p.category} ${p.description} ${(p.tags || []).join(' ')}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="catalog-wrapper">
      <div className="projects-filter-bar">
        <div className="filter-pills">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
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

        <label className="search-input-wrapper">
          <Search size={14} aria-hidden="true" />
          <input
            type="text"
            className="search-field"
            aria-label="Search products by name, category, description, or tag"
            placeholder="Search products or tags…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </label>
      </div>

      <p className="catalog-results" aria-live="polite">
        {visibleProjects.length} {visibleProjects.length === 1 ? 'product' : 'products'} shown
        {searchQuery ? ` for “${searchQuery}”` : ''}
      </p>

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
                  Launch Product <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {visibleProjects.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <p>No products match those filters.</p>
          <button type="button" className="btn-secondary-glass" onClick={() => { setActiveFilter('ALL'); setSearchQuery(''); }}>
            Clear search and filters
          </button>
        </div>
      )}
    </div>
  );
}
