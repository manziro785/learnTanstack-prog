import { Route } from "@/app/routes/_auth/_layout/profile/$userId.index";
import { useGetUserProfileQuery } from "@/shared/model/useProfileUser";
import { SpinnerWrapper } from "@/shared/ui/SpinnerWrapper";
import { useGetMyPostsQuery } from "@/widgets/ProfileInfo/model/usePosts";
import { PostsBlock } from "@/widgets/ProfileInfo/ui/PostsBlock";
import { ProfileBlock } from "@/widgets/ProfileInfo/ui/ProfileBlock";

const UserProfile = () => {
  const { userId } = Route.useParams();
  const { data: user, isLoading: isLoadingUser } = useGetUserProfileQuery(
    Number(userId),
  );
  const { data: posts, isLoading: isLoadingPosts } = useGetMyPostsQuery(
    user?.id,
  );

  if (isLoadingUser || isLoadingPosts) return <SpinnerWrapper />;

  return (
    <div className="w-full px-4 md:px-0 lg:ml-10 pb-20">
      <ProfileBlock data={user} />
      <PostsBlock posts={posts} />
    </div>
  );
};

export { UserProfile };
