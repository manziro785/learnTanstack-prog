import { useQuery } from "@tanstack/react-query";
import { searchUser } from "../api/search";

export const useGetUsersQuery = (user: string) => {
  return useQuery({
    queryKey: ["users", user],
    queryFn: async () => searchUser(user),
    enabled: user.length >= 1,
    staleTime: 30000,
  });
};
