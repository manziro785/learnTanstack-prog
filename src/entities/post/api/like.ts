import { api } from "@/shared/http/axiosInstance";

export const likePost = async (postId: number) => {
  const res = await api.post(`/api/posts/${postId}/like`);
  return res.data;
};

export const dislikePost = async (postId: number) => {
  const res = await api.delete(`/api/posts/${postId}/like`);
  return res.data;
};
