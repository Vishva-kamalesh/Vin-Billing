import { Request, Response, NextFunction } from 'express';
import { NotificationsService } from './notifications.service';
import { AuthRequest } from '../../middleware/auth.middleware';
import { PaginationQuery } from './notifications.dto';

export class NotificationsController {
  private service: NotificationsService;

  constructor() {
    this.service = new NotificationsService();
  }

  getUserNotifications = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user_id = req.user?.id;
      if (!user_id) return res.status(401).json({ error: 'Unauthorized' });

      const data = await this.service.getUserNotifications(user_id, req.query as PaginationQuery);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  markAsRead = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user_id = req.user?.id;
      if (!user_id) return res.status(401).json({ error: 'Unauthorized' });

      await this.service.markAsRead(req.params.id, user_id);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  markAllAsRead = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user_id = req.user?.id;
      if (!user_id) return res.status(401).json({ error: 'Unauthorized' });

      await this.service.markAllAsRead(user_id);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  getLiveOps = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getLiveOps();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
