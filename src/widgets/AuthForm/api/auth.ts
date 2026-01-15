import { api } from "@/shared/htttp/axiosInstance";
import type { AuthResponse, LoginUser, RegisterUser } from "../model/auth";

export const fetchLogin = async (
  userData: LoginUser
): Promise<AuthResponse> => {
  const res = await api.post("/api/auth/login", userData);
  return res.data;
};

export const fetchRegister = async (
  userData: RegisterUser
): Promise<AuthResponse> => {
  const res = await api.post("/api/auth/register", userData);
  return res.data;
};
