import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

let swaggerDocument: any;
try {
  swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, '../swagger-output.json'), 'utf8'));
} catch (e) {
  console.log('Swagger documentation not found. Run node swagger.js to generate it.');
}

import userRoutes from './modules/users/users.routes';
import authRoutes from './modules/auth/auth.routes';
import customerRoutes from './modules/customers/customers.routes';
import leadRoutes from './modules/leads/leads.routes';
import productRoutes from './modules/products/products.routes';
import inventoryRoutes from './modules/inventory/inventory.routes';
import invoiceRoutes from './modules/invoices/invoices.routes';
import quotationRoutes from './modules/quotations/quotations.routes';
import amcRoutes from './modules/amc/amc.routes';
import ticketRoutes from './modules/tickets/tickets.routes';
import technicianRoutes from './modules/technicians/technicians.routes';
import warrantyRoutes from './modules/warranty/warranty.routes';
import supplierRoutes from './modules/suppliers/suppliers.routes';
import reportRoutes from './modules/reports/reports.routes';
import notificationRoutes from './modules/notifications/notifications.routes';
import { startFollowupCron } from './jobs/followups.job';
import { startLowStockCron } from './jobs/lowStock.job';
import { startQuotationExpiryCron } from './jobs/expiry.job';
import { startAmcStatusCron } from './jobs/amcStatus.job';
import { startTicketSLACron } from './jobs/ticketSLA.job';
import { startWarrantyStatusCron } from './jobs/warrantyStatus.job';
import { startInvoiceStatusCron } from './jobs/invoiceStatus.job';


const app = express();

app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://vin-billing.vercel.app'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Setup routes
if (swaggerDocument) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/amc', amcRoutes);
app.use('/api/service-tickets', ticketRoutes);
app.use('/api/technicians', technicianRoutes);
app.use('/api/warranties', warrantyRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/notifications', notificationRoutes);

// Start background jobs
startFollowupCron();
startLowStockCron();
startQuotationExpiryCron();
startAmcStatusCron();
startTicketSLACron();
startWarrantyStatusCron();
startInvoiceStatusCron();

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Swagger API Documentation available at http://localhost:${PORT}/api-docs`);
});

export default app;
