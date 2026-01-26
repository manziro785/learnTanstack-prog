import { Route } from "@/app/routes/_auth/_layout/profile/$userId.index";
import { useGetUserProfileQuery } from "@/shared/model/useProfileUser";
import { useGetMyPostsQuery } from "@/widgets/ProfileInfo/model/useGetMyPostsQuery";
import { PostsBlock } from "@/widgets/ProfileInfo/ui/PostsBlock";
import { ProfileBlock } from "@/widgets/ProfileInfo/ui/ProfileBlock";
import { Spinner } from "@radix-ui/themes";

const UserProfile = () => {
  const { userId } = Route.useParams();
  const { data: user, isLoading: isLoadingUser } =
    useGetUserProfileQuery(userId);
  const { data: posts, isLoading: isLoadingPosts } = useGetMyPostsQuery(
    user?.id,
  );
  if (isLoadingUser || isLoadingPosts)
    return (
      <div className="flex justify-center items-center w-full">
        <Spinner />
      </div>
    );

  return (
    <div className="ml-20 w-full">
      {" "}
      <ProfileBlock data={user} /> <PostsBlock posts={posts} />
    </div>
  );
};

export { UserProfile };
