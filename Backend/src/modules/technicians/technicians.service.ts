import { TechniciansRepository } from './technicians.repository';
import { UpdateTechnicianDto } from './technicians.dto';

export class TechniciansService {
  private repository: TechniciansRepository;

  constructor() {
    this.repository = new TechniciansRepository();
  }

  async getTechnicians() {
    return this.repository.getTechnicians();
  }

  async getJobs(id: string) {
    return this.repository.getJobs(id);
  }

  async getSchedule(id: string, date: string) {
    return this.repository.getSchedule(id, date);
  }

  async updateAvailability(id: string, data: UpdateTechnicianDto) {
    return this.repository.updateAvailability(id, data);
  }
}
