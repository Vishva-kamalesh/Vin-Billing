import { prisma } from '../../lib/prisma';
import { DateRangeDto } from './reports.dto';

export class ReportsRepository {
  private parseDates(data: DateRangeDto) {
    const from = data.from ? new Date(data.from) : new Date(0);
    const to = data.to ? new Date(data.to) : new Date();
    if (data.to) to.setHours(23, 59, 59, 999);
    return { from, to };
  }

  async getSalesSummary(data: DateRangeDto) {
    const { from, to } = this.parseDates(data);

    const aggregates = await prisma.invoice.aggregate({
      where: {
        created_at: { gte: from, lte: to },
        status: { not: 'CANCELLED' }
      },
      _sum: { total: true },
      _count: { id: true },
      _avg: { total: true }
    });

    return {
      revenue: aggregates._sum.total || 0,
      invoice_count: aggregates._count.id || 0,
      average_value: aggregates._avg.total || 0
    };
  }

  async getSalesByCategory(data: DateRangeDto) {
    const { from, to } = this.parseDates(data);

    const invoices = await prisma.invoice.findMany({
      where: {
        created_at: { gte: from, lte: to },
        status: { not: 'CANCELLED' }
      },
      include: {
        items: {
          include: { product: { include: { category: true } } }
        }
      }
    });

    const categoryRevenue: Record<string, number> = {};

    invoices.forEach(inv => {
      inv.items.forEach(item => {
        const cat = item.product.category.name;
        if (!categoryRevenue[cat]) categoryRevenue[cat] = 0;
        categoryRevenue[cat] += Number(item.line_total);
      });
    });

    return Object.keys(categoryRevenue).map(cat => ({
      category: cat,
      revenue: categoryRevenue[cat]
    }));
  }

  async getSalesDaily(data: DateRangeDto) {
    const { from, to } = this.parseDates(data);

    const invoices = await prisma.invoice.findMany({
      where: {
        created_at: { gte: from, lte: to },
        status: { not: 'CANCELLED' }
      },
      select: {
        created_at: true,
        total: true
      }
    });

    const dailyRevenue: Record<string, number> = {};

    invoices.forEach(inv => {
      const dateStr = inv.created_at.toISOString().split('T')[0]!;
      if (!dailyRevenue[dateStr]) dailyRevenue[dateStr] = 0;
      dailyRevenue[dateStr] += Number(inv.total);
    });

    return Object.keys(dailyRevenue).map(date => ({
      date,
      revenue: dailyRevenue[date]
    })).sort((a, b) => a.date.localeCompare(b.date));
  }

  async getStockSummary() {
    return prisma.inventory.findMany({
      include: { product: true },
      orderBy: { qty_on_hand: 'asc' }
    });
  }

  async getStockMovement(data: DateRangeDto) {
    const { from, to } = this.parseDates(data);

    return prisma.stockMovement.findMany({
      where: {
        created_at: { gte: from, lte: to }
      },
      orderBy: { created_at: 'desc' }
    });
  }

  async getServiceSummary(data: DateRangeDto) {
    const { from, to } = this.parseDates(data);

    const groups = await prisma.serviceTicket.groupBy({
      by: ['status'],
      where: {
        created_at: { gte: from, lte: to }
      },
      _count: { status: true }
    });

    return groups.map(g => ({
      status: g.status,
      count: g._count.status
    }));
  }

  async getTechnicianPerformance(data: DateRangeDto) {
    const { from, to } = this.parseDates(data);

    const tickets = await prisma.serviceTicket.groupBy({
      by: ['assigned_to'],
      where: {
        status: 'COMPLETED',
        resolved_at: { gte: from, lte: to },
        assigned_to: { not: null }
      },
      _count: { id: true }
    });

    return tickets;
  }

  async getAmcRenewals(data: DateRangeDto) {
    const { from, to } = this.parseDates(data);

    return prisma.amcContract.findMany({
      where: {
        end_date: { gte: from, lte: to },
        status: { in: ['ACTIVE', 'EXPIRING_SOON', 'EXPIRED'] }
      },
      include: { customer: true },
      orderBy: { end_date: 'asc' }
    });
  }

  async getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [
      todaySalesRes,
      monthlyRevenueRes,
      activeAmcCount,
      expiringAmcCount,
      openTicketsCount,
      unassignedTicketsCount,
      lowStockProducts,
      overdueInvoices
    ] = await Promise.all([
      prisma.invoice.aggregate({
        where: { invoice_date: { gte: today }, status: { not: 'CANCELLED' } },
        _sum: { total: true }
      }),
      prisma.invoice.aggregate({
        where: { invoice_date: { gte: startOfMonth }, status: { not: 'CANCELLED' } },
        _sum: { total: true }
      }),
      prisma.amcContract.count({ where: { status: 'ACTIVE' } }),
      prisma.amcContract.count({ where: { status: 'EXPIRING_SOON' } }),
      prisma.serviceTicket.count({ where: { status: { in: ['OPEN', 'ASSIGNED', 'IN_PROGRESS'] } } }),
      prisma.serviceTicket.count({ where: { status: 'OPEN', assigned_to: null } }),
      // For low_stock, we need those where qty_on_hand <= low_stock_alert
      prisma.$queryRaw<{count: number}[]>`SELECT CAST(COUNT(*) AS INTEGER) as count FROM "Inventory" WHERE "qty_on_hand" <= "low_stock_alert"`,
      prisma.invoice.count({ where: { status: 'OVERDUE' } })
    ]);

    return {
      today_sales: todaySalesRes._sum.total || 0,
      monthly_revenue: monthlyRevenueRes._sum.total || 0,
      active_amc_count: activeAmcCount,
      expiring_amc_count: expiringAmcCount,
      open_tickets: openTicketsCount,
      unassigned_tickets: unassignedTicketsCount,
      low_stock_products: lowStockProducts[0]?.count || 0,
      overdue_invoices: overdueInvoices
    };
  }
}
