import { Route } from "@/app/routes/_auth/posts/$postId";
import { useGetPostsById } from "@/entities/post/model/usePost";
import { CommentsBlock } from "@/widgets/CommentsBlock/ui/CommentsBlock";
import { PostComment } from "@/widgets/Post/ui/PostComment";
import { Spinner } from "@radix-ui/themes";

const PostPage = () => {
  const { postId } = Route.useParams();

  const { data, isLoading } = useGetPostsById(Number(postId));

  if (isLoading) return <Spinner />;
  console.log(data);

  return (
    <>
      <div>
        <PostComment post={data} />
        <CommentsBlock postId={postId} />
      </div>
    </>
  );
};

export { PostPage };
