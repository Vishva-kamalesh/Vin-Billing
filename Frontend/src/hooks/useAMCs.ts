import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { amcService, type AMCContract } from "../services/amc.service";

export function useFetchAMCs() {
  return useQuery({
    queryKey: ["amcs"],
    queryFn: amcService.getAll,
  });
}

export function useCreateAMC() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: amcService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["amcs"] });
    },
  });
}

export function useUpdateAMC() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AMCContract> }) => 
      amcService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["amcs"] });
    },
  });
}
