import { supabase } from '@/lib/supabase';
import { store } from './memory-store';

export class ProjectRepository {
  async findAll({ category, status, featured, query } = {}) {
    try {
      let req = supabase.from('projects').select('*').order('featured', { ascending: false }).order('created_at', { ascending: false });

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
      if (!error && Array.isArray(data) && data.length > 0) {
        let results = data.map(item => ({
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
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to local store:', e.message);
    }

    let results = [...store.projects];
    if (category && category !== 'ALL') {
      results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (status) {
      results = results.filter(p => p.status.toLowerCase() === status.toLowerCase());
    }
    if (featured !== undefined) {
      const isFeatured = featured === 'true' || featured === true;
      results = results.filter(p => p.featured === isFeatured);
    }
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
    try {
      const { data, error } = await supabase.from('projects').select('*').eq('id', stringId).single();
      if (!error && data) {
        return {
          ...data,
          tags: Array.isArray(data.tags) ? data.tags : []
        };
      }
    } catch (e) {
      // fallback
    }
    return store.projects.find(p => String(p.id) === stringId) || null;
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

    try {
      const { data, error } = await supabase.from('projects').insert(newProject).select().single();
      if (!error && data) {
        store.projects.unshift(data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase insert failed:', e.message);
    }

    store.projects.unshift(newProject);
    return newProject;
  }

  async update(id, updates) {
    const stringId = String(id);
    try {
      const { data, error } = await supabase.from('projects').update(updates).eq('id', stringId).select().single();
      if (!error && data) {
        const index = store.projects.findIndex(p => String(p.id) === stringId);
        if (index !== -1) store.projects[index] = data;
        return data;
      }
    } catch (e) {
      console.warn('Supabase update failed:', e.message);
    }

    const index = store.projects.findIndex(p => String(p.id) === stringId);
    if (index === -1) return null;
    store.projects[index] = { ...store.projects[index], ...updates };
    return store.projects[index];
  }

  async delete(id) {
    const stringId = String(id);
    try {
      await supabase.from('projects').delete().eq('id', stringId);
    } catch (e) {
      console.warn('Supabase delete failed:', e.message);
    }
    const index = store.projects.findIndex(p => String(p.id) === stringId);
    if (index === -1) return false;
    store.projects.splice(index, 1);
    return true;
  }
}

export const projectRepository = new ProjectRepository();
