import { api } from "@/shared/htttp/axiosInstance";

export const editProfile = async (FormData: PostData) => {
  const res = await api.put("/api/users/me", FormData);
  return res.data;
};
