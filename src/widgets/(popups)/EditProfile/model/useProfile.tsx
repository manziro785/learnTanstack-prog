import { useMutation } from "@tanstack/react-query";
import { editProfile } from "../api/profile";
import { queryClient } from "../../../../app/lib/QueryClient";
import type { UserType } from "@/entities/user/user";

export const usePutProfileMutaion = () => {
  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["users", "me"] });
  };

  const handleError = (error: unknown) => {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(msg);
  };

  return useMutation({
    mutationFn: (data: UserType) => editProfile(data),
    onSuccess: handleSuccess,
    onError: handleError,
  });
};
