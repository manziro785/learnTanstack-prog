import { PostsBlock } from "@/widgets/ProfileInfo/ui/PostsBlock";
import { ProfileBlock } from "@/widgets/ProfileInfo/ui/ProfileBlock";

const ProfilePage = () => {
  return (
    <div className="ml-20">
      {" "}
      <ProfileBlock /> <PostsBlock />
    </div>
  );
};

export { ProfilePage };
