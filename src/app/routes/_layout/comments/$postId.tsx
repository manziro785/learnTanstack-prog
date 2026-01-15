import { CommentsPage } from "@/pages/CommentsPage";
import requireAuth from "@/shared/lib/guards/require-auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/comments/$postId")({
  beforeLoad: requireAuth,
  component: CommentsPage,
});
