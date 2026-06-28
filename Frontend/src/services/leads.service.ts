import { apiClient } from "../lib/api-client";
import { API_ENDPOINTS } from "../config/api";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  source: "Google Ads" | "Website" | "WhatsApp" | "Reference" | "Walk-In";
  module: string;
  interest: string;
  status: "New" | "Contacted" | "Quoted" | "Won" | "Lost";
  nextFollowUp: string;
  value: number;
}

export const leadsService = {
  getAll: async (): Promise<Lead[]> => {
    const response = await apiClient.get(API_ENDPOINTS.LEADS.GET_ALL);
    return response.data;
  },
  
  create: async (data: Partial<Lead>): Promise<Lead> => {
    const response = await apiClient.post(API_ENDPOINTS.LEADS.CREATE, data);
    return response.data;
  },
  
  getById: async (id: string): Promise<Lead> => {
    const response = await apiClient.get(API_ENDPOINTS.LEADS.GET_BY_ID(id));
    return response.data;
  },

  update: async (id: string, data: Partial<Lead>): Promise<Lead> => {
    const response = await apiClient.patch(API_ENDPOINTS.LEADS.UPDATE(id), data);
    return response.data;
  },

  addFollowup: async (id: string, data: any): Promise<any> => {
    const response = await apiClient.post(API_ENDPOINTS.LEADS.ADD_FOLLOWUP(id), data);
    return response.data;
  },

  convert: async (id: string): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.LEADS.CONVERT(id));
  }
};
