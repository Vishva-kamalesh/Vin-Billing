import { Request, Response, NextFunction } from 'express';
import { WarrantyService } from './warranty.service';
import { CreateClaimSchema, UpdateClaimSchema } from './warranty.dto';

export class WarrantyController {
  private service: WarrantyService;

  constructor() {
    this.service = new WarrantyService();
  }

  getWarranties = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, customer_id } = req.query;
      const warranties = await this.service.getWarranties(status as string, customer_id as string);
      res.status(200).json(warranties);
    } catch (error) {
      next(error);
    }
  };

  getWarranty = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const warranty = await this.service.getWarranty(req.params.id);
      res.status(200).json(warranty);
    } catch (error) {
      next(error);
    }
  };

  createClaim = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = CreateClaimSchema.parse(req.body);
      const claim = await this.service.createClaim(req.params.id, validated);
      res.status(201).json(claim);
    } catch (error) {
      next(error);
    }
  };

  updateClaim = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = UpdateClaimSchema.parse(req.body);
      const claim = await this.service.updateClaim(req.params.claim_id, validated);
      res.status(200).json(claim);
    } catch (error) {
      next(error);
    }
  };

  getClaims = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status } = req.query;
      const claims = await this.service.getClaims(status as string);
      res.status(200).json(claims);
    } catch (error) {
      next(error);
    }
  };
}
