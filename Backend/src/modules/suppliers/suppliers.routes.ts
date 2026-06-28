import { Router } from 'express';
import { SuppliersController } from './suppliers.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
const controller = new SuppliersController();

router.use(authenticate);

router.get('/', controller.getSuppliers);
router.post('/', controller.createSupplier);
router.get('/:id', controller.getSupplier);
router.patch('/:id', controller.updateSupplier);
router.get('/:id/purchase-orders', controller.getPurchaseOrders);

export default router;
