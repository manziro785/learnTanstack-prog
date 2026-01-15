import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "./auth";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      setToken: (token) => set({ token, isAuthenticated: !!token }),
      logout: () => set({ token: null, isAuthenticated: false }),
    }),
    { name: "auth_instamat" }
  )
);
