import { useQuery } from "@tanstack/react-query";
import { fetchPostsFeed } from "../api/posts";

export const useGetPostsFeedQuery = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", "feed"],
    queryFn: fetchPostsFeed,
  });

  return {
    posts,
    isLoading,
    error,
  };
};
