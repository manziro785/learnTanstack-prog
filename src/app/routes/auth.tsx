import { AuthPage } from "@/pages";
import requireQuest from "@/shared/lib/guards/require-quest";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  beforeLoad: requireQuest,
  component: AuthPage,
});
