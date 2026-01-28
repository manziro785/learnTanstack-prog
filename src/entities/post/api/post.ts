import { api } from "@/shared/http/axiosInstance";

export const fetchPostsById = async (postId: number) => {
  const res = await api.get(`/api/posts/${postId}`);
  return res.data;
};

export const deletePostsById = async (postId: number) => {
  const res = await api.delete(`/api/posts/${postId}`);
  return res.data;
};
