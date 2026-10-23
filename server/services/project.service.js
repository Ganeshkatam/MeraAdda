import { projectRepository } from '../repositories/project.repository';
import { validateProjectPayload } from '../validators/project.validator';
import { NotFoundError } from '../errors/api-error';

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
