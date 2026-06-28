import { Request, Response, NextFunction } from 'express';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierSchema, UpdateSupplierSchema } from './suppliers.dto';

export class SuppliersController {
  private service: SuppliersService;

  constructor() {
    this.service = new SuppliersService();
  }

  getSuppliers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const suppliers = await this.service.getSuppliers();
      res.status(200).json(suppliers);
    } catch (error) {
      next(error);
    }
  };

  createSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = CreateSupplierSchema.parse(req.body);
      const supplier = await this.service.create(validated);
      res.status(201).json(supplier);
    } catch (error) {
      next(error);
    }
  };

  getSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const supplier = await this.service.getSupplier(req.params.id);
      res.status(200).json(supplier);
    } catch (error) {
      next(error);
    }
  };

  updateSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = UpdateSupplierSchema.parse(req.body);
      const supplier = await this.service.update(req.params.id, validated);
      res.status(200).json(supplier);
    } catch (error) {
      next(error);
    }
  };

  getPurchaseOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pos = await this.service.getPurchaseOrders(req.params.id);
      res.status(200).json(pos);
    } catch (error) {
      next(error);
    }
  };
}
