import { MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import Like from "@/entities/post/ui/Like";
import type { PostProps } from "@/entities/post/type/post";
import { formatDate } from "@/shared/lib";
import Save from "@/entities/post/ui/Save";

const Post = ({ post }: PostProps) => {
  const formatted = formatDate(post?.created_at);

  return (
    <div className="border-2 border-[#161616] bg-[#161616] rounded-[10px] max-w-full md:max-w-[700px] mb-4 md:mb-[30px]">
      <img
        src={post.image_url}
        className="w-full max-w-full md:max-w-[700px] h-[300px] sm:h-[350px] md:max-h-[400px] object-cover rounded-tl-[10px] rounded-tr-[10px]"
        alt={post.caption}
      />
      <div className="p-4 md:p-[30px] flex gap-x-3 md:gap-x-[20px]">
        <div className="w-full">
          <Link to="/posts/$postId" params={{ postId: String(post.id) }}>
            <p className="mt-0 mb-2 text-sm md:text-base leading-relaxed">
              {post.caption}
            </p>
            {post.hashtags && (
              <p className="text-amber-300 text-sm md:text-base">
                #{post.hashtags}
              </p>
            )}
          </Link>
          <p className="mb-4 md:mb-[2rem] text-gray-400 text-xs md:text-sm">
            {formatted}
          </p>

          <div className="hidden md:flex justify-between w-full">
            <div className="flex gap-x-[15px]">
              <div className="flex gap-x-[5px] cursor-pointer hover:text-red-300 duration-200 ease-in-out">
                <Like
                  postId={post.id}
                  initialIsLiked={post.is_liked}
                  initialLikesCount={post.likes_count}
                />
              </div>
              <Link
                to="/posts/$postId"
                params={{ postId: String(post.id) }}
                className="flex gap-x-[5px] cursor-pointer hover:text-blue-300 duration-200 ease-in-out"
              >
                <MessageCircle /> {post.comments_count}
              </Link>
              <div className="flex gap-x-[5px] cursor-pointer">
                <Save postId={post.id} initialIsSaved={post.is_saved} />
              </div>
            </div>
            <Link
              to="/profile/$userId"
              params={{ userId: String(post.user_id) }}
              className="text-gray-400 cursor-pointer hover:text-gray-100 duration-200 ease-in-out"
            >
              @ {post.username}
            </Link>
          </div>

          <div className="md:hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-x-4 items-center">
                <div className="flex gap-x-1 items-center cursor-pointer active:scale-95 transition-transform">
                  <Like
                    postId={post.id}
                    initialIsLiked={post.is_liked}
                    initialLikesCount={post.likes_count}
                  />
                </div>
                <Link
                  to="/posts/$postId"
                  params={{ postId: String(post.id) }}
                  className="flex gap-x-1 items-center cursor-pointer active:scale-95 transition-transform"
                >
                  <MessageCircle size={20} />
                  <span className="text-sm">{post.comments_count}</span>
                </Link>
                <div className="flex gap-x-1 items-center cursor-pointer active:scale-95 transition-transform">
                  <Save postId={post.id} initialIsSaved={post.is_saved} />
                </div>
              </div>
              <Link
                to="/profile/$userId"
                params={{ userId: String(post.user_id) }}
                className="text-gray-400 text-sm active:text-gray-100 transition-colors"
              >
                @ {post.username}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Post };
