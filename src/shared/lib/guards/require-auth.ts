import { useAuthStore } from "@/widgets/AuthForm/model/auth.store";
import { redirect } from "@tanstack/react-router";

export default function requireAuth() {
  const { isAuthenticated } = useAuthStore.getState();

  if (!isAuthenticated) {
    throw redirect({
      to: "/auth",
    });
  }
}
