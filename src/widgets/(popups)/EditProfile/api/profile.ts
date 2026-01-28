import type { UserType } from "@/entities/user/type/user";
import { api } from "@/shared/http/axiosInstance";

export const editProfile = async (FormData: UserType) => {
  const res = await api.put("/api/users/me", FormData);
  return res.data;
};
