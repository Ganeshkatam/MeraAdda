import { store } from './memory-store';

export class ProjectRepository {
  async findAll({ category, status, featured, query } = {}) {
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
    return store.projects.find(p => String(p.id) === stringId) || null;
  }

  async create(projectData) {
    const newProject = {
      id: String(Date.now()),
      ...projectData
    };
    store.projects.unshift(newProject);
    return newProject;
  }

  async update(id, updates) {
    const stringId = String(id);
    const index = store.projects.findIndex(p => String(p.id) === stringId);
    if (index === -1) {
      return null;
    }
    store.projects[index] = {
      ...store.projects[index],
      ...updates
    };
    return store.projects[index];
  }

  async delete(id) {
    const stringId = String(id);
    const index = store.projects.findIndex(p => String(p.id) === stringId);
    if (index === -1) {
      return false;
    }
    store.projects.splice(index, 1);
    return true;
  }
}

export const projectRepository = new ProjectRepository();
