import { z } from 'zod';

export const UpdateTechnicianSchema = z.object({
  is_available: z.boolean().optional(),
});

export type UpdateTechnicianDto = z.infer<typeof UpdateTechnicianSchema>;
