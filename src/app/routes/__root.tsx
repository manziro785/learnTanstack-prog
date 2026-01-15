import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../styles/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/QueryClient";
import { ThemeProvider } from "../providers/ThemeProvider";

const RootLayout = () => (
  <>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <main className="flex flex-row justify-between max-w-[1000px] mx-auto px-[2rem] py-[3rem]">
          <Outlet />
        </main>
      </QueryClientProvider>
    </ThemeProvider>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
