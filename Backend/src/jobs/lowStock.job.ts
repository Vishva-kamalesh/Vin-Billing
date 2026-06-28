import cron from 'node-cron';
import { prisma } from '../lib/prisma';
import { logger } from '../middleware/errorHandler';

export const startLowStockCron = () => {
  // Run every morning at 7:00 AM
  cron.schedule('0 7 * * *', async () => {
    logger.info('Running low stock cron job...');
    
    try {
      // Find products where qty_on_hand <= low_stock_alert
      // Note: we can use a raw query or fetch all and filter for this demonstration
      const allInventory = await prisma.inventory.findMany({
        include: { product: true }
      });
      
      const lowStockItems = allInventory.filter(inv => inv.qty_on_hand <= inv.low_stock_alert);

      // Suppose we send this notification to SUPER_ADMIN users
      const admins = await prisma.user.findMany({
        where: { role: 'SUPER_ADMIN' }
      });

      for (const item of lowStockItems) {
        for (const admin of admins) {
          await prisma.notification.create({
            data: {
              user_id: admin.id,
              type: 'LOW_STOCK',
              title: 'Low Stock Alert',
              body: `Low Stock Alert: ${item.product.brand} ${item.product.model} is low on stock (${item.qty_on_hand} remaining).`,
              channel: 'IN_APP',
            }
          });
        }
      }

      logger.info(`Generated low stock notifications for ${lowStockItems.length} products.`);
    } catch (error: any) {
      logger.error('Error running low stock job:', { error: error.message });
    }
  });
};
