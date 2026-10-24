'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Gift, Calendar, CheckCircle2, Copy, Check, Sparkles, ExternalLink } from 'lucide-react';

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

function getDaysRemaining(endDateIso) {
  if (!endDateIso) return null;
  const diff = new Date(endDateIso).getTime() - Date.now();
  if (diff <= 0) return 'Expired';
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return `${days} ${days === 1 ? 'day' : 'days'} left`;
}

export default function OffersListClient({ initialOffers = [] }) {
  const [filterFeatured, setFilterFeatured] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  const filteredOffers = useMemo(() => {
    return (initialOffers || []).filter(offer => {
      if (filterFeatured && !offer.is_featured) return false;
      return true;
    });
  }, [initialOffers, filterFeatured]);

  const handleCopy = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    });
  };

  return (
    <div className="offers-feed-wrapper">
      <div className="catalog-controls">
        <div className="category-pills" role="tablist" aria-label="Filter offers">
          <button
            type="button"
            role="tab"
            aria-selected={!filterFeatured}
            className={`pill ${!filterFeatured ? 'active' : ''}`}
            onClick={() => setFilterFeatured(false)}
          >
            All Active Offers ({initialOffers.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filterFeatured}
            className={`pill ${filterFeatured ? 'active' : ''}`}
            onClick={() => setFilterFeatured(true)}
          >
            Featured Promotions
          </button>
        </div>
      </div>

      {filteredOffers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Gift size={28} />
          </div>
          <h3 className="empty-state-title">No Active Promotions</h3>
          <p className="empty-state-description">
            There are currently no active public promotions or discounts. Check back soon or explore our product catalog.
          </p>
          <Link href="/products" className="btn btn-primary">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="offers-grid">
          {filteredOffers.map((offer) => {
            const daysLeft = getDaysRemaining(offer.end_date);
            const isCopied = copiedCode === offer.coupon_code;

            return (
              <article key={offer.id || offer.slug} className={`offer-card ${offer.is_featured ? 'featured-offer-card' : ''}`}>
                <div className="offer-card-top">
                  <div className="offer-meta-row">
                    <span className="badge badge-accent">
                      <Gift size={13} aria-hidden="true" /> {offer.benefit}
                    </span>
                    {daysLeft && (
                      <span className="badge badge-warning">
                        {daysLeft}
                      </span>
                    )}
                  </div>

                  {offer.projects && (
                    <Link
                      href={`/products/${offer.projects.slug || offer.projects.id}`}
                      className="offer-product-tag"
                      title={`View ${offer.projects.name}`}
                    >
                      {offer.projects.name}
                    </Link>
                  )}
                </div>

                <h2 className="offer-title">
                  <Link href={`/offers/${offer.slug}`} className="offer-title-link">
                    {offer.title}
                  </Link>
                </h2>

                <p className="offer-description">{offer.description}</p>

                <div className="offer-eligibility-box">
                  <span className="eligibility-label">Eligibility:</span>
                  <span className="eligibility-value">{offer.eligibility}</span>
                </div>

                <div className="offer-validity-row">
                  <Calendar size={13} aria-hidden="true" />
                  <span>Valid until {formatDate(offer.end_date)}</span>
                </div>

                <div className="offer-card-footer">
                  {offer.coupon_code && (
                    <button
                      type="button"
                      className="btn-coupon-copy"
                      onClick={() => handleCopy(offer.coupon_code)}
                      aria-label={`Copy coupon code ${offer.coupon_code}`}
                    >
                      <code>{offer.coupon_code}</code>
                      {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  )}

                  <div className="offer-cta-group">
                    <Link href={`/offers/${offer.slug}`} className="btn btn-outline btn-sm">
                      Details
                    </Link>
                    <a
                      href={offer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Redeem <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
