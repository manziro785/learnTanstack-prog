import { api } from "@/shared/http/axiosInstance";

export const getUserProfile = async (userId: number) => {
  const res = await api.get(`/api/users/${userId}`);
  return res.data;
};

export const logoutProfile = async () => {
  const res = await api.post(`/api/auth/logout`);
  return res.data;
};
