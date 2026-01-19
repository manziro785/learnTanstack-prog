import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { editProfile } from "../api/profile";
import { queryClient } from "../../../app/lib/QueryClient";

export const usePutProfileMutaion = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["users", "me"] });
  };

  const handleError = (error: unknown) => {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(msg);
  };

  return useMutation({
    mutationFn: (data: FormData) => editProfile(data),
    onSuccess: handleSuccess,
    onError: handleError,
  });
};
