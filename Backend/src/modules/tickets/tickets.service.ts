import { TicketsRepository } from './tickets.repository';
import { CreateTicketDto, UpdateTicketDto, AssignTicketDto, LogServiceVisitDto } from './tickets.dto';

export class TicketsService {
  private repository: TicketsRepository;

  constructor() {
    this.repository = new TicketsRepository();
  }

  async createTicket(data: CreateTicketDto) {
    return this.repository.create(data);
  }

  async getTicket(id: string) {
    const ticket = await this.repository.getById(id);
    if (!ticket) throw new Error('Ticket not found');
    return ticket;
  }

  async updateTicket(id: string, data: UpdateTicketDto) {
    return this.repository.update(id, data);
  }

  async getTickets(status?: string, technician_id?: string, date?: string) {
    return this.repository.getTickets(status, technician_id, date);
  }

  async getKanbanBoard() {
    return this.repository.getKanbanBoard();
  }

  async assign(id: string, data: AssignTicketDto) {
    return this.repository.assign(id, data);
  }

  async logVisit(ticket_id: string, technician_id: string, data: LogServiceVisitDto) {
    return this.repository.logVisit(ticket_id, technician_id, data);
  }

  async savePhotos(ticket_id: string, user_id: string, files: Express.Multer.File[]) {
    return this.repository.savePhotos(ticket_id, user_id, files);
  }
}
