import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productsService, type Product } from "../services/products.service";

export function useFetchProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: productsService.getAll,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) => 
      productsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useFetchMetadata() {
  return useQuery({
    queryKey: ["product-metadata"],
    queryFn: productsService.getMetadata,
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productsService.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-metadata"] });
    },
  });
}

export function useDeleteBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productsService.deleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-metadata"] });
    },
  });
}
