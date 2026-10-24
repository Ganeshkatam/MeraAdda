import React from 'react';
import OffersListClient from '../../components/OffersListClient';
import { apiClient } from '../../lib/api-client';
import { offerService } from '../../server/services/offer.service';

export const revalidate = 1800;

export const metadata = {
  title: 'Active Product Offers & Promotions — TomeSphere',
  description: 'Verified promotions, trials, and exclusive access opportunities for tools and applications in the TomeSphere ecosystem.',
  alternates: {
    canonical: 'https://tomesphere.in/offers'
  }
};

export default async function OffersPage() {
  const offers = await offerService.listOffers({ status: 'Published', onlyActive: true }).catch(() => apiClient.offers.list({ status: 'Published', onlyActive: true }).catch(() => []));

  return (
    <div className="page-wrapper">
      <div className="page-head">
        <div className="page-eyebrow">Product Promotions &amp; Trials</div>
        <h1 className="page-title">Active Offers ({offers.length})</h1>
        <p className="page-subtitle">
          Verified benefits, trial opportunities, and developer tier perks for applications across TomeSphere.
        </p>
      </div>

      <OffersListClient initialOffers={offers} />
    </div>
  );
}
