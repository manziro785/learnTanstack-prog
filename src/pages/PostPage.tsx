import { Route } from "@/app/routes/_auth/posts/$postId";
import { useGetPostsById } from "@/entities/post/model/usePost";
import { SpinnerWrapper } from "@/shared/ui/SpinnerWrapper";
import { CommentsBlock } from "@/widgets/CommentsBlock/ui/CommentsBlock";
import { PostComment } from "@/widgets/Post/ui/PostComment";

const PostPage = () => {
  const { postId } = Route.useParams();
  const { data, isLoading } = useGetPostsById(Number(postId));

  if (isLoading) return <SpinnerWrapper />;

  return (
    <div className="w-full px-4 md:px-0">
      <PostComment post={data} />
      <CommentsBlock postId={postId} />
    </div>
  );
};

export { PostPage };
