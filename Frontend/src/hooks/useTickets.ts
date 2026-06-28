import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { serviceTicketsService, type ServiceTicket } from "../services/service-tickets.service";

export function useFetchTickets() {
  return useQuery({
    queryKey: ["service-tickets"],
    queryFn: serviceTicketsService.getAll,
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: serviceTicketsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-tickets"] });
    },
  });
}

export function useUpdateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ServiceTicket> }) => 
      serviceTicketsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-tickets"] });
    },
  });
}
