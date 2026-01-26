import type { CommentTypeWrapp } from "@/entities/comments/type/comment";
import { formatDate } from "@/shared/lib";

const Comment = ({ comment }: CommentTypeWrapp) => {
  const formated = formatDate(comment.created_at);
  return (
    <div key={comment.id} className="bg-[#161616] rounded px-8 py-3 mb-2">
      <div>
        <p className="">{comment.content}</p>
      </div>
      <div className="flex flex-col items-end justify-end">
        <p className="text-gray-400 font-light">{formated}</p>
        <p className="ml-2">@ {comment.username}</p>
      </div>
    </div>
  );
};

export default Comment;
