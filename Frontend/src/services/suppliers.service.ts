import { apiClient } from "../lib/api-client";
import { API_ENDPOINTS } from "../config/api";

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  modules: any[];
  outstanding: number;
  ordersCount: number;
}

export const suppliersService = {
  getAll: async (): Promise<Supplier[]> => {
    const response = await apiClient.get(API_ENDPOINTS.SUPPLIERS.GET_ALL);
    return response.data;
  },
  
  create: async (data: Partial<Supplier>): Promise<Supplier> => {
    const response = await apiClient.post(API_ENDPOINTS.SUPPLIERS.CREATE, data);
    return response.data;
  },
  
  getById: async (id: string): Promise<Supplier> => {
    const response = await apiClient.get(API_ENDPOINTS.SUPPLIERS.GET_BY_ID(id));
    return response.data;
  },

  update: async (id: string, data: Partial<Supplier>): Promise<Supplier> => {
    const response = await apiClient.patch(API_ENDPOINTS.SUPPLIERS.UPDATE(id), data);
    return response.data;
  }
};
