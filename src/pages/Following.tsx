import { Route } from "@/app/routes/_auth/_layout/profile/$userId.following";
import { useGetFollowingQuery } from "@/entities/follow/model/useFollow";
import type { UserType } from "@/entities/user/user";
import { SpinnerWrapper } from "@/shared/ui/SpinnerWrapper";
import { UserCard } from "@/widgets/Search/ui/UserCard";

const Following = () => {
  const { userId } = Route.useParams();
  const { data, isLoading } = useGetFollowingQuery(Number(userId));

  if (isLoading) return <SpinnerWrapper />;

  return (
    <div className="w-full px-4 md:px-0 md:pl-20 pb-20 md:pb-4">
      {data?.length > 0 ? (
        <div className="space-y-3 md:space-y-4">
          {data.map((user: UserType) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-8 md:mt-5 text-sm md:text-base text-gray-400">
          No following :(
        </p>
      )}
    </div>
  );
};

export { Following };
