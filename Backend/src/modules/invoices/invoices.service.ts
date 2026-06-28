import { InvoicesRepository } from './invoices.repository';
import { CreateInvoiceDto, PaymentDto, UpdateInvoiceDto } from './invoices.dto';
import puppeteer from 'puppeteer';
import { logger } from '../../middleware/errorHandler';

export class InvoicesService {
  private repository: InvoicesRepository;

  constructor() {
    this.repository = new InvoicesRepository();
  }

  async createInvoice(data: CreateInvoiceDto, user_id: string) {
    return this.repository.create(data, user_id);
  }

  async getInvoice(id: string) {
    const invoice = await this.repository.getById(id);
    if (!invoice) throw new Error('Invoice not found');
    return invoice;
  }

  async updateInvoice(id: string, data: UpdateInvoiceDto) {
    return this.repository.update(id, data);
  }

  async getInvoices(status?: string, customer_id?: string, startDate?: string, endDate?: string) {
    return this.repository.getInvoices(status, customer_id, startDate, endDate);
  }

  async addPayment(invoice_id: string, data: PaymentDto, user_id: string) {
    return this.repository.addPayment(invoice_id, data, user_id);
  }

  async cancelInvoice(id: string, user_id: string) {
    return this.repository.cancelInvoice(id, user_id);
  }

  async generatePdf(id: string): Promise<Buffer> {
    const invoice = await this.getInvoice(id);

    // Provide a simple HTML template mapping in the data
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica', sans-serif; padding: 40px; }
            .header { text-align: center; margin-bottom: 40px; }
            .header h1 { margin: 0; color: #333; }
            .details { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .totals { float: right; width: 300px; }
            .totals table { border: none; }
            .totals td { border: none; padding: 4px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Vin Technology</h1>
            <p>Invoice #: ${invoice.invoice_number}</p>
          </div>
          <div class="details">
            <strong>Bill To:</strong><br/>
            ${invoice.customer.name}<br/>
            ${invoice.customer.phone}
          </div>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>GST %</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${invoice.items.map(item => `
                <tr>
                  <td>${item.description}</td>
                  <td>${item.qty}</td>
                  <td>₹${item.unit_price.toString()}</td>
                  <td>${item.gst_rate.toString()}%</td>
                  <td>₹${item.line_total.toString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="totals">
            <table>
              <tr><td>Subtotal:</td><td>₹${invoice.subtotal.toString()}</td></tr>
              <tr><td>CGST:</td><td>₹${invoice.cgst.toString()}</td></tr>
              <tr><td>SGST:</td><td>₹${invoice.sgst.toString()}</td></tr>
              <tr><td><strong>Total:</strong></td><td><strong>₹${invoice.total.toString()}</strong></td></tr>
            </table>
          </div>
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    return Buffer.from(pdfBuffer);
  }

  async sendWhatsapp(id: string) {
    const invoice = await this.getInvoice(id);
    
    // In a real scenario, integrate Twilio or Meta Cloud API here.
    // We would use generatePdf() to get the PDF, upload it to a temporary public storage (e.g., S3),
    // and send the URL inside a pre-approved template message.
    logger.info(`Simulating WhatsApp send for Invoice ${invoice.invoice_number} to ${invoice.customer.phone}`);

    return { message: 'WhatsApp message queued successfully' };
  }
}
