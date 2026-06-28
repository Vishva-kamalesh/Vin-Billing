import { apiClient } from "../lib/api-client";
import { API_ENDPOINTS } from "../config/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
}

export const usersService = {
  getAll: async (): Promise<User[]> => {
    const response = await apiClient.get(API_ENDPOINTS.USERS.GET_ALL);
    return response.data;
  },
  
  create: async (data: any): Promise<User> => {
    const response = await apiClient.post(API_ENDPOINTS.USERS.CREATE, data);
    return response.data;
  },
  
  update: async (id: string, data: any): Promise<User> => {
    const response = await apiClient.patch(API_ENDPOINTS.USERS.UPDATE(id), data);
    return response.data;
  },
  
  deactivate: async (id: string): Promise<any> => {
    const response = await apiClient.patch(API_ENDPOINTS.USERS.DEACTIVATE(id));
    return response.data;
  }
};
