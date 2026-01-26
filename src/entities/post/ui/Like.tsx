import { Heart } from "lucide-react";
import { usePostDislikeMutation, usePostLikeMutation } from "../model/useLike";
import { useState } from "react";

interface LikeProps {
  postId: number;
  initialIsLiked: boolean;
  initialLikesCount: string | number;
}

const Like = ({ postId, initialIsLiked, initialLikesCount }: LikeProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const { mutate: like, isPending: isLiking } = usePostLikeMutation(postId);
  const { mutate: dislike, isPending: isDisliking } =
    usePostDislikeMutation(postId);

  const handleLikeToggle = () => {
    if (isLiked) {
      dislike(postId, {
        onSuccess: () => {
          setIsLiked(false);
        },
        onError: () => {
          console.error("Failed to remove like");
        },
      });
    } else {
      like(postId, {
        onSuccess: () => {
          setIsLiked(true);
        },
        onError: () => {
          console.error("Failed to add like");
        },
      });
    }
  };

  const isPending = isLiking || isDisliking;

  return (
    <button
      onClick={handleLikeToggle}
      disabled={isPending}
      className="flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={isLiked ? "Remove like" : "Add like"}
    >
      <Heart
        className={`w-6 h-6 cursor-pointer transition-all ${
          isLiked
            ? "fill-red-500 text-red-500 scale-110"
            : "text-white hover:text-red-400 hover:scale-105"
        } ${isPending ? "animate-pulse" : ""}`}
        fill={isLiked ? "currentColor" : "none"}
      />
      {initialLikesCount}
    </button>
  );
};

export default Like;
