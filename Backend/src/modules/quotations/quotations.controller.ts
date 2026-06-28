import { Request, Response, NextFunction } from 'express';
import { QuotationsService } from './quotations.service';
import { CreateQuotationSchema, UpdateQuotationSchema } from './quotations.dto';
import { AuthRequest } from '../../middleware/auth.middleware';

export class QuotationsController {
  private service: QuotationsService;

  constructor() {
    this.service = new QuotationsService();
  }

  getQuotations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const quotations = await this.service.getQuotations();
      res.status(200).json(quotations);
    } catch (error) {
      next(error);
    }
  };

  createQuotation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = CreateQuotationSchema.parse(req.body);
      const quotation = await this.service.createQuotation(validated);
      res.status(201).json(quotation);
    } catch (error) {
      next(error);
    }
  };

  getQuotation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const quotation = await this.service.getQuotation(req.params.id);
      res.status(200).json(quotation);
    } catch (error) {
      next(error);
    }
  };

  updateQuotation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = UpdateQuotationSchema.parse(req.body);
      const quotation = await this.service.updateQuotation(req.params.id, validated);
      res.status(200).json(quotation);
    } catch (error) {
      next(error);
    }
  };

  convertToInvoice = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user_id = req.user?.id || 'system';
      const invoice = await this.service.convertToInvoice(req.params.id, user_id);
      res.status(200).json(invoice);
    } catch (error) {
      next(error);
    }
  };

  generatePdf = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pdfBuffer = await this.service.generatePdf(req.params.id);
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=quotation-${req.params.id}.pdf`
      });
      res.send(pdfBuffer);
    } catch (error) {
      next(error);
    }
  };
}
