import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProfile, logoutProfile } from "../api/user";

export const useGetUserProfileQuery = (userId: number) => {
  return useQuery({
    queryKey: ["user", "followStatus", userId],
    queryFn: async () => getUserProfile(userId),
    enabled: !!userId,
  });
};

export const usePostLogout = () => {
  return useMutation({
    mutationFn: logoutProfile,
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("auth_instamat");
      localStorage.clear();
      window.location.href = "/";
    },
  });
};
