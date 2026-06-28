import { z } from 'zod';

export const CreateTicketSchema = z.object({
  customer_id: z.string(),
  product_id: z.string().optional(),
  serial_number: z.string().optional(),
  complaint: z.string(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  scheduled_date: z.string().optional()
});

export const UpdateTicketSchema = z.object({
  status: z.enum(['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  scheduled_date: z.string().optional(),
  resolution_notes: z.string().optional()
});

export const AssignTicketSchema = z.object({
  technician_id: z.string()
});

export const LogServiceVisitSchema = z.object({
  visited_at: z.string().optional(),
  notes: z.string().optional(),
  parts_used: z.any().optional(), // Should be parsed as JSON array of parts
});

export type CreateTicketDto = z.infer<typeof CreateTicketSchema>;
export type UpdateTicketDto = z.infer<typeof UpdateTicketSchema>;
export type AssignTicketDto = z.infer<typeof AssignTicketSchema>;
export type LogServiceVisitDto = z.infer<typeof LogServiceVisitSchema>;
