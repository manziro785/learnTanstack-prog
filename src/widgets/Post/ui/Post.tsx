import { Bookmark, MessageCircle } from "lucide-react";
import type { PostProps } from "../model/post.types";
import { Link } from "@tanstack/react-router";
import Like from "@/entities/post/ui/Like";

const Post = ({ post }: PostProps) => {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(post.created_at));

  console.log(post);

  return (
    <div className="border-2 border-[#161616] bg-[#161616] rounded-[10px] max-w-[700px] mb-[30px]">
      <img
        src={post.image_url}
        className="w-full max-w-[700px] max-h-[400px] object-cover rounded-tl-[10px] rounded-tr-[10px]"
      />
      <div className="p-[30px] flex gap-x-[20px]">
        <div className="w-full">
          <p className="mt-[0px] mb-2">{post.caption}</p>
          {post.hashtags && <p className="text-amber-300">#{post.hashtags}</p>}
          <p className="mb-[2rem] text-gray-400 text-sm ">{formatted}</p>
          <div className="flex justify-between w-[100%]">
            <div className="flex gap-x-[15px]">
              <div className="flex gap-x-[5px] cursor-pointer hover:text-red-300 duration-200 ease-in-out">
                <Like
                  postId={post.id}
                  initialIsLiked={post.is_liked}
                  initialLikesCount={post.likes_count}
                />{" "}
              </div>
              <Link
                to={`/posts/${post.id}`}
                className="flex gap-x-[5px] cursor-pointer hover:text-blue-300 duration-200 ease-in-out"
              >
                {" "}
                <MessageCircle /> {post.comments_count}
              </Link>
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

export { Post };
