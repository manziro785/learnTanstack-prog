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
      dislike(undefined, {
        onSuccess: () => {
          setIsLiked(false);
        },
        onError: () => {
          console.error("Failed to remove like");
        },
      });
    } else {
      like(undefined, {
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
      className="flex items-center gap-1 md:gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed p-1 -m-1 active:scale-95"
      aria-label={isLiked ? "Remove like" : "Add like"}
    >
      <Heart
        className={`w-5 h-5 md:w-6 md:h-6 cursor-pointer transition-all ${
          isLiked
            ? "fill-red-500 text-red-500 scale-110"
            : "text-white hover:text-red-400 hover:scale-105 active:text-red-400 active:scale-105"
        } ${isPending ? "animate-pulse" : ""}`}
        fill={isLiked ? "currentColor" : "none"}
      />
      <span className="text-sm md:text-base">{initialLikesCount}</span>
    </button>
  );
};

export default Like;
