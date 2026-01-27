import type { PostProps } from "@/entities/post/type/post";
import { Link } from "@tanstack/react-router";
import { Hash } from "lucide-react";

const HashtagBlock = ({ post }: PostProps) => {
  return (
    <>
      <div>
        {" "}
        <Link to="/posts/$postId" params={{ postId: String(post.id) }}>
          <div className="cursor-pointer aspect-square overflow-hidden relative group">
            <img
              src={post.preview_image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-200"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <Hash className="w-8 h-8 text-white mb-2" />
              <p className="text-white text-center font-semibold text-lg">
                #{post.tag}
              </p>
              <p className="text-white text-sm mt-1">
                {post.posts_count} {post.posts_count === 1 ? "post" : "posts"}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export { HashtagBlock };
