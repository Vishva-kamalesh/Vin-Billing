import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { techniciansService } from "../services/technicians.service";

export function useFetchTechnicians() {
  return useQuery({
    queryKey: ["technicians"],
    queryFn: techniciansService.getAll,
  });
}

export function useUpdateTechnicianAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      techniciansService.updateAvailability(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technicians"] });
    },
  });
}
