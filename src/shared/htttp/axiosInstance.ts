import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  // headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("401 not authorized");
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  },
);
