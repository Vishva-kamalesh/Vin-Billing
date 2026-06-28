import { apiClient } from "../lib/api-client";
import { API_ENDPOINTS } from "../config/api";

export interface Product {
  id: string;
  brand: string;
  name: string;
  model: string;
  sku: string;
  module: string;
  price: number;
  stock: number;
  minStock: number;
  barcode: string;
  warrantyMonths: number;
  trackSerial: string;
  purchasePrice: number;
  unit: string;
  warrantyType: string;
  amcEligible: string;
  metadata: Record<string, any>;
}

export const productsService = {
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.GET_ALL);
    return response.data.map((p: any) => {
      // Map category slug back to module key for the UI
      let module = 'security';
      if (p.category?.slug === 'RO_PURIFIER') module = 'water';
      else if (p.category?.slug === 'SOLAR') module = 'solar';
      else if (p.category?.slug === 'BATTERY' || p.category?.slug === 'INVERTER') module = 'power';
      else if (p.category?.slug === 'CCTV') module = 'security';
      else if (p.category?.slug) module = p.category.slug.toLowerCase();

      return {
        id: p.id,
        brand: p.brand || '',
        name: p.description || '',
        model: p.model || '',
        sku: p.sku || '',
        module,
        price: p.selling_price || 0,
        stock: p.inventory?.qty_on_hand || 0,
        minStock: p.inventory?.low_stock_alert || 5,
        barcode: p.barcode || '',
        warrantyMonths: p.warranty_months || 0,
        trackSerial: p.metadata?.trackSerial || 'Yes',
        purchasePrice: p.cost_price || 0,
        unit: p.unit || 'Piece',
        warrantyType: p.metadata?.warrantyType || 'Manufacturer Warranty',
        amcEligible: p.metadata?.amcEligible || 'Yes',
        metadata: p.metadata || {}
      };
    });
  },
  
  create: async (data: Partial<Product>): Promise<Product> => {
    const response = await apiClient.post(API_ENDPOINTS.PRODUCTS.CREATE, data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<Product>): Promise<Product> => {
    const response = await apiClient.patch(API_ENDPOINTS.PRODUCTS.UPDATE(id), data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
  },

  getMetadata: async () => {
    const response = await apiClient.get('/products/metadata');
    return response.data;
  },

  deleteCategory: async (id: string) => {
    await apiClient.delete(`/products/categories/${id}`);
  },

  deleteBrand: async (id: string) => {
    await apiClient.delete(`/products/brands/${id}`);
  }
};
