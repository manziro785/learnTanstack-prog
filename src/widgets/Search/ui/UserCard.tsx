import { Avatar, Button } from "@radix-ui/themes";
import {
  usePostFollowMutation,
  usePostUnFollowMutation,
  useFollowStatus,
} from "../model/useFollow";
import def_image from "@/shared/assets/Blank Pfp.jpeg";
import { Link } from "@tanstack/react-router";
import { useGetProfileQuery } from "@/widgets/ProfileInfo/model/useProfile";
import type { UserCardType } from "@/entities/user/user";

const UserCard = ({ user }: UserCardType) => {
  const { data: followStatus, isLoading: statusLoading } = useFollowStatus(
    user.id,
  );
  const followMutation = usePostFollowMutation(user.id);
  const unfollowMutation = usePostUnFollowMutation(user.id);
  const isFollowing = followStatus?.is_following ?? user.is_following ?? false;
  const { data: my_profile } = useGetProfileQuery();
  const isMine = my_profile?.id === user?.id;

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowMutation.mutateAsync(user.id);
      } else {
        await followMutation.mutateAsync(user.id);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  const isLoading =
    followMutation.isPending || unfollowMutation.isPending || statusLoading;

  return (
    <div
      key={user.id}
      className="w-full mb-3 border-1 border-gray-300 rounded flex justify-between bg-[#181818] p-2"
    >
      <Avatar
        src={user.avatar_url ?? def_image}
        fallback="A"
        className="w-16 h-16"
      />
      <div className="ml-8 flex justify-between items-center w-full mr-5">
        <Link
          to="/profile/$userId"
          params={{ userId: String(user.id) }}
          className="cursor-pointer"
        >
          <p className="text-xl font-bold">{user.full_name ?? "User"}</p>
          <p className="text-gray-400 mt-1">@{user.username}</p>
        </Link>
        <div className="flex items-center">
          {!isMine && (
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
      </div>
    </div>
  );
};

export { UserCard };
