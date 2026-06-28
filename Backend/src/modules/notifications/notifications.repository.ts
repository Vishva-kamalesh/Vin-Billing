import { prisma } from '../../lib/prisma';
import { CreateNotificationDto, PaginationQuery } from './notifications.dto';
import { logger } from '../../middleware/errorHandler';

export class NotificationsRepository {
  async getUserNotifications(user_id: string, query: PaginationQuery) {
    const page = Number(query.page) || 1;
    const limit = Math.min(Number(query.limit) || 20, 100);
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.notification.findMany({
        where: { OR: [{ user_id }, { user_id: null }] },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit
      }),
      prisma.notification.count({
        where: { OR: [{ user_id }, { user_id: null }] }
      })
    ]);

    return { data, total, page, limit };
  }

  async markAsRead(id: string, user_id: string) {
    return prisma.notification.updateMany({
      where: { id, OR: [{ user_id }, { user_id: null }] },
      data: { is_read: true }
    });
  }

  async markAllAsRead(user_id: string) {
    return prisma.notification.updateMany({
      where: { OR: [{ user_id }, { user_id: null }], is_read: false },
      data: { is_read: true }
    });
  }

  async getLiveOps() {
    const notifications = await prisma.notification.findMany({
      where: { is_read: false, user_id: null }, // System wide notifications
      orderBy: { created_at: 'desc' },
      take: 20
    });

    return notifications.map(n => ({
      id: n.id,
      text: n.title, // Map title to text
      type: n.type,
      created_at: n.created_at
    }));
  }

  async create(data: CreateNotificationDto) {
    return prisma.notification.create({
      data: {
        user_id: data.user_id || null,
        type: data.type,
        title: data.title,
        body: data.body,
        channel: data.channel,
        reference_id: data.reference_id
      }
    });
  }
}
