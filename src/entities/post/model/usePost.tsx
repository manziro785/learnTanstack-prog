import { useMutation, useQuery } from "@tanstack/react-query";
import { deletePostsById, fetchPostsById } from "../api/post";
import { queryClient } from "@/app/lib/QueryClient";
import { useNavigate } from "@tanstack/react-router";

export const useGetPostsById = (postId: number) => {
  return useQuery({
    queryKey: ["posts", "feed", postId],
    queryFn: async () => fetchPostsById(postId),
  });
};

export const useDeletePostById = (postId: number) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => deletePostsById(postId),
    onSuccess: () => {
      navigate({ to: "/feed" });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", "feed", postId] });
    },
  });
};
