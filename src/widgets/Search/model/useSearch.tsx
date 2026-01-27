import { useQuery } from "@tanstack/react-query";
import { searchByHashtag, searchUser } from "../api/search";

export const useGetUsersQuery = (user: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["search", "users", user],
    queryFn: async () => searchUser(user),
    enabled: enabled && user.length >= 1,
    staleTime: 30000,
  });
};

export const useSearchHashtagQuery = (
  hashtag: string,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ["search", "posts", hashtag],
    queryFn: async () => searchByHashtag(hashtag),
    enabled: enabled && hashtag.length >= 1,
    staleTime: 30000,
  });
};
