import { supabase } from '../config/supabase.js';
import { ApiError } from '../errors/api-error.js';

export class UpdateRepository {
  async findAll({ project_id, status = 'Published', limit = 50, offset = 0 } = {}) {
    let query = supabase
      .from('updates')
      .select('*, projects:project_id(id, slug, name, category, accent)')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    if (status === 'Published') {
      const now = new Date().toISOString();
      query = query.lte('published_at', now);
    }

    if (project_id) {
      query = query.eq('project_id', project_id);
    }

    const { data, error } = await query;
    if (error) {
      if (error.code === '42P01' || error.code === 'PGRST205' || error.message?.includes('relation') || error.message?.includes('not find the table')) {
        return [];
      }
      throw new ApiError(`Database error fetching updates: ${error.message}`, 500, 'DATABASE_ERROR');
    }

    return data || [];
  }

  async findBySlug(slug, { publishedOnly = true } = {}) {
    if (!slug || typeof slug !== 'string') return null;
    const cleanSlug = slug.trim().toLowerCase();
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(cleanSlug)) return null;

    let query = supabase
      .from('updates')
      .select('*, projects:project_id(id, slug, name, category, url, accent)')
      .eq('slug', cleanSlug);

    if (publishedOnly) {
      const now = new Date().toISOString();
      query = query.eq('status', 'Published').lte('published_at', now);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      if (error.code === '42P01' || error.code === 'PGRST205' || error.message?.includes('relation') || error.message?.includes('not find the table')) {
        return null;
      }
      throw new ApiError(`Database error fetching update by slug: ${error.message}`, 500, 'DATABASE_ERROR');
    }

    return data;
  }

  async findById(id) {
    if (!id || typeof id !== 'string') return null;

    const { data, error } = await supabase
      .from('updates')
      .select('*')
      .eq('id', id.trim())
      .maybeSingle();

    if (error) {
      throw new ApiError(`Database error fetching update by id: ${error.message}`, 500, 'DATABASE_ERROR');
    }

    return data;
  }

  async create(updateData) {
    const id = updateData.id || `upd_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    const record = {
      ...updateData,
      id,
      published_at: updateData.published_at || now,
      created_at: now,
      updated_at: now
    };

    const { data, error } = await supabase
      .from('updates')
      .insert(record)
      .select()
      .single();

    if (error || !data) {
      throw new ApiError(`Database error creating update: ${error?.message || 'Insert failed'}`, 500, 'DATABASE_ERROR');
    }

    return data;
  }

  async update(id, updates) {
    const { data, error } = await supabase
      .from('updates')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new ApiError(`Database error updating update: ${error?.message || 'Update failed'}`, 500, 'DATABASE_ERROR');
    }

    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from('updates')
      .delete()
      .eq('id', id);

    if (error) {
      throw new ApiError(`Database error deleting update: ${error.message}`, 500, 'DATABASE_ERROR');
    }

    return { id, deleted: true };
  }
}

export const updateRepository = new UpdateRepository();
