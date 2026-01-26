import { Route } from "@/app/routes/_auth/_layout/profile/$userId.followers";
import { useGetFollowersQuery } from "@/entities/follow/model/useFollow";
import type { UserType } from "@/entities/user/user";
import { UserCard } from "@/widgets/SearchUser/ui/UserCard";
import { Spinner } from "@radix-ui/themes";

const Followers = () => {
  const { userId } = Route.useParams();
  const { data, isLoading } = useGetFollowersQuery(Number(userId));
  if (isLoading) return <Spinner />;

  return (
    <div className="w-full pl-20">
      {data?.length > 0 ? (
        data.map((user: UserType) => <UserCard key={user.id} user={user} />)
      ) : (
        <p className="text-center mt-5 text-gray-400">No followers :(</p>
      )}
    </div>
  );
};

export { Followers };
