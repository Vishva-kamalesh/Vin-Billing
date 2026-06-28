import { apiClient } from "../lib/api-client";
import { API_ENDPOINTS } from "../config/api";

export interface OpsPulse {
  id: string;
  text: string;
  module: string;
  kind: "alert" | "info" | "success";
}

export const notificationsService = {
  getAll: async (): Promise<OpsPulse[]> => {
    const response = await apiClient.get(API_ENDPOINTS.NOTIFICATIONS.GET_ALL);
    return response.data;
  },
  
  getLiveOps: async (): Promise<OpsPulse[]> => {
    const response = await apiClient.get(API_ENDPOINTS.NOTIFICATIONS.GET_LIVE_OPS);
    return response.data;
  },
  
  markAllRead: async (): Promise<void> => {
    await apiClient.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
  },

  markRead: async (id: string): Promise<void> => {
    await apiClient.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_READ(id));
  }
};
