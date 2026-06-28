import { Request, Response, NextFunction } from 'express';
import { CustomersService } from './customers.service';
import { CreateCustomerSchema, UpdateCustomerSchema, CreateAddressSchema, CreateNoteSchema } from './customers.dto';
import { AuthRequest } from '../../middleware/auth.middleware';

export class CustomersController {
  private service: CustomersService;

  constructor() {
    this.service = new CustomersService();
  }

  getCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query.q as string;
      const customers = await this.service.getCustomers(query);
      res.status(200).json(customers);
    } catch (error) {
      next(error);
    }
  };

  createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = CreateCustomerSchema.parse(req.body);
      const customer = await this.service.createCustomer(validated);
      res.status(201).json(customer);
    } catch (error) {
      next(error);
    }
  };

  getFullProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profile = await this.service.getFullProfile(req.params.id);
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  };

  updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = UpdateCustomerSchema.parse(req.body);
      const customer = await this.service.updateCustomer(req.params.id, validated);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  };

  softDeleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.softDeleteCustomer(req.params.id);
      res.status(200).json({ message: 'Customer soft deleted' });
    } catch (error) {
      next(error);
    }
  };

  addAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = CreateAddressSchema.parse(req.body);
      const address = await this.service.addAddress(req.params.id, validated);
      res.status(201).json(address);
    } catch (error) {
      next(error);
    }
  };

  getTimeline = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const timeline = await this.service.getTimeline(req.params.id);
      res.status(200).json(timeline);
    } catch (error) {
      next(error);
    }
  };

  addNote = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validated = CreateNoteSchema.parse(req.body);
      const createdBy = req.user?.id || 'system';
      const note = await this.service.addNote(req.params.id, validated, createdBy);
      res.status(201).json(note);
    } catch (error) {
      next(error);
    }
  };
}
