import { useMutation, useQuery } from "@tanstack/react-query";
import {
  followStatus,
  followUser,
  unfollowUser,
} from "@/entities/follow/api/follow";
import { queryClient } from "@/app/lib/QueryClient";
import type { PostType } from "@/entities/post/type/post";

export const useFollowStatus = (userId: number) => {
  return useQuery({
    queryKey: ["followStatus", userId],
    queryFn: () => followStatus(userId),
    enabled: !!userId,
  });
};

export const usePostFollowMutation = (userId: number) => {
  return useMutation({
    mutationFn: (userId: number) => followUser(userId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["followStatus", userId] });
      const prev = queryClient.getQueryData(["followStatus", userId]);

      queryClient.setQueryData(["followStatus", userId], (old: PostType) => {
        if (typeof old === "object" && old !== null) {
          return { ...old, is_following: true };
        }
        return { is_following: true };
      });

      return { prev };
    },
    onError: (_err, _variables, context) => {
      if (context?.prev !== undefined) {
        queryClient.setQueryData(["followStatus", userId], context.prev);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["followStatus", userId],
      });
    },
  });
};

export const usePostUnFollowMutation = (userId: number) => {
  return useMutation({
    mutationFn: (userId: number) => unfollowUser(userId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["followStatus", userId] });
      const prev = queryClient.getQueryData(["followStatus", userId]);

      queryClient.setQueryData(["followStatus", userId], (old: PostType) => {
        if (typeof old === "object" && old !== null) {
          return { ...old, is_following: false };
        }
        return { is_following: false };
      });

      return { prev };
    },
    onError: (_err, _variables, context) => {
      if (context?.prev !== undefined) {
        queryClient.setQueryData(["followStatus", userId], context.prev);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["followStatus", userId],
      });
    },
  });
};
