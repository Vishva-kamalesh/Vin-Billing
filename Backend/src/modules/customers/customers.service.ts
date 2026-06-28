import { CustomersRepository } from './customers.repository';
import { CreateCustomerDto, UpdateCustomerDto, CreateAddressDto, CreateNoteDto } from './customers.dto';

export class CustomersService {
  private repository: CustomersRepository;

  constructor() {
    this.repository = new CustomersRepository();
  }

  async createCustomer(data: CreateCustomerDto) {
    return this.repository.create(data);
  }

  async updateCustomer(id: string, data: UpdateCustomerDto) {
    return this.repository.update(id, data);
  }

  async softDeleteCustomer(id: string) {
    return this.repository.softDelete(id);
  }

  async getCustomers(query?: string) {
    if (query) {
      return this.repository.search(query);
    }
    return this.repository.search('');
  }

  async getFullProfile(id: string) {
    const profile = await this.repository.getFullProfile(id);
    if (!profile) throw new Error('Customer not found');
    return profile;
  }

  async getTimeline(id: string) {
    const data = await this.repository.getTimelineData(id);
    if (!data) throw new Error('Customer not found');

    const timeline: any[] = [];

    data.invoices.forEach(inv => timeline.push({ type: 'INVOICE', date: inv.created_at, data: inv }));
    data.amc_contracts.forEach(amc => timeline.push({ type: 'AMC_CONTRACT', date: amc.created_at, data: amc }));
    data.service_tickets.forEach(st => timeline.push({ type: 'SERVICE_TICKET', date: st.created_at, data: st }));
    data.notes.forEach(note => timeline.push({ type: 'NOTE', date: note.created_at, data: note }));
    
    data.installed_products.forEach(ip => {
      if (ip.installed_date) {
        timeline.push({ type: 'PRODUCT_INSTALL', date: ip.installed_date, data: ip });
      }
    });

    // Sort descending by date
    timeline.sort((a, b) => b.date.getTime() - a.date.getTime());

    return timeline;
  }

  async addAddress(id: string, data: CreateAddressDto) {
    return this.repository.addAddress(id, data);
  }

  async addNote(id: string, data: CreateNoteDto, created_by: string) {
    return this.repository.addNote(id, data, created_by);
  }
}
