import { z } from 'zod';

export const CreateAmcSchema = z.object({
  customer_id: z.string(),
  product_id: z.string(),
  serial_number: z.string().optional(),
  start_date: z.string(),
  end_date: z.string(),
  total_visits: z.number().default(4),
  amount: z.number(),
  notes: z.string().optional(),
});

export const UpdateAmcSchema = z.object({
  status: z.enum(['ACTIVE', 'EXPIRING_SOON', 'EXPIRED', 'RENEWED', 'CANCELLED']).optional(),
  notes: z.string().optional(),
});

export const LogVisitSchema = z.object({
  visited_at: z.string().optional(),
  technician_id: z.string(),
  notes: z.string().optional(),
  photos: z.array(z.string()).optional(),
});

export type CreateAmcDto = z.infer<typeof CreateAmcSchema>;
export type UpdateAmcDto = z.infer<typeof UpdateAmcSchema>;
export type LogVisitDto = z.infer<typeof LogVisitSchema>;
