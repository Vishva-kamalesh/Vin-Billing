import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { suppliersService, type Supplier } from "../services/suppliers.service";

export function useFetchSuppliers() {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: suppliersService.getAll,
  });
}

export function useCreateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: suppliersService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Supplier> }) => 
      suppliersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
}
