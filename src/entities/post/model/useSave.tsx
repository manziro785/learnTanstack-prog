import { queryClient } from "@/app/lib/QueryClient";
import { useMutation } from "@tanstack/react-query";
import { savePost, unsavePost } from "../api/save";

export const usePostSaveMutation = (postId: number) => {
  return useMutation({
    mutationFn: () => savePost(postId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      await queryClient.refetchQueries({ queryKey: ["posts", "feed"] });
      await queryClient.refetchQueries({ queryKey: ["posts", "saved"] });
    },
  });
};

export const usePostUnsaveMutation = (postId: number) => {
  return useMutation({
    mutationFn: () => unsavePost(postId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      await queryClient.refetchQueries({ queryKey: ["posts", "feed"] });
      await queryClient.refetchQueries({ queryKey: ["posts", "saved"] });
    },
  });
};
