import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostsFeed } from "../api/posts";

export const useGetPostsFeedQuery = () => {
  return useInfiniteQuery({
    queryKey: ["posts", "feed"],
    queryFn: fetchPostsFeed,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined,
  });
};
