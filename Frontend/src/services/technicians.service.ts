import { apiClient } from "../lib/api-client";
import { API_ENDPOINTS } from "../config/api";

export interface Technician {
  id: string;
  name: string;
  phone: string;
  modules: any[];
  status: "available" | "on-job" | "offline";
  activeJobs: number;
  rating: number;
  initials: string;
}

export const techniciansService = {
  getAll: async (): Promise<Technician[]> => {
    const response = await apiClient.get(API_ENDPOINTS.TECHNICIANS.GET_ALL);
    return response.data;
  },
  
  getJobs: async (id: string): Promise<any[]> => {
    const response = await apiClient.get(API_ENDPOINTS.TECHNICIANS.GET_JOBS(id));
    return response.data;
  },
  
  getSchedule: async (id: string): Promise<any> => {
    const response = await apiClient.get(API_ENDPOINTS.TECHNICIANS.GET_SCHEDULE(id));
    return response.data;
  },

  updateAvailability: async (id: string, status: string): Promise<Technician> => {
    const response = await apiClient.patch(API_ENDPOINTS.TECHNICIANS.UPDATE_AVAILABILITY(id), { status });
    return response.data;
  }
};
