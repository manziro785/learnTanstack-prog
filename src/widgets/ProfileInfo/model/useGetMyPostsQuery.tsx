import { useQuery } from "@tanstack/react-query";
import { getMyPosts } from "../api/posts";

export const useGetMyPostsQuery = (userId: number) => {
  return useQuery({
    queryKey: ["posts", "users", userId],
    queryFn: async () => getMyPosts(userId),
    enabled: !!userId,
  });
};
