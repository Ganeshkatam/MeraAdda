import { supabase } from '../config/supabase.js';
import { ApiError } from '../errors/api-error.js';

export class ProjectRepository {
  async findAll({ category, status, featured, query } = {}) {
    let req = supabase
      .from('projects')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (category && category !== 'ALL') {
      req = req.eq('category', category);
    }
    if (status) {
      req = req.eq('status', status);
    }
    if (featured !== undefined) {
      const isFeatured = featured === 'true' || featured === true;
      req = req.eq('featured', isFeatured);
    }

    const { data, error } = await req;
    if (error) {
      throw new ApiError(`Database error fetching projects: ${error.message}`, 500, 'DATABASE_ERROR');
    }

    let results = (data || []).map(item => ({
      ...item,
      tags: Array.isArray(item.tags) ? item.tags : []
    }));

    if (query) {
      const q = query.toLowerCase();
      results = results.filter(p =>
        `${p.name} ${p.category} ${p.description} ${(p.tags || []).join(' ')}`.toLowerCase().includes(q)
      );
    }

    return results;
  }

  async findById(id) {
    const stringId = String(id);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', stringId)
      .maybeSingle();

    if (error) {
      throw new ApiError(`Database error fetching project ${id}: ${error.message}`, 500, 'DATABASE_ERROR');
    }

    if (!data) {
      return null;
    }

    return {
      ...data,
      tags: Array.isArray(data.tags) ? data.tags : []
    };
  }

  async create(projectData) {
    const newProject = {
      id: projectData.id ? String(projectData.id) : `proj_${Date.now()}`,
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
      throw new ApiError(`Database error creating project: ${error.message}`, 500, 'DATABASE_ERROR');
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
      throw new ApiError(`Database error updating project ${id}: ${error.message}`, 500, 'DATABASE_ERROR');
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
      throw new ApiError(`Database error deleting project ${id}: ${error.message}`, 500, 'DATABASE_ERROR');
    }

    return true;
  }
}

export const projectRepository = new ProjectRepository();
