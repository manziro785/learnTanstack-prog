import { AboutPage } from "@/pages";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_quest/about")({
  component: AboutPage,
});
