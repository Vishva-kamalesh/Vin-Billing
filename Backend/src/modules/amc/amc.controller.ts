import { Request, Response, NextFunction } from 'express';
import { AmcService } from './amc.service';
import { CreateAmcSchema, UpdateAmcSchema, LogVisitSchema } from './amc.dto';

export class AmcController {
  private service: AmcService;

  constructor() {
    this.service = new AmcService();
  }

  getContracts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, customer_id } = req.query;
      const contracts = await this.service.getContracts(status as string, customer_id as string);
      res.status(200).json(contracts);
    } catch (error) {
      next(error);
    }
  };

  createContract = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = CreateAmcSchema.parse(req.body);
      const contract = await this.service.createContract(validated);
      res.status(201).json(contract);
    } catch (error) {
      next(error);
    }
  };

  getContract = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contract = await this.service.getContract(req.params.id);
      res.status(200).json(contract);
    } catch (error) {
      next(error);
    }
  };

  updateContract = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = UpdateAmcSchema.parse(req.body);
      const contract = await this.service.updateContract(req.params.id, validated);
      res.status(200).json(contract);
    } catch (error) {
      next(error);
    }
  };

  logVisit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = LogVisitSchema.parse(req.body);
      const visit = await this.service.logVisit(req.params.id, validated);
      res.status(201).json(visit);
    } catch (error) {
      next(error);
    }
  };

  renewContract = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contract = await this.service.renewContract(req.params.id);
      res.status(200).json(contract);
    } catch (error) {
      next(error);
    }
  };

  getExpiringContracts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contracts = await this.service.getExpiringContracts();
      res.status(200).json(contracts);
    } catch (error) {
      next(error);
    }
  };
}
