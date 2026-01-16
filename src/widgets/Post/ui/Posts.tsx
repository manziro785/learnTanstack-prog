import { Spinner } from "@radix-ui/themes";
import { useGetPostsFeedQuery } from "../model/usePostsQuery";
import { Post } from "./Post";

const Posts = () => {
  const { posts, isLoading } = useGetPostsFeedQuery();
  if (isLoading) return <Spinner />;
  console.log(posts);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
