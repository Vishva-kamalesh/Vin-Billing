import { apiClient } from "../lib/api-client";
import { API_ENDPOINTS } from "../config/api";

export interface ServiceTicket {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  module: string;
  issue: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "Assigned" | "In Progress" | "Completed";
  technicianId?: string;
  createdAt: string;
  scheduledFor?: string;
}

export const serviceTicketsService = {
  getAll: async (): Promise<ServiceTicket[]> => {
    const response = await apiClient.get(API_ENDPOINTS.SERVICE_TICKETS.GET_ALL);
    return response.data;
  },
  
  getKanban: async (): Promise<any> => {
    const response = await apiClient.get(API_ENDPOINTS.SERVICE_TICKETS.GET_KANBAN);
    return response.data;
  },
  
  create: async (data: Partial<ServiceTicket>): Promise<ServiceTicket> => {
    const response = await apiClient.post(API_ENDPOINTS.SERVICE_TICKETS.CREATE, data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<ServiceTicket>): Promise<ServiceTicket> => {
    const response = await apiClient.patch(API_ENDPOINTS.SERVICE_TICKETS.UPDATE(id), data);
    return response.data;
  },

  assign: async (id: string, technicianId: string): Promise<ServiceTicket> => {
    const response = await apiClient.patch(API_ENDPOINTS.SERVICE_TICKETS.ASSIGN(id), { technicianId });
    return response.data;
  }
};
