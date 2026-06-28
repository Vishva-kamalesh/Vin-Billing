import { Router } from 'express';
import { WarrantyController } from './warranty.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
const controller = new WarrantyController();

router.use(authenticate);

// Warranty Claims global view
router.get('/claims', controller.getClaims);
router.patch('/claims/:claim_id', controller.updateClaim);

router.get('/', controller.getWarranties);
router.get('/:id', controller.getWarranty);

router.post('/:id/claims', controller.createClaim);

export default router;
