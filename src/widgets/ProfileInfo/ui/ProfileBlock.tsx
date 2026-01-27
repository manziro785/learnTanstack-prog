import { Avatar, Button } from "@radix-ui/themes";
import image_profile from "@/shared/assets/Blank Pfp.jpeg";
import {
  useFollowStatus,
  usePostFollowMutation,
  usePostUnFollowMutation,
} from "@/widgets/Search/model/useFollow";
import { useGetProfileQuery } from "../model/useProfile";
import { Link } from "@tanstack/react-router";
import { DialogDemo } from "@/widgets/(popups)/EditProfile/ui/ProfileEdit";

const ProfileBlock = ({ data }) => {
  const { data: followStatus, isLoading: statusLoading } = useFollowStatus(
    data.id,
  );
  const { data: my_profile } = useGetProfileQuery();
  const followMutation = usePostFollowMutation(data.id);
  const unfollowMutation = usePostUnFollowMutation(data.id);
  const isFollowing = followStatus?.is_following ?? data.is_following ?? false;
  const isMine = my_profile?.id === data?.id;

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowMutation.mutateAsync(data.id);
      } else {
        await followMutation.mutateAsync(data.id);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  const isLoading =
    followMutation.isPending || unfollowMutation.isPending || statusLoading;

  return (
    <div className="flex w-full">
      <Avatar
        src={data.avatar_url ?? image_profile}
        fallback="A"
        className="!w-40 !h-40"
      />
      <div className="ml-10 w-full">
        <div className="flex justify-between">
          <p className="text-2xl">{data.username}</p>

          {isMine ? (
            <DialogDemo />
          ) : (
            <Button
              onClick={handleFollowToggle}
              disabled={isLoading}
              className={
                isFollowing
                  ? "!cursor-pointer !bg-gray-400"
                  : "bg-amber-400 text-black !cursor-pointer hover:bg-amber-500 duration-200"
              }
            >
              {isLoading ? "Loading..." : isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
        <div className="flex justify-between mt-5">
          <p className="flex">
            <p className="mr-2">{data.posts_count}</p>
            posts
          </p>
          <Link to={`/profile/${data.id}/followers`} className="flex">
            <p className="mr-2">{data.followers_count}</p>
            followers
          </Link>
          <Link to={`/profile/${data.id}/following`} className="flex">
            <p className="mr-2">{data.following_count}</p>
            following
          </Link>
        </div>
        <div className="mt-10">
          <p className="font-bold mb-2">{data.full_name ?? "..."}</p>
          <p className="text-gray-500 text-sm">
            {data.bio ?? "Now Bio is empty"}
          </p>
        </div>
      </div>
    </div>
  );
};

export { ProfileBlock };
