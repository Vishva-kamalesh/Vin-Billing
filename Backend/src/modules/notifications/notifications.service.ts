import { NotificationsRepository } from './notifications.repository';
import { CreateNotificationDto, PaginationQuery } from './notifications.dto';
import { logger } from '../../middleware/errorHandler';

export class NotificationsService {
  private repository: NotificationsRepository;

  constructor() {
    this.repository = new NotificationsRepository();
  }

  async getUserNotifications(user_id: string, query: PaginationQuery) {
    return this.repository.getUserNotifications(user_id, query);
  }

  async markAsRead(id: string, user_id: string) {
    return this.repository.markAsRead(id, user_id);
  }

  async markAllAsRead(user_id: string) {
    return this.repository.markAllAsRead(user_id);
  }

  async getLiveOps() {
    return this.repository.getLiveOps();
  }

  async dispatch(data: CreateNotificationDto) {
    const notification = await this.repository.create(data);
    
    // Stub for sending to different channels
    if (data.channel === 'WHATSAPP') {
      logger.info(`Sending WHATSAPP notification to user ${data.user_id || 'SYSTEM'}: ${data.title}`);
    } else if (data.channel === 'SMS') {
      logger.info(`Sending SMS notification to user ${data.user_id || 'SYSTEM'}: ${data.title}`);
    } else if (data.channel === 'EMAIL') {
      logger.info(`Sending EMAIL notification to user ${data.user_id || 'SYSTEM'}: ${data.title}`);
    }

    return notification;
  }
}

// Export singleton dispatcher for cross-module usage
export const notificationDispatcher = new NotificationsService();
