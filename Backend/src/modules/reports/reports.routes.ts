import { Router } from 'express';
import { ReportsController } from './reports.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
const controller = new ReportsController();

router.use(authenticate);

// Dashboard
router.get('/dashboard/stats', controller.getDashboardStats);

// Sales
router.get('/sales/summary', controller.getSalesSummary);
router.get('/sales/by-category', controller.getSalesByCategory);
router.get('/sales/daily', controller.getSalesDaily);

// Inventory
router.get('/inventory/stock-summary', controller.getStockSummary);
router.get('/inventory/movement', controller.getStockMovement);

// Service
router.get('/service/summary', controller.getServiceSummary);
router.get('/service/technician-performance', controller.getTechnicianPerformance);

// AMC
router.get('/amc/renewals', controller.getAmcRenewals);

export default router;
