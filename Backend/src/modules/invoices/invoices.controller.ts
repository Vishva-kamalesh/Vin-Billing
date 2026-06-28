import { Request, Response, NextFunction } from 'express';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceSchema, UpdateInvoiceSchema, PaymentSchema } from './invoices.dto';
import { AuthRequest } from '../../middleware/auth.middleware';

export class InvoicesController {
  private service: InvoicesService;

  constructor() {
    this.service = new InvoicesService();
  }

  getInvoices = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, customer_id, startDate, endDate } = req.query;
      const invoices = await this.service.getInvoices(
        status as string,
        customer_id as string,
        startDate as string,
        endDate as string
      );
      res.status(200).json(invoices);
    } catch (error) {
      next(error);
    }
  };

  createInvoice = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validated = CreateInvoiceSchema.parse(req.body);
      const user_id = req.user?.id || 'system';
      const invoice = await this.service.createInvoice(validated, user_id);
      res.status(201).json(invoice);
    } catch (error) {
      next(error);
    }
  };

  getInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const invoice = await this.service.getInvoice(req.params.id);
      res.status(200).json(invoice);
    } catch (error) {
      next(error);
    }
  };

  updateInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = UpdateInvoiceSchema.parse(req.body);
      const invoice = await this.service.updateInvoice(req.params.id, validated);
      res.status(200).json(invoice);
    } catch (error) {
      next(error);
    }
  };

  addPayment = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validated = PaymentSchema.parse(req.body);
      const user_id = req.user?.id || 'system';
      const result = await this.service.addPayment(req.params.id, validated, user_id);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  cancelInvoice = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user_id = req.user?.id || 'system';
      const invoice = await this.service.cancelInvoice(req.params.id, user_id);
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
        'Content-Disposition': `attachment; filename=invoice-${req.params.id}.pdf`
      });
      res.send(pdfBuffer);
    } catch (error) {
      next(error);
    }
  };

  sendWhatsapp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.sendWhatsapp(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
