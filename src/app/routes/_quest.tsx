import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/widgets/AuthForm/model/auth.store";

export const Route = createFileRoute("/_quest")({
  beforeLoad: async () => {
    const { isAuthenticated } = useAuthStore.getState();

    if (isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: GuestLayout,
});

function GuestLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
