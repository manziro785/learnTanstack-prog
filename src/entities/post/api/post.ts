import { api } from "@/shared/htttp/axiosInstance";

export const fetchPostsById = async (postId: number) => {
  const res = await api.get(`/api/posts/${postId}`);
  return res.data;
};
