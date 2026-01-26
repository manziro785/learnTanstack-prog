import { useQuery } from "@tanstack/react-query";
import { fetchPostsFeed } from "../api/posts";

export const useGetPostsFeedQuery = () => {
  return useQuery({
    queryKey: ["posts", "feed"],
    queryFn: fetchPostsFeed,
  });
};
