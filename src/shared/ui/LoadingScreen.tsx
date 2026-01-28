import { Spinner } from "@radix-ui/themes";

export const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <Spinner size="3" />
  </div>
);
