import cron from 'node-cron';
import { prisma } from '../lib/prisma';
import { logger } from '../middleware/errorHandler';

export const startQuotationExpiryCron = () => {
  // Run every midnight
  cron.schedule('0 0 * * *', async () => {
    logger.info('Running quotation expiry cron job...');
    
    try {
      const today = new Date();

      const result = await prisma.quotation.updateMany({
        where: {
          status: 'SENT',
          valid_until: {
            lt: today
          }
        },
        data: {
          status: 'EXPIRED'
        }
      });

      logger.info(`Expired ${result.count} quotations.`);
    } catch (error: any) {
      logger.error('Error running quotation expiry job:', { error: error.message });
    }
  });
};
