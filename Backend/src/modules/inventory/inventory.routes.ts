import { Router } from 'express';
import { InventoryController } from './inventory.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
const controller = new InventoryController();

router.use(authenticate);

router.get('/', controller.getAllStockLevels);
router.get('/low-stock', controller.getLowStock);
router.get('/serials', controller.getSerials);
router.get('/:productId/movements', controller.getMovements);
router.post('/adjustment', controller.createAdjustment);

// Purchase Orders under inventory routes for now, or could be separate
router.post('/purchase-orders', controller.createPO);
router.patch('/purchase-orders/:id/receive', controller.receivePO);

export default router;
