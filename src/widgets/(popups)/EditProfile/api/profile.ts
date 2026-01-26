import type { UserType } from "@/entities/user/user";
import { api } from "@/shared/htttp/axiosInstance";

export const editProfile = async (FormData: UserType) => {
  const res = await api.put("/api/users/me", FormData);
  return res.data;
};
