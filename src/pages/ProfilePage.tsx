import { SpinnerWrapper } from "@/shared/ui/SpinnerWrapper";
import {
  useGetMyPostsQuery,
  useGetMySavedPostsQuery,
} from "@/widgets/ProfileInfo/model/usePosts";
import { useGetProfileQuery } from "@/widgets/ProfileInfo/model/useProfile";
import { PostsBlock } from "@/widgets/ProfileInfo/ui/PostsBlock";
import { ProfileBlock } from "@/widgets/ProfileInfo/ui/ProfileBlock";
import { SavedBlock } from "@/widgets/ProfileInfo/ui/SavedBlock";
import { useState } from "react";

type TabType = "publications" | "saved";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("publications");
  const { data: profile, isLoading: isLoadingProfile } = useGetProfileQuery();
  const { data: user, isLoading: isLoadingUser } = useGetProfileQuery();
  const { data: posts, isLoading: isLoadingPosts } = useGetMyPostsQuery(
    user?.id,
  );
  const { data: saved_posts, isLoading: isLoadingSaved } =
    useGetMySavedPostsQuery();

  if (isLoadingUser || isLoadingPosts || isLoadingSaved || isLoadingProfile)
    return <SpinnerWrapper />;

  return (
    <div className="w-full px-4 md:px-0 md:ml-20 pb-20 md:pb-4">
      <ProfileBlock data={profile} />

      <div className="mt-10 md:mt-20 flex flex-col justify-center text-gray-500 items-center mb-4 text-sm md:text-md font-light tracking-wide">
        <div className="flex items-center">
          <span
            className={`cursor-pointer px-3 md:px-4 py-2 md:py-0 transition-colors active:scale-95 ${
              activeTab === "publications"
                ? "text-gray-200 font-medium"
                : "hover:text-gray-400 active:text-gray-400"
            }`}
            onClick={() => setActiveTab("publications")}
          >
            PUBLICATIONS
          </span>
          <span className="text-gray-500 mx-1">/</span>
          <span
            className={`cursor-pointer px-3 md:px-4 py-2 md:py-0 transition-colors active:scale-95 ${
              activeTab === "saved"
                ? "text-gray-200 font-medium"
                : "hover:text-gray-400 active:text-gray-400"
            }`}
            onClick={() => setActiveTab("saved")}
          >
            SAVED
          </span>
        </div>
        <hr className="w-full mt-2 border-gray-500" />
      </div>

      {activeTab === "publications" ? (
        <PostsBlock posts={posts} />
      ) : (
        <SavedBlock posts={saved_posts} />
      )}
    </div>
  );
};

export { ProfilePage };
