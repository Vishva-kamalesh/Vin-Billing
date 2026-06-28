import { z } from 'zod';
import { NotificationType, NotificationChannel } from '@prisma/client';

export const CreateNotificationSchema = z.object({
  user_id: z.string().nullable().optional(),
  type: z.nativeEnum(NotificationType),
  title: z.string(),
  body: z.string(),
  channel: z.nativeEnum(NotificationChannel),
  reference_id: z.string().optional()
});

export type CreateNotificationDto = z.infer<typeof CreateNotificationSchema>;

export interface PaginationQuery {
  page?: number;    // default 1
  limit?: number;   // default 20, max 100
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
