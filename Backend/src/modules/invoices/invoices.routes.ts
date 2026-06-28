import { Router } from 'express';
import { InvoicesController } from './invoices.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
const controller = new InvoicesController();

router.use(authenticate);

router.get('/', controller.getInvoices);
router.post('/', controller.createInvoice);
router.get('/:id', controller.getInvoice);
router.patch('/:id', controller.updateInvoice);

router.post('/:id/payments', controller.addPayment);
router.get('/:id/pdf', controller.generatePdf);
router.post('/:id/send-whatsapp', controller.sendWhatsapp);
router.post('/:id/cancel', controller.cancelInvoice);

export default router;
