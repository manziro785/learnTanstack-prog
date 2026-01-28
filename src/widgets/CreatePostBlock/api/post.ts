import { api } from "@/shared/http/axiosInstance";
import type { PostData } from "../model/post.type";

export const createPost = async (FormData: PostData) => {
  const res = await api.post("/api/posts/", FormData);
  return res.data;
};
