import { Avatar, Button } from "@radix-ui/themes";

const UserCard = ({ user }) => {
  return (
    <div className="w-full mb-3 border-1 border-gray-300 rounded flex justify between  bg-[#181818] p-2">
      <Avatar
        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
        fallback="A"
        className="w-16 h-16"
      />
      <div className="ml-8 flex justify-between items-center w-full mr-5">
        <div className="cursor-pointer">
          <p className=" text-xl font-bold">{user.full_name ?? "User"}</p>
          <p className="text-gray-400 mt-1">@ {user.username}</p>
        </div>
        <div className="flex items-center">
          <Button className="bg-amber-400 text-black cursor pointer hover:bg-amber-500 duration-200">
            Follow
          </Button>{" "}
          {/* <Button className="border-2 cursor-pointer bg-[#181818] hover:text-gray-300 duration-200">
                Following
              </Button> */}
        </div>
      </div>
    </div>
  );
};

export { UserCard };
