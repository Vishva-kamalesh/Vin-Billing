import { z } from 'zod';

export const CreateSupplierSchema = z.object({
  name: z.string(),
  contact_name: z.string().optional(),
  phone: z.string(),
  email: z.string().email().optional().or(z.literal('')),
  gst_number: z.string().optional(),
  address: z.string().optional()
});

export const UpdateSupplierSchema = CreateSupplierSchema.partial();

export type CreateSupplierDto = z.infer<typeof CreateSupplierSchema>;
export type UpdateSupplierDto = z.infer<typeof UpdateSupplierSchema>;
