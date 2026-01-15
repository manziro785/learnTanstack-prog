import { Followers } from "@/pages";
import requireAuth from "@/shared/lib/guards/require-auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/followers")({
  beforeLoad: requireAuth,

  component: Followers,
});
