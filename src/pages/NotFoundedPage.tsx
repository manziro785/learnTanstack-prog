import { Button } from "@radix-ui/themes";
import { Link } from "@tanstack/react-router";

const NotFoundedPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[80vh]">
      <p className="text-[6rem] font-bold">404</p>
      <p className="-mt-5">page not founded :(</p>
      <Link to="/">
        <Button className="px-8 mt-5">Go to home</Button>
      </Link>
    </div>
  );
};

export default NotFoundedPage;
