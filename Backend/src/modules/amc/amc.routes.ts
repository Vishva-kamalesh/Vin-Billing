import { Router } from 'express';
import { AmcController } from './amc.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
const controller = new AmcController();

router.use(authenticate);

// Put /expiring before /:id to avoid route collision
router.get('/expiring', controller.getExpiringContracts);

router.get('/', controller.getContracts);
router.post('/', controller.createContract);
router.get('/:id', controller.getContract);
router.patch('/:id', controller.updateContract);

router.post('/:id/visits', controller.logVisit);
router.post('/:id/renew', controller.renewContract);

export default router;
