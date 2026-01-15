import { useMutation } from "@tanstack/react-query";
import { fetchLogin, fetchRegister } from "../api/auth";
import { useAuthStore } from "./auth.store";
import { useNavigate } from "@tanstack/react-router";
import type { AuthResponse, LoginUser, RegisterUser } from "./auth";

export const useAuth = () => {
  const navigate = useNavigate();

  const handleSuccess = (data: AuthResponse) => {
    useAuthStore.getState().setToken(data.token);
    navigate({ to: "/" });
  };

  const handleError = (error: unknown) => {
    const msg = error instanceof Error ? error.message : String(error);
    console.log(msg);
  };

  const loginMutation = useMutation({
    mutationFn: (params: LoginUser) => fetchLogin(params),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const registerMutation = useMutation({
    mutationFn: (params: RegisterUser) => fetchRegister(params),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const submitAuth = async (
    data: LoginUser | RegisterUser,
    type: "login" | "register"
  ) => {
    if (type === "login") {
      return loginMutation.mutateAsync(data as LoginUser);
    } else {
      return registerMutation.mutateAsync(data as RegisterUser);
    }
  };

  return {
    submitAuth,
    isLoading: loginMutation.isPending || registerMutation.isPending,
  };
};
