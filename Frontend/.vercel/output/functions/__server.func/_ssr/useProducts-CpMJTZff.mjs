import { n as apiClient, t as API_ENDPOINTS } from "./api-client-D0rzRozx.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useProducts-CpMJTZff.js
var productsService = {
	getAll: async () => {
		return (await apiClient.get(API_ENDPOINTS.PRODUCTS.GET_ALL)).data.map((p) => {
			let module = "security";
			if (p.category?.slug === "RO_PURIFIER") module = "water";
			else if (p.category?.slug === "SOLAR") module = "solar";
			else if (p.category?.slug === "BATTERY" || p.category?.slug === "INVERTER") module = "power";
			else if (p.category?.slug === "CCTV") module = "security";
			else if (p.category?.slug) module = p.category.slug.toLowerCase();
			return {
				id: p.id,
				brand: p.brand || "",
				name: p.description || "",
				model: p.model || "",
				sku: p.sku || "",
				module,
				price: p.selling_price || 0,
				stock: p.inventory?.qty_on_hand || 0,
				minStock: p.inventory?.low_stock_alert || 5,
				barcode: p.barcode || "",
				warrantyMonths: p.warranty_months || 0,
				trackSerial: p.metadata?.trackSerial || "Yes",
				purchasePrice: p.cost_price || 0,
				unit: p.unit || "Piece",
				warrantyType: p.metadata?.warrantyType || "Manufacturer Warranty",
				amcEligible: p.metadata?.amcEligible || "Yes",
				metadata: p.metadata || {}
			};
		});
	},
	create: async (data) => {
		return (await apiClient.post(API_ENDPOINTS.PRODUCTS.CREATE, data)).data;
	},
	update: async (id, data) => {
		return (await apiClient.patch(API_ENDPOINTS.PRODUCTS.UPDATE(id), data)).data;
	},
	delete: async (id) => {
		await apiClient.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
	},
	getMetadata: async () => {
		return (await apiClient.get("/products/metadata")).data;
	},
	deleteCategory: async (id) => {
		await apiClient.delete(`/products/categories/${id}`);
	},
	deleteBrand: async (id) => {
		await apiClient.delete(`/products/brands/${id}`);
	}
};
function useFetchProducts() {
	return useQuery({
		queryKey: ["products"],
		queryFn: productsService.getAll
	});
}
function useCreateProduct() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: productsService.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		}
	});
}
function useUpdateProduct() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => productsService.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		}
	});
}
function useFetchMetadata() {
	return useQuery({
		queryKey: ["product-metadata"],
		queryFn: productsService.getMetadata
	});
}
function useDeleteCategory() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: productsService.deleteCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["product-metadata"] });
		}
	});
}
function useDeleteBrand() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: productsService.deleteBrand,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["product-metadata"] });
		}
	});
}
//#endregion
export { useFetchProducts as a, useFetchMetadata as i, useDeleteBrand as n, useUpdateProduct as o, useDeleteCategory as r, useCreateProduct as t };
