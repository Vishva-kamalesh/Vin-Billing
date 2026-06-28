import cron from 'node-cron';
import { prisma } from '../lib/prisma';
import { logger } from '../middleware/errorHandler';

export const startTicketSLACron = () => {
  // Run daily at midnight
  cron.schedule('0 0 * * *', async () => {
    logger.info('Running Ticket SLA cron job...');
    
    try {
      const today = new Date();
      
      const result = await prisma.serviceTicket.updateMany({
        where: {
          status: { in: ['OPEN', 'ASSIGNED'] },
          scheduled_date: { lt: today },
          priority: { not: 'URGENT' }
        },
        data: { priority: 'URGENT' }
      });

      logger.info(`Ticket SLA Cron: Flagged ${result.count} tickets as URGENT (past scheduled date).`);
    } catch (error: any) {
      logger.error('Error running Ticket SLA cron job:', { error: error.message });
    }
  });
};
