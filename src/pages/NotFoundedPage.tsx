import { Button } from "@radix-ui/themes";
import { Link } from "@tanstack/react-router";

const NotFoundedPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[80vh] px-4">
      <p className="text-7xl md:text-[6rem] font-bold">404</p>
      <p className="-mt-3 md:-mt-5 text-sm md:text-base text-gray-400">
        page not founded :(
      </p>
      <Link to="/">
        <Button className="px-6 md:px-8 mt-4 md:mt-5 text-sm md:text-base min-h-[44px]">
          Go to home
        </Button>
      </Link>
    </div>
  );
};

export { NotFoundedPage };
