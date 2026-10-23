import { skillRepository } from '../repositories/skill.repository';

export class SkillService {
  constructor(repo = skillRepository) {
    this.repo = repo;
  }

  async listSkills(filter = {}) {
    return this.repo.findAll(filter);
  }
}

export const skillService = new SkillService();
