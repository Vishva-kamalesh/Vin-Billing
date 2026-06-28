import { ReportsRepository } from './reports.repository';
import { DateRangeDto } from './reports.dto';

export class ReportsService {
  private repository: ReportsRepository;

  constructor() {
    this.repository = new ReportsRepository();
  }

  async getSalesSummary(data: DateRangeDto) {
    return this.repository.getSalesSummary(data);
  }

  async getSalesByCategory(data: DateRangeDto) {
    return this.repository.getSalesByCategory(data);
  }

  async getSalesDaily(data: DateRangeDto) {
    return this.repository.getSalesDaily(data);
  }

  async getStockSummary() {
    return this.repository.getStockSummary();
  }

  async getStockMovement(data: DateRangeDto) {
    return this.repository.getStockMovement(data);
  }

  async getServiceSummary(data: DateRangeDto) {
    return this.repository.getServiceSummary(data);
  }

  async getTechnicianPerformance(data: DateRangeDto) {
    return this.repository.getTechnicianPerformance(data);
  }

  async getAmcRenewals(data: DateRangeDto) {
    return this.repository.getAmcRenewals(data);
  }

  async getDashboardStats() {
    return this.repository.getDashboardStats();
  }
}
