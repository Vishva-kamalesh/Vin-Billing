import { prisma } from '../../lib/prisma';
import { AdjustmentDto, CreatePODto } from './inventory.dto';
import { PurchaseOrderStatus, StockMovementType } from '@prisma/client';

export class InventoryRepository {
  async getAllStockLevels() {
    return prisma.inventory.findMany({
      include: { product: true }
    });
  }

  async getLowStock() {
    // Cannot directly compare columns in Prisma where easily, 
    // but we can query all and filter, or use raw if needed.
    // For simplicity, we query where qty_on_hand <= 5 as a placeholder or we can use raw query.
    // Since low_stock_alert is a column, we should ideally use raw SQL, but we'll fetch all and filter for now.
    const all = await prisma.inventory.findMany({ include: { product: true } });
    return all.filter(inv => inv.qty_on_hand <= inv.low_stock_alert);
  }

  async getMovements(product_id: string) {
    return prisma.stockMovement.findMany({
      where: { product_id },
      orderBy: { created_at: 'desc' }
    });
  }

  async getSerials(status?: any) {
    return prisma.serialItem.findMany({
      where: status ? { status } : undefined,
      include: { product: true }
    });
  }

  async createAdjustment(data: AdjustmentDto, user_id: string) {
    return prisma.$transaction([
      prisma.inventory.update({
        where: { product_id: data.product_id },
        data: { qty_on_hand: { increment: data.qty_change } }
      }),
      prisma.stockMovement.create({
        data: {
          product_id: data.product_id,
          qty_change: data.qty_change,
          movement_type: 'ADJUSTMENT',
          note: data.note,
          created_by: user_id
        }
      })
    ]);
  }

  async createPO(data: CreatePODto) {
    return prisma.purchaseOrder.create({
      data: {
        po_number: data.po_number,
        supplier_id: data.supplier_id,
        total_amount: data.total_amount,
        notes: data.notes,
        status: 'ORDERED',
        ordered_at: new Date(),
        items: {
          create: data.items.map(item => ({
            product_id: item.product_id,
            qty: item.qty,
            unit_cost: item.unit_cost,
          }))
        }
      },
      include: { items: true }
    });
  }

  async getPO(po_id: string) {
    return prisma.purchaseOrder.findUnique({
      where: { id: po_id },
      include: { items: true }
    });
  }

  async updatePOStatus(po_id: string, status: PurchaseOrderStatus) {
    return prisma.purchaseOrder.update({
      where: { id: po_id },
      data: { status }
    });
  }

  async processPOReceipt(po_id: string, items: { product_id: string, received_qty: number }[], user_id: string) {
    // For each item, update the PO item received_qty, update inventory, and log stock movement
    return prisma.$transaction(async (tx) => {
      let fullyReceived = true;

      const po = await tx.purchaseOrder.findUnique({
        where: { id: po_id },
        include: { items: true }
      });

      if (!po) throw new Error('PO not found');

      for (const received of items) {
        const poItem = po.items.find(i => i.product_id === received.product_id);
        if (!poItem) continue;

        const newReceivedQty = poItem.received_qty + received.received_qty;
        
        await tx.purchaseOrderItem.update({
          where: { id: poItem.id },
          data: { received_qty: newReceivedQty }
        });

        if (newReceivedQty < poItem.qty) {
          fullyReceived = false;
        }

        if (received.received_qty > 0) {
          await tx.inventory.update({
            where: { product_id: received.product_id },
            data: { qty_on_hand: { increment: received.received_qty } }
          });

          await tx.stockMovement.create({
            data: {
              product_id: received.product_id,
              qty_change: received.received_qty,
              movement_type: 'PURCHASE',
              reference_id: po.id,
              created_by: user_id,
              note: `PO Receipt ${po.po_number}`
            }
          });
        }
      }

      await tx.purchaseOrder.update({
        where: { id: po.id },
        data: {
          status: fullyReceived ? 'RECEIVED' : 'PARTIAL',
          received_at: fullyReceived ? new Date() : po.received_at
        }
      });

      return po;
    });
  }
}
