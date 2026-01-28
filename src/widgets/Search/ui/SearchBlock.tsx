import { TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";
import { UserCard } from "./UserCard";
import { useGetUsersQuery, useSearchHashtagQuery } from "../model/useSearch";
import { useState, useEffect } from "react";
import { HashtagBlock } from "./HashtagBlock";
import type { UserType } from "@/entities/user/type/user";
import type { PostType } from "@/entities/post/type/post";

type SearchTab = "users" | "posts";

const SearchBlock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeTab, setActiveTab] = useState<SearchTab>("users");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery(
    debouncedSearch,
    activeTab === "users",
  );

  const { data: posts, isLoading: isLoadingPosts } = useSearchHashtagQuery(
    debouncedSearch,
    activeTab === "posts",
  );

  const isLoading = activeTab === "users" ? isLoadingUsers : isLoadingPosts;
  const hasResults =
    activeTab === "users"
      ? users && users.length > 0
      : posts && posts.length > 0;

  return (
    <div className="w-full mt-4 md:mt-5">
      <div className="w-full">
        <TextField.Root
          placeholder={
            activeTab === "users"
              ? "Search users..."
              : "Search posts by hashtag..."
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-sm md:text-base"
        >
          <TextField.Slot>
            <Search height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </div>

      <div className="flex gap-2 md:gap-4 mt-4 md:mt-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab("users")}
          className={`pb-2 md:pb-3 px-3 md:px-4 font-medium transition-colors relative text-sm md:text-base active:scale-95 ${
            activeTab === "users"
              ? "text-amber-500"
              : "text-gray-400 hover:text-gray-300 active:text-gray-300"
          }`}
        >
          Users
          {activeTab === "users" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("posts")}
          className={`pb-2 md:pb-3 px-3 md:px-4 font-medium transition-colors relative text-sm md:text-base active:scale-95 ${
            activeTab === "posts"
              ? "text-amber-500"
              : "text-gray-400 hover:text-gray-300 active:text-gray-300"
          }`}
        >
          Posts
          {activeTab === "posts" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
          )}
        </button>
      </div>

      <div className="w-full mt-4 md:mt-5">
        {isLoading ? (
          <div className="text-center py-6 md:py-8 text-sm md:text-base text-gray-500">
            Loading...
          </div>
        ) : hasResults ? (
          <div>
            {activeTab === "users" && (
              <div className="space-y-2 md:space-y-3">
                {users?.map((user: UserType) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            )}
            {activeTab === "posts" && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 mt-4 md:mt-10">
                {posts?.map((post: PostType) => (
                  <HashtagBlock key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6 md:py-8 text-sm md:text-base text-gray-500">
            {searchTerm
              ? `No ${activeTab} found`
              : `Start searching for ${activeTab}`}
          </div>
        )}
      </div>
    </div>
  );
};

export { SearchBlock };
