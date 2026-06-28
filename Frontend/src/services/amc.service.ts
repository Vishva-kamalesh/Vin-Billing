import { apiClient } from "../lib/api-client";
import { API_ENDPOINTS } from "../config/api";

export interface AMCContract {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  module: string;
  product: string;
  startDate: string;
  endDate: string;
  visitsTotal: number;
  visitsUsed: number;
  status: "Active" | "Expiring" | "Expired";
  value: number;
}

export const amcService = {
  getAll: async (): Promise<AMCContract[]> => {
    const response = await apiClient.get(API_ENDPOINTS.AMC.GET_ALL);
    return response.data;
  },
  
  getExpiring: async (): Promise<AMCContract[]> => {
    const response = await apiClient.get(API_ENDPOINTS.AMC.GET_EXPIRING);
    return response.data;
  },
  
  create: async (data: Partial<AMCContract>): Promise<AMCContract> => {
    const response = await apiClient.post(API_ENDPOINTS.AMC.CREATE, data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<AMCContract>): Promise<AMCContract> => {
    const response = await apiClient.patch(API_ENDPOINTS.AMC.UPDATE(id), data);
    return response.data;
  },

  renew: async (id: string): Promise<AMCContract> => {
    const response = await apiClient.post(API_ENDPOINTS.AMC.RENEW(id));
    return response.data;
  }
};
