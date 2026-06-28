import { apiClient } from "../lib/api-client";
import { API_ENDPOINTS } from "../config/api";

export interface Warranty {
  id: string;
  productName: string;
  serial: string;
  customerName: string;
  module: string;
  startDate: string;
  endDate: string;
}

export const warrantiesService = {
  getAll: async (): Promise<Warranty[]> => {
    const response = await apiClient.get(API_ENDPOINTS.WARRANTIES.GET_ALL);
    return response.data;
  },
  
  getClaims: async (): Promise<any[]> => {
    const response = await apiClient.get(API_ENDPOINTS.WARRANTIES.GET_ALL_CLAIMS);
    return response.data;
  }
};
