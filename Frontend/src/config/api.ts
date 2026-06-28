/**
 * API Endpoints Configuration
 * This file contains all the backend API endpoints exposed by the Vin Technology ERP Backend.
 * 
 * Base URL should be configured in your environment variables (e.g. VITE_API_URL).
 * Defaulting to http://localhost:5000/api for local development.
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Authentication & Users
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    ME: `${API_BASE_URL}/auth/me`,
  },
  USERS: {
    GET_ALL: `${API_BASE_URL}/users/`,
    CREATE: `${API_BASE_URL}/users/`,
    UPDATE: (id: string) => `${API_BASE_URL}/users/${id}`,
    DEACTIVATE: (id: string) => `${API_BASE_URL}/users/${id}/deactivate`,
  },
  
  // Customers (CRM)
  CUSTOMERS: {
    GET_ALL: `${API_BASE_URL}/customers/`,
    CREATE: `${API_BASE_URL}/customers/`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/customers/${id}`,
    UPDATE: (id: string) => `${API_BASE_URL}/customers/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/customers/${id}`,
    ADD_ADDRESS: (id: string) => `${API_BASE_URL}/customers/${id}/addresses`,
    GET_TIMELINE: (id: string) => `${API_BASE_URL}/customers/${id}/timeline`,
    ADD_NOTE: (id: string) => `${API_BASE_URL}/customers/${id}/notes`,
  },
  
  // Leads (Marketing/Sales)
  LEADS: {
    GET_ALL: `${API_BASE_URL}/leads/`,
    CREATE: `${API_BASE_URL}/leads/`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/leads/${id}`,
    UPDATE: (id: string) => `${API_BASE_URL}/leads/${id}`,
    ADD_FOLLOWUP: (id: string) => `${API_BASE_URL}/leads/${id}/followups`,
    UPDATE_FOLLOWUP: (id: string, fid: string) => `${API_BASE_URL}/leads/${id}/followups/${fid}`,
    CONVERT: (id: string) => `${API_BASE_URL}/leads/${id}/convert`,
  },

  // Products & Categories
  PRODUCTS: {
    GET_ALL: `${API_BASE_URL}/products/`,
    CREATE: `${API_BASE_URL}/products/`,
    GET_CATEGORIES: `${API_BASE_URL}/products/categories`,
    GET_BY_BARCODE: (code: string) => `${API_BASE_URL}/products/barcode/${code}`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/products/${id}`,
    UPDATE: (id: string) => `${API_BASE_URL}/products/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/products/${id}`,
  },

  // Inventory & Stock
  INVENTORY: {
    GET_ALL: `${API_BASE_URL}/inventory/`,
    GET_LOW_STOCK: `${API_BASE_URL}/inventory/low-stock`,
    GET_SERIALS: `${API_BASE_URL}/inventory/serials`,
    GET_MOVEMENTS: (productId: string) => `${API_BASE_URL}/inventory/${productId}/movements`,
    ADJUSTMENT: `${API_BASE_URL}/inventory/adjustment`,
    CREATE_PURCHASE_ORDER: `${API_BASE_URL}/inventory/purchase-orders`,
    RECEIVE_PURCHASE_ORDER: (id: string) => `${API_BASE_URL}/inventory/purchase-orders/${id}/receive`,
  },

  // Billing (Invoices & Payments)
  INVOICES: {
    GET_ALL: `${API_BASE_URL}/invoices/`,
    CREATE: `${API_BASE_URL}/invoices/`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/invoices/${id}`,
    UPDATE: (id: string) => `${API_BASE_URL}/invoices/${id}`,
    ADD_PAYMENT: (id: string) => `${API_BASE_URL}/invoices/${id}/payments`,
    DOWNLOAD_PDF: (id: string) => `${API_BASE_URL}/invoices/${id}/pdf`,
    SEND_WHATSAPP: (id: string) => `${API_BASE_URL}/invoices/${id}/send-whatsapp`,
    CANCEL: (id: string) => `${API_BASE_URL}/invoices/${id}/cancel`,
  },

  // Quotations
  QUOTATIONS: {
    GET_ALL: `${API_BASE_URL}/quotations/`,
    CREATE: `${API_BASE_URL}/quotations/`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/quotations/${id}`,
    UPDATE: (id: string) => `${API_BASE_URL}/quotations/${id}`,
    CONVERT: (id: string) => `${API_BASE_URL}/quotations/${id}/convert`,
    DOWNLOAD_PDF: (id: string) => `${API_BASE_URL}/quotations/${id}/pdf`,
  },

  // AMC (Annual Maintenance Contracts)
  AMC: {
    GET_ALL: `${API_BASE_URL}/amc/`,
    GET_EXPIRING: `${API_BASE_URL}/amc/expiring`,
    CREATE: `${API_BASE_URL}/amc/`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/amc/${id}`,
    UPDATE: (id: string) => `${API_BASE_URL}/amc/${id}`,
    LOG_VISIT: (id: string) => `${API_BASE_URL}/amc/${id}/visits`,
    RENEW: (id: string) => `${API_BASE_URL}/amc/${id}/renew`,
  },

  // Service Tickets
  SERVICE_TICKETS: {
    GET_ALL: `${API_BASE_URL}/service-tickets/`,
    GET_KANBAN: `${API_BASE_URL}/service-tickets/kanban`,
    CREATE: `${API_BASE_URL}/service-tickets/`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/service-tickets/${id}`,
    UPDATE: (id: string) => `${API_BASE_URL}/service-tickets/${id}`,
    ASSIGN: (id: string) => `${API_BASE_URL}/service-tickets/${id}/assign`,
    LOG_VISIT: (id: string) => `${API_BASE_URL}/service-tickets/${id}/visits`,
    UPLOAD_PHOTOS: (id: string) => `${API_BASE_URL}/service-tickets/${id}/photos`,
  },

  // Technicians (Field Service Management)
  TECHNICIANS: {
    GET_ALL: `${API_BASE_URL}/technicians/`,
    GET_JOBS: (id: string) => `${API_BASE_URL}/technicians/${id}/jobs`,
    GET_SCHEDULE: (id: string) => `${API_BASE_URL}/technicians/${id}/schedule`,
    UPDATE_AVAILABILITY: (id: string) => `${API_BASE_URL}/technicians/${id}/availability`,
  },

  // Warranties
  WARRANTIES: {
    GET_ALL: `${API_BASE_URL}/warranties/`,
    GET_ALL_CLAIMS: `${API_BASE_URL}/warranties/claims`,
    UPDATE_CLAIM: (claimId: string) => `${API_BASE_URL}/warranties/claims/${claimId}`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/warranties/${id}`,
    CREATE_CLAIM: (id: string) => `${API_BASE_URL}/warranties/${id}/claims`,
  },

  // Suppliers & Purchasing
  SUPPLIERS: {
    GET_ALL: `${API_BASE_URL}/suppliers/`,
    CREATE: `${API_BASE_URL}/suppliers/`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/suppliers/${id}`,
    UPDATE: (id: string) => `${API_BASE_URL}/suppliers/${id}`,
    GET_PURCHASE_ORDERS: (id: string) => `${API_BASE_URL}/suppliers/${id}/purchase-orders`,
  },

  // Live Ops / Notifications
  NOTIFICATIONS: {
    GET_ALL: `${API_BASE_URL}/notifications/`,
    GET_LIVE_OPS: `${API_BASE_URL}/notifications/live-ops`,
    MARK_ALL_READ: `${API_BASE_URL}/notifications/read-all`,
    MARK_READ: (id: string) => `${API_BASE_URL}/notifications/${id}/read`,
  },

  // Dashboard / Reports
  REPORTS: {
    GET_DASHBOARD_STATS: `${API_BASE_URL}/reports/dashboard/stats`,
    GET_SALES_SUMMARY: `${API_BASE_URL}/reports/sales/summary`,
    GET_SALES_BY_CATEGORY: `${API_BASE_URL}/reports/sales/by-category`,
    GET_SALES_DAILY: `${API_BASE_URL}/reports/sales/daily`,
    GET_INVENTORY_STOCK: `${API_BASE_URL}/reports/inventory/stock-summary`,
    GET_INVENTORY_MOVEMENT: `${API_BASE_URL}/reports/inventory/movement`,
    GET_SERVICE_SUMMARY: `${API_BASE_URL}/reports/service/summary`,
    GET_TECHNICIAN_PERF: `${API_BASE_URL}/reports/service/technician-performance`,
    GET_AMC_RENEWALS: `${API_BASE_URL}/reports/amc/renewals`,
  },
};
