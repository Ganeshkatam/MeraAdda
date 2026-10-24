import { randomUUID } from 'node:crypto';
import { supabase } from '../config/supabase.js';
import { ApiError } from '../errors/api-error.js';

export class ProjectRepository {
  async findAll({ category, status = 'Live', featured, query, limit = 50 } = {}) {
    let req = supabase
      .from('projects')
      .select('id, slug, name, category, tagline, description, url, github_url, image, accent, featured, status, year, tags, display_order, metrics, created_at, updated_at')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(Math.min(parseInt(limit, 10) || 50, 100));

    if (category && category !== 'ALL') {
      req = req.eq('category', category);
    }
    if (status && status !== 'ALL') {
      req = req.eq('status', status);
    }
    if (featured !== undefined) {
      const isFeatured = featured === 'true' || featured === true;
      req = req.eq('featured', isFeatured);
    }

    const { data, error } = await req;
    if (error) {
      console.error('[ProjectRepository.findAll]: Database query error:', error.message);
      throw new ApiError('Unable to retrieve project catalog at this time.', 500, 'DATABASE_ERROR');
    }

    let results = (data || []).map(item => ({
      ...item,
      tags: Array.isArray(item.tags) ? item.tags : []
    }));

    if (query) {
      const q = String(query).toLowerCase().trim();
      results = results.filter(p =>
        `${p.name} ${p.category} ${p.description} ${(p.tags || []).join(' ')}`.toLowerCase().includes(q)
      );
    }

    return results;
  }

  async findBySlug(slug) {
    if (!slug || typeof slug !== 'string') return null;
    const cleanSlug = slug.trim().toLowerCase();
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(cleanSlug)) {
      return null;
    }

    const { data, error } = await supabase
      .from('projects')
      .select('id, slug, name, category, tagline, description, url, github_url, image, accent, featured, status, year, tags, display_order, metrics, created_at, updated_at')
      .eq('slug', cleanSlug)
      .maybeSingle();

    if (error) {
      console.error(`[ProjectRepository.findBySlug ${cleanSlug}]: Database query error:`, error.message);
      throw new ApiError('Unable to retrieve project details.', 500, 'DATABASE_ERROR');
    }

    if (!data) return null;
    return {
      ...data,
      tags: Array.isArray(data.tags) ? data.tags : []
    };
  }

  async findById(id) {
    if (!id || typeof id !== 'string') return null;
    const stringId = id.trim();

    // Query directly by ID first using parameterized filter
    const { data, error } = await supabase
      .from('projects')
      .select('id, slug, name, category, tagline, description, url, github_url, image, accent, featured, status, year, tags, display_order, metrics, created_at, updated_at')
      .eq('id', stringId)
      .maybeSingle();

    if (error) {
      console.error(`[ProjectRepository.findById ${stringId}]: Database query error:`, error.message);
      throw new ApiError('Unable to retrieve project details.', 500, 'DATABASE_ERROR');
    }

    if (!data) {
      // Backward compatibility fallback: check slug if id didn't match
      return this.findBySlug(stringId);
    }

    return {
      ...data,
      tags: Array.isArray(data.tags) ? data.tags : []
    };
  }

  async create(projectData) {
    const slug = projectData.slug
      ? String(projectData.slug).trim().toLowerCase()
      : projectData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

    const newProject = {
      id: projectData.id ? String(projectData.id) : `proj_${randomUUID().replace(/-/g, '').slice(0, 16)}`,
      slug: slug || null,
      name: projectData.name,
      category: projectData.category,
      description: projectData.description,
      url: projectData.url,
      github_url: projectData.github_url || null,
      image: projectData.image || null,
      accent: projectData.accent || 'lavender',
      featured: Boolean(projectData.featured),
      status: projectData.status || 'Live',
      year: projectData.year || new Date().getFullYear().toString(),
      tags: projectData.tags || []
    };

    const { data, error } = await supabase
      .from('projects')
      .insert(newProject)
      .select()
      .single();

    if (error) {
      console.error('[ProjectRepository.create]: Database insert error:', error.message);
      throw new ApiError('Unable to create project record.', 500, 'DATABASE_ERROR');
    }

    return {
      ...data,
      tags: Array.isArray(data.tags) ? data.tags : []
    };
  }

  async update(id, updates) {
    const stringId = String(id);
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', stringId)
      .select()
      .single();

    if (error) {
      console.error(`[ProjectRepository.update ${id}]: Database update error:`, error.message);
      throw new ApiError('Unable to update project record.', 500, 'DATABASE_ERROR');
    }

    return {
      ...data,
      tags: Array.isArray(data.tags) ? data.tags : []
    };
  }

  async delete(id) {
    const stringId = String(id);
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', stringId);

    if (error) {
      console.error(`[ProjectRepository.delete ${id}]: Database delete error:`, error.message);
      throw new ApiError('Unable to delete project record.', 500, 'DATABASE_ERROR');
    }

    return true;
  }
}

export const projectRepository = new ProjectRepository();
