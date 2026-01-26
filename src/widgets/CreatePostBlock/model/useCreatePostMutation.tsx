import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../api/post";
import { queryClient } from "@/app/lib/QueryClient";

export const useCreatePost = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "feed"] });
      navigate({ to: "/" });
    },
  });
};
