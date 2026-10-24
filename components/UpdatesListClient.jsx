'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Calendar, Tag, Sparkles, Filter } from 'lucide-react';

const UPDATE_TYPES = ['ALL', 'Launch', 'Feature', 'Improvement', 'Bugfix', 'Maintenance'];

function formatDate(isoString) {
  if (!isoString) return '';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return isoString;
  }
}

export default function UpdatesListClient({ initialUpdates = [] }) {
  const [selectedType, setSelectedType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUpdates = useMemo(() => {
    return (initialUpdates || []).filter(update => {
      const matchesType = selectedType === 'ALL' || update.update_type === selectedType;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        update.title?.toLowerCase().includes(q) ||
        update.summary?.toLowerCase().includes(q) ||
        update.projects?.name?.toLowerCase().includes(q) ||
        update.version?.toLowerCase().includes(q);

      return matchesType && matchesQuery;
    });
  }, [initialUpdates, selectedType, searchQuery]);

  return (
    <div className="updates-feed-wrapper">
      <div className="catalog-controls">
        <div className="category-pills" role="tablist" aria-label="Filter updates by type">
          {UPDATE_TYPES.map(type => (
            <button
              key={type}
              type="button"
              role="tab"
              aria-selected={selectedType === type}
              className={`pill ${selectedType === type ? 'active' : ''}`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="search-box">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search updates, releases, or products..."
            className="search-input"
            aria-label="Search updates"
          />
        </div>
      </div>

      <div className="feed-status-bar">
        <span className="results-count">
          Showing <strong>{filteredUpdates.length}</strong> {filteredUpdates.length === 1 ? 'update' : 'updates'}
        </span>
      </div>

      {filteredUpdates.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Sparkles size={28} />
          </div>
          <h3 className="empty-state-title">No updates found</h3>
          <p className="empty-state-description">
            {initialUpdates.length === 0
              ? 'No public changelogs or release notes have been published yet.'
              : 'No updates matched the selected filter criteria.'}
          </p>
          {(selectedType !== 'ALL' || searchQuery) && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setSelectedType('ALL');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="updates-timeline">
          {filteredUpdates.map((update) => (
            <article key={update.id || update.slug} className="update-timeline-card">
              <div className="update-card-header">
                <div className="update-meta-row">
                  <span className={`badge update-type-badge update-type-${update.update_type?.toLowerCase()}`}>
                    {update.update_type}
                  </span>
                  {update.version && (
                    <span className="badge badge-mono">{update.version}</span>
                  )}
                  {update.published_at && (
                    <span className="update-date">
                      <Calendar size={13} aria-hidden="true" />
                      <time dateTime={update.published_at}>
                        {formatDate(update.published_at)}
                      </time>
                    </span>
                  )}
                </div>

                {update.projects && (
                  <Link
                    href={`/products/${update.projects.slug || update.projects.id}`}
                    className="update-product-link"
                    title={`View ${update.projects.name} details`}
                  >
                    <Tag size={13} aria-hidden="true" />
                    <span>{update.projects.name}</span>
                  </Link>
                )}
              </div>

              <h2 className="update-title">
                <Link href={`/updates/${update.slug}`} className="update-title-link">
                  {update.title}
                </Link>
              </h2>

              <p className="update-summary">{update.summary}</p>

              <div className="update-actions">
                <Link href={`/updates/${update.slug}`} className="btn-text-link">
                  Read Full Changelog <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
