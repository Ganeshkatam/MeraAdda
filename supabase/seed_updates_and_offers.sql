-- Seed: supabase/seed_updates_and_offers.sql
-- Production & Staging seed data for Updates and Offers
-- Date: 2026-10-24
-- Scope: Phase C — Product Discovery & Information Hub

-- 1. Updates & Changelogs Seed Data
INSERT INTO public.updates (id, slug, project_id, title, summary, content, version, update_type, status, published_at)
VALUES
(
  'upd_bookgarden_v2',
  'bookgarden-v2-architecture-rewrite',
  'proj_bookgarden',
  'BookGarden v2.0 Architecture Rewrite',
  'Complete architectural modernization to clean architecture, decoupled domain models, and high-performance reader view.',
  'BookGarden v2.0 introduces a major architectural overhaul centered around clean architecture, decoupled domain logic, and a distraction-free reader interface.

### What Changed
- Decoupled reading engine and persistence boundaries for offline support.
- Streamlined bookshelf categorization and personal reading progress meters.
- Implemented high-contrast accessibility themes and configurable typography.
- Optimized static asset delivery and instant page transitions.',
  'v2.0.0',
  'Launch',
  'Published',
  NOW() - INTERVAL '3 days'
),
(
  'upd_streetcraft_omnichannel',
  'streetcraft-omnichannel-growth-sync',
  'proj_streetcraft',
  'StreetCraft Omnichannel Growth Sync Engine',
  'Unified commercial catalog syndication across WhatsApp, Instagram, and physical counter print.',
  'StreetCraft now provides automated multi-channel synchronization, enabling physical merchants to maintain a single product catalog that automatically updates across digital storefronts and physical print collateral.

### Features Included
- Instant WhatsApp catalog export with localized pricing.
- Automated Instagram story flyer generation.
- Dynamic QR code generation for in-store counter displays.',
  'v1.4.0',
  'Feature',
  'Published',
  NOW() - INTERVAL '6 days'
),
(
  'upd_cowatch_webrtc_stabilization',
  'cowatch-webrtc-stream-stabilization',
  'proj_cowatch',
  'CoWatch WebRTC Low-Latency Stream Stabilization',
  'Sub-second media synchronization and room heartbeat failover improvements.',
  'CoWatch streaming infrastructure has been upgraded to improve room synchronization across unstable network conditions.

### Technical Improvements
- WebRTC peer reconnection latency reduced by 40%.
- Dynamic bitrate scaling based on active room bandwidth.
- Enhanced virtual browser input responsiveness.',
  'v1.2.2',
  'Improvement',
  'Published',
  NOW() - INTERVAL '12 days'
),
(
  'upd_calclens_ocr_model_update',
  'calclens-neural-ocr-accuracy-boost',
  'proj_calclens',
  'CalcLens Neural OCR Formula Recognition Boost',
  'Enhanced multi-line polynomial recognition and instant step-by-step resolution on mobile.',
  'The latest mobile engine update for CalcLens incorporates an upgraded neural OCR model for complex handwriting and multi-line mathematical proofs.

### Highlights
- 98.4% recognition accuracy on handwritten algebraic equations.
- Offline calculation support without external network queries.',
  'v0.9.5',
  'Improvement',
  'Published',
  NOW() - INTERVAL '18 days'
),
-- Draft negative-verification update (Must NEVER appear to anonymous visitors)
(
  'upd_bookgarden_v2_1_roadmap',
  'bookgarden-v2-1-collaborative-shelves',
  'proj_bookgarden',
  'BookGarden v2.1 Collaborative Bookshelves',
  'Future planned feature for shared reading circles and community annotations.',
  'Internal roadmap drafting. This entry is unreleased and strictly gated to administrative eyes.',
  'v2.1.0-alpha',
  'Feature',
  'Draft',
  NOW() + INTERVAL '14 days'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  content = EXCLUDED.content,
  version = EXCLUDED.version,
  update_type = EXCLUDED.update_type,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at,
  updated_at = NOW();

-- 2. Offers & Promotions Seed Data
INSERT INTO public.offers (id, slug, project_id, title, description, benefit, eligibility, terms, coupon_code, url, start_date, end_date, status, is_featured)
VALUES
(
  'off_bookgarden_founding',
  'bookgarden-founding-reader-pass',
  'proj_bookgarden',
  'BookGarden Founding Reader Lifetime Pass',
  'Exclusive launch pass granting perpetual access to premium knowledge archives and unlimited personal bookshelves.',
  'Perpetual premium archive access without subscription renewals',
  'Open to all early registered readers during the Q4 2026 launch window',
  'Valid for one personal account. Non-transferable and subject to BookGarden acceptable use policies.',
  'FOUNDINGREADER',
  'https://bookgarden.tomesphere.in',
  NOW() - INTERVAL '2 days',
  NOW() + INTERVAL '45 days',
  'Published',
  true
),
(
  'off_streetcraft_accelerator',
  'streetcraft-retail-growth-accelerator',
  'proj_streetcraft',
  'StreetCraft Retail Growth Accelerator Bundle',
  'Full commercial syndication package for physical store owners with zero commission fees on early transactions.',
  'Zero platform transaction fees for the first 90 days of commercial operations',
  'Independent retail storefronts onboarding within the current launch cycle',
  'Applicable to the primary merchant location. Requires standard business verification.',
  'GROWTH90',
  'https://streetcraft.tomesphere.in',
  NOW() - INTERVAL '5 days',
  NOW() + INTERVAL '60 days',
  'Published',
  true
),
(
  'off_cowatch_room_pass',
  'cowatch-unlimited-party-pass',
  'proj_cowatch',
  'CoWatch Unlimited HD Watch Party Pass',
  'Host uninterrupted watch parties with up to 50 concurrent friends in 1080p high definition.',
  'Complimentary 60-day HD watch room hosting upgrade',
  'All verified registered community members',
  'Bandwidth fair-use policy applies. Room host must remain present during streaming.',
  'COWATCHHD',
  'https://cowatch.tomesphere.in',
  NOW() - INTERVAL '7 days',
  NOW() + INTERVAL '30 days',
  'Published',
  false
),
-- Expired negative-verification offer (Must NEVER appear to anonymous visitors)
(
  'off_beta_access_expired',
  'tomesphere-early-alpha-preview',
  'proj_bookgarden',
  'TomeSphere Early Alpha Preview Pass',
  'Legacy closed alpha evaluation voucher.',
  'Early alpha access credentials',
  'Closed test participants',
  'Offer has concluded.',
  'ALPHAEXPIRED',
  'https://bookgarden.tomesphere.in',
  NOW() - INTERVAL '60 days',
  NOW() - INTERVAL '15 days',
  'Expired',
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  benefit = EXCLUDED.benefit,
  eligibility = EXCLUDED.eligibility,
  terms = EXCLUDED.terms,
  coupon_code = EXCLUDED.coupon_code,
  url = EXCLUDED.url,
  start_date = EXCLUDED.start_date,
  end_date = EXCLUDED.end_date,
  status = EXCLUDED.status,
  is_featured = EXCLUDED.is_featured,
  updated_at = NOW();
