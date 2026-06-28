import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { leadsService, type Lead } from "../services/leads.service";

export function useFetchLeads() {
  return useQuery({
    queryKey: ["leads"],
    queryFn: leadsService.getAll,
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leadsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useUpdateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Lead> }) => 
      leadsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useConvertLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leadsService.convert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      // Might want to invalidate customers since convert creates a customer
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}
