import { z } from 'zod';

export const CreateProductSchema = z.object({
  module: z.string(),
  brand: z.string(),
  name: z.string().optional(),
  model: z.string(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  purchasePrice: z.number().optional(),
  price: z.number(),
  stock: z.number().optional(),
  minStock: z.number().optional(),
  unit: z.string().optional(),
  warrantyType: z.string().optional(),
  warrantyMonths: z.number().optional(),
  amcEligible: z.string().optional(),
  trackSerial: z.string().optional(),
  metadata: z.any().optional(),
});

export const UpdateProductSchema = CreateProductSchema.partial();

export type CreateProductDto = z.infer<typeof CreateProductSchema>;
export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
