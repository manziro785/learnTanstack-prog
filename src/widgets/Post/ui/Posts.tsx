import { Spinner } from "@radix-ui/themes";
import { useGetPostsFeedQuery } from "../model/usePosts";
import { useEffect, useRef } from "react";
import { Post } from "./Post";

const Posts = () => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useGetPostsFeedQuery();

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
    <div className="space-y-3 md:space-y-4 pb-20 md:pb-4">
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

export { Posts };
