import { QuotationsRepository } from './quotations.repository';
import { CreateQuotationDto, UpdateQuotationDto } from './quotations.dto';
import puppeteer from 'puppeteer';

export class QuotationsService {
  private repository: QuotationsRepository;

  constructor() {
    this.repository = new QuotationsRepository();
  }

  async createQuotation(data: CreateQuotationDto) {
    return this.repository.create(data);
  }

  async getQuotation(id: string) {
    const quotation = await this.repository.getById(id);
    if (!quotation) throw new Error('Quotation not found');
    return quotation;
  }

  async updateQuotation(id: string, data: UpdateQuotationDto) {
    return this.repository.update(id, data);
  }

  async getQuotations() {
    return this.repository.getQuotations();
  }

  async convertToInvoice(id: string, user_id: string) {
    return this.repository.convertToInvoice(id, user_id);
  }

  async generatePdf(id: string): Promise<Buffer> {
    const quotation = await this.getQuotation(id);

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
            <p>Quotation #: ${quotation.quotation_number}</p>
          </div>
          <div class="details">
            <strong>Prepared For:</strong><br/>
            ${quotation.customer.name}<br/>
            ${quotation.customer.phone}
          </div>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${quotation.items.map(item => `
                <tr>
                  <td>${item.description}</td>
                  <td>${item.qty}</td>
                  <td>₹${item.unit_price.toString()}</td>
                  <td>₹${item.line_total.toString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="totals">
            <table>
              <tr><td>Subtotal:</td><td>₹${quotation.subtotal.toString()}</td></tr>
              <tr><td><strong>Total:</strong></td><td><strong>₹${quotation.total.toString()}</strong></td></tr>
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
}
