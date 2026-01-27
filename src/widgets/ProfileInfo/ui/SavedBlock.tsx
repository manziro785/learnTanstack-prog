import type { PostType } from "@/entities/post/type/post";
import { Link } from "@tanstack/react-router";

interface SavedBlockProps {
  posts?: { posts: PostType[] };
}

const SavedBlock = ({ posts }: SavedBlockProps) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-1 mt-10">
        {posts?.posts?.length ? (
          posts.posts.map((post: PostType) => (
            <Link
              to="/posts/$postId"
              params={{ postId: String(post.id) }}
              key={post.id}
            >
              <div className="cursor-pointer aspect-square overflow-hidden relative group">
                <img
                  src={post.image_url}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-200"></div>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-3 font-light flex justify-center text-gray-500">
            No posts saved
          </p>
        )}
      </div>
    </div>
  );
};

export { SavedBlock };
