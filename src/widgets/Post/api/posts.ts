import type { PostType } from "@/entities/post/type/post";
import { api } from "@/shared/http/axiosInstance";

export interface PostsFeedResponse {
  posts: PostType[];
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
