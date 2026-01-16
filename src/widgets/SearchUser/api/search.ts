import { api } from "@/shared/htttp/axiosInstance";

export const searchUser = async (user: string) => {
  const res = await api.get(`/api/search/users?q=${user}`);
  return res.data.users;
};
