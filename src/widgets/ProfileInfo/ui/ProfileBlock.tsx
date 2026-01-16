import { Avatar, Button } from "@radix-ui/themes";
import { useGetProfileQuery } from "../model/useGetProfileQuery";

const ProfileBlock = () => {
  const { data } = useGetProfileQuery();

  console.log(data);

  return (
    <div className="flex w-full">
      <Avatar
        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
        fallback="A"
        className="w-40 h-40"
      />
      <div className="ml-10 w-full">
        <div className="flex justify-between">
          <p className="text-2xl">{data.username}</p>
          <Button>Follow</Button>
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
