import { api } from "@/shared/htttp/axiosInstance";

export const getMyPosts = async (userId: number) => {
  const res = await api.get(`/api/users/${userId}/posts`);
  return res.data;
};

export const getMySavedPosts = async () => {
  const res = await api.get(`/api/users/me/saved`);
  return res.data;
};
