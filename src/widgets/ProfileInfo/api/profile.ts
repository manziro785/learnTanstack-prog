import { api } from "@/shared/http/axiosInstance";

export const getProfile = async () => {
  const res = await api.get(`/api/users/me`);
  return res.data;
};
