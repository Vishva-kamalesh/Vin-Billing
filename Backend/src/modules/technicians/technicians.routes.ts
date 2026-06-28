import { Router } from 'express';
import { TechniciansController } from './technicians.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
const controller = new TechniciansController();

router.use(authenticate);

router.get('/', controller.getTechnicians);
router.get('/:id/jobs', controller.getJobs);
router.get('/:id/schedule', controller.getSchedule);
router.patch('/:id/availability', controller.updateAvailability);

export default router;
