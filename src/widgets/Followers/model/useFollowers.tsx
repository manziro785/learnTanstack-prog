import { useQuery } from "@tanstack/react-query";
import { fetchFollowers, fetchFollowing } from "../api/followers";

export const useGetFollowersQuery = (postId: number) => {
  return useQuery({
    queryKey: ["followers", postId],
    queryFn: async () => fetchFollowers(postId),
    enabled: !!postId,
  });
};

export const useGetFollowingQuery = (postId: number) => {
  return useQuery({
    queryKey: ["following", postId],
    queryFn: async () => fetchFollowing(postId),
    enabled: !!postId,
  });
};
