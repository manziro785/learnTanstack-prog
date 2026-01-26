import { CreatePostPage } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_layout/create_post")({
  component: CreatePostPage,
});
