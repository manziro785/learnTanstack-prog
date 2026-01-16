import img from "../../Post/assets/download.jpeg";

const PostsBlock = () => {
  return (
    <div className="mt-20">
      <div className="flex flex-col justify-center text-gray-200 items-center mb-4 text-md font-light tracking-wide">
        PUBLICATIONS
        <hr className="w-full mt-2 border-gray-500 " />
      </div>
      <div className="grid grid-cols-3 gap-1 mt-10">
        <div className="cursor-pointer aspect-square overflow-hidden relative group">
          <img src={img} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-200"></div>
        </div>
        <div className="cursor-pointer aspect-square overflow-hidden relative group">
          <img src={img} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-200"></div>
        </div>
        <div className="cursor-pointer aspect-square overflow-hidden relative group">
          <img src={img} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-200"></div>
        </div>
        <div className="cursor-pointer aspect-square overflow-hidden relative group">
          <img src={img} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-200"></div>
        </div>
        <div className="cursor-pointer aspect-square overflow-hidden relative group">
          <img src={img} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-200"></div>
        </div>
      </div>
    </div>
  );
};

export { PostsBlock };
