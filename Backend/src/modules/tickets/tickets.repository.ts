import { prisma } from '../../lib/prisma';
import { CreateTicketDto, UpdateTicketDto, AssignTicketDto, LogServiceVisitDto } from './tickets.dto';
import { logger } from '../../middleware/errorHandler';

export class TicketsRepository {
  async generateTicketNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await prisma.serviceTicket.count({
      where: { ticket_number: { startsWith: `SRV-${year}` } }
    });
    return `SRV-${year}-${String(count + 1).padStart(4, '0')}`;
  }

  async create(data: CreateTicketDto) {
    const ticket_number = await this.generateTicketNumber();

    return prisma.serviceTicket.create({
      data: {
        ticket_number,
        customer_id: data.customer_id,
        product_id: data.product_id,
        serial_number: data.serial_number,
        complaint: data.complaint,
        priority: data.priority,
        scheduled_date: data.scheduled_date ? new Date(data.scheduled_date) : null
      }
    });
  }

  async getById(id: string) {
    return prisma.serviceTicket.findUnique({
      where: { id },
      include: {
        customer: true,
        visits: { orderBy: { visited_at: 'desc' } },
        photos: { orderBy: { created_at: 'desc' } }
      }
    });
  }

  async update(id: string, data: UpdateTicketDto) {
    const updateData: any = { ...data };
    if (data.scheduled_date) updateData.scheduled_date = new Date(data.scheduled_date);
    if (data.status === 'COMPLETED') updateData.resolved_at = new Date();

    return prisma.serviceTicket.update({
      where: { id },
      data: updateData
    });
  }

  async getTickets(status?: any, technician_id?: string, date?: string) {
    const where: any = {};
    if (status) where.status = status;
    if (technician_id) where.assigned_to = technician_id;
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      where.scheduled_date = { gte: start, lte: end };
    }

    return prisma.serviceTicket.findMany({
      where,
      include: { customer: true },
      orderBy: { created_at: 'desc' }
    });
  }

  async getKanbanBoard() {
    const tickets = await prisma.serviceTicket.findMany({
      where: { status: { in: ['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED'] } },
      select: {
        id: true,
        ticket_number: true,
        status: true,
        priority: true,
        scheduled_date: true,
        assigned_to: true,
        customer: { select: { name: true } },
        complaint: true
      },
      orderBy: { priority: 'desc' } // or created_at
    });

    const board = {
      OPEN: tickets.filter(t => t.status === 'OPEN'),
      ASSIGNED: tickets.filter(t => t.status === 'ASSIGNED'),
      IN_PROGRESS: tickets.filter(t => t.status === 'IN_PROGRESS'),
      COMPLETED: tickets.filter(t => t.status === 'COMPLETED')
    };

    return board;
  }

  async assign(id: string, data: AssignTicketDto) {
    const ticket = await prisma.serviceTicket.update({
      where: { id },
      data: {
        assigned_to: data.technician_id,
        status: 'ASSIGNED'
      },
      include: { customer: true }
    });

    // Notify technician logic (placeholder for WhatsApp/SMS)
    logger.info(`Notifying technician ${data.technician_id} about SRV ${ticket.ticket_number} at ${ticket.customer.phone || 'customer location'}`);

    return ticket;
  }

  async logVisit(ticket_id: string, technician_id: string, data: LogServiceVisitDto) {
    return prisma.serviceVisit.create({
      data: {
        ticket_id,
        technician_id,
        visited_at: data.visited_at ? new Date(data.visited_at) : new Date(),
        notes: data.notes,
        parts_used: data.parts_used ? data.parts_used : null
      }
    });
  }

  async savePhotos(ticket_id: string, user_id: string, files: Express.Multer.File[]) {
    const photosData = files.map(f => ({
      ticket_id,
      url: `/uploads/service/${ticket_id}/${f.filename}`,
      uploaded_by: user_id
    }));

    await prisma.servicePhoto.createMany({ data: photosData });

    return prisma.servicePhoto.findMany({
      where: { ticket_id, uploaded_by: user_id },
      orderBy: { created_at: 'desc' },
      take: files.length
    });
  }
}
