import { Request, Response, NextFunction } from 'express';
import { ReportsService } from './reports.service';
import { DateRangeSchema } from './reports.dto';

export class ReportsController {
  private service: ReportsService;

  constructor() {
    this.service = new ReportsService();
  }

  getSalesSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = DateRangeSchema.parse(req.query);
      const data = await this.service.getSalesSummary(validated);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getSalesByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = DateRangeSchema.parse(req.query);
      const data = await this.service.getSalesByCategory(validated);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getSalesDaily = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = DateRangeSchema.parse(req.query);
      const data = await this.service.getSalesDaily(validated);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getStockSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getStockSummary();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getStockMovement = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = DateRangeSchema.parse(req.query);
      const data = await this.service.getStockMovement(validated);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getServiceSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = DateRangeSchema.parse(req.query);
      const data = await this.service.getServiceSummary(validated);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getTechnicianPerformance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = DateRangeSchema.parse(req.query);
      const data = await this.service.getTechnicianPerformance(validated);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getAmcRenewals = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = DateRangeSchema.parse(req.query);
      const data = await this.service.getAmcRenewals(validated);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getDashboardStats();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
