import { TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";
import { UserCard } from "./UserCard";
import { useGetUsersQuery } from "../model/useGetUsersQuery";
import { useState, useEffect } from "react";

const SearchBlock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading } = useGetUsersQuery(debouncedSearch);

  return (
    <div className="w-full mt-5 ml-20">
      <div className="w-full">
        <TextField.Root
          placeholder="Search the user…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        >
          <TextField.Slot>
            <Search height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </div>

      <div className="w-full mt-5">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : data && data.length > 0 ? (
          data.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? "User not founded" : "Start search"}
          </div>
        )}
      </div>
    </div>
  );
};

export { SearchBlock };
