import axios from "axios";
import { API_BASE_URL } from "../config/api";

// Create a configured Axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the auth token
apiClient.interceptors.request.use(
  (config) => {
    // We will store the token in localStorage
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401s (e.g. redirect to login)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login if unauthorized
      // DISABLE LOGIN REDIRECT FOR DEVELOPMENT
      // localStorage.removeItem("auth_token");
      // if (window.location.pathname !== "/login") {
      //   window.location.href = "/login";
      // }
    }
    return Promise.reject(error);
  }
);
