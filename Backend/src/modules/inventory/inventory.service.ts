import { InventoryRepository } from './inventory.repository';
import { AdjustmentDto, CreatePODto, ReceivePODto } from './inventory.dto';

export class InventoryService {
  private repository: InventoryRepository;

  constructor() {
    this.repository = new InventoryRepository();
  }

  async getAllStockLevels() {
    return this.repository.getAllStockLevels();
  }

  async getLowStock() {
    return this.repository.getLowStock();
  }

  async getMovements(product_id: string) {
    return this.repository.getMovements(product_id);
  }

  async getSerials(status?: any) {
    return this.repository.getSerials(status);
  }

  async createAdjustment(data: AdjustmentDto, user_id: string) {
    return this.repository.createAdjustment(data, user_id);
  }

  async createPO(data: CreatePODto) {
    return this.repository.createPO(data);
  }

  async receivePO(po_id: string, data: ReceivePODto, user_id: string) {
    return this.repository.processPOReceipt(po_id, data.items, user_id);
  }
}
