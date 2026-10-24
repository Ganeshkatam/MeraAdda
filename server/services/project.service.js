import { projectRepository } from '../repositories/project.repository.js';
import { validateProjectPayload } from '../validators/project.validator.js';
import { NotFoundError } from '../errors/api-error.js';

export class ProjectService {
  async listProjects(filters = {}) {
    return projectRepository.findAll(filters);
  }

  async getProjectById(id) {
    const project = await projectRepository.findById(id);
    if (!project) {
      throw new NotFoundError(`Project with id ${id} not found`);
    }
    return project;
  }

  async getProjectBySlug(slug) {
    if (!slug) {
      throw new NotFoundError('Project slug is required');
    }
    const project = await projectRepository.findBySlug(slug);
    if (!project) {
      throw new NotFoundError(`Project with slug '${slug}' not found`);
    }
    return project;
  }

  async createProject(rawData) {
    const validated = validateProjectPayload(rawData, false);
    return projectRepository.create(validated);
  }

  async updateProject(id, rawData) {
    await this.getProjectById(id);
    const validated = validateProjectPayload(rawData, true);
    return projectRepository.update(id, validated);
  }

  async deleteProject(id) {
    await this.getProjectById(id);
    return projectRepository.delete(id);
  }
}

export const projectService = new ProjectService();
