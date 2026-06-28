import { z } from 'zod';

export const DateRangeSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional()
});

export type DateRangeDto = z.infer<typeof DateRangeSchema>;
