import { Bookmark } from "lucide-react";
import { useState } from "react";
import { usePostSaveMutation, usePostUnsaveMutation } from "../model/useSave";

interface SaveProps {
  postId: number;
  initialIsSaved: boolean;
}

const Save = ({ postId, initialIsSaved }: SaveProps) => {
  const [isSaved, setIsSaved] = useState(initialIsSaved);

  const { mutate: save, isPending: isSaving } = usePostSaveMutation(postId);
  const { mutate: unsave, isPending: isUnsaving } =
    usePostUnsaveMutation(postId);

  const handleSaveToggle = () => {
    if (isSaved) {
      unsave(undefined, {
        onSuccess: () => {
          setIsSaved(false);
        },
        onError: () => {
          console.error("Failed to unsave post");
        },
      });
    } else {
      save(undefined, {
        onSuccess: () => {
          setIsSaved(true);
        },
        onError: () => {
          console.error("Failed to save post");
        },
      });
    }
  };

  const isPending = isSaving || isUnsaving;

  return (
    <button
      onClick={handleSaveToggle}
      disabled={isPending}
      className="flex items-center gap-1 md:gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed p-1 -m-1 active:scale-95"
      aria-label={isSaved ? "Unsave post" : "Save post"}
    >
      <Bookmark
        className={`w-5 h-5 md:w-6 md:h-6 cursor-pointer transition-all ${
          isSaved
            ? "fill-amber-400 text-amber-400 scale-110"
            : "text-white hover:text-amber-400 hover:scale-105 active:text-amber-400 active:scale-105"
        } ${isPending ? "animate-pulse" : ""}`}
        fill={isSaved ? "currentColor" : "none"}
      />
    </button>
  );
};

export { Save };
