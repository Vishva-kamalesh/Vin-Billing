import { SuppliersRepository } from './suppliers.repository';
import { CreateSupplierDto, UpdateSupplierDto } from './suppliers.dto';

export class SuppliersService {
  private repository: SuppliersRepository;

  constructor() {
    this.repository = new SuppliersRepository();
  }

  async getSuppliers() {
    return this.repository.getSuppliers();
  }

  async getSupplier(id: string) {
    const supplier = await this.repository.getSupplier(id);
    if (!supplier) throw new Error('Supplier not found');
    return supplier;
  }

  async create(data: CreateSupplierDto) {
    return this.repository.create(data);
  }

  async update(id: string, data: UpdateSupplierDto) {
    return this.repository.update(id, data);
  }

  async getPurchaseOrders(id: string) {
    return this.repository.getPurchaseOrders(id);
  }
}
