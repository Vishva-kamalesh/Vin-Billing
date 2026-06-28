import cron from 'node-cron';
import { prisma } from '../lib/prisma';
import { logger } from '../middleware/errorHandler';

export const startWarrantyStatusCron = () => {
  // Run daily at 6:30 AM
  cron.schedule('30 6 * * *', async () => {
    logger.info('Running Warranty status cron job...');
    
    try {
      const today = new Date();
      
      const in30Days = new Date(today);
      in30Days.setDate(in30Days.getDate() + 30);

      // Mark EXPIRING_SOON
      const expiringSoon = await prisma.warranty.updateMany({
        where: {
          status: 'ACTIVE',
          end_date: {
            lte: in30Days,
            gte: today
          }
        },
        data: { status: 'EXPIRING_SOON' }
      });

      // Mark EXPIRED
      const expired = await prisma.warranty.updateMany({
        where: {
          status: { in: ['ACTIVE', 'EXPIRING_SOON'] },
          end_date: { lt: today }
        },
        data: { status: 'EXPIRED' }
      });

      logger.info(`Warranty Cron: Marked ${expiringSoon.count} as EXPIRING_SOON, ${expired.count} as EXPIRED.`);
    } catch (error: any) {
      logger.error('Error running Warranty status cron job:', { error: error.message });
    }
  });
};
