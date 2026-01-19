import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../api/post";

export const useCreatePost = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate({ to: "/" });
  };

  const handleError = (error: unknown) => {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(msg);
  };

  return useMutation({
    mutationFn: (data: FormData) => createPost(data),
    onSuccess: handleSuccess,
    onError: handleError,
  });
};
