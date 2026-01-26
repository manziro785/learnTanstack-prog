import { Spinner } from "@radix-ui/themes";
import { useGetPostsFeedQuery } from "../model/usePostsQuery";
import { Post } from "./Post";
import { useEffect, useRef } from "react";

const Posts = () => {
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useGetPostsFeedQuery();

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(observerTarget.current!);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="space-y-4">
      {data?.pages.flatMap((page) =>
        page.posts.map((post) => <Post key={post.id} post={post} />),
      )}

      {(isLoading || hasNextPage) && (
        <div ref={observerTarget} className="h-20 flex justify-center">
          <Spinner size="3" />
        </div>
      )}
    </div>
  );
};

export default Posts;
