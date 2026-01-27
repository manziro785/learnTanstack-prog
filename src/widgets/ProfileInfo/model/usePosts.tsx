import { useQuery } from "@tanstack/react-query";
import { getMyPosts, getMySavedPosts } from "../api/posts";

export const useGetMyPostsQuery = (userId: number) => {
  return useQuery({
    queryKey: ["posts", "users", userId],
    queryFn: async () => getMyPosts(userId),
    enabled: !!userId,
  });
};

export const useGetMySavedPostsQuery = () => {
  return useQuery({
    queryKey: ["posts", "saved"],
    queryFn: getMySavedPosts,
  });
};
