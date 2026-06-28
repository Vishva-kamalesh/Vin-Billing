import { z } from 'zod';

export const CreateClaimSchema = z.object({
  description: z.string(),
  ticket_id: z.string().optional()
});

export const UpdateClaimSchema = z.object({
  status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED', 'REJECTED']),
});

export type CreateClaimDto = z.infer<typeof CreateClaimSchema>;
export type UpdateClaimDto = z.infer<typeof UpdateClaimSchema>;
