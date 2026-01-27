import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/profile";

export const useGetProfileQuery = () => {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: getProfile,
  });
};
