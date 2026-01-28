import { api } from "@/shared/http/axiosInstance";

export const savePost = async (postId: number) => {
  const res = await api.post(`/api/posts/${postId}/save`);
  return res.data;
};

export const unsavePost = async (postId: number) => {
  const res = await api.delete(`/api/posts/${postId}/save`);
  return res.data;
};
