import { useQuery } from "@tanstack/react-query";
import { followers, following } from "../../user/api/follow";

export const useGetFollowersQuery = (userId: number) => {
  return useQuery({
    queryKey: ["followers", userId],
    queryFn: async () => followers(userId),
    enabled: !!userId,
  });
};

export const useGetFollowingQuery = (userId: number) => {
  return useQuery({
    queryKey: ["following", userId],
    queryFn: async () => following(userId),
    enabled: !!userId,
  });
};
