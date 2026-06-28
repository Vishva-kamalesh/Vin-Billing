import { WarrantyRepository } from './warranty.repository';
import { CreateClaimDto, UpdateClaimDto } from './warranty.dto';

export class WarrantyService {
  private repository: WarrantyRepository;

  constructor() {
    this.repository = new WarrantyRepository();
  }

  async getWarranties(status?: string, customer_id?: string) {
    return this.repository.getWarranties(status, customer_id);
  }

  async getWarranty(id: string) {
    const warranty = await this.repository.getWarranty(id);
    if (!warranty) throw new Error('Warranty not found');
    return warranty;
  }

  async createClaim(warranty_id: string, data: CreateClaimDto) {
    return this.repository.createClaim(warranty_id, data);
  }

  async updateClaim(id: string, data: UpdateClaimDto) {
    return this.repository.updateClaim(id, data);
  }

  async getClaims(status?: string) {
    return this.repository.getClaims(status);
  }
}
