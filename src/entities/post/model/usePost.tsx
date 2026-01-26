import { useQuery } from "@tanstack/react-query";
import { fetchPostsById } from "../api/post";

export const useGetPostsById = (postId: number) => {
  return useQuery({
    queryKey: ["posts", "feed", postId],
    queryFn: async () => fetchPostsById(postId),
  });
};
