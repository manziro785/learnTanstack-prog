import { Spinner } from "@radix-ui/themes";
import { useGetPostsFeedQuery } from "../model/usePostsQuery";
import { Post } from "./Post";

const Posts = () => {
  const { data, isLoading } = useGetPostsFeedQuery();
  if (isLoading) return <Spinner />;

  return (
    <div>
      {data?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
