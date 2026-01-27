import { queryClient } from "@/app/lib/QueryClient";
import { useMutation } from "@tanstack/react-query";
import { dislikePost, likePost } from "../api/like";
import type { PostType } from "../type/post";

export const usePostLikeMutation = (postId: number) => {
  return useMutation({
    mutationFn: () => likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "feed"] });
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["posts", "feed"] });
      const previousFeed = queryClient.getQueryData(["posts", "feed"]);

      queryClient.setQueryData(["posts", "feed"], (old: PostType) => {
        if (!old || !Array.isArray(old)) return old;

        return old.map((post: PostType) => {
          if (post.id === postId) {
            return {
              ...post,
              is_liked: true,
              likes_count: String(Number(post.likes_count) + 1),
            };
          }
          return post;
        });
      });

      return { previousFeed };
    },
    onError: (error, _variables, context) => {
      if (context?.previousFeed) {
        queryClient.setQueryData(["posts", "feed"], context.previousFeed);
      }
      const msg = error instanceof Error ? error.message : String(error);
      console.error("Failed to like post:", msg);
    },
  });
};

export const usePostDislikeMutation = (postId: number) => {
  return useMutation({
    mutationFn: () => dislikePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "feed"] });
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["posts", "feed"] });

      const previousFeed = queryClient.getQueryData(["posts", "feed"]);

      queryClient.setQueryData(["posts", "feed"], (old: PostType) => {
        if (!old || !Array.isArray(old)) return old;

        return old.map((post: PostType) => {
          if (post.id === postId) {
            return {
              ...post,
              is_liked: false,
              likes_count: String(Math.max(0, Number(post.likes_count) - 1)),
            };
          }
          return post;
        });
      });

      return { previousFeed };
    },
    onError: (error: unknown, _variables, context) => {
      if (context?.previousFeed) {
        queryClient.setQueryData(["posts", "feed"], context.previousFeed);
      }
      const msg = error instanceof Error ? error.message : String(error);
      console.error("Failed to unlike post:", msg);
    },
  });
};
