import type { Post } from "@/entities/post/type/post";
import { api } from "@/shared/htttp/axiosInstance";

export interface PostsFeedResponse {
  posts: Post[];
  page: number;
  limit: number;
  nextCursor: number | null;
}

export const fetchPostsFeed = async ({
  pageParam,
}: {
  pageParam: number | undefined;
}) => {
  const res = await api.get<PostsFeedResponse>("/api/posts/feed", {
    params: {
      cursor: pageParam,
      limit: 20,
    },
  });
  return res.data;
};
