import { Request, Response, NextFunction } from 'express';
import { TechniciansService } from './technicians.service';
import { UpdateTechnicianSchema } from './technicians.dto';

export class TechniciansController {
  private service: TechniciansService;

  constructor() {
    this.service = new TechniciansService();
  }

  getTechnicians = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const technicians = await this.service.getTechnicians();
      res.status(200).json(technicians);
    } catch (error) {
      next(error);
    }
  };

  getJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobs = await this.service.getJobs(req.params.id);
      res.status(200).json(jobs);
    } catch (error) {
      next(error);
    }
  };

  getSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const date = req.query.date as string || new Date().toISOString();
      const schedule = await this.service.getSchedule(req.params.id, date);
      res.status(200).json(schedule);
    } catch (error) {
      next(error);
    }
  };

  updateAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = UpdateTechnicianSchema.parse(req.body);
      const technician = await this.service.updateAvailability(req.params.id, validated);
      res.status(200).json(technician);
    } catch (error) {
      next(error);
    }
  };
}
