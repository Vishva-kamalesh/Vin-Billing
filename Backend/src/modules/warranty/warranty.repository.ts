import { prisma } from '../../lib/prisma';
import { CreateClaimDto, UpdateClaimDto } from './warranty.dto';

export class WarrantyRepository {
  async getWarranties(status?: any, customer_id?: string) {
    const where: any = {};
    if (status) where.status = status;
    if (customer_id) where.customer_id = customer_id;

    return prisma.warranty.findMany({
      where,
      include: { customer: true, product: true, claims: true },
      orderBy: { created_at: 'desc' }
    });
  }

  async getWarranty(id: string) {
    return prisma.warranty.findUnique({
      where: { id },
      include: {
        customer: true,
        product: true,
        claims: { orderBy: { created_at: 'desc' } }
      }
    });
  }

  async createClaim(warranty_id: string, data: CreateClaimDto) {
    return prisma.warrantyClaim.create({
      data: {
        warranty_id,
        description: data.description,
        ticket_id: data.ticket_id
      }
    });
  }

  async updateClaim(id: string, data: UpdateClaimDto) {
    return prisma.warrantyClaim.update({
      where: { id },
      data: { status: data.status }
    });
  }

  async getClaims(status?: any) {
    const where: any = {};
    if (status) where.status = status;
    
    return prisma.warrantyClaim.findMany({
      where,
      include: { warranty: { include: { customer: true, product: true } } },
      orderBy: { created_at: 'desc' }
    });
  }
}
