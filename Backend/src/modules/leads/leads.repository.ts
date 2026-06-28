import { prisma } from '../../lib/prisma';
import { CreateLeadDto, UpdateLeadDto, ScheduleFollowupDto } from './leads.dto';
import { Prisma } from '@prisma/client';

export class LeadsRepository {
  async create(data: CreateLeadDto) {
    return prisma.lead.create({ data });
  }

  async update(id: string, data: UpdateLeadDto) {
    return prisma.lead.update({
      where: { id },
      data,
    });
  }

  async getById(id: string) {
    return prisma.lead.findUnique({
      where: { id },
      include: {
        followups: {
          orderBy: { followup_at: 'desc' }
        }
      }
    });
  }

  async getLeadsByStatus(status: any, source: any, assigned_to: any) {
    const where: any = {};
    if (status) where.status = status;
    if (source) where.source = source;
    if (assigned_to) where.assigned_to = assigned_to;

    return prisma.lead.findMany({
      where,
      orderBy: { created_at: 'desc' }
    });
  }

  async addFollowup(lead_id: string, data: ScheduleFollowupDto, created_by: string) {
    return prisma.leadFollowup.create({
      data: {
        lead_id,
        note: data.note,
        followup_at: data.followup_at,
        created_by
      }
    });
  }

  async markFollowupDone(followup_id: string) {
    return prisma.leadFollowup.update({
      where: { id: followup_id },
      data: {
        done: true,
        done_at: new Date()
      }
    });
  }

  async convertLead(lead_id: string, lead: any) {
    // Transaction wrapper for lead conversion
    return prisma.$transaction(async (tx) => {
      const customer = await tx.customer.create({
        data: {
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
        }
      });

      await tx.lead.update({
        where: { id: lead_id },
        data: {
          status: 'WON',
          customer_id: customer.id
        }
      });

      return customer;
    });
  }
}
