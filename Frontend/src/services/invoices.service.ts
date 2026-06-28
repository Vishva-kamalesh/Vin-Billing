import { apiClient } from "../lib/api-client";
import { API_ENDPOINTS } from "../config/api";

export interface InvoiceLine {
  productId: string;
  name: string;
  qty: number;
  rate: number;
  module: string;
}

export interface Invoice {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  date: string;
  lines: InvoiceLine[];
  subTotal: number;
  gst: number;
  total: number;
  status: "Paid" | "Partial" | "Unpaid";
  module: string;
}

export const invoicesService = {
  getAll: async (): Promise<Invoice[]> => {
    const response = await apiClient.get(API_ENDPOINTS.INVOICES.GET_ALL);
    return response.data;
  },
  
  create: async (data: Partial<Invoice>): Promise<Invoice> => {
    const response = await apiClient.post(API_ENDPOINTS.INVOICES.CREATE, data);
    return response.data;
  },
  
  getById: async (id: string): Promise<Invoice> => {
    const response = await apiClient.get(API_ENDPOINTS.INVOICES.GET_BY_ID(id));
    return response.data;
  },

  update: async (id: string, data: Partial<Invoice>): Promise<Invoice> => {
    const response = await apiClient.patch(API_ENDPOINTS.INVOICES.UPDATE(id), data);
    return response.data;
  },

  cancel: async (id: string): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.INVOICES.CANCEL(id));
  }
};
