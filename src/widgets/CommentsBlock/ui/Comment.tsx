import type { CommentTypeWrapp } from "@/entities/comments/type/comment";
import { formatDate } from "@/shared/lib";

const Comment = ({ comment }: CommentTypeWrapp) => {
  const formated = formatDate(comment.created_at);

  return (
    <div className="bg-[#161616] rounded-lg px-4 md:px-6 py-3 md:py-4">
      <div className="mb-2">
        <p className="text-sm md:text-base leading-relaxed break-words">
          {comment.content}
        </p>
      </div>
      <div className="flex items-center justify-between gap-2 text-xs md:text-sm">
        <span className="text-gray-400 font-light">{formated}</span>
        <span className="text-gray-300 font-medium">@ {comment.username}</span>
      </div>
    </div>
  );
};

export { Comment };
