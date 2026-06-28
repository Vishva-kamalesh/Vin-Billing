import { prisma } from '../../lib/prisma';
import { CreateAmcDto, UpdateAmcDto, LogVisitDto } from './amc.dto';

export class AmcRepository {
  async generateAmcNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await prisma.amcContract.count({
      where: { amc_number: { startsWith: `AMC-${year}` } }
    });
    return `AMC-${year}-${String(count + 1).padStart(4, '0')}`;
  }

  async createReminders(amc_id: string, end_date: Date) {
    const t30 = new Date(end_date);
    t30.setDate(t30.getDate() - 30);

    const t7 = new Date(end_date);
    t7.setDate(t7.getDate() - 7);

    const t0 = new Date(end_date);

    await prisma.amcReminder.createMany({
      data: [
        { amc_id, remind_at: t30, channel: 'WHATSAPP' },
        { amc_id, remind_at: t7, channel: 'WHATSAPP' },
        { amc_id, remind_at: t0, channel: 'WHATSAPP' }
      ]
    });
  }

  async create(data: CreateAmcDto) {
    const amc_number = await this.generateAmcNumber();
    const start = new Date(data.start_date);
    const end = new Date(data.end_date);

    const contract = await prisma.amcContract.create({
      data: {
        amc_number,
        customer_id: data.customer_id,
        product_id: data.product_id,
        serial_number: data.serial_number,
        start_date: start,
        end_date: end,
        total_visits: data.total_visits,
        amount: data.amount,
        notes: data.notes
      }
    });

    await this.createReminders(contract.id, end);
    return contract;
  }

  async getById(id: string) {
    return prisma.amcContract.findUnique({
      where: { id },
      include: {
        customer: true,
        product: true,
        visits: { orderBy: { visited_at: 'desc' } }
      }
    });
  }

  async update(id: string, data: UpdateAmcDto) {
    return prisma.amcContract.update({
      where: { id },
      data
    });
  }

  async getContracts(status?: any, customer_id?: string) {
    const where: any = {};
    if (status) where.status = status;
    if (customer_id) where.customer_id = customer_id;

    return prisma.amcContract.findMany({
      where,
      include: { customer: true, product: true },
      orderBy: { created_at: 'desc' }
    });
  }

  async logVisit(amc_id: string, data: LogVisitDto) {
    return prisma.$transaction(async (tx) => {
      const contract = await tx.amcContract.findUnique({ where: { id: amc_id } });
      if (!contract) throw new Error('AMC not found');

      const visit = await tx.amcVisit.create({
        data: {
          amc_id,
          visited_at: data.visited_at ? new Date(data.visited_at) : new Date(),
          technician_id: data.technician_id,
          notes: data.notes,
          photos: data.photos || []
        }
      });

      const newVisitsDone = contract.visits_done + 1;
      await tx.amcContract.update({
        where: { id: amc_id },
        data: { visits_done: newVisitsDone }
      });

      if (newVisitsDone >= contract.total_visits) {
        // Send a notification to prompt renewal
        const admins = await tx.user.findMany({ where: { role: 'SUPER_ADMIN' } });
        for (const admin of admins) {
          await tx.notification.create({
            data: {
              user_id: admin.id,
              type: 'AMC_RENEWAL',
              title: 'AMC Renewal Prompt',
              body: `AMC ${contract.amc_number} has completed all ${contract.total_visits} visits. Prompt customer for renewal.`,
              channel: 'IN_APP'
            }
          });
        }
      }

      return visit;
    });
  }

  async renewContract(id: string) {
    return prisma.$transaction(async (tx) => {
      const oldContract = await tx.amcContract.findUnique({ where: { id } });
      if (!oldContract) throw new Error('AMC not found');

      // Update old contract
      await tx.amcContract.update({
        where: { id },
        data: { status: 'RENEWED' }
      });

      // Start Date = Old End Date + 1 Day
      const newStart = new Date(oldContract.end_date);
      newStart.setDate(newStart.getDate() + 1);

      // Assuming renewal is for 1 year
      const newEnd = new Date(newStart);
      newEnd.setFullYear(newEnd.getFullYear() + 1);

      const amc_number = await this.generateAmcNumber();

      const newContract = await tx.amcContract.create({
        data: {
          amc_number,
          customer_id: oldContract.customer_id,
          product_id: oldContract.product_id,
          serial_number: oldContract.serial_number,
          start_date: newStart,
          end_date: newEnd,
          total_visits: oldContract.total_visits,
          visits_done: 0,
          amount: oldContract.amount,
          notes: oldContract.notes
        }
      });

      await this.createReminders(newContract.id, newEnd);
      return newContract;
    });
  }

  async getExpiringContracts() {
    const today = new Date();
    const in30Days = new Date(today);
    in30Days.setDate(in30Days.getDate() + 30);

    return prisma.amcContract.findMany({
      where: {
        status: 'ACTIVE',
        end_date: {
          lte: in30Days,
          gte: today
        }
      },
      include: { customer: true }
    });
  }
}
