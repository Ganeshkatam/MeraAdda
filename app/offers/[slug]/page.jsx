import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowUpRight,
  Gift,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { apiClient } from '../../../lib/api-client.js';
import { offerService } from '../../../server/services/offer.service.js';

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

async function getOffer(slug) {
  if (!slug || typeof slug !== 'string') return null;
  try {
    return await offerService.getOfferBySlug(slug);
  } catch (directErr) {
    if (directErr?.name === 'NotFoundError' || directErr?.code === 'NOT_FOUND') {
      return null;
    }
    try {
      return await apiClient.offers.getBySlug(slug);
    } catch (err) {
      if (err?.status === 404 || err?.code === 'RESOURCE_NOT_FOUND' || err?.code === 'NOT_FOUND') {
        return null;
      }
      console.error(`[OfferDetailPage]: Error fetching offer '${slug}':`, err.message);
      throw err;
    }
  }
}

export async function generateStaticParams() {
  try {
    const offers = await offerService.listOffers({ status: 'Published', onlyActive: false }).catch(() => apiClient.offers.list({ status: 'Published', onlyActive: false }));
    return (offers || [])
      .filter((o) => o.slug)
      .map((o) => ({
        slug: o.slug
      }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let offer = null;

  try {
    offer = await getOffer(slug);
  } catch {
    offer = null;
  }

  if (!offer) {
    return {
      title: 'Offer Not Found — TomeSphere',
      description: 'The requested product promotion or offer was not found in the TomeSphere catalog.'
    };
  }

  const title = `${offer.title} — TomeSphere Offers`;
  const description = `${offer.benefit}. ${offer.description}`;
  const canonicalUrl = `https://tomesphere.in/offers/${offer.slug}`;

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
      type: 'website',
      siteName: 'TomeSphere Product Hub'
    },
    twitter: {
      card: 'summary',
      title,
      description
    }
  };
}

export default async function OfferDetailPage({ params }) {
  const { slug } = await params;
  const offer = await getOffer(slug);

  if (!offer) {
    notFound();
  }

  const product = offer.projects;
  const isExpired = offer.end_date ? new Date(offer.end_date).getTime() < Date.now() : false;

  return (
    <div className="page-wrapper offer-detail-page">
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link href="/" className="breadcrumb-link">Home</Link>
          </li>
          <li className="breadcrumb-separator" aria-hidden="true">/</li>
          <li className="breadcrumb-item">
            <Link href="/offers" className="breadcrumb-link">Offers</Link>
          </li>
          <li className="breadcrumb-separator" aria-hidden="true">/</li>
          <li className="breadcrumb-item breadcrumb-current" aria-current="page">
            {offer.title}
          </li>
        </ol>
      </nav>

      <div className="offer-detail-layout">
        <main className="offer-detail-main">
          <header className="offer-header-banner">
            <div className="offer-meta-row">
              <span className={`badge ${isExpired ? 'badge-muted' : 'badge-accent'}`}>
                <Gift size={13} aria-hidden="true" /> {offer.benefit}
              </span>
              <span className={`badge ${isExpired ? 'badge-danger' : 'badge-success'}`}>
                {isExpired ? 'Expired Promotion' : 'Active Offer'}
              </span>
            </div>

            <h1 className="offer-article-title">{offer.title}</h1>
            <p className="offer-article-lead">{offer.description}</p>
          </header>

          <section className="offer-details-section" aria-label="Offer Terms and Eligibility">
            <div className="offer-info-grid">
              <div className="info-box">
                <div className="info-box-label">Eligibility Requirements</div>
                <div className="info-box-value">
                  <CheckCircle2 size={16} className="text-success" aria-hidden="true" />
                  <span>{offer.eligibility}</span>
                </div>
              </div>

              <div className="info-box">
                <div className="info-box-label">Validity Window</div>
                <div className="info-box-value">
                  <Calendar size={16} className="text-accent" aria-hidden="true" />
                  <span>
                    {formatDate(offer.start_date)} – {formatDate(offer.end_date)}
                  </span>
                </div>
              </div>
            </div>

            {offer.coupon_code && (
              <div className="coupon-redemption-card">
                <div className="coupon-card-header">Promotional Redemption Code</div>
                <div className="coupon-code-display">
                  <code>{offer.coupon_code}</code>
                </div>
                <div className="coupon-hint">
                  Apply this code at product checkout or during registration to redeem your benefit.
                </div>
              </div>
            )}

            {offer.terms && (
              <div className="offer-terms-block">
                <h3 className="terms-title">Terms &amp; Conditions</h3>
                <p className="terms-text">{offer.terms}</p>
              </div>
            )}
          </section>

          <footer className="offer-article-footer">
            <Link href="/offers" className="btn btn-outline">
              <ArrowLeft size={16} aria-hidden="true" /> Back to Offers Directory
            </Link>

            {!isExpired && offer.url && (
              <a
                href={offer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Redeem Promotion <ExternalLink size={15} aria-hidden="true" />
              </a>
            )}
          </footer>
        </main>

        <aside className="offer-detail-sidebar" aria-label="Target Product">
          {product && (
            <div className="detail-sidebar-card">
              <div className="sidebar-section-title">Applicable Product</div>
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
          )}
        </aside>
      </div>
    </div>
  );
}
