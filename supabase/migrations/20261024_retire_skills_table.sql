-- Migration: Retire Legacy Skills Table
-- Date: 2026-10-24
-- Scope: Schema Modernization — Elimination of Portfolio-Era Tables in Favor of Product-First Data Model
-- Dependencies Audit: Verified zero foreign keys, zero views, zero trigger dependencies, zero frontend UI usage.

-- 1. Drop associated RLS policy
DROP POLICY IF EXISTS "Public read skills" ON public.skills;

-- 2. Drop associated indexes
DROP INDEX IF EXISTS public.idx_skills_category;

-- 3. Drop legacy skills table
DROP TABLE IF EXISTS public.skills CASCADE;
