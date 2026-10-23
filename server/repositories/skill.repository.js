import { supabase } from '@/lib/supabase';

export class SkillRepository {
  async findAll({ category } = {}) {
    try {
      let query = supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (!error && Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn('Supabase skills fetch failed:', e.message);
    }

    return [
      { name: 'Next.js 16', category: 'Frontend', proficiency: 'Expert' },
      { name: 'React 19', category: 'Frontend', proficiency: 'Expert' },
      { name: 'TypeScript', category: 'Languages', proficiency: 'Expert' },
      { name: 'Node.js', category: 'Backend', proficiency: 'Advanced' },
      { name: 'PostgreSQL', category: 'Database & Cloud', proficiency: 'Advanced' },
      { name: 'Supabase', category: 'Database & Cloud', proficiency: 'Advanced' },
      { name: 'WebSockets / Real-Time', category: 'Backend', proficiency: 'Advanced' },
      { name: 'Clean Architecture', category: 'Architecture', proficiency: 'Expert' }
    ];
  }
}

export const skillRepository = new SkillRepository();
