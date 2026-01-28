import { Like } from "@/entities/post/ui/Like";
import { Save } from "@/entities/post/ui/Save";
import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

interface PostActionsProps {
  postId: number;
  isLiked: boolean;
  likesCount: string | number;
  commentsCount: number;
  isSaved: boolean;
  username: string;
  userId: number;
  variant?: "desktop" | "mobile";
}

export const PostActions = ({
  postId,
  isLiked,
  likesCount,
  commentsCount,
  isSaved,
  username,
  userId,
  variant = "desktop",
}: PostActionsProps) => {
  const isMobile = variant === "mobile";
  const iconSize = isMobile ? 20 : 24;

  return (
    <div
      className={
        isMobile
          ? "flex items-center justify-between mb-3"
          : "flex justify-between w-full"
      }
    >
      <div
        className={`flex items-center ${isMobile ? "gap-x-4" : "gap-x-[15px]"}`}
      >
        <div
          className={`flex gap-x-1 items-center cursor-pointer ${isMobile ? "active:scale-95 transition-transform" : "hover:text-red-300 duration-200 ease-in-out"}`}
        >
          <Like
            postId={postId}
            initialIsLiked={isLiked}
            initialLikesCount={likesCount}
          />
        </div>

        <Link
          to="/posts/$postId"
          params={{ postId: String(postId) }}
          className={`flex gap-x-1 items-center cursor-pointer ${isMobile ? "active:scale-95 transition-transform" : "hover:text-blue-300 duration-200 ease-in-out"}`}
        >
          <MessageCircle size={iconSize} />
          <span className={isMobile ? "text-sm" : ""}>{commentsCount}</span>
        </Link>

        <div
          className={`flex gap-x-1 items-center cursor-pointer ${isMobile ? "active:scale-95 transition-transform" : ""}`}
        >
          <Save postId={postId} initialIsSaved={isSaved} />
        </div>
      </div>

      <Link
        to="/profile/$userId"
        params={{ userId: String(userId) }}
        className={`text-gray-400 cursor-pointer ${isMobile ? "text-sm active:text-gray-100 transition-colors" : "hover:text-gray-100 duration-200 ease-in-out"}`}
      >
        @ {username}
      </Link>
    </div>
  );
};
