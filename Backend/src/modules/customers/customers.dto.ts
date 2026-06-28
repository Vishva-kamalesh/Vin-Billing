import { z } from 'zod';

export const CreateCustomerSchema = z.object({
  name: z.string(),
  phone: z.string(),
  phoneAlt: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  dob: z.string().optional(),
  anniversary: z.string().optional(),
  address: z.string().optional(),
  area: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  type: z.enum(['INDIVIDUAL', 'BUSINESS', 'GOVERNMENT', 'SCHOOL', 'HOSPITAL']).optional(),
  source: z.string().optional(),
  gst: z.string().optional(),
  pan: z.string().optional(),
  businessName: z.string().optional(),
  preferredTime: z.string().optional(),
  serviceArea: z.string().optional(),
  notes: z.string().optional(),
  interests: z.array(z.string()).optional()
});

export const UpdateCustomerSchema = CreateCustomerSchema.partial();

export const CreateAddressSchema = z.object({
  label: z.string(),
  address: z.string(),
  city: z.string(),
  pincode: z.string(),
  is_default: z.boolean().optional(),
});

export const CreateNoteSchema = z.object({
  note: z.string(),
});

export type CreateCustomerDto = z.infer<typeof CreateCustomerSchema>;
export type UpdateCustomerDto = z.infer<typeof UpdateCustomerSchema>;
export type CreateAddressDto = z.infer<typeof CreateAddressSchema>;
export type CreateNoteDto = z.infer<typeof CreateNoteSchema>;
