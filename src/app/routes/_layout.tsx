import { Sidebar } from "@/widgets";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: () => (
    <>
      <Sidebar />
      <Outlet />
    </>
  ),
});
