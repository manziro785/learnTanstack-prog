import { Route } from "@/app/routes/_auth/_layout/profile/$userId.following";
import { useGetFollowingQuery } from "@/widgets/Followers/model/useFollowers";
import { UserCard } from "@/widgets/SearchUser/ui/UserCard";
import { Spinner } from "@radix-ui/themes";

const Following = () => {
  const { userId } = Route.useParams();
  const { data, isLoading } = useGetFollowingQuery(Number(userId));

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full pl-20">
      {data?.length > 0 ? (
        data.map((user) => <UserCard key={user.id} user={user} />)
      ) : (
        <p className="text-center mt-5 text-gray-400">No following :(</p>
      )}
    </div>
  );
};

export { Following };
