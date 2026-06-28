import { Router } from 'express';
import { CustomersController } from './customers.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
const controller = new CustomersController();

router.use(authenticate);

router.get('/', controller.getCustomers);
router.post('/', controller.createCustomer);
router.get('/:id', controller.getFullProfile);
router.patch('/:id', controller.updateCustomer);
router.delete('/:id', controller.softDeleteCustomer);
router.post('/:id/addresses', controller.addAddress);
router.get('/:id/timeline', controller.getTimeline);
router.post('/:id/notes', controller.addNote);

export default router;
