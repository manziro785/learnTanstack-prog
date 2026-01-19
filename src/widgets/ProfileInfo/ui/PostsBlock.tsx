import { Spinner } from "@radix-ui/themes";
import { useGetMyPostsQuery } from "../model/useGetMyPostsQuery";
import { useGetProfileQuery } from "../model/useGetProfileQuery";
import { Link } from "@tanstack/react-router";

const PostsBlock = () => {
  const { data: user, isLoading: isLoadingUser } = useGetProfileQuery();
  const { data, isLoading: isLoadingPosts } = useGetMyPostsQuery(user?.id);

  if (isLoadingUser || isLoadingPosts)
    return (
      <div className="flex justify-center items-center w-full">
        <Spinner />
      </div>
    );

  return (
    <div className="mt-20">
      <div className="flex flex-col justify-center text-gray-200 items-center mb-4 text-md font-light tracking-wide">
        PUBLICATIONS
        <hr className="w-full mt-2 border-gray-500 " />
      </div>
      <div className="grid grid-cols-3 gap-1 mt-10">
        {data?.posts?.length > 0 ? (
          data.posts.map((post) => (
            <Link to={`/posts/${post.id}`} key={post.id}>
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
            You have no posts
          </p>
        )}
      </div>
    </div>
  );
};

export { PostsBlock };
