import cron from 'node-cron';
import { prisma } from '../lib/prisma';
import { logger } from '../middleware/errorHandler';

export const startAmcStatusCron = () => {
  // Run daily at 6:00 AM
  cron.schedule('0 6 * * *', async () => {
    logger.info('Running AMC status cron job...');
    
    try {
      const today = new Date();
      
      const in30Days = new Date(today);
      in30Days.setDate(in30Days.getDate() + 30);

      // Mark EXPIRING_SOON
      const expiringSoon = await prisma.amcContract.updateMany({
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
      const expired = await prisma.amcContract.updateMany({
        where: {
          status: { in: ['ACTIVE', 'EXPIRING_SOON'] },
          end_date: { lt: today }
        },
        data: { status: 'EXPIRED' }
      });

      logger.info(`AMC Cron: Marked ${expiringSoon.count} as EXPIRING_SOON, ${expired.count} as EXPIRED.`);
    } catch (error: any) {
      logger.error('Error running AMC status cron job:', { error: error.message });
    }
  });
};
