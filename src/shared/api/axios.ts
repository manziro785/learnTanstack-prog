import axios from "axios";
import { safeStorage } from "../http/storage";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = safeStorage.getItem("token");
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
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("401 not authorized - logging out");
      safeStorage.removeItem("token");
      const currentPath = window.location.pathname;

      try {
        const { router } = await import("@/app/router");
        await router.navigate({
          to: "/auth",
          search: {
            redirect: currentPath !== "/auth" ? currentPath : undefined,
          },
        });
      } catch (routerError) {
        console.error("Router not available, using fallback redirect");
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  },
);
