import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Tag,
  Globe,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { apiClient } from '../../../lib/api-client.js';

export const revalidate = 1800;

function formatDate(isoString) {
  if (!isoString) return '';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return isoString;
  }
}

async function getUpdate(slug) {
  if (!slug || typeof slug !== 'string') return null;
  try {
    return await apiClient.updates.getBySlug(slug);
  } catch (err) {
    if (err?.status === 404 || err?.code === 'RESOURCE_NOT_FOUND' || err?.code === 'NOT_FOUND') {
      return null;
    }
    console.error(`[UpdateDetailPage]: Error fetching update '${slug}':`, err.message);
    throw err;
  }
}

export async function generateStaticParams() {
  try {
    const updates = await apiClient.updates.list({ status: 'Published' });
    return (updates || [])
      .filter((u) => u.slug)
      .map((u) => ({
        slug: u.slug
      }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let update = null;

  try {
    update = await getUpdate(slug);
  } catch {
    update = null;
  }

  if (!update) {
    return {
      title: 'Update Not Found — TomeSphere',
      description: 'The requested product update or changelog was not found in the TomeSphere archive.'
    };
  }

  const title = `${update.title} — TomeSphere Updates`;
  const description = update.summary || 'Verified product update and release changelog in TomeSphere.';
  const canonicalUrl = `https://tomesphere.in/updates/${update.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      siteName: 'TomeSphere Product Hub',
      publishedTime: update.published_at || update.created_at
    },
    twitter: {
      card: 'summary',
      title,
      description
    }
  };
}

export default async function UpdateDetailPage({ params }) {
  const { slug } = await params;
  const update = await getUpdate(slug);

  if (!update) {
    notFound();
  }

  const product = update.projects;

  return (
    <div className="page-wrapper update-detail-page">
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link href="/" className="breadcrumb-link">Home</Link>
          </li>
          <li className="breadcrumb-separator" aria-hidden="true">/</li>
          <li className="breadcrumb-item">
            <Link href="/updates" className="breadcrumb-link">Updates</Link>
          </li>
          <li className="breadcrumb-separator" aria-hidden="true">/</li>
          <li className="breadcrumb-item breadcrumb-current" aria-current="page">
            {update.title}
          </li>
        </ol>
      </nav>

      <div className="update-detail-layout">
        <main className="update-detail-main">
          <header className="update-article-header">
            <div className="update-meta-row">
              <span className={`badge update-type-badge update-type-${update.update_type?.toLowerCase()}`}>
                {update.update_type}
              </span>
              {update.version && (
                <span className="badge badge-mono">{update.version}</span>
              )}
              {update.published_at && (
                <span className="update-date">
                  <Calendar size={14} aria-hidden="true" />
                  <time dateTime={update.published_at}>{formatDate(update.published_at)}</time>
                </span>
              )}
            </div>

            <h1 className="update-article-title">{update.title}</h1>
            <p className="update-article-lead">{update.summary}</p>
          </header>

          <section className="update-article-content" aria-label="Changelog Details">
            <div className="prose-content">
              {update.content ? (
                update.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))
              ) : (
                <p>No additional release notes available for this update.</p>
              )}
            </div>
          </section>

          <footer className="update-article-footer">
            <Link href="/updates" className="btn btn-outline">
              <ArrowLeft size={16} aria-hidden="true" /> Back to Updates Feed
            </Link>
          </footer>
        </main>

        <aside className="update-detail-sidebar" aria-label="Associated Product">
          {product ? (
            <div className="detail-sidebar-card">
              <div className="sidebar-section-title">Associated Product</div>
              <h3 className="sidebar-product-name">{product.name}</h3>
              <p className="sidebar-product-category">{product.category}</p>

              <div className="sidebar-actions">
                <Link
                  href={`/products/${product.slug || product.id}`}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  View Product Details <ArrowUpRight size={15} aria-hidden="true" />
                </Link>

                {product.url && (
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Launch Product <ExternalLink size={15} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="detail-sidebar-card">
              <div className="sidebar-section-title">Ecosystem Milestone</div>
              <p className="text-secondary" style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
                This is a platform-wide infrastructure and architectural update affecting multiple products.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
