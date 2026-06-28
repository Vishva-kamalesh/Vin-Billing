import { z } from 'zod';

export const CreateQuotationItemSchema = z.object({
  product_id: z.string(),
  description: z.string(),
  qty: z.number(),
  unit_price: z.number(),
  discount: z.number().default(0),
  gst_rate: z.number(),
});

export const CreateQuotationSchema = z.object({
  customer_id: z.string(),
  valid_until: z.string().optional(),
  discount: z.number().default(0),
  notes: z.string().optional(),
  items: z.array(CreateQuotationItemSchema).min(1),
});

export const UpdateQuotationSchema = z.object({
  status: z.enum(['DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'CONVERTED']).optional(),
  valid_until: z.string().optional(),
  notes: z.string().optional(),
});

export type CreateQuotationDto = z.infer<typeof CreateQuotationSchema>;
export type UpdateQuotationDto = z.infer<typeof UpdateQuotationSchema>;
