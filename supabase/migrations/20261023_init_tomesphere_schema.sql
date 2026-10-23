-- Migration: 20261023_init_tomesphere_schema.sql
-- Description: Core production schema for TomeSphere (tomesphere.in) & BookGarden (bookgarden.tomesphere.in)
-- Database: Supabase PostgreSQL (Project ref: ibuaiktnkhvqoqxrqnrz)

-- 1. Enable Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. Trigger Function for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Developer Profile Table
CREATE TABLE IF NOT EXISTS public.profile (
  id TEXT PRIMARY KEY DEFAULT 'primary',
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  domain TEXT NOT NULL,
  location TEXT DEFAULT 'India',
  email TEXT NOT NULL,
  bio TEXT,
  intro TEXT,
  avatar_url TEXT,
  socials JSONB DEFAULT '{}'::jsonb,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Projects & Products Catalog Table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  github_url TEXT,
  image TEXT,
  accent TEXT DEFAULT 'lavender',
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'Live',
  year TEXT DEFAULT '2026',
  tags JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER DEFAULT 0,
  metrics JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  proficiency TEXT DEFAULT 'Advanced',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Visitor Guestbook Table
CREATE TABLE IF NOT EXISTS public.guestbook (
  id TEXT PRIMARY KEY,
  author TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  status TEXT DEFAULT 'approved',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Inquiries & Contact Table
CREATE TABLE IF NOT EXISTS public.contacts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects (featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects (category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects (status);
CREATE INDEX IF NOT EXISTS idx_projects_order ON public.projects (display_order ASC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_guestbook_created ON public.guestbook (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_created ON public.contacts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_skills_category ON public.skills (category, display_order ASC);

-- 9. Automated updated_at Triggers
DROP TRIGGER IF EXISTS trigger_projects_updated_at ON public.projects;
CREATE TRIGGER trigger_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_profile_updated_at ON public.profile;
CREATE TRIGGER trigger_profile_updated_at
  BEFORE UPDATE ON public.profile
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 10. Row Level Security & Policies
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  -- Profile policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profile' AND policyname = 'Public read profile') THEN
    CREATE POLICY "Public read profile" ON public.profile FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profile' AND policyname = 'Public manage profile') THEN
    CREATE POLICY "Public manage profile" ON public.profile FOR ALL USING (true) WITH CHECK (true);
  END IF;

  -- Projects policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Public read projects') THEN
    CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Public manage projects') THEN
    CREATE POLICY "Public manage projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);
  END IF;

  -- Skills policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'skills' AND policyname = 'Public read skills') THEN
    CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'skills' AND policyname = 'Public manage skills') THEN
    CREATE POLICY "Public manage skills" ON public.skills FOR ALL USING (true) WITH CHECK (true);
  END IF;

  -- Guestbook policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'guestbook' AND policyname = 'Public read guestbook') THEN
    CREATE POLICY "Public read guestbook" ON public.guestbook FOR SELECT USING (status = 'approved');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'guestbook' AND policyname = 'Public insert guestbook') THEN
    CREATE POLICY "Public insert guestbook" ON public.guestbook FOR INSERT WITH CHECK (char_length(message) >= 3);
  END IF;

  -- Contacts policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contacts' AND policyname = 'Public insert contacts') THEN
    CREATE POLICY "Public insert contacts" ON public.contacts FOR INSERT WITH CHECK (char_length(email) >= 5 AND char_length(message) >= 5);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contacts' AND policyname = 'Public select contacts') THEN
    CREATE POLICY "Public select contacts" ON public.contacts FOR SELECT USING (true);
  END IF;
END $$;
