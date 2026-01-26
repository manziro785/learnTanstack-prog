import { Followers } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_layout/profile/$userId/followers")({
  component: Followers,
});
