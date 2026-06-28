import { t as axios } from "../_libs/axios+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-client-D0rzRozx.js
/**
* API Endpoints Configuration
* This file contains all the backend API endpoints exposed by the Vin Technology ERP Backend.
* 
* Base URL should be configured in your environment variables (e.g. VITE_API_URL).
* Defaulting to http://localhost:5000/api for local development.
*/
var API_BASE_URL = "http://localhost:5000/api";
var API_ENDPOINTS = {
	AUTH: {
		LOGIN: `${API_BASE_URL}/auth/login`,
		REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh`,
		LOGOUT: `${API_BASE_URL}/auth/logout`,
		ME: `${API_BASE_URL}/auth/me`
	},
	USERS: {
		GET_ALL: `${API_BASE_URL}/users/`,
		CREATE: `${API_BASE_URL}/users/`,
		UPDATE: (id) => `${API_BASE_URL}/users/${id}`,
		DEACTIVATE: (id) => `${API_BASE_URL}/users/${id}/deactivate`
	},
	CUSTOMERS: {
		GET_ALL: `${API_BASE_URL}/customers/`,
		CREATE: `${API_BASE_URL}/customers/`,
		GET_BY_ID: (id) => `${API_BASE_URL}/customers/${id}`,
		UPDATE: (id) => `${API_BASE_URL}/customers/${id}`,
		DELETE: (id) => `${API_BASE_URL}/customers/${id}`,
		ADD_ADDRESS: (id) => `${API_BASE_URL}/customers/${id}/addresses`,
		GET_TIMELINE: (id) => `${API_BASE_URL}/customers/${id}/timeline`,
		ADD_NOTE: (id) => `${API_BASE_URL}/customers/${id}/notes`
	},
	LEADS: {
		GET_ALL: `${API_BASE_URL}/leads/`,
		CREATE: `${API_BASE_URL}/leads/`,
		GET_BY_ID: (id) => `${API_BASE_URL}/leads/${id}`,
		UPDATE: (id) => `${API_BASE_URL}/leads/${id}`,
		ADD_FOLLOWUP: (id) => `${API_BASE_URL}/leads/${id}/followups`,
		UPDATE_FOLLOWUP: (id, fid) => `${API_BASE_URL}/leads/${id}/followups/${fid}`,
		CONVERT: (id) => `${API_BASE_URL}/leads/${id}/convert`
	},
	PRODUCTS: {
		GET_ALL: `${API_BASE_URL}/products/`,
		CREATE: `${API_BASE_URL}/products/`,
		GET_CATEGORIES: `${API_BASE_URL}/products/categories`,
		GET_BY_BARCODE: (code) => `${API_BASE_URL}/products/barcode/${code}`,
		GET_BY_ID: (id) => `${API_BASE_URL}/products/${id}`,
		UPDATE: (id) => `${API_BASE_URL}/products/${id}`,
		DELETE: (id) => `${API_BASE_URL}/products/${id}`
	},
	INVENTORY: {
		GET_ALL: `${API_BASE_URL}/inventory/`,
		GET_LOW_STOCK: `${API_BASE_URL}/inventory/low-stock`,
		GET_SERIALS: `${API_BASE_URL}/inventory/serials`,
		GET_MOVEMENTS: (productId) => `${API_BASE_URL}/inventory/${productId}/movements`,
		ADJUSTMENT: `${API_BASE_URL}/inventory/adjustment`,
		CREATE_PURCHASE_ORDER: `${API_BASE_URL}/inventory/purchase-orders`,
		RECEIVE_PURCHASE_ORDER: (id) => `${API_BASE_URL}/inventory/purchase-orders/${id}/receive`
	},
	INVOICES: {
		GET_ALL: `${API_BASE_URL}/invoices/`,
		CREATE: `${API_BASE_URL}/invoices/`,
		GET_BY_ID: (id) => `${API_BASE_URL}/invoices/${id}`,
		UPDATE: (id) => `${API_BASE_URL}/invoices/${id}`,
		ADD_PAYMENT: (id) => `${API_BASE_URL}/invoices/${id}/payments`,
		DOWNLOAD_PDF: (id) => `${API_BASE_URL}/invoices/${id}/pdf`,
		SEND_WHATSAPP: (id) => `${API_BASE_URL}/invoices/${id}/send-whatsapp`,
		CANCEL: (id) => `${API_BASE_URL}/invoices/${id}/cancel`
	},
	QUOTATIONS: {
		GET_ALL: `${API_BASE_URL}/quotations/`,
		CREATE: `${API_BASE_URL}/quotations/`,
		GET_BY_ID: (id) => `${API_BASE_URL}/quotations/${id}`,
		UPDATE: (id) => `${API_BASE_URL}/quotations/${id}`,
		CONVERT: (id) => `${API_BASE_URL}/quotations/${id}/convert`,
		DOWNLOAD_PDF: (id) => `${API_BASE_URL}/quotations/${id}/pdf`
	},
	AMC: {
		GET_ALL: `${API_BASE_URL}/amc/`,
		GET_EXPIRING: `${API_BASE_URL}/amc/expiring`,
		CREATE: `${API_BASE_URL}/amc/`,
		GET_BY_ID: (id) => `${API_BASE_URL}/amc/${id}`,
		UPDATE: (id) => `${API_BASE_URL}/amc/${id}`,
		LOG_VISIT: (id) => `${API_BASE_URL}/amc/${id}/visits`,
		RENEW: (id) => `${API_BASE_URL}/amc/${id}/renew`
	},
	SERVICE_TICKETS: {
		GET_ALL: `${API_BASE_URL}/service-tickets/`,
		GET_KANBAN: `${API_BASE_URL}/service-tickets/kanban`,
		CREATE: `${API_BASE_URL}/service-tickets/`,
		GET_BY_ID: (id) => `${API_BASE_URL}/service-tickets/${id}`,
		UPDATE: (id) => `${API_BASE_URL}/service-tickets/${id}`,
		ASSIGN: (id) => `${API_BASE_URL}/service-tickets/${id}/assign`,
		LOG_VISIT: (id) => `${API_BASE_URL}/service-tickets/${id}/visits`,
		UPLOAD_PHOTOS: (id) => `${API_BASE_URL}/service-tickets/${id}/photos`
	},
	TECHNICIANS: {
		GET_ALL: `${API_BASE_URL}/technicians/`,
		GET_JOBS: (id) => `${API_BASE_URL}/technicians/${id}/jobs`,
		GET_SCHEDULE: (id) => `${API_BASE_URL}/technicians/${id}/schedule`,
		UPDATE_AVAILABILITY: (id) => `${API_BASE_URL}/technicians/${id}/availability`
	},
	WARRANTIES: {
		GET_ALL: `${API_BASE_URL}/warranties/`,
		GET_ALL_CLAIMS: `${API_BASE_URL}/warranties/claims`,
		UPDATE_CLAIM: (claimId) => `${API_BASE_URL}/warranties/claims/${claimId}`,
		GET_BY_ID: (id) => `${API_BASE_URL}/warranties/${id}`,
		CREATE_CLAIM: (id) => `${API_BASE_URL}/warranties/${id}/claims`
	},
	SUPPLIERS: {
		GET_ALL: `${API_BASE_URL}/suppliers/`,
		CREATE: `${API_BASE_URL}/suppliers/`,
		GET_BY_ID: (id) => `${API_BASE_URL}/suppliers/${id}`,
		UPDATE: (id) => `${API_BASE_URL}/suppliers/${id}`,
		GET_PURCHASE_ORDERS: (id) => `${API_BASE_URL}/suppliers/${id}/purchase-orders`
	},
	NOTIFICATIONS: {
		GET_ALL: `${API_BASE_URL}/notifications/`,
		GET_LIVE_OPS: `${API_BASE_URL}/notifications/live-ops`,
		MARK_ALL_READ: `${API_BASE_URL}/notifications/read-all`,
		MARK_READ: (id) => `${API_BASE_URL}/notifications/${id}/read`
	},
	REPORTS: {
		GET_DASHBOARD_STATS: `${API_BASE_URL}/reports/dashboard/stats`,
		GET_SALES_SUMMARY: `${API_BASE_URL}/reports/sales/summary`,
		GET_SALES_BY_CATEGORY: `${API_BASE_URL}/reports/sales/by-category`,
		GET_SALES_DAILY: `${API_BASE_URL}/reports/sales/daily`,
		GET_INVENTORY_STOCK: `${API_BASE_URL}/reports/inventory/stock-summary`,
		GET_INVENTORY_MOVEMENT: `${API_BASE_URL}/reports/inventory/movement`,
		GET_SERVICE_SUMMARY: `${API_BASE_URL}/reports/service/summary`,
		GET_TECHNICIAN_PERF: `${API_BASE_URL}/reports/service/technician-performance`,
		GET_AMC_RENEWALS: `${API_BASE_URL}/reports/amc/renewals`
	}
};
var apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: { "Content-Type": "application/json" }
});
apiClient.interceptors.request.use((config) => {
	const token = localStorage.getItem("auth_token");
	if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
	return config;
}, (error) => {
	return Promise.reject(error);
});
apiClient.interceptors.response.use((response) => response, (error) => {
	if (error.response?.status === 401) {}
	return Promise.reject(error);
});
//#endregion
export { apiClient as n, API_ENDPOINTS as t };
