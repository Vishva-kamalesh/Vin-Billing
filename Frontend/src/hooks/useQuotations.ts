import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { quotationsService, type Quotation } from "../services/quotations.service";

export function useFetchQuotations() {
  return useQuery({
    queryKey: ["quotations"],
    queryFn: quotationsService.getAll,
  });
}

export function useCreateQuotation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: quotationsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotations"] });
    },
  });
}

export function useUpdateQuotation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Quotation> }) => 
      quotationsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotations"] });
    },
  });
}

export function useConvertQuotation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: quotationsService.convert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotations"] });
      // Might want to invalidate invoices too since converting creates an invoice
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}
