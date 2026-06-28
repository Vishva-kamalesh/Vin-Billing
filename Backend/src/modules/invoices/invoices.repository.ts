import { prisma } from '../../lib/prisma';
import { CreateInvoiceDto, PaymentDto, UpdateInvoiceDto } from './invoices.dto';
import { InvoiceStatus } from '@prisma/client';

export class InvoicesRepository {
  async generateInvoiceNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await prisma.invoice.count({
      where: { invoice_number: { startsWith: `VT-${year}` } }
    });
    return `VT-${year}-${String(count + 1).padStart(4, '0')}`;
  }

  async create(data: CreateInvoiceDto, user_id: string) {
    const invoice_number = await this.generateInvoiceNumber();

    // Calculate totals
    let subtotal = 0;
    let totalGstAmount = 0;
    let cgst = 0;
    let sgst = 0;

    const itemsData = data.items.map(item => {
      const line_subtotal = (item.unit_price - item.discount) * item.qty;
      const gst_amount = (line_subtotal * item.gst_rate) / 100;
      const line_total = line_subtotal + gst_amount;

      subtotal += line_subtotal;
      totalGstAmount += gst_amount;
      cgst += gst_amount / 2;
      sgst += gst_amount / 2;

      return {
        product_id: item.product_id,
        serial_no: item.serial_no,
        description: item.description,
        qty: item.qty,
        unit_price: item.unit_price,
        discount: item.discount,
        gst_rate: item.gst_rate,
        gst_amount,
        line_total
      };
    });

    const total = subtotal + totalGstAmount - data.discount;

    return prisma.$transaction(async (tx) => {
      const invoice = await tx.invoice.create({
        data: {
          invoice_number,
          customer_id: data.customer_id,
          due_date: data.due_date ? new Date(data.due_date) : null,
          subtotal,
          discount: data.discount,
          cgst,
          sgst,
          total,
          notes: data.notes,
          status: 'DRAFT',
          items: {
            create: itemsData
          }
        },
        include: { items: true }
      });

      // Stock deduction logic:
      for (const item of data.items) {
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

        // Mark serial as sold if applicable
        if (item.serial_no) {
          await tx.serialItem.update({
            where: { serial_no: item.serial_no },
            data: {
              status: 'SOLD',
              invoice_id: invoice.id
            }
          });
        }

        // Warranty Auto-creation
        const product = await tx.product.findUnique({ where: { id: item.product_id } });
        if (product && product.warranty_months > 0) {
          const startDate = new Date(invoice.invoice_date);
          const endDate = new Date(startDate);
          endDate.setMonth(endDate.getMonth() + product.warranty_months);

          await tx.warranty.create({
            data: {
              customer_id: data.customer_id,
              product_id: item.product_id,
              serial_number: item.serial_no || null,
              invoice_id: invoice.id,
              start_date: startDate,
              end_date: endDate,
              warranty_months: product.warranty_months
            }
          });
        }
      }

      return invoice;
    });
  }

  async getById(id: string) {
    return prisma.invoice.findUnique({
      where: { id },
      include: {
        items: { include: { product: true } },
        payments: true,
        customer: true
      }
    });
  }

  async update(id: string, data: UpdateInvoiceDto) {
    return prisma.invoice.update({
      where: { id },
      data
    });
  }

  async getInvoices(status?: any, customer_id?: string, startDate?: string, endDate?: string) {
    const where: any = {};
    if (status) where.status = status;
    if (customer_id) where.customer_id = customer_id;
    if (startDate && endDate) {
      where.invoice_date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    return prisma.invoice.findMany({
      where,
      include: { customer: true },
      orderBy: { invoice_date: 'desc' }
    });
  }

  async addPayment(invoice_id: string, data: PaymentDto, user_id: string) {
    return prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          invoice_id,
          amount: data.amount,
          method: data.method,
          reference_no: data.reference_no,
          notes: data.notes,
          created_by: user_id
        }
      });

      const invoice = await tx.invoice.findUnique({ where: { id: invoice_id }, include: { payments: true } });
      if (!invoice) throw new Error('Invoice not found');

      const totalPaid = invoice.payments.reduce((sum, p) => sum + Number(p.amount), 0);
      let status: InvoiceStatus = invoice.status;

      if (totalPaid >= Number(invoice.total)) {
        status = 'PAID';
      } else if (totalPaid > 0) {
        status = 'PARTIAL';
      }

      const updated = await tx.invoice.update({
        where: { id: invoice_id },
        data: {
          amount_paid: totalPaid,
          status
        }
      });

      return { payment, invoice: updated };
    });
  }

  async cancelInvoice(id: string, user_id: string) {
    return prisma.$transaction(async (tx) => {
      const invoice = await tx.invoice.findUnique({ where: { id }, include: { items: true } });
      if (!invoice) throw new Error('Invoice not found');
      if (invoice.status === 'CANCELLED') throw new Error('Already cancelled');

      for (const item of invoice.items) {
        // Restore stock
        await tx.inventory.update({
          where: { product_id: item.product_id },
          data: { qty_on_hand: { increment: item.qty } }
        });

        await tx.stockMovement.create({
          data: {
            product_id: item.product_id,
            qty_change: item.qty,
            movement_type: 'RETURN',
            reference_id: invoice.id,
            created_by: user_id,
            note: `Invoice Cancelled: ${invoice.invoice_number}`
          }
        });

        if (item.serial_no) {
          await tx.serialItem.update({
            where: { serial_no: item.serial_no },
            data: { status: 'IN_STOCK', invoice_id: null }
          });
        }
      }

      return tx.invoice.update({
        where: { id },
        data: { status: 'CANCELLED' }
      });
    });
  }
}
