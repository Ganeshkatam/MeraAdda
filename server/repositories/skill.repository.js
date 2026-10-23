import { supabase } from '../../lib/supabase.js';
import { ApiError } from '../errors/api-error.js';

export class SkillRepository {
  async findAll({ category } = {}) {
    let query = supabase
      .from('skills')
      .select('*')
      .order('display_order', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) {
      throw new ApiError(`Database error fetching skills: ${error.message}`, 500, 'DATABASE_ERROR');
    }

    return (data || []).map(skill => ({
      id: skill.id,
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      display_order: skill.display_order
    }));
  }
}

export const skillRepository = new SkillRepository();
