import { api } from "@/shared/htttp/axiosInstance";

export const followUser = async (userId: number) => {
  const res = await api.post(`/api/users/${userId}/follow`);
  return res.data;
};

export const unfollowUser = async (userId: number) => {
  const res = await api.delete(`/api/users/${userId}/follow`);
  return res.data;
};

export const followers = async (userId: number) => {
  const res = await api.get(`/api/users/${userId}/followers`);
  return res.data;
};

export const following = async (userId: number) => {
  const res = await api.get(`/api/users/${userId}/following`);
  return res.data;
};

export const followStatus = async (userId: number) => {
  const res = await api.get(`/api/users/${userId}/follow-status`);
  return res.data;
};
