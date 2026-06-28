import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationsService } from "../services/notifications.service";

export function useFetchPulses() {
  // Keeping the function name 'useFetchPulses' to easily swap with the old mock hook
  return useQuery({
    queryKey: ["notifications", "live-ops"],
    queryFn: notificationsService.getLiveOps,
  });
}

export function useMarkAllRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationsService.markAllRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
