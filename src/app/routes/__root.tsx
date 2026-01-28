import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../styles/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/QueryClient";
import { ThemeProvider } from "../providers/ThemeProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NotFoundedPage } from "@/pages/NotFoundedPage";

const RootLayout = () => (
  <>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
          <main className="flex flex-row justify-between max-w-[1000px] mx-auto px-0 md:px-[2rem] py-4 md:py-[3rem]">
            <Outlet />
          </main>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
    {/* <TanStackRouterDevtools /> */}
  </>
);

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <NotFoundedPage />,
});
