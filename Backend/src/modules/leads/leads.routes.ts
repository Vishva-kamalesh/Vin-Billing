import { Router } from 'express';
import { LeadsController } from './leads.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
const controller = new LeadsController();

router.use(authenticate);

router.get('/', controller.getLeads);
router.post('/', controller.createLead);
router.get('/:id', controller.getLead);
router.patch('/:id', controller.updateLead);

router.post('/:id/followups', controller.scheduleFollowup);
router.patch('/:id/followups/:fid', controller.markFollowupDone);

router.post('/:id/convert', controller.convertLead);

export default router;
