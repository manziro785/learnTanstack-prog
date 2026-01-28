import { Link } from "@tanstack/react-router";
import type { PostProps } from "@/entities/post/type/post";
import { formatDate } from "@/shared/lib";
import { PostActions } from "./PostActions";

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

          <div className="hidden md:block">
            <PostActions
              postId={post.id}
              isLiked={post.is_liked}
              likesCount={post.likes_count}
              commentsCount={post.comments_count}
              isSaved={post.is_saved}
              username={post.username}
              userId={post.user_id}
              variant="desktop"
            />
          </div>

          <div className="md:hidden">
            <PostActions
              postId={post.id}
              isLiked={post.is_liked}
              likesCount={post.likes_count}
              commentsCount={post.comments_count}
              isSaved={post.is_saved}
              username={post.username}
              userId={post.user_id}
              variant="mobile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Post };
