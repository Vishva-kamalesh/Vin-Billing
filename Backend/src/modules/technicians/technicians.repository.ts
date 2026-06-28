import { prisma } from '../../lib/prisma';
import { UpdateTechnicianDto } from './technicians.dto';

export class TechniciansRepository {
  async getTechnicians() {
    const technicians = await prisma.technician.findMany({
      include: {
        user: { select: { id: true, name: true, email: true, phone: true, avatar_url: true } }
      }
    });

    // Append open ticket counts
    const ticketsCounts = await prisma.serviceTicket.groupBy({
      by: ['assigned_to'],
      where: { status: { in: ['ASSIGNED', 'IN_PROGRESS'] } },
      _count: { assigned_to: true }
    });

    return technicians.map(tech => {
      const countObj = ticketsCounts.find(t => t.assigned_to === tech.user_id);
      return {
        ...tech,
        open_jobs_count: countObj ? countObj._count.assigned_to : 0
      };
    });
  }

  async getJobs(technician_id: string) {
    const tech = await prisma.technician.findUnique({ where: { id: technician_id } });
    if (!tech) throw new Error('Technician not found');

    const tickets = await prisma.serviceTicket.findMany({
      where: { 
        assigned_to: tech.user_id,
        status: { in: ['ASSIGNED', 'IN_PROGRESS'] }
      },
      include: { customer: true }
    });

    const amcVisits = await prisma.amcVisit.findMany({
      where: {
        technician_id: tech.user_id,
        // you might only want future visits, but we return all for the technician portal view or filter by today+
      },
      include: { amc: { include: { customer: true, product: true } } }
    });

    return {
      tickets,
      amc_visits: amcVisits
    };
  }

  async getSchedule(technician_id: string, date: string) {
    // A simplified calendar querying by the given date 
    const tech = await prisma.technician.findUnique({ where: { id: technician_id } });
    if (!tech) throw new Error('Technician not found');

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const tickets = await prisma.serviceTicket.findMany({
      where: {
        assigned_to: tech.user_id,
        scheduled_date: { gte: start, lte: end }
      }
    });

    const amcVisits = await prisma.amcVisit.findMany({
      where: {
        technician_id: tech.user_id,
        visited_at: { gte: start, lte: end }
      }
    });

    return { tickets, amc_visits: amcVisits };
  }

  async updateAvailability(id: string, data: UpdateTechnicianDto) {
    return prisma.technician.update({
      where: { id },
      data: { is_available: data.is_available }
    });
  }
}
