import { Router } from 'express';
import { QuotationsController } from './quotations.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
const controller = new QuotationsController();

router.use(authenticate);

router.get('/', controller.getQuotations);
router.post('/', controller.createQuotation);
router.get('/:id', controller.getQuotation);
router.patch('/:id', controller.updateQuotation);

router.post('/:id/convert', controller.convertToInvoice);
router.get('/:id/pdf', controller.generatePdf);

export default router;
