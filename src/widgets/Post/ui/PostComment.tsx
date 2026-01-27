import { formatDate } from "@/shared/lib";
import Like from "@/entities/post/ui/Like";
import { Link } from "@tanstack/react-router";
import { useGetProfileQuery } from "@/widgets/ProfileInfo/model/useProfile";
import { DeletePost } from "@/widgets/(popups)/DeletePost/ui/DeletePost";
import Save from "@/entities/post/ui/Save";
import { SpinnerWrapper } from "@/shared/ui/SpinnerWrapper";
import type { PostProps } from "@/entities/post/type/post";

const PostComment = ({ post }: PostProps) => {
  const formatted = formatDate(post?.created_at);
  const { data, isLoading } = useGetProfileQuery();
  if (isLoading) return <SpinnerWrapper />;
  const isMine = data.id === post.user_id;

  return (
    <div
      key={post.key}
      className="relative flex border-2 border-[#161616] bg-[#161616] rounded-[10px] mb-[30px]"
    >
      <img
        src={post.image_url}
        className=" max-w-[500px] max-h-[700px] object-cover rounded-tl-[10px] rounded-bl-[10px]"
      />
      {isMine && <DeletePost postId={post.id} />}

      <div className="p-[30px] min-w-[20rem] flex gap-x-[20px]">
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
                <Save postId={post.id} initialIsSaved={post.is_saved} />{" "}
              </div>
            </div>
            <Link
              to="/profile/$userId"
              params={{ userId: String(post.id) }}
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
