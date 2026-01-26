import { PostPage } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/posts/$postId")({
  component: PostPage,
});
