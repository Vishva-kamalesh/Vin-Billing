import { apiClient } from "../lib/api-client";
import { API_ENDPOINTS } from "../config/api";

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone: string;
  phoneAlt?: string;
  type: string;
  source?: string;
  address: string;
  area?: string;
  city: string;
  district?: string;
  state?: string;
  pincode?: string;
  gst?: string;
  pan?: string;
  businessName?: string;
  dob?: string;
  anniversary?: string;
  preferredTime?: string;
  serviceArea?: string;
  notes?: string;
  interests?: string[];
  installed?: { module: any; product: string; serial: string; installedOn: string }[];
  createdAt?: string;
  totalSpent?: number;
  lastOrder?: string;
}

const mapBackendToFrontendCustomer = (data: any): Customer => {
  const primaryAddress = data.addresses?.[0] || {};
  const firstNote = data.notes?.[0] || {};

  return {
    id: data.id,
    name: data.name,
    email: data.email || "",
    phone: data.phone,
    phoneAlt: data.phone_alt || "",
    type: data.customer_type || "INDIVIDUAL",
    source: data.lead_source || "WALK_IN",
    address: primaryAddress.address_1 || "",
    area: primaryAddress.area || "",
    city: primaryAddress.city || "",
    district: primaryAddress.district || "",
    state: primaryAddress.state || "Tamil Nadu",
    pincode: primaryAddress.pincode || "",
    gst: data.gst_number || "",
    pan: data.pan_number || "",
    businessName: data.business_name || "",
    dob: data.dob ? new Date(data.dob).toLocaleDateString() : "",
    anniversary: data.anniversary ? new Date(data.anniversary).toLocaleDateString() : "",
    preferredTime: data.preferred_time || "",
    serviceArea: data.service_area || "",
    notes: firstNote.note || "",
    interests: data.interests || [],
    installed: data.installed_products?.map((ip: any) => ({
      module: ip.product?.category?.slug || "neutral",
      product: ip.product?.name || ip.product?.model || "Unknown",
      serial: ip.serial_number || "N/A",
      installedOn: ip.installed_date ? new Date(ip.installed_date).toLocaleDateString() : "N/A"
    })) || [],
    createdAt: data.created_at ? new Date(data.created_at).toLocaleDateString() : "N/A"
  };
};

export const customersService = {
  getAll: async (): Promise<Customer[]> => {
    const response = await apiClient.get(API_ENDPOINTS.CUSTOMERS.GET_ALL);
    return response.data.map(mapBackendToFrontendCustomer);
  },
  
  create: async (data: Partial<Customer>): Promise<Customer> => {
    const response = await apiClient.post(API_ENDPOINTS.CUSTOMERS.CREATE, data);
    return response.data;
  },
  
  getById: async (id: string): Promise<Customer> => {
    const response = await apiClient.get(API_ENDPOINTS.CUSTOMERS.GET_BY_ID(id));
    return mapBackendToFrontendCustomer(response.data);
  },

  update: async (id: string, data: Partial<Customer>): Promise<Customer> => {
    const response = await apiClient.patch(API_ENDPOINTS.CUSTOMERS.UPDATE(id), data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.CUSTOMERS.DELETE(id));
  }
};
