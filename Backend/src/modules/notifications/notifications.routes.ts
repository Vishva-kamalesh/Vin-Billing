import { Router } from 'express';
import { NotificationsController } from './notifications.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
const controller = new NotificationsController();

router.use(authenticate);

// Specific paths must go before parameterized paths
router.get('/live-ops', controller.getLiveOps);
router.patch('/read-all', controller.markAllAsRead);

router.get('/', controller.getUserNotifications);
router.patch('/:id/read', controller.markAsRead);

export default router;
