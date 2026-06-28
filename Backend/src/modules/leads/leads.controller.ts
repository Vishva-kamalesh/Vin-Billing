import { Request, Response, NextFunction } from 'express';
import { LeadsService } from './leads.service';
import { CreateLeadSchema, UpdateLeadSchema, ScheduleFollowupSchema } from './leads.dto';
import { AuthRequest } from '../../middleware/auth.middleware';

export class LeadsController {
  private service: LeadsService;

  constructor() {
    this.service = new LeadsService();
  }

  getLeads = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = req.query.status as string;
      const source = req.query.source as string;
      const assigned_to = req.query.assigned_to as string;
      const group_by = req.query.group_by as string;

      const leads = await this.service.getLeads(status, source, assigned_to, group_by);
      res.status(200).json(leads);
    } catch (error) {
      next(error);
    }
  };

  createLead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = CreateLeadSchema.parse(req.body);
      const lead = await this.service.createLead(validated);
      res.status(201).json(lead);
    } catch (error) {
      next(error);
    }
  };

  getLead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lead = await this.service.getLead(req.params.id);
      res.status(200).json(lead);
    } catch (error) {
      next(error);
    }
  };

  updateLead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = UpdateLeadSchema.parse(req.body);
      const lead = await this.service.updateLead(req.params.id, validated);
      res.status(200).json(lead);
    } catch (error) {
      next(error);
    }
  };

  scheduleFollowup = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validated = ScheduleFollowupSchema.parse(req.body);
      const createdBy = req.user?.id || 'system';
      const followup = await this.service.scheduleFollowup(req.params.id, validated, createdBy);
      res.status(201).json(followup);
    } catch (error) {
      next(error);
    }
  };

  markFollowupDone = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const followup = await this.service.markFollowupDone(req.params.fid);
      res.status(200).json(followup);
    } catch (error) {
      next(error);
    }
  };

  convertLead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customer = await this.service.convertLead(req.params.id);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  };
}
