import { apiClient } from "../lib/api-client";
import { API_ENDPOINTS } from "../config/api";

export interface Quotation {
  id: string;
  number: string;
  customerName: string;
  module: string;
  date: string;
  value: number;
  status: "Draft" | "Sent" | "Accepted" | "Rejected";
}

export const quotationsService = {
  getAll: async (): Promise<Quotation[]> => {
    const response = await apiClient.get(API_ENDPOINTS.QUOTATIONS.GET_ALL);
    return response.data;
  },
  
  create: async (data: Partial<Quotation>): Promise<Quotation> => {
    const response = await apiClient.post(API_ENDPOINTS.QUOTATIONS.CREATE, data);
    return response.data;
  },
  
  getById: async (id: string): Promise<Quotation> => {
    const response = await apiClient.get(API_ENDPOINTS.QUOTATIONS.GET_BY_ID(id));
    return response.data;
  },

  update: async (id: string, data: Partial<Quotation>): Promise<Quotation> => {
    const response = await apiClient.patch(API_ENDPOINTS.QUOTATIONS.UPDATE(id), data);
    return response.data;
  },

  convert: async (id: string): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.QUOTATIONS.CONVERT(id));
  }
};
