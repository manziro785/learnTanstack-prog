import { Avatar, Spinner } from "@radix-ui/themes";
import { useGetProfileQuery } from "../model/useGetProfileQuery";
import image_profile from "@/shared/assets/Blank Pfp.jpeg";
import DialogDemo from "@/widgets/(popups)/ui/ProfileEdit";

const ProfileBlock = () => {
  const { data, isLoading } = useGetProfileQuery();
  if (isLoading) return <Spinner />;

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
          <DialogDemo />
        </div>
        <div className="flex justify-between mt-5">
          <p className="flex">
            <p className="mr-2">{data.posts_count}</p>
            posts
          </p>
          <p className="flex">
            <p className="mr-2">{data.followers_count}</p>
            followers
          </p>
          <p className="flex">
            <p className="mr-2">{data.following_count}</p>
            following
          </p>
        </div>
        <div className="mt-10">
          <p className="font-bold mb-2">{data.full_name ?? "Adresan Dave"}</p>
          <p className="text-gray-500 text-sm">
            {data.bio ?? "Now Bio is empty"}
          </p>
        </div>
      </div>
    </div>
  );
};

export { ProfileBlock };
