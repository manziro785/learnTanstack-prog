import { api } from "@/shared/htttp/axiosInstance";

export const fetchFollowers = async (postId: number) => {
  const res = await api.get(`/api/users/${postId}/followers`);
  return res.data.followers;
};

export const fetchFollowing = async (postId: number) => {
  const res = await api.get(`/api/users/${postId}/following`);
  return res.data.following;
};
