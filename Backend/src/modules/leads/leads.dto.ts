import { z } from 'zod';

export const CreateLeadSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email().optional(),
  source: z.enum(['GOOGLE_ADS', 'WEBSITE', 'WHATSAPP', 'REFERENCE', 'WALK_IN', 'SOCIAL_MEDIA', 'OTHER']),
  interested_in: z.enum(['CCTV', 'RO_PURIFIER', 'BATTERY', 'INVERTER', 'SOLAR', 'ACCESSORIES', 'SERVICE_PARTS']),
  notes: z.string().optional(),
  assigned_to: z.string().optional(),
});

export const UpdateLeadSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  source: z.enum(['GOOGLE_ADS', 'WEBSITE', 'WHATSAPP', 'REFERENCE', 'WALK_IN', 'SOCIAL_MEDIA', 'OTHER']).optional(),
  interested_in: z.enum(['CCTV', 'RO_PURIFIER', 'BATTERY', 'INVERTER', 'SOLAR', 'ACCESSORIES', 'SERVICE_PARTS']).optional(),
  notes: z.string().optional(),
  status: z.enum(['NEW', 'CONTACTED', 'QUOTED', 'WON', 'LOST']).optional(),
  assigned_to: z.string().optional(),
});

export const ScheduleFollowupSchema = z.object({
  note: z.string(),
  followup_at: z.string().transform(str => new Date(str)),
});

export type CreateLeadDto = z.infer<typeof CreateLeadSchema>;
export type UpdateLeadDto = z.infer<typeof UpdateLeadSchema>;
export type ScheduleFollowupDto = z.infer<typeof ScheduleFollowupSchema>;
