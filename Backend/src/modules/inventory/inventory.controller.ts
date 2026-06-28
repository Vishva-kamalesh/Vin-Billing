import { Request, Response, NextFunction } from 'express';
import { InventoryService } from './inventory.service';
import { AdjustmentSchema, CreatePOSchema, ReceivePOSchema } from './inventory.dto';
import { AuthRequest } from '../../middleware/auth.middleware';

export class InventoryController {
  private service: InventoryService;

  constructor() {
    this.service = new InventoryService();
  }

  getAllStockLevels = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stock = await this.service.getAllStockLevels();
      res.status(200).json(stock);
    } catch (error) {
      next(error);
    }
  };

  getLowStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stock = await this.service.getLowStock();
      res.status(200).json(stock);
    } catch (error) {
      next(error);
    }
  };

  getMovements = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const movements = await this.service.getMovements(req.params.productId);
      res.status(200).json(movements);
    } catch (error) {
      next(error);
    }
  };

  getSerials = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = req.query.status as string;
      const serials = await this.service.getSerials(status);
      res.status(200).json(serials);
    } catch (error) {
      next(error);
    }
  };

  createAdjustment = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validated = AdjustmentSchema.parse(req.body);
      const user_id = req.user?.id || 'system';
      await this.service.createAdjustment(validated, user_id);
      res.status(200).json({ message: 'Stock adjusted successfully' });
    } catch (error) {
      next(error);
    }
  };

  createPO = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = CreatePOSchema.parse(req.body);
      const po = await this.service.createPO(validated);
      res.status(201).json(po);
    } catch (error) {
      next(error);
    }
  };

  receivePO = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validated = ReceivePOSchema.parse(req.body);
      const user_id = req.user?.id || 'system';
      await this.service.receivePO(req.params.id, validated, user_id);
      res.status(200).json({ message: 'PO received successfully' });
    } catch (error) {
      next(error);
    }
  };
}
