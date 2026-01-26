import { Bookmark } from "lucide-react";
import type { PostProps } from "../model/post.types";
import { formatDate } from "@/shared/lib";
import Like from "@/entities/post/ui/Like";
import { Link } from "@tanstack/react-router";

const PostComment = ({ post }: PostProps) => {
  const formatted = formatDate(post?.created_at);

  return (
    <div
      key={post.key}
      className="flex border-2 border-[#161616] bg-[#161616] rounded-[10px] mb-[30px]"
    >
      <img
        src={post.image_url}
        className=" max-w-[700px] max-h-[400px] object-cover rounded-tl-[10px] rounded-bl-[10px]"
      />
      <div className="p-[30px] flex gap-x-[20px]">
        <div className="w-full flex flex-col justify-between">
          <div>
            <p className="mt-[0px] mb-3">{post.caption}</p>
            {post.hashtags && (
              <p className="text-amber-300">#{post.hashtags}</p>
            )}

            <p className="mb-[2rem] text-gray-400 text-sm ">{formatted}</p>
          </div>
          <div className="flex justify-between w-[100%]">
            <div className="flex gap-x-[15px]">
              <div className="flex gap-x-[5px] cursor-pointer hover:text-red-300 duration-200 ease-in-out">
                <Like
                  postId={post.id}
                  initialIsLiked={post.is_liked}
                  initialLikesCount={post.likes_count}
                />{" "}
              </div>

              <div className="flex gap-x-[5px] cursor-pointer">
                {" "}
                <Bookmark />
              </div>
            </div>
            <Link
              to={`/profile/${post.user_id}`}
              className="text-gray-400 cursor-pointer hover:text-gray-100 duration-200 ease-in-out"
            >
              @ {post.username}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PostComment };
