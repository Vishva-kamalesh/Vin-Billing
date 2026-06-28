import cron from 'node-cron';
import { prisma } from '../lib/prisma';
import { logger } from '../middleware/errorHandler';

export const startInvoiceStatusCron = () => {
  // Run daily at 6:00 AM
  cron.schedule('0 6 * * *', async () => {
    logger.info('Running Invoice overdue status cron job...');
    
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const overdue = await prisma.invoice.updateMany({
        where: {
          status: { in: ['SENT', 'PARTIAL'] },
          due_date: { lt: today }
        },
        data: { status: 'OVERDUE' }
      });

      logger.info(`Invoice Cron: Marked ${overdue.count} invoices as OVERDUE.`);
    } catch (error: any) {
      logger.error('Error running Invoice overdue cron job:', { error: error.message });
    }
  });
};
