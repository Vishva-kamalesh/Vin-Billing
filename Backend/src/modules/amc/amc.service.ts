import { AmcRepository } from './amc.repository';
import { CreateAmcDto, UpdateAmcDto, LogVisitDto } from './amc.dto';

export class AmcService {
  private repository: AmcRepository;

  constructor() {
    this.repository = new AmcRepository();
  }

  async createContract(data: CreateAmcDto) {
    return this.repository.create(data);
  }

  async getContract(id: string) {
    const contract = await this.repository.getById(id);
    if (!contract) throw new Error('AMC not found');
    return contract;
  }

  async updateContract(id: string, data: UpdateAmcDto) {
    return this.repository.update(id, data);
  }

  async getContracts(status?: string, customer_id?: string) {
    return this.repository.getContracts(status, customer_id);
  }

  async logVisit(id: string, data: LogVisitDto) {
    return this.repository.logVisit(id, data);
  }

  async renewContract(id: string) {
    return this.repository.renewContract(id);
  }

  async getExpiringContracts() {
    return this.repository.getExpiringContracts();
  }
}
