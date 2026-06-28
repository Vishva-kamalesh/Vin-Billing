import { Request, Response, NextFunction } from 'express';
import { TicketsService } from './tickets.service';
import { CreateTicketSchema, UpdateTicketSchema, AssignTicketSchema, LogServiceVisitSchema } from './tickets.dto';
import { AuthRequest } from '../../middleware/auth.middleware';

export class TicketsController {
  private service: TicketsService;

  constructor() {
    this.service = new TicketsService();
  }

  getKanbanBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const board = await this.service.getKanbanBoard();
      res.status(200).json(board);
    } catch (error) {
      next(error);
    }
  };

  getTickets = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, technician_id, date } = req.query;
      const tickets = await this.service.getTickets(status as string, technician_id as string, date as string);
      res.status(200).json(tickets);
    } catch (error) {
      next(error);
    }
  };

  createTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = CreateTicketSchema.parse(req.body);
      const ticket = await this.service.createTicket(validated);
      res.status(201).json(ticket);
    } catch (error) {
      next(error);
    }
  };

  getTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ticket = await this.service.getTicket(req.params.id);
      res.status(200).json(ticket);
    } catch (error) {
      next(error);
    }
  };

  updateTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = UpdateTicketSchema.parse(req.body);
      const ticket = await this.service.updateTicket(req.params.id, validated);
      res.status(200).json(ticket);
    } catch (error) {
      next(error);
    }
  };

  assign = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = AssignTicketSchema.parse(req.body);
      const ticket = await this.service.assign(req.params.id, validated);
      res.status(200).json(ticket);
    } catch (error) {
      next(error);
    }
  };

  logVisit = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const technician_id = req.user?.id || 'system';
      
      // Parse JSON from form-data if passed that way, else from JSON body
      const data = typeof req.body.parts_used === 'string' ? {
        ...req.body,
        parts_used: JSON.parse(req.body.parts_used)
      } : req.body;

      const validated = LogServiceVisitSchema.parse(data);
      const visit = await this.service.logVisit(req.params.id, technician_id, validated);
      res.status(201).json(visit);
    } catch (error) {
      next(error);
    }
  };

  uploadPhotos = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        return res.status(400).json({ error: 'No files provided' });
      }

      const user_id = req.user?.id || 'system';
      const photos = await this.service.savePhotos(req.params.id, user_id, req.files as Express.Multer.File[]);
      res.status(201).json(photos);
    } catch (error) {
      next(error);
    }
  };
}
