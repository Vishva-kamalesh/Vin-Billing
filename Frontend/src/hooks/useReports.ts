import { useQuery } from "@tanstack/react-query";
import { reportsService } from "../services/reports.service";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["reports", "dashboard-stats"],
    queryFn: reportsService.getDashboardStats,
  });
}

export function useSalesSummary() {
  return useQuery({
    queryKey: ["reports", "sales-summary"],
    queryFn: reportsService.getSalesSummary,
  });
}
