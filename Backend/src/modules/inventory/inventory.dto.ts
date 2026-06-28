import { z } from 'zod';

export const AdjustmentSchema = z.object({
  product_id: z.string(),
  qty_change: z.number(),
  note: z.string().optional(),
});

export const CreatePOSchema = z.object({
  supplier_id: z.string(),
  po_number: z.string(),
  total_amount: z.number(),
  notes: z.string().optional(),
  items: z.array(z.object({
    product_id: z.string(),
    qty: z.number(),
    unit_cost: z.number(),
  })),
});

export const ReceivePOSchema = z.object({
  items: z.array(z.object({
    product_id: z.string(),
    received_qty: z.number(),
  })),
});

export type AdjustmentDto = z.infer<typeof AdjustmentSchema>;
export type CreatePODto = z.infer<typeof CreatePOSchema>;
export type ReceivePODto = z.infer<typeof ReceivePOSchema>;
