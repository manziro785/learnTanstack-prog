import { Following } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_layout/profile/$userId/following")({
  component: Following,
});
