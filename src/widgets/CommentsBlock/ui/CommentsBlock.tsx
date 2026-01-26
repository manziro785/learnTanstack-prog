import { Spinner, TextArea } from "@radix-ui/themes";
import { ArrowLeft, Send } from "lucide-react";
import Comment from "./Comment";
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
  if (isLoading) return <Spinner />;

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
    <div className="mt-20">
      <button
        onClick={() => navigate({ to: "/" })}
        className="absolute top-6 left-6 text-amber-500 hover:text-amber-400 transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <h2 className="text-center text-3xl font-semibold mb-5">Comments</h2>
      <div>
        {data?.length === 0 ? (
          <p className="text-center text-gray-500">No comments yet</p>
        ) : (
          data?.map((comment: CommentType) => (
            <Comment key={comment.id} comment={comment} />
          ))
        )}
      </div>
      <form className="flex w-full sticky bottom-5 mt-10">
        <div className="flex-1">
          <TextArea
            placeholder="Add comment…"
            className="w-full"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (error) setError("");
            }}
            style={{
              backgroundColor: "#161616",
              borderColor: "#f59e0b",
              borderWidth: "1px",
            }}
          />
          {error && (
            <div className="text-red-500 text-sm font-medium flex items-center gap-2 mt-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
          className="ml-5 bg-amber-400 p-3 rounded hover:bg-amber-500 duration-200 disabled:opacity-50"
        >
          {isPending ? <Spinner /> : <Send className="text-black" />}
        </button>
      </form>
    </div>
  );
};

export { CommentsBlock };
