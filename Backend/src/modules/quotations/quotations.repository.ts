import { prisma } from '../../lib/prisma';
import { CreateQuotationDto, UpdateQuotationDto } from './quotations.dto';

export class QuotationsRepository {
  async generateQuotationNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await prisma.quotation.count({
      where: { quotation_number: { startsWith: `VT-Q-${year}` } }
    });
    return `VT-Q-${year}-${String(count + 1).padStart(4, '0')}`;
  }

  async create(data: CreateQuotationDto) {
    const quotation_number = await this.generateQuotationNumber();

    let subtotal = 0;
    let totalGstAmount = 0;

    const itemsData = data.items.map(item => {
      const line_subtotal = (item.unit_price - item.discount) * item.qty;
      const gst_amount = (line_subtotal * item.gst_rate) / 100;
      const line_total = line_subtotal + gst_amount;

      subtotal += line_subtotal;
      totalGstAmount += gst_amount;

      return {
        product_id: item.product_id,
        description: item.description,
        qty: item.qty,
        unit_price: item.unit_price,
        discount: item.discount,
        gst_rate: item.gst_rate,
        line_total
      };
    });

    const total = subtotal + totalGstAmount - data.discount;

    return prisma.quotation.create({
      data: {
        quotation_number,
        customer_id: data.customer_id,
        valid_until: data.valid_until ? new Date(data.valid_until) : null,
        subtotal,
        discount: data.discount,
        total,
        notes: data.notes,
        items: {
          create: itemsData
        }
      },
      include: { items: true }
    });
  }

  async getById(id: string) {
    return prisma.quotation.findUnique({
      where: { id },
      include: {
        items: { include: { product: true } },
        customer: true
      }
    });
  }

  async update(id: string, data: UpdateQuotationDto) {
    return prisma.quotation.update({
      where: { id },
      data
    });
  }

  async getQuotations() {
    return prisma.quotation.findMany({
      include: { customer: true },
      orderBy: { created_at: 'desc' }
    });
  }

  async convertToInvoice(quotation_id: string, user_id: string) {
    return prisma.$transaction(async (tx) => {
      const quotation = await tx.quotation.findUnique({
        where: { id: quotation_id },
        include: { items: true }
      });

      if (!quotation) throw new Error('Quotation not found');
      if (quotation.status === 'CONVERTED') throw new Error('Already converted');

      // Generate invoice number inside transaction (sequence might be better but this matches current logic)
      const year = new Date().getFullYear();
      const count = await tx.invoice.count({
        where: { invoice_number: { startsWith: `VT-${year}` } }
      });
      const invoice_number = `VT-${year}-${String(count + 1).padStart(4, '0')}`;

      // Calculate CGST and SGST from the items
      let totalCgst = 0;
      let totalSgst = 0;

      const invoiceItemsData = quotation.items.map(item => {
        const line_subtotal = (Number(item.unit_price) - Number(item.discount)) * item.qty;
        const gst_amount = (line_subtotal * Number(item.gst_rate)) / 100;
        
        totalCgst += gst_amount / 2;
        totalSgst += gst_amount / 2;

        return {
          product_id: item.product_id,
          description: item.description,
          qty: item.qty,
          unit_price: item.unit_price,
          discount: item.discount,
          gst_rate: item.gst_rate,
          gst_amount,
          line_total: item.line_total
        };
      });

      // 1. Create the invoice
      const invoice = await tx.invoice.create({
        data: {
          invoice_number,
          customer_id: quotation.customer_id,
          subtotal: quotation.subtotal,
          discount: quotation.discount,
          cgst: totalCgst,
          sgst: totalSgst,
          total: quotation.total,
          notes: quotation.notes,
          status: 'DRAFT',
          items: {
            create: invoiceItemsData
          }
        }
      });

      // 2. Perform Stock Deductions
      for (const item of quotation.items) {
        await tx.inventory.update({
          where: { product_id: item.product_id },
          data: { qty_on_hand: { decrement: item.qty } }
        });

        await tx.stockMovement.create({
          data: {
            product_id: item.product_id,
            qty_change: -item.qty,
            movement_type: 'SALE',
            reference_id: invoice.id,
            created_by: user_id
          }
        });
      }

      // 3. Mark Quotation as CONVERTED
      await tx.quotation.update({
        where: { id: quotation.id },
        data: {
          status: 'CONVERTED',
          converted_to: invoice.id
        }
      });

      return invoice;
    });
  }
}
