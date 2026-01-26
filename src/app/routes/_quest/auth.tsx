import { AuthPage } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_quest/auth")({
  component: AuthPage,
});
