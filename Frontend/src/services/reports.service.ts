import { apiClient } from "../lib/api-client";
import { API_ENDPOINTS } from "../config/api";

export const reportsService = {
  getDashboardStats: async (): Promise<any> => {
    const response = await apiClient.get(API_ENDPOINTS.REPORTS.GET_DASHBOARD_STATS);
    return response.data;
  },
  
  getSalesSummary: async (): Promise<any> => {
    const response = await apiClient.get(API_ENDPOINTS.REPORTS.GET_SALES_SUMMARY);
    return response.data;
  },
  
  getSalesByCategory: async (): Promise<any> => {
    const response = await apiClient.get(API_ENDPOINTS.REPORTS.GET_SALES_BY_CATEGORY);
    return response.data;
  }
};
