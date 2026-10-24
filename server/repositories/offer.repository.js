import { supabase } from '../config/supabase.js';
import { ApiError } from '../errors/api-error.js';

export class OfferRepository {
  async findAll({ project_id, status = 'Published', onlyActive = true, limit = 50, offset = 0 } = {}) {
    let query = supabase
      .from('offers')
      .select('*, projects:project_id(id, slug, name, category, accent)')
      .order('is_featured', { ascending: false })
      .order('end_date', { ascending: true })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    if (project_id) {
      query = query.eq('project_id', project_id);
    }

    if (onlyActive) {
      const now = new Date().toISOString();
      query = query.lte('start_date', now).gte('end_date', now);
    }

    const { data, error } = await query;
    if (error) {
      if (error.code === '42P01' || error.code === 'PGRST205' || error.message?.includes('relation') || error.message?.includes('not find the table')) {
        return [];
      }
      throw new ApiError(`Database error fetching offers: ${error.message}`, 500, 'DATABASE_ERROR');
    }

    return data || [];
  }

  async findBySlug(slug, onlyActive = true) {
    if (!slug || typeof slug !== 'string') return null;
    const cleanSlug = slug.trim().toLowerCase();
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(cleanSlug)) return null;

    let query = supabase
      .from('offers')
      .select('*, projects:project_id(id, slug, name, category, url, accent)')
      .eq('slug', cleanSlug);

    if (onlyActive) {
      const now = new Date().toISOString();
      query = query.eq('status', 'Published').lte('start_date', now).gte('end_date', now);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      if (error.code === '42P01' || error.code === 'PGRST205' || error.message?.includes('relation') || error.message?.includes('not find the table')) {
        return null;
      }
      throw new ApiError(`Database error fetching offer by slug: ${error.message}`, 500, 'DATABASE_ERROR');
    }

    return data;
  }

  async findById(id) {
    if (!id || typeof id !== 'string') return null;

    const { data, error } = await supabase
      .from('offers')
      .select('*')
      .eq('id', id.trim())
      .maybeSingle();

    if (error) {
      throw new ApiError(`Database error fetching offer by id: ${error.message}`, 500, 'DATABASE_ERROR');
    }

    return data;
  }

  async create(offerData) {
    const id = offerData.id || `off_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    const record = {
      ...offerData,
      id,
      created_at: now,
      updated_at: now
    };

    const { data, error } = await supabase
      .from('offers')
      .insert(record)
      .select()
      .single();

    if (error || !data) {
      throw new ApiError(`Database error creating offer: ${error?.message || 'Insert failed'}`, 500, 'DATABASE_ERROR');
    }

    return data;
  }

  async update(id, updates) {
    const { data, error } = await supabase
      .from('offers')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new ApiError(`Database error updating offer: ${error?.message || 'Update failed'}`, 500, 'DATABASE_ERROR');
    }

    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from('offers')
      .delete()
      .eq('id', id);

    if (error) {
      throw new ApiError(`Database error deleting offer: ${error.message}`, 500, 'DATABASE_ERROR');
    }

    return { id, deleted: true };
  }
}

export const offerRepository = new OfferRepository();
