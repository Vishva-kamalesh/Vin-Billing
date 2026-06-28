import { prisma } from '../../lib/prisma';
import { CreateSupplierDto, UpdateSupplierDto } from './suppliers.dto';

export class SuppliersRepository {
  async getSuppliers() {
    return prisma.supplier.findMany({
      where: { deleted_at: null },
      orderBy: { created_at: 'desc' }
    });
  }

  async getSupplier(id: string) {
    return prisma.supplier.findUnique({
      where: { id },
      include: {
        pos: {
          orderBy: { created_at: 'desc' },
          take: 10 // preview
        }
      }
    });
  }

  async create(data: CreateSupplierDto) {
    return prisma.supplier.create({ data });
  }

  async update(id: string, data: UpdateSupplierDto) {
    return prisma.supplier.update({
      where: { id },
      data
    });
  }

  async getPurchaseOrders(id: string) {
    return prisma.purchaseOrder.findMany({
      where: { supplier_id: id },
      include: {
        items: true
      },
      orderBy: { created_at: 'desc' }
    });
  }
}
