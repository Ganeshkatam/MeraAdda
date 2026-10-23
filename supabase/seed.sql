-- Seed: supabase/seed.sql
-- Authentic production seed data for Katam Ganesh Reddy & TomeSphere ecosystem

-- 1. Profile
INSERT INTO public.profile (id, name, title, domain, location, email, bio, intro, socials, is_available)
VALUES (
  'primary',
  'Katam Ganesh Reddy',
  'Full-Stack Developer & Independent Builder',
  'tomesphere.in',
  'India',
  'katamganesh61@gmail.com',
  'Founder and full-stack engineer building distributed digital products, real-time collaboration engines, and the TomeSphere ecosystem at tomesphere.in.',
  'I design and build dynamic full-stack systems, modern reading sanctuaries like BookGarden (bookgarden.tomesphere.in), and developer tools.',
  '{"github": "github.com/Ganeshkatam", "linkedin": "linkedin.com/in/ganeshkatam", "twitter": "x.com/ganeshkatam"}'::jsonb,
  true
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  title = EXCLUDED.title,
  domain = EXCLUDED.domain,
  location = EXCLUDED.location,
  email = EXCLUDED.email,
  bio = EXCLUDED.bio,
  intro = EXCLUDED.intro,
  socials = EXCLUDED.socials,
  is_available = EXCLUDED.is_available,
  updated_at = NOW();

-- 2. Projects
INSERT INTO public.projects (id, slug, name, category, tagline, description, url, github_url, image, accent, featured, status, year, tags, display_order)
VALUES
(
  'proj_bookgarden',
  'bookgarden',
  'BookGarden',
  'WEB APPS',
  'Digital Reading Platform & Knowledge Archive',
  'TomeSphere digital reading platform and knowledge archive. Engineered with clean architecture, domain-driven design, distraction-free reading, progress tracking, and personal bookshelves.',
  'bookgarden.tomesphere.in',
  'https://github.com/Ganeshkatam/bookgarden',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=85',
  'lavender',
  true,
  'Live',
  '2026',
  '["TypeScript", "Next.js", "Clean Architecture", "Knowledge Archive"]'::jsonb,
  1
),
(
  'proj_streetcraft',
  'streetcraft',
  'StreetCraft',
  'BUSINESS TOOLS',
  'Physical Business Omnichannel Growth Engine',
  'Physical business growth engine turning commercial opportunities into everything customers need to see across Google, Instagram, WhatsApp, and counter print.',
  'streetcraft.tomesphere.in',
  'https://github.com/Ganeshkatam/StreetCraft',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1100&q=85',
  'peach',
  true,
  'Live',
  '2026',
  '["TypeScript", "React", "Growth Platform", "Multi-Channel"]'::jsonb,
  2
),
(
  'proj_cowatch',
  'cowatch',
  'CoWatch',
  'REAL-TIME APPS',
  'Synchronized Watch Party & Live Streaming Platform',
  'Real-time synchronized watch party platform for movies, videos, and live streams with virtual browsers, WebSockets, interactive chat, and room orchestration.',
  'cowatch.tomesphere.in',
  'https://github.com/Ganeshkatam/CoWatch_watchparty',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1100&q=85',
  'blue',
  true,
  'Live',
  '2026',
  '["TypeScript", "WebRTC", "WebSockets", "Supabase", "Streaming"]'::jsonb,
  3
),
(
  'proj_fitmirror',
  'fitmirror',
  'FitMirror Ecosystem',
  'ECOMMERCE',
  'Fashion Ecommerce with 3D Virtual Try-On',
  'Fashion eCommerce platform featuring an immersive 3D virtual try-on experience paired with the FitSeller merchant analytics and order fulfillment portal.',
  'fitmirror.tomesphere.in',
  'https://github.com/Ganeshkatam/FitMirror',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1100&q=85',
  'mint',
  false,
  'Live',
  '2025',
  '["TypeScript", "3D Virtual Try-On", "FitSeller", "Merchant Portal"]'::jsonb,
  4
),
(
  'proj_mystays',
  'mystays',
  'MyStays',
  'MARKETPLACE',
  'Long-Term Housing & PG Discovery Platform',
  'Long-term accommodation discovery and residential housing platform connecting seekers with PGs, private apartments, and verified shared rooms.',
  'mystays.tomesphere.in',
  'https://github.com/Ganeshkatam/mystays',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1100&q=85',
  'yellow',
  false,
  'Live',
  '2025',
  '["TypeScript", "Real Estate", "Search & Filters", "Accommodation"]'::jsonb,
  5
),
(
  'proj_gk_cli',
  'gk-dev-cli',
  'gk-dev-cli',
  'DEVELOPER TOOLS',
  'Developer Task Orchestration & Discovery CLI',
  'Manifest-driven developer CLI for project discovery, task orchestration, workspace management, and plugin-powered workflow automation.',
  'github.com/Ganeshkatam/gk-dev-cli',
  'https://github.com/Ganeshkatam/gk-dev-cli',
  'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1100&q=85',
  'rose',
  false,
  'Live',
  '2025',
  '["JavaScript", "Node.js", "CLI Tooling", "Automation"]'::jsonb,
  6
),
(
  'proj_calclens',
  'calclens',
  'CalcLens',
  'MOBILE',
  'Mobile Visual Math & Equation Solver',
  'Mobile visual calculation and OCR camera assistant designed for instantaneous mathematical recognition and equation resolution.',
  'github.com/Ganeshkatam/CalcLens',
  'https://github.com/Ganeshkatam/CalcLens',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1100&q=85',
  'lavender',
  false,
  'In progress',
  '2025',
  '["Kotlin", "Android", "Computer Vision", "Mobile App"]'::jsonb,
  7
)
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
  github_url = EXCLUDED.github_url,
  image = EXCLUDED.image,
  accent = EXCLUDED.accent,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  year = EXCLUDED.year,
  tags = EXCLUDED.tags,
  display_order = EXCLUDED.display_order,
  updated_at = NOW();

-- 3. Skills
INSERT INTO public.skills (name, category, proficiency, display_order) VALUES
  ('Next.js 16', 'Frontend', 'Expert', 1),
  ('React 19', 'Frontend', 'Expert', 2),
  ('TypeScript', 'Languages', 'Expert', 3),
  ('Node.js', 'Backend', 'Advanced', 4),
  ('PostgreSQL', 'Database & Cloud', 'Advanced', 5),
  ('Supabase', 'Database & Cloud', 'Advanced', 6),
  ('WebSockets / Real-Time', 'Backend', 'Advanced', 7),
  ('Clean Architecture', 'Architecture', 'Expert', 8),
  ('Tailwind CSS', 'Frontend', 'Advanced', 9),
  ('Docker', 'DevOps & Tooling', 'Proficient', 10),
  ('Kotlin', 'Languages', 'Proficient', 11),
  ('REST & GraphQL', 'Backend', 'Advanced', 12)
ON CONFLICT (name) DO UPDATE SET
  category = EXCLUDED.category,
  proficiency = EXCLUDED.proficiency,
  display_order = EXCLUDED.display_order;

-- 4. Initial Welcoming Guestbook Entry
INSERT INTO public.guestbook (id, author, message, timestamp, status)
VALUES (
  'gb_welcome',
  'Katam Ganesh Reddy',
  'Welcome to TomeSphere (tomesphere.in)! Explore my real products, architecture, or visit BookGarden at bookgarden.tomesphere.in. Leave a note below!',
  'Oct 23, 2026',
  'approved'
)
ON CONFLICT (id) DO NOTHING;
