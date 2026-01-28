import { api } from "@/shared/http/axiosInstance";

export const fetchComments = async (postId: number) => {
  const res = await api.get(`/api/posts/${postId}/comments`);
  return res.data.comments;
};

export const postComment = async (postId: number, content: string) => {
  const res = await api.post(`/api/posts/${postId}/comments`, { content });
  return res.data;
};
