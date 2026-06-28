import { z } from 'zod';

export const CreateInvoiceItemSchema = z.object({
  product_id: z.string(),
  serial_no: z.string().optional(),
  description: z.string(),
  qty: z.number(),
  unit_price: z.number(),
  discount: z.number().default(0),
  gst_rate: z.number(),
});

export const CreateInvoiceSchema = z.object({
  customer_id: z.string(),
  due_date: z.string().optional(),
  discount: z.number().default(0),
  notes: z.string().optional(),
  items: z.array(CreateInvoiceItemSchema).min(1),
});

export const UpdateInvoiceSchema = z.object({
  status: z.enum(['DRAFT', 'SENT', 'PARTIAL', 'PAID', 'OVERDUE', 'CANCELLED']).optional(),
  notes: z.string().optional(),
  due_date: z.string().optional(),
});

export const PaymentSchema = z.object({
  amount: z.number(),
  method: z.enum(['CASH', 'UPI', 'CARD', 'CHEQUE', 'BANK_TRANSFER', 'CREDIT']),
  reference_no: z.string().optional(),
  notes: z.string().optional(),
});

export type CreateInvoiceDto = z.infer<typeof CreateInvoiceSchema>;
export type UpdateInvoiceDto = z.infer<typeof UpdateInvoiceSchema>;
export type PaymentDto = z.infer<typeof PaymentSchema>;
