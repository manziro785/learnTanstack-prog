import { api } from "@/shared/htttp/axiosInstance";

export const fetchPostsFeed = async () => {
  const res = await api.get("/api/posts/feed");
  return res.data.posts;
};
