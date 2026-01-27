import { Spinner, TextArea } from "@radix-ui/themes";
import { ArrowLeft, Send } from "lucide-react";
import { Comment } from "./Comment";
import {
  useGetCommentsQuery,
  usePostCommentMutation,
} from "../model/useComment";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { CommentType } from "@/entities/comments/type/comment";

interface CommentsBlockProps {
  postId: string | number;
}

const CommentsBlock = ({ postId }: CommentsBlockProps) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const { mutate, isPending } = usePostCommentMutation(Number(postId));
  const { data, isLoading } = useGetCommentsQuery(Number(postId));
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="3" />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Please, enter text");
      return;
    }

    mutate(comment, {
      onSuccess: () => {
        setComment("");
        setError("");
      },
      onError: () => {
        setError("Failed to post comment");
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col pb-32 md:pb-24">
      {/* Header with back button */}
      <div className="sticky top-0 bg-black/95 backdrop-blur-sm z-10 px-4 md:px-6 py-4 border-b border-gray-800">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <button
            onClick={() => navigate({ to: "/" })}
            className="text-amber-500 hover:text-amber-400 active:text-amber-400 transition-colors p-1 -ml-1"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <h2 className="text-xl md:text-2xl font-semibold">Comments</h2>
          <div className="w-5 md:w-6" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Comments list */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 max-w-3xl mx-auto w-full">
        {data?.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No comments yet</p>
        ) : (
          <div className="space-y-2 md:space-y-3">
            {data?.map((comment: CommentType) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </div>

      {/* Fixed comment input form */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-gray-800 px-4 md:px-6 py-3 md:py-4 z-20">
        <form className="flex gap-2 md:gap-3 max-w-3xl mx-auto">
          <div className="flex-1">
            <TextArea
              placeholder="Add comment…"
              className="w-full text-sm md:text-base"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                if (error) setError("");
              }}
              rows={1}
              style={{
                backgroundColor: "#161616",
                borderColor: "#f59e0b",
                borderWidth: "1px",
                minHeight: "44px",
              }}
            />
            {error && (
              <div className="text-red-500 text-xs md:text-sm font-medium flex items-center gap-2 mt-2">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-amber-400 p-2.5 md:p-3 rounded hover:bg-amber-500 active:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 self-start min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            {isPending ? (
              <Spinner size="2" />
            ) : (
              <Send className="text-black w-5 h-5 md:w-6 md:h-6" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export { CommentsBlock };
