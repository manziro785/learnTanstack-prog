import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../styles/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/QueryClient";
import { Suspense } from "react";
import { ThemeProvider } from "../providers/ThemeProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NotFoundedPage } from "@/pages/NotFoundedPage";
import { ErrorBoundary } from "../providers/ErrorBoundary";
import { LoadingScreen } from "@/shared/ui/LoadingScreen";

const RootLayout = () => (
  <>
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-amber-500 focus:text-black focus:px-4 focus:py-2 focus:rounded focus:outline-none"
            >
              Skip to content
            </a>

            <Suspense fallback={<LoadingScreen />}>
              <main
                id="main-content"
                className="flex flex-row justify-between max-w-[1000px] mx-auto px-0 md:px-[2rem] py-4 md:py-[3rem]"
              >
                <Outlet />
              </main>
            </Suspense>
          </GoogleOAuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
    {/* <TanStackRouterDevtools /> */}
  </>
);

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <NotFoundedPage />,
});
