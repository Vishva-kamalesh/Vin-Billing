import cron from 'node-cron';
import { prisma } from '../lib/prisma';
import { logger } from '../middleware/errorHandler';

export const startFollowupCron = () => {
  // Run every morning at 8:00 AM
  cron.schedule('0 8 * * *', async () => {
    logger.info('Running follow-up reminder job...');
    
    try {
      const today = new Date();
      today.setHours(23, 59, 59, 999); // End of today to catch anything today or earlier

      const pendingFollowups = await prisma.leadFollowup.findMany({
        where: {
          done: false,
          followup_at: {
            lte: today
          }
        },
        include: {
          lead: true
        }
      });

      for (const followup of pendingFollowups) {
        if (followup.lead.assigned_to) {
          await prisma.notification.create({
            data: {
              user_id: followup.lead.assigned_to,
              type: 'LEAD_FOLLOWUP',
              title: 'Follow-up Reminder',
              body: `Follow-up reminder for lead: ${followup.lead.name} regarding: ${followup.note}`,
              channel: 'IN_APP',
            }
          });
        }
      }

      logger.info(`Generated ${pendingFollowups.length} follow-up notifications.`);
    } catch (error: any) {
      logger.error('Error running follow-up job:', { error: error.message });
    }
  });
};
